const User = require('./user.js');


// Define test values at the top
const testEmail = 'does@database.work';
const testPassword = 'hustle_university';
const testPhoneNum = '+786169987';


async function testUserClass() {
    try {
        console.log("Testing User registration...");


        // Test: Register a new user
        const userId = await User.register(testEmail, testPassword, testPhoneNum);
        console.log(`User registered successfully with ID: ${userId}`);


        // Test: Login with correct credentials
        console.log("Testing User login with correct credentials...");
        const user = await User.login(testEmail, testPassword);
        console.log('User logged in successfully:', user);


        // Test: Login with incorrect password
        console.log("Testing User login with incorrect password...");
        try {
            await User.login(testEmail, 'WrongPassword');
        } catch (error) {
            console.error('Expected login failure:', error.message);
        }


        // Test: Login with non-existent email
        console.log("Testing User login with non-existent email...");
        try {
            await User.login('nonexistent@example.com', testPassword);
        } catch (error) {
            console.error('Expected login failure:', error.message);
        }


    } catch (error) {
        console.error("An error occurred during testing:", error.message);
    }
}


// Run the tests
testUserClass();





