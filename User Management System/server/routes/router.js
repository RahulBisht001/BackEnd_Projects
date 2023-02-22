const express = require('express')
const route = express.Router()

// Getting Render File  from render.js file
const services = require('../services/render')
const controller = require('../controller/controller')



/*
@description   Root Route
@method      GET/
*/
route.get('/', services.homeRoutes)

/*
@description   add_user
@method      GET/add_user
*/
route.get('/add-user', services.add_user)

/*
@description  update_user
@method      GET/update_user
*/
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)


// Exporting the Route to the Server.js File
module.exports = route
