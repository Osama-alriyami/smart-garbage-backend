const express = require("express");
const router = express.Router();
const { postGarbageData, getGarbageData } = require("../controllers/garbageController");

router.post("/", postGarbageData);
router.get("/", getGarbageData);

module.exports = router;
