import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { readCredentials, saveCredentials } from "./utils/credentials";
import { connectDatabase } from "./utils/database";

if (process.env.MONGO_URL === undefined) {
  throw new Error("Missing env Mongo_URL");
}

const app = express();
const port = 5000;

app.use(express.json());

app.get("/api/credentials", async (_request, response) => {
  const credentials = await readCredentials();
  response.json(credentials);
});

app.post("/api/credentials", async (request, response) => {
  await saveCredentials(request.body, "666");
  response.send("Done");
});

connectDatabase(process.env.MONGO_URL).then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`pwmanager listening at http://localhost:${port}`);
  });
});

app.delete("/api/credentials", (_request, response) => {
  response.send("Delete");
});
