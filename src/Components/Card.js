import React, { useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { Modal } from 'antd';
import { CiHeart } from "react-icons/ci";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { useWishlist } from '../context/wish';

export const Card = ({ Product }) => {

    const [cart, setCart] = useCart();
    const [wish, setWish] = useWishlist();
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(1);
    const [modal, setModal] = useState()

    const navigate = useNavigate();


    useEffect(() => {
        console.log(wish)
    })

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


    const addToCart = (e, m) => {
        e.preventDefault();
        let x;
        cart.filter(value => {
            if (value.item._id == m._id) {
                x = value
                cart.pop(value)
            }
        })
        if (!x) {
            setCart([...cart, { qty: count, item: m }])
            localStorage.setItem('cart', JSON.stringify([...cart, { qty: count, item: m }]))
            toast.success(count + ' ' + m.name + ' added to cart')
        } else {
            //remove from cart
            setCart([...cart, { qty: (x.qty + count), item: m }])
            toast.success((count) + " more " + m.name + ' added to cart')
            localStorage.setItem('cart', JSON.stringify([...cart, { qty: (x.qty + count), item: m }]))
        }
    }

    const removeLike = (e, p) => {
        e.preventDefault();

        wish.filter((value, i) => {
            if (value._id == p._id) {
                wish.splice(i, 1)
                return
            }
        })
        setWish([...wish])
        localStorage.setItem('wish', JSON.stringify([...wish]))
        toast.success(p.name + ' removed from wishlist')
    }

    const isFav = (p) => {
        let found = false
        wish.filter(value => {
            if (value._id == p._id) {
                found = true;
            }
        })
        return found
    }

    const inCart = (p) => {
        let found = false
        cart.filter(value => {
            if (value.item._id == p._id) {
                found = true;
                console.log(value.item._id)
            }
        })
        return found
    }

    const removefromCart = (e, p) => {
        e.preventDefault();
        cart.filter((value, i) => {
            if (value.item._id == p._id) {
                cart.splice(i, 1)
                toast.success(p.name + ' removed from cart')
                return
            }
        })
        setCart([...cart])
        localStorage.setItem('cart', JSON.stringify([...cart]))
    }

    const addLike = (e, p) => {
        e.preventDefault();
        let found = false
        wish.filter(value => {
            if (value._id == p._id) {
                toast.error('product already added')
                found = true;
            }
        })
        if (found) {
            return
        }
        setWish([...wish, p])
        localStorage.setItem('wish', JSON.stringify([...wish, p]))
        toast.success(p.name + ' added to wishlist')
    }


    return (
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4" style={{ alignSelf: 'center' }} >
            <div className="card myCard m-3" style={{ maxWidth: '100%' }} >

                <img style={{ objectFit: 'cover' }} onClick={() => { setModal(Product); setVisible(true) }} src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${Product._id}`} alt={Product.name} />
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <h4 onClick={() => { setModal(Product); setVisible(true) }}>{Product.name} </h4>
                        {
                            isFav(Product) ?
                                <FaHeart className='heart' onClick={(e) => { removeLike(e, Product) }} />
                                :
                                <CiHeart className='heart' onClick={(e) => { addLike(e, Product) }} />
                        }
                    </div>
                    <p onClick={() => { setModal(Product); setVisible(true) }} className='m-0 p-0'>{Product.features}</p>
                    <div onClick={() => { setModal(Product); setVisible(true) }} className='d-flex align-items-center mt-2 justify-content-between'>
                        <h2 style={{ color: '#383838' }}>&#8377;{Product.price}</h2>
                        <button onClick={(e) => setVisible(true)} className="btn btn-outline-primary rounded-pill mx-1">
                            More Details
                        </button>
                    </div>
                </div>
            </div>
            {
                modal ? <Modal styles={{ height: 'fit-content' }} width={1000} onCancel={() => setVisible(false)} footer={null} open={visible} >
                    <div className='container box-2 p-0' style={{ width: '100%', height: "100%", display: 'flex' }}>
                        <div className='container box p-0'>
                            <label style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='d-flex align-items-center justify-content-center '>
                                {<img style={{ objectFit: 'cover', height: '100%', width: '100%' }} alt='Product img' src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${modal._id}`} />}
                                {/* <input type='file' name='photo' hidden accept='image/*' onChange={(e) => { setId(null); setPhoto(e.target.files[0]); }} /> */}
                            </label>
                        </div>
                        <div className='container d-flex justify-content-between' style={{ flexDirection: 'column' }}>

                            <div className="" style={{ fontSize: 'large' }}>
                                <h1 className='mt-2'>{modal.name}</h1>
                                <p style={{ textAlign: 'left' }}>{modal.features}</p>
                                <p style={{ textAlign: 'left' }}>{modal.description}</p>
                            </div>
                            <div className='d-flex justify-content-between px-3' id='details'>
                                {
                                    isFav(modal) ?
                                        (<button onClick={(e) => removeLike(e, modal)} className="btn btn-warning mx-3 ">
                                            Remove from wishlist
                                        </button>) : <button onClick={(e) => addLike(e, modal)} className="btn btn-outline-danger mx-3 ">
                                            <CiHeart /> Add to Wishlist
                                        </button>
                                }
                                <div className='d-flex align-items-center justify-content-center' >
                                    <button onClick={(e) => minus(e)} className="btn btn-danger mx-1 my-2 ">
                                        -
                                    </button>
                                    <h3 className='m-0 mx-2'>{count}</h3>
                                    <button onClick={(e) => plus(e)} className="btn btn-success mx-1 my-2 ">
                                        +
                                    </button>
                                </div>
                                {inCart(modal) ? (<button onClick={(e) => removefromCart(e, modal)} className="btn btn-success rounded-pill ">
                                    <MdShoppingCart />remove from cart
                                </button>) : <button onClick={(e) => addToCart(e, modal)} className="btn btn-outline-success rounded-pill ">
                                    <MdShoppingCart /> Add to Cart
                                </button>}
                            </div>

                            <div className="text-center">
                            </div>
                        </div>
                    </div>
                </Modal>
                    :
                    ''
            }
        </div >

    )
}