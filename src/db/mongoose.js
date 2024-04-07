const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://elliot:orfCoxeUP5800AVp@cluster0.mqbpcdg.mongodb.net/Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connect;
