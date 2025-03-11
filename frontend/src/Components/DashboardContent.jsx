import React, { useEffect, useState } from "react";
import "./DashboardContent.css";
import { useUser } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DataTable.css";

const ViewLeads = () => {
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

  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/leads/view-leads"
        );
        setLeads(response.data.leads);
      } catch (err) {
        setError("Failed to fetch leads");
        console.error(err);
      }
    };

    fetchLeads();
  }, []);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
          <h2 className="leads-list-title">Leads List</h2>
         
        
        </div>
      </div>
    </div>
  );
};

export default ViewLeads;
