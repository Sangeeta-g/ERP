// src/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if there's user data in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // Parse if exists, otherwise null
  });

  const loginUser = (userData) => {
    setUser(userData);  // Set user in context
    localStorage.setItem('user', JSON.stringify(userData));  // Save user data to localStorage
  };

  const logoutUser = () => {
    setUser(null);  // Clear user from context
    localStorage.removeItem('user');  // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
