import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const queryBuilder = {
    where: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
  };

  const repo = {
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repo },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns null when no user matches the email', async () => {
    queryBuilder.getOne.mockResolvedValue(null);
    await expect(service.findOneByEmail('unknown@example.test')).resolves.toBeNull();
    expect(queryBuilder.where).toHaveBeenCalledWith('user.email = :email', {
      email: 'unknown@example.test',
    });
    expect(queryBuilder.addSelect).toHaveBeenCalledWith('user.password');
  });

  it('returns an existing user when found', async () => {
    const user = { id: 1, email: 'test@example.test', password: 'hashed' };
    queryBuilder.getOne.mockResolvedValue(user);
    await expect(service.findOneByEmail(user.email)).resolves.toEqual(user);
  });

  it('creates and persists a user', async () => {
    const dto = { email: 'new@example.test', password: 'hashed' };
    const user = { id: 3, ...dto };
    repo.create.mockReturnValue(user);
    repo.save.mockResolvedValue(user);
    await expect(service.create(dto)).resolves.toEqual(user);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(user);
  });
});
