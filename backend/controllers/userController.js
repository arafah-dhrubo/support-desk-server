const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../util/token");

// @desc Register a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  // Find if email already exists
  const emailExists = await User.findOne({
    email,
  });

  if (emailExists) {
    res.status(400);
    throw new Error("Email already used");
  }

  // Find if username already exists
  const userExists = await User.findOne({
    username,
  });

  if (userExists) {
    res.status(400);
    throw new Error("Username already used");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a new user
// @route /api/users
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = await User.findOne({ email });

  // Check if password matched
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get current user
// @route /api/users/getme
// @access protected
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  };
  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
