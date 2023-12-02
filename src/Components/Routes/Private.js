import React from 'react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
// import axios from 'axios'
import axios from 'axios'
import Spinner from '../Spinner'

const Private = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/admin-auth`)
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false)
                }
            } catch (e) {
                setOk(false)
            }
        }
        if (auth?.token) {
            authCheck()
        }
    }, [auth?.token])

    return (
        ok ? <Outlet /> : <Spinner />
    )
}

export default Private