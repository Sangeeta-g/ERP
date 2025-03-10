import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [employeeId, setEmployeeId] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [cameraStarted, setCameraStarted] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(null);
  const [logins, setLogins] = useState([]);
  const [loginTime, setLoginTime] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const webcamRef = useRef(null);

  // Start the camera when login is clicked
  const handleLogin = () => {
    if (!employeeId) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter an employee ID.',
        icon: 'error',
      });
      return;
    }

    setIsLogin(true);
    setCameraStarted(true);
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we capture your photo.',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Start the camera when logout is clicked
  const handleLogout = () => {
    const activeLogin = logins.find(
      (entry) => entry.employeeId === employeeId && entry.logoutTime === 'N/A'
    );

    if (!employeeId || !activeLogin) {
      Swal.fire({
        title: 'Error!',
        text: 'You are not logged in.',
        icon: 'error',
      });
      return;
    }

    setIsLogin(false);
    setCameraStarted(true);
    Swal.fire({
      title: 'Logging out...',
      text: 'Please wait while we capture your photo.',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000,
    });
  };

  // Capture picture (Login or Logout)
  const takePicture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageCaptured(imageSrc);
      setCameraStarted(false);

      const currentTime = new Date().toLocaleString();

      if (isLogin) {
        // Handle login
        setLoginStatus('Present');
        setLoginTime(new Date());

        setLogins([
          ...logins,
          {
            employeeId,
            loginTime: currentTime,
            logoutTime: 'N/A',
            loginStatus: 'Present',
            loginImage: imageSrc,
            logoutImage: null,
          },
        ]);

        Swal.fire({
          title: 'Login Successful!',
          text: `Employee ID: ${employeeId} has logged in.`,
          icon: 'success',
        });
      } else {
        // Handle logout
        const duration = loginTime ? Math.floor((new Date() - loginTime) / 1000) : 0;
        const durationMessage = `You were logged in for ${duration} seconds.`;

        setLogins((prevLogins) =>
          prevLogins.map((entry) =>
            entry.employeeId === employeeId && entry.logoutTime === 'N/A'
              ? {
                  ...entry,
                  logoutTime: currentTime,
                  logoutImage: imageSrc,
                  duration: durationMessage,
                  loginStatus: 'Absent',
                }
              : entry
          )
        );

        Swal.fire({
          title: 'Logout Successful!',
          text: `Employee ID: ${employeeId} has logged out. ${durationMessage}`,
          icon: 'success',
        });

        setLoginStatus('');
      }

      // Clear the employee ID input and reset image state
      setEmployeeId('');
      setImageCaptured(null);
    }
  };

  return (
    <div className="App">
      <h1>Employee Login System</h1>

      {/* Login Section */}
      <div className="login-form">
        <label>Employee ID:</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
        />
        <br />
        {!cameraStarted && !imageCaptured && (
          <button onClick={handleLogin}>Login</button>
        )}
        {loginStatus === 'Present' && !cameraStarted && !imageCaptured && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>

      {/* Camera Section */}
      {cameraStarted && (
        <div className="webcam-active">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
          />
          <button onClick={takePicture}>Take Picture</button>
        </div>
      )}

      {/* Display Captured Image */}
      {imageCaptured && <img src={imageCaptured} alt="Captured" width="150" />}

      {/* Login History Table */}
      <div className="login-details">
        <h2>Login History</h2>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Status</th>
              <th>Login Image</th>
              <th>Logout Image</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {logins.map((login, index) => (
              <tr key={index}>
                <td>{login.employeeId}</td>
                <td>{login.loginTime}</td>
                <td>{login.logoutTime}</td>
                <td>{login.loginStatus}</td>
                <td>
                  {login.loginImage && (
                    <img src={login.loginImage} alt="Login" width="100" />
                  )}
                </td>
                <td>
                  {login.logoutImage && (
                    <img src={login.logoutImage} alt="Logout" width="100" />
                  )}
                </td>
                <td>{login.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
