// chat.js
let currentChannel = "general";

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  const user = auth.currentUser;

  if (!user) {
    alert("Giriş yok");
    return;
  }

  if (text === "") return;

  db.ref("channels/" + currentChannel + "/messages").push({
    uid: user.uid,
    user: user.email,
    text: text,
    time: Date.now()
  });

  input.value = "";
}

function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  const ref = db.ref("channels/" + currentChannel + "/messages");
  ref.off();

  ref.limitToLast(50).on("child_added", snap => {
    const msg = snap.val();
    showMessage(msg);
  });
}

function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  const div = document.createElement("div");

  div.className = "message";
  div.innerHTML = `<b>${msg.user}</b>: ${msg.text}`;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ENTER ile gönder
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");
  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") sendMessage();
    });
  }
});
