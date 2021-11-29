const mongoose = require("mongoose");

const faveAttractionSchema = new mongoose.Schema({
   attractionURL: {
      type: String,
   },
});

module.exports = mongoose.model("faveAttraction", faveAttractionSchema);