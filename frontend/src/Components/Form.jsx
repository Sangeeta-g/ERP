import React, { useState } from 'react';
import './Form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBuilding, faGlobe, faCity, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

function Form() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    city: '',
    country: '',
    company: '',
    email: '',
    rememberMe: true,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  // Handle Form Reset
  const handleReset = () => {
    setFormData({
      fname: '',
      lname: '',
      city: '',
      country: '',
      company: '',
      email: '',
      rememberMe: true,
    });
  };

  return (
    <div className="form-container">
      {/* Hamburger Menu for Sidebar */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Form Content */}
      <div className={`form-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <h1 className="form-title">User Information</h1>

        {/* Form */}
        <form className="form" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="fname">
              <FontAwesomeIcon icon={faUser} /> First Name
            </label>
            <input
              type="text"
              id="fname"
              className="form-control"
              placeholder="Enter First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lname">
              <FontAwesomeIcon icon={faUser} /> Last Name
            </label>
            <input
              type="text"
              id="lname"
              className="form-control"
              placeholder="Enter Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">
              <FontAwesomeIcon icon={faCity} /> City
            </label>
            <input
              type="text"
              id="city"
              className="form-control"
              placeholder="Enter City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">
              <FontAwesomeIcon icon={faGlobe} /> Country
            </label>
            <input
              type="text"
              id="country"
              className="form-control"
              placeholder="Enter Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          {/* Company */}
          <div className="form-group">
            <label htmlFor="company">
              <FontAwesomeIcon icon={faBuilding} /> Company
            </label>
            <input
              type="text"
              id="company"
              className="form-control"
              placeholder="Enter Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-check">
            <input
              type="checkbox"
              id="remember-me"
              className="form-check-input"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="remember-me">Remember Me</label>
          </div>

          {/* Form Buttons */}
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-light" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
