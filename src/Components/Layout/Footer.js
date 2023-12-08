import React, { useState } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Footer = () => {

    const [email, setEmail] = useState();

    const sendmsg = async (e) => {
        e.preventDefault()
        try {
            if (email) {

                const res = await axios.post(`${process.env.REACT_APP_API}api/v1/manage/sub`, { email });
                if (res) {
                    toast.success('Thankyou for Subscribing')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <footer className="footer text-center text-white" style={{ backgroundColor: '#908f89' }}>
                <div className="container p-4">
                    <section>
                        <form >
                            <div className="row d-flex justify-content-center">
                                <div className="col-auto">
                                    <p className="pt-2">
                                        <strong>Subscribe to get Latest Product updates </strong>
                                    </p>
                                </div>
                                <div className="col-md-5 col-12">
                                    <input type="email" id="form5Example2" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder='Your Email' />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" onClick={(e) => sendmsg(e)} className="btn btn-outline-warning mb-3">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>
                        <section className="mb-4">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                                distinctio earum repellat quaerat voluptatibus placeat nam,
                                commodi optio pariatur est quia magnam eum harum corrupti dicta,
                                aliquam sequi voluptate quas.
                            </p>
                        </section>
                        <div className='links'>
                            <Link to='/about' href="#Nav">About </Link> |
                            <Link to='/contact'>Contact Us</Link>|
                            <Link to='/policy'>Privacy Policy </Link>
                        </div>
                    </section>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 Copyright:
                    <a className="text-white" target='_blank' href="https://www.linkedin.com/in/munir-siddiqui-555744264/"> Munir Siddiqui</a>
                </div>
            </footer>


        </>
    )
}

export default Footer