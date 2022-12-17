const HTTP_STATUS = require("../utils/httpStatus");
const { success, failure } = require("../utils/commonResponse");
const { validationResult } = require("express-validator");
const { promisify } = require("util");
const Comment = require("../models/comment");
const { ObjectId } = require("mongodb");

//Create a comment
class postCommentController {
    async createComment(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
                    .send(failure("Invalid inputs", errors.array()));
            }
            const commentContent = req.body.commentContent;
            const postId = req.body.postId;
            const username = req.body.username;
            const comment = new Comment({
                commentContent,
                postId,
                username
            });
            await comment.save();
            return res
                .status(HTTP_STATUS.OK)
                .send(success("Comment has been published successfully", []));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    //get comment
    async getComment(req, res, next) {
        try {
            const allComment = await Comment.find()
                .exec();
            return res
                .status(HTTP_STATUS.OK)
                .send(success("All post has been fetched successfully", allComment));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}


module.exports = new postCommentController();