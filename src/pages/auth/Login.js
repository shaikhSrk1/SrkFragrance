import React, { useState } from 'react'
import './auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/login`, { email, password });
            if (resp.data.success && resp) {
                toast.success('Login successfully');

                if (resp.data.user.role === 1) {
                    navigate('/dashboard/messages')
                } else {
                    navigate(location.state || "/");
                }
                setAuth({
                    ...auth,
                    user: resp.data.user,
                    token: resp.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(resp.data));
            } else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout>
            <div className='form-container'>
                <div className='container box'>
                    <h1 className='mx-3'>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="row m-4">
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" id="form2Example1" className="form-control m-2" placeholder='Email' required />
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" id="form2Example2" className="form-control m-2" placeholder='password' required />
                        </div>
                        <button type="submit" className="btn px-3 btn-primary btn-block mb-4">Login</button>
                    </form>
                    <div className="text-center">
                        <p>Not a member? <Link to='/register' href="#!">Register</Link></p>
                       
                    </div>
                </div ></div>
        </Layout>
    )
}

export default Login
