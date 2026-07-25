const validateObjectId = require("../middlewares/validateObjectId");
const validatePostMiddleware = require("../middlewares/validatePostMiddleware");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
} = require("../controllers/postController");

const {
    createComment,
    getComments,
} = require("../controllers/commentController");

router.get("/", getAllPosts);

router.get("/:id", validateObjectId("id"), getPostById);

router.post("/", authMiddleware, validatePostMiddleware, createPost);

router.put("/:id", validateObjectId("id"), authMiddleware, validatePostMiddleware, updatePost);

router.delete("/:id", validateObjectId("id"), authMiddleware, deletePost);

// Likes Routes
router.post("/:id/like", validateObjectId("id"), authMiddleware, likePost);

router.delete("/:id/like", validateObjectId("id"), authMiddleware, unlikePost);

// Comment Routes
router.post("/:id/comments", validateObjectId("id"), authMiddleware, createComment);

router.get("/:id/comments", validateObjectId("id"), getComments);

module.exports = router;
