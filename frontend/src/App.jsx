import React from "react";
import UserForm from "./Components/UserForm";
import DashboardContent from "./Components/DashboardContent"; // Corrected path
import FormMultiple from "./Components/Form Multiple";

// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Adjust the path as necessary
import AdminPortal from './Components/AdminPortal'; // Create this component
import HRPortal from './Components/HRPortal'; // Create this component
import EmployeePortal from './Components/EmployeePortal'; // Create this component
import SalesManager from "./Components/SalesManager";
import { UserProvider } from './UserContext'; 
import ViewLeads from "./Components/ViewLeads";
import AddLeads from "./Components/AddLeads";

import TableComponent from "./Components/DataTable";
// import UserForm from './Components/UserForm';

import Form from "./Components/Form";
import DataTable from "./Components/DataTable";


const App = () => {
    return (
        <UserProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin-portal" element={<DashboardContent />} /> {/* Changed to AdminPortal Component*/}
                <Route path="/hr-portal" element={<HRPortal />} />
                <Route path="/employee-portal" element={<EmployeePortal />} />
                <Route path="/user-form" element={<UserForm />} /> {/* Corrected path & consistent naming */}
                <Route path ="/dashboard-content" element={<DashboardContent /> }/> 
                <Route path="/sales-manager" element={<SalesManager />}/>
                <Route path="/view-leads" element={<ViewLeads />}/>
                <Route path="/add-leads" element={<AddLeads/>}/>
                <Route path ="/dashboard-content" element={<DashboardContent /> }/> {/* Corrected path & consistent naming */}

                <Route path="/form-multiple" element={<FormMultiple />} />
                <Route path ="/datatable" element={<DataTable />}/>
                <Route path ="/form" element={<Form />} />

                <Route path ="/datatable" element={<TableComponent />}/>

            </Routes>
        </Router>
        </UserProvider>
    );  
};

export default App;
