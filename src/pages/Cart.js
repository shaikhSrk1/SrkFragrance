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
    const [total, setTotal] = useState(0)

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
        localStorage.setItem('cart', JSON.stringify([...cart]))
    }

    const plus = (e, p) => {
        e.preventDefault()
        const objIndex = cart.findIndex((obj => obj.item._id == p._id));
        if (cart[objIndex].qty < 10) {
            cart[objIndex].qty = cart[objIndex].qty + 1
            setCart([...cart]);
            calculateBill()
        }
        localStorage.setItem('cart', JSON.stringify([...cart]))
    }

    const calculateBill = () => {

        var x = 0;
        cart?.forEach(element => {
            // alert(element.item.price)
            console.log(element.item.price * element.qty)
            x = x + element.item.price * element.qty
        });
        console.log(x);
        setTotal(x);

        var discount = 0;
        if (x > 299) {
            discount = 0.1 * x;
        }
        discount = discount.toFixed(2)
        let shipping = 40

        const i = {
            mrp: x,
            discount: discount,
            shipping: shipping,
            subTotal: (x + shipping - discount)
        }
        setBill(i)
        setAuth({
            ...auth,
            bill: i
        });

        localStorage.setItem('auth', JSON.stringify({
            ...auth,
            bill: i
        }))
    }

    const Checkout = () => {
        navigate('/checkout');
    }

    useEffect(() => {
        calculateBill()
    }, [total])

    const Item = ({ p }) => {
        return (<>
            <div style={{ width: '360px', height: '120px', borderRadius: '10px', flexDirection: 'row' }} className='d-flex cartrow px-0 py-2 my-2'>
                <div className='d-flex justify-content-between mx-0' style={{ width: '260px', flexDirection: 'column' }}>
                    <p className='m-0'> {p?.item.name} </p>
                    <div className='d-flex justify-content-around'>
                        <h5 className='mx-2'>&#8377;{p.item.price * p.qty}</h5>
                        <span className='mx-2'>
                            Qty :
                            <button onClick={(e) => minus(e, p.item)} className="btn mx-1 btn-sm btn-secondary ">
                                -
                            </button>
                            {p.qty}
                            <button onClick={(e) => plus(e, p.item)} className="btn mx-1 btn-sm btn-secondary">
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
                <img className='p-1' src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p.item._id}`} alt='Product' style={{ width: '100px' }} />
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

                        <ul className="pt-5 list-group list-group2  " >
                            <p style={{ margin: '5px auto' }}>You're paying for</p>
                            {
                                cart?.map((i) =>
                                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                                        <div>
                                            <h6 className="my-0">{i.item.name}</h6>
                                            <small className="text-muted">&#8377;{i.item.price}{i.qty == "1" ? '' : ' X' + i.qty}</small>
                                        </div>
                                        <span className="text-muted">&#8377;{i.item.price * i.qty}</span>
                                    </li>
                                )
                            }

                            <li className="list-group-item d-flex justify-content-between">
                                <span>MRP (INR)</span>
                                <strong>&#8377;{bill?.mrp}</strong>
                            </li>
                        </ul>
                    </div>
                    <div style={{ margin: 'auto' }} className='cartParent p-3  mt-3'>
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
                                    bill?.discount == 0.0 ? <div class="alert p-2 alert-danger" role="alert">
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
                                                <button onClick={Checkout} className='btn btn-warning'> Checkout</button>

                                        }
                                    </span>
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