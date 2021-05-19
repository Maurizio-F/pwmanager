import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDatabase } from "./utils/database";

if (process.env.MONGO_URL === undefined) {
  throw new Error("Missing env Mongo_URL");
}

const app = express();
const port = 5000;

app.get("/api/credentials", (_request, response) => {
  response.json("All credentials request");
});

app.post("/api/credentials", (_request, response) => {
  response.send("Add new credential");
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log("pwmanager listening at http://localhost:${port}");
  });
});

app.delete("/api/credentials", (_request, response) => {
  response.send("Delete");
});
