const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')
const Article = require('./model/article_Model')
const connectDB = require('./database/connection')


dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 5001

// Setting view engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Connecting with mongodb
connectDB()

// Using static files from the Public Folder using app.use middleware
app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/js', express.static(path.join(__dirname, 'public/js')))
app.use('/img', express.static(path.join(__dirname, 'public/img')))


// Routes
app.use('/articles', articleRouter)


app.get('/', async (req, res) => {

    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})

// Server Listener
app.listen(PORT, () => {
    console.log(`Listening the Server at PORT http://localhost:${PORT}`)
})