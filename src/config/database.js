import mongoose from "mongoose";

const connect = async () => {
  await mongoose.connect("mongodb://localhost/twitter_Dev");
};

export default connect;
