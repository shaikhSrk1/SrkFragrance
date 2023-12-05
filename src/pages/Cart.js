import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import noCart from '../photos/emptyCart.avif'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.js';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart.js';
import { useWishlist } from '../context/wish.js';


const Cart = () => {
    const [auth, setAuth] = useAuth()
    const [bill, setBill] = useState({});
    const [cart, setCart] = useCart();
    const [wish, setWish] = useWishlist();

    const navigate = useNavigate();

    const moveToWishlist = async (e, p) => {
        e.preventDefault();
        let found = false;
        wish.filter(value => {
            if (value._id == p._id) {
                toast.error('product already added in wishlist')
                found = true;
            }
        })

        if (found) {
            return
        }
        setWish([...wish, p])
        localStorage.setItem('wish', JSON.stringify([...wish, p]))

        toast.success(p.name + ' moved to wishlist');
    }

    const removefromCart = (e, p) => {
        e.preventDefault();
        const index = cart.indexOf(p);
        if (index > -1) { // only splice array when item is found
            cart.splice(index, 1); // 2nd parameter means remove one item only
        }
        setCart([...cart])
        calculateBill()
    }

    const foo = () => {
        navigate('/');
    }

    const minus = (e, p) => {
        e.preventDefault()
        const objIndex = cart.findIndex((obj => obj.item._id == p._id));
        if (cart[objIndex].qty > 1) {
            cart[objIndex].qty = cart[objIndex].qty - 1
            setCart([...cart])
            calculateBill()
        }
    }

    const plus = (e, p) => {
        e.preventDefault()
        const objIndex = cart.findIndex((obj => obj.item._id == p._id));
        if (cart[objIndex].qty < 10) {
            cart[objIndex].qty = cart[objIndex].qty + 1
            setCart([...cart]);
            calculateBill()
        }
    }

    const calculateBill = () => {
        var x = 0;
        cart?.forEach(element => {
            // alert(element.item.price)
            console.log(element.item.price * element.qty)
            x = x + element.item.price * element.qty
        });
        console.log(x)

        var discount = 0;
        if (x > 299) {
            discount = 0.1 * x;
        }
        discount = discount.toFixed(2)
        let shipping = 40

        setBill({
            ...bill,
            mrp: x,
            discount: discount,
            shipping: shipping,
            subTotal: (x + shipping - discount)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    useEffect(() => {
        calculateBill()

    }, [])

    const Item = ({ p }) => {
        return (<>
            <div style={{ height: '120px', borderRadius: '10px', flexDirection: 'row' }} className='d-flex cartrow p-2 my-2'>
                <div className='d-flex justify-content-between' style={{ width: '100%', flexDirection: 'column' }}>
                    <p className='m-0'> {p?.item.name} </p>
                    <div className='d-flex justify-content-around'>
                        <h5 className='mx-2'>&#8377;{p.item.price * p.qty}</h5>
                        <span className='mx-2'>
                            Qty :
                            <button onClick={(e) => minus(e, p.item)} className="btn mx-1 btn-sm btn-danger ">
                                -
                            </button>
                            {p.qty}
                            <button onClick={(e) => plus(e, p.item)} className="btn mx-1 btn-sm btn-success">
                                +
                            </button>
                        </span>
                        {/* <h3 className='m-0 mx-2'>{count}</h3> */}
                    </div>
                    <span className='d-flex justify-content-center'>
                        <button className='btn btn-sm' onClick={(e) => removefromCart(e, p)} style={{ borderTop: '1px solid gray ', borderRight: '1px solid gray ', borderRadius: '0px', width: '40%' }}>
                            Remove
                        </button>
                        <button className='btn btn-sm' onClick={(e) => { moveToWishlist(e, p.item); removefromCart(e, p); }} style={{ borderTop: '1px solid gray ', borderRadius: '0px', minWidth: '45%' }}>
                            Move to wish list
                        </button>
                    </span>
                </div>
                <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p.item._id}`} alt='Product' style={{ height: '100%', width: '130px' }} />
            </div>
        </>)
    }

    return (
        <Layout>
            {/* <pre> {JSON.stringify(bill)}</pre> */}
            {
                cart?.length > 0 ? <>
                    <div id='cart' className='d-flex m-0'>
                        <div className='d-flex cartParent m-0 align-items-center justify-content-center p-2' >
                            <p>{cart?.length} items in your cart {auth?.token ? '' : 'Please login to checkout'}</p>
                            {cart?.map((item) =>
                                <Item
                                    p={item}
                                />
                            )}
                        </div>
                        <div className='cartParent p-3 me-4 mt-3'>
                            <div className='p-0'>
                                <h4 className='p-2' style={{ backgroundColor: 'gray' }}>PRICE SUMMARY</h4>
                                <div className='m-3'>
                                    <div className='d-flex item justify-content-between mx-2'>
                                        <p>Total MRP (Incl. of taxes)</p>
                                        <span> &#8377;{bill?.mrp}</span>
                                    </div>
                                    <div className='d-flex item justify-content-between mx-2'>
                                        <p>Shipping Charges</p>
                                        <span> &#8377;{bill?.shipping}</span>
                                    </div>
                                    <div className='d-flex justify-content-between mx-2'>
                                        <p>Bag Discount</p>
                                        <span>- &#8377;{bill?.discount}</span>
                                    </div>
                                    {
                                        bill?.discount === 0 ? <div class="alert p-2 alert-danger" role="alert">
                                            Get 10% OFF on Orders above &#8377;300
                                        </div> : <></>
                                    }
                                    <div className='d-flex justify-content-between mx-2'>
                                        <p className='font'>Subtotal </p>
                                        <span className='font'> &#8377;{bill?.subTotal}</span>
                                    </div>
                                    <div className='d-flex mt-4 py-2 align-items-center justify-content-between' style={{ borderTop: '1px solid gray' }}>
                                        <span>
                                            <span className='m-0'>Total </span>
                                            <span className='font'> &#8377;{bill?.subTotal}/-</span>
                                        </span>
                                        <span>
                                            {
                                                auth.user == null ?
                                                    <button onClick={() => navigate("/login", { state: "/cart" })} className='btn btn-warning'>Login to checkout</button>
                                                    :
                                                    <button className='btn btn-warning'>Add Delivery Details</button>

                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                    :
                    <div style={{ height: '80vh', flexDirection: 'column' }} className='d-flex justify-content-center align-items-center'>
                        <h4> Your Cart is Empty</h4>
                        <img style={{ width: '40vh' }} src={noCart} />
                        <button onClick={foo} className='btn btn-outline-secondary'>
                            Return to Home
                        </button>
                    </div>

            }
        </Layout >
    )
}

export default Cart