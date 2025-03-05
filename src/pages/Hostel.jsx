import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import HostelCard from '../components/Hostelcard';
import { loginResponseContext } from '../context/contextShare'; // Import context
import { allHostelApi } from '../service/allApi'; // Import the API function

const Hostel = () => {
  const { loginResponse } = useContext(loginResponseContext); // Get login state from context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hostels, setHostels] = useState([]); // State to store hostels
  const [searchKey, setSearchKey] = useState(''); // State to handle search

  useEffect(() => {
    if (!loginResponse) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      setLoading(false); // Show content once the login state is validated
    }
  }, [loginResponse, navigate]);

  useEffect(() => {
    // Fetch all hostels when the component mounts
    const fetchHostels = async () => {
      try {
        const response = await allHostelApi(searchKey, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include auth token
          },
        });
        setHostels(response.data); // Update state with the hostels data
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };
    fetchHostels();
  }, [searchKey]); // Re-fetch when searchKey changes

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <>
      <Header />
      <h3 className="text-center mt-4">All Hostels</h3>

      {/* Search Bar */}
      <div className="mt-5">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-4 d-flex align-items-center">
              <input
                type="text"
                placeholder="Search Hostels..."
                className="form-control shadow mb-3 mt-4"
                value={searchKey} // Bind search input to the state
                onChange={(e) => setSearchKey(e.target.value)} // Update search key on input change
              />
              <FontAwesomeIcon
                style={{ color: 'lightgrey', marginTop: '10px', marginLeft: '-30px' }}
                icon={faMagnifyingGlass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Display Hostels */}
      <div className="container mt-5 p-1">
        <div className="row">
          {/* Render Hostel Cards dynamically from the fetched data */}
          {hostels.length > 0 ? (
            hostels.map((hostel) => (
              <div className="col-md-3 mb-4" key={hostel._id}>
                <HostelCard hostel={hostel} /> {/* Pass hostel data as props */}
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h4>No hostels found</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hostel;
