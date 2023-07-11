import UserModel from "../Models/userModel.js";
import { hashPassword } from "../Service/passwordService.js";

export const createUser = async (email, password, deviceId, username) => {
  const hashedPassword = hashPassword(password);
  const createNewUser = new UserModel({
    username,
    password: hashedPassword,
    email,
    deviceId,
  });
  const response = await createNewUser.save();
  return response;
};

export const findUserByEmail = async (email) => {
  const response = await UserModel.findOne(email);
  return response;
};
export const deleteUserByEmail = async (email) => {
  const response = await UserModel.findOneAndDelete(email);
  return response;
};

export const updateUserByEmail = async (email, payload) => {
  const response = await UserModel.findOneAndUpdate({ email }, payload, {
    returnOriginal: false,
  });
  return response;
};

export const listAllUsers = async ()=>{
  const response =await UserModel.find()
  return response
}
