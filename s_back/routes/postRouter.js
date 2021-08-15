const express = require("express");
const postControllers = require("../controllers/postController");

const router = express.Router();

// READ
router.get("/list", postControllers.getListContoller);
router.get("/detail/:postId", postControllers.getDetailContoller);

// CREATE
router.get("/create", postControllers.getCreateContoller);
router.post("/create", postControllers.postCreatecontoller);

// UPDATE
router.get("/update/:postId", postControllers.getUpdatecontoller);
router.post("/update", postControllers.postUpdatecontoller);

// DELETE
router.delete("/delete/:postId", postControllers.deleteDeleteContoller);

module.exports = router;
