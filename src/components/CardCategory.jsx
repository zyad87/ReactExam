import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardCategory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/category/men's clothing");
      setProducts(response.data); 
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      {products.slice(0, 1).map((product) => (
        <div key={product.id} className="w-64 bg-white shadow-md m-4 flex flex-col items-center rounded-lg overflow-hidden">
          <img className="w-full h-64 object-cover" src={product.image} alt={product.title} />
          <div className="p-4">
            <h3 className="font-bold text-lg text-center">{product.title}</h3>
            <p className="text-center text-gray-700 mt-2">{product.price} SAR</p>
            <p className="text-blue-500 hover:text-blue-700 mt-4 text-center cursor-pointer">See more</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardCategory;
