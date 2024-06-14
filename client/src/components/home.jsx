import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate()

   
    useEffect(() => {
        axios.get(`http://localhost:3000/projects?userId=${userId}` )
            .then(response => setProjects(response.data))
            .catch(error => console.log(error));
    }, [userId, projects]);

    
    const handleAddProject = () => {
        axios.post(`http://localhost:3000/projects`, { userId: userId, title: newProject })
            .then(response => {
                setProjects(prevProj => [...prevProj, response.data]);
                setNewProject('');
            })
            .catch(error => {
                console.error('Error adding project:', error);
            });
    };
   
    const handleOpenProject = (projectId) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('projectId', projectId);
        navigate('/tasks');
    };


    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: '#FCF5ED'}}>
    <div className="p-4 rounded w-75" style={{ backgroundColor: '#F4BF96'}}>
        <h2 className="text-center mb-4" style={{ color: '#CE5A67' }}>Projects</h2>
        <form onSubmit={handleAddProject} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control p-4"
                    placeholder="New project title"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                />
                <button type="submit" className="btn btn-success" style={{ backgroundColor: '#CE5A67', borderColor: '#CE5A67' }}>Add Project</button>
            </div>
        </form>
        <ul className="list-group p-2">
            {projects.map(project => (
                <li key={project._id} className="d-flex justify-content-between align-items-center mb-2">
                    <button
                        className="btn btn-danger m-2"
                        onClick={() => handleOpenProject(project._id)}
                        style={{ backgroundColor: '#1F1717', borderColor: '#1F1717' }}
                    >
                        {project.title}
                    </button>
                </li>
            ))}
        </ul>
    </div>
</div>

    );
}

export default Home;
