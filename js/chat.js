let currentUser = null;

// Mesaj gönder
function sendMessage(text){
  if(!currentUser || !text) return;

  db.ref("messages").push({
    fromUid: currentUser.uid,
    fromName: document.getElementById("userName").innerText,
    text: text,
    timestamp: Date.now()
  });
}

// Mesajları dinle
db.ref("messages").on("child_added", snapshot => {
  const msg = snapshot.val();
  const li = document.createElement("li");
  li.textContent = `${msg.fromName}: ${msg.text}`;
  document.getElementById("messagesList").appendChild(li);
});
