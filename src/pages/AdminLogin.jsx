import { faBuilding, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLoginApi } from '../service/allApi'; // Import the login API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.info('Please fill in both email and password');
      return;
    }

    const credentials = { email, password };

    try {
      const result = await adminLoginApi(credentials);

      if (result.status === 200) {
        toast.success('Login Successful', {
          position: "top-center",
          autoClose: 2000,  // 2 seconds
          hideProgressBar: true,  // Hide progress bar
          closeOnClick: true,  // Allow closing on click
          theme: "colored",  // Colored toast theme
        });
        
        // Store token or user data in sessionStorage
        sessionStorage.setItem('adminToken', result.data.token); // example

        // Navigate after 2 seconds to ensure toast has time to show
        setTimeout(() => {
          navigate("/adminpage"); // Navigate to admin page
        }, 2000);
      } else {
        toast.warning('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div
          className="card shadow-lg"
          style={{
            width: '400px',
            borderRadius: '20px',
            backgroundColor: '#fff',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          {/* Back to Home */}
          <Link to={'/'} className="text-dark">
            <h5 className="mt-5 text-success mb-4">
              <FontAwesomeIcon icon={faArrowLeft} /> Back Home
            </h5>
          </Link>

          {/* Page Header */}
          <h3 className="text-dark mb-4">
            <FontAwesomeIcon icon={faBuilding} /> Admin Panel
          </h3>
          <h4 className="text-dark mb-4">Sign into your Admin Account</h4>

          {/* Email Input */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Id</label>
          </div>

          {/* Password Input */}
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="button"
              className="btn btn-success w-100 rounded-3 shadow-sm hover-effect"
              onClick={handleLogin} // Handle login on click
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
}

export default AdminLogin;