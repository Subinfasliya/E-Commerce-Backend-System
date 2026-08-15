const createError = require("../utils/createError");

const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  });

  if (error) {
    return next(createError(400, error.details[0].message));
  }

  next();
};

module.exports = validateBody;
