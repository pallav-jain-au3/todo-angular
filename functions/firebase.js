const admin = require("firebase-admin");
const serviceAccount = require("./config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://todo-app-473c0.firebaseio.com"
});

exports.db = admin.firestore();
exports.auth = admin.auth();
