import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import { saveShippingAddress, saveUser } from '../slices/cartSlice';
import { Row, Col } from 'react-bootstrap';

const ShippingScreen = () => {

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [userId, setUserId] = useState();


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  if (!userInfo) {
    navigate('/login');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setUserId(userInfo._id);
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(saveUser({ userInfo }));
    navigate('/payment');
    toast.success('Shipping Address Saved');
  };

  return (
    <div style={{ paddingTop: '40px' }}>
      <Row>
        <Col md={2}>
          <CheckoutSteps step1 step2 />
        </Col>
        <Col md={10}>
          <FormContainer >
            <h1>Shipping</h1>
            <Form
              onSubmit={submitHandler}
            >
              <Form.Group className='my-2' controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter city'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
              </Form.Group>

              <Form.Group className='my-2' controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter postal code'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-2' controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter country'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Continue
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </div>
  )
}

export default ShippingScreen
