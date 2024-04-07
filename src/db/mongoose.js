const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect("mongodb+srv://elliot:orfCoxeUP5800AVp@cluster0.mqbpcdg.mongodb.net/SnabbTjanstDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
};

export default connectDB;
