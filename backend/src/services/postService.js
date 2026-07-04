const Post = require("../models/Post");

const getAllPosts = async (author) => {
    const query = author ? { author } : {};

    return await Post.find(query);
};

const getPostById = async (id) => {
    return await Post.findById(id);
};

const createPost = async (postData) => {
    return await Post.create({
        title: postData.title,
        content: postData.content,
        author: postData.author,
        tags: postData.tags
    });
};

const updatePost = async (id, postData) => {
    return await Post.findByIdAndUpdate(
        id,
        {
            title: postData.title,
            content: postData.content,
            author: postData.author,
            tags: postData.tags
        },
        { new: true,
          runValidators: true  
        }
    );
};

const deletePost = async (id) => {
    return await Post.findByIdAndDelete(id);
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
