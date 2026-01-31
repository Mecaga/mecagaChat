let currentChat = null;

// MESAJ GÖNDER
window.sendMessage = () => {
  const msgInput = messageInput.value;
  if (!msgInput || !currentChat) return;

  const uid = auth.currentUser.uid;
  const chatRef = db.ref("chats/" + currentChat + "/messages");

  chatRef.push({
    sender: uid,
    text: msgInput,
    timestamp: Date.now()
  });

  messageInput.value = "";
};

// SOHBET AÇ
function openChatWith(friendId, friendName) {
  currentChat = [auth.currentUser.uid, friendId].sort().join("_");
  chatTitle.innerText = friendName + "#" + friendId.slice(0, 4);
  messages.innerHTML = "";

  // Mesajları dinle
  const chatRef = db.ref("chats/" + currentChat + "/messages");
  chatRef.off(); // önce varsa eski dinleyiciyi temizle

  chatRef.on("child_added", snapshot => {
    const msg = snapshot.val();
    const div = document.createElement("div");
    div.innerText = (msg.sender === auth.currentUser.uid ? "Sen: " : friendName + ": ") + msg.text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

// Arkadaş ekleme → basit demo
window.sendFriendRequest = (friendEmail) => {
  db.ref("users").orderByChild("email").equalTo(friendEmail).once("value", snap => {
    if (snap.exists()) {
      const friendId = Object.keys(snap.val())[0];
      const friendName = snap.val()[friendId].username;
      addFriend(friendId, friendName);

      alert(friendName + " artık arkadaşın!");
    } else {
      alert("Kullanıcı bulunamadı!");
    }
  });
};
