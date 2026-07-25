const AppError = require("../errors/AppError");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (postId, userId, content) => {
    // 1. Check whether post exists
    const post = await Post.findById(postId);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    // 2. Create the comment
    const comment = await Comment.create({
        post: postId,
        author: userId,
        content,
    });

    // 3. Update comments count
    post.commentsCount++;

    // 4. Save updated post
    await post.save();

    // 5. Return created comment
    return comment;
};

const getComments = async (postId) => {
    // 1. Check if post exists
    const post = await Post.findById(postId);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    // 2. Fetch all comments
    const comments = await Comment.find({
        post: postId,
    })
        .populate("author", "username profileImage")
        .sort({
            createdAt: -1,
        });

    // 3. Return comments
    return comments;
};

const deleteComment = async (commentId, userId) => {
    // 1. Find the comment
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new AppError("Comment not found", 404);
    }

    // 2. Check ownership
    if (comment.author.toString() !== userId) {
        throw new AppError(
            "You are not authorized to delete this comment",
            403
        );
    }

    // 3. Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // 4. Find the parent post
    const post = await Post.findById(deletedComment.post);

    // 5. Decrement comments count
    post.commentsCount--;

    // 6. Save the updated post
    await post.save();

    // 7. Return deleted comment
    return deletedComment;
};

const updateComment = async (commentId, userId, content) => {
    // 1. Find the comment
    const comment = await Comment.findById(commentId);

    // 2. Check existence
    if (!comment) {
        throw new AppError("Comment not found", 404);
    }

    // 3. Ownership check
    if (comment.author.toString() !== userId) {
        throw new AppError(
            "You are not authorized to update this comment",
            403
        );
    }

    // 4. Update content
    comment.content = content;

    // 5. Save
    await comment.save();

    // 6. Return updated comment
    return comment;
};

module.exports = {
    createComment,
    getComments,
    deleteComment,
    updateComment,
};
