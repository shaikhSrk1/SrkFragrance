import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { Link } from 'react-router-dom';
import { FaFileUpload } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';

const Addproducts = () => {

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [features, setFeatures] = React.useState("");
    const [photo, setPhoto] = React.useState();
    const [description, setDescription] = React.useState("");

    const addproduct = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('price', price);
            productData.append('features', features);
            productData.append('photo', photo);
            productData.append('description', description);

            const resp = await axios.post(`${process.env.REACT_APP_API}api/v1/product/addproduct`, productData)
            if (resp) {
                toast.success('Product Added')
                setPhoto('')
                setName('')
                setFeatures('')
                setPrice('')
                setDescription('')
            }
        } catch (e) {
            console("Error in adding product")
        }
    }
    return (
        <Layout>
            <div className='form-container p-5'>
                <div className='container box-2'>
                    <div className='container box p-0'>
                        <label style={{ width: '100%', height: '100%' }} className='d-flex align-items-center justify-content-center btn btn-outline-secondary'>
                            {photo ? <img src={URL.createObjectURL(photo)} style={{ width: '100%' }} /> : <FaFileUpload style={{ fontSize: '50px' }} />}
                            <input type='file' name='photo' hidden accept='image/*' onChange={(e) => { setPhoto(e.target.files[0]) }} />
                        </label>
                    </div>
                    <div className='container'>
                        <h1 className='mx-3'>Add Product</h1>
                        <form>
                            <div className="row m-4">
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control m-2" placeholder='Name' required />
                                <input type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} className="form-control m-2" placeholder='Enter Price' required />
                                <input type="text" value={features} onChange={(e) => { setFeatures(e.target.value) }} className="form-control m-2" placeholder='Enter features' required />
                                <textarea rows={4} value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control m-2" placeholder='Write Description' ></textarea>
                            </div>
                            <button type="submit" className="btn px-3 btn-primary btn-block mb-4" onClick={addproduct}>Add Product</button>
                        </form>
                        <div className="text-center">
                        </div>
                    </div>
                </div>
            </div >
        </Layout>
    )
}

export default Addproducts