const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require('./util/fbAuth');

const {getAllScreams ,postAllScreams} = require("./handlers/screams");
const {signup,login,upLoadImage,addUserDetails, getAuthenticatedUser}= require("./handlers/users");


//SCREAM 
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postAllScreams);

// signup
app.post("/signup", signup);
app.post("/login",  login);
app.post("/user/image",FBAuth ,upLoadImage);
app.post("/user",FBAuth, addUserDetails);
app.get("/user",FBAuth, getAuthenticatedUser)
exports.api = functions.region("asia-northeast1").https.onRequest(app);
