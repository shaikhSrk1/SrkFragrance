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

    const navigate = useNavigate()

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
        getAllProducts();
    }, [])


    return (
        <Layout>

            <div style={{ position: 'relative', height: '50vh', width: '100%' }} className='fluid-container no-phone' id='wall'>
                <div style={{ backgroundColor: '', zIndex: '' }} className='batul p-2 ' >
                    <h1>Aromas Haven</h1>
                    <p>Welcome to Aroma Haven ! Our passion for scents and dedication to quality make us your ideal choice for all things perfume </p>
                    <button className='btn btn-secondary' onClick={() => { handleScroll() }}> Start Shopping</button>
                </div>
            </div>
            <div className='container' style={{}} id='show'>
                <div className="bg-dark bg-body-tertiary ">
                    <div className="container-fluid d-flex justify-content-around">
                        <button style={{ width: 'auto' }} onClick={() => { navigate('/wishlist') }} className="btn btn-outline-danger no-phone wish mx-3 ">
                            <CiHeart /> Wishlist
                        </button>
                        <div className='d-flex justify-content-center' style={{ width: '85%' }}>

                            <input style={{ width: '75%' }} className="form-control me-2" type="search" placeholder="Search for products" aria-label="Search" />
                            <button className="btn btn-success" type="submit"><FaSearch /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container my-4 box-3 d-flex" id='toShow' style={{ width: '100%', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>

                {
                    loading ?
                        (<Spinner2 />)
                        :
                        <>
                            {products ? products?.map((item, i) =>
                                item ?
                                    < Card
                                        Product={item}
                                    /> :
                                    '')
                                :
                                'No products in your shop. start Adding'}
                        </>
                }

            </div>

        </Layout>
    )
}

export default Home