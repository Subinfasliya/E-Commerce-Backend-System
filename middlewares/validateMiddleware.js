const createError = require("../utils/createError");
const registerSchema = require("../validations/authValidate");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  });

  if (error) {
    console.log(error.details[0].message);

    return next(createError(400, error.details[0].message));
  }

  next();
};

module.exports = validate;
