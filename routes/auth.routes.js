const express = require('express')
const router = express.Router();
const UserModel = require('../models/User.model')
//const bcryptjs = require('bcryptjs');
//const saltRounds = 13;

//const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/

// home page
//router.get("/", (req, res) => {
 //   res.render('index')
//})

//display signup from - GET
router.get('/signup', (req, res) => {
    res.render('auth/signup');
})


//display login from - GET
router.get('/login', (req, res) => {
    res.render('auth/login');
})







module.exports = router;