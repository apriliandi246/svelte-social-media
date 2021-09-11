const firebaseConfig = {
  apiKey: "API KEY",
  authDomain: "AUTH DOMAIN",
  projectId: "PROJECT ID",
  storageBucket: "STORAGE BUCKET",
  messagingSenderId: "MESSAGE SENDER ID",
  appId: "APP ID",
  measurementId: "MEASUREMENID",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fire = firebase;

export default fire;
