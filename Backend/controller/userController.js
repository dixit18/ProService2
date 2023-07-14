const User = require("../models/userModel");
const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");
const sendCookie = require("../utils/sendCookie");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");

// Signup a user
const signupUser = catchAsync(async (req, res, next) => {
  const { name, email, password, isServiceProvider, address, phone, avatar, city } =
    req.body;

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler('User with this email already exists.', 400));
  }

  // Create a new user
  const newUser = await User.create({
    name,
    email,
    password,
    isServiceProvider,
    address,
    phone,
    avatar,
    city,
  });

  // Send registration email to the user
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

  // Send the user's information and set the authentication cookie
  sendCookie(newUser, 201, res);
});

// Login a user
const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Use the right credentials.", 401));
  }

  // Check if the provided password matches the user's password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password doesn't match.", 401));
  }

  // Set the authentication cookie
  sendCookie(user, 201, res);
});

// Logout a user
const logoutUser = catchAsync(async (req, res, next) => {
  // Clear the authentication cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get account details of a user
const getAccountDetails = catchAsync(async (req, res, next) => {
  // Find the user by ID
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete a user's profile
const deleteProfile = catchAsync(async (req, res, next) => {
  // Find the user by ID
  const user = await User.findById(req.user._id);

  // Delete the user
  await user.deleteOne();

  // Clear the authentication cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Profile Deleted",
  });
});

// Forgot password - Send reset password token
const forgotPassword = catchAsync(async (req, res, next) => {
  // Find the user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Generate and save reset password token for the user
  const resetPasswordToken = await user.getResetPasswordToken();
  await user.save();

  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetPasswordToken}`;

  // Send the reset password email to the user
  await sendEmail({
    email: user.email,
    username: user.name,
    subject: "Your reset Token",
    url: resetURL,
    html: `
      <h1>Welcome to ProSkill</h1>
      <p>Username: ${user.name}</p>
      <p>Here is your reset link:</p>
      <a href=${resetURL}>Reset Password</a>
      <p>Please keep this information secure and do not share it with anyone.</p>
      <p>Thank you for using MyApp!</p>
    `,
  });

  res.status(200).json({
    status: "success",
    msg: "Your reset token has been sent successfully",
  });
});

// Reset password using the reset password token
const resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find the user by the reset password token and check if the token is still valid
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Reset the user's password and clear the reset password fields
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // Set the authentication cookie
  sendCookie(user, 200, res);
});

// Get a user by ID
const getUser = async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  const userId = new mongoose.Types.ObjectId(id);
  try {
    // Find the user by ID
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
