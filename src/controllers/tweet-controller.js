import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
  try {
    console.log(req.body);
    const response = await tweetService.create(req.body);
    return res.status(201).json({
      success: true,
      data: response,
      message: "Successfully created a new Tweet",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: error,
    });
  }
};
