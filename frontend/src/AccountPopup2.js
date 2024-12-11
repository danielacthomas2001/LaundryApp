// AccountPopup2.js
import React from 'react';
import './AccountPopup.css'; // Ensure you have appropriate styles

const AccountPopup = ({ userData, handleClose, reservations }) => {
  // Logout handler to clear user data and reload the app
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Close the popup
    handleClose();
    // Reload the page to reset application state
    window.location.reload();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Account Information</h2>
        
        {/* Display User Information */}
        <div className="user-info">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phone_num}</p>
        </div>
        
        {/* Optional: Display Reservations */}
        {reservations.length > 0 && (
          <div className="reservations-section">
            <h3>Your Reservations:</h3>
            <ul>
              {reservations.map(reservation => (
                <li key={reservation.id}>
                  Machine {reservation.machineId} reserved for {reservation.time}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Logout and Close Buttons */}
        <div className="button-group">
          <button onClick={handleLogout} className="logout-button">Logout</button>
          <button onClick={handleClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AccountPopup;
