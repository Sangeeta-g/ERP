// import React from "react";

// const NotFound = () => {
//   return (
//     <div className="not-found">
//       <h1>404 - Page Not Found</h1>
//       <p>The page you are looking for does not exist.</p>
//     </div>
//   );
// };

// export default NotFound;

import React from "react";

const NotFound = () => {
  return (
    <div className="error-page container">
      <div className="col-md-8 col-12 offset-md-2">
        <img
          className="img-error"
          src="https://themewagon.github.io/mazer/dist/assets/images/samples/error-404.png"
          alt="Not Found"
          width={400}
          height={400}
        />
        <div className="text-center">
          <h1 className="error-title">NOT FOUND</h1>
          <p className="fs-5 text-gray-600">
            The page you are looking for is not found.
          </p>
          <a href="/" className="btn btn-lg btn-outline-primary mt-3">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;