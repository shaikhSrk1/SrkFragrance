import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/auth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { CiLogin } from "react-icons/ci";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useCart } from '../../context/cart';

const Header = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
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
        navigate('/');
    }
    return (
        <>
            <nav id='Nav' className="navbar navbar-expand-lg bg-body-tertiary" style={{ position: 'fixed', zIndex: '5', width: '100%' }}>
                <Link to='/about' style={{}} id='brand' className=""> <h5 className='m-0'>Aromas Haven</h5></Link >
                {/* <div className="container-fluid"> */}


                {/* phone navbar */}
                <ul style={{ display: 'flex' }} className="m-0 p-0">
                    <NavLink to='/cart' className="nav-link  phone" style={{ position: 'relative' }}>
                        Cart <AiOutlineShoppingCart className='me-1 ' style={{ fontSize: '25px' }} />
                        <span id='number' className='px-2' style={{ position: 'relative', bottom: '9px', right: '9px' }}>
                            {cart?.length}
                        </span>
                    </NavLink>
                    <NavLink to='/wishlist' style={{ border: 'none' }} className="mx-1  phone"><button className="btn btn-sm nav-2btn btn-outline-danger">
                        <FaHeart />
                    </button></NavLink>

                    <button className="navbar-toggler p-1 py-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                </ul>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {
                        auth.user && auth.user._id === "65355a9e3e19fff66f42a400" ? (<ul className="ms-auto navbar-nav">
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
                                <NavLink to='/dashboard/messages' className="nav-link">Messages</NavLink>
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

                            <li className="nav-item"  >
                                <NavLink to='/myorders' className="nav-link">My Orders</NavLink>
                            </li>
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
                                            <NavLink to='/login' onClick={handleLogout} className="nav-link phone">  <BiLogOut /> Logout </NavLink>
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

                    <div className="ms-auto navbar-nav big">

                        {
                            auth.user ? (
                                <span>
                                    <button onClick={handleLogout} className="btn  btn-sm btn-outline-danger mx-1">
                                        <BiLogOut /> Logout
                                    </button>
                                </span>
                            ) :
                                (<>
                                    <NavLink to='/register' style={{ border: 'none' }} className="mx-1"><button className="btn btn-sm  btn-outline-primary">
                                        Register
                                    </button></NavLink>

                                    <NavLink to='/login' style={{ border: 'none' }} className="mx-1 "><button className="btn btn-sm  btn-primary">
                                        login
                                    </button></NavLink>
                                </>)
                        }

                        <NavLink to='/wishlist' style={{ border: 'none' }} className="mx-1"><button className="btn btn-sm  btn-outline-danger">
                            <FaHeart />
                        </button></NavLink>

                    </div>
                    {/* </div> */}
                </div>
            </nav>

        </>
    )
}

export default Header