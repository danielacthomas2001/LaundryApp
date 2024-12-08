import React, { useState } from 'react';
import Popup from './Popup';
import AccountPopup from './AccountPopup';
import ReportIssuePopup from './ReportIssuePopup';
import ReservationPopup from './ReservationPopup';
import './App.css';

// connection part
import axios from 'axios';

function App() {
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [isReportOpen, setReportOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);  
  const [isReservationOpen, setReservationOpen] = useState(false);

  // test api call to the server
  const apiCall = () => {
    axios.get('http://localhost:8080').then(() => {
      console.log('woo!')
    })
  }

  const toggleAccountPopup = () => {
    setAccountOpen(!isAccountOpen);
  };

  const toggleReportPopup = () => {
    setReportOpen(!isReportOpen);
  };

  const toggleReservationPopup = () => {
    setReservationOpen(!isReservationOpen);
  };

  const handleMachineSelect = (machineId) => {
    setSelectedMachine(machineId);
    //Fetch and display information about the selected machine here
    console.log(`Laundry Machine ${machineId} selected`);
  };

  const changeMachineStatus = (machineId, newStatus) => {
    setMachines(prevMachines =>
      prevMachines.map(machine =>
        machine.id === machineId ? { ...machine, status: newStatus } : machine
      )
    );
  };

  const handleReservation = (machineId, reservationTime) => {
    console.log(`Machine ${machineId} reserved for ${reservationTime}`);
    changeMachineStatus(machineId, 'reserved');
    //Send reservation to the server here
  };

  const handlePayment = (machineId) => {
    alert('Payment Made Successfully!');
    changeMachineStatus(machineId, 'in-use')
  };

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  });


  // Mock machine data
  const [machines, setMachines] = useState([
    { id: 1, status: 'available', price: 2.00},
    { id: 2, status: 'in-use', price: 2.25 },
    { id: 3, status: 'reserved', price: 2.00 }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'green';
      case 'in-use':
        return 'red';
      case 'reserved':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <div className="App">
      
      <div className="laundry-menu">
        <h2>Select a Laundry Machine:</h2>
        <div className="machine-buttons">
          {machines.map((machine) => (
            <button 
              key={machine.id}
              onClick={() => handleMachineSelect(machine.id)}
              className={`machine-button ${machine.status}`}
            >
              Machine {machine.id}
              <span 
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(machine.status) }}
              ></span>
            </button>
          ))}
        </div>
      </div> 
       {selectedMachine && (
        <div className="selected-machine-info">
          <h3>Machine {selectedMachine}</h3>
            <p>Status: {machines[selectedMachine-1].status}
            </p>
            <button onClick={toggleReservationPopup}>Reserve for Later</button>
            <button onClick={toggleReportPopup}>Report Issue</button>
            {machines[selectedMachine-1].status == 'available' && (
              <button onClick={() => handlePayment(selectedMachine)}>Pay for Load</button>
            )}
            {isReportOpen && (
              <ReportIssuePopup
              userData={userData}
              handleClose={toggleReportPopup}          
              selectedMachine={selectedMachine}
              />
              )}
        </div>
      )}

      <button onClick={toggleAccountPopup}>Account</button>

      {isAccountOpen && (
        <AccountPopup
          userData={userData}
          setUserData={setUserData}
          handleClose={toggleAccountPopup}
        />
      )}


      {isReservationOpen && (
        <ReservationPopup
          userData={userData}
          machineId={selectedMachine}
          handleClose={toggleReservationPopup}
          onReserve={handleReservation}
        />
      )}
    </div>
  );
}

export default App;
