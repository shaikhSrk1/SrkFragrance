import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner3 = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => --prev);
        }, 1000)
        if (count === 0) {

            return () => clearInterval(interval);
        }
    }, [count, navigate]);

    return (
        <>
            <div style={{ height: "100vh", flexDirection: 'column' }} class="d-flex justify-content-center align-items-center">
                <h1>Processing your Order ...</h1>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner3