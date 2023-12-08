import React from 'react'
import Layout from '../Components/Layout/Layout';
import noWish from '../photos/empty-wishlist.png'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/wish.js';
import { useCart } from '../context/cart.js';

const Wishlist = () => {
    const navigate = useNavigate();
    const [wish, setWish] = useWishlist();
    const [cart, setCart] = useCart()

    const foo = () => {
        navigate('/')
    }

    const addtocart = (e, m) => {
        e.preventDefault();
        let x;
        cart.filter(value => {
            if (value.item._id == m._id) {
                x = value
                cart.pop(value)
            }
        })
        if (!x) {
            setCart([...cart, { qty: 1, item: m }])
            localStorage.setItem('cart', JSON.stringify([...cart, { qty: 1, item: m }]))
            toast.success(1 + ' ' + m.name + ' added to cart')
        } else {
            //remove from cart
            setCart([...cart, { qty: (x.qty + 1), item: m }])
            toast.success((1) + " more " + m.name + ' added to cart')
            localStorage.setItem('cart', JSON.stringify([...cart, { qty: (x.qty + 1), item: m }]))
        }
    }

    const removeLike = async (e, p) => {
        e.preventDefault();
        const index = wish.indexOf(p);
        if (index > -1) { // only splice array when item is found
            wish.splice(index, 1); // 2nd parameter means remove one item only
        }
        setWish([...wish])
        localStorage.setItem('wish', JSON.stringify([...wish]))
        toast.success(p.name + ' removed from wishlist')
    }

    const Item = ({ p }) => {
        return (<>
            <div style={{ height: '120px', borderRadius: '10px' }} className='d-flex wishrow justify-content-between p-2 m-2 box'>
                {/* <div className='d-flex justify-content-between ' style={{ width: '100%' }}> */}
                <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p._id}`} alt='Product' style={{ height: '100%', width: '130px' }} />
                <span className='d-flex justify-content-center ' style={{ flexDirection: 'column' }}>
                    <p className='m-0'> {p.name} </p>
                    <h3>&#8377;{p.price}</h3>
                </span>
                <span style={{ flexDirection: 'column', display: 'flex', justifyContent: 'space-around' }}>
                    <button className='btn btn-sm btn-outline-danger' onClick={(e) => removeLike(e, p)}>
                        Remove
                    </button>
                    <button className='btn btn-sm btn-primary' onClick={(e) => { addtocart(e, p) }}>
                        Add to cart
                    </button>
                </span>
            </div>
            {/* </div> */}
        </>)
    }
    return (
        <Layout>
            {<>
                {
                    wish?.length > 0 ?
                        <div id='cart' className='d-flex wishrow my-3' style={{ minWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* <div className='d-flex align-items-start justify-content-center p-2' style={{ minHeight: '30vh', flexDirection: 'column', minWidth: '45%' }}> */}
                            {wish?.map((item) =>
                                <Item
                                    p={item}
                                />
                            )}
                            {/* </div> */}
                        </div>
                        :
                        <div style={{ height: '80vh', flexDirection: 'column' }} className='d-flex justify-content-center align-items-center'>
                            <h4> Nothing in your wishList</h4>
                            <img style={{ width: '40vh' }} src={noWish} />
                            <button onClick={foo} className='btn btn-outline-secondary'>
                                Return to Home
                            </button>
                        </div>
                }
            </>
            }
        </Layout>
    )
}

export default Wishlist