const express = require("express");
const openidAuthController = require("../controllers/openidAuthController");
const router = express.Router();

router.get("/login", openidAuthController.login);
router.get("/logout", openidAuthController.logout);
router.post("/auth/openid/return", openidAuthController.callback);

module.exports = router;
