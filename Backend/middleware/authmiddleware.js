const jwt = require("jsonwebtoken");
const User = require("../models/User");
// ensure this path matches your project structure


// Middleware to protect routes
const protect = async (req, res, next) => {
let token;


try {
// Get token from Authorization: Bearer <token>
if (
req.headers.authorization &&
req.headers.authorization.startsWith("Bearer ")
) {
token = req.headers.authorization.split(" ")[1];
}


if (!token) {
return res.status(401).json({ message: "Not authorized, no token" });
}


// Verify token
let decoded;
try {
decoded = jwt.verify(token, process.env.JWT_SECRET);
} catch (err) {
const isExpired = err.name === "TokenExpiredError";
return res.status(401).json({
message: isExpired ? "Token expired" : "Token invalid",
error: err.message,
});
}


// Get user from token (without password)
const user = await User.findById(decoded.id).select("-password");
if (!user) {
return res.status(401).json({ message: "User not found" });
}


req.user = user;
next();
} catch (error) {
return res.status(401).json({ message: "Not authorized", error: error.message });
}
};


module.exports = { protect };