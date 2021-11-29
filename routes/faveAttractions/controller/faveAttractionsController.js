const faveAttraction = require("../model/faveAttraction");
const User = require("../../user/model/User");

const addAttraction = async (req, res) => {
   try {
      const {
         attractionURL,
      } = req.body;

      const createdFaveAttraction = new faveAttraction({
         attractionURL,
      });

      const savedFaveAttraction = await createdFaveAttraction.save();

      const { decodedJwt } = res.locals;

      const foundTargetUser = await User.findOne({
         email: decodedJwt.email
      });

      foundTargetUser.faveAttractions.push(savedFaveAttraction._id);

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
   try {
      let deletedAttraction = await faveAttraction.findByIdAndRemove(req.params.id);

      const { decodedJwt } = res.locals;

      let foundUser = await User.findOne({
         email: decodedJwt.email
      });

      let foundUserAttractionsArray = foundUser.faveAttractions;

      let filteredAttractionsArray = foundUserAttractionsArray.filter((id) => {
         return id.toString() !== deletedAttraction._id.toString();
      });

      foundUser.faveAttractions = filteredAttractionsArray;

      await foundUser.save();

      res.json({
         message: "success",
         payload: deletedAttraction
      })

   } catch(e) {
      next(e);
   };

};

const getAllFaveAttractions = async(req, res) => {
   try {
      const { decodedJwt } = res.locals;

      let payload = await User.findOne({ email: decodedJwt.email})
         .populate({
            path: "faveAttractions",
            model: faveAttraction,
            select:"-__v"
         })
         .select("-attractionURL -__v -_id");
      res.json(payload.faveAttractions)
   } catch(e) {
      res.status(500).json({ e: e, message: e.message });
   };
};

// TODO: getAttractionDetails

module.exports = {
   addAttraction,
   deleteAttraction,
   getAllFaveAttractions
};