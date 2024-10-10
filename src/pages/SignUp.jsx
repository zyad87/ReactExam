import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); 
  const urlUser = 'https://67073bf9a0e04071d2298046.mockapi.io/users';
  const navigate = useNavigate();

  function signUp() {
    let valid = true;

    if (email === '') {
      setError('Email is required');
      valid = false;
    } else if (name === '') {
      setError('Name is required');
      valid = false;
    } else if (password === '') {
      setError('Password is required');
      valid = false;
    }

    if (valid) {
      setError('');
      axios
        .post(urlUser, {
          email: email,
          password: password,
          name: name,
          cart: [], 
        })
        .then((response) => {
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userEmail', response.data.email);
          localStorage.setItem('userName', response.data.name);

          navigate('../');
        })
        .catch((error) => {
          console.error('Error during registration:', error);
          setError('Registration failed, please try again.');
        });
    }
  }

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="flex h-full flex-wrap items-center justify-center ">
          <div className="w-[50%] max-md:w-full max-md:flex max-md:justify-center">
            <img
              className="w-[50%]  max-md:w-[50%]"
              src={logo}
              alt="Sample image"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-black">
                  Sign Up
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-center mb-4">
                  {error}
                </div>
              )}

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full bg-white outline-none"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  placeholder="email@email.com"
                  className="input input-bordered w-full bg-white outline-none"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>

              <label className="form-control w-full mb-5">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full bg-white outline-none"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>

              <div className="text-center lg:text-left">
                  <button
                    onClick={signUp}
                    type="button"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    Register
                  </button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Have an account?{' '}
                  <Link
                    to={'../login'}
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
