// ================= FIREBASE REFERANSLARI =================
const db = firebase.database();
const auth = firebase.auth();

let currentChannel = "general";

// ================= MESAJ GÖNDER =================
function sendMessage() {
  const input = document.getElementById("messageInput");
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

  db.ref("channels/" + currentChannel + "/messages").push(messageData);
  input.value = "";
}

// ================= MESAJLARI YÜKLE =================
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

// ================= MESAJI EKRANA BAS =================
function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");

  const div = document.createElement("div");
  div.className = "message";

  // Eğer mesaj kendi mesajımızsa
  const user = auth.currentUser;
  if (user && msg.uid === user.uid) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  // Kullanıcı adı ve mesaj metni
  const userSpan = document.createElement("div");
  userSpan.className = "user";
  userSpan.innerText = msg.username;

  const textSpan = document.createElement("div");
  textSpan.className = "text";
  textSpan.innerText = msg.text;

  div.appendChild(userSpan);
  div.appendChild(textSpan);

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ================= SAYFA AÇILINCA =================
auth.onAuthStateChanged(user => {
  if (user) {
    loadMessages();
  }
});

// ================= ENTER TUŞU İLE GÖNDER =================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
