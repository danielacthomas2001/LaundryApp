/*
class User:
attributes:
	userID
	email
	password
	phoneNum
	reservations
	payments
methods:
	register(email, password, phoneNum):
		if email exists/is unique AND password meets requirements:
			create user in database
		else:
			return error message
		login(email, password, phoneNum):
			if email AND password match database:
				login user
			else:
				return error message
*/
const database = require('../config/database_connection');
// const bcrypt = require('bcrypt');
class User {
    constructor(user_id, email, phone_num, password, payments = [], reservations = []) {
        this.user_id = user_id;
        this.email = email;
        this.phone_num = phone_num;
        this.password = password;
        this.payments = payments;
        this.reservations = reservations;
    }

	//method to register new user
    static async register(email, password, phone_num){
		//check if email already exists
        const query = 'select * from user where email = ?';
		const [results] = await database.promise().execute(query, [email]);
		if (results.length > 0) { //if user is found throw error
			throw new Error('Please use email not already in use.');
		}
		if (password.length < 6) { //TODO: maybe we can add more extensive password checks for security 	throw new Error('Please use password that is at least 6 characters long.');
		}

		// const hashedPassword = await bcrypt.hash(password, 10); //hashes the password for security
		
		//if no errors thrown, add new user to database
		const newQuery = 'insert into user (email, phone_num, password) values (?,?,?)';
		const [result] = await database.promise().execute(newQuery, [email, phone_num, password]);
		return result.insertId;

    }

	static async login(email, password){
		//checks if user with given email exists
		const query = 'select * from user where email = ?';
		const [results] = await database.promise().execute(query, [email]);
		//throw error if email isnt found in database
		if (results.length === 0){
			throw new Error('Invalid email');
		}
		const storedPassword = results[0].password;
		if (password !== storedPassword){
			throw new Error('Invalid Password');
		}

	}

	//TODO: maybe add method for user to see their reservations and payments

}

module.exports = User;
