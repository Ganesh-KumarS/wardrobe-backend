import { createNewPost, getPostById } from "../Service/postServices.js";
import {
  createNewUser,
  loginUser,
  findAndUpdateUser,
  getUser,
  deleteUser,
  listUser,
} from "../Service/userService.js";

const rootResolver = {
  Query : {
    getUserByEmail : async (_,args) =>{
      const userPayload = args.email;
      const getUserInfo = await getUser(userPayload)
      return getUserInfo 
    },
    listUserByEmail :async (_,args) =>{
       const listUserInfo = listUser(args)
       return listUserInfo
      },
      getPost : async(_,args)=>{
        const userPayload = args.userId
        return await getPostById(userPayload)
      }
  },
  Mutation: {
    createUser: async (_, args) => {
      const userPayload = args.userInput;
      const createdUserInfo = await createNewUser(userPayload);
      return createdUserInfo;
    },
    loginUser: async (_, arg) => {
      const userPayload = arg.userInput;
      const loggedUserInfo = await loginUser(userPayload);
      return loggedUserInfo;
    },
    updateUsername: async (_, args) => {
      const userPayload = args.userNameInput;
      const updatedUserInfo = await findAndUpdateUser(userPayload);
      return updatedUserInfo;
    },
    deleteUser : async(_,args) => {
      const userPayload = args.userEmail
      const deleteUserInfo = await deleteUser(userPayload)
      return deleteUserInfo
    },
    createPost : async(_,args) => {
      const userPayload = args.userInput
     return await createNewPost(userPayload)
    },
  },
};
export default rootResolver;
