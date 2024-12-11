const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/maintenanceRequest');

// Route to submit a new maintenance request
router.post('/report', async (req, res) => {
    const { machine_id, issue_description } = req.body;

    try {
        // Call the submitRequest method from the MaintenanceRequest class
        const maintenanceRequest = await MaintenanceRequest.submitRequest(machine_id, issue_description);

        res.status(201).json({
            message: 'Maintenance request submitted successfully!',
            request: maintenanceRequest,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
