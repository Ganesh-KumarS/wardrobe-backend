import bcrypt from "bcrypt";
import { hashPassword,validatePassword } from "../../src/Service/passwordService.js";
import { jest } from '@jest/globals';
jest.mock("bcrypt");

describe("Password Utils", () => {
  it("should hash a password", () => {
    const userPassword = "password";
    const hashedPassword = "hashedPassword";

    bcrypt.hashSync = jest.fn().mockReturnValueOnce(hashedPassword);

    const result = hashPassword(userPassword);

    expect(bcrypt.hashSync).toHaveBeenCalledWith(userPassword, 8);
    expect(result).toBe(hashedPassword);
  });

  it("should validate a password", () => {
    const userPassword = "password";
    const dbPassword = "hashedPassword";

    bcrypt.compareSync = jest.fn().mockReturnValueOnce(true);

    const result = validatePassword(userPassword, dbPassword);

    expect(bcrypt.compareSync).toHaveBeenCalledWith(userPassword, dbPassword);
    expect(result).toBe(true);
  });

  // Add more test cases as needed
});
