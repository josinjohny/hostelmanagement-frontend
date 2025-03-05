import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { loginResponseContext } from "../context/contextShare"; // Importing context

const AdminHeader = () => {
  const { loginResponse, setLoginResponse } = useContext(loginResponseContext); // Get login state
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoginResponse(null); // Clear admin login state
    sessionStorage.removeItem("adminToken"); // Remove admin token
    navigate("/adminlogin"); // Redirect to admin login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3 mb-4">
      <Container>
        {/* Navbar Brand */}
        <Navbar.Brand className="text-white">
          <Link to="/" className="text-decoration-none text-white">
            <h3 className="mb-0">
              <FontAwesomeIcon icon={faBuilding} className="me-2" />
              Hostel Management
            </h3>
          </Link>
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="admin-navbar-nav" />

        <Navbar.Collapse id="admin-navbar-nav" className="justify-content-end">
          {/* User Data Button */}
          <Nav className="align-items-center">
            <Link to={'/userdata'}><button className="btn btn-light me-2">USER DATA</button></Link>
            <Link to={'/messages'}><button className="btn btn-light me-2">Messages</button></Link>


            {/* Logout Button (Only if Admin is Logged In) */}
            {loginResponse && (
              <button className="btn btn-danger" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
