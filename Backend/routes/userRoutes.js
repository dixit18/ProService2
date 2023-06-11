const express = require("express");
const userController = require("../controller/userController");
const isAuthenticated  = require("../middleware/validate")

const router = express.Router();




router.route("/signup").post(userController.signupUser);
router.route('/login').post(userController.loginUser)
router.route('/logout').get(userController.logoutUser)
router.route("/me")
    .get(isAuthenticated, userController.getAccountDetails)
    .delete(isAuthenticated, userController.deleteProfile);

router.route('/forgotpassword').get(userController.forgotPassword)
router.route('/resetpassword/:token').patch(userController.resetPassword)



router.get("/:id",userController.getUser);


module.exports = router;
