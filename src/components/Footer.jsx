import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,

} from '@fortawesome/free-brands-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="container-fluid text-light mt-4 py-5" >
        <div className="row">
          <div className="col-md-5 mt-4">
            <h3 className="text-white">
              <FontAwesomeIcon icon={faBuilding} className='me-2' />
              Hostel Management
            </h3>
            <p className="mt-3">
              Find the best hostels and paying guest accommodations in your city.
              We provide verified listings with all essential amenities to make your stay comfortable and hassle-free.
            </p>
          </div>

          <div className="col-md-4 mt-4 ">
            <h3 className="text-white">Quick Links</h3>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <p className="mt-3">Home</p>
            </Link>              <Link to={'/hostels'}><p>Hostels</p></Link>
            <Link to={'/contactus'}><p>Contact Us</p></Link>

          </div>

          <div className="col-md-3 mt-4">
            <h3 className="text-white">Features</h3>
            <p className="mt-3">Wi-Fi</p>
            <p>24/7 Security</p>
            <p>Meals</p>
            <p>Laundry</p>
          </div>


        </div>
      </div>
    </>
  );
}

export default Footer;
