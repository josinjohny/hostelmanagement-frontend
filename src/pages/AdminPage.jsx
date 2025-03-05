import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { addHostelApi, getAllHostelsApi, removeHostelApi, updateHostelApi } from "../service/allApi"; // Import the edit API function
import AdminHeader from "../components/adminHeader";
import { serverUrl } from "../service/serviceUrl";

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [newHostel, setNewHostel] = useState({
    name: "",
    location: "",
    price: "",
    hostelImage: "",
    contactNumber:"",
  });
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [hostels, setHostels] = useState([]);
  const [editMode, setEditMode] = useState(false); // Track if editing
  const [editingHostelId, setEditingHostelId] = useState(null); // Store the hostel ID being edited
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle Add/Edit Hostel Modal
  const toggleModal = () => {
    setNewHostel({ name: "", location: "", price: "", hostelImage: "",contactNumber: "" });
    setPreview("");
    setEditMode(false); // Reset edit mode when toggling the modal
    setEditingHostelId(null); // Reset editing hostel ID
    setShowModal(!showModal);
  };

  // Handle Image Upload
  const handleFile = (e) => {
    setNewHostel({
      ...newHostel,
      hostelImage: e.target.files[0],
    });
  };
  useEffect(() => {
    if (newHostel.hostelImage && newHostel.hostelImage.type) {
      // Check if the file is an image
      if (newHostel.hostelImage.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(newHostel.hostelImage));
      } else {
        toast.error("Please upload a valid image file.");
      }
    }
  }, [newHostel.hostelImage]);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");

    if (adminToken) {
      setToken(adminToken);
      setIsLoggedIn(true);
    } else {
      toast.error("Access Denied! Admins only.");
      navigate("/adminlogin");
    }
  }, [navigate]);

  // Fetch All Hostels
  const fetchHostels = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await getAllHostelsApi(reqHeader);
      if (result.status === 200) {
        setHostels(result.data);
      } else {
        toast.error("Failed to fetch hostels.");
      }
    } catch (error) {
      console.error("Error fetching hostels:", error);
      toast.error("Failed to fetch hostels. Please try again later.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchHostels();
    }
  }, [token]);

  // Handle Delete Hostel
  const handleDeleteHostel = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this hostel?");
    if (!confirmation) return;

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await removeHostelApi(id, reqHeader);

      if (result.status === 200) {
        toast.success("Hostel deleted successfully");
        fetchHostels(); // Fetch updated list after deletion
      } else {
        toast.error("Failed to delete hostel. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting hostel:", error);
      toast.error("Failed to delete hostel. Please try again.");
    }
  };

  // Handle Add Hostel
  const handleAddHostel = async () => {
    const { name, location, price, hostelImage, contactNumber } = newHostel;

    if (!name || !location || !price || !hostelImage || !contactNumber) {
      toast.info("Please fill the form completely");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("name", name);
    reqBody.append("location", location);
    reqBody.append("price", price);
    reqBody.append("hostelImage", hostelImage);
    reqBody.append("contactNumber",contactNumber)

    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await addHostelApi(reqBody, reqHeader); // API call to add hostel

        if (result.status === 200) {
          toast.success("Hostel added successfully");
          fetchHostels(); // Fetch updated list after adding
          setTimeout(() => {
            toggleModal(); // Close modal after successful addition
          }, 2000);
        } else {
          toast.error("Something went wrong while adding the hostel");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data === "Invalid token.") {
            toast.warning("Your session has expired. Please log in again.");
            navigate("/adminlogin");
          } else {
            toast.error("Failed to add hostel. Please try again later.");
          }
        } else {
          toast.error("Failed to add hostel. Please try again later.");
        }
      }
    } else {
      toast.warning("Please login");
    }
  };


  // Handle Edit Hostel
  const handleEditHostel = async () => {
    const { name, location, price, hostelImage, contactNumber } = newHostel;

    if (!name || !location || !price || !hostelImage || !contactNumber) {
      toast.info("Please fill the form completely");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("name", name);
    reqBody.append("location", location);
    reqBody.append("price", price);
    reqBody.append("hostelImage", hostelImage);
    reqBody.append("contactNumber",contactNumber)

    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await updateHostelApi(reqBody, reqHeader, editingHostelId); // Update hostel by ID
        if (result.status === 200) {
          toast.success("Hostel updated successfully");
          fetchHostels();
          setTimeout(() => {
            toggleModal();
          }, 2000);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data === "Invalid token.") {
            toast.warning("Your session has expired. Please log in again.");
            navigate("/adminlogin");
          } else {
            toast.error("Failed to update hostel. Please try again later.");
          }
        } else {
          toast.error("Failed to update hostel. Please try again later.");
        }
      }
    } else {
      toast.warning("Please login");
    }
  };

  // Set the hostel data in the form for editing
  const handleEditClick = (hostel) => {
    setNewHostel({
      name: hostel.name,
      location: hostel.location,
      price: hostel.price,
      hostelImage: hostel.hostelImage,
      contactNumber: hostel.contactNumber
    });
    setPreview(hostel.hostelImage ? `${serverUrl}/uploads/${hostel.hostelImage}` : "https://cdn-icons-png.flaticon.com/512/4147/4147103.png");
    setEditingHostelId(hostel._id); // Set hostel ID for editing
    setEditMode(true); // Set edit mode to true
    setShowModal(true); // Open the modal
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container py-5">
      <AdminHeader />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Hostel List</h3>
        <button className="btn btn-primary px-4 py-2 rounded-pill" onClick={toggleModal}>
          + Add Hostel
        </button>
      </div>

      <div className="row">
        {hostels.length > 0 ? (
          hostels.map((hostel, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-lg border-0 rounded-3">
                <img
                  src={hostel.hostelImage ? `${serverUrl}/uploads/${hostel.hostelImage}` : "https://via.placeholder.com/300"} // Fallback to placeholder if no image
                  className="card-img-top rounded-top"
                  alt={hostel.name}
                  style={{ width: '100%', height: '300px' }} // Adjust the width and height if needed
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{hostel.name}</h5>
                  <p className="card-text text-muted">
                    📍 Location: {hostel.location} <br /> 💰 Price: Rs {hostel.price} per month
                  </p>
                  <p className="card-text text-muted">contactNumber : {hostel.contactNumber}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-success btn-sm px-3"
                      onClick={() => handleEditClick(hostel)} // Pass the hostel data to edit
                    >
                      ✏ Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm px-3"
                      onClick={() => handleDeleteHostel(hostel._id)} // Pass the hostel ID to delete
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center text-muted">No hostels available</h5>
        )}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{editMode ? "✏ Edit Hostel" : "🏡 Add Hostel"}</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                      <label htmlFor="hostelImage">
                        <input type="file" id="hostelImage" className="d-none" onChange={handleFile} />
                        <img
                          src={preview || "https://cdn-icons-png.flaticon.com/512/4147/4147103.png"} // Show preview image or fallback
                          alt=""
                          className="w-100"
                        />
                      </label>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          value={newHostel.name}
                          placeholder="Hostel Name"
                          onChange={(e) => setNewHostel({ ...newHostel, name: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          value={newHostel.location}
                          placeholder="Location"
                          onChange={(e) => setNewHostel({ ...newHostel, location: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="number"
                          className="form-control"
                          value={newHostel.price}
                          placeholder="Price per Month"
                          onChange={(e) => setNewHostel({ ...newHostel, price: e.target.value })}
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          value={newHostel.contactNumber}
                          placeholder="contactNumber"
                          onChange={(e) => setNewHostel({ ...newHostel, contactNumber: e.target.value })}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={toggleModal}>Close</button>
                <button className="btn btn-primary" onClick={editMode ? handleEditHostel : handleAddHostel}>
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminPage;
