import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import myimg from '../../photos/about.jpg'
import '../Home.css';
import { MdShoppingCart } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { Button, Modal } from 'antd';
import { FaFileUpload } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner2 from '../../Components/Spinner2';

const Products = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [feature, setFeature] = useState('');
    const [id, setId] = useState('');
    const [photo, setPhoto] = useState();
    const [description, setDescription] = React.useState("");
    const [loading, setLoading] = useState(true)


    const getAllProducts = async () => {
        try {
            const prod = await axios.get(`${process.env.REACT_APP_API}api/v1/product/get-products`);
            // prod = await prod.json();
            if (prod) {
                console.log(prod.data.products);
                setProducts(prod.data.products);
                setLoading(false)
            }
        } catch (e) {
            console.log('error in fetching products', e);
            return
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [name])

    const handleclick = async (name, feature, price, id, description) => {
        // let prod = await axios.get(`${process.env.REACT_APP_API}api/v1/product/singleproduct/${i}`);
        // prod = prod.data.product
        setVisible(true);
        setName(name)
        setFeature(feature)
        setPrice(price)
        setId(id)
        setDescription(description)
        setPhoto(`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`)
        // console.log(prod.name)
    }

    const updateproduct = async (e) => {
        e.preventDefault()
        console.log(photo)
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('price', price);
            productData.append('features', feature);
            productData.append('description', description);
            // photo && productData.append('photo', photo);

            // if (!photo) {
            // const pic = await axios.get(`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`)
            // setPhoto(pic);
            // // }
            // productData.append('photo', photo)

            const resp = await axios.put(`${process.env.REACT_APP_API}api/v1/product/update-product/${id}`, productData)
            if (resp) {
                toast.success('Product updated')
                setPhoto('')
                setName('')
                setFeature('')
                setPrice('')
                setDescription('')
                setVisible(false)
            }
        } catch (e) {
            console.log("Error in updating product")
        }
    }

    const deleteproduct = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}api/v1/product/delete-product/${id}`);
            // prod = await prod.json();
            if (res) {
                toast.success('Product Deleted');
                navigate('/dashboard/products')
            }
        } catch (e) {
            // console.log('error in deleeting prod', e);
            return
        }
    }

    const Card = ({ Name, image, feature, price, id, description }) => (
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
            <div className="card myCard m-0 my-5" onClick={() => { handleclick(Name, feature, price, id, description) }} >
                <img style={{ objectFit: 'cover' }} src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`} alt={Name} />
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <h4>{Name} </h4>
                    </div>
                    <p>{feature}</p>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h2 style={{ color: '#383838' }}>$ {price}</h2>
                        <button onClick={() => { setVisible(true) }} className="btn btn-secondary mx-1">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Layout>
            <div class="container">
                <div class="row">
                    {
                        loading ? (<Spinner2 />) :
                            products ?
                                products?.map((item, i) =>
                                    < Card
                                        Name={item.name}
                                        image={item.photo}
                                        feature={item.features}
                                        price={item.price}
                                        id={item._id}
                                        description={item.description ? item.description : ''}
                                    // onClick={() => { handleclick(item._id) }}
                                    // clickHandler={() => handleclick(item._id)}
                                    />
                                )
                                :
                                'No products in your shop. start Adding'
                    }
                </div>
            </div>
            <Modal width={1000} onCancel={() => setVisible(false)} footer={null} open={visible} >
                <div className='container box-2' style={{ width: '100%' }}>

                    <div className='container box p-0'>
                        <label style={{ width: '100%', height: '100%' }} className='d-flex align-items-center justify-content-center btn btn-outline-secondary'>
                            <img src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`} style={{ width: '100%' }} />
                        </label>
                    </div>
                    <div className='container'>
                        <h1 className='mx-3'>Update Product</h1>
                        <form>
                            <div className="row m-4">
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control m-2" placeholder='Name' required />
                                <input type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} className="form-control m-2" placeholder='Enter Price' required />
                                <input type="text" value={feature} onChange={(e) => { setFeature(e.target.value) }} className="form-control m-2" placeholder='Enter features' required />
                                <textarea rows={4} value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control m-2" placeholder='Write Description' ></textarea>

                            </div>
                            <button type="submit" className="btn px-3 btn-outline-danger mx-3 btn-block mb-4" onClick={() => deleteproduct(id)}>Delete Product</button>
                            <button type="submit" className="btn px-3 btn-primary btn-block mb-4" onClick={(e) => updateproduct(e)}>Update</button>
                        </form>
                        <div className="text-center">
                        </div>
                    </div>
                </div>
            </Modal>
        </Layout>
    )
}

export default Products