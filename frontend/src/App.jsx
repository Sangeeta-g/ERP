import React from 'react';
import Sidebar from './components/sidebar';
import DashboardContent from './components/DashboardContent';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <DashboardContent />
      </div>
    </div>
  );
};

export default App;
