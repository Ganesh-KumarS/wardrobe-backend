import jwt from "jsonwebtoken";
import { getJwtToken,verifyJwtToken } from "../../src/Service/authService";
import { jest } from '@jest/globals';
jest.mock("jsonwebtoken");

describe("JWT Utils", () => {
  beforeAll(() => {
    process.env.SecretKey = "testSecretKey";
  });

  it("should generate a JWT token", () => {
    const data = { userId: "123" };
    const expectedToken = "mockedToken";

    jwt.sign = jest.fn().mockReturnValueOnce(expectedToken);

    const token = getJwtToken(data);

    expect(jwt.sign).toHaveBeenCalledWith(data, process.env.SecretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400,
    });
    expect(token).toBe(expectedToken);
  });

  it("should verify a JWT token", () => {
    const token = "mockedToken";
    const expectedDecodedToken = { userId: "123" };
    jwt.verify = jest.fn().mockReturnValueOnce(expectedDecodedToken);

    const decodedToken = verifyJwtToken(token);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.SecretKey, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
    });
    expect(decodedToken).toBe(expectedDecodedToken);
  });

  // Add more test cases as needed
});
