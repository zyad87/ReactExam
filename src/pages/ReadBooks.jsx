import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ItemInCart from '../components/ItemInCart'; // يمكنك إعادة استخدام نفس المكون لعرض الكتب

function ReadBooks() {
  const [readBooks, setReadBooks] = useState([]);
  const userId = localStorage.getItem('userId');
  const urlUser = `https://67073bf9a0e04071d2298046.mockapi.io/users/${userId}`;

  useEffect(() => {
    axios.get(urlUser).then((response) => {
      const filteredBooks = response.data.readBooks || [];
      setReadBooks(filteredBooks);
    });
  }, []);

  function handleRemoveItem(id) {
    const updatedBooks = readBooks.filter(item => item.id !== id);

    setReadBooks(updatedBooks);

    axios.put(urlUser, { readBooks: updatedBooks }).then(() => {
      console.log('Book removed from read list successfully');
    }).catch((error) => {
      console.error('Error removing book:', error);
    });
  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center flex-col mx-10 my-10 bg-white">
        <div className="self-start text-3xl font-semibold m-4 max-md:text-lg">Read Books</div>
        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>

        <div className="w-full p-4">
          {readBooks.length > 0 ? (
            <>
              {readBooks.map((item) => (
                <ItemInCart
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  author={item.author}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </>
          ) : (
            <p>You have no read books</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReadBooks;
