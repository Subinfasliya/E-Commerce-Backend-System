const User = require("../models/userModel");
const createError = require("../utils/createError");
const { signToken } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/password");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email }).select("-password");

    if (existUser) {
      return next(createError(409, "Email already exist"));
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registered successfull",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(createError(401, "Invalid email or password"));
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return next(createError(401, "Invalid email or password"));
    }

    const token = signToken({
      id: user._id,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
};
