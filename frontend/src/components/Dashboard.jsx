// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaHome, FaUsers, FaCalendarCheck, FaMoneyBill } from "react-icons/fa";

// const Dashboard = () => (
//     <div>
//         <h2>Dashboard</h2>
//         <div className="row">
//             <div className="col-md-4">
//                 <div className="card text-bg-primary p-3">
//                     <h5>Total Employees</h5>
//                     <p>100</p>
//                 </div>
//             </div>
//             <div className="col-md-4">
//                 <div className="card text-bg-success p-3">
//                     <h5>Attendance Today</h5>
//                     <p>85 Present</p>
//                 </div>
//             </div>
//             <div className="col-md-4">
//                 <div className="card text-bg-warning p-3">
//                     <h5>Pending Payroll</h5>
//                     <p>₹ 5,00,000</p>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// const Employees = () => <h2>Employees Page</h2>;
// const Attendance = () => <h2>Attendance Page</h2>;
// const Payroll = () => <h2>Payroll Page</h2>;

// const ErpDashboard = () => {
//     return (
//         <Router>
//             <div className="d-flex">
//                 {/* Sidebar */}
//                 <div className="sidebar p-3 bg-dark text-white" style={{ width: "250px", height: "100vh", position: "fixed" }}>
//                     <h4 className="text-center">ERP System</h4>
//                     <Link to="/" className="d-block text-white p-2"><FaHome /> Dashboard</Link>
//                     <Link to="/employees" className="d-block text-white p-2"><FaUsers /> Employees</Link>
//                     <Link to="/attendance" className="d-block text-white p-2"><FaCalendarCheck /> Attendance</Link>
//                     <Link to="/payroll" className="d-block text-white p-2"><FaMoneyBill /> Payroll</Link>
//                 </div>
                
//                 {/* Main Content */}
//                 <div className="content" style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
//                     <Routes>
//                         <Route path="/" element={<Dashboard />} />
//                         <Route path="/employees" element={<Employees />} />
//                         <Route path="/attendance" element={<Attendance />} />
//                         <Route path="/payroll" element={<Payroll />} />
//                     </Routes>
//                 </div>
//             </div>
//         </Router>
//     );
// };

// export default ErpDashboard;

// import React from "react";

// const Dashboard = () => {
//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <p>Welcome to the ERP Dashboard!</p>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import "./Dashboard.css"; // Import the CSS file
import StatsCard from "./Dashboard/StatsCard";
import ProfileVisitChart from "./Dashboard/ProfileVisitChart";
import VisitorsProfile from "./Dashboard/VisitorsProfile";
import RecentMessages from "./Dashboard/RecentMessages";
import LatestComments from "./Dashboard/LatestComments";

const Dashboard = () => {
  return (
    <section className="row">
      <div className="col-12 col-lg-9">

        {/* Added Profile Statistics heading */}
        <h3 className="mb-4">Profile Statistics</h3>

        <div className="row">
          <StatsCard
            icon="bi bi-grid-fill"
            title="Profile Views"
            value="112.000"
            color="purple"
          />
          <StatsCard
            icon="bi bi-stack"
            title="Followers"
            value="183.000"
            color="blue"
          />
          <StatsCard
            icon="bi bi-collection-fill"
            title="Following"
            value="80.000"
            color="green"
          />
          <StatsCard
            icon="bi bi-hexagon-fill"
            title="Saved Post"
            value="112"
            color="red"
          />
        </div>
        <div className="row">
          <ProfileVisitChart />
        </div>
        <div className="row">
          <LatestComments />
        </div>
      </div>
      <div className="col-12 col-lg-3">
        <div className="card">
          <div className="card-body py-4 px-5">
            <div className="d-flex align-items-center">
            <div className="avatar avatar-xl">
  <img
    src="https://themewagon.github.io/mazer/dist/assets/images/faces/1.jpg" // Replace with your online image URL
    alt="User"
    width="60"
    height="60"
    style={{ borderRadius: '50%' }} // Optional: Make the image circular
  />
</div>
              <div className="ms-3 name">
                <h5 className="font-bold">John Duck</h5>
                <h6 className="text-muted mb-0">@johnducky</h6>
              </div>
            </div>
          </div>
        </div>
        <RecentMessages />
        <VisitorsProfile />
      </div>
    </section>
  );
};

export default Dashboard;