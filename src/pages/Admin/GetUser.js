import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner2 from '../../Components/Spinner2';

const GetUser = ({ b }) => {
    const [u, setU] = useState()
    const [loading, setLoading] = useState(true);

    const getu = async () => {
        const x = await axios.get(`${process.env.REACT_APP_API}api/v1/manage/get-user/${b}`);
        setU(x.data.user);
        setLoading(false)
    }
    useEffect(() => {
        getu()
    }, [])

    return (
        <>
            {
                loading ? <Spinner2 />
                    :
                    <div>
                        <p className='m-0'>{u?.fname || ''}  {u?.lname || ''}</p>
                        <p className='m-0'>{u?.phone || ''}</p>
                        <p className='m-0'>{u?.email || ''}</p>
                        <p className='m-0'>{u?.address || ''}</p>
                    </div>
            }
        </>
    )
}

export default GetUser