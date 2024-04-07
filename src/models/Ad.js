const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  adId: {
    type: String,
    required: true,
    unique: true,
  },
  ownerUserId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
