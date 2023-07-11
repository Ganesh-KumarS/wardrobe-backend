import {
    createNewUser,
    loginUser,
    findAndUpdateUser,
    getUser,
    deleteUser,
    listUser,
  } from "../src/Service/userService.js";
  import rootResolver from '../src/Graphql/resolvers.js';

  import { jest } from '@jest/globals';
  
  jest.mock('../src/Service/userService', () => ({
    createNewUser: jest.fn(),
    loginUser: jest.fn(),
    findAndUpdateUser: jest.fn(),
    getUser: jest.fn(),
    deleteUser: jest.fn(),
    listUser: jest.fn(),
  }));
  
  describe('Root Resolver', () => {
    describe('Query', () => {
      describe('getUserByEmail', () => {
        it('should call getUser and return the user info', async () => {
          const getUserInfo = { id: 1, name: 'John Doe', email: 'john@example.com' };
          const args = { email: 'john@example.com' };
          getUser.mockResolvedValueOnce(getUserInfo);
  
          const result = await rootResolver.Query.getUserByEmail(null, args);
  
          expect(getUser).toHaveBeenCalledWith('john@example.com');
          expect(result).toEqual(getUserInfo);
        });
  
        it('should throw an error if getUser throws an error', async () => {
          const errorMessage = 'getUser error';
          const args = { email: 'john@example.com' };
          getUser.mockRejectedValueOnce(new Error(errorMessage));
  
          await expect(rootResolver.Query.getUserByEmail(null, args)).rejects.toThrow(errorMessage);
        });
      });
  
      describe('listUserByEmail', () => {
        it('should call listUser and return the user info', async () => {
          const listUserInfo = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
          const args = { email: 'john@example.com' };
          listUser.mockReturnValueOnce(listUserInfo);
  
          const result = await rootResolver.Query.listUserByEmail(null, args);
  
          expect(listUser).toHaveBeenCalledWith(args);
          expect(result).toEqual(listUserInfo);
        });
      });
    });
  
    describe('Mutation', () => {
      describe('createUser', () => {
        it('should call createNewUser and return the created user info', async () => {
          const userPayload = { name: 'John Doe', email: 'john@example.com' };
          const createdUserInfo = { id: 1, name: 'John Doe', email: 'john@example.com' };
          createNewUser.mockResolvedValueOnce(createdUserInfo);
  
          const result = await rootResolver.Mutation.createUser(null, { userInput: userPayload });
  
          expect(createNewUser).toHaveBeenCalledWith(userPayload);
          expect(result).toEqual(createdUserInfo);
        });
  
        it('should throw an error if createNewUser throws an error', async () => {
          const errorMessage = 'createNewUser error';
          const userPayload = { name: 'John Doe', email: 'john@example.com' };
          createNewUser.mockRejectedValueOnce(new Error(errorMessage));
  
          await expect(rootResolver.Mutation.createUser(null, { userInput: userPayload })).rejects.toThrow(
            errorMessage
          );
        });
      });
  
      describe('loginUser', () => {
        it('should call loginUser and return the logged user info', async () => {
          const userPayload = { email: 'john@example.com', password: 'password' };
          const loggedUserInfo = { id: 1, name: 'John Doe', email: 'john@example.com' };
          loginUser.mockResolvedValueOnce(loggedUserInfo);
  
          const result = await rootResolver.Mutation.loginUser(null, { userInput: userPayload });
  
          expect(loginUser).toHaveBeenCalledWith(userPayload);
          expect(result).toEqual(loggedUserInfo);
        });
  
        it('should throw an error if loginUser throws an error', async () => {
          const errorMessage = 'loginUser error';
          const userPayload = { email: 'john@example.com', password: 'password' };
          loginUser.mockRejectedValueOnce(new Error(errorMessage));
  
          await expect(rootResolver.Mutation.loginUser(null, { userInput: userPayload })).rejects.toThrow(errorMessage);
        });
      });
  
      describe('updateUsername', () => {
        it('should call findAndUpdateUser and return the updated user info', async () => {
          const userPayload = { id: 1, name: 'John Doe' };
          const updatedUserInfo = { id: 1, name: 'John Smith', email: 'john@example.com' };
          findAndUpdateUser.mockResolvedValueOnce(updatedUserInfo);
  
          const result = await rootResolver.Mutation.updateUsername(null, { userNameInput: userPayload });
  
          expect(findAndUpdateUser).toHaveBeenCalledWith(userPayload);
          expect(result).toEqual(updatedUserInfo);
        });
  
        it('should throw an error if findAndUpdateUser throws an error', async () => {
          const errorMessage = 'findAndUpdateUser error';
          const userPayload = { id: 1, name: 'John Doe' };
          findAndUpdateUser.mockRejectedValueOnce(new Error(errorMessage));
  
          await expect(rootResolver.Mutation.updateUsername(null, { userNameInput: userPayload })).rejects.toThrow(
            errorMessage
          );
        });
      });
  
      describe('deleteUser', () => {
        it('should call deleteUser and return the deleted user info', async () => {
          const userPayload = 'john@example.com';
          const deleteUserInfo = { id: 1, name: 'John Doe', email: 'john@example.com' };
          deleteUser.mockResolvedValueOnce(deleteUserInfo);
  
          const result = await rootResolver.Mutation.deleteUser(null, { userEmail: userPayload });
  
          expect(deleteUser).toHaveBeenCalledWith(userPayload);
          expect(result).toEqual(deleteUserInfo);
        });
  
        it('should throw an error if deleteUser throws an error', async () => {
          const errorMessage = 'deleteUser error';
          const userPayload = 'john@example.com';
          deleteUser.mockRejectedValueOnce(new Error(errorMessage));
  
          await expect(rootResolver.Mutation.deleteUser(null, { userEmail: userPayload })).rejects.toThrow(errorMessage);
        });
      });
    });
  });
  