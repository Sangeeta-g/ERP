import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",

    role: "",

    first_name: "",
    last_name: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    date_of_joining: "",
  });

  const handleChange = (e) => {

    let value = e.target.value;
    if (e.target.name === "salary") {
      value = Number(value); // Ensure salary is a number
    }
    setFormData({ ...formData, [e.target.name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/employees", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);

      alert("Failed to submit data: " + (error.response?.data?.error || error.message));

    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "400px", maxHeight: "90vh", overflowY: "auto" }}>
        <h2 className="text-center mb-4">Register User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">

            <label>Role</label>
            <select name="role" className="form-control" onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className="mb-3">

            <label>First Name</label>
            <input type="text" name="first_name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input type="text" name="last_name" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input type="text" name="phone" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Department</label>
            <input type="text" name="department" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Position</label>
            <input type="text" name="position" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Salary</label>
            <input type="number" name="salary" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Date of Joining</label>
            <input type="date" name="date_of_joining" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
