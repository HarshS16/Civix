const express = require("express");
const { getContributors } = require("../controllers/contributor");

const router = express.Router();

router.get("/", getContributors);

module.exports = router;
