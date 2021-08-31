// "use strict";
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// // const path = require("path");
// admin.initializeApp();

// const db = admin.firestore();

// // Update the user's post history with the postId
// exports.updateUserPostHistory = functions.firestore
//     .document("posts/{postId}")
//     .onCreate((snap, context) => {
//       const newPost = snap.data();
//       const authorId = newPost.author;
//       const newPostId = context.params.postId;
//       const userRef = db.collection("users").doc(`${authorId}`);
//       userRef.get()
//           .then((doc) => {
//             const userData = doc.data();
//             const newPosts = [...userData.posts, newPostId];
//             db.collection("users").doc(`${authorId}`).update({
//               posts: newPosts,
//             })
//                 .then(() => {
//                   console.log("Users successfully updated");
//                 });
//           })
//           .catch((error) => {
//             console.log("Error getting user document: ", error);
//           });
//     });

// exports.makePostFromStorageFile = functions.storage
//     .object()
//     .onFinalize(async (object) => {
//       // object.bucket is murrit-ec42e.appspot.com
//       // object.name is food/2021-02-12_22-34.png
//       // object.contentType is image/png
//     });
