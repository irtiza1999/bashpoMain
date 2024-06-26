import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, FormCheck } from "react-bootstrap"; // Import FormCheck
import Formcontainer from "../components/Formcontainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useGoogleLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from "../slices/authSlice";
import { setOtpVerified, clearOtpVerified } from "../slices/otpSlice";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Grid from '@mui/material/Grid';
import Image from 'react-bootstrap/Image';
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from 'reactjs-social-login';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgeVerified, setIsAgeVerified] = useState(false); // Add state for age verification checkbox

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin, { googleLoginIsLoading }] = useGoogleLoginMutation();

  const { userInfo } = useSelector(state => state.auth);
  const { otpInfo } = useSelector(state => state.otpInfo);

  useEffect(() => {
    if (otpInfo && !userInfo) {
      dispatch(setCredentials({ ...otpInfo }));
      dispatch(setOtpVerified(null));
      navigate(location.state?.from || '/');
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, []);

  const navigateToPort3001 = () => {
    window.location.href = 'https://thlab.techavens.com/';
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isAgeVerified) {
      toast.error('Please acknowledge that you are 18 years or older.');
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(location.state?.from || '/');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          src='https://cdn-icons-png.flaticon.com/512/2250/2250207.png'
          alt='login image'
          fluid
          rounded
          style={{ height: '200px', width: '200px' }}
        />
      </Grid>
      <Grid item xs={9}>
        <Formcontainer>
          <h1 style={{ paddingTop: '100px' }}>Login</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='ageVerification'>
              <FormCheck
                type="checkbox"
                label="I am 18 years or older"
                checked={isAgeVerified}
                onChange={(e) => setIsAgeVerified(e.target.checked)}
              />
            </Form.Group>

            {isLoading && <Loader />}
            <Button type='submit' variant='primary' className='mt-3' disabled={!isAgeVerified}>Login</Button>
            <Row className='py-3'>
              <Col>
                New Customer? <Link to='/register'>Register</Link>
              </Col>
            </Row>
          </Form>
        </Formcontainer>
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
