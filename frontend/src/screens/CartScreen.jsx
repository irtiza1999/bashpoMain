import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Form, Button, Card } from 'react-bootstrap';
import { cartAdd, removeFromCart, clearCart } from '../slices/cartSlice';
import Message from '../components/Message';
import { FaTrash } from 'react-icons/fa';
import './CartScreen.css';
import { useEffect, useState } from 'react';
import { updateCart } from '../components/cartUtil';



const CartScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = useSelector(state => state.auth);


  const addToCartHandler = async (product, qty) => {
    dispatch(cartAdd({ ...product, qty }));
  };


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  const imageBaseUrl = 'http://localhost:5000/uploads/';




  return (
    <div className="items-center">
      <h1 className="mb-8 text-3xl">Shopping Cart</h1>

      <div className="md:flex">
        <div className="md:w-8/12 mb-4 md:mb-0 md:pr-4">
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              <div className="flex items-center mb-4">
                <h6 className="mr-auto">Clear Cart</h6>
                <Button
                  type='button'
                  variant='light'
                  onClick={() => clearCartHandler()}
                >
                  <FaTrash className="text-red-500" />
                </Button>
              </div>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="mb-4 md:mb-0">
                  <Row>
                    <Col md={2} className="mb-2 md:mb-0">
                      <Image src={imageBaseUrl + item.image} alt={item.name} fluid rounded
                        className="w-full md:w-auto h-auto max-h-24 max-h-24"
                      />
                    </Col>
                    <Col md={2} className="mb-2 md:mb-0">
                      <h6 className="text-sm md:text-base">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </h6>
                    </Col>
                    <Col md={2} className="mb-2 md:mb-0">
                      <b className="text-sm md:text-base">${item.price} X </b>
                    </Col>
                    <Col md={2} className="mb-2 md:mb-0">
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) => {
                          const selectedQty = Number(e.target.value);
                          addToCartHandler(item, selectedQty);
                          setQty(selectedQty);
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} className="mb-2 md:mb-0">
                      <h6 className="text-sm md:text-base">=${(item.qty * item.price).toFixed(2)}</h6>
                    </Col>
                    <Col md={2} className="mb-2 md:mb-0">
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="text-red-500" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>

        <div className="md:w-4/12">
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={6}>
                        <h6>{item.name}</h6>
                      </Col>
                      <Col md={6}>
                        <h6>${item.price} x {item.qty}</h6>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default CartScreen;
