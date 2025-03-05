import React from 'react';

function PageNotFound() {
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 d-flex justify-content-center align-items-center flex-column mt-5">
          <img
            className="w-75 mt-5" style={{height:400}}
            src="https://png.pngtree.com/png-vector/20210221/ourmid/pngtree-error-404-not-found-glitch-effect-png-image_2928215.jpg"
            alt="Page not found"
          />
          <h2 className='mt-4'>Looks like you're lost!</h2>
          <h4 className="mt-3">The page you are looking for is unavailable.</h4>
          <button
            className="btn btn-success rounded-0 mt-4 mb-4"
            
          >
            Go Home
          </button>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default PageNotFound;
