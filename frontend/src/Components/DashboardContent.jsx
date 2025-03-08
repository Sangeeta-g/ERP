import React, { useState } from 'react';
import './DashboardContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserFriends, faUserPlus, faBookmark, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function DashboardContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: false, // Hide the title,
      },
    },
    scales: {
      x: {
        grid: {
          display: false // Hide x-axis grid lines
        }
      },
      y: {
        grid: {
          display: true // Show y-axis grid lines
        },
        ticks: {
          stepSize: 8, // Adjust step size to match the original image
          max: 32       // Set maximum value to match the original image
        }
      }
    }
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Profile Visits',
        data: [8, 19, 28, 19, 9, 19, 28, 19, 9, 19, 28, 19], // Replace with your actual data
        backgroundColor: 'rgba(75, 99, 200, 0.8)', // Match the color of the bars
      },
    ],
  };


  return (
    <div className="dashboard-container">
      {/* Hamburger Menu (Visible on smaller screens) */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Sidebar (Conditionally Rendered) */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className={`dashboard-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <h1 className="dashboard-title">Profile Statistics</h1>

        <div className="card-container">
          {/* Profile Views Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon profile-views-icon">
                <FontAwesomeIcon icon={faEye} />
              </div>
              <p className="card-title">Profile Views</p>
            </div>
            <p className="card-value">112.000</p>
          </div>

          {/* Followers Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon followers-icon">
                <FontAwesomeIcon icon={faUserFriends} />
              </div>
              <p className="card-title">Followers</p>
            </div>
            <p className="card-value">183.000</p>
          </div>

          {/* Following Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon following-icon">
                <FontAwesomeIcon icon={faUserPlus} />
              </div>
              <p className="card-title">Following</p>
            </div>
            <p className="card-value">80.000</p>
          </div>

          {/* Saved Post Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon saved-post-icon">
                <FontAwesomeIcon icon={faBookmark} />
              </div>
              <p className="card-title">Saved Post</p>
            </div>
            <p className="card-value">112</p>
          </div>

           {/* John Duck Card */}
          <div className="card">
            <div className="card-header">
              <img
                src="https://oshiprint.in/image/cache/catalog/poster/new/mqp1198-320x320h.jpeg.webp" //John Duck
                alt="John Duck"
                className="card-avatar"
              />
            </div>
            <p className="card-name">Micy Mouse</p>
            <p className="card-username">@Micymouse</p>
          </div>
        </div>

        {/* Chart and Messages Container */}
        <div className="chart-messages-container">
          {/* Profile Visit Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <h2 className="chart-title">Profile Visit</h2>
              <button className="chart-menu-button">
                ☰ {/* Replace with an actual menu icon if desired */}
              </button>
            </div>
            <Bar options={options} data={data} />
          </div>

          {/* Recent Messages Section */}
          <div className="messages-container">
            <h2 className="messages-title">Recent Messages</h2>

            {/* Message 1 */}
            <div className="message">
              <img
                src="https://i.pinimg.com/originals/b5/72/35/b572354c8f62912e81bb668d59259894.jpg" //Hank Avatar
                alt="Hank Schrader"
                className="avatar"
              />
              <div className="message-details">
                <p className="message-name">Hank Schrader</p>
                <p className="message-username">@johnducky</p>
              </div>
            </div>

            {/* Message 2 */}
            <div className="message">
              <img
                src="https://i.pinimg.com/originals/3a/74/5d/3a745d3dcba72feb73e44e399ec97bea.jpg" //Dean Avatar
                alt="Dean Winchester"
                className="avatar"
              />
              <div className="message-details">
                <p className="message-name">Dean Winchester</p>
                <p className="message-username">@imdean</p>
              </div>
            </div>

            {/* Message 3 */}
            <div className="message">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXxSIEk8I5dKEsml3mTc9-B3bt3JfvwlFdA&s" //Jessie Avatar
                alt="Jessie Pinkman"
                className="avatar"
              />
              <div className="message-details">
                <p className="message-name">Jessie Pinkman</p>
                <p className="message-username">@jpinkman</p>
              </div>
            </div>

               {/* Message 4 - NEW MESSAGE */}
               <div className="message">
                    <img
                        src="https://img.freepik.com/premium-photo/cartoon-boy-vibrant-yellow-hoodie-is-depicted-with-hyperrealistic-detail-soft-lighting_1283595-12365.jpg" // Saul Goodman Avatar
                        alt=" Goodman"
                        className="avatar"
                    />
                    <div className="message-details">
                        <p className="message-name"> Goodman</p>
                        <p className="message-username">@callsaul</p>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;