import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const users = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };
  const jwt = { sign: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: users },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns null when the email does not exist', async () => {
    users.findOneByEmail.mockResolvedValue(null);
    await expect(service.validateUser('unknown@example.test', 'wrong')).resolves.toBeNull();
  });

  it('returns null for an incorrect password', async () => {
    users.findOneByEmail.mockResolvedValue({
      id: 1,
      email: 'user@example.test',
      password: await bcrypt.hash('correct-password', 4),
    });
    await expect(service.validateUser('user@example.test', 'wrong-password')).resolves.toBeNull();
  });

  it('does not expose the password after successful validation', async () => {
    users.findOneByEmail.mockResolvedValue({
      id: 1,
      email: 'user@example.test',
      password: await bcrypt.hash('correct-password', 4),
    });
    await expect(service.validateUser('user@example.test', 'correct-password')).resolves.toEqual({
      id: 1,
      email: 'user@example.test',
    });
  });

  it('generates a JWT for a validated user', async () => {
    jwt.sign.mockReturnValue('fake-jwt-token');
    expect(await service.login({ id: 4, email: 'user@example.test' })).toEqual({
      access_token: 'fake-jwt-token',
    });
    expect(jwt.sign).toHaveBeenCalledWith({ sub: 4, email: 'user@example.test' });
  });

  it('rejects duplicate email registration', async () => {
    users.findOneByEmail.mockResolvedValue({ id: 1, email: 'duplicate@example.test', password: 'hash' });
    await expect(
      service.register({ email: 'duplicate@example.test', password: 'goodpassword' }),
    ).rejects.toThrow(ConflictException);
    expect(users.create).not.toHaveBeenCalled();
  });

  it('hashes new passwords and removes them from the registration response', async () => {
    users.findOneByEmail.mockResolvedValue(null);
    users.create.mockImplementation(async (dto: { email: string; password: string }) => ({ id: 7, ...dto }));
    const result = await service.register({ email: 'new@example.test', password: 'goodpassword' });
    expect(result).toEqual({ id: 7, email: 'new@example.test' });
    const created = users.create.mock.calls[0][0];
    expect(created.password).not.toBe('goodpassword');
    await expect(bcrypt.compare('goodpassword', created.password)).resolves.toBe(true);
  });
});
