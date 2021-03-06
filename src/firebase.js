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

export const getPaginatedPosts = async(order, board) => {
  if (board === "all") {
    let allPosts = [];
    const postsObject = await db.collection("posts")
      .orderBy(order, "desc")
      .limit(6)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          allPosts.push(post);
        });
        return { 
          allPosts: allPosts, 
          latestDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        }
      })    
      .catch((error) => {
        console.error(error);
      });
    return postsObject;
  } else {
    let allPosts = [];
    const postsObject = await db.collection("posts")
    .where("board", "==", board)
    .orderBy(order, "desc")
    .limit(6)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allPosts.push(doc.data());
      });
      return { 
        allPosts: allPosts, 
        latestDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
      }
    })
    .catch((error) => {
      console.error(error);
    });
    return postsObject;
  }
}

export const getMorePaginatedPosts = async(order, board, lastDoc) => {
  if (board === "all") {
    let allPosts = [];
    const postsObject = await db.collection("posts")
      .orderBy(order, "desc")
      .startAfter(lastDoc)
      .limit(6)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          allPosts.push(post);
        });
        return { 
          allPosts: allPosts, 
          latestDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        }
      });
    return postsObject;
  } else {
    let allPosts = [];
    const postsObject = await db.collection("posts")
      .where("board", "==", board)
      .orderBy(order, "desc")
      .startAfter(lastDoc)
      .limit(6)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          allPosts.push(post);
        });
        return { 
          allPosts: allPosts, 
          latestDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return postsObject;
  }
}

export const deleteUserData = async(userId, docType) => {
  const deletedUser = {
    displayName: "[deleted]",
    id: "deleted"
  };
  db.collection(docType).doc(userId).get()
    .then((doc) => {
      return doc.data();
    })
    .then((data) => {
      data.comments.map((comment) => {
        return deleteComment(comment);
      });
      data.posts.map((post) => {
        return deleteDocument(post, "posts")
      });
    })
    .then(() => {
      db.collection(docType).doc(userId).set(deletedUser)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.delete().then(() => console.log("blah"))
        })
        .catch((error) => { console.error(error)});
    })
    .then(() => {
      ;
    })
    .catch((error) => {
      console.error("Error deleting user: ", error);
    });
}

export const deleteDocument = async (docId, docType) => {
  db.collection(docType).where("id", "==", docId)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const ref = querySnapshot.docs[0].ref;
      // const doc = querySnapshot.docs[0];
      // const data = doc.data();
      // console.log(data);
      ref.delete();
    })
    .catch((error) => {
      console.error(`Error deleting from ${docType}: `, error);
    })
}

export const getPostAuthor = async (authorid) => {
  if (authorid) {
    const author = db.collection("users")
      .where("id", "==", authorid)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        const user = doc.data();
        return user
      })
      .catch((error) => {
        console.error(error);
      });
      return author;
  } else {
    const author = {
      id: "deleted",
      displayName: "deleted"
    }
    return author;
  }
}

export const getPaginatedUserPostsAndComments = async (userId, order) => {
  let allPosts = [];
  const postObject = await db.collection("posts")
    .where("author", "==", userId)
    .orderBy(order, "desc")
    .limit(6)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allPosts.push(doc.data());
      });
      return { 
        allPosts: allPosts, 
        latestPost: querySnapshot.docs[querySnapshot.docs.length - 1]
      }
    })
    .catch((error) => {
      console.error(error);
    });

  let allComments = [];
  const commentObject = await db.collection("comments")
    .where("author", "==", userId)
    .orderBy(order, "desc")
    .limit(6)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allComments.push(doc.data());
      });
      return { 
        allComments: allComments, 
        latestComment: querySnapshot.docs[querySnapshot.docs.length - 1]
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return { ...postObject, ...commentObject };
}

export const getMorePaginatedUserPostsAndComments = async (userId, order, latestPost, latestComment) => {
  let allPosts = [];
  const postObject = await db.collection("posts")
    .where("author", "==", userId)
    .orderBy(order, "desc")
    .startAfter(latestPost)
    .limit(6)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allPosts.push(doc.data());
      });
      return { 
        allPosts: allPosts, 
        latestPost: querySnapshot.docs[querySnapshot.docs.length - 1]
      }
    })
    .catch((error) => {
      console.error(error);
    });

  let allComments = [];
  const commentObject = await db.collection("comments")
    .where("author", "==", userId)
    .orderBy(order, "desc")
    .startAfter(latestComment)
    .limit(6)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allComments.push(doc.data());
      });
      return { 
        allComments: allComments, 
        latestComment: querySnapshot.docs[querySnapshot.docs.length - 1]
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return { ...postObject, ...commentObject };
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

export const deleteComment = async (commentId) => {
  await db.collection("comments").where("id", "==", commentId)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      const ref = querySnapshot.docs[0].ref;
      ref.update({
        author: "[deleted]",
        comment: "[deleted]"
      })
    })
    .catch((error) => {
      console.error(error);
    })
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

export const addBoard = async (boardName) => {
  await db.collection("boards").add({
    name: boardName
  });
}

export const getBoards = async () => {
  let boards = [];
  await db.collection("boards")
  .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const board = doc.data();
        boards.push(board.name);
      })
    })
    .catch((error) => {
      console.error(error);
    });
  return boards;
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
  if (!uid) return undefined;
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