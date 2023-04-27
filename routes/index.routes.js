const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});




//display profile from login - GET
router.get('/profile', (req, res) => {
  res.render('profile');
})





// this is clemens route

module.exports = router;
