const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Set up bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set up CORS headers middleware
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const clientData = req.body
    // console.log(clientData.phoneNumber);
    const text = clientData.text;
    const phoneNumber = clientData.phoneNumber;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. My account
        2. My phone number`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Choose account information you want to view
        1. Account number`;
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Your phone number is ${phoneNumber}`;
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END Your account number is ${accountNumber}`;
    }

    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);
});

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. My account
        2. My phone number`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Choose account information you want to view
        1. Account number`;
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Your phone number is ${phoneNumber}`;
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END Your account number is ${accountNumber}`;
    }

    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const port = process.env.PORT || 2010;

app.listen(port, () => {
    console.log(`server has started on port ${port}`);
});