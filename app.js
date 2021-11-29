const express = require('express');
const logger = require('morgan');
const cors = require("cors"); //cors helps with cookie blocking
const rateLimit = require("express-rate-limit"); //this will be used to limit wrong password inputs

const app = express();

const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass.js")

const errorController = require("./routes/user/userRouter");

const userRouter = require("./routes/user/userRouter");
const faveAttractionsRouter = require("./routes/faveAttractions/faveAttractionsRouter")

app.use(cors());
// checking to see if deployed or local
if(process.env.NODE_ENV === "development") {
  app.use(logger('dev'));
};

// limiting server hits/failed login attempts
const limiter = rateLimit({
  max: 20,
  windowMs: 1 * 60 * 1000, //in millie seconds
  message: "Too many requests from this IP. Pleas try again later"
});

app.use("/api", limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //parses incoming data

app.use("/api/users", userRouter);
app.use("/api/favorite-attractions", faveAttractionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.all("*", function(req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server. Please check your URL`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
