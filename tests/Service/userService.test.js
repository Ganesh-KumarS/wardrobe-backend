import { createNewUser } from '../../src/Service/userService.js';
import { findUserByEmail, createUser } from '../../src/Dao/userDao.js';
import { jest } from '@jest/globals';
jest.mock('../src/Dao/userDao', () => ({
  findUserByEmail: jest.fn(),
  createUser: jest.fn(),
}));

describe('createNewUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'password',
      deviceId: 'deviceId',
      username: 'username',
    };

    findUserByEmail.mockResolvedValue(null);
    createUser.mockResolvedValue({
      id: '123',
      username: 'username',
      email: 'test@example.com',
    });

    const result = await createNewUser(payload);

    expect(findUserByEmail).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(createUser).toHaveBeenCalledWith('test@example.com', 'password', 'deviceId', 'username');
    expect(result).toEqual({
      id: '123',
      username: 'username',
      email: 'test@example.com',
      message: 'user created successfully',
    });
  });

  it('should throw an ApolloError when required data is missing', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'password',
    };

    await expect(createNewUser(payload)).rejects.toThrow('REQUIRED_DATA_MISSING');
    expect(findUserByEmail).not.toHaveBeenCalled();
    expect(createUser).not.toHaveBeenCalled();
  });

  it('should throw an ApolloError when the email already exists', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'password',
      deviceId: 'deviceId',
      username: 'username',
    };

    findUserByEmail.mockResolvedValue({
      id: 'existingId',
      username: 'existingUsername',
      email: 'test@example.com',
    });

    await expect(createNewUser(payload)).rejects.toThrow('EMAIL_ALREADY_EXISTED');
    expect(findUserByEmail).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(createUser).not.toHaveBeenCalled();
  });

  it('should throw an ApolloError when an error occurs during user creation', async () => {
    const payload = {
      email: 'test@example.com',
      password: 'password',
      deviceId: 'deviceId',
      username: 'username',
    };

    findUserByEmail.mockResolvedValue(null);
    createUser.mockRejectedValue(new Error('Failed to create user'));

    await expect(createNewUser(payload)).rejects.toThrow('Failed to create user');
    expect(findUserByEmail).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(createUser).toHaveBeenCalledWith('test@example.com', 'password', 'deviceId', 'username');
  });
});
