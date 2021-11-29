const mongoose = require("mongoose");

const faveAttractionSchema = new mongoose.Schema({
   productTitle: {
      type: String,
      unique: true,
   },
   productImage: {
      type: String,
   },
   productID: {
      type: String,
   },
});

module.exports = mongoose.model("faveAttraction", faveAttractionSchema);