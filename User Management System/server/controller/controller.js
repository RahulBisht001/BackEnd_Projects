let UserDB = require('../model/model')

// Create and Save New User 
exports.create = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({ message: "Content can't be Empty!" })
        return
    }
    // new User
    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // Save User in the Database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some Error Occured While Create Request" })
        })

}

// Retrieve and return all Users / Retrieve and Return a single User
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id
        UserDB.findById(id)
            .then(data => {
                if (!data) {
                    res
                        .status(404)
                        .send({ message: "User Not Found With id " + id })
                }
                else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(505).send({ message: "Error Retrieving with user id" + id })
            })
    }
    else {
        UserDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message | "Error Occured While retrieving user data" })
            })
    }
}

// Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to Update can Not be Empty" })
    }
    const id = req.params.id
    UserDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can't Update user with id ${id} , May be user not Found` })
            }
            else
                res.send(data)
        })
        .catch(err => {
            // console.log(data)
            res.status(500).send({ message: "Error Update user Information" })
        })
}

// Delete a User with Specified Id
exports.delete = (req, res) => {
    const id = req.params.id

    UserDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res
                    .status(404)
                    .send({ message: `Can't Delete with id ${id}. Maybe id is wrong` })
            }
            else
                res.send({ message: "User Deleted Successfully" })
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete User with id ${id}` })
        })

}