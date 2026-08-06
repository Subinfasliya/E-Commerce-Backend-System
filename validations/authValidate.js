const Joi = require("joi");

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./~`]).+$/;

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(50).required().trim().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 3 characters",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().max(50).trim().messages({
    "string.max": "Last name not exceeded 50 characters",
  }),
  email: Joi.string()
    .lowercase()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true,
      },
    })
    .required()
    .messages({
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(PASSWORD_REGEX)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 128 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
});

module.exports = {registerSchema};
