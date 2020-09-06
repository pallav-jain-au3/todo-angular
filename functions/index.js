const functions = require('firebase-functions');

const express = require('express');
const app = express();
const tasksRoute = require("./tasksRoute")
const { auth, db } = require("./firebase");
const cors = require('cors')

// user doc finder middleware
app.use(cors())
app.use((req, res, next) => {
    let userRef = db
        .collection("users")
        .doc("dummyUser")
    req.userDocRef = userRef
    next()
})

app.use("/task", tasksRoute);



exports.app = functions.https.onRequest(app);
