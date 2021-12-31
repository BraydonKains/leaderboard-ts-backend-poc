import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { pingRouter } from "./controllers/ping";
import { userRouter } from "./controllers/users";

dotenv.config();

createConnection().then(() => {
  const app = express();
  app.use(express.json());

  app.use("/ping", pingRouter())
  app.use("/users", userRouter());

  app.listen(4000, "", () => console.log("hi I'm on 4000"));
});
