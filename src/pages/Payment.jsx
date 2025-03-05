
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Footer from "../components/Footer";

function PaymentSuccess() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 p-3">
        <Card
          className="shadow-lg text-center p-4 animate__animated animate__fadeInUp"
          style={{ width: "100%", maxWidth: "450px", borderRadius: "15px" }}
        >
          <Card.Body>
            {/* Success Message */}
            <Card.Title className="fw-bold text-success fs-3">
              Booking Successful! 🎉
            </Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              Your hostel is now booked!
            </Card.Subtitle>
            <Card.Text className="text-secondary">
              Enjoy your stay! 🏠 Your hostel booking details are available in your dashboard.
            </Card.Text>

            {/* Go to Dashboard Button */}
            <Link to="/my-bookings">
              <button className="btn btn-success text-light w-100 fw-bold shadow-sm">
                View My Bookings
              </button>
            </Link>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
