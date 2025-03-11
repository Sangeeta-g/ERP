import React, { useEffect } from 'react';
import { FaTh, FaListAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa';
import { useUser } from '../UserContext';
import '../components/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useUser();

  useEffect(() => {
    console.log("Sidebar isOpen state:", isOpen);
  }, [isOpen]);

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

  const menuItems = roleBasedMenus[user?.role] || [];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          {/* <FaTimes className="sidebar-close-icon" onClick={toggleSidebar} /> */}
          <div className="logo">
            <a href="#" className='logo-text'>
              <img src="https://cdn-icons-png.flaticon.com/512/8214/8214212.png" alt="Logo" className="sidebar-logo-icon" />
              Mazer
            </a>
          </div>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li className="sidebar-item" key={index}>
              <a href={item.path} className="sidebar-text-item" onClick={toggleSidebar}>
                {item.icon} <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
    </div>
  );
}

export default Sidebar;
