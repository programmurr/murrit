const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// Update the user's post history with the postId
exports.writeToFirestore = functions.firestore
    .document("posts/{postId}")
    .onCreate((snap, context) => {
      const newPost = snap.data();
      const authorId = newPost.author;
      const newPostId = context.params.postId;
      const userRef = db.collection("users").doc(`${authorId}`);
      userRef.get()
          .then((doc) => {
            const userData = doc.data();
            const newPosts = [...userData.posts, newPostId];
            db.collection("users").doc(`${authorId}`).update({
              posts: newPosts,
            })
                .then(() => {
                  console.log("Users successfully updated");
                });
          })
          .catch((error) => {
            console.log("Error getting user document: ", error);
          });
    });

