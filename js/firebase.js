// 🔹 Firebase Konfigürasyonu
const firebaseConfig = {
  apiKey: "AIzaSyC46gx7XPMN607cZR0xPoryIXlWf7D3nuI",
  authDomain: "mecagachat-ec3a7.firebaseapp.com",
  projectId: "mecagachat-ec3a7",
  storageBucket: "mecagachat-ec3a7.firebasestorage.app",
  messagingSenderId: "883254383531",
  appId: "1:883254383531:web:5622ae539f774bba64b8ee"
};

// Firebase başlat
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

// Kullanıcı durumu kontrolü
auth.onAuthStateChanged(user => {
  if(user){
    currentUser = user;
    console.log("Giriş yaptı:", user.uid);
  } else {
    currentUser = null;
    console.log("Çıkış yapıldı");
  }
});
