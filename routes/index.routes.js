const express = require('express');
const { isLoggedIn } = require('../middleware/route-guard');
const UserModel = require('../models/User.model');
const router = express.Router();
const LibraryModel = require('../models/Library.model');
const PromptModel = require('../models/Prompt.model');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//display profile from login - GET
router.get('/profile', isLoggedIn ,async (req, res, next) => {


  //const userLibrary = LibraryModel.findOne( {user: userId} )
  //console.log(userLibrary)
  res.render('profile', { currentUser: req.session.user })
  
  
})

router.get('/profile/library-creation', isLoggedIn ,async (req, res, next) => {
  // console.log("This is our current session:",req.session)

  res.render('library-creation')
})


router.get('/profile/:language', (req, res) => {
  const { language } = req.params
})




router.post('/profile/library-creation', isLoggedIn, async (req, res) => {
  await LibraryModel.create({libname: req.body.libname, user: req.session.user.id})

  res.redirect(`/${req.body.libname}`)

})



module.exports = router;
