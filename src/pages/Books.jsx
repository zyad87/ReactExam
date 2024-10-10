import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Carousel from '../components/Carousel';
import Card from '../components/Card';

import axios from 'axios';
import { CiSearch } from 'react-icons/ci';

function Books() {
  const urlItems = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=i29EdkF7Jn10phPhQCF7pbpMLfN7qzuV';
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios.get(urlItems).then((response) => {
      const books = response.data.results.books; 
      console.log(books); 
      setData(books);
      setFilteredData(books); 
      setLoading(false); 
    }).catch((error) => {
      console.error("Error fetching data: ", error); 
      setLoading(false);
    });
  }

  function handleSearch() {
    let filtered = data;
    if (searchInput === '') {
      filtered = data;
    } else {
      filtered = filtered.filter((book) => {
        return book.title.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
    setFilteredData(filtered);
  }

  return (
    <div className="mb-44">
      <NavBar />
      <Carousel />

      <div className="flex w-full flex-col border-opacity-50">
        <div className="divider">All Books</div>
      </div>

      <div className="flex justify-center items-center my-10">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search"
          className="input input-bordered w-[50%] bg-base-200 rounded-r-none focus:outline-none"
        />
        <div
          className="bg-[#FEBD69] p-4 rounded-r-[0.5rem] cursor-pointer hover:bg-[#eca74d]"
          onClick={handleSearch}
        >
          <CiSearch />
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap gap-10">
        {loading ? (
          <p>Loading books...</p>
        ) : filteredData.length < 1 ? (
          <div>
            <div className="text-center">
              <p className="mb-4 text-lg text-gray-600">
                Oops! No result found
              </p>
              <div className="animate-bounce">
                <svg
                  className="mx-auto h-16 w-16 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          filteredData.map((book) => (
            <Card
              key={book.primary_isbn13} 
              price={book.price}
              title={book.title}
              image={book.book_image}
              id={book.primary_isbn13}
              author={book.author}
              description={book.description}
            />
          ))
        )}
      </div>

    </div>
  );
}

export default Books;
