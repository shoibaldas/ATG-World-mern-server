const HTTP_STATUS = require("../utils/httpStatus");
const { success, failure } = require("../utils/commonResponse");
const { validationResult } = require("express-validator");
const { promisify } = require("util");
const Post = require("../models/post");

//Create a new Post
class postController {
    async createPost(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure("Invalid inputs", errors.array()));
            }
            const postContent = req.body.postContent;
            const userId = req.body.userId;
            const email = req.body.email;
            const username = req.body.username;

            const post = new Post({
                postContent,
                userId,
                email,
                username
            });
            await post.save();
            return res
                .status(HTTP_STATUS.OK)
                .send(success("Post has been published successfully", []));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // get post
    async getPost(req, res, next) {
        try {
            const allPost = await Post.find()
                .populate("_id", "name -_id")
                .exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success("All post has been fetched successfully", allPost));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    //get a post
    async getAPost(req, res, next) {
        try {
            const postId = req.params.postId;
            const post = await Post.findOne({ _id: postId })
                .populate("_id", "name -_id")
                .exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success("Post has been fetched successfully", post));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    //edit a post
    async postEdit(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure("Invalid inputs", errors.array()));
            }

            const postId = req.params.postId;
            const updatedPost = await Post.findById(postId).exec();
            if (updatedPost) {
                updatedPost.postContent = req.body.postContent
                    ? req.body.postContent
                    : updatedPost.postContent;
                await updatedPost.save();
                return res
                    .status(HTTP_STATUS.OK)
                    .send(success("Post updated successfully", updatedPost));
            }
            return res
                .status(HTTP_STATUS.NOT_FOUND)
                .send(failure("Post is not found to update"));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    //delete a Post
    async deletePost(req, res, next) {
        try {
            const postId = req.params.postId;
            await Post.findOneAndDelete({ _id: postId }).exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success("Post deleted successfully"));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}


module.exports = new postController();