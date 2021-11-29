const mongoose = require("mongoose");

const faveAttractionSchema = new mongoose.Schema({
   attractionURL: {
      type: String,
      unique: true,
   },
});

module.exports = mongoose.model("faveAttraction", faveAttractionSchema);