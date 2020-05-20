const admin = require("firebase-admin");
//const serviceAccount = require("./key/localhost.json");
const serviceAccount = require('./../key/localhost.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "tutorial-267c7.appspot.com"
  });

const db = admin.firestore();
module.exports = {admin, db};