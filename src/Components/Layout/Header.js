import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/auth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

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
            <nav id='Nav' className="navbar navbar-expand-lg bg-body-tertiary" style={{ position: 'fixed', zIndex: '5', width: '100%', height: '10vh' }}>
                <Link to='/about' id='brand' className=""> Aromas Haven</Link >
                {/* <div className="container-fluid"> */}

                <ul style={{ display: 'flex' }} className="m-0 p-0 ms-auto">

                    {
                        auth.user ? (
                            <>
                                <button onClick={handleLogout} className="btn nav-2btn btn-outline-danger mx-1">
                                    <BiLogOut /> Logout
                                </button>
                            </>
                        ) :
                            (<>
                                <NavLink to='/login' style={{ border: 'none' }} className="mx-1 "><button className="btn nav-2btn btn-primary">
                                    login
                                </button></NavLink>
                            </>)
                    }
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* <NavLink to='/wishlist' style={{ border: 'none' }} className="mx-1"><button className="btn nav-2btn btn-outline-danger">
                        <FaHeart style={{}} />
                    </button></NavLink>
                    <NavLink to='/cart' className="nav-link nav-2btn" style={{ position: 'relative' }}><AiOutlineShoppingCart className='me-1' style={{ fontSize: '25px' }} /><span id='number' className='px-2' style={{ position: 'relative', bottom: '9px', right: '9px' }}>3</span></NavLink> */}
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
                        </ul>)
                    }

                    <div className="ms-auto navbar-nav">

                        {
                            auth.user ? (
                                <>


                                    <button onClick={handleLogout} className="btn nav-btn btn-outline-danger mx-1">
                                        <BiLogOut /> Logout
                                    </button>


                                </>
                            ) :
                                (<>

                                    <NavLink to='/register' style={{ border: 'none' }} className="mx-1"><button className="btn nav-btn btn-outline-primary">
                                        Register
                                    </button></NavLink>

                                    <NavLink to='/login' style={{ border: 'none' }} className="mx-1 "><button className="btn nav-btn btn-primary">
                                        login
                                    </button></NavLink>
                                </>)
                        }

                        <NavLink to='/wishlist' style={{ border: 'none' }} className="mx-1"><button className="btn nav-btn btn-outline-danger">
                            <FaHeart style={{}} />
                        </button></NavLink>
                        <NavLink to='/cart' className="nav-link nav-btn" style={{ position: 'relative' }}>
                            <AiOutlineShoppingCart className='me-1' style={{ fontSize: '25px' }} />
                            <span id='number' className='px-2' style={{ position: 'relative', bottom: '9px', right: '9px' }}>
                                1
                            </span>
                        </NavLink>
                    </div>
                    {/* </div> */}
                </div>
            </nav>

        </>
    )
}

export default Header