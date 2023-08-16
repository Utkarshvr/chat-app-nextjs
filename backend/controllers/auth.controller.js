const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const REFRESH_TOKEN_EXPIRATION_TIME = "15s";
const ACCESS_TOKEN_EXPIRATION_TIME = "5s";
const COOKIE_MAXAGE = 1000 * 15; // 15s

// @desc Signup
// @route POST /auth/signup
// @access Public
const Signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, password: hashedPwd };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `Successfully Signedup`, user });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Login
// @route POST /auth/login
// @access Public
const Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check for duplicate username
  const user = await User.findOne({ username }).lean().exec();

  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  // Match password
  const isPassMatch = await bcrypt.compare(password, user?.password);

  if (isPassMatch) {
    // Create Token
    const refresh_token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
    });
    const access_token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
    });

    // Create Cookie
    res.cookie("refresh_token", refresh_token, {
      maxAge: COOKIE_MAXAGE,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    //created
    res
      .status(200)
      .json({ message: `Successfully Loggedin`, access_token, user });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});

// @desc Refresh Token
// @route POST /auth/refresh
// @access Public
const RefreshToken = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password").lean();

  if (!user) return res.status(401).json({ message: "Not Authorized!" });

  const access_token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });

  res.status(200).json({ message: `Token Regenerated`, access_token, user });
});

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const Logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(204); //No content
  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Cookie cleared" });
};

module.exports = { Signup, Login, Logout, RefreshToken };
