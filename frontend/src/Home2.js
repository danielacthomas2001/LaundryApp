// Home2.js
import React, { useState, useRef, useEffect } from 'react';
import Popup from './Popup';
import AccountPopup from './AccountPopup'; // Ensure this path is correct
import ReportIssuePopup from './ReportIssuePopup';
import ReservationPopup from './ReservationPopup';
import './Home.css';

function Home2() {
  const [isAccountOpen, setAccountOpen] = useState(false);
  const [isReportOpen, setReportOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isReservationOpen, setReservationOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [userData, setUserData] = useState(null); // Initialize as null

  useEffect(() => {
    // Fetch user data from localStorage when component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const isLoggedIn = userData !== null; // Define isLoggedIn based on userData

  const toggleAccountPopup = () => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      window.location.href = '/login';
    } else {
      setAccountOpen(!isAccountOpen);
    }
  };

  const toggleReportPopup = () => {
    setReportOpen(!isReportOpen);
  };

  const toggleReservationPopup = () => {
    setReservationOpen(!isReservationOpen);
  };

  const handleMachineSelect = (machineId) => {
    setSelectedMachine(machineId);
    console.log(`Laundry Machine ${machineId} selected`);
  };

  const changeMachineStatus = (machineId, newStatus) => {
    setMachines((prevMachines) =>
      prevMachines.map((machine) =>
        machine.id === machineId ? { ...machine, status: newStatus } : machine
      )
    );
  };

  const handleReservation = (machineId, reservationTime) => {
    addReservation(machineId, reservationTime);
    setReservationOpen(false);
  };

  const handlePayment = (machineId) => {
    alert('Payment Made Successfully!');
    changeMachineStatus(machineId, 'in use');
  };

  // Machine data
  const [machines, setMachines] = useState([
    { id: 1, status: 'available', price: 2.55, time_remaining: null },
    { id: 2, status: 'in use', price: 2.55, time_remaining: 29 },
    { id: 3, status: 'reserved', price: 2.55, time_remaining: 0 },
    { id: 4, status: 'available', price: 2.55, time_remaining: null },
    { id: 5, status: 'available', price: 2.55, time_remaining: null },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'green';
      case 'in use':
        return 'red';
      case 'reserved':
        return 'orange';
      case 'out of order':
        return 'red';
      default:
        return 'gray';
    }
  };

  const addReservation = (machineId, reservationTime) => {
    const newReservation = {
      machineId,
      time: reservationTime,
      id: Date.now(),
    };
    setReservations((prevReservations) => [...prevReservations, newReservation]);
    console.log(`Reservation added for Machine ${machineId} at ${reservationTime}`);
  };

  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return { total, hours, minutes };
  };

  const startTimer = (e) => {
    let { total, hours, minutes } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer('00:30:00');

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 30);
    return deadline;
  };

  useEffect(() => {
    const deadline = getDeadTime();
    clearTimer(deadline); // Pass calculated deadline
  }, []); // No additional dependencies

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
          <p>Status: {machines[selectedMachine - 1].status}</p>
          {machines[selectedMachine - 1].status === 'available' && (
            <div className="payment-info-toggle">
              <p>Price: ${machines[selectedMachine - 1].price}</p>
              <button onClick={() => handlePayment(selectedMachine)}>Pay for Load</button>
            </div>
          )}
          {machines[selectedMachine - 1].status === 'in use' && (
            <div className="time-info">
              <p>Time Remaining: {timer}</p>
            </div>
          )}
          <button onClick={toggleReservationPopup}>Reserve for Later</button>
          <button onClick={toggleReportPopup}>Report Issue</button>

          {isReportOpen && (
            <ReportIssuePopup
              userData={userData || { firstName: '', lastName: '', email: '' }}
              handleClose={toggleReportPopup}
              selectedMachine={selectedMachine}
            />
          )}
        </div>
      )}

      <button onClick={toggleAccountPopup}>Account</button>

      {isAccountOpen && isLoggedIn && (
        <AccountPopup
          userData={userData}
          setUserData={setUserData}
          handleClose={toggleAccountPopup}
          reservations={reservations}
        />
      )}

      {isReservationOpen && (
        <ReservationPopup
          machineId={selectedMachine}
          handleClose={toggleReservationPopup}
          onReserve={handleReservation}
        />
      )}
    </div>
  );
}

export default Home2;
