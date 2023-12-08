import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../context/auth';
import axios from 'axios';
import './myorder.css'
import Spinner2 from '../Components/Spinner2';
import { Modal } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Myorders = () => {

    const [orders, setOrders] = useState();
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(true);
    const [cancel, setCancel] = useState(false);
    const [tocanId, setToCanId] = useState();
    const navigate = useNavigate()

    const getAllOrders = async () => {
        try {

            console.log('feting orders')
            console.log(auth.user?._id)
            const order = await axios.get(`${process.env.REACT_APP_API}api/v1/order/get-orders/${auth.user._id}`);
            // prod = await prod.json();
            console.log(order.data.orders)
            if (order) {
                // setProducts(prod.data.products);
                setOrders(order.data.orders)
                setLoading(false)
            }
        } catch (e) {
            console.log('error in fetching products', e);
            return
        }
    }

    const cancelOrder = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}api/v1/order/delete/${tocanId}`);
            if (res.data) {
                setLoading(false)
                toast.success('Your Order was Cancelled');
                getAllOrders()
            } else {
                toast.error('unable to cancel order')
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <Layout>

            {loading ?
                (<Spinner2 />)
                :
                <>
                    {
                        orders.length > 0 ?

                            <div className="container-fluid my-4 d-flex" style={{ width: '100%', flexWrap: 'wrap', alignItems: 'start', justifyContent: 'start' }}>
                                {
                                    orders?.map(i =>
                                        <>
                                            <div className="col-md-10 col-lg-8 col-xl-6 m-2" style={{ maxWidth: '363px' }}>
                                                <div className={`card card-stepper ${i.status == 'Cancelled' ? "bg-secondary" : ''} `} style={{ borderRadius: 16 }}>
                                                    {
                                                        i.status == 'Cancelled' ?
                                                            <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                                                                <h1 className='mb-5' style={{ color: 'white' }}>Order Cancelled</h1>
                                                            </div> :
                                                            ''
                                                    }
                                                    <div className="card-header p-4">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p className="text-muted mb-2"> Order ID <span className="fw-bold text-body">{i._id.slice(17, 25)}</span></p>
                                                                <p className="text-muted mb-0"> Place On <span className="fw-bold text-body">{i.createdAt.slice(0, 10)}</span> </p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="card-body p-4">
                                                        <div className="d-flex flex-row pb-2">
                                                            <h3 className="mb-1"> &#8377;{Math.ceil(i.payment.price)} <span className="small text-muted"> via {i.payment.paymentoption == "card" ? 'CARD(PAID)' : "(Pay on Delivery)"} </span></h3>
                                                        </div>
                                                        <div className='d-flex flex-fill mb-3' style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                            {
                                                                i.cart?.map(p =>
                                                                    <span className='d-flex m-1' style={{ flexDirection: 'column' }}>
                                                                        <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${p.pid}`} style={{ width: '50px', height: '50px' }} />
                                                                        Qty: {p.qty}
                                                                    </span>)
                                                            }

                                                        </div>

                                                        <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
                                                            {
                                                                i.status == "Processed" ?
                                                                    <>
                                                                        <li className="step0 active" id="step1" style={{ border: 'none' }}><span style={{ marginLeft: 22, marginTop: 12 }}>PLACED</span></li>
                                                                        <li className="step0  text-center" id="step2"><span>SHIPPED</span></li>
                                                                        <li className="step0 text-muted text-end" id="step3"><span style={{ marginRight: 22 }}>DELIVERED</span></li>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {
                                                                            i.status == "Shipped" ?
                                                                                <>

                                                                                    <li className="step0 active" id="step1" style={{ border: 'none' }}><span style={{ marginLeft: 22, marginTop: 12 }}>PLACED</span></li>
                                                                                    <li className="step0 active text-center" id="step2"><span>SHIPPED</span></li>
                                                                                    <li className="step0 text-muted  text-end" id="step3"><span style={{ marginRight: 22 }}>DELIVERED</span></li>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <li className="step0 active" id="step1" style={{ border: 'none' }}><span style={{ marginLeft: 22, marginTop: 12 }}>PLACED</span></li>
                                                                                    <li className="step0 active text-center" id="step2"><span>SHIPPED</span></li>
                                                                                    <li className="step0 text-muted active  text-end" id="step3"><span style={{ marginRight: 22 }}>DELIVERED</span></li>
                                                                                </>
                                                                        }
                                                                    </>

                                                            }
                                                        </ul>
                                                    </div>
                                                    <div className="card-footer p-4">
                                                        <button className='btn btn-outline-secondary' onClick={() => { setCancel(true); setToCanId(i._id) }} style={{ width: '100%' }}>Cancel Order</button>
                                                    </div>
                                                </div>
                                            </div >
                                        </>
                                    )
                                }
                            </div>
                            :
                            <div style={{ height: '80vh', flexDirection: 'column' }} className='d-flex justify-content-center align-items-center'>
                                <h4> No Orders Yet ! </h4>
                                <button onClick={() => navigate('/')} className='btn btn-outline-secondary'>
                                    Start Shopping
                                </button>
                            </div>
                    }
                </>
            }
            <Modal styles={{ height: 'fit-content' }} onCancel={() => setCancel(false)} footer={null} open={cancel} >
                <div className='d-flex ' style={{ flexDirection: 'column' }}>
                    <p style={{ fontSize: '20px' }}> Are you sure you want to Cancel this Order ?</p>

                    <span style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button onClick={() => { setCancel(false) }} className='btn btn-secondary'>
                            Go Back
                        </button>
                        <button onClick={(e) => { cancelOrder(e); setCancel(false) }} className='btn btn-outline-danger'>
                            Cancel Order
                        </button>
                    </span>
                </div>
            </Modal>
        </Layout >
    )
}

export default Myorders