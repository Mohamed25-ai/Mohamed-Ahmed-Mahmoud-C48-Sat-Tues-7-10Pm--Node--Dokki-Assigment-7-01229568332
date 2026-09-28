import express from "express";
import { router } from "./routes.js";
import { bootstrapDb } from "./db/db.connection.js";
import { globalErrorHandling } from "./middleware/index.js";
const app = express();

export const bootstrap = async () => {
  await bootstrapDb(app);
  app.use(express.json());
  app.use(router);
  app.all("{/*dummy}", (req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
  app.use(globalErrorHandling);
};
