const Post = require("../models/Post");

/**
 * GET /posts
 */
const getAllPosts = async (req, res) => {
    try {
        const author = req.query.author;

        const query = author ? { author } : {};

        const posts = await Post.find(query);

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
};

/**
 * GET /posts/:id
 */
const getPostById = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching post",
            error: error.message
        });
    }
};

/**
 * POST /posts
 */
const createPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            author: req.body.author,
            tags: req.body.tags,
            likes: 0,
            commentCount: 0
        });

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
};

/**
 * PUT /posts/:id
 */
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                tags: req.body.tags
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({
            message: "Error updating post",
            error: error.message
        });
    }
};

/**
 * DELETE /posts/:id
 */
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully",
            deletedPost
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
