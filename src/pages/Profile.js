import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../context/auth'

const Profile = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout>
            <pre> {JSON.stringify(auth, null, 4)}</pre>
            <h1>Profile</h1>
            {auth?.user.name}
        </Layout>
    )
}

export default Profile