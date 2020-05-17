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
const db = admin.firestore();

app.get("/screams", (req, res) => {
  db
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

  db
    .collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id}  created successfully` });
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
  //todo
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
  .get()
  .then((doc) =>{
    if(doc.exists){
      return res.status(400).json({handle: 'this handle is already taken'});
    }else{
     return firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password);
    }
  })
  .then((data)=>{
    userId = data.user.uid;
    return data.user.getIdToken();
  })
  .then((idToken)=>{
    token = idToken;
    const userCredentials ={
      handle: newUser.handle,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId
    };
    return db.doc(`/users/${newUser.handle}`).set(userCredentials);
  })
  .then(()=>{
    return res.status(201).json({ token });
  })
  .catch(err =>{
    console.error(err);
    if (err.code === 'auth/email-already-in-use'){
      return res.status(400).json({ email:'Email is already is use'});
    }else{
      return res.status(500).json({ error: err.code});
    }
  });
});
exports.api = functions.region('asia-northeast1').https.onRequest(app);
