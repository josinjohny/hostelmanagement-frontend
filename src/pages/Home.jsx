import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HostelCard from '../components/Hostelcard'; // Assuming this is your component
import { hostelApi } from '../service/allApi'; // The API function
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate(); // Hook for redirection
    const [isLogin, setIsLogin] = useState(false); // Track login state
    const [homeHostels, setHomeHostels] = useState([]); // Store fetched hostels
    const [loading, setLoading] = useState(true); // Manage loading state
    const [error, setError] = useState(null); // Manage errors

    // Fetch home hostels data
    const getHomeHostels = async () => {
        try {
            const result = await hostelApi();
            console.log("API Response:", result);

            if (result?.data && Array.isArray(result.data)) {
                setHomeHostels(result.data);
            } else if (result?.hostels && Array.isArray(result.hostels)) {
                setHomeHostels(result.hostels);
            } else {
                setError("No hostels found. Please try again later.");
            }
            setLoading(false); // Stop loading
        } catch (error) {
            setHomeHostels([]);
            let errorMessage = "An unknown error occurred.";

            // Check if the error is due to the server response
            if (error.response) {
                errorMessage = `Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`;
            } else if (error.request) {
                errorMessage = "No response received from the server. Please check your connection.";
            } else {
                errorMessage = error.message || "An unknown error occurred.";
            }

            setError(errorMessage); // Set a more detailed error message
            setLoading(false); // Stop loading
            console.error("Error fetching hostels:", error); // Log the error
        }
    };

    // Check if the user is logged in (using sessionStorage for persistence)
    useEffect(() => {
        getHomeHostels(); // Call the function to fetch home hostels

        if (sessionStorage.getItem('token')) {
            setIsLogin(true); // User is logged in
        } else {
            setIsLogin(false); // User is not logged in
        }
    }, []); // Empty dependency array to run only once

    return (
        <>
            {/* Hero Section */}
            <div className="container-fluid bg-dark text-light d-flex align-items-center justify-content-center vh-100">
                <div className="row w-100">
                    <div className="col-12 col-md-6">
                        <img
                            src="https://www.edusys.co/images/hostel-management-software.png"
                            alt="Hostel Management"
                            className="img-fluid"
                        />
                    </div>

                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                        <div className="p-4">
                            <h1 className="display-4 fw-bold">
                                Welcome to<br />
                                Hostel Management<br />
                                System
                            </h1>
                            <p className="mt-4 mb-4">
                                Streamline hostel management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback. Access records,
                                view marks, and communicate effortlessly.
                            </p>

                            <div className="d-flex flex-column align-items-center gap-3">
                                {!isLogin ? (
                                    <>
                                        <Link to="/login" className="w-100">
                                            <button className="btn btn-success w-100">Login</button>
                                        </Link>
                                        <p>
                                            Don’t have an account?{' '}
                                            <Link to="/register" className="text-success">
                                                Sign up
                                            </Link>
                                        </p>
                                    </>
                                ) : (
                                    <>

                                        <h1>Welcome ! You are now logged in</h1>

                                        <button className="btn btn-danger w-100" onClick={() => { sessionStorage.removeItem('token'); setIsLogin(false); navigate('/login'); }} >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hostel Cards Section */}
            <div>
                <h1 className="text-center mt-5">Explore Hostels</h1>
                <div className="container">
                    <div className="row mt-5">
                        {loading ? (
                            <div className="col-12 text-center">
                                <p>Loading...</p>
                            </div>
                        ) : error ? (
                            <div className="col-12 text-center text-danger">
                                <p>{error}</p>
                            </div>
                        ) : (
                            homeHostels.length > 0 ? (
                                homeHostels.map((hostel, index) => (
                                    <div key={index} className="col-md-4 mb-4">
                                        <HostelCard hostel={hostel} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>No hostels available</p>
                                </div>
                            )
                        )}
                    </div>
                </div>


                <h5 className="text-center mt-5 text-muted" style={{ cursor: 'pointer' }} onClick={() => navigate('/hostels')}>
                    See More Hostels <FontAwesomeIcon icon={faArrowRight} />
                </h5>

            </div>

            {/* Feature Section */}
            <FeatureSection />

            {/* Footer Section */}
            <Footer />
        </>
    );
};

export default Home;
