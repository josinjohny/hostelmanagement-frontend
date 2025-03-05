import { faBuilding, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'; // Import Nav for menu items
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/contextShare'; // Import context

function Header() {
  const { loginResponse, setLoginResponse } = useContext(loginResponseContext); // Get login state
  const navigate = useNavigate(); // Hook for redirection

  // Check if token is available in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoginResponse(true); // Set login state to true if token exists
    } else {
      setLoginResponse(false); // Set login state to false if token doesn't exist
    }
  }, [setLoginResponse]);

  // Logout function
  const handleLogout = () => {
    setLoginResponse(false); // Clear login state
    sessionStorage.removeItem('token'); // Remove authentication token from sessionStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="mb-5">
      <Navbar expand="lg" className="navbar-dark bg-dark">
        <Container>
          <Link to={'/'} className="text-decoration-none">
            <Navbar.Brand>
              <h3 className="text-white">
                <FontAwesomeIcon icon={faBuilding} className="me-2 mt-4" />
                Hostel Management
              </h3>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto"> {/* Align logout button to the right */}
              {loginResponse && (
                <button className="btn btn-success rounded-0 me-4" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
