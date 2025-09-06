const mongoose = require("mongoose");


const connectDB = async () => {
try {
if (!process.env.MONGO_URI) {
throw new Error("MONGO_URI is not set");
}


await mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
// serverSelectionTimeoutMS: 10000, // optional hardening
});


console.log("MongoDB connected");


mongoose.connection.on("error", (err) => {
console.error("MongoDB connection error:", err.message);
});
} catch (err) {
console.error("Error connecting to MongoDB:", err.message);
process.exit(1);
}
};


module.exports = connectDB;