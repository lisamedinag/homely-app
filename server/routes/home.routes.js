const router = require("express").Router();
const Home = require("../models/Home.model");


//TODO middleware to check if belongs to home 

//Retrieve a list of all homes
router.get("/allHomes", (req, res) => {
    Home.find()
        .then(allHomes => res.json(allHomes))
        .catch(err => res.json({ err, errMessage: "Error finding Homes" }))
})

router.get("/populatedHomes", (req, res) => {
    Home.find()
        .populate('usersArr')
        .then(allHomes => res.json(allHomes))
        .catch(err => res.json({ err, errMessage: "Error finding Homes" }))
})

//Retrieve a home by id 
router.get("/home/:home_id", (req, res) => {
    const { home_id } = req.params

    Home.findById(home_id)
        .then(theHome => res.json(theHome))
        .catch(err => res.json({ err, errMessage: "Error finding the home" }))
})

//Retrieve a home by id and populate
router.get("/populatedHome/:home_id", (req, res) => {
    const { home_id } = req.params

    Home.findById(home_id)
        .populate("usersArr")
        .then(theHome => res.json(theHome))
        .catch(err => res.json({ err, errMessage: "Error finding the home" }))
})

//Retrieve info from form inputs 
router.post("/newHome", (req, res) => {

    Home.create(req.body,  { new: true })
        .then(newHome => res.json(newHome))
        .catch(err => res.json({ err, errMessage: "Error creating the home" }))
})


router.post("/updateHomeUsers", (req, res) => {
    const { home_id, user } = req.body

    Home.findById(home_id)
        .then(foundHome => {
            console.log(foundHome, "foundHome")
            if (foundHome.usersArr.includes(user_id)) {
                console.log("home already had user")
                res.json(foundHome)
            }
            else {
                const newfoundHome = foundHome.usersArr.push(user_id)
                console.log(newfoundHome, "home with new user")
                res.json(newfoundHome)


            }
        })
        .catch(err => res.json({ err, errMessage: "Error adding user to home" }))
})


router.put("/editHome/:home_id", (req, res) => {
    const { home_id } = req.params
    const { name } = req.body

    Home.findByIdAndUpdate(home_id, { name }, { new: true })
        .then(updatedHome => res.json(updatedHome))
        .catch(err => res.json({ err, errMessage: "Error editing the home" }))
})

router.delete("/deleteHome/:home_id", (req, res) => {
    const { home_id } = req.params

    Home.findByIdAndDelete(home_id)
        .then(deletedHome => res.json({ deletedHome }))
        .catch(err => res.json({ err, errMessage: "Error deleting the home" }))
})

module.exports = router