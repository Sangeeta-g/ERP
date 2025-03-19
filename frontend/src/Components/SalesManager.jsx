import React, { useEffect,useState } from 'react';
import './DashboardContent.css';
import { useUser } from '../UserContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserFriends, faUserPlus, faBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';


function SalesManager() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const { user } = useUser();  // Access the current user
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(`${user.first_name} ${user.last_name}`); // Setting user name based on user context
    }
  }, [user]);

  console.log(user)

  if (!user) {
    return <div>Please log in</div>;  // Handle the case if user is not logged in
  }

  return (
    <div
    className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : ""}`}
  >
    {/* Ensure button is rendering */}
    <div className="hamburger-menu" onClick={toggleSidebar}>
      <FontAwesomeIcon icon={faBars} />
    </div>

    {/* Sidebar (Conditionally Rendered) */}
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    <div className="dashboard-content">
      <div>
        <h2 className="leads-list-title">Welcome, {userName}</h2>
       
       
      </div>
    </div>
  </div>
  );
}

export default SalesManager;