import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar'; 

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/signup');
    } else {
      fetchName();
    }
  }, []);

  const url = 'https://67073bf9a0e04071d2298046.mockapi.io/users';

  const fetchName = async () => {
    try {
      const response = await axios.get(url);
      const userName = response.data[0].name; 
      setName(userName);
    } catch (error) {
      console.error("Error fetching name: ", error);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold mb-4">Welcome, {name}!</h1>
        <p className="text-lg mb-8">Explore featured books or add them to your favorites list.</p>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-6 mx-auto w-10/12">
        
        <div className="card bg-base-100 image-full w-96 shadow-xl">
          <figure>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4dPz8Z8pq72nhx9tnlVJ7bSvsRkCdoP41Gw&s"
              alt="Books"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Books</h2>
            <p>Browse a wide selection of books available in the library.</p>
            <div className="card-actions justify-end">
              <Link to="/books" className="btn btn-primary">Explore</Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 image-full w-96 shadow-xl">
          <figure>
            <img
              src="https://img.freepik.com/premium-photo/row-old-books-yellow-shelf-horizontal-background-banner_118047-9219.jpg"
              alt="Favorites"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Favorites</h2>
            <p>See the books you've added to your favorites.</p>
            <div className="card-actions justify-end">
              <Link to="/favorites" className="btn btn-primary">View Favorites</Link>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 image-full w-96 shadow-xl mb-3">
          <figure>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxeLBvwjVFmo8Ncttj_4GFgIycH-VUO6uw-CuMmnhuodAh196-eBz2lAdIn1xekIStjQ&usqp=CAU"
              alt="Read Books"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Read Books</h2>
            <p>View the books you've added to your Read Books.</p>
            <div className="card-actions justify-end">
              <Link to="/ReadBooks" className="btn btn-primary">View Read Books</Link>
            </div>
          </div>
        </div>

      </div>

    </div>
    
  );
};

export default Home;
