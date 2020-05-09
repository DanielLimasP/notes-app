const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    creationDate: { type:Date, default: Date.now},
    user: { type: String, required: true }
})

module.exports = mongoose.model('Note', noteSchema)