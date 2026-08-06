const User = require("../models/userModel");

const registerController = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "Registered successfull",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Login Successfull",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
};
