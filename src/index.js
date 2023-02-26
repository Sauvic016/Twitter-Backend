import express from "express";
import connect from "./config/database.js";

const app = express();

app.listen(3000, async () => {
  console.log("Server started at Port", 3000);
  await connect();
  console.log("Mongo db connected");
});
