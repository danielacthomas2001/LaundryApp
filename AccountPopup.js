import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Popup from './Popup';
import PaymentPopup from './PaymentPopup';
import './AccountPopup.css';

const AccountPopup = ({ userData, setUserData, handleClose, reservations}) => {
  const [editedData, setEditedData] = useState({ ...userData });
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);

  const [paymentData, setPaymentData] = useState({
    cardNumber: '**** **** **** 1234',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    cvv: '***',
    billingAddress: '123 Main St, Anytown, AN 12345'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUserData(editedData);
    alert('Changes saved successfully!');
  };

  const togglePaymentPopup = () => {
    setPaymentPopupOpen(!isPaymentPopupOpen);
  };

  return (
    <Popup
      content={
        <div className="account-popup">
          <h2>Account Details</h2>
          <div className="user-info">
            <h3>Current Information</h3>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
          </div>
          <div className="edit-info">
            <h3>Edit Information</h3>
            <input
              type="text"
              name="firstName"
              value={editedData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={editedData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={editedData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          
          <div className="reservations-section">
            <h3>Your Reservations</h3>
            {reservations.length > 0 ? (
              <ul>
                {reservations.map(reservation => (
                  <li key={reservation.id}>
                    Machine {reservation.machineId} reserved for {reservation.time}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reservations yet.</p>
            )}
          </div>
          <div className="button-group">
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={togglePaymentPopup}>Payment Info</button>
          </div>

          <Link className={"link-styles"} to="/login"> <button>Log Out</button></Link>

          
          {isPaymentPopupOpen && (
            <PaymentPopup
              paymentData={paymentData}
              setPaymentData={setPaymentData}
              handleClose={togglePaymentPopup}
            />
          )}
        </div>
      }
      handleClose={handleClose}
      
    />

  );
};

export default AccountPopup;