const router = require("express").Router();
const postController = require("../controllers/postController.js");
const { isAuth } = require("../middleware/auth.js");
router
  .route("/")
  .get(postController.getAllPost)
  .post(isAuth, postController.createPost);
router
  .route("/:id")
  .get(postController.getPostById)
  .patch(isAuth, postController.updatePostById)
  .delete(isAuth, postController.deletePostById);
module.exports = router;
