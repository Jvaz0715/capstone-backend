const jwt = require("jsonwebtoken");

async function checkJwtToken(req, res, next) {
   try {
      if (req.headers && req.headers.authorization) {
         let jwtToken = req.headers.authorization.slice(7);

         /*
            the private jwt key is coming from our project. If the decodedJwt token is good, we go to the next parameter in our controller functions.
         */

         let decodedJwt = jwt.verify(
            jwtToken,
            process.env.PRIVATE_JWT_KEY,
         );

         res.locals.decodedJwt = decodedJwt;
      
         next();
      } else {
         throw {
            message: "You do not have permission!",
            statusCode: 500
         };
      }
   } catch(e) {
      res.status(e.statusCode).json({ message: e.message, error: e });
      return next(e);
      /* refer to errorController */
   }
};

module.exports = checkJwtToken;