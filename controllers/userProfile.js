const User = require("../models/userModel");

const getUserProfile = async (req, res, next) => {
  const { _id, name, email, role } = req.user;

  try {
    res.status(200).json({
      success: true,
      message: "Successfully fetched user profile",
      user: {
        id: _id,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updateData,
      },
      { returnDocument: "after", runValidators: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getUserProfile, updateProfile };
