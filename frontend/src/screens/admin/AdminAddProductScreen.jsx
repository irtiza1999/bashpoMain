import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Formcontainer from "../../components/Formcontainer";
import { toast } from 'react-toastify'
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Grid from '@mui/material/Grid';
import AdminPanelScreen from './AdminPanelScreen.jsx';
import { useCreateProductMutation } from '../../slices/productsApiSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AdminAddProductScreen = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [flavor, setFlavor] = useState('');
    const [nicotineStrength, setnicotineStrength] = useState('');
    const [deviceType, setdeviceType] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState('');

    const handleClose = () => {
        setShow(false);
        setProductId('');
        setName('');
        setBrand('');
        setDescription('');
        setCategory('');
        setFlavor('');
        setnicotineStrength('');
        setdeviceType('');
        setPrice('');
        setCountInStock('');
        setImage('');
    };

    const navigate = useNavigate();

    const [createProduct, { isLoading: isLoadingCreate, error: errorCreate }] = useCreateProductMutation();

    // const fileToString = (file) => {
    // console.log(file);
    // const { name, lastModified, lastModifiedDate, size, type, webkitRelativePath} = file;
    // const fileObject = {
    //     name,
    //     lastModified,
    //     lastModifiedDate: lastModifiedDate.toString(),
    //     size,
    //     type,
    //     webkitRelativePath,
    // };
    // return JSON.stringify(fileObject);
    // };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('brand', brand);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('flavor', flavor);
            formData.append('nicotineStrength', nicotineStrength);
            formData.append('deviceType', deviceType);
            formData.append('price', price);
            formData.append('countInStock', countInStock);
            formData.append('image', image);
            formData.append('isVerified', true);
            console.log(category);
            const res = await createProduct(formData).unwrap();
            if (res) {
                toast.success('Product added successfully');
                navigate("/admin/productslist");
            }
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
            console.log(err);
            navigate("/admin/productslist");
        }
        navigate("/admin/productslist");
    };

    return (
        <>
            <AdminPanelScreen />
            {/* <Grid container spacing={6}> */}
            {/* <Grid item xs={12} md={12}> */}
            <Formcontainer>
                <h1>Add Product</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter Name' value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='size'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter Brand' value={brand}
                            onChange={(e) => setBrand(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Enter Description' value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter Category' value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='flavor'>
                        <Form.Label>Flavor</Form.Label>
                        <Form.Control type='text' placeholder='Enter Flavor' value={flavor}
                            onChange={(e) => setFlavor(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='nicotineStrength'>
                        <Form.Label>Nicotine Strength</Form.Label>
                        <Form.Control type='text' placeholder='Enter Nicotine Strength' value={nicotineStrength}
                            onChange={(e) => setnicotineStrength(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='medium'>
                        <Form.Label>Device Type</Form.Label>
                        <Form.Control type='text' placeholder='Enter Device Type' value={deviceType}
                            onChange={(e) => setdeviceType(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='text' placeholder='Enter Price' value={price}
                            onChange={(e) => setPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type='text' placeholder='Enter Count In Stock' value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Image"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>

                    <Button type='submit' variant='success' className='mt-3'>Confirm</Button>
                </Form>
            </Formcontainer>
            {/* </Grid> */}
            {/* </Grid> */}
        </>
    )
}

export default AdminAddProductScreen;
