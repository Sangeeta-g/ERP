import React, { useEffect, useState } from "react";
import "./DashboardContent.css";
import { useUser } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLeads = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      console.log("Toggling Sidebar: New State =", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    console.log("Sidebar open state updated:", isSidebarOpen);
  }, [isSidebarOpen]);

  const { user } = useUser();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  if (!user) {
    return <div>Please log in</div>;
  }

  const navigate = useNavigate();

  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    assigned_to: "",
  });

  const [salesEmployees, setSalesEmployees] = useState([]); // Store sales employees
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Logic to handle form data
  useEffect(() => {
    const fetchSalesEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/leads/sales-employees");
        setSalesEmployees(response.data.employees);
      } catch (err) {
        console.error("Error fetching sales employees:", err);
      }
    };

    fetchSalesEmployees();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/api/leads", leadData);

      if (response.status === 201) {
        setSuccess("Lead added successfully!");
        setLeadData({
          name: "",
          email: "",
          phone: "",
          company: "",
          source: "",
          assigned_to: "",
        });

        toast.success("Lead added successfully!");

        setTimeout(() => {
          navigate("/view-leads");
        }, 7000);
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      setError("Failed to add lead. Please try again.");
    }
  };

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Ensure button is rendering */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar (Conditionally Rendered) */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="dashboard-content">
        <div>
          <h2 className="leads-list-title">Add New Lead Details</h2>

          {/* form container */}
          <div className="form-container">
            <h6>Enter all details of the Lead</h6> <br />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={leadData.name}
                  onChange={handleChange}
                  required
                  pattern="^[a-zA-Z\s]+$"
                  title="Name should only contain letters and spaces."
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={leadData.email}
                  onChange={handleChange}
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address."
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter contact number"
                  value={leadData.phone}
                  onChange={handleChange}
                  required
                  pattern="^\d{10}$"
                  title="Phone number should be 10 digits."
                />
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Enter company name"
                  value={leadData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="source">Source</label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  placeholder="Source of the lead"
                  value={leadData.source}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="assigned_to">Assign To</label>
                <select
                  id="assigned_to"
                  name="assigned_to"
                  value={leadData.assigned_to}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Sales Employee</option>
                  {salesEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.first_name} {employee.last_name} {/* Concatenate first and last name */}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-danger">Add Lead</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddLeads;