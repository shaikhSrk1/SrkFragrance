import React from 'react'

const Spinner2 = () => {

    return (
        <>
            <div style={{ height: "35vh" }} className="d-flex justify-content-center align-items-center">
                <h5 className='mx-3' style={{ fontSize: 'large' }}>Loading... </h5>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

            </div>
        </>
    )
}

export default Spinner2