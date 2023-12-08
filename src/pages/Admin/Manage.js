import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import './manage.css';

const Manage = () => {
    const [users, setUsers] = useState();
    const [msgs, setMsgs] = useState();
    const [subs, setSubs] = useState();

    const getUsers = async () => {
        try {
            const x = await axios.get(`${process.env.REACT_APP_API}api/v1/manage/get-users`);
            console.log(x)
            if (x.data.users) {
                setUsers(x.data.users)
            }
        } catch (e) {
            console.log('error in users');
            return
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Layout>
            <div className='container-fluid mb-5' style={{ width: '100%', margin: 'auto', overflow: 'scroll' }}>
                <h3 style={{ textAlign: 'center' }}>Users</h3>
                <div className='row user-box d-flex'>
                    <span className='col-1 bg-secondary' style={{ color: 'white' }}>
                        Sr.
                    </span>
                    <span className='col-2 bg-secondary' style={{ color: 'white' }}>
                        First Name
                    </span>
                    <span className='col-1 bg-secondary' style={{ color: 'white' }}>
                        Last Name
                    </span>
                    <span className='col-3 bg-secondary' style={{ color: 'white' }}>
                        Email
                    </span>
                    <span className='col-2 bg-secondary' style={{ color: 'white' }}>
                        Phone
                    </span>
                    <span className='col-3 bg-secondary' style={{ color: 'white' }}>
                        Address
                    </span>
                </div>
                {
                    users?.map((u, i) => <div className='row user-box d-flex'>
                        <span className='col-1'>
                            {i + 1}
                        </span>
                        <span className='col-2'>
                            {u.fname || u.name || '-'}
                        </span>
                        <span className='col-1'>
                            {u.lname || '-'}
                        </span>
                        <span className='col-3'>
                            {u.email || ' -'}
                        </span>
                        <span className='col-2'>
                            {u.phone || ' -'}
                        </span>
                        <span className='col-3'>
                            {u.address || '-'}
                        </span>
                    </div>)
                }
            </div>
        </Layout>
    )
}

export default Manage