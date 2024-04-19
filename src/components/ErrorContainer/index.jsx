import React from "react";
import "./index.css";

const ErrorContainer = (props) => {
  const { retryCallback } = props;

  return (
    <div className="error-container">
      <div className="error-info-container">
        <img
          src="https://res.cloudinary.com/diuvnny8c/image/upload/v1713509975/alert-triangle_yf15nr.png"
          alt="error-logo"
          className="error-logo"
        />
        <p className="error-info">Something went wrong. Please try again</p>
        <button className="try-again-btn" onClick={() => retryCallback()}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorContainer;
