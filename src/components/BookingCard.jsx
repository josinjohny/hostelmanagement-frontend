import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";

import { cancelBookingApi } from "../service/allApi";
import { deleteBookingContext } from "../context/contextShare";

function BookedHostel({ booking }) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const { setDeleteBookingResponse } = useContext(deleteBookingContext);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  const role = existingUser?.role;
  console.log("User Role:", role);

  // Navigate to detailed booking page
  const handleViewDetails = () => {
    navigate(`/booking-details/${booking._id}`);
  };

  // Cancel Booking Function
  const handleCancelBooking = async (id) => {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const result = await cancelBookingApi(id, reqHeader);
      if (result.status === 200) {
        Swal.fire({
          title: "Booking cancelled successfully!",
          icon: "success",
          position: "center",
          timer: 2500, // Auto close after 2.5 seconds
          showConfirmButton: false,
        });
        setDeleteBookingResponse(result);
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-3">
        {booking ? (
          <Card style={{ width: "100%" }} key={booking._id}>
            <Card.Img
              variant="top"
              src={booking.roomImage}
              alt={booking.roomType}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              onError={(e) => {
                e.target.src = "/default-room.jpg"; // Fallback image
              }}
            />

            <Card.Body>
              <Card.Title className="text-center my-3">
                {booking.roomType}
              </Card.Title>
              <Card.Text
                className="my-3"
                style={{
                  textAlign: "justify",
                  color: "#555",
                  fontSize: "0.95rem",
                }}
              >
                {booking.description || "No description available."}
              </Card.Text>

              <h6 style={{ color: "#213555" }} className="my-3">
                Price: ₹{booking.price} / month
              </h6>

              <div className="d-flex justify-content-between">
                {/* View Details Button */}
                <button
                  className="btn text-light p-lg-2 p-1 me-2 text-center"
                  style={{ backgroundColor: "#213555" }}
                  onClick={handleViewDetails}
                >
                  View Details
                </button>

                {/* Cancel Booking (For Users) */}
                {role === "user" && (
                  <button
                    className="btn btn-danger p-lg-2 p-1 me-2"
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Cancel Booking
                  </button>
                )}

                {/* Admin Only Actions */}
                {role === "admin" && (
                  <>
                    <Link to={`/edit-booking/${booking._id}`}>
                      <button
                        className="btn btn-warning p-lg-2 p-1 me-2"
                        style={{ color: "#fff" }}
                      >
                        Edit Booking
                      </button>
                    </Link>

                    <button
                      className="btn btn-danger p-lg-2 p-1 me-2"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Delete Booking
                    </button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </>
  );
}

export default BookedHostel;
