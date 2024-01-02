import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout';
import StripeCheckout from 'react-stripe-checkout';
import { useCart } from '../context/cart';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Spinner3 from '../Components/Spinner3';


const Checkout = () => {
    const [cart, setCart] = useCart();
    const [message, setMessage] = useState("");
    const [total, setTotal] = useState();
    const [auth, setAuth] = useAuth();
    const [fname, setFname] = useState(auth?.user?.name);
    const [lname, setLname] = useState(auth?.user?.lname);
    const [email, setEmail] = useState(auth?.user?.email);
    const [address, setAddress] = useState(auth?.user?.address);
    const [paymentoption, setPaymentoption] = useState("pod");
    const [phone, setPhone] = useState(auth?.user?.phone);
    const [visible, setVisible] = useState(false);
    const [isDone, setIsDone] = useState(false)

    const navigate = useNavigate()

    const calculateBill = () => {
        var x = 0;
        cart?.forEach(element => {
            // alert(element.item.price)
            console.log(element.item.price * element.qty)
            x = x + element.item.price * element.qty
        });
        console.log(x)
        setTotal(x)
    }
    useEffect(() => {

        calculateBill()

    }, [])

    const payNow = async token => {
        try {
            const response = await axios({
                url: `${process.env.REACT_APP_API}create-checkout-session`,
                method: 'post',
                data: {
                    amount: 100,
                    token,
                },
            });
            toast.success('response recieved')

            if (response.data.success) {
                toast.success('Payment Successfull');
                setVisible(true)
            } else {
                toast.error('Something went Wrong')

            }
            toast.success(message)
        } catch (error) {
            // handleFailure();
            console.log(error);
            toast.error('something went wrong Please select Pay on Delivery')
        }
    };
    // Example starter JavaScript for disabling form submissions if there are invalid fields


    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsDone(true)
        // setVisible(false)
        const userDetail = {
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            address: address
        }
        let cartitems = []
        cart.map((i) => {
            let s = {
                pid: i.item._id,
                qty: i.qty
            }
            cartitems.push(s)
        })

        const response = await axios.post(`${process.env.REACT_APP_API}api/v1/order/place-order/${auth.user._id}`, { userDetail, cartitems, paymentoption, price: auth?.bill?.subTotal })

        if (response.status == 200) {
            setCart([])
            navigate('/order-success')
        } else {
            toast.error('Something went wrong. Pease Try again later')
            navigate('/cart')
        }
    }

    const Bill = () => {
        return (
            <>

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
                <li className="list-group-item d-flex justify-content-between bg-light">
                    <div>
                        <h6 className="my-0">Shipping Charge</h6>
                        <small></small>
                    </div>
                    <span className="text-success">&#8377;{auth?.bill?.shipping}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                        <h6 className="my-0">Discount</h6>
                        <small>#WELCOME</small>
                    </div>
                    <span className="text-success">- &#8377;{auth?.bill?.discount}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (INR)</span>
                    <strong>&#8377;{auth?.bill?.subTotal}</strong>
                </li>


            </>
        )
    }

    return (
        isDone ? <Spinner3 /> :
            <Layout>
                <div className="container container2 my-4">
                    <div className="row">
                        {/* <pre> {JSON.stringify(cart)}</pre> */}
                        <div style={{ zIndex: '-2' }} className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="">Your cart</span>
                                <span className="badge badge-secondary badge-pill">3</span>
                            </h4>
                            <ul className="pt-2 pt-md-5 list-group mb-3 sticky-top " style={{ top: " 20px" }}>
                                <Bill />
                            </ul>

                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Shipping address</h4>
                            <form className="needs-validation" onSubmit={(e) => {
                                e.preventDefault();
                                if (phone?.length < 10) {
                                    toast("Enter correct Phone number");
                                    return;
                                }
                                if (paymentoption != 1) { setVisible(true); }
                            }}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder={'First Name'} value={fname} onChange={e => setFname(e.target.value)} required />
                                        <div className="invalid-feedback"> Valid first name is required. </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name <span className="text-muted">(Optional)</span></label>
                                        <input type="text" className="form-control" id="lastName" value={lname} onChange={e => setLname(e.target.value)} placeholder={'Last Name'} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Phone Number">Phone Number</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" value={email} id="email" onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="1234 Main St" required />
                                </div>


                                <hr className="mb-4" />
                                <h4 className="mb-3">Payment</h4>
                                <div className="d-block my-3">
                                    <div className="custom-control custom-radio">
                                        <input id="pod" name="paymentMethod" type="radio" onChange={e => setPaymentoption("pod")} className="form-check-input mx-2" style={{ border: '1px solid gray' }} defaultChecked required />
                                        <label className="custom-control-label" htmlFor="pod"> Pay on Delivery </label>
                                    </div>
                                    {/* <div className="custom-control mt-2 custom-radio">
                                        <input id="card" name="paymentMethod" type="radio" onChange={e => setPaymentoption("card")} className="form-check-input mx-2" style={{ border: '1px solid gray' }} required />
                                        <label className="custom-control-label  me-5" htmlFor="card" >Card</label>

                                        {
                                            paymentoption == "card" ?
                                                <StripeCheckout
                                                    stripeKey="pk_test_51OKLiBSG8XzUFjmQhff4VauoIjbjRvdManG8aiLfWePdEpTjw8ijp879hYaq3xEZ33dJAFCh6E5pUYHQXZQF599r00zeLL6NCU"
                                                    label="Make Payment"
                                                    name="Pay With Credit Card"
                                                    amount={auth?.items?.subTotal * 100}
                                                    description={`Your total is Rs ${auth?.items?.subTotal}`}
                                                    currency='inr'
                                                    token={payNow}
                                                /> : ''
                                        }
                                    </div> */}
                                </div>

                                <hr className="mb-4" />

                                <button className="btn btn-primary btn-block" type="submit">Submit</button>
                            </form>
                        </div>
                        <Modal styles={{ height: 'fit-content' }} onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <div>
                                <h3>
                                    Shipping Details
                                </h3>
                                <big>Name: {fname} {lname}</big>
                                <p className='m-0'>Email: {email}</p>
                                <p className='m-0'>Phone Number: {phone}</p>
                                <p className='m-0'>{address}</p>
                            </div>
                            <h5 className='mt-4'>
                                Products:
                            </h5>
                            <ul className="list-group mb-3 sticky-top " style={{ top: " 20px" }}>
                                <Bill />
                            </ul>
                            <span style={{ width: '100%', display: 'flex' }}>
                                <button className='btn btn-primary' style={{ margin: 'auto', width: '80%' }} onClick={handleSubmit}>Place Order</button>
                            </span>
                        </Modal>
                    </div>
                </div>

            </Layout>
    )
}


export default Checkout