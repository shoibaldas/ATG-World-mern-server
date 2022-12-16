const express = require("express");
const authController = require("../controllers/auth");
const validator = require("../middleware/validation");
const postController = require("../controllers/postContent");
const { checkAuth } = require("../middleware/authCheck");

const router = express.Router();


//Auth API
router.post("/api/v1/signup", validator.signup, authController.signup);
router.post("/api/v1/signin", validator.signin, authController.signin);
router.post("/api/v1/forget-password", validator.signin, authController.forgetPassword);
router.post("/api/v1/addPost", postController.createPost);
router.get("/api/v1/allPost", postController.getPost);
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




module.exports = router;