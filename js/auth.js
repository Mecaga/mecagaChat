// ================= FIREBASE =================
const db = firebase.database();
let currentChannel = "general";

// ================= UI KONTROL =================
function showLogin() {
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("chatScreen").style.display = "none";
}

function showChat() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
}

// ================= AUTH DURUMU =================
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("Giriş yapıldı:", user.uid);
    showChat();
    loadMessages(); // chat.js içinden çağrılıyor
  } else {
    showLogin();
  }
});
