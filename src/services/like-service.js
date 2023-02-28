import { TweetRepository, LikeRepository } from "../repository/index.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    // /api/v1/likes/toggle?id=modelId&type=Tweet
    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository.find(modelId);
      console.log(likeable);
    } else if (modelType == "Comment") {
      // Todo
    } else {
      throw new Error("Unknown model type");
    }

    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove();
      var isAdded = false;
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
      isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
