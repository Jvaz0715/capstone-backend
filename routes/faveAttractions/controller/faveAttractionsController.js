const faveAttraction = require("../model/FaveAttraction");
const User = require("../../user/model/User");

const addAttraction = async (req, res) => {
   try {
      const {
         productTitle,
         productImage,
         productID,
      } = req.body;

      const createdFaveAttraction = new faveAttraction({
         productTitle,
         productImage,
         productID,
      });

      const savedFaveProduct = await createdFaveProduct.save();

      const { decodedJwt } = res.locals;

      const foundTargetUser = await User.findOne({
         email: decodedJwt.email
      });

      foundTargetUser.faveProducts.push(savedFaveProduct._id);

      await foundTargetUser.save();

      res.json({
         message: "Added to favorites!"
      });

   } catch(e) {
      res.status(500).json({
         e: e,
         message: "This attraction is already in your favorites."
      })
   }
};

const deleteAttraction = async(req, res, next) => {

};

const getAllFaveAttractions = async(req, res) => {

};

module.exports = {
   addAttraction,
   deleteAttraction,
   getAllFaveAttractions
};