const mongoose = require("mongoose");

const faveProductSchema = new mongoose.Schema({
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

module.exports = mongoose.model("faveProduct", faveProductSchema);