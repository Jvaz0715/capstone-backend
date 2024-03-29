require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const port = 3001;

mongoose
   .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      app.listen(port, () => {
         console.log(`MongoDB connected!`)
         console.log((`Server connected on port ${port}`));
      })
   })
   .catch((e) => {
      console.log(e);
   }) 