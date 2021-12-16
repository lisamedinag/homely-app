const router = require("express").Router();
const User = require("../models/User.model");

//TODO middleware to check if belongs to Home ??

//Retrieve a list of all Users
router.get("/allUsers", (req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json({ err, errMessage: "Error finding Users" }))
})

//Retrieve a User by id 
router.get("/user/:user_id", (req, res) => {
    const {user_id} = req.params

    User.findById(user_id)
        .then(theUser => res.json(theUser))
        .catch(err => res.json({ err, errMessage: "Error finding the User" }))
})

//Retrieve info from form inputs 
router.post("/newUser", (req, res) => {
    const { name, email, password } = req.body

    User.create({ name, email, password, role})
        .then(newUser => res.json(newUser))
        .catch(err => res.json({ err, errMessage: "Error creating the User" }))
})

router.put("/editUser/:user_id", (req, res) => {
    const {user_id} = req.params
    const { name, email, password, role } = req.body

    User.findByIdAndUpdate(user_id, { name, email, password, role }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.json({ err, errMessage: "Error editing the User" }))
})

router.delete("/deleteUser/:user_id", (req, res) => {
    const {user_id} = req.params

    User.findByIdAndDelete(user_id)
        .then(deletedUser => res.json({ deletedUser }))
        .catch(err => res.json({ err, errMessage: "Error deleting the User" }))
})

module.exports = router