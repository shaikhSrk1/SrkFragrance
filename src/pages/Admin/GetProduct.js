import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner2 from '../../Components/Spinner2';


const GetProduct = ({ qty, pid }) => {
    const [u, setU] = useState([])
    const [loading, setLoading] = useState(true);

    const getu = async () => {
        try {
            const x = await axios.get(`${process.env.REACT_APP_API}api/v1/product/singleproduct/${pid}`)
            setU(x.data.product)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getu();
    }, [])

    return (
        <>
            <div className='d-flex' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <p className='m-1'>
                    Qty : {qty == 1 ? '1 ' : qty}
                </p>
                <p className='m-0 me-1'>
                    {u?.name}
                </p>
                <p className='m-1' style={{ fontSize: '20px' }}>
                    <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${pid}`} className='m-1' style={{ width: '40px', height: '40px' }} />
                    &#8377;{u?.price}
                </p>
            </div>
        </>
    )
}

export default GetProduct