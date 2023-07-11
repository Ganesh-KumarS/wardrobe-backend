import rootResolver from '../../src/Graphql/resolvers';
import {typeDefs} from '../../src/Graphql/typeDefs';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
// Mock the GraphQL server and MongoDB
const startTestServer = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri =  mongoServer.getUri();
  
    // Establish a connection to the mock MongoDB
    const mongoClient = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    const db = mongoClient.db();
  
    // Create an instance of ApolloServer with mocked resolvers and context
    const server = new ApolloServer({
      typeDefs,
      resolvers : rootResolver,
      context: { db },
    });
  
    // Get the `query` and `mutate` functions from the Apollo Server's test client
    const { query, mutate } = createTestClient(server);
  
    return { query, mutate };
  };

  

describe('GraphQL API Tests', () => {
    let query, mutate;
  
    // Before running the tests, start the test server and get the query/mutate functions
    beforeAll(async () => {
      const testServer = await startTestServer();
      query = testServer.query;
      mutate = testServer.mutate;
    });
  
    // After running the tests, close the MongoDB connection
    // afterAll(async () => {
    //   await MongoClient.close();
    // });
  
    it('should create a new user', async () => {
      // Mock input data for the mutation
      const newUser = {
        username: 'Alice Smith',
        email: 'alice@example.com',
        password : 'teest',
        deviceId : '323232'
      };
  
      // Construct the GraphQL mutation
      const CREATE_USER_MUTATION = `
      mutation CreateUser($userInput: CreateUserInput) {
        createUser(userInput: $userInput) {
          email
          token
          username
        }
      }
      `;
  
      // Execute the mutation
      const response = await mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
            userInput: newUser,
        },
      });
  
      // Assert the expected result
      expect(response.data.createUser).toEqual({
        username: 'Alice Smith',
        email: 'alice@example.com',
        token : 'rererererrerre'
      });
    });
  });