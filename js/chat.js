// Firebase
const db = firebase.database();
const auth = firebase.auth();

// Aktif kanal
let currentChannel = "general";

/* ================= MESAJ GÖNDER ================= */
function sendMessage() {
  const input = document.getElementById("messageInput");
  if (!input) return;

  const text = input.value.trim();
  if (text === "") return;

  const user = auth.currentUser;
  if (!user) return;

  const messageData = {
    uid: user.uid,
    username: user.displayName || "Anonim",
    text: text,
    time: Date.now()
  };

  db.ref(`channels/${currentChannel}/messages`).push(messageData);
  input.value = "";
}

/* ================= MESAJLARI YÜKLE ================= */
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  if (!messagesDiv) return;

  messagesDiv.innerHTML = "";

  // ÖNCE eski listener'ı kapat
  db.ref(`channels/${currentChannel}/messages`).off();

  db.ref(`channels/${currentChannel}/messages`)
    .limitToLast(50)
    .on("child_added", snapshot => {
      const msg = snapshot.val();
      showMessage(msg);
    });
}

/* ================= MESAJI GÖSTER ================= */
function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");
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

/* ================= AUTH ================= */
auth.onAuthStateChanged(user => {
  if (user) {
    loadMessages();
  }
});

/* ================= ENTER İLE GÖNDER ================= */
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
