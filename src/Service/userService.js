import { ApolloError } from "apollo-server-errors";
import {
  createUser,
  deleteUserByEmail,
  findUserByEmail,
  listAllUsers,
  updateUserByEmail,
} from "../Dao/userDao.js";
import { getJwtToken } from "../Service/authService.js";
import { validatePassword } from "../Service/passwordService.js";
import { messageString } from "../Utils/constants.js";

export const createNewUser = async (payload) => {
  try {
    if (!payload.deviceId || !payload.email) {
      throw new ApolloError(messageString["REQUIRED_DATA_MISSING"]);
    }
    const existingUser = await findUserByEmail({ email: payload.email });
    if (existingUser !== null) {
      throw new ApolloError(messageString["EMAIL_ALREADY_EXISTED"]);
    }
    const { email, password, deviceId, username } = payload;
    const newUser = await createUser(email, password, deviceId, username);
    const data = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      message: "user created successfully",
    };
    return data;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const loginUser = async (payload) => {
  try {
    const { email, password, deviceId } = payload;
    if (!deviceId || !password || !email) {
      throw new ApolloError(messageString["REQUIRED_DATA_MISSING"]);
    }
    const userInfo = await findUserByEmail({ email });
    if (userInfo === null) {
      throw new ApolloError(messageString["USER_NOT_FOUND"]);
    }
    if (userInfo.deviceId !== deviceId) {
      throw new ApolloError(messageString["DEVICE_MISMATCHED"]);
    }
    const userPassword = userInfo.password;
    const validPassword = validatePassword(password, userPassword);
    if (!validPassword) {
      throw new ApolloError(messageString["INVALID_CREDENTIALS"]);
    }
    const token = getJwtToken({
      id: userInfo.email,
      username: userInfo.username,
    });
    let response = {
      id: userInfo._id,
      email: userInfo.email,
      token: token,
    };
    return response;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const findAndUpdateUser = async (payload) => {
  try {
    const { email, username } = payload;
    const existingUser = await findUserByEmail({ email });
    if (existingUser === null) {
      throw new ApolloError(messageString["USER_NOT_FOUND"]);
    }
    const updatedUser = await updateUserByEmail(email, { username });
    return updatedUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const getUser = async (email) => {
  try {
    const getData = await findUserByEmail({ email });
    if (getData === null) {
      throw new ApolloError(messageString["USER_NOT_FOUND"]);
    }
    return getData;
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const deleteUser = async (payload) => {
  const { email } = payload;
  try {
    const deletedUser = await deleteUserByEmail({ email });
    if (deletedUser === null) {
      throw new ApolloError(messageString["USER_NOT_FOUND"]);
    }
    return {
      id: deleteUser._id,
      message: "user delete successfully",
    };
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const listUser = async (payload) => {
  try {
    if (payload && !payload?.filter) {
      const list = await listAllUsers();
      return list;
    }
    if (payload && payload?.filter) {
      const { email } = payload.filter;
      const listAll = await findUserByEmail({ email });
      if(listAll == null){
        throw new ApolloError(messageString["USER_NOT_FOUND"])
      }
      return [listAll]
    }
  } catch (error) {
    throw new ApolloError(error);
  }
};
