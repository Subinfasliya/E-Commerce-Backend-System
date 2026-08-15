const User = require("../models/userModel");
const createError = require("../utils/createError");
const { verifyToken } = require("../utils/jwt");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "Authentication required"));
    }

    const token = authHeader.split(" ")[1];

    const decode = verifyToken(token);

    const user = await User.findById(decode.id).select("-password");

    if (!user) {
      return next(createError(401, "User no longer exist"));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = protect;
