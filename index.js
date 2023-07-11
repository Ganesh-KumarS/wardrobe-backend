import "dotenv/config";
import express from "express";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { typeDefs } from "./src/Graphql/typeDefs.js";
import rootResolver from "./src/Graphql/resolvers.js";
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';

const app = express();
export const server = new ApolloServer({
  typeDefs,
  resolvers: rootResolver,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
app.use(
  '/',
  cors(),
  bodyParser.json(),
  expressMiddleware(server)
);

console.log(`🚀 Server running at ${url}`);
connect(process.env.MongoDB, { useNewUrlParser: true });
