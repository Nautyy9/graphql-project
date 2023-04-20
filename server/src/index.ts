import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "../schema/schema";
import colors from 'colors'
import {connectDB} from '../config/db'

// import mongoose models

dotenv.config();
const app = express();

app.use(cors());
const Port = process.env.PORT || 5000;

connectDB()

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
