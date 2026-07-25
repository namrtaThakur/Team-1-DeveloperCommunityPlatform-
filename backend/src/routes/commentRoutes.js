const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const validateObjectId = require("../middlewares/validateObjectId");

const {
    deleteComment,
    updateComment,
} = require("../controllers/commentController");

const router = express.Router();

router.put(
    "/:commentId",
    validateObjectId("commentId"),
    authMiddleware,
    updateComment
);

router.delete(
    "/:commentId",
    validateObjectId("commentId"),
    authMiddleware,
    deleteComment
);

module.exports = router;
