const createError = require("../utils/createError");

const adminAccessOnly = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(createError(403, "Admin access required"));
    }

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { adminAccessOnly };
