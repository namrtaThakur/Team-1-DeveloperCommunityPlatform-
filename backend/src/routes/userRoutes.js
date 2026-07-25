const express = require("express");
const router = express.Router();

const validateUserMiddleware = require("../middlewares/validateUserMiddleware");

const {
    register,
    login,
} = require("../controllers/userController");

router.post(
    "/register",
    validateUserMiddleware,
    register
);

router.post("/login", login);

module.exports = router;
