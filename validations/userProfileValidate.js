const Joi = require("joi");

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional(),
  email: Joi.string().trim().email().optional(),
}).min(1); // Ensures at least one field is provided in the update body

module.exports = updateProfileSchema;
