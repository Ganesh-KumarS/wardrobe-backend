import { ApolloServer } from 'apollo-server';
import {jest} from '@jest/globals'

import rootResolver from '../../src/Graphql/resolvers';
import {typeDefs} from '../../src/Graphql/typeDefs';
import { graphql } from 'graphql';

jest.useFakeTimers();

describe('GraphQL API Tests', () => {
  it('should create user', async () => {
      // Define the query/mutation to test
      const CREATE_USER_MUTATION = `
      mutation CreateUser($userInput: CreateUserInput) {
        createUser(userInput: $userInput) {
          email
          token
          username
        }
      }
      `;
  
      const variables = {
        "userInput": {
          "deviceId": "234",
          "email": "tesewddeddrtsfra",
          "password": "esgsfd",
          "username": "dewetetes"
        }
      };
      const schema = new ApolloServer({ typeDefs, resolvers: rootResolver });
      // const schema = makeExecutableSchema({
      //   typeDefs: typeDefs,
      //   resolvers: rootResolver,
      // });
  
      // Execute the GraphQL query
      const result = await graphql({schema, source: CREATE_USER_MUTATION, variableValues: variables});
      // Compare the result with the expected response
      expect(result).not(expectedResponse);
      // Execute the query/mutation
      // const response = await mutate({ mutation: CREATE_USER_MUTATION, variables });
  
      // Assert the response
      // expect(result.data).toBeDefined();
    //   expect(response.data.user.id).toBe('user123');
    //   expect(response.data.user.name).toBe('John Doe');
    //   expect(response.data.user.email).toBe('john@example.com');
    });
  
    // it('should create a new user', async () => {
    //   // Define the mutation to test
    //   const CREATE_USER_MUTATION = `
    //     mutation CreateUser($input: CreateUserInput!) {
    //       createUser(input: $input) {
    //         id
    //         name
    //         email
    //       }
    //     }
    //   `;
  
    //   // Set the variables for the mutation
    //   const variables = {
    //     input: {
    //       name: 'Jane Doe',
    //       email: 'jane@example.com'
    //     }
    //   };
  
    //   // Execute the mutation
    //   const response = await mutate({ mutation: CREATE_USER_MUTATION, variables });
  
    //   // Assert the response
    //   expect(response.data.createUser).toBeDefined();
    //   expect(response.data.createUser.id).toBeDefined();
    //   expect(response.data.createUser.name).toBe('Jane Doe');
    //   expect(response.data.createUser.email).toBe('jane@example.com');
    // });
  });
  