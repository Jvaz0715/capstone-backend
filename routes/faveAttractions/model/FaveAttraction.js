const mongoose = require("mongoose");

const faveAttractionSchema = new mongoose.Schema({
   xid: {
      type: String,
      unique: true,
   },
   attractionName: {
      type: String,
      unique: true,
   },
   city:{
      type: String,
      
   },
   states:{
      type: String,
      
   },
   country:{
      type: String,
      
   },
   image: {
      type: String,
      
   },
   attractionInfo: {
      type: String,
      
   },
   externalURL: {
      type: String,
      
   },
   wikiPageURL: {
      type: String,
      
   },
});

module.exports = mongoose.model("faveAttraction", faveAttractionSchema);