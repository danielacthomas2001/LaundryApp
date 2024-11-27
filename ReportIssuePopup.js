import React, { useState } from 'react';
import Popup from './Popup';
import './ReportIssuePopup.css';

const ReportIssuePopup = ({ userData, handleClose, selectedMachine }) => {
  const [reportData, setReportData] = useState({
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    machineNumber: {selectedMachine},
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send the report data to the server here
    console.log('Report submitted:', reportData);
    alert('Report submitted successfully!');
    handleClose();
  };

  return (
    <Popup
      content={
        <div className="report-issue-popup">
          <h2>Report an Issue</h2>
          <form onSubmit={handleSubmit}>
            <p>Machine Number: {selectedMachine}</p>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={reportData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Submit Report</button>
          </form>
        </div>
      }
      handleClose={handleClose}
    />
  );
};

export default ReportIssuePopup;