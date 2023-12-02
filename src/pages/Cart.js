import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import noCart from '../photos/emptyCart.avif'
import { useNavigate } from 'react-router-dom';
import pic from '../photos/about.jpg'
import axios from 'axios';
import Spinner2 from '../Components/Spinner2.js';

const Cart = () => {
    const [totalItem, setTotalItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState()

    const navigate = useNavigate();

    const getCartproducts = async () => {
        try {
            const item = await axios.get(`${process.env.REACT_APP_API}api/v1/cart/get-items`);
            // prod = await prod.json();
            console.log(item.data.items)
            if (item) {
                setItems(item.data.items);
                setLoading(true)
                setTotalItem(item.data.items.length)
                console.log(totalItem)
            }
        } catch (e) {
            console.log('error in fetching cart products', e);
            return
        }
    }

    useEffect(() => {
        getCartproducts();
    }, [totalItem])

    const foo = () => {
        navigate('/');
    }

    const Item = ({ name, price, qty }) => {
        return (<>
            <div style={{ height: '120px', width: '95%', borderRadius: '10px' }} className='d-flex p-2 my-2 box'>
                <div className='d-flex justify-content-between' style={{ width: '100%', flexDirection: 'column' }}>
                    <p className='m-0'> {name} </p>
                    <div className='d-flex justify-content-center'>
                        <span className='mx-2'>$ {price}</span>
                        <span className='mx-2'>Qty : {qty}</span>
                    </div>
                    <span>
                        <button className='btn' style={{ borderTop: '1px solid gray ', borderRight: '1px solid gray ', borderRadius: '0px', width: '40%' }}>
                            Remove
                        </button>
                        <button className='btn' style={{ borderTop: '1px solid gray ', borderRadius: '0px', width: '40%' }}>
                            Move to wish list
                        </button>
                    </span>
                </div>
                <img src={pic} style={{ height: '100%', width: '130px' }} />
            </div>
        </>)
    }

    return (
        <Layout>


            {

                loading ? <>
                    {
                        totalItem > 0 ?
                            <div id='cart' className='d-flex'>
                                <div className='d-flex align-items-start justify-content-center p-2 m-4' style={{ minHeight: '30vh', flexDirection: 'column', minWidth: '50%' }}>
                                    {items.map((item) =>
                                        <Item
                                            name={item.product}
                                            price={item.price}
                                            qty={item.quantity}
                                        />
                                    )}
                                </div>
                                <div className='box m-4'>
                                    Bill
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