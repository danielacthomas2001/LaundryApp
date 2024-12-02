const database = require('../config/database_connection');
/*
class Reservation:
	attributes:
		reservationID
		userID
		machineID
		reservationTime
	methods:
		createReservation(userID, machineID, reservationTime):
			if machine status is available:
				create reservation
		else:
			return error

		cancelReservation(reservationID):
			delete reservation
			
*/
class Reservation {
    constructor(reservation_id, user_id, machine_id, reservation_time) {

        this.reservation_id = reservation_id;
        this.user_id = user_id;
        this.machine_id = machine_id;
        this.reservation_time = reservation_time;
    }
    static async createReservation(user_id, machine_id, reservation_time) {
        try {
            // Check if machine is available
            const query = 'SELECT status FROM LaundryMachine WHERE machine_id = ?';
            const [results] = await database.promise().execute(query, [machine_id]);

            if (results.length === 0) {
                throw new Error('Machine not found.');
            }

            const machine_status = results[0].status;

            if (machine_status !== 'Available') {
                throw new Error('Machine not available.');
            }

            // Create the reservation
            const reservationQuery = 'INSERT INTO Reservation (user_id, machine_id, reservation_time) VALUES (?, ?, ?)';
            const [reservationResult] = await database.promise().execute(reservationQuery, [user_id, machine_id, reservation_time]);
            console.log('Reservation insert result:', reservationResult);

            // Update machine status to 'Occupied'
            const updateMachineQuery = 'UPDATE LaundryMachine SET status = ? WHERE machine_id = ?';
            const [updateResult] = await database.promise().execute(updateMachineQuery, ['Occupied', machine_id]);
            console.log('Machine status update result:', updateResult);

            // Commit the transaction
            await database.promise().execute('COMMIT');

            // Return the new reservation object
            return new Reservation(reservationResult.insertId, user_id, machine_id, reservation_time);
        } catch (error) {
            console.error('Error in createReservation:', error);
            throw new Error('Failed to create reservation: ${error.message}');
        }
    }
    
    // Method to cancel a reservation
    static async cancelReservation(reservation_id) {
        try {
            // Get the reservation details
            const reservationQuery = 'select * from reservation where reservation_id = ?';
            const [reservationResults] = await database.promise().execute(reservationQuery, [reservation_id]);

            if (reservationResults.length === 0) {
                throw new Error('Reservation not found.');
            }

            const reservation = reservationResults[0];

            // Delete the reservation
            const deleteQuery = 'delete from reservation where reservation_id = ?';
            await database.promise().execute(deleteQuery, [reservation_id]);

            // Update the machine status back to 'Available'
            const updateMachineQuery = 'update laundrymachine set status = ? where machine_id = ?';
            await database.promise().execute(updateMachineQuery, ['Available', reservation.machine_id]);

            return true;

        } catch (error) {
            throw new Error(`Failed to cancel reservation: ${error.message}`);
        }
    }

    
}

module.exports = Reservation;

