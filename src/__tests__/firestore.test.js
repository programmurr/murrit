const firebase = require("@firebase/rules-unit-testing");
const fs = require("fs");

// Run tests with: firebase emulators:exec 'npm run test'

const PROJECT_ID = "murrit-test-app";
const aliceID = "alice";
const bobID = "bob";
const aliceAuth = { uid: aliceID, email: "abc@gmail.com" };

function getAuthedFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth: auth})
    .firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
});

beforeAll(async () => {
  const rules = fs.readFileSync("firestore.rules", "utf8");
  await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
});

describe("Murrit - Users", () => {
  it("Does not let users write to database if not signed in", async () => {
    const db = getAuthedFirestore(null);
    const aliceRef = db.collection("users").doc(aliceID);

    await firebase.assertFails(aliceRef.set({ email: "alice@alice.com" }));
  });

  it("Only lets users write to their own users document", async () => {
    const db = getAuthedFirestore(aliceAuth);
    await firebase.assertSucceeds(
      db.collection("users")
      .doc(aliceID)
      .set({ email: "alice@alice.com"})
      );
    await firebase.assertFails(
      db.collection("users")
      .doc(bobID)
      .set({ email: "alice@alice.com" })
      );
  });
})