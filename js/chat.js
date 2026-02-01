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
    alert("Giriş yapmadan mesaj gönderemezsin!");
    return;
  }

  const messageData = {
    uid: user.uid,
    username: user.displayName || "Kullanıcı",
    text: text,
    time: Date.now()
  };

  db.ref("channels/" + currentChannel + "/messages")
    .push(messageData)
    .then(() => {
      input.value = "";
    })
    .catch(err => {
      console.error("Mesaj gönderilemedi:", err);
    });
}
// ================= MESAJLARI YÜKLE =================
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  if (!messagesDiv) return;

  messagesDiv.innerHTML = "";

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(100)
    .off();

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

  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.innerText = msg.username;

  const textDiv = document.createElement("div");
  textDiv.innerText = msg.text;

  div.appendChild(userDiv);
  div.appendChild(textDiv);

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

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

// ================= AUTH =================
auth.onAuthStateChanged(user => {
  if (user) {
    loadMessages();
  }
});
