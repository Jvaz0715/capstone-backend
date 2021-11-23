const faveProduct = require("../model/FaveProduct");
const User = require("../../user/model/User");

const addProduct = async (req, res) => {
   try {
      const {
         productTitle,
         productImage,
         productID,
      } = req.body;

      const createdFaveProduct = new faveProduct({
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
         message: "Product added to favorites!"
      });

   } catch(e) {
      res.status(500).json({
         e: e,
         message: "This product is already in your favorites"
      })
   }
};

const deleteProduct = async(req, res, next) => {

};

const getAllFaveProducts = async(req, res) => {

};

module.exports = {
   addProduct,
   deleteProduct,
   getAllFaveProducts
};