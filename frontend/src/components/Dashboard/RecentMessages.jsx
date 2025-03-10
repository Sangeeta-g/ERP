import React from "react";

const RecentMessages = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4>Recent Messages</h4>
      </div>
      <div className="card-content pb-4">
        <div className="recent-message d-flex px-4 py-3">
          <div className="avatar avatar-lg">
            <img src="https://themewagon.github.io/mazer/dist/assets/images/faces/4.jpg" 
            alt="User 1"
            width="60"
    height="60"
    style={{ borderRadius: '50%' }} // Optional: Make the image circular
  />
</div>
          <div className="name ms-4">
            <h5 className="mb-1">Hank Schrader</h5>
            <h6 className="text-muted mb-0">@johnducky</h6>
          </div>
        </div>
        <div className="recent-message d-flex px-4 py-3">
          <div className="avatar avatar-lg">
            <img src="https://themewagon.github.io/mazer/dist/assets/images/faces/5.jpg" alt="User 2" 
            width="60"
            height="60"
            style={{ borderRadius: '50%' }} // Optional: Make the image circular
            />
            </div>
          <div className="name ms-4">
            <h5 className="mb-1">Dean Winchester</h5>
            <h6 className="text-muted mb-0">@imdean</h6>
          </div>
        </div>
        <div className="recent-message d-flex px-4 py-3">
          <div className="avatar avatar-lg">
            <img src="https://themewagon.github.io/mazer/dist/assets/images/faces/1.jpg" alt="User 3" 
            width="60"
            height="60"
            style={{ borderRadius: '50%' }} // Optional: Make the image circular
            />
            </div>
          <div className="name ms-4">
            <h5 className="mb-1">John Dodol</h5>
            <h6 className="text-muted mb-0">@dodoljohn</h6>
          </div>
        </div>
        <div className="px-4">
          <button className="btn btn-block btn-xl btn-light-primary font-bold mt-3">
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentMessages;