import express from "express";

import connect from "./config/database.js";
import apiRoutes from "./routes/index.js";
import { UserRepository, TweetRepository } from "./repository/index.js";
import LikeService from "./services/like-service.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(3000, async () => {
  console.log("Server started at Port", 3000);
  await connect();
  console.log("Mongo db connected");

  const userRepo = new UserRepository();
  const tweetRepo = new TweetRepository();
  const tweets = await tweetRepo.getAll(0, 10);
  // const user = await userRepo.create({
  //   email: "Sauvic@gmail.com",
  //   password: "123456",
  //   name: "Sauvic",
  // });
  const likeService = new LikeService();
  await likeService.toggleLike(tweets[0].id, "Tweet", "63fe42487900095947ae09e9");
});
