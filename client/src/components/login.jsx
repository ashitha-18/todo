import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login(){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/login', { email, password})
        .then(result => {
            console.log(result)
            if (result.data.message === "success") {
                localStorage.setItem('userId', result.data.userId);
                navigate('/home');
            }
            
        })
        .catch(err => console.log(err))
    }


    return(
        <div className='d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1F1717'}}>
    <div className='p-3 rounded w-25' style={{ backgroundColor: '#FCF5ED'}}>
        <h2 className="text-center" style={{ color: '#CE5A67' }}>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email">
                    <h6>Email id</h6>
                </label>
                <input
                    type='email'
                    required
                    placeholder='Enter email id'
                    name='email'
                    className='form-control rounded-0'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="password">
                    <h6>Password</h6>
                </label>
                <input
                    type='password'
                    required
                    placeholder='Enter password'
                    name='password'
                    className='form-control rounded-0'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-0' style={{ backgroundColor: '#CE5A67', borderColor: '#CE5A67' }}>
                Login
            </button>
            <div className="text-center mt-3">
            <p className="d-inline">Don't have an account?</p>
            <Link to="/signup" className="text-decoration-none" style={{ color: '#CE5A67', marginLeft: '5px' }}>
                Sign up
            </Link>
        </div>
            
        </form>
    </div>
</div>

    )
}

export default Login;