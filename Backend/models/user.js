const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
{
name: { type: String, required: true, trim: true },
email: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true,
match: /^(?:[a-zA-Z0-9_'^&\/+\-]+(?:\.[a-zA-Z0-9_'^&\/+\-]+)*|"(?:[^"]|\\")+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
},
password: { type: String, required: true, minlength: 6 },
},
{ timestamps: true }
);


// Hash password before save if modified
userSchema.pre("save", async function (next) {
if (!this.isModified("password")) return next();
try {
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
} catch (err) {
next(err);
}
});


// Helper to compare passwords
userSchema.methods.comparePassword = function (candidate) {
return bcrypt.compare(candidate, this.password);
};


const User = mongoose.model("User", userSchema);
module.exports = User;