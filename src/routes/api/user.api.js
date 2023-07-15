const express = require("express");
const router = express.Router();
const UserControler = require("../../controler/user.controler");

router.post("/signUp", UserControler.createUser);
router.post("/login", UserControler.loginUser);
router.get("/", UserControler.getAllUser);
router.get("/:email", UserControler.getUser);

module.exports = router;
