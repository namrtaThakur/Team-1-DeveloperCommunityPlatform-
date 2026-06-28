const posts = [

        {
            id: 1,
            title: "Understanding Express Router",
            author: "Rudra",
            tags: ["Node", "Express"],
            likes: 45,
            commentCount: 12
        },

        {
            id: 2,
            title: "Building Responsive UI",
            author: "Namrata",
            tags: ["Next.js", "React"],
            likes: 31,
            commentCount: 8
        },

        {
            id: 3,
            title: "MongoDB Basics",
            author: "Misthi",
            tags: ["MongoDB"],
            likes: 19,
            commentCount: 5
        }

    ];
function getAllPosts(req, res) {
    const author = req.query.author;
    if (author === undefined) {

    return res.json(posts);
    }
    const filteredPosts = posts.filter(function (currentPost) {

    return currentPost.author === author;

});

res.json(filteredPosts);

}
function getPostById(req, res) {

    const id = Number(req.params.id);

    const post = posts.find(function (currentPost) {

        return currentPost.id === id;

    });

    if (post === undefined) {

        return res.status(404).json({

            message: "Post not found"

        });

    }

    res.json(post);

}

function createPost(req, res) {

    const newPost = {

        id: posts.length + 1,

        title: req.body.title,

        author: req.body.author,

        tags: req.body.tags,

        likes: 0,

        commentCount: 0

    };

    posts.push(newPost);

    return res.status(201).json(newPost);
}

function updatePost(req, res) {

    const id = Number(req.params.id);

    const post = posts.find(function (currentPost) {
        return currentPost.id === id;
    });

    if (post === undefined) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    post.title = req.body.title;
    post.author = req.body.author;
    post.tags = req.body.tags;

    return res.json(post);
}

function deletePost(req, res) {

    const id = Number(req.params.id);

    const index = posts.findIndex(function (currentPost) {

        return currentPost.id === id;

    });

    if (index === -1) {

        return res.status(404).json({

            message: "Post not found"

        });

    }

    const deletedPost = posts.splice(index, 1);

    return res.status(200).json({

        message: "Post deleted successfully",

        deletedPost: deletedPost[0]

    });

}

module.exports = {

    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
