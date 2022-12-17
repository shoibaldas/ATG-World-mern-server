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
                type: String,
                required: true,
            },
        },
    ],
    postLikes: {
        type: Number,
    }
});

// postSchema.methods.addComment = async function (postId) {
//     try {
//         const postIndex = this.comments.findIndex(
//             (post) => post.comment.toString() === postId.toString()
//         );
//         this.comments.push({
//             comment: postId,
//         });

//         await this.save();
//     } catch (error) {
//         console.log(error);
//         throw new Error(error);
//     }
// };

const Post = mongoose.model("Post", postSchema);

module.exports = Post;