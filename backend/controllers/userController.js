const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.location = req.body.location || user.location;
    user.bio = req.body.bio || user.bio;
    user.profileImage = req.body.profileImage || user.profileImage;
    
    if (req.body.skills) {
      user.skills = req.body.skills;
    }

    if (user.role === 'user') {
      user.resume = req.body.resume || user.resume;
    }

    if (user.role === 'recruiter') {
      user.companyName = req.body.companyName || user.companyName;
      user.companyWebsite = req.body.companyWebsite || user.companyWebsite;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      phone: updatedUser.phone,
      location: updatedUser.location,
      bio: updatedUser.bio,
      skills: updatedUser.skills,
      resume: updatedUser.resume,
      companyName: updatedUser.companyName,
      companyWebsite: updatedUser.companyWebsite
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = { updateProfile };
