// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaHome, FaUsers, FaCalendarCheck, FaMoneyBill } from "react-icons/fa";

// const ErpDashboard = () => {
//     return (
//         <div className="d-flex">
//             {/* Sidebar */}
//             <div className="sidebar p-3 bg-dark text-white" style={{ width: "250px", height: "100vh", position: "fixed" }}>
//                 <h4 className="text-center">ERP System</h4>
//                 <a href="#dashboard" className="d-block text-white p-2"><FaHome /> Dashboard</a>
//                 <a href="#employees" className="d-block text-white p-2"><FaUsers /> Employees</a>
//                 <a href="#attendance" className="d-block text-white p-2"><FaCalendarCheck /> Attendance</a>
//                 <a href="#payroll" className="d-block text-white p-2"><FaMoneyBill /> Payroll</a>
//             </div>
            
//             {/* Main Content */}
//             <div className="content" style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
//                 <h2>Dashboard</h2>
//                 <div className="row">
//                     <div className="col-md-4">
//                         <div className="card text-bg-primary p-3">
//                             <h5>Total Employees</h5>
//                             <p>100</p>
//                         </div>
//                     </div>
//                     <div className="col-md-4">
//                         <div className="card text-bg-success p-3">
//                             <h5>Attendance Today</h5>
//                             <p>85 Present</p>
//                         </div>
//                     </div>
//                     <div className="col-md-4">
//                         <div className="card text-bg-warning p-3">
//                             <h5>Pending Payroll</h5>
//                             <p>₹ 5,00,000</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ErpDashboard;


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [isSidebarActive, setIsSidebarActive] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarActive(!isSidebarActive);
//   };

//   return (
//     <div className={`sidebar-wrapper ${isSidebarActive ? "active" : ""}`}>
//       <div className="sidebar-header">
//         <div className="d-flex justify-content-between">
//           <div className="logo">
//             <Link to="/">
//               <img src="/assets/images/logo/logo.png" alt="Logo" />
//             </Link>
//           </div>
//           <div className="toggler">
//             <button className="sidebar-hide d-xl-none d-block" onClick={toggleSidebar}>
//               <i className="bi bi-x bi-middle"></i>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="sidebar-menu">
//         <ul className="menu">
//           <li className="sidebar-title">Menu</li>

//           <li className="sidebar-item">
//             <Link to="/dashboard" className="sidebar-link">
//               <i className="bi bi-grid-fill"></i>
//               <span>Dashboard</span>
//             </Link>
//           </li>

//           <li className="sidebar-item has-sub">
//             <a href="#" className="sidebar-link">
//               <i className="bi bi-stack"></i>
//               <span>Components</span>
//             </a>
//             <ul className="submenu">
//               <li className="submenu-item">
//                 <Link to="/components/alert">Alert</Link>
//               </li>
//               <li className="submenu-item">
//                 <Link to="/components/badge">Badge</Link>
//               </li>
//               <li className="submenu-item">
//                 <Link to="/components/button">Button</Link>
//               </li>
//             </ul>
//           </li>

//           <li className="sidebar-item has-sub">
//             <a href="#" className="sidebar-link">
//               <i className="bi bi-collection-fill"></i>
//               <span>Extra Components</span>
//             </a>
//             <ul className="submenu">
//               <li className="submenu-item">
//                 <Link to="/extra/avatar">Avatar</Link>
//               </li>
//               <li className="submenu-item">
//                 <Link to="/extra/toastify">Toastify</Link>
//               </li>
//             </ul>
//           </li>

//           <li className="sidebar-title">Forms & Tables</li>
//           <li className="sidebar-item has-sub">
//             <a href="#" className="sidebar-link">
//               <i className="bi bi-hexagon-fill"></i>
//               <span>Form Elements</span>
//             </a>
//             <ul className="submenu">
//               <li className="submenu-item">
//                 <Link to="/forms/input">Input</Link>
//               </li>
//               <li className="submenu-item">
//                 <Link to="/forms/select">Select</Link>
//               </li>
//             </ul>
//           </li>

//           <li className="sidebar-item">
//             <Link to="/table" className="sidebar-link">
//               <i className="bi bi-grid-1x2-fill"></i>
//               <span>Table</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import {
//   BiGrid,
//   BiStack,
//   BiCollection,
//   BiGrid1x2,
//   BiHexagon,
//   BiFileEarmarkMedical,
//   BiPen,
//   BiFileEarmarkSpreadsheet,
//   BiPentagon,
//   BiEgg,
//   BiBarChart,
//   BiCloudUpload,
//   BiMap,
//   BiEnvelope,
//   BiChatDots,
//   BiImage,
//   BiBasket,
//   BiPersonBadge,
//   BiXOctagon,
//   BiLifePreserver,
//   BiPuzzle,
//   BiCash,
// } from "react-icons/bi";

// const Sidebar = () => {
//   const [activeMenu, setActiveMenu] = useState("Dashboard");

//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//   };

//   return (
//     <div className="sidebar-wrapper active">
//       <div className="sidebar-header">
//         <div className="d-flex justify-content-between">
//           <div className="logo">
//             <a href="/">
//               <img src="/assets/images/logo/logo.png" alt="Logo" />
//             </a>
//           </div>
//           <div className="toggler">
//             <a href="#" className="sidebar-hide d-xl-none d-block">
//               <i className="bi bi-x"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="sidebar-menu">
//         <ul className="menu">
//           <li className="sidebar-title">Menu</li>

//           {/* Dashboard */}
//           <li
//             className={`sidebar-item ${activeMenu === "Dashboard" ? "active" : ""}`}
//             onClick={() => handleMenuClick("Dashboard")}
//           >
//             <a href="/" className="sidebar-link">
//               <i><BiGrid /></i>
//               <span>Dashboard</span>
//             </a>
//           </li>

//           {/* Components */}
//           <li className="sidebar-item has-sub">
//             <a href="#" className="sidebar-link">
//               <i><BiStack /></i>
//               <span>Components</span>
//             </a>
//             <ul className="submenu">
//               <li className="submenu-item">
//                 <a href="/component-alert">Alert</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-badge">Badge</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-breadcrumb">Breadcrumb</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-button">Button</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-card">Card</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-carousel">Carousel</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-dropdown">Dropdown</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-list-group">List Group</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-modal">Modal</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-navs">Navs</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-pagination">Pagination</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-progress">Progress</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-spinner">Spinner</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/component-tooltip">Tooltip</a>
//               </li>
//             </ul>
//           </li>

//           {/* Extra Components */}
//           <li className="sidebar-item has-sub">
//             <a href="#" className="sidebar-link">
//               <i><BiCollection /></i>
//               <span>Extra Components</span>
//             </a>
//             <ul className="submenu">
//               <li className="submenu-item">
//                 <a href="/extra-component-avatar">Avatar</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/extra-component-sweetalert">Sweet Alert</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/extra-component-toastify">Toastify</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/extra-component-rating">Rating</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/extra-component-divider">Divider</a>
//               </li>
//             </ul>
//           </li>

//           {/* Layouts */}
//           <li className="sidebar-item has-sub">
//             <a href="#" className="sidebar-link">
//               <i><BiGrid1x2 /></i>
//               <span>Layouts</span>
//             </a>
//             <ul className="submenu">
//               <li className="submenu-item">
//                 <a href="/layout-default">Default Layout</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/layout-vertical-1-column">1 Column</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/layout-vertical-navbar">Vertical with Navbar</a>
//               </li>
//               <li className="submenu-item">
//                 <a href="/layout-horizontal">Horizontal Menu</a>
//               </li>
//             </ul>
//           </li>

//           {/* Add more menu items as needed */}
//         </ul>
//       </div>
//       <button className="sidebar-toggler btn x">
//         <i data-feather="x"></i>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

//Working with Sidebar header text

// import React from "react";
// import { BiGrid, BiUser, BiCalendar, BiMoney } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import "./Sidebar.css";

// const Sidebar = () => {
//   return (
//     <div className="sidebar-wrapper">
//       <div className="sidebar-header">
//         <div className="logo">
//           <a href="/">ERP System</a>
//         </div>
//       </div>
//       <div className="sidebar-menu">
//         <ul className="menu">
//           <li className="sidebar-item">
//             <Link to="/dashboard" className="sidebar-link">
//               <i><BiGrid /></i>
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li className="sidebar-item">
//             <Link to="/employees" className="sidebar-link">
//               <i><BiUser /></i>
//               <span>Employees</span>
//             </Link>
//           </li>
//           <li className="sidebar-item">
//             <Link to="/attendance" className="sidebar-link">
//               <i><BiCalendar /></i>
//               <span>Attendance</span>
//             </Link>
//           </li>
//           <li className="sidebar-item">
//             <Link to="/payroll" className="sidebar-link">
//               <i><BiMoney /></i>
//               <span>Payroll</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import React from "react";
// import { BiGrid, BiUser, BiCalendar, BiMoney, BiX } from "react-icons/bi";
// import { Link } from "react-router-dom";
// import "./Sidebar.css";
// import ERPLogo from '../assets/ERP_LOGO.jpg'; // Import ERP logo

// const Sidebar = () => {
//   return (
//     <div className="sidebar-wrapper">
//       {/* Sidebar Header */}
//       <div className="sidebar-header">
//         <div className="d-flex justify-content-between">
//           <div className="logo">
//             <a href="/">
//             <img src={ERPLogo} alt="Logo" 
//             width="100"
//             height="100"
//             // style={{ borderRadius: '50%' }} // Optional: Make the image circular
//           />
//             </a>
//           </div>
//           <div className="toggler">
//             <a href="#" className="sidebar-hide d-xl-none d-block">
//               <BiX className="bi-middle" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Sidebar Menu */}
//       <div className="sidebar-menu">
//         <ul className="menu">
//           <li className="sidebar-item">
//             <Link to="/dashboard" className="sidebar-link">
//               <i><BiGrid /></i>
//               <span>Dashboard</span>
//             </Link>
//           </li>
//           <li className="sidebar-item">
//             <Link to="/employees" className="sidebar-link">
//               <i><BiUser /></i>
//               <span>Employees</span>
//             </Link>
//           </li>
//           <li className="sidebar-item">
//             <Link to="/attendance" className="sidebar-link">
//               <i><BiCalendar /></i>
//               <span>Attendance</span>
//             </Link>
//           </li>
//           <li className="sidebar-item">
//             <Link to="/payroll" className="sidebar-link">
//               <i><BiMoney /></i>
//               <span>Payroll</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { BiGrid, BiUser, BiCalendar, BiMoney, BiX, BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import ERPLogo from "../assets/ERP_LOGO.jpg";

const Sidebar = () => {
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isPayrollOpen, setIsPayrollOpen] = useState(false);

  const toggleEmployees = () => setIsEmployeesOpen(!isEmployeesOpen);
  const toggleAttendance = () => setIsAttendanceOpen(!isAttendanceOpen);
  const togglePayroll = () => setIsPayrollOpen(!isPayrollOpen);

  return (
    <div className="sidebar-wrapper">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="d-flex justify-content-between">
          <div className="logo">
            <a href="/">
              <img src={ERPLogo} alt="Logo" width="100" height="100" />
            </a>
          </div>
          {/* <div className="toggler">
            <a href="#" className="sidebar-hide d-xl-none d-block">
              <BiX className="bi-middle" />
            </a>
          </div> */}
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        <ul className="menu">
          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link">
              <i><BiGrid /></i>
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Employees Section */}
          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={toggleEmployees}>
              <i><BiUser /></i>
              <span>Employees</span>
              <BiChevronDown className="dropdown-arrow" />
            </button>
          </li>
          {isEmployeesOpen && (
            <ul className="submenu">
              <li className="sidebar-item">
                <Link to="/employees/list" className="sidebar-link">Employee List</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/employees/add" className="sidebar-link">Add Employee</Link>
              </li>
            </ul>
          )}

          {/* Attendance Section */}
          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={toggleAttendance}>
              <i><BiCalendar /></i>
              <span>Attendance</span>
              <BiChevronDown className="dropdown-arrow" />
            </button>
          </li>
          {isAttendanceOpen && (
            <ul className="submenu">
              <li className="sidebar-item">
                <Link to="/attendance/report" className="sidebar-link">Attendance Report</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/attendance/manage" className="sidebar-link">Manage Attendance</Link>
              </li>
            </ul>
          )}

          {/* Payroll Section */}
          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={togglePayroll}>
              <i><BiMoney /></i>
              <span>Payroll</span>
              <BiChevronDown className="dropdown-arrow" />
            </button>
          </li>
          {isPayrollOpen && (
            <ul className="submenu">
              <li className="sidebar-item">
                <Link to="/payroll/salary" className="sidebar-link">Salary Details</Link>
              </li>
              <li className="sidebar-item">
                <Link to="/payroll/payslip" className="sidebar-link">Generate Payslip</Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
//  import { FaTachometerAlt, FaLayerGroup, FaCaretDown, FaTh, FaRegBell, FaTv, FaListAlt, FaPencilAlt, FaTimes } from 'react-icons/fa';
//  import { SiGoogleforms } from "react-icons/si";
//  import '../components/Sidebar.css';
 
//  function Sidebar({ isOpen, onClose }) {
//    const [isComponentsOpen, setIsComponentsOpen] = useState(false);
//    const [isExtraComponentsOpen, setIsExtraComponentsOpen] = useState(false);
//    const [isLayoutsOpen, setLayoutsOpen] = useState(false);
//    const [isFormElementsOpen, setFormElementsOpen] = useState(false);
//    const [isFormEditorOpen, setFormEditorOpen] = useState(false);
 
//    const toggleComponents = () => setIsComponentsOpen(!isComponentsOpen);
//    const toggleExtraComponents = () => setIsExtraComponentsOpen(!isExtraComponentsOpen);
//    const toggleLayouts = () => setLayoutsOpen(!isLayoutsOpen);
//    const toggleFormElements = () => setFormElementsOpen(!isFormElementsOpen);
//    const toggleFormEditor = () => setFormEditorOpen(!isFormEditorOpen);
 
//    return (
//      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//        <div className="sidebar-wrapper">
//           <div className="sidebar-header">
//              <div className="d-flex justify-content-between align-items-center">
//                <div className="logo">
//                  <a href="index.html">
//                    <img src="https://cdn-icons-png.flaticon.com/512/8214/8214212.png" alt="Logo" className="sidebar-logo-icon" style={{ width: '35px', height: '35px', marginRight: '10px' }}/> {/* Replaced FaUserCircle with img tag */}
//                     Mazer
//                  </a>
//                </div>
//                {isOpen && (
//                    <FaTimes className="sidebar-close-icon" onClick={onClose} />
//                )}
 
//              </div>
//            </div>
 
//          <li className="sidebar-title">Menu</li>
 
//          <ul className="sidebar-menu">
//            <li className="sidebar-item">
//              <button className="sidebar-button active">
//                <FaTh className="sidebar-icon" />
//                Dashboard
//              </button>
//            </li>
 
//            <li className="sidebar-item">
//              <button className="sidebar-button dropdown-button" onClick={toggleComponents}>
//                <FaLayerGroup className="sidebar-icon" />
//                Components
//                <FaCaretDown className="dropdown-arrow" />
//              </button>
//            </li>
//            {isComponentsOpen && (
//              <>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Alert
//                  </a>
//                </li>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Badge
//                  </a>
//                </li>
//              </>
//            )}
 
//            {/* Extra Components Section */}
//            <li className="sidebar-item">
//              <button className="sidebar-button dropdown-button" onClick={toggleExtraComponents}>
//                <FaRegBell className="sidebar-icon" />
//                Extra Components
//                <FaCaretDown className="dropdown-arrow" />
//              </button>
//            </li>
//            {isExtraComponentsOpen && (
//              <>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Sweet Alert
//                  </a>
//                </li>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Toastify
//                  </a>
//                </li>
//              </>
//            )}
 
//            {/* Layouts Section */}
//            <li className="sidebar-item">
//              <button className="sidebar-button dropdown-button" onClick={toggleLayouts}>
//                <FaTv className="sidebar-icon" />
//                Layouts
//                <FaCaretDown className="dropdown-arrow" />
//              </button>
//            </li>
//            {isLayoutsOpen && (
//              <>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Default Layout
//                  </a>
//                </li>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Vertical Layout
//                  </a>
//                </li>
//              </>
//            )}
 
//            <li className="sidebar-title">Forms & Tables</li>
//            {/* Form Elements Section */}
//            <li className="sidebar-item">
//              <button className="sidebar-button dropdown-button" onClick={toggleFormElements}>
//                <SiGoogleforms className="sidebar-icon" />
//                Form Elements
//                <FaCaretDown className="dropdown-arrow" />
//              </button>
//            </li>
//            {isFormElementsOpen && (
//              <>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Input
//                  </a>
//                </li>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    Select
//                  </a>
//                </li>
//              </>
//            )}
//            <li className="sidebar-item">
//              <a href="#" className="sidebar-text-item">
//                <FaListAlt className="sidebar-icon" />
//                Form Layout
//              </a>
//            </li>
//            {/* Form Editor Section */}
//            <li className="sidebar-item">
//              <button className="sidebar-button dropdown-button" onClick={toggleFormEditor}>
//                <FaPencilAlt className="sidebar-icon" />
//                Form Editor
//                <FaCaretDown className="dropdown-arrow" />
//              </button>
//            </li>
//            {isFormEditorOpen && (
//              <>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    CKEditor
//                  </a>
//                </li>
//                <li className="sidebar-item">
//                  <a href="#" className="sidebar-text-item">
//                    TinyMCE
//                  </a>
//                </li>
//              </>
//            )}
//          </ul>
//        </div>
//      </div>
//    );
//  }
 
//  export default Sidebar;