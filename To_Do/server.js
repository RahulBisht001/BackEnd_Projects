const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const router = require('./routes/Todo_Route')
const connectDB = require('./database/connection')


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8000

connectDB()

app.set('view engine', 'ejs')


app.use('/css', express.static(path.resolve(__dirname, 'public/css')))
app.use('/js', express.static(path.resolve(__dirname, 'public/js')))


app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`)
})