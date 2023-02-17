import express from "express";
import connect from "./config/database.js";

import TweetRepository from "./repository/tweet-repository.js";
// import Comment from "./models/comment.js";

const app = express();

app.listen(3000, async () => {
  console.log("Server started at Port", 3000);
  await connect();
  console.log("Mongo db connected");

  // const tweet = await Tweet.create({
  //   content: "This is the second tweet",
  // });
  // console.log(tweet);

  const tweetRepo = new TweetRepository();
  // const tweet = await tweetRepo.create({ content: "This a tweet from abc", userEmail: "abc@gmail.com" });
  // console.log(tweet);
  // const comment = await Comment.create({
  //   content: "new comment",
  // });
  // tweet.comments.push(comment);
  // await tweet.save();
  // console.log(tweet);

  // const tweet = await tweetRepo.getWithComments("63ef944634ebfc71832c9d6e");
  // console.log(tweet);
});
