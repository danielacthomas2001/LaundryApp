const express = require('express');
const router = express.Router(); //creates router object to define route handlers for path segment
const User = require('../models/user.js');


router.post('/register', async (req, res) => {
    //frontend should send email, password, and num
    const { email, password, phone_num } = req.body;
    try {
        const userId = await User.register(email, password, phone_num);
        res.status(201).json({ userId, message: 'User registered successfully'});
    } catch (error) {
        //If an error occurs send back a 400 with the error message (defined in user class)
        res.status(400).json({error: error.message});
    }
});


router.post('/login', async (req, res) => {
    //frontend sends email and password
    const { email, password } = req.body;
    try{


        await User.login(email, password);
        res.json({ message : 'Logged in successfully.'});
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }


}
);


module.exports = router;


