const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

const { UserModel } = require('./models/user')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL)

//authentication
app.post('/login', (req, res) => {
    const {email, password} = req.body
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json({ message: "success", userId: user._id });
            }
            else{
                res.json("password incorrect")
            }
        }
        else{
            res.json("no user found")
        }
    })
})

app.post('/signup', (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//to do list

app.post('/tasks', (req, res) => {
    const { userId, text } = req.body;

    UserModel.findById(userId)
        .then(user => {
            if (user) {
                user.tasks.push({ text });
                return user.save();
            } else {
                res.status(404).json("User not found");
            }
        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err));
});

app.get('/tasks', (req, res) => {
    const { userId } = req.query;

    UserModel.findById(userId)
        .then(user => {
            if (user) {
                res.json(user.tasks);
            } else {
                res.status(404).json("User not found");
            }
        })
        .catch(err => res.status(500).json(err));
});

app.put('/tasks', (req, res) => {
    const { userId, taskId, text, completed } = req.body;

    UserModel.findById(userId)
        .then(user => {
            if (user) {
                const task = user.tasks.id(taskId);
                if (task) {
                    task.text = text !== undefined ? text : task.text;
                    task.completed = completed !== undefined ? completed : task.completed;
                    return user.save();
                } else {
                    res.status(404).json("Task not found");
                }
            } else {
                res.status(404).json("User not found");
            }
        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err));
});

app.delete('/tasks', (req, res) => {
    const { userId, taskId } = req.query;

    UserModel.findByIdAndUpdate(userId, { $pull: { tasks: { _id: taskId } } }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json("User not found");
            }
            res.json(updatedUser);
        })
        .catch(err => res.status(500).json(err));
});

app.listen(3000, () => {
    console.log("server is running")
})