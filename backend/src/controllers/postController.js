const asyncHandler = require("../utils/asyncHandler");
const postService = require("../services/postService");

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     description: Retrieve posts with pagination, filtering, searching and sorting
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of posts per page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: node
 *         description: Search posts by title or content
 *
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *           example: backend
 *         description: Filter posts by tag
 *
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *           example: 6a55e0d6b8a2a8babad64752
 *         description: Filter posts by author
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: -createdAt
 *         description: Sort posts
 *
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 */
/**
 * GET /posts
 */

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await postService.getAllPosts(req.query);

    res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    data: posts,
    });
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by id
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *
 *       404:
 *         description: Post not found
 */

/**
 * GET /posts/:id
 */
const getPostById = asyncHandler(async (req, res) => {
    const post = await postService.getPostById(req.params.id);

    res.status(200).json({
    success: true,
    message: "Post fetched successfully",
    data: post,
    });
});


/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My Backend Journey
 *               content:
 *                 type: string
 *                 example: Learning Express and MongoDB
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - node
 *                   - mongodb
 *
 *     responses:
 *       201:
 *         description: Post created successfully
 *
 *       401:
 *         description: Unauthorized
 */
/**
 * POST /posts
 */

const createPost = asyncHandler(async (req, res) => {
    const postData = {
        ...req.body,
        author: req.user.userId,
    };

    const newPost = await postService.createPost(postData);

    res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost,
});
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       200:
 *         description: Post updated successfully
 *
 *       403:
 *         description: Not authorized
 */
/**

 * PUT /posts/:id
 */
const updatePost = asyncHandler(async (req, res) => {
    const updatedPost = await postService.updatePost(
        req.params.id,
        req.body,
        req.user.userId
    );

    res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: updatedPost,
    });
});


/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *
 *       403:
 *         description: Not authorized
 */

/**
 * DELETE /posts/:id
 */
const deletePost = asyncHandler(async (req, res) => {
    const deletedPost = await postService.deletePost(
        req.params.id,
        req.user.userId
    );

    res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    data: deletedPost,
    });
});

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Like a post
 *     tags:
 *       - Likes
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *
 *     responses:
 *       200:
 *         description: Post liked successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Post not found
 *
 *       409:
 *         description: Post already liked
 */

/**
 * POST /posts/:id/like
 */
const likePost = asyncHandler(async (req, res) => {
    const post = await postService.likePost(
        req.params.id,
        req.user.userId
    );

    res.status(200).json({
    success: true,
    message: "Post liked successfully",
    data: post,
    });
});

/**
 * DELETE /posts/:id/like
 */
const unlikePost = asyncHandler(async (req, res) => {
    const post = await postService.unlikePost(
        req.params.id,
        req.user.userId
    );

    res.status(200).json({
    success: true,
    message: "Post unliked successfully",
    data: post,
    });
});

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
};
