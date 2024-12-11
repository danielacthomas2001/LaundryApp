const database = require('../config/database_connection');
/*
Payment
Attributes:
paymentID
paymentAmount
paymentMethod
transactionDate
Methods:
processPayment()
*/
class Payment{
    constructor(payment_id, user_id, amount, payment_method, transaction_date = new Date()){
        this.payment_id = payment_id;
        this.user_id = user_id; 
        this.amount = amount; 
        this.payment_method = payment_method;
        this.transaction_date = transaction_date;
    }
    static async processPayment(user_id, amount, payment_method){
        try{
            //check to ensure payment_method is one of two valid options
            const validPayments = ['Card', 'Paypal'];
            if (!validPayments.includes(payment_method)){
                throw new Error('Invalid payment method. Valid Methods are \'Card\' or \'Paypal\'');
            }
            const insertQuery = 'insert into payment (user_id, amount, payment_method) values (?, ?, ?)';
            const [insertResult] = await database.promise().execute(insertQuery, [user_id, amount, payment_method]);

            // Retrieve the inserted payment record
            const selectQuery = 'SELECT * FROM payment WHERE payment_id = ?';
            const [paymentResults] = await database.promise().execute(selectQuery, [insertResult.insertId]);

            if (paymentResults.length === 0) {
                throw new Error('Failed to retrieve payment details after processing.');
            }

            const paymentRecord = paymentResults[0];

            // Create a Payment instance with the retrieved data
            return new Payment(
                paymentRecord.payment_id,
                paymentRecord.user_id,
                paymentRecord.amount,
                paymentRecord.payment_method,
                paymentRecord.transaction_date
            );
        } catch (error) {
            console.error('Error in processPayment:', error);
            throw new Error(`Failed to process payment: ${error.message}`);
        }
    }
        
    }
    module.exports = Payment;
