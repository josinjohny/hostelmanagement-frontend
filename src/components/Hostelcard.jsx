import React, { useState, useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { loginResponseContext } from '../context/contextShare'; // Import login state
import { serverUrl } from '../service/serviceUrl';
import HostelPaymentButton from './PaymentButton';

function HostelCard({ hostel }) {
  const [show, setShow] = useState(false);
  const { loginResponse, setLoginResponse } = useContext(loginResponseContext); // Access login state
  const [imageError, setImageError] = useState(false);

  // ✅ Prevent errors when hostel is undefined
  if (!hostel) {
    return <p className="text-center text-muted">Hostel data not available.</p>;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle image load error and fall back to default image
  const handleImageError = () => {
    setImageError(true); // Set the error state if image fails to load
  };

  // ✅ Check login status on component mount
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginResponse(true); // User is logged in
    } else {
      setLoginResponse(false); // User is not logged in
    }
  }, []);

  return (
    <>
      <Card style={{ width: '100%' }} className="shadow border-0 mt-4">
        <Card.Img
          variant="top"
          src={imageError || !hostel.hostelImage ? '/default-image.jpg' : `${serverUrl}/uploads/${hostel.hostelImage}`}
          className="w-100"
          style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }}
          onClick={handleShow}
          onError={handleImageError} // Handle image load error
        />
        <Card.Body>
          <Card.Title className="text-center">{hostel.name || 'No Name'}</Card.Title>
          <p className="text-center text-muted">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
            {hostel.location || 'Location not available'}
          </p>
          <h5 className="text-center text-success">
            Starting at: Rs.{hostel.price ? hostel.price : 'N/A'}/month
          </h5>
        </Card.Body>
      </Card>

      {/* Modal for hostel details */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{hostel.name || 'Hostel Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={imageError || !hostel.hostelImage ? '/default-image.jpg' : `${serverUrl}/uploads/${hostel.hostelImage}`}
                  alt={hostel.name || 'Hostel'}
                  className="w-100"
                  style={{ height: '260px', objectFit: 'cover' }}
                  onError={handleImageError} // Handle image load error
                />
              </div>
              <div className="col-md-6">
                <h4>Location</h4>
                <p>{hostel.location || 'No location available'}</p>
                <h4>Price</h4>
                <p>Rs.{hostel.price ? hostel.price : 'N/A'}/month</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loginResponse ? (
            // <Link to={'/payment'}>
            //   <button className="btn btn-success w-100">Book Now</button>
            // </Link>
//  <HostelPaymentButton hostelId={hostel._id} amount={hostel.price} /> 

<div style={{ textAlign: "center", marginTop: "20px" }}>
  <a href={`tel:${hostel.contactNumber}`} 
     style={{
       textDecoration: "none",
       fontSize: "1.8rem",
       fontWeight: "bold",
       color: "white",
       backgroundColor: "green",
       padding: "10px 20px",
       borderRadius: "8px",
       display: "inline-block",
       boxShadow: "0px 4px 10px rgba(0,0,0,0.2)"
     }}>
    📞 Call Now: {hostel.contactNumber}
  </a>
</div>

          ) : (
            <Link to={'/login'}>
              <button className="btn btn-primary w-100">Login</button>
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HostelCard;
