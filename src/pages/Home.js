import React, { useRef } from 'react'
import Layout from '../Components/Layout/Layout.js'
// import Card from 'antd/es/card/Card.js';
import { Card } from '../Components/Card.js';
import './Home.css';
import { CiHeart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner2 from '../Components/Spinner2.js';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState("")

    const navigate = useNavigate();

    const search = async (k) => {
        try {
            setLoading(true)
            if (k === "") {
                getAllProducts();
                return;
            }
            else {
                console.log(k)
                const prod = await axios.get(`${process.env.REACT_APP_API}api/v1/product/search/${k}`);
                // prod = await prod.json();
                if (prod) {
                    setProducts(prod.data.products);
                    setLoading(false)
                }
            }
        } catch (e) {
            console.log('error in fetching products', e);
            return
        }
    }

    const getAllProducts = async () => {
        try {
            const prod = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-products`);
            // prod = await prod.json();
            if (prod) {
                console.log(prod.data.products)
                setProducts(prod.data.products);
                setLoading(false)
            }
        } catch (e) {
            console.log('error in fetching products', e);
            return
        }
    }

    const handleScroll = () => {
        const section = document.querySelector('#toShow');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    useEffect(() => {
        if (key != "") {
            search()
        } else {
            getAllProducts();
        }
    }, [])


    return (
        <Layout>

            <div style={{ position: 'relative', height: '50vh', width: '100%' }} className='fluid-container no-phone' id='wall'>
                <div style={{ backgroundColor: '', zIndex: '' }} className='batul p-2 ' >
                    <h1>Srk Fragrance</h1>
                    <p>Welcome to Srk Fragrance ! Our passion for scents and dedication to quality make us your ideal choice for all things perfume </p>
                    <button className='btn btn-secondary' onClick={() => { handleScroll() }}> Start Shopping</button>
                </div>
            </div>
            <div className='container' style={{}} id='show'>
                <div className="bg-dark bg-body ">
                    <div className="container-fluid d-flex justify-content-around">
                        <button style={{ width: 'auto' }} onClick={() => { navigate('/wishlist') }} className="btn btn-outline-danger no-phone wish mx-3 ">
                            <CiHeart /> Wishlist
                        </button>
                        <div className='d-flex justify-content-center' style={{ width: '85%' }}>

                            <input style={{ width: '75%' }} className="form-control me-2" type="search" value={key} onChange={(e) => { setKey(e.target.value); search(e.target.value) }} placeholder="Search for products" aria-label="Search" />
                            <button className="btn btn-outline-secondary" onClick={() => search(key)} style={{ border: '1px solid gray' }} type="submit">
                                <FaSearch style={{ fontSize: '25px' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {
                loading ?
                    (<Spinner2 />)
                    :
                    <>
                        <div className="container my-4 box-3 d-flex" id='toShow' style={{ width: '100%', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                            {products?.length > 0 ? products?.map((item, i) =>
                                item ?
                                    < Card
                                        Product={item}
                                    /> :
                                    '')
                                :
                                <div style={{ height: '30vh' }}>
                                    <p>Product Not Found</p>
                                </div>
                            }
                        </div>
                    </>
            }


        </Layout>
    )
}

export default Home