const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql');


app.use(cors());

const db = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'LaundryApp'
});

app.get('/', (req, res) => {
    db.query("INSERT INTO usertest (username, password) VALUES ('Testing', '123')", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
})

app.listen(8080, () => {
    console.log('server listening on port 8080');
})