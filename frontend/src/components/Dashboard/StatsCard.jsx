import React from "react";

const StatsCard = ({ icon, title, value, color }) => {
  return (
    <div className="col-6 col-lg-3 col-md-6">
      <div className="card">
        <div className="card-body px-3 py-4-5">
          <div className="row">
            <div className="col-md-4">
              <div className={`stats-icon ${color}`}>
                <i className={icon}></i>
              </div>
            </div>
            <div className="col-md-8">
              <h6 className="text-muted font-semibold">{title}</h6>
              <h6 className="font-extrabold mb-0">{value}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;