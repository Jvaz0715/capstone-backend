const {
   checkIsEmpty,
   checkIsAlpha,
   checkIsAlphanumeric,
   checkIsEmail,
   checkIsStrongPassword,
} = require("../../utils/authMethods");

function checkIsEmptyFunc(req, res, next) {
   let incomingData = req.body;

   const { errorObj } = res.locals;

   for (let key in incomingData) {
      if (checkIsEmpty(incomingData[key])) {
         errorObj[key] = `${key} cannot be empty`
      }
   }

   if(Object.keys(errorObj).length > 0) {
      return res.status(500).json({
         message: "failure",
         payload: errorObj,
      });
   } else {
      next();
   };
};

function checkIsUndefined(req, res, next) {
   if(Object.keys(req.body).length === 0) {
      return res.status(500).json({
         message: "Please fill out the form."
      });
   } else {
      let errorObj = {};
      res.locals.errorObj = errorObj;
      next();
   }
};

function checkIsEmailFunc(req, res, next) {
   const { errorObj } = res.locals;

   if (!checkIsEmail(req.body.email)) {
      errorObj.wrongEmailFormat = "Must be in email format!";
   };

   next();
};

function checkIsAlphaFunc(req, res, next) {
   const { errorObj } = res.locals;
   const incomingData = req.body;

   for (key in incomingData) {
      if (key === "firstName" || key === "lastName") {
         if (!checkIsAlpha(incomingData[key])) {
            errorObj[`${key}`] = `${key} can only have characters`;
         }
      }
   };

   next();
};

function checkIsAlphanumericFunc(req, res, next) {
   const { errorObj } = res.locals;

   if (!checkIsAlphanumeric(req.body.username)) {
      errorObj.usernameError = "username can only have characters and numbers";
   };

   next();
};

function checkIsStrongPasswordFunc(req, res, next) {
   const { errorObj } = res.locals;

   if (!checkIsStrongPassword(req.body.password)) {
      errorObj.weakPassword = "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8";
   };

   next();
};

module.exports = {
   checkIsEmptyFunc,
   checkIsUndefined,
   checkIsAlphaFunc,
   checkIsAlphanumericFunc,
   checkIsEmailFunc,
   checkIsStrongPasswordFunc,
}