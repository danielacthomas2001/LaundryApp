import React, { useState } from 'react';
import Popup from './Popup';
import './ReservationPopup.css';

const ReservationPopup = ({machineId, handleClose, onReserve }) => {
  const [reservationTime, setReservationTime] = useState('');

  const handleReserve = () => {
    if (reservationTime) {
      onReserve(machineId, reservationTime);
      alert('Reservation Made Successfully!');
      handleClose();
    } else {
      alert('Please select a reservation time.');
    }
  };

  return (
    <Popup
      content={
        <div className="reservation-popup">
          <h2>Reserve Machine: {machineId}</h2>
          <div className="form-group">
            <label htmlFor="reservationTime">Select Reservation Time:</label>
            <input
              type="datetime-local"
              id="reservationTime"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
            />
          </div>
          <button onClick={handleReserve}>Confirm Reservation</button>
        </div>
      }
      handleClose={handleClose}
    />
  );
};

export default ReservationPopup;
