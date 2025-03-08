import React from "react";
import UserForm from "./Components/UserForm";
import DashboardContent from "./Components/DashboardContent"; // Corrected path

// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Adjust the path as necessary
import AdminPortal from './Components/AdminPortal'; // Create this component
import HRPortal from './Components/HRPortal'; // Create this component
import EmployeePortal from './Components/EmployeePortal'; // Create this component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin-portal" element={<DashboardContent />} /> {/* Changed to AdminPortal Component*/}
                <Route path="/hr-portal" element={<HRPortal />} />
                <Route path="/employee-portal" element={<EmployeePortal />} />
                <Route path="/user-form" element={<UserForm />} /> {/* Corrected path & consistent naming */}
                <Route path ="/dashboard-content" element={<DashboardContent /> }/> {/* Corrected path & consistent naming */}
            </Routes>
        </Router>
    );
};

export default App;
