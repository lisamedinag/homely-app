const router = require("express").Router();
const Token = require("../models/Token.model");
const Home = require("../models/Home.model")
//TODO middleware to check if belongs to Home ??

//Retrieve a list of all Tokens
router.get("/allTokens", (req, res) => {
    Token.find()
        .then(allTokens => res.json(allTokens))
        .catch(err => res.json({ err, errMessage: "Error finding Tokens" }))
})

//Retrieve a Token by id 
router.get("/token/:token_key", (req, res) => {
    const { token_key } = req.params

    Token.findById(token_key)
        .then(theToken => res.json(theToken))
        .catch(err => res.json({ err, errMessage: "Error finding the Token" }))
})

//Retrieve info from form inputs 
router.post("/newToken", (req, res) => {
    const token_key = "123abc"
    const status = "AVAILABLE"
    const { home } = req.body
    //TODO generate unique token here!! and get from params or body home and status available

    Token.create({ token_key, status, home })
        .then(newToken => res.json(newToken))
        .catch(err => res.json({ err, errMessage: "Error creating the Token" }))
})

function dateComparer(date1, date2) {
    const currentTime = date1.split('-')
    const creationTime = date2.split("T")[0].split('-')
    console.log("im in the date comparer", date1, date2)
    if (currentTime[0] === creationTime[0] && currentTime[1] === creationTime[1] &&
        currentTime[2] - creationTime[2] <= 1 && currentTime[2] - creationTime[2] >= 0) { return true }
    else { return false }
}


// router.get("/allTasks/allHomes", (req, res) => {

//     Promise.all([
//         Task.find(),
//         Home.find()
//     ])

//         .then((values) => {
//             console.log(values[0], values[1])
//             const tasks = values[0];
//             const homes = values[1];
//             res.json({tasks: values[0], homes: values[1]})
//         });

// })



router.post("/editToken/:token_key", (req, res) => {
    const { token_key } = req.params
    const { user } = req.body


    Token.findOne({ token_key: token_key })
        .then(foundToken => {
            const today = new Date();
            const currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            // && dateComparer(currentTime, foundToken.createdAt)    if (!dateComparer(currentTime, foundToken.createdAt)) 

            // If the token is available and its been generated a day ago (max)
            if (foundToken.status === 'AVAILABLE') {
                Promise.all([
                    Token.findOneAndUpdate(token_key, { status: 'CLAIMED' }, { new: true }),
                    Home.findByIdAndUpdate(foundToken.home, { $push: { usersArr: user } }, { new: true })
                ])
                    .then((values) => {
                        console.log(values[1], "hello values")

                        res.json({ token: values[0], home: values[1] })
                    });

            } else {
                Token.findOneAndUpdate(token_key, { status: 'EXPIRED' }, { new: true })
                    .then(updatedPoints => res.json(updatedPoints))
            }
        })
        .catch(err => res.json({ err, errMessage: "Error with token" }))
})





// // Function that receives a token key from a user who has been invited
// router.post("/editToken/:token_key", (req, res) => {
//     const { token_key } = req.params
//     const { user } = req.body


//     Token.findOne({ token_key: token_key })
//         .then(foundToken => {
//             const today = new Date();
//             const currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


//             // If the token is available and its been generated a day ago (max)
//             foundToken.status === 'AVAILABLE' && dateComparer(currentTime, foundToken.createdAt) ?
//                 foundToken.findOneAndUpdate(token_key, { status: 'CLAIMED' })
//                     .then(updatedToken => {

//                         // The user is added to the home usersArr and thus is part of the home

//                         Home.findByIdAndUpdate(updatedToken.home_id, { usersArr: [...usersArr.push()] })
//                         res.json(updatedToken, user,)
//                     })
//                     .catch(err => res.json({ err, errMessage: "Error creating the Points" }))
//                 :

//                 foundToken.findOneAndUpdate(foundToken._id, { amount: amountWorth + foundToken.amount }, { new: true })
//                     .then(updatedPoints => res.json(updatedPoints))
//                     .catch(err => res.json({ err, errMessage: "Error editing the Points" }))

//         })
//         .catch(err => res.json({ err, errMessage: "Error with token" }))

//     Token.findOneAndUpdate(token_key, { status }, { new: true })
//         .then(updatedToken => res.json(updatedToken))
//         .catch(err => res.json({ err, errMessage: "Error editing the Token" }))
// })



router.delete("/deleteToken/:token_key", (req, res) => {
    const { token_key } = req.params

    Token.findByIdAndDelete(token_key)
        .then(deletedToken => res.json({ deletedToken }))
        .catch(err => res.json({ err, errMessage: "Error deleting the Token" }))
})

module.exports = router