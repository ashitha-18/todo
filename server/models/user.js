const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
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
    tasks: [TaskSchema]  
});


const UserModel = mongoose.model("userlist", UserSchema)
const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = { UserModel, TaskModel };