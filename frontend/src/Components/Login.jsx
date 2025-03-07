import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import ERPLogo from '../assets/ERP_LOGO.jpg';
import { FaUser , FaLock } from 'react-icons/fa'; // Importing user and lock icons from react-icons
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2'; // Import SweetAlert2

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password,
            });

            if (response.data.success) {
                console.log('Login successful! Role:', response.data.role);
                // Show success alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successful!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    // Redirect based on user role
                    switch (response.data.role) {
                        case 'admin':
                            navigate('/admin-portal'); // Redirect to admin portal
                            break;
                        case 'HR':
                            navigate('/hr-portal'); // Redirect to HR portal
                            break;
                        case 'employee':
                            navigate('/employee-portal'); // Redirect to employee portal
                            break;
                        default:
                            navigate('/'); // Default redirect
                    }
                });
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
            console.error(err);
            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Invalid credentials. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="auth-container">
            {/* Left Side - Login Form */}
            <div id="auth-left" className="d-flex flex-column justify-content-center">
                <div className="auth-logo mb-4">
                    <a href="index.html">
                        <img src={ERPLogo} alt="Logo" className="logo-img" />
                    </a>
                </div>

                <h1 className="auth-title">Log in.</h1>
                <p className="auth-subtitle mb-4">
                    Log in with your data that you entered during registration.
                </p>

                {error && <p className="text-danger">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3 position-relative">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FaUser  className="form-control-icon" />
                    </div>
                    <div className="form-group mb-3 position-relative">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="form-control-icon" />
                    </div>
                    <div className="form-check mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={keepLoggedIn}
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Keep me logged in
                        </label>
                    </div>
                    <button type="submit" className="btn-primary btn-lg w-100">
                        Log in
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don't have an account? <a href="auth-register.html" className="font-bold">Sign up</a>.
                    </p>
                    <p>
                        <a className="font-bold" href="auth-forgot-password.html">Forgot password?</a>.
                    </p>
                </div>
            </div>

            {/* Right Side - Blue Background */}
            <div className="auth-right"></div>
        </div>
    );
};

export default Login;