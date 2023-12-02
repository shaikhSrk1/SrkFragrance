import React from 'react'

const Spinner2 = () => {

    return (
        <>
            <div style={{ height: "35vh" }} class="d-flex justify-content-center align-items-center">
                <h5 className='mx-3' style={{ fontSize: 'large' }}>Loading... </h5>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Spinner2