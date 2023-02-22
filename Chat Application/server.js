const express = require('express')
const app = express()

const path = require('path')
const http = require('http').createServer(app)

const PORT = process.env.PORT || 8000

// Using static Files from public folder
app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/js', express.static(path.join(__dirname, 'public/js')))
app.use('/img', express.static(path.join(__dirname, 'public/img')))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

http.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`)
})



// ----------- socket setup ----------------

const io = require('socket.io')(http)
io.on('connection', (socket) => {
    // console.log('Connected ....')
    socket.on('message', (msgObj) => {
        // console.log(msgObj)
        socket.broadcast.emit('message', msgObj)
    })
})