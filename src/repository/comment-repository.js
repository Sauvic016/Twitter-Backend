import CrudRepository from "./crud-repository.js";
import Comment from "../models/comment.js";

class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
  async find(id) {
    try {
      const tweet = await Comment.findById(id).populate([{ path: "likes" }, { path: "comments" }]);
      return tweet;
    } catch (error) {
      console.log("Something went wrong in Comment Repository layer");
      throw error;
    }
  }
}
export default CommentRepository;
