const express = require("express")
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const path = require("path")
const connectDB = require('./server/database/connection')



dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8000

// log requests
app.use(morgan('tiny'))

// MongoDB Connection 
connectDB()



// Parse request to body-Parser
app.use(bodyparser.urlencoded({ extended: true }))

// Set View Engine
app.set('view engine', 'ejs')

/* The Below code is for : if you put your ejs files inside 
any other folder in the views folder
app.set('views', path.resolve(__dirname, "views/ejs"))
*/


// Using the Assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))


/*
 Putting all the Routes in the Separate  Route File
Path : Server -> Routes -> router.js
*/

// Load Routes
// Importing the Route in  the Server.js File
app.use('/', require('./server/routes/router'))


app.listen(PORT, () => {
    console.log(`Listening the Server at PORT http://localhost:${PORT}`)
})