const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

const authRoutes = require('../routes/auth.js');
const maintenanceRoutes = require('../routes/maintenance.js');
app.use('/maintenance', maintenanceRoutes);
app.use('/auth', authRoutes);

app.listen(8080, () => {
    console.log('server listening on port 8080');
})