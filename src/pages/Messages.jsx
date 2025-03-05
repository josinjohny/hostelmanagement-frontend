import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getMessagesApi, deleteMessageApi } from "../service/allApi";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  // ✅ Fetch messages from API when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessagesApi();
        if (response.status === 200) {
          setMessages(response.data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // ✅ Function to delete a message
  const handleDelete = async (id) => {
    try {
      const response = await deleteMessageApi(id);
      if (response.status === 200) {
        alert("Message deleted successfully!");
        // ✅ Update state to remove deleted message without reloading
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Error deleting message");
    }
  };

  return (
    <Container className="mt-5">
      {/* Back Button */}
      <Link to="/adminpage" className="btn btn-secondary mb-3">
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back to Dashboard
      </Link>

      {/* Page Title */}
      <h2 className="text-center mb-4">User Messages</h2>

      {/* Messages Table */}
      <Table striped bordered hover responsive className="text-center">
        <thead className="bg-dark text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <tr key={msg._id}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(msg._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No Messages Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Messages;
