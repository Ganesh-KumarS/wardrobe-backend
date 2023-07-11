import { ApolloError } from "apollo-server-errors";
import { createPost, getPost } from "../Dao/postDao.js";
import { messageString } from "../Utils/constants.js";

export const createNewPost = async (payload) => {
  try {
    console.log('daa-=-=-',payload)
    const {id,title,viewCount, description} = payload
    if(!id || !title || !viewCount ||  !description){
      throw new ApolloError(messageString["REQUIRED_DATA_MISSING"]);
    }
    const userPost = await createPost(payload);
    return userPost;
  } catch (error) {
    console.log("error", error);
    throw new ApolloError(error);
  }
};
export const getPostById = async (payload) => {
  try {
    const get_post = await getPost(payload);
    return get_post;
  } catch (error) {}
};
