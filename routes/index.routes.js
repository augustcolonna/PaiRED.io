const express = require('express');
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//display profile from login - GET
router.get('/profile', isLoggedIn ,(req, res, next) => {
  console.log("This is our current session:",req.session)
  res.render('profile', { currentUser: req.session.user })
})

module.exports = router;
