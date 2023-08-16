const express = require("express");
const router = express.Router();

router.use("/users", require("./user.routes.js"));
router.use("/notes", require("./notes.routes.js"));
router.use("/auth", require("./auth.routes.js"));

module.exports = router;
