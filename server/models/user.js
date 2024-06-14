const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }

});

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    todos: [TaskSchema]
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [ProjectSchema]  
});



const UserModel = mongoose.model("userlist", UserSchema)
const TaskModel = mongoose.model("Task", TaskSchema);
const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = { UserModel, TaskModel, ProjectModel };