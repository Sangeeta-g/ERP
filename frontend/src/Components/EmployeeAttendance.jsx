import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./DashboardContent.css";
import { useUser } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignInAlt, faSignOutAlt, faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

function EmployeeAttendance() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (user && user.id) {
      fetchAttendance(user.id);
    }
  }, [user]);

  const fetchAttendance = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/hrm/attendance/${userId}`);
      setAttendanceRecords(response.data);

      // Check if today's record exists
      const today = new Date().toISOString().split("T")[0];
      const todayRecord = response.data.find((record) => record.date === today);
      setTodayRecord(todayRecord || null);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const openCamera = () => {
    console.log("Opening camera");
    setIsCameraOpen(true);
    setCapturedImage(null);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("Camera stream started");
        }
      })
      .catch((err) => console.error("Error accessing camera:", err));
  };
  
  const closeCamera = () => {
    console.log("Closing camera");
    setIsCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      console.log("Camera stream stopped");
    } else {
      console.log("No camera stream to stop");
    }
  };
  

  const capturePhoto = () => {
    console.log("Capture button clicked");
    if (videoRef.current && canvasRef.current) {
      console.log("Video and canvas references are available");
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvasRef.current.toDataURL("image/png");
      console.log("Captured image data:", imageData);
      setCapturedImage(imageData);
      closeCamera();
    } else {
      console.log("Video or canvas reference is not available");
    }
  };

  const handleLogin = async () => {
    if (!capturedImage) {
      alert("Please capture an image before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/hrm/attendance/check-in", {
        user_id: user.id,
        image: capturedImage,
      });

      alert("Check-in successful!");
      setCapturedImage(null);
      fetchAttendance(user.id);
    } catch (error) {
      console.error("Error checking in:", error);
      alert(error.response?.data?.message || "Check-in failed.");
    }
  };

  const handleLogout = async () => {
    if (!todayRecord) return;
    
    try {
      await axios.post("http://localhost:3000/api/hrm/attendance/check-out", {
        id: todayRecord.id,
      });

      alert("Check-out successful!");
      fetchAttendance(user.id);
    } catch (error) {
      console.error("Error checking out:", error);
      alert(error.response?.data?.message || "Check-out failed.");
    }
  };

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="dashboard-content">
        <h2 className="leads-list-title">Attendance</h2>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Login Time</th>
              <th>Login</th>
              <th>Image</th>
              <th>Logout Time</th>
              <th>Logout</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.check_in || "N/A"}</td>
                  <td>
                    {!record.check_in && (
                      <button className="btn login-btn" onClick={openCamera}>
                        <FontAwesomeIcon icon={faSignInAlt} /> Login
                      </button>
                    )}
                  </td>
                  <td>{record.image ? <img src={record.image} alt="Attendance" width="50" /> : "N/A"}</td>
                  <td>{record.check_out || "N/A"}</td>
                  <td>
                    {record.check_in && !record.check_out && (
                      <button className="btn logout-btn" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            
            {/* Show today's row if no record exists */}
            {!todayRecord && (
              <tr>
                <td>{new Date().toISOString().split("T")[0]}</td>
                <td>N/A</td>
                <td>
                  <button className="btn login-btn" onClick={openCamera}>
                    <FontAwesomeIcon icon={faSignInAlt} /> Login
                  </button>
                </td>
                <td>N/A</td>
                <td>N/A</td>
                <td>
                  <button className="btn logout-btn" disabled>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isCameraOpen && (
        <div className="camera-overlay">
          <div className="camera-container">
            <video ref={videoRef} autoPlay></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            <div className="camera-controls">
              <button className="btn capture-btn" onClick={capturePhoto}>
                <FontAwesomeIcon icon={faCamera} /> Capture
              </button>
              <button className="btn cancel-btn" onClick={closeCamera}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeAttendance;
