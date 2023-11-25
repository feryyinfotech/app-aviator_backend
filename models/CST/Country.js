const mongoose = require("mongoose");

const createCountry = new mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: Number,
  },
});

const createState = new mongoose.Schema({
  name: {
    type: String,
  },
  c_id: {
    type: String,
  },
});

module.exports = mongoose.model("Country", createCountry);
module.exports = mongoose.model("State", createState);
