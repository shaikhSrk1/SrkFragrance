import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import noCart from '../photos/emptyCart.avif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner2 from '../Components/Spinner2.js';
import { useAuth } from '../context/auth.js';
import toast from 'react-hot-toast';


const Cart = () => {
    const [auth, setAuth] = useAuth()
    const [totalItem, setTotalItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState();
    const [bill, setBill] = useState();

    const navigate = useNavigate();

    const getCartproducts = async () => {
        if (auth.user == null) {
            setTotalItem(0);
            setLoading(true)
            return;
        }
        try {
            const item = await axios.get(`${process.env.REACT_APP_API}api/v1/cart/get-items/${auth.user._id}`);
            // prod = await prod.json();
            console.log(item.data.items)
            if (item) {
                setItems(item.data.items);
                setLoading(true)
                setTotalItem(item.data.items.length)
                console.log(totalItem)
                setBill(item.data.bill);
            }
        } catch (e) {
            console.log('error in fetching cart products', e);
            return
        }
    }

    const moveToWishlist = async (e, id, name, cid) => {
        e.preventDefault();
        try {
            addLike(e, name, id)
            const is = removefromCart(e, cid, name);
            if (is) {
                toast.success(`${name} moved to wishlist`)
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }
    const addLike = async (e, name, pid) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/wish/add-item-wish`, { user: auth.user._id, product: pid });
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    const removefromCart = async (e, cid, name) => {
        // e.preventDefault();
        try {
            const prod = await axios.delete(`${process.env.REACT_APP_API}api/v1/cart/delete-item-cart/${cid}`);
            // prod = await prod.json();
            if (prod) {
                toast.success(`${name} removed from cart`)
                getCartproducts();
                return true;
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

    useEffect(() => {
        getCartproducts();
        if (items) {

            let c = items.length
            setAuth({
                ...auth,
                items: c
            })
        }
    }, [totalItem])

    const foo = () => {
        navigate('/');
    }

    const Item = ({ name, price, qty, id, cid }) => {
        return (<>
            <div style={{ height: '120px', borderRadius: '10px', flexDirection: 'row' }} className='d-flex cartrow p-2 my-2'>
                <div className='d-flex justify-content-between' style={{ width: '100%', flexDirection: 'column' }}>
                    <p className='m-0'> {name} </p>
                    <div className='d-flex justify-content-center'>
                        <span className='mx-2'>&#8377;{price}</span>
                        <span className='mx-2'>Qty : {qty}</span>
                    </div>
                    <span className='d-flex justify-content-center'>
                        <button className='btn btn-sm' onClick={(e) => removefromCart(e, cid, name)} style={{ borderTop: '1px solid gray ', borderRight: '1px solid gray ', borderRadius: '0px', width: '40%' }}>
                            Remove
                        </button>
                        <button className='btn btn-sm' onClick={(e) => { moveToWishlist(e, id, name, cid) }} style={{ borderTop: '1px solid gray ', borderRadius: '0px', minWidth: '45%' }}>
                            Move to wish list
                        </button>
                    </span>
                </div>
                <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`} alt='Product' style={{ height: '100%', width: '130px' }} />
            </div>
        </>)
    }

    return (
        <Layout>
            {
                loading ? <>
                    {
                        totalItem > 0 ?
                            <div id='cart' className='d-flex m-0'>
                                <div className='d-flex cartParent m-0 align-items-center justify-content-center p-2' >
                                    {items.map((item) =>
                                        <Item
                                            name={item.name}
                                            price={item.price}
                                            qty={item.quantity}
                                            id={item.product}
                                            cid={item._id}
                                        />
                                    )}
                                </div>
                                <div className='cartParent p-3 me-4 mt-3'>
                                    <div className='p-0'>
                                        <h4 className='p-2' style={{ backgroundColor: 'gray' }}>PRICE SUMMARY</h4>
                                        <div className='m-3'>
                                            <div className='d-flex item justify-content-between mx-2'>
                                                <p>Total MRP (Incl. of taxes)</p>
                                                <span> &#8377;{bill.mrp}</span>
                                            </div>
                                            <div className='d-flex item justify-content-between mx-2'>
                                                <p>Shipping Charges</p>
                                                <span> &#8377;{bill.shipping}</span>
                                            </div>
                                            <div className='d-flex justify-content-between mx-2'>
                                                <p>Bag Discount</p>
                                                <span>- &#8377;{bill.discount}</span>
                                            </div>
                                            {
                                                bill.discount === 0 ? <div class="alert p-2 alert-danger" role="alert">
                                                    Get &#8377;99 OFF on Orders above &#8377;199
                                                </div> : <></>
                                            }
                                            <div className='d-flex justify-content-between mx-2'>
                                                <p className='font'>Subtotal </p>
                                                <span className='font'> &#8377;{bill.subTotal}</span>
                                            </div>
                                            <div className='d-flex mt-4 py-2 align-items-center justify-content-between' style={{ borderTop: '1px solid gray' }}>
                                                <span>
                                                    <span className='m-0'>Total </span>
                                                    <span className='font'> &#8377;{bill.subTotal}/-</span>
                                                </span>
                                                <span><button className='btn btn-warning'>Add Delivery Details</button></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div style={{ height: '80vh', flexDirection: 'column' }} className='d-flex justify-content-center align-items-center'>
                                <h4> Your Cart is Empty</h4>
                                <img style={{ width: '40vh' }} src={noCart} />
                                <button onClick={foo} className='btn btn-outline-secondary'>
                                    Return to Home
                                </button>
                            </div>
                    }
                </>
                    :
                    <Spinner2 />

            }
        </Layout >
    )
}

export default Cart