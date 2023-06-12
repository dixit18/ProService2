const express = require("express");
const {signupUser,loginUser,logoutUser,getAccountDetails,deleteProfile,forgotPassword,resetPassword,getUser} = require("../controller/userController");
const isAuthenticated  = require("../middleware/validate")

const router = express.Router();




router.route("/signup").post(signupUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route("/me")
    .get(isAuthenticated, getAccountDetails)
    .delete(isAuthenticated, deleteProfile);

router.route('/forgotpassword').get(forgotPassword)
router.route('/resetpassword/:token').patch(resetPassword)



router.get("/:id",getUser);


module.exports = router;
