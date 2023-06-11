const User = require("../models/userModel");
const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const sendCookie = require("../utils/sendCookie");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");

// /api/v1/user/signup
//public
//sign up
const signupUser = catchAsync(async (req, res, next) => {
  const { name, email, password, isServiceProvider, address, phone, avatar } =
    req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    isServiceProvider,
    address,
    phone,
    avatar,

    // avatar:req.file.filename
  });

  await sendEmail({
    email: newUser.email,

    username: newUser.name,
    subject: "Register successfully",
    text: "Your account has been registered",
    html: `
    <h1>Welcome to ProSkill</h1>
    <p>Thank you for registering with MyApp. Here are your login credentials:</p>
    <p>Username: ${newUser.name}</p>
    
    <p>Please keep this information secure and do not share it with anyone.</p>
    <p>Thank you for using MyApp!</p>
  `,
  });
  //   createSendToken(newUser, 201, res)
  sendCookie(newUser, 201, res);
});

// /api/v1/user/login
//public
//Login

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return next(new ErrorHandler("Use right credential", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password doesn't match", 401));
  }
  sendCookie(user, 201, res);
  // createSendToken(user, 200, res);
});

// /api/v1/user/logout
//public
//logout
const logoutUser = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const getAccountDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

const deleteProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await user.deleteOne();

  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile Deleted",
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  const resetPasswordToken = await user.getResetPasswordToken();

  await user.save();

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetPasswordToken}`;

  await sendEmail({
    email: user.email,

    username: user.name,
    subject: "Your reset Token",
    url: resetURL,
    html: `
      <h1>Welcome to ProSkill</h1>
      <p>Username: ${user.name}</p>
      <p>here is your resetLink</p>
      <a href=${resetURL}>here</a>
      <p>Please keep this information secure and do not share it with anyone.</p>
      <p>Thank you for using MyApp!</p>
    `,
  });
  res.status(200).json({
    status: "success",
    msg: "your reset token sent successfully",
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendCookie(user, 200, res);
});

const getUser = async (req, res, next) => {
  const id = req.params.id;
console.log(id)
  const userId = new mongoose.Types.ObjectId(id);
  try {
    const user = await User.findById(userId);
    console.log(user);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getAccountDetails,
  deleteProfile,
  forgotPassword,
  resetPassword,
  getUser,
};
