const express = require('express')
const router = express.Router();
const UserModel = require('../models/User.model')
const LibraryModel = require('../models/Library.model')
const PromptModel = require('../models/Prompt.model')
const { route } = require('./index.routes');
const { isLoggedIn } = require('../middleware/route-guard');
const { start } = require('../api-call');


//display profile from login - GET
router.get('/', isLoggedIn ,async (req, res, next) => {
    const currentUserId = req.session.user.id
    const currentUserLibraries = await LibraryModel.find({user: currentUserId})
    console.log(req.session.user, '------------------------------------------------')

    const inputDateString = req.session.user.createdAt
    const date = new Date(inputDateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    const outputDateString = `${day}.${month}.${year}`;

    res.render('profile', { currentUser: req.session.user, currentLibraries: currentUserLibraries, signUpDate: outputDateString })
})

router.get('/library-creation', isLoggedIn ,async (req, res, next) => {
    res.render('library-creation')
})
//post for library creation
router.post('/library-creation', isLoggedIn, async (req, res) => {
    try {
        const newLibrary = await LibraryModel.create({libname: req.body.libname, user: req.session.user.id})

        res.redirect(`${newLibrary._id}`)    
    } catch (error) {
        res.redirect('/profile')
        console.log(error)
    }
})

router.get('/:id', isLoggedIn, async (req, res) => {
    const libraryLanguage = await LibraryModel.findById(req.params.id)
    const oldPrompts = await PromptModel.find({libraryid: req.params.id })

    res.render('library', {language: libraryLanguage, id: req.params.id, prompts: oldPrompts})  
})

router.post('/:id',isLoggedIn, async (req, res) => {
    const libraryId = req.params.id
    const library = await LibraryModel.findById(libraryId)
    const libraryLanguage = library.libname
    const newPrompt = req.body.prompt
    const finalPrompt = `Please return the syntax for ${newPrompt} in ${libraryLanguage}. Please only return the syntax and no extra explainations`
    let apiResponse = await start(finalPrompt)
    apiResponse = apiResponse.substr(1)
    const cleanedApiResponse = apiResponse.replace(/^\s*\n/gm, '')
    const data = {prompt: newPrompt, response: cleanedApiResponse, libraryid: libraryId}

    await PromptModel.create(data)

    console.log(apiResponse)
    
    res.redirect(`${libraryId}`)
})

//Post route for delet the prompt
router.post("/:id/:promptId/delete", isLoggedIn, async (req, res) => {
    const promptId  = req.params.promptId

    await PromptModel.findByIdAndDelete(promptId)

    res.redirect(`/profile/${req.params.id}`)
})

//Post route for updating
router.post('/:id/:promptId/update', isLoggedIn, async(req, res) => {
    const promptId = req.params.promptId
    const { prompt } = req.body

    await PromptModel.findByIdAndUpdate(promptId, { prompt }, { new: true})

    res.redirect(`/profile/${req.params.id}`)
})
  
module.exports = router;