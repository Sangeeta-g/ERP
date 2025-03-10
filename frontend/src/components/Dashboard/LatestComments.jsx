import React from "react";

const LatestComments = () => {
  return (
    <div className="col-12 col-xl-8">
      <div className="card">
        <div className="card-header">
          <h4>Latest Comments</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-lg">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="col-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-md">
                        <img src="https://themewagon.github.io/mazer/dist/assets/images/faces/5.jpg" alt="User 1" 
                        width="60"
                        height="60"
                        style={{ borderRadius: '50%' }} // Optional: Make the image circular
                        />
                        </div>
                      <p className="font-bold ms-3 mb-0">Si Cantik</p>
                    </div>
                  </td>
                  <td className="col-auto">
                    <p className="mb-0">Congratulations on your graduation!</p>
                  </td>
                </tr>
                <tr>
                  <td className="col-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-md">
                        <img src="https://themewagon.github.io/mazer/dist/assets/images/faces/2.jpg" alt="User 2" 
                        width="60"
                        height="60"
                        style={{ borderRadius: '50%' }} // Optional: Make the image circular
                        />
                        </div>
                      <p className="font-bold ms-3 mb-0">Si Ganteng</p>
                    </div>
                  </td>
                  <td className="col-auto">
                    <p className="mb-0">
                      Wow amazing design! Can you make another tutorial for this
                      design?
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestComments;