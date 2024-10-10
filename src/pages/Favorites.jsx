import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import ItemInCart from '../components/ItemInCart';

function Favorites() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');
  const urlUser = `https://67073bf9a0e04071d2298046.mockapi.io/users/${userId}`;

  useEffect(() => {
    axios.get(urlUser).then((response) => {
      setCartItems(response.data.cart || []);
    }).catch((error) => {
      console.error('Error fetching cart data:', error);
    });
  }, []);

  function handleRemoveItem(id) {
    const updatedCart = cartItems.filter(item => item.id !== id);

    setCartItems(updatedCart);
    
    axios.put(urlUser, { cart: updatedCart }).then(() => {
      console.log('Item removed successfully');
    }).catch((error) => {
      console.error('Error removing item:', error);
    });
  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center flex-col mx-10 my-10 bg-white">
        <div className="self-start text-3xl font-semibold m-4 max-md:text-lg">Favorite books</div>
        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>

        <div className="w-full p-4">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <ItemInCart
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </>
          ) : (
            <p>Your list is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
