export const typeDefs = `##graphql
  type User {
    username: String
    email: String
    message: String
  }
  type Data {
    id: String
    username: String
    email: String
  }
  type Post {
    userId: String
    title: String
    description: String
    likeCount: Int
    viewCount: Int
    bannerImage: String
    profileImage: String
  }
  input DataFilter {
    email: String
  }
  type LoginUser {
    email: String
    token: String
  }
  type DeletedUser {
    message: String
  }
  type userIdInput{
    userId : String
  }

  input CreateUserInput {
    email: String
    username: String
    password: String
    deviceId: String
  }
  input LoginUserInput {
    email: String
    password: String
    deviceId: String
  }
  input UpdateUsernameInput {
    email: String
    username: String
  }
  input userEmailInput {
    email: String
  }
  input CreatePostInput {
    id: String
    title: String
    description: String
    likeCount: Int
    viewCount: Int
    bannerImage: String
    profileImage: String
  }

  type Query {
    getUserByEmail(email: String): Data
    listUserByEmail(filter: DataFilter): [Data]
    getPost(userId : String) : Post
  }

  type Mutation {
    createUser(userInput: CreateUserInput): User!
    loginUser(userInput: LoginUserInput): LoginUser!
    updateUsername(userNameInput: UpdateUsernameInput): User!
    deleteUser(userEmail: userEmailInput): DeletedUser!
    createPost(userInput: CreatePostInput): Post!
  }
`;
