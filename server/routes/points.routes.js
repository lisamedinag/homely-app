const router = require("express").Router();
const PointsObj = require("../models/Points.model");

//TODO middleware to check if belongs to Home ??

//Retrieve a list of all Points
router.get("/allPoints", (req, res) => {
    PointsObj.find()
        .then(allPoints => res.json(allPoints))
        .catch(err => res.json({ err, errMessage: "Error finding Points" }))
})

//Retrieve a Points by id 
router.get("/points/:points_id", (req, res) => {
    const { points_id } = req.params

    PointsObj.findById(points_id)
        .then(thePoints => res.json(thePoints))
        .catch(err => res.json({ err, errMessage: "Error finding the Points" }))
})

router.get("/user/:user_id/home/:home_id", (req, res) => {
    const { user_id, home_id } = req.params

    PointsObj.find({user: user_id, home: home_id})
        .then(thePoints => res.json(thePoints[0]))
        .catch(err => res.json({ err, errMessage: "Error finding the Points" }))
})

router.post("/addPoints/:user_id", (req, res) => {
    const { user_id } = req.params
    const { amount, user, home } = req.body

    const amountWorth = amount

    PointsObj.findOne({ user: user_id })
        .then(pointsObj => {
 
            typeof pointsObj === 'undefined' || pointsObj === null ?
                PointsObj.create({ amount, user, home })
                    .then(newPoints => res.json(newPoints))
                    .catch(err => res.json({ err, errMessage: "Error creating the Points" }))
                :

                PointsObj.findByIdAndUpdate(pointsObj._id, { amount: amountWorth + pointsObj.amount }, { new: true })
                    .then(updatedPoints => res.json(updatedPoints))
                    .catch(err => res.json({ err, errMessage: "Error editing the Points" }))

        })
        .catch(err => res.json({ err, errMessage: "Error with addPoints post" }))
})


//Retrieve info from form inputs 
router.post("/newPoints", (req, res) => {
    const { amount, user, home } = req.body

    PointsObj.create({ amount, user, home })
        .then(newPoints => res.json(newPoints))
        .catch(err => res.json({ err, errMessage: "Error creating the Points" }))
})

router.put("/editPoints/:points_id", (req, res) => {
    const { points_id } = req.params
    const { amount } = req.body

    PointsObj.findByIdAndUpdate(points_id, { amount }, { new: true })
        .then(updatedPoints => res.json(updatedPoints))
        .catch(err => res.json({ err, errMessage: "Error editing the Points" }))
})

router.delete("/deletePoints/:points_id", (req, res) => {
    const { points_id } = req.params

    PointsObj.findByIdAndDelete(points_id)
        .then(deletedPoints => res.json({ deletedPoints }))
        .catch(err => res.json({ err, errMessage: "Error deleting the Points" }))
})

module.exports = router