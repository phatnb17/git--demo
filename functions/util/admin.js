const admin = require("firebase-admin");
//const serviceAccount = require("./key/localhost.json");
const serviceAccount = require('./../key/localhost.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tutorial-267c7.firebaseio.com",
    storageBucket: "tutorial-267c7.appspot.com"
  });

const db = admin.firestore();
module.exports = {admin, db};