"use strict";
const log = console.log;

const express = require("express");
const app = express();

//mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// import mongoose models


// to validate object IDs
const { ObjectID } = require('mongodb');

// body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/* Session Handleing *** */

// Create session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

/* API Routes *** */

/* Webpage routes *** */

app.use(express.static(__dirname + "/client/build"));

app.get('*', (req, res) => {

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection');
        res.status(500).send('Internal server error');
        return;
    }

    const goodPageRoutes = ["/", "/map", "/tribe", "grocerylists", "admin", "profile"];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }

    res.sendFile(__dirname + "/client/build/index.html");
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`)
});

/* Helper Functions Below *** */

function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === 'MongoNetworkError';
}