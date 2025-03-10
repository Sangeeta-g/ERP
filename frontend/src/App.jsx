// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Adjust the path as necessary
import AdminPortal from './Components/AdminPortal'; // Create this component
import HRPortal from './Components/HRPortal'; // Create this component
import EmployeePortal from './Components/EmployeePortal'; // Create this component
import UserForm from './Components/UserForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin-portal" element={<AdminPortal />} />
                <Route path="/hr-portal" element={<HRPortal />} />
                <Route path="/employee-portal" element={<EmployeePortal />} />
                <Route path='/userForm' element ={<UserForm/>}/>
            </Routes>
        </Router>
    );
};

export default App;