import React, { useEffect, useState } from 'react';
import './DashboardContent.css';
import { useUser } from '../UserContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserPlus, faBars, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import axios from 'axios';

function SalesEmployee() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  
  const { user } = useUser();  

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!user) {
    return <div>Please log in</div>;
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leads/view-sales-employees");
      
      console.log("API Response:", response.data); // Debugging log
      
      // If response has an 'employees' array, set it
      if (Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
      } else if (Array.isArray(response.data)) {
        setEmployees(response.data);
      } else {
        setEmployees([]);
      }
    } catch (err) {
      setError("Failed to fetch employees");
      console.error("Fetch Employees Error:", err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(employees.length / entriesPerPage);
  const currentEmployee = employees.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="dashboard-content">
        <h2 className="leads-list-title">Sales Employees</h2>
        
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
                <option key={num} value={num}>{num}</option>
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
                  <th>Position</th>
                  <th>Date of Joining</th>
                  <th>Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {currentEmployee.length > 0 ? (
                  currentEmployee.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.first_name} {employee.last_name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.position}</td>
                      <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                      <td>{employee.status}</td>
                   
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      No Employees Found
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
      </div>
    </div>
  );
}

export default SalesEmployee;
