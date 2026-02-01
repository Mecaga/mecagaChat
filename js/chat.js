// ================= FIREBASE =================
const db = firebase.database();
let currentChannel = "general";
let messagesRef = null;

// ================= MESAJ GÖNDER =================
function sendMessage() {
  const input = document.getElementById("messageInput");
  if (!input) return;

  const text = input.value.trim();
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Giriş yapılmadı!");
    return;
  }

  if (text === "") return;

  db.ref(`channels/${currentChannel}/messages`).push({
    uid: user.uid,
    user: user.displayName || "kullanici",
    text: text,
    time: Date.now()
  }).then(() => {
    input.value = "";
  }).catch(err => {
    console.error("Mesaj gönderme hatası:", err);
  });
}

// ================= MESAJLARI YÜKLE =================
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  if (!messagesDiv) return;

  messagesDiv.innerHTML = "";

  // eski dinleyiciyi kapat
  if (messagesRef) {
    messagesRef.off();
  }

  messagesRef = db
    .ref(`channels/${currentChannel}/messages`)
    .limitToLast(50);

  messagesRef.on("child_added", snapshot => {
    const msg = snapshot.val();
    showMessage(msg);
  });
}

// ================= MESAJI EKRANA BAS =================
function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  const user = firebase.auth().currentUser;

  const div = document.createElement("div");
  div.className = "message";

  if (user && msg.uid === user.uid) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  div.innerHTML = `
    <div class="user">${msg.user}</div>
    <div class="text">${msg.text}</div>
  `;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ================= AUTH HAZIR OLUNCA BAŞLAT =================
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("Giriş yapıldı:", user.uid);
    loadMessages(); // 🔴 ASIL EKSİK OLAN BUYDU
  }
});

// ================= ENTER İLE GÖNDER =================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");
  if (!input) return;

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
