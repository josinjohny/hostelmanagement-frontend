import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, requestApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/contextShare';

function Auth({ register }) {
  const { setLoginResponse } = useContext(loginResponseContext);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.info("Please fill in all fields");
    } else {
      const requestBody = {
        username,
        email,
        password,
      };

      try {
        const result = await requestApi(requestBody); // Send the object as JSON
        if (result.status === 200) {
          toast.success('Registration Successful');
          setUserDetails({ username: "", email: "", password: "" });
          navigate("/login");
        } else {
          toast.warning(result.response?.status || 'Request failed');
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.info("Please fill in all fields");
      return;
    }
  
    try {
      const result = await loginApi({ email, password });
  
      if (result.status === 200) {
        toast.success("Login Successful");
        setLoginResponse(true);
  
        // Store token in sessionStorage
        const token = result.data.token;
        console.log("🔹 Storing Token:", token);
        sessionStorage.setItem("token", token);

        // Navigate after 2 seconds to ensure toast has time to show
        setTimeout(() => {
          navigate(""); // Navigate to admin page
        }, 2000);
  
        setUserDetails({ username: "", email: "", password: "" });
        setTimeout(() => {
          navigate("/"); // Navigate to admin page
        }, 2000);      } else {
        toast.warning(result?.response?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  
  
  

  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 mt-5">
            <Link to={'/'} className='text-white'>
              <h5 className='mt-5 text-warning'>
                <FontAwesomeIcon icon={faArrowLeft} /> Back Home
              </h5>
            </Link>
            <div className="row justify-content-center align-items-center" style={{ height: '70vh' }}>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column bg-success p-4 rounded">
                <h3 className='text-white text-center'>
                  Hostel Management System
                </h3>
                <h4 className='text-white text-center mb-4'>
                  {!register ? 'Sign into your network' : 'Sign Up to your Account'}
                </h4>

                {register && (
                  <input
                    type="text"
                    placeholder='Username'
                    className='form-control w-75 rounded-0 mt-3'
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  />
                )}

                <input
                  type="email"
                  placeholder='Email Id'
                  className='form-control w-75 rounded-0 mt-3'
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder='Password'
                  className='form-control w-75 rounded-0 mt-4'
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />

                {!register ? (
                  <div>
                    <button type='button' className='btn btn-warning w-100 rounded-0 mt-4' onClick={handleLogin}>
                      Login
                    </button>
                    <p className='text-white mt-3 text-center'>
                      New User? <Link to={'/register'} className='text-warning'>Register</Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <button type='button' className='btn btn-warning w-100 rounded-0 mt-4' onClick={handleRegister}>
                      Register
                    </button>
                    <p className='text-white mt-3 text-center'>
                      Already a User? <Link to={'/login'} className='text-warning'>Login</Link>
                      <br />
                    </p>
                  </div>
                )}
                                      <Link style={{textDecoration:'none'}} to={'/adminlogin'}><button className='btn btn-success'>Admin Login</button></Link>

              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme="colored" />
    </>
  );
}

export default Auth;