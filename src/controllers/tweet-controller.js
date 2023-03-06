import TweetService from "../services/tweet-service.js";
import upload from "../config/file-upload-s3-config.js";

const singleUploader = upload.single("image");

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
  try {
    singleUploader(req, res, function (err, data) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      console.log("Image url is ", req.file);
      return res.status(200).json({
        message: "Ok",
      });
    });
    // const response = await tweetService.create(req.body);
    // return res.status(201).json({
    //   success: true,
    //   data: response,
    //   message: "Successfully created a new Tweet",
    //   err: {},
    // });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: error,
    });
  }
};

export const getTweet = async (req, res) => {
  try {
    const response = await tweetService.get(req.params.id);
    return res.status(200).json({
      success: true,
      data: response,
      message: "Successfully fetched a Tweet",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: error,
    });
  }
};
