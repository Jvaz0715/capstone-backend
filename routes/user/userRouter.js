const express = require("express");
const router = express.Router();

const {
   signup,
   login,
   getAllUsers,
   deleteUserById
} = require("./controller/userController");

const {
   checkIsEmptyFunc,
   checkIsUndefined,
   checkIsAlphaFunc,
   checkIsAlphanumericFunc,
   checkIsEmailFunc,
   checkIsStrongPasswordFunc,
} = require("./helpers/authMiddleware");