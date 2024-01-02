import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import Spinner2 from '../../Components/Spinner2';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import GetUser from './GetUser';
import toast from 'react-hot-toast';
import GetProduct from './GetProduct';

const Orders = () => {
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(true);


    const getOrders = async () => {
        try {
            const x = await axios.get(`${process.env.REACT_APP_API}api/v1/manage/get-orders`);
            console.log(x)
            if (x.data.orders) {
                setOrders(x.data.orders);
                console.log(x.data.orders);
                setLoading(false)
            }
        } catch (e) {
            console.log('error in getting orders');
            return
        }
    }

    const Foo = async (id, n) => {
        try {
            const x = await axios.get(`${process.env.REACT_APP_API}api/v1/manage/update-order/${id}/${n}`);
            if (x) {
                toast.success("successfull")
            }
        } catch (e) {
            console.log('ERROR');
            return
        }
        getOrders();
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <Layout>

            {
                loading ? (<Spinner2 />) :
                    <div className='my-4'>

                        <div className='tuple mt-4' id='tuple' style={{ display: 'flex', justifyContent: 'center' }}>
                            <span className='tup-1'>Sr. No.</span>
                            <span className='tup-2'>Order Id</span>
                            <span className='tup-2'>Date </span>
                            <span className='tup-3'>User Details</span>
                            <span className='tup-2'>Status</span>
                            <span className='tup-4'>Product details</span>
                        </div>
                        {/* //sr no.
                        //order Id
                        //date
                        //user+address
                        //status
                        //products details */}
                        {
                            orders?.toReversed().map((o, i) =>
                                <div className='tuple' style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span className='tup-1'>{orders.length - i}</span>
                                    <span className='tup-2'>{o._id.slice(17, 25)}</span>
                                    <span className='tup-2'>{o.createdAt.slice(0, 10)} </span>
                                    <span className='tup-3'>{<GetUser b={o.buyer} />}</span>
                                    <span className='tup-2'>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                {
                                                    o.status == "Delivered" ?
                                                        <p className='m-0' style={{ color: 'green' }}>{o.status}</p>
                                                        :
                                                        <>
                                                            {
                                                                o.status == "Cancelled" ?
                                                                    <p className='m-0' style={{ color: 'red' }}>{o.status}</p>
                                                                    :
                                                                    <p className='m-0' style={{ color: 'blue' }}>{o.status}</p>
                                                            }
                                                        </>
                                                }
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { Foo(o._id, 1) }}>Shipped</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { Foo(o._id, 2) }}>Delivered</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { Foo(o._id, 3) }}>Cancelled</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <p style={{ fontSize: '20px' }}> &#8377;{o.payment.price}</p>
                                        <p>{o.payment.paymentoption}</p>
                                    </span>
                                    <span className='tup-4'>
                                        {
                                            o.cart.map((item) => <GetProduct pid={item.pid} qty={item.qty} />)
                                        }
                                    </span>
                                </div>
                            )
                        }
                        {/* <pre>{JSON.stringify(orders[23], null, 4)}</pre> */}
                    </div>
            }
        </Layout>
    )
}

export default Orders