const router = require("express").Router();
const userController = require("../controllers/userController.js");
router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
module.exports = router;
