import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import noWish from '../photos/empty-wishlist.png'
import Spinner2 from '../Components/Spinner2.js';
import { useAuth } from '../context/auth.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useAuth()
    const [totalItem, setTotalItem] = useState(0)
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState()

    const foo = () => {
        navigate('/')
    }

    const getItems = async () => {
        if (auth.user == null) {
            setTotalItem(0);
            setLoading(true)
            return;
        }
        try {
            const item = await axios.get(`${process.env.REACT_APP_API}api/v1/wish/get-items/${auth.user._id}`);
            // prod = await prod.json();
            console.log(item.data.items)
            if (item) {
                setItems(item.data.items);
                setLoading(true)
                setTotalItem(item.data.items.length)
                console.log(totalItem)
            }
        } catch (e) {
            console.log('error in fetching cart products');
            return
        }
    }


    useEffect(() => {
        getItems();
    }, [])

    const addtocart = async (e, id, name) => {
        e.preventDefault();
        if (auth.user) {
            try {
                console.log(auth.user._id)
                const prod = await axios.post(`${process.env.REACT_APP_API}api/v1/cart/add-item-cart`, { product: id, user: auth.user._id, quantity: 1 });
                // prod = await prod.json();
                if (prod) {
                    toast.success(`${name} Added to cart`);
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

    const removefroWish = async (e, name, id) => {
        e.preventDefault();
        try {
            const prod = await axios.delete(`${process.env.REACT_APP_API}api/v1/wish/delete-item-wish/${id}/${auth.user._id}`);
            // prod = await prod.json();
            if (prod) {
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
                getItems();
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const Item = ({ name, price, id }) => {
        return (<>
            <div style={{ height: '120px', borderRadius: '10px' }} className='d-flex wishrow justify-content-between p-2 m-2 box'>
                {/* <div className='d-flex justify-content-between ' style={{ width: '100%' }}> */}
                <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`} alt='Product' style={{ height: '100%', width: '130px' }} />
                <span className='d-flex justify-content-center ' style={{ flexDirection: 'column' }}>
                    <p className='m-0'> {name} </p>
                    <h3>&#8377;{price}</h3>
                </span>
                <span style={{ flexDirection: 'column', display: 'flex', justifyContent: 'space-around' }}>
                    <button className='btn btn-sm btn-outline-danger' onClick={(e) => removefroWish(e, name, id)}>
                        Remove
                    </button>
                    <button className='btn btn-sm btn-primary' onClick={(e) => { addtocart(e, id, name) }}>
                        Add to cart
                    </button>
                </span>
            </div>
            {/* </div> */}
        </>)
    }
    return (
        <Layout>
            {
                loading ? <>
                    {
                        totalItem > 0 ?
                            <div id='cart' className='d-flex wishrow my-3' style={{ minWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* <div className='d-flex align-items-start justify-content-center p-2' style={{ minHeight: '30vh', flexDirection: 'column', minWidth: '45%' }}> */}
                                {items?.map((item) =>
                                    <Item
                                        name={item.name}
                                        price={item.price}
                                        id={item.product}
                                        wid={item._id}
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
                    :
                    <Spinner2 />
            }
        </Layout>
    )
}

export default Wishlist