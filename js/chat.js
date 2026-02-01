// ================= FIREBASE =================
const db = firebase.database();
let currentChannel = "general";

// ================= MESAJ GÖNDER =================
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Giriş yapılmadı!");
    return;
  }

  if (text === "") return;

  db.ref("channels/" + currentChannel + "/messages").push({
    uid: user.uid,
    user: user.displayName || "kullanici",
    text: text,
    time: Date.now()
  });

  input.value = "";
}

// ================= MESAJLARI YÜKLE =================
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(50)
    .off(); // eski dinleyicileri temizle

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(50)
    .on("child_added", snapshot => {
      const msg = snapshot.val();
      showMessage(msg);
    });
}

// ================= MESAJI EKRANA BAS =================
function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  const user = firebase.auth().currentUser;

  const div = document.createElement("div");
  div.classList.add("message");

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

// ================= ENTER İLE GÖNDER =================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");

  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});
