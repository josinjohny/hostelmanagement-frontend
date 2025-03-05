import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getUsersApi } from "../service/allApi";


const UserData = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersApi(); // Call API function
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container className="mt-5">
      {/* Back Button */}
      <Link to="/adminpage" className="btn btn-secondary mb-3">
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back to Dashboard
      </Link>

      {/* Page Title */}
      <h2 className="text-center mb-4">Registered Users</h2>

      {/* User Data Table */}
      <Table striped bordered hover responsive className="text-center">
        <thead className="bg-dark text-white">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserData;
