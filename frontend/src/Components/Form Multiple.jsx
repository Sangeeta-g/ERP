import React, { useState } from "react";
import "../Components/Form Multiple.css";
import Sidebar from "./Sidebar";

const FormMultiple = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    company: "",
    email: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      company: "",
      email: "",
      rememberMe: false,
    });
  };

  return (
    <div>
      <Sidebar />
      <section className="form-container">
        <h2 className="form-title">Multiple Column Form</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" placeholder="First Name" />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label className="form-label">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-input" placeholder="City" />
          </div>
          <div className="form-group">
            <label className="form-label">Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-input" placeholder="Country" />
          </div>
          <div className="form-group">
            <label className="form-label">Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input" placeholder="Company" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="Email" />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="form-checkbox" />
            <label className="form-label">Remember Me</label>
          </div>
          <div className="form-buttons">
            <button type="reset" onClick={handleReset} className="reset-btn form-button">Reset</button>
            <button type="submit" className="submit-btn form-button">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FormMultiple;
