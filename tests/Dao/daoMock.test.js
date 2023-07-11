import UserModel from "../../src/Models/userModel.js";
import { createUser, findUserByEmail, updateUserByEmail } from "../../src/Dao/userDao.js";
import { jest } from "@jest/globals";

jest.mock("../../src/Models/userModel.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("User Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const saveMock = jest.fn().mockResolvedValueOnce("mockedUser");
    const UserModelMock = jest.fn().mockImplementation(() => ({
      save: saveMock,
    }));
    UserModel.mockImplementation(UserModelMock);

    const email = "test@example.com";
    const password = "password123";
    const deviceId = "device123";
    const username = "testuser";

    const result = await createUser(email, password, deviceId, username);

    expect(UserModel).toHaveBeenCalledTimes(1);
    expect(UserModel).toHaveBeenCalledWith({
      username,
      password: expect.any(String),
      email,
      deviceId,
    });

    expect(mockedSave).toHaveBeenCalledTimes(1);
    expect(result).toBe("mockedUser");
  });

  it("should find a user by email", async () => {
    const email = "test@example.com";
    const mockedFindOne = jest.fn().mockResolvedValueOnce("mockedUser");
    UserModel.findOne = mockedFindOne;

    const result = await findUserByEmail(email);

    expect(UserModel.findOne).toHaveBeenCalledTimes(1);
    expect(UserModel.findOne).toHaveBeenCalledWith(email);
    expect(result).toBe("mockedUser");
  });

  it("should update a user by email", async () => {
    const email = "test@example.com";
    const payload = { username: "updatedUser" };
    const mockedFindOneAndUpdate = jest
      .fn()
      .mockResolvedValueOnce("updatedUser");
    UserModel.findOneAndUpdate = mockedFindOneAndUpdate;

    const result = await updateUserByEmail(email, payload);

    expect(UserModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith(
      { email },
      payload,
      {
        returnOriginal: false,
      }
    );
    expect(result).toBe("updatedUser");
  });
});
