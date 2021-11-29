const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleWare");

const {
   addAttraction,
   deleteAttraction,
   getAllFaveAttractions,
} = require("./controller/faveAttractionsController");

router.post("/add-attraction-to-favorites", jwtMiddleware, addAttraction);

router.get("/get-all-fave-attractions", jwtMiddleware, getAllFaveAttractions);

router.delete("/delete-attraction-from-favorites", jwtMiddleware, deleteAttraction);

module.exports = router;