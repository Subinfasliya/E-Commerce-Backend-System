const Joi = require("joi");

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\:;"'<>,./~`]).+$/;

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
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

const loginSchema = Joi.object({
  email: Joi.string()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
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

module.exports = { registerSchema, loginSchema };
