const mongoose = require("mongoose");

const Purchase = mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad",
    required: true
  }
});

module.exports = mongoose.model("Purchase", Purchase);
