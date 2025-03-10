import React, { useState } from 'react';
import { FaTachometerAlt, FaTh, FaListAlt, FaTimes, FaUsers } from 'react-icons/fa';
import { useUser } from '../UserContext'; // Import UserContext to get user role
import '../components/Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const { user } = useUser(); // Get logged-in user details
  const [isComponentsOpen, setIsComponentsOpen] = useState(false);

  const toggleComponents = () => setIsComponentsOpen(!isComponentsOpen);

  // Define role-based menu items
  const roleBasedMenus = {
    admin: [
      { name: "Dashboard", icon: <FaTh />, path: "/admin-portal" },
      { name: "User Management", icon: <FaListAlt />, path: "/user-form" },
      { name: "HR Portal", icon: <FaTh />, path: "/hr-portal" },
    ],
    HR: [
      { name: "Dashboard", icon: <FaTh />, path: "/hr-portal" },
      { name: "Employee Management", icon: <FaListAlt />, path: "/employee-portal" },
    ],
    employee: [
      { name: "Dashboard", icon: <FaTh />, path: "/employee-portal" },
      { name: "Attendance", icon: <FaListAlt />, path: "/attendance" },
    ],
    sales_manager: [
      { name: "Dashboard", icon: <FaTh />, path: "/sales-manager" },
      { name: "Leads", icon: <FaUsers />, path: "/view-leads" },
      { name: "Sales Reports", icon: <FaListAlt />, path: "/sales-reports" },
    ]
  };

  // Get the menu items based on the user's role, defaulting to an empty array
  const menuItems = roleBasedMenus[user?.role] || [];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <a href="#">
                <img src="https://cdn-icons-png.flaticon.com/512/8214/8214212.png" 
                  alt="Logo" className="sidebar-logo-icon" 
                  style={{ width: '35px', height: '35px', marginRight: '10px' }}
                />
                Mazer
              </a>
            </div>
            {isOpen && <FaTimes className="sidebar-close-icon" onClick={onClose} />}
          </div>
        </div>


        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li className="sidebar-item" key={index}>
              <a href={item.path} className="sidebar-text-item">
                {item.icon} {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
