import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../context/auth'
import { CiHeart } from "react-icons/ci";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate()
    return (
        <Layout>
            {
                auth.token ? <div className='container d-flex my-5' style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <h1>My Profile</h1>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{auth.user.name} {auth.user.lname}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{auth.user.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Mobile</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{auth.user.phone}</p>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{auth.user.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                        <button style={{ width: 'auto' }} onClick={() => { navigate('/wishlist') }} className="btn btn-outline-danger no-phone wish mx-3 ">
                            <CiHeart />My Wishlist
                        </button>
                        <button style={{ width: 'auto' }} onClick={() => { navigate('/myorders') }} className="btn btn-warning no-phone wish mx-3 ">
                            See my Orders
                        </button>

                    </div>
                </div> :
                    <>
                    </>
            }

        </Layout>
    )
}

export default Profile