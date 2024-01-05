import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/auth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FaHeart } from "react-icons/fa";
import { useCart } from '../../context/cart';
import logo from '../../photos/Logo.png'
import { Modal } from 'antd';
import about from '../../photos/about.jpg'

const Header = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [visible, setVisible] = useState(false);

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth');
        toast.success('Successfully Logout', {
            style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
        });
        setVisible(false)
        navigate('/');
    }
    return (
        <>
            <nav id='Nav' className="navbar navbar-expand-lg bg-body-tertiary" style={{ position: 'fixed', zIndex: '5', width: '100%' }}>
                <img src={about} style={{ height: '40px' }} />
                <Link to='/about' style={{}} id='brand' className="">
                    <h4 className='m-0 ms-1' style={{ fontSize: '20px' }}>Srk Fragrance</h4></Link >
                {/* <div className="container-fluid"> */}


                {/* phone navbar */}
                <ul style={{ display: 'flex', alignItems: 'center' }} className="m-0 p-0">
                    <NavLink to='/cart' className="nav-link  phone" style={{ position: 'relative' }}>
                        <AiOutlineShoppingCart className='me-1 ' style={{ fontSize: '25px' }} />
                        <span id='number' className='px-2' style={{ position: 'absolute', opacity: '65%', top: '-15px', right: '15px' }}>
                            {cart?.length}
                        </span>
                    </NavLink>
                    <NavLink to='/wishlist' style={{ border: 'none' }} className="mx-1  phone"><FaHeart style={{ color: 'black' }} /></NavLink>

                    {
                        auth.token ? <NavLink to='/profile' style={{ border: 'none', fontSize: '25px' }} className="mx-1 phone">
                            <CiUser style={{ color: 'black' }} />
                        </NavLink> : ''
                    }



                    <button className="navbar-toggler ms-1 p-1 py-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                </ul>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {
                        auth.user && auth.user.role === 1 ? (<ul className="ms-auto navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/dashboard/products' className="nav-link" aria-current="page">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/dashboard/addproduct' className="nav-link">Add products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/dashboard/orders' className="nav-link" aria-current="page">Orders</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/dashboard/messages' className="nav-link">Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to='/cart' className="nav-link" style={{ position: 'relative' }}>
                                    <AiOutlineShoppingCart className='me-1' style={{ fontSize: '25px' }} />
                                    <span id='number' className='px-2' style={{ position: 'relative', bottom: '9px', right: '9px' }}>
                                        1
                                    </span>
                                </NavLink>
                            </li>
                        </ul>) : (<ul className="ms-auto navbar-nav">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
                            </li>

                            {
                                auth?.token && <li className="nav-item"  >
                                    <NavLink to='/myorders' className="nav-link">My Orders</NavLink>
                                </li>
                            }
                            <li className="nav-item">
                                <NavLink to='/about' className="nav-link" aria-current="page">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/contact' className="nav-link">Contact Us</NavLink>
                            </li>
                            <li className='nav-item'>



                                {
                                    auth.user ? (
                                        <span>
                                            <NavLink onClick={() => setVisible(true)} className="nav-link phone">  <BiLogOut /> Logout </NavLink>
                                        </span>
                                    ) :
                                        (<>
                                            <li className="nav-item phone">
                                                <NavLink to='/login' className="nav-link btn-primary btn">
                                                    <CiLogin /> Login
                                                </NavLink>
                                            </li>
                                        </>)
                                }
                            </li>
                            <NavLink to='/cart' className="nav-link big" style={{ position: 'relative' }}>
                                Cart <AiOutlineShoppingCart className='me-1 ' style={{ fontSize: '25px' }} />
                                <span id='number' className='px-2' style={{ position: 'relative', bottom: '9px', right: '9px' }}>
                                    {cart?.length}
                                </span>
                            </NavLink>
                        </ul>)
                    }

                    <div className="ms-auto d-flex align-items-center navbar-nav big">

                        {
                            auth.user ? (
                                <>
                                    <span>
                                        <NavLink style={{ border: 'none' }} onClick={() => setVisible(true)} className="nav-link big">  <BiLogOut style={{ color: 'black', fontSize: '20px' }} /> Logout </NavLink>
                                    </span>
                                    <NavLink to='/profile' style={{ border: 'none', fontSize: '25px' }} className="mx-1 big">
                                        <CiUser style={{ color: 'black' }} />
                                    </NavLink>
                                </>
                            ) :
                                (<>
                                    <NavLink to='/register' style={{ border: 'none' }} className="mx-1 big"><button className="btn btn-sm  btn-outline-primary">
                                        Register
                                    </button></NavLink>

                                    <NavLink to='/login' style={{ border: 'none' }} className="mx-2 big "><button className="btn btn-sm  btn-primary">
                                        login
                                    </button></NavLink>
                                </>)
                        }



                        <NavLink to='/wishlist' style={{ border: 'none' }} className="me-3  big"><FaHeart style={{ color: 'black' }} /></NavLink>

                    </div>
                    {/* </div> */}
                </div>
            </nav>

            <Modal styles={{ height: 'fit-content' }} onCancel={() => setVisible(false)} footer={null} open={visible} >
                <div className='d-flex ' style={{ flexDirection: 'column' }}>
                    <p style={{ fontSize: '20px' }}> Are you sure you want to logout ?</p>

                    <span style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button onClick={() => { setVisible(false) }} className='btn btn-secondary'>
                            Cancel
                        </button>
                        <button onClick={() => handleLogout()} className='btn btn-outline-danger'>
                            Logout
                        </button>
                    </span>
                </div>
            </Modal>

        </>
    )
}

export default Header