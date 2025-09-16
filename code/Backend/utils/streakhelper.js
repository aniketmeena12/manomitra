// utils/streakHelper.js
const moment = require("moment");
const User = require("../models/userModel");

const updateStreak = async (userId, pointsToAdd = 0) => {
  const user = await User.findById(userId);
  if (!user) return null;

  const today = moment().format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  if (!user.lastDate) {
    // first habit
    user.streak = 1;
    user.lastDate = today;
  } else if (user.lastDate === today) {
    // already counted today → no streak change
  } else {
    if (user.lastDate === yesterday) {
      // consecutive
      user.streak += 1;
    } else {
      // missed a day
      user.streak = 1;
    }
    user.lastDate = today;
  }

  // add wellness points
  user.wellnessPoints += pointsToAdd;

  await user.save();
  return { streak: user.streak, wellnessPoints: user.wellnessPoints };
};

module.exports = updateStreak;
