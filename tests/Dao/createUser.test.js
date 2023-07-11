import userModel from "../../src/Models/userModel.js";
import { hashPassword } from "../../src/Service/passwordService.js";
import { createUser } from '../../src/Dao/userDao';
import {jest} from '@jest/globals'

// Mock dependencies
jest.mock("../../src/Models/userModel.js");
jest.mock("../../src/Service/passwordService.js");

describe("createUser", () => {
  const email = "test@example.com";
  const password = "password123";
  const deviceId = "device123";
  const username = "testuser";

  it("should create a new user", async () => {
    // Mock the hashPassword function
    const hashedPassword = "hashed123";
    hashPassword.mockReturnValue(hashedPassword);

    // Mock the UserModel's save function
    const saveMock = jest.fn().mockResolvedValue({ _id: "user123" });
    UserModel.mockImplementation(() => {
      return {
        save: saveMock,
      };
    });

    const response = await createUser(email, password, deviceId, username);

    // Check if the UserModel constructor was called with the correct arguments
    expect(UserModel).toHaveBeenCalledWith({
      username,
      password: hashedPassword,
      email,
      deviceId,
    });

    // Check if the save function was called
    expect(saveMock).toHaveBeenCalled();

    // Check the response
    expect(response).toEqual({ _id: "user123" });
  });

  it("should handle errors", async () => {
    // Mock the hashPassword function
    hashPassword.mockImplementation(() => {
      throw new Error("Password hashing failed");
    });

    // Mock the UserModel's save function
    const saveMock = jest.fn();
    UserModel.mockImplementation(() => {
      return {
        save: saveMock,
      };
    });

    // Ensure that the function throws an error
    await expect(
      createUser(email, password, deviceId, username)
    ).rejects.toThrow("Password hashing failed");

    // Ensure that the save function was not called
    expect(saveMock).not.toHaveBeenCalled();
  });
});
