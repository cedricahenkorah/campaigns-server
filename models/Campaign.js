const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Active",
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);
