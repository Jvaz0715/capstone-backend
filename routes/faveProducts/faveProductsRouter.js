const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../utils/jwtMiddleWare");

const {
   addProduct,
   deleteProduct,
   getAllFaveProducts,
} = require("./controller/faveProductsController");

router.post("/add-product-to-favorites", jwtMiddleware, addProduct);

router.get("/get-all-fave-products", jwtMiddleware, getAllFaveProducts);

router.delete("/delete-product-from-favorites", jwtMiddleware, deleteProduct);

module.exports = router;