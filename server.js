"use strict";
const log = console.log;

const express = require("express");
const app = express();

//mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// import mongoose models
const { User } = require("./models/user");

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

app.post("/users/login", (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    log(email, password);

    User.findByEmailPassword(email, password)
    .then(user => {
        req.session.user = user._id;
        req.session.email = user.email;
        res.send({ currentUser: user.email });
    })
    .catch(error => {
        res.status(400).send()
    });
});

app.get("/users/logout", (req, res) => {

    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send();
        }
    });
})

app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
})

app.post("/users", (req, res) => {
    log(req.body);

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.status(400).send(error);
        }
    );
});

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