import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess, onLogoutSuccess, onClose }) => {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleCaptureImage = () => {
    return webcamRef.current.getScreenshot();
  };

  const handleSubmitLogin = async () => {
    const imageSrc = handleCaptureImage();
    const currentTime = new Date().toLocaleTimeString();
    const formData = new FormData();
    formData.append('image', dataURLtoFile(imageSrc, 'checkin.jpg'));
    formData.append('employee_id', 1);
    formData.append('check_in', currentTime);

    try {
      const response = await axios.post('http://localhost:3001/api/check-in', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onLoginSuccess(response.data);
    } catch (error) {
      alert('Error checking in');
    }
  };

  const handleSubmitLogout = async () => {
    const imageSrc = handleCaptureImage();
    const currentTime = new Date().toLocaleTimeString();
    const formData = new FormData();
    formData.append('image', dataURLtoFile(imageSrc, 'checkout.jpg'));
    formData.append('employee_id', 1);
    formData.append('check_out', currentTime);

    try {
      const response = await axios.post('http://localhost:3001/api/check-out', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onLogoutSuccess(response.data);
    } catch (error) {
      alert('Error checking out');
    }
  };

  return (
    <div className="login-form">
      <h2>Login Form</h2>
      {!showCamera ? (
        <button onClick={() => setShowCamera(true)}>Start Camera</button>
      ) : (
        <>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width="100%" />
          <button onClick={handleSubmitLogin}>Check In</button>
          <button onClick={handleSubmitLogout}>Check Out</button>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const LoginPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/attendance');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching attendance');
    }
  };

  return (
    <div>
      <h2>Face Recognition Attendance</h2>
      <button onClick={() => setShowLoginForm(true)}>Open Login Form</button>
      {showLoginForm && (
        <LoginForm
          onLoginSuccess={fetchRecords}
          onLogoutSuccess={fetchRecords}
          onClose={() => setShowLoginForm(false)}
        />
      )}
      <h3>Attendance Records</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Check-In Image</th>
            <th>Check-Out Image</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.check_in}</td>
              <td>{record.check_out || 'N/A'}</td>
              <td>{record.status}</td>
              <td><img src={`http://localhost:3001${record.check_in_image}`} alt="Check-In" width="100" /></td>
              <td>{record.check_out_image ? <img src={`http://localhost:3001${record.check_out_image}`} alt="Check-Out" width="100" /> : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) { u8arr[n] = bstr.charCodeAt(n); }
  return new File([u8arr], filename, { type: mime });
}

export default LoginPage;