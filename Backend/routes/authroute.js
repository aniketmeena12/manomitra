const express = require("express");
const {registerUser, loginUser, getUserProfile}= require("../controllers/authcontroller");
const {protect} = require("../middleware/authmiddleware.js");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);

module.exports = router