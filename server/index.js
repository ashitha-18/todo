const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

const { UserModel, ProjectModel } = require('./models/user')

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

app.post('/projects', (req, res) => {
    const { userId, title } = req.body;
    UserModel.findById(userId)
    .then(user => {
        if (user) {
            user.projects.push({ title });
            return user.save();
        } else {
            res.status(404).json("User not found");
        }
    })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json(err));
});

app.get('/projects', (req, res) => {
    const { userId } = req.query;
    UserModel.findById(userId)
        .then(user => {
            if (user) {
                res.json(user.projects);
            } else {
                res.status(404).json("User not found");
            }
        })
        .catch(err => res.status(500).json(err));
});

app.post('/tasks', (req, res) => {
    const { userId, projectId, text } = req.body;

    UserModel.findById(userId)
        .then(user => {
            if (user) {
                const project = user.projects.id(projectId);
                if (project) {
                    const newTodo = { text };
                project.todos.push(newTodo);
                return user.save();
                }
                else{
                    return res.status(404).json("Project not found");
                }
            } else {
                res.status(404).json("User not found");
            }
        })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(500).json(err));
});

app.get('/tasks', (req, res) => {
    const { userId, projectId } = req.query;

    UserModel.findById(userId)
        .then(user => {
            if (user) {
                const project = user.projects.id(projectId);
                if(project){
                    res.json(project.todos);
                }
                
            } else {
                res.status(404).json("User not found");
            }
        })
        .catch(err => res.status(500).json(err));
});

app.put('/tasks', (req, res) => {
    const { userId, projectId, taskId, text , completed} = req.body;

    UserModel.findOneAndUpdate(
        { _id: userId, 'projects._id': projectId, 'projects.todos._id': taskId },
        {
            $set: {
                'projects.$.todos.$[elem].text': text !== undefined ? text : undefined,
                'projects.$.todos.$[elem].completed': completed !== undefined ? completed : 'false',
                'projects.$.todos.$[elem].updatedDate': new Date()
            }
        },
        {
            arrayFilters: [{ 'elem._id': taskId }],
            new: true
        }
    )
    .then(updatedUser => {
        if (!updatedUser) {
            return res.status(404).json("User or Project not found");
        }
        const project = updatedUser.projects.id(projectId);
        if (project) {
            res.json(project.todos);
        } else {
            res.status(404).json("Project not found");
        }
    })
    .catch(err => res.status(500).json(err));
});


app.delete('/tasks', (req, res) => {
    const { userId, projectId, taskId } = req.query;

    UserModel.findOneAndUpdate(
        { _id: userId, 'projects._id': projectId },
        { $pull: { 'projects.$.todos': { _id: taskId } } },
        { new: true }
    )
    .then(updatedUser => {
        if (!updatedUser) {
            return res.status(404).json("User or Project not found");
        }
        res.json(updatedUser.projects.id(projectId).todos);
    })
    .catch(err => res.status(500).json(err));
});



app.listen(3000, () => {
    console.log("server is running")
})