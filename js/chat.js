// js/chat.js
let currentChannel = "general";

document.getElementById("sendBtn").onclick = sendMessage;

function sendMessage() {
  const text = messageInput.value.trim();
  const user = auth.currentUser;
  if (!text || !user) return;

  db.ref("channels/" + currentChannel + "/messages").push({
    uid: user.uid,
    text: text,
    time: Date.now()
  });

  messageInput.value = "";
}

function loadMessages() {
  messages.innerHTML = "";

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(50)
    .on("child_added", snap => {
      const msg = snap.val();
      const div = document.createElement("div");
      div.innerText = msg.text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    });
}
