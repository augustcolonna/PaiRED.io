const express = require('express');
const { isLoggedIn } = require('../middleware/route-guard');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//GET Logout route
router.get('/logout', isLoggedIn, (req, res) => {

  req.session.destroy()

  res.render('logout')
})

module.exports = router;