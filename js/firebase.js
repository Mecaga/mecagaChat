// ================= FIREBASE INIT =================
const firebaseConfig = {
  apiKey: "AIzaSyC46gx7XPMN607cZR0xPoryIXlWf7D3nuI",
  authDomain: "mecagachat-ec3a7.firebaseapp.com",
  databaseURL: "https://mecagachat-ec3a7-default-rtdb.firebaseio.com",
  projectId: "mecagachat-ec3a7",
  storageBucket: "mecagachat-ec3a7.appspot.com",
  messagingSenderId: "883254383531",
  appId: "1:883254383531:web:5622ae539f774bba64b8ee"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

