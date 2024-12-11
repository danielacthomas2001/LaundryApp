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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8080/maintenance/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                machine_id: selectedMachine, // Pass the machine ID
                issue_description: reportData.message, // Use the message from the form
            }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Report submitted successfully!');
            console.log('Maintenance Request:', result.request);
            handleClose();
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error);
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
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