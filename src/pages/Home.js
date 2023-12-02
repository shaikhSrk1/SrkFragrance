import React, { useRef } from 'react'
import Layout from '../Components/Layout/Layout.js'
import { useAuth } from '../context/auth.js';
import './Home.css';
import { MdShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Modal } from 'antd'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner2 from '../Components/Spinner2.js';

const Home = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [feature, setFeature] = useState('');
    const [id, setId] = useState('');
    const [photo, setPhoto] = useState();
    const [description, setDescription] = useState('');
    const [count, setCount] = useState(1)
    const [loading, setLoading] = useState(true);
    const refe = useRef(null)

    const navigate = useNavigate();

    const handleScroll = () => {
        var element = document.getElementById("show");
        element.scrollIntoView();
        element.scrollIntoView(false);
        element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }

    const handleLike = (e, name) => {
        e.preventDefault();
        if (auth.user) {
            toast.success(`${name} added to Wishlist`, {
                style: {
                    border: '1px solid red',
                    padding: '16px',
                    color: 'black',
                },
                iconTheme: {
                    primary: 'red',
                    secondary: '#FFFAEE',
                },
            });
        } else {
            toast.error('Please First Login');
            navigate('/login')
        }
    }

    const removeLike = (e, name) => {
        e.preventDefault();
        if (auth.user) {
            // toast.success(`${name} removed from Wishlist`)
            toast.success(`${name} removed from Wishlist`, {
                style: {
                    border: '1px solid gray',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: 'gray',
                    secondary: '#FFFAEE',
                },
            });
        } else {
            toast.error('Please First Login');
            navigate('/login')
        }
    }


    const handleCart = (e, name, c) => {
        e.preventDefault();
        if (auth.user) {
            toast.success(`${c} ${name} Added to cart`)
        } else {
            toast.error('Please First Login before shopping');
            navigate('/login')
        }
    }

    const getAllProducts = async () => {
        try {
            const prod = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-products`);
            // prod = await prod.json();
            if (prod) {
                console.log(prod.data.products)
                setProducts(prod.data.products);
                setLoading(false)
            }
        } catch (e) {
            console.log('error in fetching products', e);
            return
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    const handleclick = async (name, feature, price, id, description) => {
        // let prod = await axios.get(`${process.env.REACT_APP_API}api/v1/product/singleproduct/${i}`);
        // prod = prod.data.product
        setVisible(true);
        setName(name)
        setFeature(feature)
        setPrice(price)
        setId(id)
        setDescription(description)
        setCount(1)
        setPhoto(`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`)
        // console.log(prod.name)
    }

    const minus = (e) => {
        e.preventDefault()
        if (count === 1) {
            return
        }
        setCount(count - 1)
    }

    const plus = (e) => {
        e.preventDefault()
        if (count === 10) {
            return
        }
        setCount(count + 1)
    }

    const Card = ({ Name, image, feature, price, id, description }) => (
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <div className="card myCard m-0 mb-5" >

                <img style={{ objectFit: 'cover' }} onClick={() => { handleclick(Name, feature, price, id, description) }} src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`} alt={Name} />
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <h4>{Name} </h4>
                        {/* <CiHeart className='heart' onClick={(e) => { handleLike(e, Name) }} /> */}
                        <FaHeart className='heart' onClick={(e) => { removeLike(e, Name) }} />
                    </div>
                    <p className='m-0 p-0'>{feature}</p>
                    <div className='d-flex align-items-center mt-2 justify-content-between'>
                        <h2 style={{ color: '#383838' }}>$ {price}</h2>
                        <button onClick={(e) => { handleCart(e, Name, 1) }} className="btn btn-outline-success rounded-pill mx-1">
                            <MdShoppingCart /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Layout>
            {/* <pre> {JSON.stringify(auth, null, 4)}</pre> */}



            <div style={{ position: 'relative', height: '50vh', width: '100%' }} className='fluid-container' id='wall'>
                <div style={{ backgroundColor: '', zIndex: '' }} className='batul m-4 p-3 ' >
                    <h1>Aromas Haven</h1>
                    <p>Welcome to Aroma Haven ! Our passion for scents and dedication to quality make us your ideal choice for all things perfume </p>
                    <button className='btn btn-secondary' onClick={() => { handleScroll() }}> Start Shopping</button>
                </div>
            </div>
            <div className='container' style={{}} id='show'>
                <div className="navbar bg-dark bg-body-tertiary ">
                    <div className="container-fluid d-flex justify-content-between">
                        <button style={{ width: 'auto' }} className="btn btn-outline-danger wish mx-3 ">
                            <CiHeart /> Wishlist
                        </button>
                        {/* <form className="d-flex" role="search"> */}
                        <div className='d-flex justify-content-end' style={{ width: '85%' }}>

                            <input style={{ width: '75%' }} className="form-control me-2" type="search" placeholder="Search for products" aria-label="Search" />
                            <button className="btn btn-primary" type="submit"><FaSearch /></button>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>

            <div class="container my-4 box-3">
                <div class="row" >
                    {
                        loading ? (<Spinner2 />) : <>
                            {products ? products?.map((item, i) =>
                                < Card
                                    Name={item.name}
                                    image={item.photo}
                                    feature={item.features}
                                    price={item.price}
                                    id={item._id}
                                    description={item.description ? item.description : ''}
                                    clickHandler={() => handleclick(item._id)}
                                />)
                                :
                                'No products in your shop. start Adding'}
                        </>
                    }
                </div>
            </div>

            <Modal bodyStyle={{ height: 'fit-content' }} width={1000} onCancel={() => setVisible(false)} footer={null} open={visible} >
                <div className='container box-2' style={{ width: '100%', height: "100%" }}>

                    <div className='container box p-0'>
                        <label style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='d-flex align-items-center justify-content-center '>
                            {id != null ? <img style={{ objectFit: 'cover', height: '100%', width: '100%' }} src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`} /> : <img src={URL.createObjectURL(photo)} style={{ width: '100% ' }} />}
                            {/* <input type='file' name='photo' hidden accept='image/*' onChange={(e) => { setId(null); setPhoto(e.target.files[0]); }} /> */}
                        </label>
                    </div>
                    <div className='container d-flex'>
                        <form>
                            <div className="row m-4" style={{ fontSize: 'large' }}>
                                <h1 className='mx-3'>{name}</h1>
                                <p style={{ textAlign: 'left' }}>{feature}</p>
                                <p style={{ textAlign: 'left' }}>{description}</p>
                            </div>
                            <div className='d-flex justify-content-between px-3' id='details'>
                                <button onClick={(e) => handleLike(e, name)} className="btn btn-outline-danger mx-3 ">
                                    <CiHeart /> Add to Wishlist
                                </button>

                                <div className='d-flex align-items-center justify-content-center' >
                                    <button onClick={(e) => minus(e)} className="btn btn-danger mx-1 my-2 ">
                                        -
                                    </button>
                                    <h3 className='m-0 mx-2'>{count}</h3>
                                    <button onClick={(e) => plus(e)} className="btn btn-success mx-1 my-2 ">
                                        +
                                    </button>
                                </div>
                                <button onClick={(e) => handleCart(e, name, count)} className="btn btn-outline-primary rounded-pill ">
                                    <MdShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}

export default Home