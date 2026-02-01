// ================= FIREBASE =================
const db = firebase.database();
const auth = firebase.auth();

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
    alert("Giriş yapman gerekiyor");
    return;
  }

  const messageData = {
    uid: user.uid,
    username: user.displayName || "Bilinmeyen",
    text: text,
    time: Date.now()
  };

  db.ref("channels/" + currentChannel + "/messages").push(messageData);

  input.value = "";
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

// ================= MESAJLARI YÜKLE =================
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  if (!messagesDiv) return;

  messagesDiv.innerHTML = "";

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(100)
    .on("child_added", snapshot => {
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

// ================= GİRİŞ YAPILINCA =================
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("myUser").innerText =
      (user.displayName || "kullanici") + "#" + user.uid.slice(0, 4);

    loadMessages();
  }
});
