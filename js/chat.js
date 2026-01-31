// Firebase referansları
const db = firebase.database();
const auth = firebase.auth();

// Aktif kanal (şimdilik sadece genel)
let currentChannel = "general";

/* ================= MESAJ GÖNDER ================= */
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  const user = auth.currentUser;

  if (!text || !user) return;

  const messageData = {
    uid: user.uid,
    username: user.displayName || "Anonim",
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

  const div = document.createElement("div");
  div.className = "message";

  // Kim gönderdi
  const userSpan = document.createElement("div");
  userSpan.className = "user";
  userSpan.innerText = msg.username || "Anonim";
  div.appendChild(userSpan);

  // Mesaj metni
  const textDiv = document.createElement("div");
  textDiv.innerText = msg.text;
  div.appendChild(textDiv);

  // Kendi mesajımızsa sağa yasla
  const user = auth.currentUser;
  if (user && msg.uid === user.uid) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ================= ENTER İLE GÖNDER ================= */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});

/* ================= SAYFA AÇILINCA MESAJ YÜKLE ================= */
auth.onAuthStateChanged(user => {
  if (user) {
    loadMessages();
  }
});
