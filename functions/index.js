const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");
const {
  getAllScreams,
  postAllScreams,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  upLoadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
} = require("./handlers/users");

//SCREAM
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postAllScreams);
app.get("/scream/:screamId", getScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);

app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
// signup
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, upLoadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle",getUserDetails);
app.post("/notifications",FBAuth, markNotificationsRead);

exports.api = functions.region("asia-northeast1").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("asia-northeast1")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    return db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            screamId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
exports.deleteNotificationUnLike = functions.region("asia-northeast1")
.firestore.document("likes/{id}")
.onDelete((snapshot) => {
 return db.doc(`/notifications/${snapshot.screamId}`)
  .delete()
  .then(() =>{
    return;
  })
  .catch((err) =>{
    console.error(err);
    return;
  });
});
exports.createNotificationOnComment = functions
  .region("asia-northeast1")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
  return  db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`)
          .set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            screamId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
