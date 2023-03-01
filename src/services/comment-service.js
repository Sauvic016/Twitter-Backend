import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  async create(modelId, modelType, userId, content) {
    try {
      if (modelType == "Tweet") {
        var commentable = await this.tweetRepository.find(modelId);
      } else if (modelType == "Comment") {
        var commentable = await this.commentRepository.find(modelId);
      } else {
        throw new Error("Unknown model type");
      }

      const comment = await this.commentRepository.create({
        content,
        userId,
        onModel: modelType,
        commentable: modelId,
        comments: [],
      });
      commentable.comments.push(comment);
      await commentable.save();
      return comment;
    } catch (error) {
      console.log("Something went wrong in comment-service");
      throw error;
    }
  }
  async get(commentId) {
    try {
      const response = await this.commentRepository.find(commentId);
      return response;
    } catch (error) {
      console.log("something went wrong in comment-service");
    }
  }
}
export default CommentService;
