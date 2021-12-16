const router = require("express").Router();
const Task = require("../models/Task.model");

//TODO middleware to check if belongs to Home ??

//Retrieve a list of all Tasks
router.get("/allTasks", (req, res) => {
    Task.find()
        .then(allTasks => res.json(allTasks))
        .catch(err => res.json({ err, errMessage: "Error finding Tasks" }))
})

router.get("/allTasks/:home_id", (req, res) => {
    Task.find({home: home_id})
        .then(allTasks => res.json(allTasks))
        .catch(err => res.json({ err, errMessage: "Error finding Tasks" }))
})

//Retrieve a task by id and populate
router.get("/populatedTask/:task_id", (req, res) => {
    const { task_id } = req.params

    Task.findById(task_id)
        .populate("assignedUser")
        .then(theTask => res.json(theTask))
        .catch(err => res.json({ err, errMessage: "Error finding the task" }))
})

//Retrieve a Task by id 
router.get("/task/:task_id", (req, res) => {
    const {task_id} = req.params

    console.log("los params del task tete", req.params)
    Task.findById(task_id)
        .then(theTask => res.json(theTask))
        .catch(err => res.json({ err, errMessage: "Error finding the Task" }))
})

//Retrieve info from form inputs 
router.post("/newTask", (req, res) => {
    const { name, points, description, status, assignedUser, home } = req.body

    Task.create({ name, points, description, status, assignedUser, home})
        .then(newTask => res.json(newTask))
        .catch(err => res.json({ err, errMessage: "Error creating the Task" }))
})

router.put("/editTask/:task_id", (req, res) => {
    const {task_id} = req.params
    const {name, points, description, status, assignedUser } = req.body

    Task.findByIdAndUpdate(task_id, {name, points, description, status, assignedUser}, { new: true })
        .then(updatedTask => res.json(updatedTask))
        .catch(err => res.json({ err, errMessage: "Error editing the Task" }))
})

router.delete("/deleteTask/:task_id", (req, res) => {
    const {task_id} = req.params

    Task.findByIdAndDelete(task_id)
        .then(deletedTask => res.json({ deletedTask }))
        .catch(err => res.json({ err, errMessage: "Error deleting the Task" }))
})

module.exports = router