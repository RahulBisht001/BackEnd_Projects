const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    }
})


const Todo_DB = mongoose.model('Todo_DB', TodoSchema);
module.exports = Todo_DB;
