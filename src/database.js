const mongoose = require('mongoose')

const atlas = 'mongodb+srv://user1:VvkN1O2ttabd5UpY@cluster0-ezqai.mongodb.net/<dbname>?retryWrites=true&w=majority'
const url = 'mongodb://localhost/notesapp'
mongoose.connect(atlas, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('DB connected'))
.catch(err => console.error(err))