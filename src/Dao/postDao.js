import PostModel from '../Models/postModel.js'

export const createPost=async(payload)=>{
    const create_Post = new PostModel({
        userId: payload.id,
        title: payload.title,
        description: payload.description,
        likeCount: payload.likeCount,
        viewCount: payload.viewCount,
        bannerImage: payload.bannerImage,
        profileImage: payload.profileImage
    })
    const created = create_Post.save()
    return created
}
export const getPost=async(payload)=>{
    const getPostData = PostModel.findOne({userId:payload})
    return getPostData
}