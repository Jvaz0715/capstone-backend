const mongoose = require("mongoose");

const faveAttractionSchema = new mongoose.Schema({
   xid: {
      type: String,
   },
});

module.exports = mongoose.model("faveAttraction", faveAttractionSchema);