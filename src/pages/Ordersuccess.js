import React from 'react'
import { Link } from 'react-router-dom';
import success from '../photos/done.png'

const Ordersuccess = () => {
    return (
        <>
            <div className="pnf">
                <img style={{ width: '150px' }} className='m-2' src={success} />
                <h2 className="pnf-heading">Orders Successfull</h2>
                <p>Thankyou so much for your order</p>
                <Link to="/myorders">
                    <button className="btn btn-outline-dark m-4">
                        check status
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Ordersuccess