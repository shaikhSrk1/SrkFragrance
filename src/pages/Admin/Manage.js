import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios';
import './manage.css';
import Spinner2 from '../../Components/Spinner2';

const Manage = () => {
    const [users, setUsers] = useState();
    const [msgs, setMsgs] = useState();
    const [subs, setSubs] = useState();
    const [loading, setLoading] = useState(true)

    const getUsers = async () => {
        try {
            const x = await axios.get(`${process.env.REACT_APP_API}api/v1/manage/get-users`);
            if (x.data.users) {
                setUsers(x.data.users)
            }
        } catch (e) {
            console.log('error in users');
            return
        }
    }

    const getMsgs = async () => {
        try {
            const x = await axios.get(`${process.env.REACT_APP_API}api/v1/manage/get-msgs`);
            console.log(x)
            if (x.data.msgs) {
                setMsgs(x.data.msgs)
            }
        } catch (e) {
            console.log('error in users');
            return
        }
    }
    const getSubs = async () => {
        try {
            const x = await axios.get(`${process.env.REACT_APP_API}api/v1/manage/get-subs`);
            console.log(x)
            if (x.data.subs) {
                setSubs(x.data.subs);
                setLoading(false)
            }
        } catch (e) {
            console.log('error in users');
            return
        }
    }

    useEffect(() => {
        getUsers();
        getMsgs();
        getSubs();
    }, [])

    return (
        <Layout>
            {
                loading ? (<Spinner2 />) :
                    <>
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
                        <div className='container-fluid mb-5' style={{ width: '100%', margin: 'auto', overflow: 'scroll' }}>
                            <h3 style={{ textAlign: 'center' }}>Messages</h3>
                            <div className='row user-box d-flex'>
                                <span className='col-1 bg-secondary' style={{ color: 'white' }}>
                                    Sr.
                                </span>
                                <span className='col-2 bg-secondary' style={{ color: 'white' }}>
                                    Name
                                </span>
                                <span className='col-3 bg-secondary' style={{ color: 'white' }}>
                                    Email
                                </span>
                                <span className='col-5 bg-secondary' style={{ color: 'white' }}>
                                    Message
                                </span>
                            </div>
                            {
                                msgs?.map((e, i) => <div className='row user-box d-flex'>
                                    <span className='col-1'>
                                        {i + 1}
                                    </span>
                                    <span className='col-2'>
                                        {e.name || 'jj'}
                                    </span>
                                    <span className='col-3 '>
                                        {e.email}
                                    </span>
                                    <span className='col-5'>
                                        {e.msg}
                                    </span>
                                </div>)
                            }
                        </div>
                        <div className='container-fluid mb-5' style={{ width: '100%', margin: 'auto', overflow: 'scroll' }}>
                            <h3 style={{ textAlign: 'center' }}>Subscribers</h3>
                            <div className='row user-box d-flex'>
                                <span className='col-1 bg-secondary' style={{ color: 'white' }}>
                                    Sr.
                                </span>
                                <span className='col-4 bg-secondary' style={{ color: 'white' }}>
                                    Email
                                </span>
                            </div>
                            {subs?.map((e, i) => <div className='row user-box d-flex'>
                                <span className='col-1'>
                                    {i + 1}
                                </span>
                                <span className='col-4 '>
                                    {e.email}
                                </span>
                            </div>)}

                        </div>

                    </>
            }
        </Layout>
    )
}

export default Manage