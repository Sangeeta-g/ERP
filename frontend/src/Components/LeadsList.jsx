import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardContent.css';
import { useUser } from '../UserContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBars, faEdit } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'; // Import from react-bootstrap
import { toast, ToastContainer } from 'react-toastify'; // Import from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const LeadsList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false); // State to manage edit modal visibility
  const [showViewModal, setShowViewModal] = useState(false); // State to manage view modal visibility
  const [selectedLead, setSelectedLead] = useState(null); // State to manage selected lead
  const [updateText, setUpdateText] = useState(''); // State to manage textarea input
  const [updateHistory, setUpdateHistory] = useState([]); // State to manage update history

  const { user } = useUser();


  useEffect(() => {
    if (user) {
      fetchLeads(user.u_id);
    }
  }, [user]);

  const fetchLeads = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/leads/leads_list`, {
        params: { user_id: userId }
      });
      setLeads(response.data.leads);
    } catch (err) {
      setError("No leads assigned to you");
      console.error("Fetch Leads Error:", err);
    }
  };

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const handleViewClick = async (lead) => {
    setSelectedLead(lead);
    try {
      const response = await axios.get(`http://localhost:3000/api/leads/${lead.id}/updates`);
      setUpdateHistory(response.data.updates);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching update history:", error);
      toast.error("Error fetching update history! Please try again.");
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedLead(null);
    setUpdateText('');
  };

  const handleViewModalClose = () => {
    setShowViewModal(false);
    setSelectedLead(null);
    setUpdateHistory([]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/api/leads/add_update`, {
        lead_id: selectedLead.id,
        sales_employee_id: user.u_id,
        update_text: updateText
      });
      handleEditModalClose();
      toast.success("Update added successfully!"); // Display success toast
      // Optionally, you can refresh the leads list or show a success message
    } catch (error) {
      console.error("Error adding update:", error);
      toast.error("Error adding update! Please try again."); // Display error toast
    }
  };


  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeads.length / entriesPerPage);
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Dropdown for status update
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (leadId) => {
    setActiveDropdown(activeDropdown === leadId ? null : leadId);
  };
  const statusOptions = ["In process", "Interested", "Converted", "Lost"];
  const handleStatusChange = async (leadId, event) => {
    try {
        const newStatus = event.target.value;
        console.log("Updating lead status:", newStatus);

        const response = await axios.put(`http://localhost:3000/api/leads/${leadId}/status`, { status: newStatus });

        console.log("✅ Lead status updated:", response.data);

        // Show success toast
        toast.success("Lead status updated successfully!", { autoClose: 7000 });

        // Reload the page after a short delay (1 second)
        setTimeout(() => {
            window.location.reload();
        }, 4100);
        
    } catch (error) {
        console.error("❌ Error updating lead status:", error);

        // Show error toast
        toast.error("Failed to update lead status.");
    }
};


  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="hamburger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="dashboard-content">
        <h2 className="leads-list-title">List of Leads</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className='table-responsive'>
        <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Source</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentLeads.length > 0 ? (
          currentLeads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.company}</td>
              <td>{lead.source}</td>
              <td>{lead.status}</td>
              <td>{new Date(lead.created_at).toLocaleDateString()}</td>
              <td>{new Date(lead.updated_at).toLocaleDateString()} <br />
              {new Date(lead.updated_at).toLocaleTimeString()}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => handleViewClick(lead)}
                />
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={() => handleEditClick(lead)}
                />
                <button className="small-button mx-2" onClick={() => toggleDropdown(lead.id)}>
                  Update
                </button>

                {/* Dropdown for status update */}
                {activeDropdown === lead.id && (
                  <select
                    className="status-dropdown"
                    onChange={(e) => handleStatusChange(lead.id, e)}  // ✅ Pass the event object
                    value={lead.status}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" style={{ textAlign: "center" }}>No Leads Found</td>
          </tr>
        )}
      </tbody>
    </table>
        </div>
        <div className="pagination-controls">
          <button
            className="btn btn-danger"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3">Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-danger"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="updateText">
              <Form.Label>Update Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lead Update History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{selectedLead?.name}</h5>

          <div className="chat-container">
            {updateHistory.length > 0 ? (
              updateHistory.map((update, index) => (
                <div key={index} className="chat-bubble">
                  <p className="chat-text">{update.update_text}</p>
                  <small className="chat-time">
                    {new Date(update.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="no-updates">No updates added</p>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
};

export default LeadsList;