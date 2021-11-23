const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
   },
   lastName: {
      type: String,
   },
   username: {
      type: String,
      unique: true,
   },
   email: {
      type: String,
      unique: true,
   },
   password: {
      type: String,
   },
   faveProducts: [{
      type: mongoose.Schema.ObjectId,
      ref: "faveProduct",
   }],
});

module.exports = mongoose.model("user", userSchema);