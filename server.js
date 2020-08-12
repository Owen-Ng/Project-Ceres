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
            req.session.save();
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
    user.save()
        .then((user) => {
            res.send(user);
        })
        .catch((error) => {
            res.status(400).send(error.keyValue);
        });
});

// Returns current user
app.get("/users", (req, res) => {
    const currentUser = req.session.user;
    User.findById(currentUser).then((user) => {
        if (!user) {
            res.status(404).send("Resource Not Found");
        } else {
            const data = {
                id: user.id,
                admin: user.admin,
                tribeAdmin: user.tribeAdmin,
                email: user.email,
                familyID: user.familyID,
                name: user.name,
                familyAdmin: user.familyAdmin,
                username: user.username,
                pending: user.pending
            };
            res.send(data);
        }
    });
});

// Create a new family
app.post("/family", (req, res) => {
    const currentUser = req.session.user;
    const family = new Family({
        familyName: req.body.familyName,
    });

    family.save().then(
        (family) => {
            User.findById(currentUser).then((user) => {
                user.familyID = family._id;
                user.familyAdmin = true;

                user.save()
                    .then((result) => {
                        res.send({ user: result, family });
                    })
                    .catch((error) => {
                        res.status(400).send(error);
                    });
            });
        },
        (error) => {
            res.status(400).send(error);
        }
    );
});

// Returns a family 
app.get("/family/:fid", (req, res) => {
    const fid = req.params.fid;

    if (!ObjectID.isValid(fid)) {
        res.status(404).send();
        return;
    }

    Family.findById(fid).then((family) => {
        res.send(family);
    });
});

// Returns all users in an array belonging to family fid
app.get("/family/users/:fid", (req, res) => {
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
app.patch("/family/join/:fid", (req, res) => {
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
                log(user.pending, fid)
                if (user.pending == fid) {
                    user.familyID = fid;
                    user.pending = undefined;

                    user.save()
                    .then((result) => {
                        const index = family.offers.indexOf(user._id);
                        family.offers.splice(index, 1);
                        family.save();
                        res.send({ user: result, family });
                    })
                    .catch((error) => {
                        res.status(400).send(error);
                    });
                } else {
                    res.status(400).send("User not invited to Family");
                }
            });
        }
    });
});

// Current user declines invite to family fid
app.patch("/family/decline/:fid", (req, res) => {
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
                log(user.pending, fid)
                if (user.pending == fid) {
                    user.pending = undefined;

                    user.save()
                    .then((result) => {
                        const index = family.offers.indexOf(user._id);
                        family.offers.splice(index, 1);
                        family.save();
                        res.send({ user: result, family });
                    })
                    .catch((error) => {
                        res.status(400).send(error);
                    });
                } else {
                    res.status(400).send("User not invited to Family");
                }
            });
        }
    });
});

// Invite a user to join family
app.patch("/family/invite/:uid", (req, res) => {
    const uid = req.params.uid;

    if (!ObjectID.isValid(uid)) {
        res.status(404).send();
        return;
    }

    User.findById(uid).then((user) => {
        if (!user) {
            res.status(404).send("Resource not found");
        } else {
            const currentUser = req.session.user;

            User.findById(currentUser).then((adminUser) => {
                if (adminUser.familyAdmin === true) {
                    const currentFamily = adminUser.familyID;
                    Family.findById(currentFamily).then((family) => {
                        family.offers.push(uid);
                        user.pending = currentFamily;
                        user.save();

                        family.save()
                        .then((result) => {
                            res.send({ family: result, user });
                        })
                        .catch((error) => {
                            res.status(400).send(error);
                        });
                    })
                } else {
                    res.status(400).send("Not an admin")
                }
            });
        }
    });
});

// Create a new tribe
app.post("/tribe", (req, res) => {
    const currentUser = req.session.user;
    const tribe = new Tribe({
        tribeName: req.body.tribeName,
    });

    tribe.save().then(
        (tribe) => {
            User.findById(currentUser).then((user) => {
                Family.findById(user.familyID).then((family) => {
                    log(currentUser)
                    user.tribeAdmin.push(tribe._id);
                    family.tribes.push(tribe._id);
                    user.save()
                    .then((resU) => {
                        family.save()
                        .then((result) => {
                            res.send({ user: resU, family: result, tribe });
                        }).catch((error) => {
                            res.status(400).send(error);
                        });
                    })
                    .catch((error) => {
                        res.status(400).send(error);
                    });
                })
            })
        },
        (error) => {
            res.status(400).send(error);
        }
    );
});

//List Families in a tribe
app.get("/tribe/:tid", (req, res) => {
    const tid = req.params.tid;

    if (!ObjectID.isValid(tid)) {
        res.status(404).send();
        return;
    }

    Family.find({ tribes: tid }).then((tribe) => {
        if (!tribe) {
            res.status(404).send("Resource not found");
        } else {
            res.send(tribe);
        }
    });
});

// Current users family joins tribe tid
app.patch("/tribe/join/:tid", (req, res) => {
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
                res.status(404).send("Resource not found");
            } else {
                User.findById(currentUser).then((user) => {
                    const familyID = user.familyID;
                    if (!familyID) {
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
                                        res.status(400).send(error);
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
app.post("/list", (req, res) => {
    const fid = req.body.fid;
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
                familyID: req.body.fid,
                items: {},
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
//delete list
app.delete("/list", (req, res) => {
    const listName = req.body.listname;
    const familyID = req.body.fid;

    if (!ObjectID.isValid(familyID)) {
        res.status(404).send();
        return;
    }

    List.find({ familyID })
        .then((lists) => {
            const list = lists.find((list) => {
                return list.listname === listName;
            });

            list.remove()
                .then(() => {
                    res.status(200).end();
                })
                .catch((err) => res.status(400));
        })
        .catch((err) => res.end());
});

// add item to a list
app.post("/item", (req, res) => {
    const listName = req.body.listname;
    const familyID = req.body.fid;

    if (!ObjectID.isValid(familyID)) {
        res.status(404).send();
        return;
    }

    List.find({ familyID }).then((lists) => {
        const list = lists.find((list) => {
            return list.listname === listName;
        });

        if (list.items !== undefined) {
            const updatedList = list.items;

            updatedList[req.body.itemname] = Number(req.body.quantity);
            list.updateOne({ items: updatedList })
                .then(() => {
                    list.save()
                        .then((result) => {
                            res.send({ list });
                        })
                        .catch((error) => {
                            res.status(400).send(error);
                        });
                })
                .catch((err) => {
                    res.status(400).send(error);
                });
        }
    });
});
app.patch("/item", (req, res) => {
    const listName = req.body.listname;
    const familyID = req.body.fid;
    const prevName = req.body.prevName;
    const newName = req.body.newName;
    const quantity = req.body.quantity;
    if (!ObjectID.isValid(familyID)) {
        res.status(404).send();
        return;
    }
    List.find({ familyID })
        .then((lists) => {
            const list = lists.find((list) => {
                return list.listname === listName;
            });

            const items = list.items;
            delete items[prevName];
            items[newName] = quantity;
            list.updateOne({ items })
                .then(() => res.status(200).end())
                .catch((err) => res.status(400).end());
        })
        .catch((err) => res.status(400).end());
});

//delete item from a list
app.delete("/item", (req, res) => {
    const listName = req.body.listname;
    const familyID = req.body.fid;
    const itemName = req.body.itemname;
    if (!ObjectID.isValid(familyID)) {
        res.status(404).send();
        return;
    }
    List.find({ familyID })
        .then((lists) => {
            const list = lists.find((list) => {
                return list.listname === listName;
            });

            const items = list.items;
            delete items[itemName];
            list.updateOne({ items })
                .then(() => res.status(200).end())
                .catch((err) => res.status(400).end());
        })
        .catch((err) => res.status(400).end());
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
