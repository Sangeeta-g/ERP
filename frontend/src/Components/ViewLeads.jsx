import React, { useEffect,useState } from 'react';
import './DashboardContent.css';
import { useUser } from '../UserContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserFriends, faUserPlus, faBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';
import axios from "axios";
import { Link } from 'react-router-dom';


const ViewLeads = () => {

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

  // code related to displaying leads
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/leads/view-leads");
        setLeads(response.data.leads);
      } catch (err) {
        setError("Failed to fetch leads");
        console.error(err);
      }
    };

    fetchLeads();
  }, []);
  
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
      <div>
      <h2>Leads List</h2> 
      <Link to="/add-leads">
    <button>Add New</button>
      </Link>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table border="1" cellPadding="10" cellSpacing="0">
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
          </tr>
        </thead>
        <tbody>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.company}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>
                <td>{lead.assigned_to}</td>
                <td>{new Date(lead.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No Leads Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
      </div>
    </div>
  )
}

export default ViewLeads