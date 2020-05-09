const express = require('express')
const router = express.Router()
const NoteModel = require('../models/Note')
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes', isAuthenticated, async (req, res)=>{
    await NoteModel.find({user: req.user.id}).sort({creationDate: 'desc'}).then(concepts =>{
        const ctx = {
            notes: concepts.map(concept => {
                return {
                    _id: concept._id,
                    title: concept.title,
                    description: concept.description,
                    creationDate: concept.creationDate
                }
            })
        }
        res.render('notes/all-notes', {notes: ctx.notes})
    })
})

router.get('/notes/add', isAuthenticated, (req, res)=>{
    res.render('notes/new-note.hbs')
})

router.post('/notes/new-note', isAuthenticated, async (req, res)=>{
    const { title, description } = req.body
    console.log("Body", req.body)
    let errors = []
    console.log("Errors", errors)
    if(!title || title === ""){
        errors.push({text: 'Please write a title'})
    }
    else if(!description || description === ""){
        console.log(description)
        errors.push({text: 'Please write a description'})
    }
    else if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        })
    }else{
        const newNote = new NoteModel({title, description})
        console.log(req.user.id)
        newNote.user = req.user.id
        await newNote.save()
        req.flash('success_msg', 'Note Added Successfully')
        res.redirect('/notes')
    }
})

router.get('/notes/edit/:id', isAuthenticated, async (req, res)=>{
    const noteDB = await NoteModel.findById(req.params.id)
    const note = {
        _id: noteDB._id,
        title: noteDB.title,
        description: noteDB.description,
        creationDate: noteDB.creationDate 
    }
    res.render('notes/edit-note', {note})
})

router.put('/notes/edit-note/:id', async (req, res)=>{
    const { title, description } = req.body
    await NoteModel.findByIdAndUpdate(req.params.id, {title, description})
    req.flash('success_msg', 'Note uptdated Successfully')
    res.redirect('/notes')
})

router.delete('/notes/delete/:id', isAuthenticated, async(req, res)=>{
    await NoteModel.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note Removed Successfully')
    res.redirect('/notes')
})


module.exports = router