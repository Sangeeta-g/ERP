
import React from "react";
import UserForm from "./Components/UserForm";
import DashboardContent from "./components/DashboardContent";

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
                <Route path="/admin-portal" element={< DashboardContent />} />
                <Route path="/hr-portal" element={<HRPortal />} />
                <Route path="/employee-portal" element={<EmployeePortal />} />
                <Route path="/UserForm " element={<UserForm />} />
                <Route path ="/DashboardContent" element={<DashboardContent /> }/>
            </Routes>
        </Router>
    );
};

export default App;

