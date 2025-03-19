import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DashboardContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUserFriends,
  faUserPlus,
  faBookmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../UserContext";
import Sidebar from "./Sidebar";

const EditEmployee = () => {
  // Prerequisites for dashboard style
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { user } = useUser(); // Access the current user
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(`${user.first_name} ${user.last_name}`); // Setting user name based on user context
    }
  }, [user]);

  console.log(user);

  if (!user) {
    return <div>Please log in</div>; // Handle the case if user is not logged in
  }

  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    position: "",
    salary: "",
    date_of_joining: "",
    status: "",
});
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

// Fetch employee details
useEffect(() => {
    const fetchEmployee = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/hrm/employee/${id}`
            );
            setEmployeeData(response.data);
        } catch (error) {
            console.error("Error fetching employee:", error);
            toast.error("Error fetching employee details!");
        }
    };
    fetchEmployee();
}, [id]);

// Log employeeData when it updates
useEffect(() => {
    console.log("Updated Employee Role:", employeeData.role);
}, [employeeData]); // Runs when employeeData changes


  // Handle input change
  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value || "" });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Employee Data:", employeeData); // Debugging
  
    try {
      await axios.put(
        `http://localhost:3000/api/hrm/edit-employee/${id}`,
        employeeData
      );
      toast.success("Employee updated successfully!");
      setTimeout(() => navigate("/manage-employees"), 5000);
    } catch (error) {
      console.error("Error updating employee details:", error.response?.data);
      toast.error("Error updating employee! Please try again.");
    }
  };
  

  return (
    <div
      className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      {/* Ensure button is rendering */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar (Conditionally Rendered) */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="dashboard-content">
        <div>
          <h2 className="leads-list-title">Welcome, {userName}</h2>
          <div className="form-container">
            <h6>Update details if required</h6> <br />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="first_name">First name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Enter First name"
                  value={employeeData.first_name}
                  onChange={handleChange}
                  required
                  pattern="^[a-zA-Z\s]+$"
                  title="Name should only contain letters and spaces."
                />
              </div>
              <div>
                <label htmlFor="last_name">Last name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Enter last name"
                  value={employeeData.last_name}
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
                  value={employeeData.email}
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
                  value={employeeData.phone}
                  onChange={handleChange}
                  required
                  pattern="^\d{10}$"
                  title="Phone number should be 10 digits."
                />
              </div>
              <div>
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={employeeData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="employee">Employee</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Supply Chain Manager">
                    Supply Chain Manager
                  </option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Warehouse Manager">Warehouse Manager</option>
                  <option value="Production Manager">Production Manager</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>

              <div>
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={employeeData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Finance & Accounting">
                    Finance & Accounting
                  </option>
                  <option value="Human Resource Management">
                    Human Resource Management
                  </option>
                  <option value="Supply Chain Management">
                    Supply Chain Management
                  </option>
                  <option value="Customer Relationship Management">
                    Customer Relationship Management
                  </option>
                  <option value="Inventory & Warehouse Management">
                    Inventory & Warehouse Management
                  </option>
                  <option value="Sales & Order Management">
                    Sales & Order Management
                  </option>
                  <option value="Production & Manufacturing">
                    Production & Manufacturing
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter position"
                  value={employeeData.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="salary">Salary</label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  placeholder="Enter salary"
                  value={employeeData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="date_of_joining">Date of Joining</label>
                <input
                  type="date"
                  id="date_of_joining"
                  name="date_of_joining"
                  value={
                    employeeData.date_of_joining
                      ? employeeData.date_of_joining.split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={employeeData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button type="submit" className="btn btn-danger">
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditEmployee;
