import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { CiStar, CiRead } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const apiUrl = 'https://67073bf9a0e04071d2298046.mockapi.io/users';

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
      fetchUserName(userId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/${userId}`);
      setUserName(response.data.name || 'User');
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <div className="navbar bg-[#131921] p-4">
        <div className="flex-1 ms-2 gap-7">
          <Link className="hover:opacity-70" to={'../'}>
            <img className="w-20 " src={logo} alt="Amazon Logo" />
          </Link>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-24 left-0 w-full  bg-[#131921] lg:hidden p-4 rounded-md shadow-lg z-40">
            <ul className="flex flex-col space-y-4 text-white">
              <li>
                <Link to={'../Favorites'}>
   Favorites
                </Link>
              </li>
              <li>
                <Link to={'../ReadBooks'}>
   Read Books
                </Link>
              </li>
              <li>
                <Link to={'../Books'}>
                  Books
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <span>Welcome, {userName}</span>
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={'../signup'}>SignUp</Link>
                  </li>
                  <li>
                    <Link to={'../login'}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        <div className="hidden lg:flex items-center gap-4 text-white">
          <Link to={'../Favorites'} className="flex items-center">
            <CiStar size={30} />
            Favorites
          </Link>
          <Link to={'../ReadBooks'} className="flex items-center">
            <CiRead size={30} />
            Read Books
          </Link>
          <Link to={'../Books'}>Books</Link>
          {isLoggedIn ? (
            <>
              <span>Welcome, {userName}</span>
              <span className="cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to={'../signup'}>SignUp</Link>
              <Link to={'../login'}>Login</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
