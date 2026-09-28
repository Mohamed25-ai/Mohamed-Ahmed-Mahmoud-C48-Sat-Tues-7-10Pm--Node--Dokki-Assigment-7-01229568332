import { MongoClient } from "mongodb";
import { DB_URI, PORT } from "../config/env.config.js";

export const mongoClient = new MongoClient(DB_URI);
export const bootstrapDb = async (app) => {
  try {
    await mongoClient.connect();
    console.log("Db connected successfully");
    app.listen(PORT, () => {
    console.log(`port ${PORT} is runnung`);
  });
  } catch (error) {
    console.log(error);
    console.log("Db connection error");
  }
};

export const db = mongoClient.db("assignment7");
