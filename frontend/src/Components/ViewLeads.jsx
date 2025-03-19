import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../UserContext";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DataTable.css";
import { Modal, Button, Form } from 'react-bootstrap';

const ViewLeads = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();
  const [userName, setUserName] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null); 
  const [updateHistory, setUpdateHistory] = useState([]);

  useEffect(() => {
    if (user) {
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  if (!user) {
    return <div>Please log in</div>;
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leads/view-leads");
      setLeads(response.data.leads);
    } catch (err) {
      setError("Failed to fetch leads");
      console.error("Fetch Leads Error:", err);
    }
  };

  const handleDelete = (id) => {
    console.log("Clicked delete for Lead ID:", id);

    const toastId = toast.warn(
      <div>
        <p>Are you sure you want to delete this lead?</p>
        <button className="btn btn-danger me-2" onClick={() => confirmDelete(id)}>Yes, Delete</button>
        <button className="btn btn-secondary" onClick={() => toast.dismiss(toastId)}>Cancel</button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
};


  const confirmDelete = async (id) => {
    toast.dismiss();
    console.log("Confirmed delete for Lead ID:", id);

    try {
        await axios.delete(`http://localhost:3000/api/leads/leads/${id}`); // ✅ FIXED URL
        toast.success("Lead deleted successfully!");
        fetchLeads(); // Refresh the list
    } catch (error) {
        console.error("Error deleting lead:", error);
        toast.error("Failed to delete lead!");
    }
};


  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.assigned_to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeads.length / entriesPerPage);
  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  // code for showing modal
  const handleViewModalClose = () => {
    setShowViewModal(false);
    setSelectedLead(null);
    setUpdateHistory([]);
  };

  const handleViewClick = async (lead) => {
    setSelectedLead(lead);
    try {
      const response = await axios.get(`http://localhost:3000/api/leads/lead-updates/${lead.id}`);
      setUpdateHistory(response.data.updates);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching update history:", error);
      toast.error("Error fetching update history! Please try again.");
    }
  };


  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <ToastContainer />
      <div className="hamburger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="dashboard-content">
        <h2 className="leads-list-title">Leads List</h2>
        <div className="table-controls d-flex justify-content-between align-items-center">
          <div>
            <select
              className="form-select"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[5, 10, 15, 20, 25].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-center">
            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="/add-leads" className="ms-2">
              <button className="btn btn-primary mb-4">Add New</button>
            </Link>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="dataTable-container">
          <div className="table-responsive">
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
                <th>Assigned To</th>
                <th>Created At</th>
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
                    <td>{lead.assigned_to_name || "Unassigned"}</td>
                    <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/edit-lead/${lead.id}`} className="me-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                     
                        <FontAwesomeIcon icon={faEye}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewClick(lead)}
                        />
                      
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger"
                        style={{ cursor: "pointer", marginLeft: "10px" }}
                        onClick={() => handleDelete(lead.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center" }}>
                    No Leads Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
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

        {/* Modal to display the updates history */}
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
      {/* end of the modal */}
      </div>
    </div>
  );
};

export default ViewLeads;
