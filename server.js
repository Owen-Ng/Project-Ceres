"use strict";
const log = console.log;

const express = require("express");
const app = express();

const cors = require("cors");
//mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false);

// import mongoose models
const { User } = require("./models/user");
const { Family } = require("./models/family");
const { List } = require("./models/list");
const { Tribe } = require("./models/tribe");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// express-session for user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/* Session Handling *** */

// Create session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
            httpOnly: true,
        },
    })
);

// Login route sets currentUser
app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findByUsernamePassword(username, password)
        .then((user) => {
            req.session.user = user._id;
            req.session.email = user.email;
            res.status(200).send({
                currentUser: user.username,
                name: user.name,
                admin: user.admin,
                tribeAdmin: user.tribeAdmin,
                familyAdmin: user.familyAdmin,
                familyID: user.familyID,
            });
        })
        .catch((error) => {
            res.status(400).send();
        });
});

// Logout route destroys session cookie
app.get("/users/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send();
        }
    });
});

// Checks the current user
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

// Create new user
app.post("/users", (req, res) => {
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
    });

    user.save().then(
        (user) => {
            res.send(user);
        },
        (error) => {
            res.status(400).send(error);
        }
    );
});

// Returns current user
app.get("/users", (req, res) => {
    const currentUser = req.session.user;

    User.findById(currentUser).then((user) => {
        if (!user) {
            res.status(404).send("Resource Not Found");
        } else {
            res.send(user);
        }
    });
});

// Create a new family
app.post("/family", (req, res) => {
    const family = new Family({
        familyName: req.body.familyName,
    });

    family.save().then(
        (family) => {
            res.send(family);
        },
        (error) => {
            res.status(400).send(error);
        }
    );
});

// Returns all users in an array belonging to family fid
app.get("/family/:fid", (req, res) => {
    const fid = req.params.fid;

    if (!ObjectID.isValid(fid)) {
        res.status(404).send();
        return;
    }

    User.find({ familyID: fid }).then((users) => {
        res.send(users);
    });
});

// Current user joins family fid
app.post("/family/join/:fid", (req, res) => {
    const fid = req.params.fid;

    if (!ObjectID.isValid(fid)) {
        res.status(404).send();
        return;
    }

    Family.findById(fid).then((family) => {
        if (!family) {
            res.status(404).send("Resource not found");
        } else {
            const currentUser = req.session.user;

            User.findById(currentUser).then((user) => {
                user.familyID = fid;

                user.save()
                    .then((result) => {
                        res.send({ user: result, family });
                    })
                    .catch((error) => {
                        log(error);
                        res.status(400).send("Bad Request");
                    });
            });
        }
    });
});

// Create a new tribe
app.post("/tribe", (req, res) => {
    const tribe = new Tribe({
        tribeName: req.body.tribeName,
    });

    tribe.save().then(
        (tribe) => {
            res.send(tribe);
        },
        (error) => {
            res.status(400).send(error);
        }
    );
});

// Current users family joins tribe tid
app.post("/tribe/join/:tid", (req, res) => {
    const tid = req.params.tid;

    if (!ObjectID.isValid(tid)) {
        res.status(404).send();
        return;
    }

    Tribe.findById(tid).then((tribe) => {
        if (!tribe) {
            res.status(404).send("Resource not found");
        } else {
            const currentUser = req.session.user;

            if (!currentUser) {
                log("no user");
                res.status(404).send("Resource not found");
            } else {
                log(currentUser);
                User.findById(currentUser).then((user) => {
                    const familyID = user.familyID;
                    if (!familyID) {
                        log("user does not belong to a family");
                        res.status(404).send("Resource not found");
                    } else {
                        Family.findById(familyID).then((family) => {
                            if (!family) {
                                res.status(404).send("Resource not found");
                            } else {
                                family.tribes.push(tid);

                                family
                                    .save()
                                    .then((result) => {
                                        res.send({ family: result, tribe });
                                    })
                                    .catch((error) => {
                                        log(error);
                                        res.status(400).send("Bad Request");
                                    });
                            }
                        });
                    }
                });
            }
        }
    });
});

// Create new list
app.post("/list/:fid", (req, res) => {
    const fid = req.params.fid;

    if (!ObjectID.isValid(fid)) {
        res.status(404).send();
        return;
    }

    Family.findById(fid).then((family) => {
        if (!family) {
            res.status(404).send("Resource not found");
        } else {
            const list = new List({
                listname: req.body.listname,
                familyID: fid,
                shared: req.body.shared,
            });

            list.save().then(
                (list) => {
                    res.send(list);
                },
                (error) => {
                    res.status(400).send(error);
                }
            );
        }
    });
});

// Returns all lists in an array belonging to family fid
app.get("/list/:fid", (req, res) => {
    const fid = req.params.fid;

    if (!ObjectID.isValid(fid)) {
        res.status(404).send();
        return;
    }

    List.find({ familyID: fid }).then((lists) => {
        res.send(lists);
    });
});

// add item to a list
app.post("/list/:fid/:lid", (req, res) => {

    const listID = req.params.lid;
    const familyID = req.params.fid;

    if (!ObjectID.isValid(listID)) {
		res.status(404).send();
		return;
    }
    
    if (!ObjectID.isValid(familyID)) {
        res.status(404).send();
        return;
    }

    List.find({ familyID }).then((lists) => {
        const item = {
            "itemname": req.body.itemname,
            "quantity": req.body.quantity
        }

        const list = lists.find((list) => {
            return list._id == listID
        });

        log(item)

        list.items.push(item);

        log(list)

        list.save().then((result) => {
            res.send({ item, list });
        })
        .catch((error) => {
            res.status(400).send(error);
        })
    });
});

/* API Routes *** */

/* Webpage routes *** */

app.use(express.static(__dirname + "/client/build"));

app.get("*", (req, res) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log("Issue with mongoose connection");
        res.status(500).send("Internal server error");
        return;
    }

    const goodPageRoutes = [
        "/",
        "/map",
        "/tribe",
        "grocerylists",
        "admin",
        "profile",
    ];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }

    res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});

/* Helper Functions Below *** */

function isMongoError(error) {
    return (
        typeof error === "object" &&
        error !== null &&
        error.name === "MongoNetworkError"
    );
}
