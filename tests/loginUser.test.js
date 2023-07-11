import { ApolloError } from "apollo-server-errors";
import { loginUser } from "../src/Service/userService.js";
import { findUserByEmail } from "../src/Dao/userDao.js";
import { getJwtToken } from "../src/Service/authService.js";
import { validatePassword } from "../src/Service/passwordService.js";
import { messageString } from "../src/Utils/constants.js";
import { jest } from '@jest/globals';

// Mock the dependencies
jest.mock("../src/Dao/userDao.js");
jest.mock("../src/Service/authService.js");
jest.mock("../src/Service/passwordService.js");

describe("loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return the user information and token when login is successful", async () => {
    // Mock the input payload
    const payload = {
      email: "test@example.com",
      password: "password123",
      deviceId: "device123",
    };

    // Mock the user information returned from the DAO
    const userInfo = {
      _id: "user123",
      email: "test@example.com",
      username: "testuser",
      deviceId: "device123",
      password: "hashedPassword",
    };
    findUserByEmail.mockResolvedValue(userInfo);

    // Mock the password validation result
    validatePassword.mockReturnValue(true);

    // Mock the JWT token generation
    const token = "generatedToken";
    getJwtToken.mockReturnValue(token);

    // Call the loginUser function
    const result = await loginUser(payload);

    // Verify the expected result
    expect(result).toEqual({
      id: userInfo._id,
      email: userInfo.email,
      token: token,
    });

    // Verify that the dependencies were called with the correct arguments
    expect(findUserByEmail).toHaveBeenCalledWith({ email: payload.email });
    expect(validatePassword).toHaveBeenCalledWith(
      payload.password,
      userInfo.password
    );
    expect(getJwtToken).toHaveBeenCalledWith({
      id: userInfo.email,
      username: userInfo.username,
    });
  });

  test("should throw an ApolloError when required data is missing", async () => {
    // Mock the input payload with missing data
    const payload = {
      email: "test@example.com",
      // Missing password and deviceId
    };

    // Call the loginUser function and expect it to throw an error
    await expect(loginUser(payload)).rejects.toThrow(ApolloError);

    // Verify that the error message is as expected
    await expect(loginUser(payload)).rejects.toThrow(
      messageString["REQUIRED_DATA_MISSING"]
    );
  });

  // Add more test cases to cover other possible scenarios, such as user not found, device mismatch, invalid credentials, etc.
});
