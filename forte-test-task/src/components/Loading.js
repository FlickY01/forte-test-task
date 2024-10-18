import React from 'react';
import { ClipLoader } from 'react-spinners'; 
import '../styles/components/loading.scss';

const Loading = ({ size = 60, color = '#007bff' }) => {
  return (
    <div className="loading-container">
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default Loading;