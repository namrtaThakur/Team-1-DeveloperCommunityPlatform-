const AppError = require("../errors/AppError");
const Post = require("../models/Post");
const User = require("../models/User");

const getAllPosts = async (queryParams) => {
    const {
        page = 1,
        limit = 10,
        sort = "-createdAt",
        search,
        tag,
        author,
        fields,
        status,
    } = queryParams;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
    Number.isNaN(pageNumber) ||
    pageNumber < 1 ||
    Number.isNaN(limitNumber) ||
    limitNumber < 1 ||
    limitNumber > 100
    ) {
      throw new AppError(
        "Invalid page or limit parameter",
        400
    );
    }

    let selectFields = "";
    if (fields) {
    selectFields = fields.split(",").join(" ");
    }
    const filter = {};

    // Filter by author
    if (author) {
        filter.author = author;
    }

    // Filter by tag
    if (tag) {
         filter.tags = {
         $in: tag.split(","),
         };
    }
    if (status) {
    filter.status = status;
    }
    // Search in title or content
    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                content: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    const skip = (pageNumber - 1) * limitNumber;

    const posts = await Post.find(filter)
        .populate("author", "username profileImage")
        .select(selectFields)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .lean();

    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.max(
    1,
    Math.ceil(totalPosts / limitNumber)
    );

    const currentPage = pageNumber;

    const hasNextPage = currentPage < totalPages;

    const hasPreviousPage = currentPage > 1;
    return {
    totalPosts,
    currentPage,
    totalPages,
    limit: limitNumber,
    hasNextPage,
    hasPreviousPage,
    posts,
    };
};

const getPostById = async (id) => {
    const post = await Post.findById(id)
    .populate("author", "username profileImage")
    .lean();

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    return post;
};

const createPost = async (postData) => {
    return await Post.create({
        title: postData.title,
        content: postData.content,
        author: postData.author,
        tags: postData.tags,
    });
};

const updatePost = async (id, postData, userId) => {
    const post = await Post.findById(id);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.author.toString() !== userId) {
        throw new AppError(
            "You are not authorized to update this post",
            403
        );
    }

    return await Post.findByIdAndUpdate(
        id,
        {
            ...postData,
            isEdited: true,
        },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

const deletePost = async (id, userId) => {
    const post = await Post.findById(id);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.author.toString() !== userId) {
        throw new AppError(
            "You are not authorized to delete this post",
            403
        );
    }

    return await Post.findByIdAndDelete(id);
};

const likePost = async (postId, userId) => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (post.likes.some((id) => id.equals(userId))) {
        throw new AppError("Post already liked", 409);
    }

    post.likes.push(userId);
    user.likedPosts.push(postId);

    await post.save();
    await user.save();

    return post;
};

const unlikePost = async (postId, userId) => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!post.likes.some((id) => id.equals(userId))) {
        throw new AppError("Post is not liked yet", 409);
    }

    post.likes.pull(userId);
    user.likedPosts.pull(postId);

    await post.save();
    await user.save();

    return post;
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
};
