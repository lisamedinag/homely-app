const router = require("express").Router();
const Reward = require("../models/Reward.model");

//TODO middleware to check if belongs to Home ??

//Retrieve a list of all Rewards
router.get("/allRewards", (req, res) => {
    Reward.find()
        .then(allRewards => res.json(allRewards))
        .catch(err => res.json({ err, errMessage: "Error finding Rewards" }))
})

//Retrieve a Reward by id 
router.get("/reward/:reward_id", (req, res) => {
    const {reward_id} = req.params

    Reward.findById(reward_id)
        .then(theReward => res.json(theReward))
        .catch(err => res.json({ err, errMessage: "Error finding the Reward" }))
})

//Retrieve info from form inputs 
router.post("/newReward", (req, res) => {
    const { name, pointsWorth, description, status, claimedByUser, home } = req.body

    Reward.create({ name, pointsWorth, description, status, claimedByUser, home})
        .then(newReward => res.json(newReward))
        .catch(err => res.json({ err, errMessage: "Error creating the Reward" }))
})

router.put("/editReward/:reward_id", (req, res) => {
    const {reward_id} = req.params
    const { name, pointsWorth, description,  status, claimedByUser } = req.body

    Reward.findByIdAndUpdate(reward_id, { name, pointsWorth, description,  status, claimedByUser }, { new: true })
        .then(updatedReward => res.json(updatedReward))
        .catch(err => res.json({ err, errMessage: "Error editing the Reward" }))
})

router.delete("/deleteReward/:reward_id", (req, res) => {
    const {reward_id} = req.params

    Reward.findByIdAndDelete(reward_id)
        .then(deletedReward => res.json({ deletedReward }))
        .catch(err => res.json({ err, errMessage: "Error deleting the Reward" }))
})

module.exports = router