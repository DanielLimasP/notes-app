const mongoose = require('mongoose')

const atlas = 'ask admin for the link...' 
const url = 'mongodb://localhost/notesapp'
mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('DB connected'))
.catch(err => console.error(err))