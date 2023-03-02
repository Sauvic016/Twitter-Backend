import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req, res) => {
  try {
    const response = await commentService.create(req.query.modelId, req.query.modelType, req.user.id, req.body.content);
    return res.status(201).json({
      success: true,
      data: response,
      message: "Successfully created a new comment",
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
export const getComment = async (req, res) => {
  try {
    const response = await commentService.get(req.params.id);
    return res.status(201).json({
      success: true,
      data: response,
      message: "Succefully fetched the comments",
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
