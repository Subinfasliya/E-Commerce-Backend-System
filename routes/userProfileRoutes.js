const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { getUserProfile, updateProfile } = require("../controllers/userProfile");
const validateBody = require("../middlewares/validateMiddleware");
const updateProfileSchema = require("../validations/userProfileValidate");
const router = express.Router();

router.get("/", protect, getUserProfile);
router.put("/", protect, validateBody(updateProfileSchema), updateProfile);

module.exports = router;
