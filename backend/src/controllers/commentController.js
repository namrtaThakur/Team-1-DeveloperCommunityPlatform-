const asyncHandler = require("../utils/asyncHandler");
const commentService = require("../services/commentService");

/**
 * POST /posts/:id/comments
 */
const createComment = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.userId;
    const { content } = req.body;

    const comment = await commentService.createComment(
        postId,
        userId,
        content
    );

    res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: comment,
    });
});

/**
 * GET /posts/:id/comments
 */
const getComments = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const comments = await commentService.getComments(postId);

    res.status(200).json({
         success: true,
         message: "Comments fetched successfully",
         data: comments,
    });
});

/**
 * DELETE /comments/:commentId
 */
const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.userId;

    const comment = await commentService.deleteComment(
        commentId,
        userId
    );

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
        data: comment,
    });
});

/**
 * PUT /comments/:commentId
 */
const updateComment = asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.userId;
    const { content } = req.body;

    const comment = await commentService.updateComment(
        commentId,
        userId,
        content
    );

    res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        data: comment,
    });
});

module.exports = {
    createComment,
    getComments,
    deleteComment,
    updateComment,
};
