import React, { useState } from 'react';
import { FaTachometerAlt, FaLayerGroup, FaCaretDown, FaTh, FaRegBell, FaTv, FaListAlt, FaPencilAlt, FaTimes, FaTable } from 'react-icons/fa';
import { SiGoogleforms } from "react-icons/si";
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import '../components/Sidebar.css';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const [isComponentsOpen, setIsComponentsOpen] = useState(false);
  const [isExtraComponentsOpen, setIsExtraComponentsOpen] = useState(false);
  const [isLayoutsOpen, setLayoutsOpen] = useState(false);
  const [isFormElementsOpen, setFormElementsOpen] = useState(false);
  const [isFormEditorOpen, setFormEditorOpen] = useState(false);

  const toggleComponents = () => setIsComponentsOpen(!isComponentsOpen);
  const toggleExtraComponents = () => setIsExtraComponentsOpen(!isExtraComponentsOpen);
  const toggleLayouts = () => setLayoutsOpen(!isLayoutsOpen);
  const toggleFormElements = () => setFormElementsOpen(!isFormElementsOpen);
  const toggleFormEditor = () => setFormEditorOpen(!isFormEditorOpen);

  // Handle navigation to DataTable
  const goToDataTable = () => {
    navigate("/datatable");  // Navigate to DataTable page
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-wrapper">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              <a href="index.html">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8214/8214212.png"
                  alt="Logo"
                  className="sidebar-logo-icon"
                  style={{ width: '35px', height: '35px', marginRight: '10px' }}
                />
                Mazer
              </a>
            </div>
            {isOpen && (
              <FaTimes className="sidebar-close-icon" onClick={onClose} />
            )}
          </div>
        </div>

        <li className="sidebar-title">Menu</li>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <button className="sidebar-button active">
              <FaTh className="sidebar-icon" />
              Dashboard
            </button>
          </li>

          <li className="sidebar-item">
            <button className="sidebar-button" onClick={goToDataTable}>
              <FaTable className="sidebar-icon" />
              DataTable
            </button>
          </li>

          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={toggleComponents}>
              <FaLayerGroup className="sidebar-icon" />
              Components
              <FaCaretDown className="dropdown-arrow" />
            </button>
          </li>
          {isComponentsOpen && (
            <>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Alert
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Badge
                </a>
              </li>
            </>
          )}

          {/* Extra Components Section */}
          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={toggleExtraComponents}>
              <FaRegBell className="sidebar-icon" />
              Extra Components
              <FaCaretDown className="dropdown-arrow" />
            </button>
          </li>
          {isExtraComponentsOpen && (
            <>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Sweet Alert
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Toastify
                </a>
              </li>
            </>
          )}

          {/* Layouts Section */}
          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={toggleLayouts}>
              <FaTv className="sidebar-icon" />
              Layouts
              <FaCaretDown className="dropdown-arrow" />
            </button>
          </li>
          {isLayoutsOpen && (
            <>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Default Layout
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Vertical Layout
                </a>
              </li>
            </>
          )}

          <li className="sidebar-title">Forms & Tables</li>
          {/* Form Elements Section */}
          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={toggleFormElements}>
              <SiGoogleforms className="sidebar-icon" />
              Form Elements
              <FaCaretDown className="dropdown-arrow" />
            </button>
          </li>
          {isFormElementsOpen && (
            <>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Input
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  Select
                </a>
              </li>
            </>
          )}
          <li className="sidebar-item">
            <a href="#" className="sidebar-text-item">
              <FaListAlt className="sidebar-icon" />
              Form Layout
            </a>
          </li>

          {/* Form Editor Section */}
          <li className="sidebar-item">
            <button className="sidebar-button dropdown-button" onClick={toggleFormEditor}>
              <FaPencilAlt className="sidebar-icon" />
              Form Editor
              <FaCaretDown className="dropdown-arrow" />
            </button>
          </li>
          {isFormEditorOpen && (
            <>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  CKEditor
                </a>
              </li>
              <li className="sidebar-item">
                <a href="#" className="sidebar-text-item">
                  TinyMCE
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;