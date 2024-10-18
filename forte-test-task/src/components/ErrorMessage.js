import React from 'react';
import '../styles/components/error-message.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
        <p className="error-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;