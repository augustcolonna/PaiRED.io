const express = require('express')
const router = express.Router();
const UserModel = require('../models/User.model')
const bcryptjs = require('bcryptjs');
const { route } = require('./index.routes');
const saltRounds = 13;
const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/

//home page
router.get("/", (req, res) => { 
    res.render('index')
})

//display signup from - GET
router.get('/signup', (req, res) => {
    res.render('auth/signup');
})

//Post route for Sign Up
router.post('/signup', async (req,res) => {
    try {
        const potentialUser = await UserModel.findOne({username: req.body.username})
        if(!potentialUser) {
            const salt = bcryptjs.genSaltSync(saltRounds)
            const passwordHash = bcryptjs.hashSync(req.body.password, salt)

            await UserModel.create({ username: req.body.username, email: req.body.email, passwordHash })

            res.redirect('/auth/login')
        }
        else{
            res.render('auth/signup', {
                errorMessage: 'Username already in use',
                data: { username: req.body.username },
              })}
    }
    catch(error){
            console.log(error)
    }
})

//display login from - GET
router.get('/login', (req, res) => {
    res.render('auth/login');
})

// create post route for login 
router.post('/login', async (req, res, next) => {
    try {
        const currentUser = await UserModel.findOne({ username: req.body.username })
        if(currentUser) {
            console.log("Current User found")
            if(bcryptjs.compareSync(req.body.password, currentUser.passwordHash)) {
                req.session.user = { username: currentUser.username, id: currentUser._id, createdAt: currentUser.createdAt }
                res.redirect("/profile")
            } else {
                res.render('auth/login', { errorMessage: "Wrong password, try again you idiot!"})
            }
        }else {
            res.render('auth/login', { errorMessage: "Wrong username, try again you idiot!"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;