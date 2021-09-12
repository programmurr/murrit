import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/firebase-storage";
import changeVote from "./utils/changeVote";

const firebaseConfig = {
  apiKey: "AIzaSyDMls1bWaSm9CtXGMZN0Ad4VoUWNtDb_mc",
  authDomain: "murrit-ec42e.firebaseapp.com",
  projectId: "murrit-ec42e",
  storageBucket: "murrit-ec42e.appspot.com",
  messagingSenderId: "394096318363",
  appId: "1:394096318363:web:d6b0a87470426a05f5733e"
};

firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();
if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
}

const generatePostDocId = async (post) => {
  return await db.collection("posts").add(post)
    .then((docRef) => {
      return docRef.id;
    });
}

const getPosts = async (order, board) => {
  let allPosts = [];
  if (board === "all") {
    await db.collection("posts")
    .orderBy(order, "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allPosts.push(doc.data());
      });
    })
    .catch((error) => {
      console.error(error);
    });
  } else {
    await db.collection("posts")
    .where("board", "==", board)
    .orderBy(order, "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allPosts.push(doc.data());
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  return allPosts;
}

const getUserPostsAndComments = async (userId, order) => {
  let allPosts = [];
  await db.collection("posts")
  .where("author", "==", userId)
  .orderBy(order, "desc")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      allPosts.push(doc.data());
    });
  })
  .catch((error) => {
    console.error(error);
  });
  let allComments = [];
  await db.collection("comments")
  .where("author", "==", userId)
  .orderBy(order, "desc")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      allComments.push(doc.data());
    });
  })
  .catch((error) => {
    console.error(error);
  });
  return { allPosts, allComments };
}

const updateUserDoc = (userId, postId) => {
  db.collection("users").doc(userId)
    .get()
    .then((doc) => {
      const userData = doc.data();
      const newPosts = [...userData.posts, postId];
      db.collection("users").doc(userId).update({
        posts: newPosts,
      });
    })
    .catch((error) => {
      console.log("Error getting user document: ", error);
    });
}

const checkUserVoted = async (userId, dataId) => {
  const userVotes = await db.collection("users").doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userDoc = doc.data();
        return userDoc.votes;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return userVotes.includes(dataId);
}

const updateUserVotes = (userId, dataId) => {
  db.collection("users").doc(userId)
  .get()
  .then((doc) => {
    const userData = doc.data();
    const newVotes = [...userData.votes, dataId];
    db.collection("users").doc(userId).update({
      votes: newVotes,
    });
  })
  .catch((error) => {
    console.log("Error getting user document: ", error);
  });
}

const handleVote = async (collection, operator, userId, dataId) => {
  const hasVoted = await checkUserVoted(userId, dataId);
  if (hasVoted) {
    alert("You have already voted on this. You made your choice.")
  } else {
    db.collection(collection).where("id", "==", dataId)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const doc = querySnapshot.docs[0];
      let updatedDoc = doc.data();
      updatedDoc.votes = changeVote(updatedDoc.votes, operator);
      doc.ref.update(updatedDoc);
      updateUserVotes(userId, dataId)
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

const addComment = async (comment) => {
  return await db.collection("comments").add(comment);
}

const updateUserCommentDoc = async (userId, commentId) => {
  return await db.collection("users").doc(userId)
    .get()
    .then((doc) => {
      const userData = doc.data();
      const newComments = [...userData.comments, commentId];
      db.collection("users").doc(userId).update({
        comments: newComments,
      });
    })
    .catch((error) => {
      console.log("Error getting user document: ", error);
    });
}

const updatePostComments = async (postId, commentId) => {
  return await db.collection("posts").where("id", "==", postId)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const doc = querySnapshot.docs[0];
      let updatedDoc = doc.data();
      updatedDoc.comments = [...updatedDoc.comments, commentId];
      doc.ref.update(updatedDoc);
    })
    .catch((error) => {
      console.error(error);
    });
}

const getPostCommentIds = async (id) => {
  let commentsArray = [];
  await db.collection("posts").where("id", "==", id)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const doc = querySnapshot.docs[0];
      const post = doc.data();
      post.comments.forEach((comment) => {
        commentsArray.push(comment);
      })
    })
  return commentsArray;
}

const getCommentIds = async (commentId) => {
  let commentsArray = [];
  await db.collection("comments").where("id", "==", commentId)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const doc = querySnapshot.docs[0];
      const parentComment = doc.data();
      parentComment.comments.forEach((comment) => {
        commentsArray.push(comment);
      })
    })
  return commentsArray;
}

const getComment = async (commentId) => {
  return await db.collection("comments").where("id", "==", commentId)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const doc = querySnapshot.docs[0];
      return doc.data();
    })
    .catch((error) => {
      console.error(error);
    })
}

const updateCommentChildren = async (parentId, commentId) => {
  return await db.collection("comments").where("id", "==", parentId)
  .limit(1)
  .get()
  .then((querySnapshot) => {
    const doc = querySnapshot.docs[0];
    let updatedComment = doc.data();
    updatedComment.comments = [...updatedComment.comments, commentId];
    doc.ref.update(updatedComment);
  })
  .catch((error) => {
    console.error(error);
  });
}

// Storage
const storage = firebase.storage();
if (window.location.hostname === "localhost") {
  storage.useEmulator("localhost", 9199);
}

const generateImageDocument = async (board, file) => {
  return await storage.ref().child(`${board}/${file.name}`)
    .put(file)
    .then(() => {
      return storage.ref().child(`${board}/${file.name}`)
        .getDownloadURL()
          .then((url) => {
            return url;
          })
  });
}

// Auth
const auth = firebase.auth();
if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
}

const provider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
}

// Auth - User handling
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName } = user;
    try {
      await userRef.set({
        displayName,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};


export { 
  db, 
  auth,
  signInWithGoogle,
  storage, 
  generatePostDocId, 
  getPosts,
  getUserPostsAndComments,
  generateImageDocument,
  updateUserDoc,
  checkUserVoted,
  updateUserVotes,
  handleVote,
  addComment,
  updateUserCommentDoc,
  updatePostComments,
  getPostCommentIds,
  getCommentIds,
  getComment,
  updateCommentChildren
};