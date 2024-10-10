import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/Details';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Books from '../pages/Books';
import ReadBooks from '../pages/ReadBooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/details/:id',
    element: <Details />,
  },
  {
    path: '/Favorites',
    element: <Favorites />,
  },
  {
    path: '/ReadBooks',
    element: <ReadBooks />,
  },
  {
    path: '/Books',
    element: <Books />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
