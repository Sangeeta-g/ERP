import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DashboardContent.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserFriends, faUserPlus, faBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../UserContext'; 
import Sidebar from "./Sidebar";

const EditLead = () => {
    // Prerequisites for dashboard style
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
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
    
    console.log(user)
    
    if (!user) {
        return <div>Please log in</div>;  // Handle the case if user is not logged in
    }

    const { id } = useParams();
    const navigate = useNavigate();

    const [leadData, setLeadData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "",
        assigned_to: ""
    });

    const [salesEmployees, setSalesEmployees] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch lead details and sales employees
    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/leads/leads/${id}`);
                setLeadData(response.data);
            } catch (error) {
                console.error("Error fetching lead:", error);
                toast.error("Error fetching lead details!");
            }
        };

        const fetchSalesEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/leads/sales-employees", {
                    headers: { "Content-Type": "application/json" }
                });

                console.log("Sales Employees Response:", response.data);

                if (response.data && Array.isArray(response.data.employees)) {
                    setSalesEmployees(response.data.employees);
                } else {
                    console.error("API did not return an array:", response.data);
                    setSalesEmployees([]); // Prevent errors
                }
            } catch (error) {
                console.error("Error fetching sales employees:", error);
                toast.error("Failed to fetch sales employees!");
            }
        };

        fetchLead();
        fetchSalesEmployees();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        setLeadData({ ...leadData, [e.target.name]: e.target.value || "" });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3000/api/leads/leads/${id}`, leadData);
            toast.success("Lead updated successfully!");
            setTimeout(() => navigate("/view-leads"), 5000);
        } catch (error) {
            console.error("Error updating lead:", error);
            toast.error("Error updating lead! Please try again.");
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
                    <h2 className="leads-list-title">Welcome, {userName}</h2>
                    <div className="form-container">
                        <h6>Update details if required</h6> <br />
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" value={leadData.name || ""} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={leadData.email || ""} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" id="phone" name="phone" value={leadData.phone || ""} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="company">Company</label>
                                <input type="text" id="company" name="company" value={leadData.company || ""} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="source">Source</label>
                                <input type="text" id="source" name="source" value={leadData.source || ""} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="assigned_to">Assign To</label>
                                <select id="assigned_to" name="assigned_to" value={leadData.assigned_to || ""} onChange={handleChange} required>
                                    <option value="">Select Sales Employee</option>
                                    {salesEmployees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.first_name} {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Update Lead</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditLead;