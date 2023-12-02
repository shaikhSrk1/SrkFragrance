import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => --prev);
        }, 1000)
        count === 0 && navigate('/login')
        return () => clearInterval(interval);
    }, [count, navigate]);

    return (
        <>
            <div style={{ height: "100vh", flexDirection: 'column' }} class="d-flex justify-content-center align-items-center">
                <h1>redirecting to you in {count} sec</h1>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner