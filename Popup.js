import React from 'react';
import './Popup.css';

const Popup = ({ content, handleClose }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>Close</span>
        {content}
      </div>
    </div>
  );
};

export default Popup;
