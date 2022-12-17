const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentContent: {
        type: String,
        required: true,
    },
    postId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true,
        // ref: "Post",
    },
    username: {
        type: String,
        required: true,
    },
});


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;