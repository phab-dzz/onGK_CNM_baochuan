const express = require('express');
const router = express.Router();

const paperController = require('../controllers');
const upload =require("../middleware/upload")
router.get("/", paperController.get);
// router.get("/", (req, res) => {
//     console.log("GET / route hit");
//     res.send("Route is working!");
// });
router.get("/edit/:id", paperController.getOne);
router.post("/papers",upload, paperController.post);
router.post("/update/:id", upload, paperController.put);
router.post("/delete/:id", paperController.delete);

module.exports = router;