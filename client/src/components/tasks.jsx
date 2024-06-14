import { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const userId = localStorage.getItem('userId');
    const projectId = localStorage.getItem('projectId');

   
    useEffect(() => {
        axios.get(`http://localhost:3000/tasks?userId=${userId}&projectId=${projectId}`)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => console.log(error));
    }, [userId, tasks]);

    const handleAddTask = () => {
        axios.post(`http://localhost:3000/tasks`, { userId: userId, projectId: projectId,  text: newTask })
            .then(response => {
                setTasks(prevTasks => [...prevTasks, response.data]);
                setNewTask('');
            })
            .catch(error => {
                console.error('Error adding task:', error);
            });
    };

    const handleUpdateTask = (taskId, newText) => {
        axios.put(`http://localhost:3000/tasks`, { userId, projectId, taskId, text: newText })
            .then(response => {
                setTasks(response.data.todos);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };


   const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:3000/tasks?userId=${userId}&projectId=${projectId}&taskId=${taskId}`)
            .then(response => {
                setTasks(response.data.todos);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#FCF5ED'}}>
    <div className="p-4 rounded w-75" style={{ backgroundColor: '#F4BF96'}}>
        <h2 className="text-center mb-4" style={{ color: '#CE5A67' }}>Tasks</h2>
        <form onSubmit={handleAddTask} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control p-4"
                    placeholder="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit" className="btn btn-success" style={{ backgroundColor: '#CE5A67', borderColor: '#CE5A67' }}>Add Task</button>
            </div>
        </form>
        <ul className="list-group p-2">
            {tasks.map(task => (
                <li key={task._id} className="d-flex justify-content-between align-items-center mb-2">
                    <input
                        type="text"
                        value={task.text}
                        className="form-control"
                        onChange={(e) => handleUpdateTask(task._id, e.target.value)}
                    />
                    <button
                        className="btn btn-danger m-2"
                        onClick={() => handleDeleteTask(task._id)}
                        style={{ backgroundColor: '#1F1717', borderColor: '#1F1717' }}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    </div>
</div>

    );
}

export default Tasks;
