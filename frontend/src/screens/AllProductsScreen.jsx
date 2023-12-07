import React, { useEffect, useState } from 'react';
import { useGetAllProductQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const AllProductsScreen = () => {
  const { data, isLoading, refetch, error } = useGetAllProductQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    navigate(`/filter/${newFilter}`);
  };


  return (
    <div className="">
      <div className="text-center mt-10">
        <h4 className="mb-2.5" style={{ padding: '10px', paddingTop: '50px' }}>ALL PRODUCTS</h4>
      </div>
      <div className="flex justify-start max-w-[50px]">
        <div className="flex items-center">
          <div className="inline-block relative w-64" style={{ padding: '10px' }}>
            <FormControl style={{ minWidth: '150px' }}>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Filter"
                onChange={handleChange}
                variant="outlined"
                style={{ width: '100%' }}
              >
                <MenuItem value={'stock'}>In Stock</MenuItem>
                <MenuItem value={'pLow'}>Price Low to High</MenuItem>
                <MenuItem value={'pHigh'}>Price High to Low</MenuItem>
                <MenuItem value={'alphaA'}>Name (A-Z)</MenuItem>
                <MenuItem value={'alphaZ'}>Name (Z-A)</MenuItem>
                <MenuItem value={'ratingHigh'}>Rating (Highest)</MenuItem>
                <MenuItem value={'ratingLow'}>Rating (Lowest)</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h3>{<Loader />}</h3>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(data) &&
              data.map((product) => (
                <div key={product._id} className="mb-4">
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsScreen;
