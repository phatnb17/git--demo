const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./key/localhost.json");
const app = require("express")();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const  config ={
 
    apiKey: "AIzaSyAGM-bkY2-EO4V7lAtREp5I9jUDSfSc39g",
    authDomain: "tutorial-267c7.firebaseapp.com",
    databaseURL: "https://tutorial-267c7.firebaseio.com",
    projectId: "tutorial-267c7",
    storageBucket: "tutorial-267c7.appspot.com",
    messagingSenderId: "29446722940",
    appId: "1:29446722940:web:fc543c1aef36ef285340f9",
    measurementId: "G-QJ3FSDJPWK"
  
};

const firebase = require('firebase');
firebase.initializeApp(config);


app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
});
// signup
app.post('/signup',(req,res) => {
  const newUser ={
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };
  firebase
  .auth()
  .createUserWithEmailAndPassword(newUser.email, newUser.password)
  .then(data => {
      return res.status(201).json({message: 'user ${data.user.uid} signup success'});

  })
  .catch((err) => {
    console.error(err);
    return res.status(500).json({error: err.code });
  });
});
exports.api = functions.region('asia-northeast1').https.onRequest(app);
