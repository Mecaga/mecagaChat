// ================= FIREBASE =================
const db = firebase.database();
const auth = firebase.auth();

// Aktif kanal
let currentChannel = "general";
let messagesRef = null;

// ================= MESAJ GÖNDER =================
function sendMessage() {
  const input = document.getElementById("messageInput");
  if (!input) return;

  const text = input.value.trim();
  if (text === "") return;

  const user = auth.currentUser;
  if (!user) return;

  const messageData = {
    uid: user.uid,
    username: user.displayName || "kullanici",
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

  if (messagesRef) {
    messagesRef.off();
  }

  messagesRef = db
    .ref("channels/" + currentChannel + "/messages")
    .limitToLast(50);

  messagesRef.on("child_added", snapshot => {
    const msg = snapshot.val();
    showMessage(msg);
  });
}

// ================= MESAJI GÖSTER =================
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

  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});

// ================= GİRİŞ YAPILINCA =================
auth.onAuthStateChanged(user => {
  if (user) {
    const username =
      user.displayName || "kullanici";

    document.getElementById("myUser").innerText =
      username + "#" + user.uid.slice(0, 4);

    loadMessages();
  }
});
