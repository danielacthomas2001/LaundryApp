const database = require('../config/database_connection');

class MaintenanceRequest {
    constructor(request_id, machine_id, issue_description, maintenance_status = 'Working on it') {
        this.request_id = request_id;
        this.machine_id = machine_id;
        this.issue_description = issue_description;
        this.maintenance_status = maintenance_status;
    }

    // Method to submit a new maintenance request
    static async submitRequest(machine_id, issue_description) {
        try {
            // Check if the machine exists
            const machineQuery = 'SELECT * FROM laundrymachine WHERE machine_id = ?';
            const [machineResults] = await database.promise().execute(machineQuery, [machine_id]);

            if (machineResults.length === 0) {
                throw new Error('Machine not found.');
            }

            // Insert the new maintenance request
            const insertQuery = `INSERT INTO maintenance_request (machine_id, issue_description, maintenance_status) VALUES (?, ?, ?)`;
            const [insertResult] = await database.promise().execute(insertQuery, [machine_id, issue_description, 'Working on it']);

            // Return the new maintenance request object
            return new MaintenanceRequest(insertResult.insertId, machine_id, issue_description, 'Working on it');
        } catch (error) {
            console.error('Error in submitRequest:', error);
            throw new Error(`Failed to submit maintenance request: ${error.message}`);
        }
    }

    // Method to change the status of a maintenance request
    static async changeRequestStatus(request_id, new_status) {
        try {
            // Validate the new status
            const validStatuses = ['Working on it', 'Fixed'];
            if (!validStatuses.includes(new_status)) {
                throw new Error(`Invalid status. Valid statuses are: ${validStatuses.join(', ')}`);
            }

            // Check if the maintenance request exists
            const requestQuery = 'SELECT * FROM maintenance_request WHERE request_id = ?';
            const [requestResults] = await database.promise().execute(requestQuery, [request_id]);

            if (requestResults.length === 0) {
                throw new Error('Maintenance request not found.');
            }

            // Update the maintenance status
            const updateQuery = 'UPDATE maintenance_request SET maintenance_status = ? WHERE request_id = ?';
            await database.promise().execute(updateQuery, [new_status, request_id]);

            // Optionally, return the updated maintenance request object
            const updatedRequest = requestResults[0];
            updatedRequest.maintenance_status = new_status;

            return new MaintenanceRequest(
                updatedRequest.request_id,
                updatedRequest.machine_id,
                updatedRequest.issue_description,
                updatedRequest.maintenance_status
            );
        } catch (error) {
            console.error('Error in changeRequestStatus:', error);
            throw new Error(`Failed to change maintenance request status: ${error.message}`);
        }
    }

    
    
}

module.exports = MaintenanceRequest;
