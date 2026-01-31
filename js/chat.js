// ================= FIREBASE =================
const auth = firebase.auth();
const db = firebase.database();

// Aktif kanal
let currentChannel = "general";

// ================= MESAJ GÖNDER =================
function sendMessage() {
  const input = document.getElementById("messageInput");
  if (!input) return;

  const text = input.value.trim();
  if (text === "") return;

  const user = auth.currentUser;
  if (!user) {
    console.log("Kullanıcı yok");
    return;
  }

  const messageData = {
    uid: user.uid,
    username: user.displayName || "Kullanıcı",
    text: text,
    time: Date.now()
  };

  db.ref("channels/" + currentChannel + "/messages").push(messageData);
  input.value = "";
}

// ================= MESAJLARI YÜKLE =================
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  if (!messagesDiv) return;

  messagesDiv.innerHTML = "";

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(50)
    .off(); // eski dinleyicileri kapat

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(50)
    .on("child_added", (snapshot) => {
      const msg = snapshot.val();
      showMessage(msg);
    });
}

// ================= MESAJI EKRANA BAS =================
function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  if (!messagesDiv) return;

  const user = auth.currentUser;

  const div = document.createElement("div");
  div.classList.add("message");

  if (user && msg.uid === user.uid) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  div.innerHTML = `
    <div class="user">${msg.username}</div>
    <div class="text">${msg.text}</div>
  `;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ================= ENTER İLE GÖNDER =================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");
  if (!input) return;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});

// ================= LOGIN OLUNCA MESAJLARI YÜKLE =================
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Giriş yapıldı:", user.uid);
    loadMessages();
  } else {
    console.log("Çıkış yapıldı");
  }
});
