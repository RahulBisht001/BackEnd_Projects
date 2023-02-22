const express = require('express')
const { findByIdAndDelete } = require('../model/ToDo_Model')
const router = express.Router()

const Todo_DB = require('../model/ToDo_Model')


// Create Request
router.get('/', async (req, res) => {
    const tasks = await Todo_DB.find()
    res.render('index', { tasks: tasks })
})


// Add request
router.post('/new-task', async (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can't be Empty!" })
        return
    }

    const taskName = new Todo_DB({
        taskName: req.body.taskName
    })
    await taskName
        .save()
        .then(data => {
            console.log(data)
            res.redirect('/')
        })
        .catch((err) => {
            console.log("Bhai Error aa gaya Yrr")
            console.log(err)
        })
})

// Delete Request
router.delete('/delete/:id', async (req, res) => {

    await Todo_DB.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router