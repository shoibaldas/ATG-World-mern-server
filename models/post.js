const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postContent: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comments: [
        {
            comment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Topic",
            },
        },
    ],
    postLikes: {
        type: Number,
    }
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;