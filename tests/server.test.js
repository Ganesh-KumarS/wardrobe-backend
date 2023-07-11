import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server-express";
import mongoose,{ connect } from "mongoose";

import rootResolver from '../src/Graphql/resolvers';
import { typeDefs } from '../src/Graphql/typeDefs';
import express from 'express';

const testServer = new ApolloServer({
  typeDefs,
  resolvers: rootResolver,
});

  const app = express();
beforeAll(async () => {
  // Connect to the MongoDB test database
  await connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  testServer.start().then((res) => {
    testServer.applyMiddleware({ app, path: "/" });
    return app.listen({ port: 5000 }, async() =>
     console.log(`Gateway API running at port 5000`)
    );
  });
});

afterAll(async () => {
  // Disconnect from the MongoDB test database
  await mongoose.disconnect();
});

describe("GraphQL API Tests", () => {
  it("should return the correct data for a query", async () => {
    // Create a test client using the test server
    const { query } = createTestClient(testServer);

    // Perform a sample query or mutation
    const GET_USERS = `
    query Query($email: String) {
        getUserByEmail(email: $email) {
          id
          username
          email
        }
      }
    `;
    const variables = {
        "email": "kiran@10decoders.in"
      }

    // Send the query to the server
    const response = await query({ query: GET_USERS,variables });
    // Assert the response to check if it matches the expected data
    expect(response.data?.getUserByEmail).toEqual( {
            "id": "64a502f9d6ca1a82521954f7",
            "username": "kiran10d",
            "email": "kiran@10decoders.in"
    });
  });
  // Add more test cases as needed
});
