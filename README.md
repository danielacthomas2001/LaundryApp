# LaundryApp

**LaundryApp** is a mobile-first application designed to streamline the process of using shared laundry services in residential buildings. The app provides users with real-time machine availability, enables machine reservations, processes payments, and handles maintenance requests — all from a single, user-friendly interface.

## Key Features

- **User Registration & Login**: Secure user authentication and profile management.
- **Real-Time Machine Availability**: View available machines in real-time.
- **Machine Reservations**: Reserve machines for specific time slots.
- **Payment Integration**: Pay for laundry using various payment methods (e.g., card, digital wallets).
- **Notifications**: Receive notifications when laundry is done or if the machine has issues.
- **Maintenance Requests**: Easily report machine problems to building management.

## Running Front End

- Install React and Node.js in terminal
- Run: [npx create-react-app laundry-app] in terminal
- Replace all files in src folder with files in frontend-dashboard
- Run: [npm start] in terminal 


## Running database connection
- Ive added a folder called server, it hosts the express api app along with dependencies
- Inside LaundryApp/server directory
    - Run `npm init` to initiate node.js app
        - Use all default settings (keeping hitting enter)

### Pretty sure dont need the following as they are all in dependencies, but here just in case
- Inside LaundryApp/server directory
    - Install express `npm install express`
    - Install cors `npm install cors`
    - Install mysql `npm install mysql`
- Inside LaundryApp/laudry-app directory
    - Install axios `npm install axios`