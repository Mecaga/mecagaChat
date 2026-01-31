// Firebase referansları
const db = firebase.database();
const auth = firebase.auth();

// Aktif kanal
let currentChannel = "general";

/* ================= MESAJ GÖNDER ================= */
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  const user = auth.currentUser;
  if (!text || !user) return;

  const messageData = {
    uid: user.uid,
    username: user.displayName || user.email.split("@")[0],
    text: text,
    time: Date.now()
  };

  db.ref("channels/" + currentChannel + "/messages").push(messageData);
  input.value = "";
}

/* ================= MESAJLARI OKU ================= */
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(50)
    .on("child_added", snapshot => {
      const msg = snapshot.val();
      showMessage(msg);
    });
}

/* ================= MESAJI EKRANA BAS ================= */
function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  if (!messagesDiv) return;

  const div = document.createElement("div");
  div.classList.add("message");

  const user = auth.currentUser;

  if (msg.uid === (user ? user.uid : "")) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.innerText = msg.username || "Bilinmeyen";

  const textDiv = document.createElement("div");
  textDiv.className = "text";
  textDiv.innerText = msg.text;

  div.appendChild(userDiv);
  div.appendChild(textDiv);

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ================= SAYFA YÜKLENDİĞİNDE ================= */
auth.onAuthStateChanged(user => {
  if (user) loadMessages();
});

/* ================= ENTER İLE GÖNDER ================= */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
