const { promisify } = require("util");
const User = require("../model/userModel");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

// function for sign new token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Store token in cookie by name jwt
  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: { error },
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password!");
      // return next(new AppError("Please provide email and password!", 400));
    }

    // If user not authenticated
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Invalid email or password!");
      //   return next(new AppError("Invalid email or password!", 401));
    }

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new Error("User not find with that id!");
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const protect = async (req, res) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token)
      throw new Error("You are not logged in! Please login to get access.");

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currUser = await User.findById(decoded.id);

    if (!currUser)
      throw new Error("The user belonging to this token does no longer exist.");

    req.user = currUser;
    res.status(200).json({
      status: "success",
      data: { currUser },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

module.exports = { signup, login, logout, protect, getUserById };
