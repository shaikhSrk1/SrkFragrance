import React from 'react'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { Modal } from 'antd';
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

export const Card = ({ Name, image, Feature, Price, Id, Fav, Description }) => {

    const [wish, setWish] = useState()
    const [auth, setAuth] = useAuth()
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [feature, setFeature] = useState('');
    const [id, setId] = useState('');
    const [photo, setPhoto] = useState();
    const [description, setDescription] = useState('');
    const [count, setCount] = useState(0);

    const getItems = async () => {
        if (auth.user == null) {
            return;
        }
        try {
            const item = await axios.get(`${process.env.REACT_APP_API}api/v1/wish/get-items/${auth.user._id}`);
            var array = []
            if (item) {
                await item.data.items.map((i) => {
                    array.push(i.product)
                })
                setWish(array)
            }
        } catch (e) {
            console.log('error in fetching wishlist products for homepage');
            return
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        getItems()
    }, [])


    const handleclick = async (name, feature, price, id, description) => {
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


    const handleCart = async (e, name, count, id) => {
        e.preventDefault();
        if (auth.user) {
            try {
                console.log(auth.user._id)
                const prod = await axios.post(`${process.env.REACT_APP_API}api/v1/cart/add-item-cart`, { product: id, user: auth.user._id, quantity: count });
                // prod = await prod.json();
                if (prod) {
                    toast.success(`${count} ${name} Added to cart`);
                    let c = auth.items + 1
                    setAuth({
                        ...auth,
                        items: c
                    })
                }
            } catch (error) {
                toast.error('Product Already in Cart')
            }
        } else {
            toast.error('Please Login');
            navigate('/login')
        }
    }

    const removeLike = async (e, name, id) => {
        e.preventDefault();
        if (auth.user != null) {
            const prod = await axios.delete(`${process.env.REACT_APP_API}api/v1/wish/delete-item-wish/${id}/${auth.user._id}`);
            if (prod) {
                getItems();
                toast.error(`${name} removed from Wishlist`, {
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
            }
        } else {
            toast.error('Please First Login');
            navigate('/login')
        }
    }

    const addLike = async (e, name, pid) => {
        e.preventDefault();
        if (auth.user != null) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API}api/v1/wish/add-item-wish`, { user: auth.user._id, product: pid });

                if (res.data.success) {
                    getItems()
                    // wish.push(id)

                    toast.success(`${name} added to Wishlist`, {
                        style: {
                            border: '1px solid black',
                            padding: '16px',
                            color: 'black',
                        },
                        iconTheme: {
                            primary: 'gray',
                            secondary: '#FFFAEE',
                        },
                    });
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }

        } else {
            toast.error('Please First Login');
            navigate('/login')
        }
    }

    return (
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4" style={{ alignSelf: 'center' }} >
            <div className="card myCard m-3" style={{ maxWidth: '100%' }} >

                <img style={{ objectFit: 'cover' }} onClick={() => { handleclick(Name, Feature, Price, Id, Description) }} src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${Id}`} alt={Name} />
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <h4 onClick={() => { handleclick(Name, Feature, Price, Id, Description) }}>{Name} </h4>
                        {
                            wish?.includes(Id) ?
                                <FaHeart className='heart' onClick={(e) => { removeLike(e, Name, Id) }} />
                                :
                                // <>j</>
                                <CiHeart className='heart' onClick={(e) => { addLike(e, Name, Id) }} />
                        }
                    </div>
                    <p onClick={() => { handleclick(Name, Feature, Price, Id, Description) }} className='m-0 p-0'>{Feature}</p>
                    <div onClick={() => { handleclick(Name, Feature, Price, Id, Description) }} className='d-flex align-items-center mt-2 justify-content-between'>
                        <h2 style={{ color: '#383838' }}>&#8377;{Price}</h2>
                        <button onClick={(e) => { handleCart(e, Name, 1, Id) }} className="btn btn-outline-success rounded-pill mx-1">
                            <MdShoppingCart /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <Modal styles={{ height: 'fit-content' }} width={1000} onCancel={() => setVisible(false)} footer={null} open={visible} >
                <div className='container box-2' style={{ width: '100%', height: "100%" }}>

                    <div className='container box p-0'>
                        <label style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='d-flex align-items-center justify-content-center '>
                            {id != null ? <img style={{ objectFit: 'cover', height: '100%', width: '100%' }} alt='Product img' src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`} /> : <img src={URL.createObjectURL(photo)} alt='Product img' style={{ width: '100% ' }} />}
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
                                <button onClick={(e) => addLike(e, name, id)} className="btn btn-outline-danger mx-3 ">
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
                                <button onClick={(e) => handleCart(e, name, count, id)} className="btn btn-outline-primary rounded-pill ">
                                    <MdShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                        </div>
                    </div>
                </div>
            </Modal>
        </div >

    )
}