const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");

// if in development (what errors programmer sees)
function dispatchErrorDevelopment(error, req, res) {
   if(req.originalUrl.startsWith("/api")) {
      return res.status(error.statusCode).json({
         status: error.status,
         error: error,
         message: error.message,
         stack: error.stack,
      });
   };
};

// if in production (what client sees)
function dispatchErrorProduction(error, req, res) {
   if(req.originalUrl.startsWith("/api")) {
      if(error.isOperational) {
         return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
         });
      };

      return res.status(error.statusCode).json({
         status: "Error",
         message: "Something is not right. Please contact support via email at mockstore@gmail.com",
      });
   };
};

function handleMongoDBDuplicate(err) {
   //variables assigned come from the error object keyValue
   let errorMessageDuplicateKey = Object.keys(err.keyValue)[0];
   let errorMessageDuplicateValue = Object.values(err.keyValue)[0];

   // parse the data into a message
   let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is taken. Please choose another one.`

   //using the Error handler class, we pass the message we created and a 400 status code
   return new ErrorMessageHandlerClass(message, 400);
};

module.exports = (err, req, res, next) => {
   // if none have a value, the second arg will be defaulted to below:
   err.statusCode = err.statusCode || 500;
   err.status = err.status || "error";

   // spread operator to spread err object as there is alot of info coming in
   let error = {...err};
   // we then reassign error.message to err.message
   error.message = err.message;
   /*
      mongo and mongoose have different errors. Here, we use mongo duplication error. If either error.code is true, the handleMongoDBDuplicate function will run with error as its argument
   */

   if(error.code === 11000 || error.code === 11001) {
      error = handleMongoDBDuplicate(error);
   };

   // if in development mode, handle errors as such
   if(process.env.NODE_ENV === "development") {
      dispatchErrorDevelopment(error, req, res);
   } else {
      dispatchErrorProduction(error, req, res);
   }

}