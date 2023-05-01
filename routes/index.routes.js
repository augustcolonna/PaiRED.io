const express = require('express');
const { isLoggedIn } = require('../middleware/route-guard');
const UserModel = require('../models/User.model');
const router = express.Router();
const LibraryModel = require('../models/Library.model');
const PromptModel = require('../models/Prompt.model');
const { start } = require('../api-call');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
