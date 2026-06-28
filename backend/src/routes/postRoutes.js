const validatePostMiddleware = require("../middlewares/validatePostMiddleware");
const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", validatePostMiddleware, createPost);
router.put("/:id", validatePostMiddleware, updatePost);
router.delete("/:id", deletePost);
module.exports = router;
