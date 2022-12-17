const express = require("express");
const authController = require("../controllers/auth");
const validator = require("../middleware/validation");
const postController = require("../controllers/postContent");
const commentController = require("../controllers/postComment")
const { checkAuth } = require("../middleware/authCheck");

const router = express.Router();

//signup
router.post("/api/v1/signup", validator.signup, authController.signup);
//signin
router.post("/api/v1/signin", validator.signin, authController.signin);
//password reset
router.post("/api/v1/forget-password", validator.signin, authController.forgetPassword);
//creating post
router.post("/api/v1/addPost", postController.createPost);
//getting all the post
router.get("/api/v1/allPost", postController.getPost);
//getting a post by id
router.get("/api/v1/post/:postId", postController.getAPost);
//Delete a post
router.delete(
    "/api/v1/delete-post/:postId",
    postController.deletePost
);
//edit a post
router.put(
    "/api/v1/edit-post/:postId",
    postController.postEdit
);
//create comment
router.post("/api/v1/addComment", commentController.createComment);

//get comment for each post
router.get("/api/v1/comments", commentController.getComment);




module.exports = router;