import {
    findAndUpdateUser,
    getUser,
    deleteUser,
    listUser,
  } from "../../src/Service/userService";
  import {
    findUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
    listAllUsers,
  } from "../../src/Dao/userDao";
  import { ApolloError } from "apollo-server-errors";
  import { jest } from '@jest/globals';
  jest.mock("../src/Dao/userDao", () => ({
    findUserByEmail: jest.fn(),
    updateUserByEmail: jest.fn(),
    deleteUserByEmail: jest.fn(),
    listAllUsers: jest.fn(),
  }));
  
  describe("User Controller", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe("findAndUpdateUser", () => {
      it("should find and update a user", async () => {
        const payload = { email: "test@example.com", username: "newUsername" };
        const existingUser = { email: "test@example.com", username: "oldUsername" };
        const updatedUser = { email: "test@example.com", username: "newUsername" };
  
        findUserByEmail.mockResolvedValue(existingUser);
        updateUserByEmail.mockResolvedValue(updatedUser);
  
        const result = await findAndUpdateUser(payload);
  
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(updateUserByEmail).toHaveBeenCalledWith("test@example.com", { username: "newUsername" });
        expect(result).toEqual(updatedUser);
      });
  
      it("should throw an ApolloError when user is not found", async () => {
        const payload = { email: "nonexistent@example.com", username: "newUsername" };
  
        findUserByEmail.mockResolvedValue(null);
  
        await expect(findAndUpdateUser(payload)).rejects.toThrow(ApolloError);
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "nonexistent@example.com" });
        expect(updateUserByEmail).not.toHaveBeenCalled();
      });
  
      it("should throw an ApolloError when an error occurs", async () => {
        const payload = { email: "test@example.com", username: "newUsername" };
  
        findUserByEmail.mockRejectedValue(new Error("Database error"));
  
        await expect(findAndUpdateUser(payload)).rejects.toThrow(ApolloError);
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(updateUserByEmail).not.toHaveBeenCalled();
      });
    });
  
    describe("getUser", () => {
      it("should get a user by email", async () => {
        const email = "test@example.com";
        const user = { email: "test@example.com", username: "testUser" };
  
        findUserByEmail.mockResolvedValue(user);
  
        const result = await getUser(email);
  
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(result).toEqual(user);
      });
  
      it("should throw an ApolloError when user is not found", async () => {
        const email = "nonexistent@example.com";
  
        findUserByEmail.mockResolvedValue(null);
  
        await expect(getUser(email)).rejects.toThrow(ApolloError);
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "nonexistent@example.com" });
      });
  
      it("should throw an ApolloError when an error occurs", async () => {
        const email = "test@example.com";
  
        findUserByEmail.mockRejectedValue(new Error("Database error"));
  
        await expect(getUser(email)).rejects.toThrow(ApolloError);
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
      });
    });
  
    describe("deleteUser", () => {
      it("should delete a user", async () => {
        const payload = { email: "test@example.com" };
        const deletedUser = { _id: "123456789", email: "test@example.com" };
  
        deleteUserByEmail.mockResolvedValue(deletedUser);
  
        const result = await deleteUser(payload);
  
        expect(deleteUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(result).toEqual({
          id: "123456789",
          message: "user delete successfully",
        });
      });
  
      it("should throw an ApolloError when user is not found", async () => {
        const payload = { email: "nonexistent@example.com" };
  
        deleteUserByEmail.mockResolvedValue(null);
  
        await expect(deleteUser(payload)).rejects.toThrow(ApolloError);
        expect(deleteUserByEmail).toHaveBeenCalledWith({ email: "nonexistent@example.com" });
      });
  
      it("should throw an ApolloError when an error occurs", async () => {
        const payload = { email: "test@example.com" };
  
        deleteUserByEmail.mockRejectedValue(new Error("Database error"));
  
        await expect(deleteUser(payload)).rejects.toThrow(ApolloError);
        expect(deleteUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
      });
    });
  
    describe("listUser", () => {
      it("should list all users", async () => {
        const payload = {};
  
        const userList = [
          { email: "user1@example.com", username: "user1" },
          { email: "user2@example.com", username: "user2" },
        ];
  
        listAllUsers.mockResolvedValue(userList);
  
        const result = await listUser(payload);
  
        expect(listAllUsers).toHaveBeenCalled();
        expect(result).toEqual(userList);
      });
  
      it("should filter and return a user", async () => {
        const payload = { filter: { email: "test@example.com" } };
        const filteredUser = { email: "test@example.com", username: "testUser" };
  
        findUserByEmail.mockResolvedValue(filteredUser);
  
        const result = await listUser(payload);
  
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
        expect(result).toEqual([filteredUser]);
      });
  
      it("should throw an ApolloError when filtered user is not found", async () => {
        const payload = { filter: { email: "nonexistent@example.com" } };
  
        findUserByEmail.mockResolvedValue(null);
  
        await expect(listUser(payload)).rejects.toThrow(ApolloError);
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "nonexistent@example.com" });
      });
  
      it("should throw an ApolloError when an error occurs", async () => {
        const payload = { filter: { email: "test@example.com" } };
  
        findUserByEmail.mockRejectedValue(new Error("Database error"));
  
        await expect(listUser(payload)).rejects.toThrow(ApolloError);
        expect(findUserByEmail).toHaveBeenCalledWith({ email: "test@example.com" });
      });
    });
  });
  