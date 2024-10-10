import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import AlertToast from '../components/AlertToast';

function Details() {
  const { id } = useParams(); 
  const urlFound = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=i29EdkF7Jn10phPhQCF7pbpMLfN7qzuV`;
  const [bookFound, setBookFound] = useState({});
  const userId = localStorage.getItem('userId');
  const apiUrl = `https://67073bf9a0e04071d2298046.mockapi.io/users/${userId}`;
  const navigate = useNavigate();
  const [alertToast, setalertToast] = useState(false);
  const [readToast, setReadToast] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios.get(urlFound).then((response) => {
      const book = response.data.results.books.find(book => book.primary_isbn13 === id); 
      setBookFound(book);
    }).catch((error) => {
      console.error("Error fetching book details:", error);
    });
  }

  function handleAddCart() {
    axios.get(apiUrl).then((response) => {
      let cart = response.data.cart || [];
      let itemExist = cart.find((item) => item.id === id);

      if (!itemExist) {
        cart.push({
          id: id,
          title: bookFound.title,
          image: bookFound.book_image,
          price: bookFound.price || '0.00', 
          author: bookFound.author,
        });
      }

      axios.put(apiUrl, { cart }).then(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        window.dispatchEvent(new Event('storage'));

        setalertToast(true);
        setTimeout(() => {
          setalertToast(false);
        }, 3000);
      });
    });
  }

  function handleMarkAsRead() {
    axios.get(apiUrl).then((response) => {
      let readBooks = response.data.readBooks || [];
      let itemExist = readBooks.find((item) => item.id === id);

      if (!itemExist) {
        readBooks.push({
          id: id,
          title: bookFound.title,
          image: bookFound.book_image,
          author: bookFound.author,
        });

        axios.put(apiUrl, { readBooks }).then(() => {
          localStorage.setItem('readBooks', JSON.stringify(readBooks));

          setReadToast(true);
          setTimeout(() => {
            setReadToast(false);
          }, 3000);
        });
      } else {
        useState(true)      }
    });
  }

  return (
    <div>
      <NavBar />
      {alertToast && <AlertToast text="Book added to favorites!" />}
      {readToast && <AlertToast text="Book marked as read!" />}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img src={bookFound.book_image} className="max-w-sm rounded-lg shadow-2xl" alt="book" />

          <div className="self-start">
            <h1 className="text-base text-[rgb(0,113,133)] ">{bookFound.author}</h1>
            <h1 className="text-2xl font-bold">{bookFound.title}</h1>
            <div className="flex items-center gap-10">
              <span className="text-[rgb(0,113,133)]">{bookFound.weeks_on_list} weeks on the list</span>
            </div>

            <div className="flex w-full flex-col">
              <div className="divider"></div>
            </div>

            <p className="py-6">{bookFound.description}</p>

            <p className="py-2 text-gray-600">Publisher: {bookFound.publisher}</p>
            <p className="py-2 text-gray-600">ISBN-13: {bookFound.primary_isbn13}</p>

            <div className="py-4">
              <h3 className="text-lg font-semibold pb-3">Buy this book:</h3>
              <div className="flex flex-wrap gap-4">
                {bookFound.buy_links && bookFound.buy_links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-info"
                  >
                    Buy from {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleAddCart}
                className="btn btn-warning text-white"
              >
                Add to Favorites
              </button>

              <button
                onClick={handleMarkAsRead}
                className="btn btn-success text-white"
              >
                Mark as Read
              </button>

              <div className="flex flex-1 flex-row-reverse m">
                <button onClick={() => navigate('../Books')} className="btn btn-warning text-white">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
