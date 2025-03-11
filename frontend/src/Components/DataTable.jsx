import React, { useState } from 'react';
import './DashboardContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './sidebar';

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const data = [
    { name: 'Graiden', email: 'vehicula.aliquet@semconsequat.co.uk', phone: '076 4820 8838', city: 'Offenburg', status: 'Active' },
    { name: 'Dale', email: 'fringilla.euismod.enim@quam.ca', phone: '0500 527693', city: 'New Quay', status: 'Active' },
    { name: 'Nathaniel', email: 'mi.Duis@diam.edu', phone: '(012165) 76278', city: 'Grumo Appula', status: 'Inactive' },
    { name: 'Darius', email: 'velit@nec.com', phone: '0309 690 7871', city: 'Ways', status: 'Active' },
    { name: 'Oleg', email: 'rhoncus.id@Aliquamauctorvelit.net', phone: '0500 441046', city: 'Rossignol', status: 'Active' },
    { name: 'Kermit', email: 'diam.Sed.diam@anteVivamusnon.org', phone: '(01653) 27844', city: 'Patna', status: 'Active' },
    { name: 'Jermaine', email: 'sodales@nuncsit.org', phone: '0800 528324', city: 'Mold', status: 'Active' },
    { name: 'Ferdinand', email: 'gravida.molestie@tinciduntadipiscing.org', phone: '(016977) 4107', city: 'Marlborough', status: 'Inactive' },
    { name: 'Kuame', email: 'Quisque.purus@mauris.org', phone: '(0151) 561 8896', city: 'Tresigallo', status: 'Active' },
    { name: 'Deacon', email: 'Duis.a.mi@sociisnatoquepenatibus.com', phone: '07740 599321', city: 'Karapınar', status: 'Active' },
  ];

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className="dashboard-container">
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      
      <div className={`dashboard-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <h1 className="dashboard-title">User Data Table</h1>
        
        <div className="table-controls d-flex justify-content-between">
          <div>
            <select
              className="form-select"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              {[5, 10, 15, 20, 25].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="search-box">

            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="dataTable-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.city}</td>
                  <td>
                    <span className={`badge bg-${item.status === "Active" ? "success" : "danger"}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dataTable-bottom d-flex justify-content-between">
          <div>Showing {currentPage} to {Math.min(currentPage * entriesPerPage, filteredData.length)} of {filteredData.length} entries</div>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>‹</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>›</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
