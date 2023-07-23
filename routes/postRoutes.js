const express = require("express");
const authentication = require("../middleware/authentication");
const postController = require("../controllers/postController");
const router = express.Router();

router
  .route("/")
  .get(postController.getPostMany)
  .post(authentication.authenticateToken, postController.createPost);

router
  .route("/:id")
  .get(postController.getPostOne)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
