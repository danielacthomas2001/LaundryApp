const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'laundry-app-group'
});


app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("INSERT INTO user (email, password) VALUES (?, ?)", [email, password], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({email: email})
        }
    })
})


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