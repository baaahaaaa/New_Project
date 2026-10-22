import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delegates registration to AuthService', async () => {
    const dto = { email: 'new@example.test', password: 'goodpassword' };
    authService.register.mockResolvedValue({ id: 1, email: dto.email });
    await expect(controller.register(dto)).resolves.toEqual({ id: 1, email: dto.email });
    expect(authService.register).toHaveBeenCalledWith(dto);
  });

  it('logs in the authenticated request user', async () => {
    const user = { id: 1, email: 'user@example.test' };
    authService.login.mockResolvedValue({ access_token: 'fake-token' });
    await expect(
      controller.login({ user }, { email: user.email, password: 'goodpassword' }),
    ).resolves.toEqual({ access_token: 'fake-token' });
    expect(authService.login).toHaveBeenCalledWith(user);
  });

  it('returns the authenticated request profile', () => {
    const user = { id: 1, email: 'user@example.test' };
    expect(controller.getProfile({ user })).toEqual(user);
  });
});
