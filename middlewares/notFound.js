const createError = require("../utils/createError");

const notFound = (req,res,next) => {
    return next(createError(404, `Cannot ${req.method} ${req.originalUrl}`))
};

module.exports = notFound