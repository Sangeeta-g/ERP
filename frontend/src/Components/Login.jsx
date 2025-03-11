import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import ERPLogo from '../assets/ERP_LOGO.jpg';
import { FaUser , FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing user, lock, eye, and eye-slash icons
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useUser } from '../UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const navigate = useNavigate(); // Initialize useNavigate
    const { loginUser } = useUser();  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password,
            });

            if (response.data.success) {
                const { first_name, last_name, role } = response.data;
                loginUser({ first_name, last_name, role }); // Store user data in context
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
                        case 'sales_manager':
                            navigate('/sales-manager');
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
                       
                    </div>
                    <div className="form-group mb-3 position-relative">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle input type
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        {/* Show/Hide Password Icon */}
                        <span 
                            className="password-toggle-icon" 
                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                   
                        <button type="submit" className="btn-primary btn-lg w-100">
                            Log in
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        
                        <p>
                            <a className="font-bold" href="auth-forgot-password.html">Forgot password?</a>
                        </p>
                    </div>
                </div>
    
                {/* Right Side - Blue Background */}
                <div className="auth-right"></div>
            </div>
        );
    };
    
    export default Login;