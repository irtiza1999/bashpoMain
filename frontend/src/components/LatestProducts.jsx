import React, { useEffect, useState } from 'react';
import { useGetAllProductQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const LatestProducts = () => {
    const { data, isLoading, refetch, error } = useGetAllProductQuery();
    const navigate = useNavigate();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const displayedProducts = Array.isArray(data) ? data.slice(0, 10) : [];

    return (
        <div>
            <div className="text-center">
                <h5 className="mb-2.5">LATEST PRODUCTS</h5>
            </div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <h3>{<Loader />}</h3>
            ) : (
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {displayedProducts.map((product) => (
                            <div key={product._id} className="mb-4">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    {data.length > 10 && ( // Display "See All" link if there are more than 10 products
                        <div className="text-center mt-4">
                            <button
                                onClick={() => navigate('/allProducts')}
                                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                See All
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LatestProducts;
