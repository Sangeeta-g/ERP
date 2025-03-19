import React, { useEffect } from 'react';
import { FaTh, FaListAlt, FaUsers, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import '../components/Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

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
      { name: "Employee Management", icon: <FaListAlt />, path: "/manage-employees" },
    ],
    employee: [
      { name: "Dashboard", icon: <FaTh />, path: "/employee-portal" },
      { name: "Attendance", icon: <FaListAlt />, path: "/emp-attendance" },
    ],
    sales_manager: [
      { name: "Dashboard", icon: <FaTh />, path: "/sales-manager" },
      { name: "Leads", icon: <FaUsers />, path: "/view-leads" },
      { name: "Employee Info", icon: <FaListAlt />, path: "/sales-employee-info" },
    ]
  };

  // Check for Inside Sales employee
  let menuItems = [];
  if (user?.role === 'employee' && user?.position === 'Inside Sales') {
    menuItems = [
      { name: "Dashboard", icon: <FaTh />, path: "/employee-sales" }, // Inside Sales employees
      { name: "Leads", icon: <FaUsers />, path: "/leads-list" },
     
    ];
  } else {
    menuItems = roleBasedMenus[user?.role] || [];
  }

  // Handle Logout
  const handleLogout = () => {
    logoutUser();
    navigate('/'); // Redirect to login after logout
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
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
          {/* Logout Button - Universal for All Users */}
          <li className="sidebar-item">
            <a className="sidebar-text-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <FaSignOutAlt /> <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
    </div>
  );
}

export default Sidebar;
