import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
    return (
        <>
            <Header />
            <div style={{ width: '100%', height: '10vh' }}></div>
            <div className='m-0' style={{ minHeight: "80vh" }}>
                {props.children}
            </div>
            <Footer />
        </>
    )
}

export default Layout