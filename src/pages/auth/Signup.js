import React, { useState } from 'react'
import './auth.css'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            let resp = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/register`, { name, email, password });
            if (resp.data.success) {
                toast.success('Registered Successfully!');
                navigate('/login');
            } else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <Layout>
            <div className='form-container'>
                <div className='container box'>
                    <h1 className='mx-3'>Sign Up</h1>
                    <form onSubmit={handleRegister}>
                        <div className="row m-4">
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control m-2" placeholder='Name' required />
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control m-2" placeholder='Email' required />
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control m-2" placeholder='password' required />
                        </div>
                        <p> Already have an Account ? <Link to='/Login' href="#!">Login</Link></p>
                        <button type="submit" className="btn px-3 btn-primary btn-block mb-4">Register</button>
                    </form>
                   
                </div>
            </div >
        </Layout >
    )
}

export default Signup
