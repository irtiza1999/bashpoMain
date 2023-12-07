import { Container, Card, Button } from 'react-bootstrap';
import ProductCarousel from './ProductCarousel';

const Hero = () => {
  return (
    <div className=' py-5'>
      <div className='d-flex justify-content-center'>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Hero;