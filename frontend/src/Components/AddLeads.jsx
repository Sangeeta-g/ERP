import React, { useEffect,useState } from 'react';
import './DashboardContent.css';
import { useUser } from '../UserContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserFriends, faUserPlus, faBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AddLeads = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      
        const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
        };
        const { user } = useUser();  // Access the current user
        const [userName, setUserName] = useState('');
      
        useEffect(() => {
          if (user) {
            setUserName(`${user.first_name} ${user.last_name}`); // Setting user name based on user context
          }
        }, [user]);
      
        if (!user) {
          return <div>Please log in</div>;  // Handle the case if user is not logged in
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

  // Fetch sales employees on component mount
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

        setTimeout(() => {
          navigate("/view-leads");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding lead:", error);
      setError("Failed to add lead. Please try again.");
    }
  };

    
  return (
    <div className="dashboard-container">
    {/* Hamburger Menu (Visible on smaller screens) */}
    <div className="hamburger-menu" onClick={toggleSidebar}>
      <FontAwesomeIcon icon={faBars} />
    </div>

    {/* Sidebar (Conditionally Rendered) */}
    <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

    <div className={`dashboard-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
    <h1 className="dashboard-title">Welcome, {userName}</h1>
    <div className="form-container">
      <h2>Add New Lead</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={leadData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={leadData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={leadData.phone} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company" value={leadData.company} onChange={handleChange} required />
        <input type="text" name="source" placeholder="Source" value={leadData.source} onChange={handleChange} required />

        {/* Assign To Dropdown */}
        <select name="assigned_to" value={leadData.assigned_to} onChange={handleChange} required>
          <option value="">Select Sales Employee</option>
          {salesEmployees.map((employee) => (
            <option key={employee.id} value={employee.id}>
            {employee.first_name} {employee.last_name}  {/* Concatenate first and last name */}
          </option>
          ))}
        </select>

        <button type="submit">Add Lead</button>
      </form>
    </div>
    </div>
  </div>
  )
}

export default AddLeads