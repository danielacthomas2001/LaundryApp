import React, { useState } from 'react';
import Popup from './Popup';
import './PaymentPopup.css';

const PaymentPopup = ({ paymentData, setPaymentData, handleClose }) => {
  const [editedPaymentData, setEditedPaymentData] = useState({ ...paymentData });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPaymentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    setPaymentData(editedPaymentData);
    setIsEditing(false);
    alert('Payment information updated successfully!');
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Popup
      content={
        <div className="payment-popup">
          <h2>Payment Information</h2>
          {isEditing ? (
            <div className="edit-payment-info">
              <input
                type="text"
                name="cardNumber"
                value={editedPaymentData.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
              />
              <input
                type="text"
                name="cardHolder"
                value={editedPaymentData.cardHolder}
                onChange={handleChange}
                placeholder="Card Holder Name"
              />
              <input
                type="text"
                name="expiryDate"
                value={editedPaymentData.expiryDate}
                onChange={handleChange}
                placeholder="Expiry Date (MM/YY)"
              />
              <input
                type="text"
                name="cvv"
                value={editedPaymentData.cvv}
                onChange={handleChange}
                placeholder="CVV"
              />
              <textarea
                name="billingAddress"
                value={editedPaymentData.billingAddress}
                onChange={handleChange}
                placeholder="Billing Address"
              />
              <div className="button-group">
                <button onClick={handleSave}>Save Changes</button>
                <button onClick={toggleEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="view-payment-info">
              <p><strong>Card Number:</strong> {paymentData.cardNumber}</p>
              <p><strong>Card Holder:</strong> {paymentData.cardHolder}</p>
              <p><strong>Expiry Date:</strong> {paymentData.expiryDate}</p>
              <p><strong>CVV:</strong> {paymentData.cvv}</p>
              <p><strong>Billing Address:</strong> {paymentData.billingAddress}</p>
              <button onClick={toggleEdit}>Edit Payment Info</button>
            </div>
          )}
        </div>
      }
      handleClose={handleClose}
    />
  );
};

export default PaymentPopup;