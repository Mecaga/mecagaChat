// Firebase referansları
const db = firebase.database();
const auth = firebase.auth();

// Aktif kanal (şimdilik sadece genel)
let currentChannel = "general";

/* ================= MESAJ GÖNDER ================= */
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (text === "") return;

  const user = auth.currentUser;
  if (!user) return;

  const messageData = {
    uid: user.uid,
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

  div.innerText = msg.text;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ================= SAYFA AÇILINCA ================= */
auth.onAuthStateChanged(user => {
  if (user) {
    loadMessages();
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
