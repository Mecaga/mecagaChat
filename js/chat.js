let currentChat = null;

window.sendMessage = () => {
  if(!messageInput.value || !currentChat) return;

  const uid = auth.currentUser.uid;
  const chatRef = db.ref("chats/" + currentChat + "/messages");

  chatRef.push({
    sender: uid,
    text: messageInput.value,
    timestamp: Date.now()
  });

  messageInput.value = "";
};

function openChatWith(friendId, friendName) {
  currentChat = [auth.currentUser.uid,friendId].sort().join("_");
  chatTitle.innerText = friendName + "#" + friendId.slice(0,4);
  messages.innerHTML = "";

  const chatRef = db.ref("chats/"+currentChat+"/messages");
  chatRef.off();
  chatRef.on("child_added", snap => {
    const msg = snap.val();
    const div = document.createElement("div");
    div.innerText = (msg.sender===auth.currentUser.uid?"Sen: ":friendName+": ") + msg.text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

// Arkadaş ekleme basit demo
window.sendFriendRequest = (friendEmail) => {
  db.ref("users").orderByChild("email").equalTo(friendEmail).once("value", snap => {
    if(snap.exists()){
      const friendId = Object.keys(snap.val())[0];
      const friendName = snap.val()[friendId].username;
      addFriend(friendId,friendName);
      alert(friendName + " artık arkadaşın!");
    } else alert("Kullanıcı bulunamadı!");
  });
};
// Arkadaşlık isteği gönder
window.sendFriendRequest = (friendEmail) => {
  db.ref("users").orderByChild("email").equalTo(friendEmail).once("value", snap => {
    if(snap.exists()){
      const friendId = Object.keys(snap.val())[0];
      const uid = auth.currentUser.uid;

      // friendRequests → karşı kullanıcıya ekle
      db.ref("friendRequests/" + friendId + "/" + uid).set("pending");

      alert("✅ Arkadaşlık isteği gönderildi!");
    } else alert("Kullanıcı bulunamadı!");
  });
};

// Bildirimleri yükle
function loadFriendRequests() {
  const uid = auth.currentUser.uid;
  const panel = mailPanel;
  panel.innerHTML = "📧 Bildirimler<br>";

  db.ref("friendRequests/" + uid).on("value", snap => {
    panel.innerHTML = "📧 Bildirimler<br>";

    if(!snap.exists()) {
      panel.innerHTML += "Hiç bildirim yok";
      return;
    }

    snap.forEach(childSnap => {
      const requesterId = childSnap.key;
      const status = childSnap.val();

      db.ref("users/" + requesterId + "/username").once("value").then(nameSnap => {
        const div = document.createElement("div");
        div.innerText = nameSnap.val() + "#" + requesterId.slice(0,4);

        const acceptBtn = document.createElement("button");
        acceptBtn.innerText = "✅";
        acceptBtn.onclick = () => respondFriendRequest(requesterId, true);

        const rejectBtn = document.createElement("button");
        rejectBtn.innerText = "❌";
        rejectBtn.onclick = () => respondFriendRequest(requesterId, false);

        div.appendChild(acceptBtn);
        div.appendChild(rejectBtn);
        panel.appendChild(div);
      });
    });
  });
}

// Arkadaşlık isteğine cevap
function respondFriendRequest(requesterId, accepted) {
  const uid = auth.currentUser.uid;

  if(accepted){
    // friends → her iki tarafa ekle
    db.ref("friends/" + uid + "/" + requesterId).set(true);
    db.ref("friends/" + requesterId + "/" + uid).set(true);
  }

  // friendRequests → sil
  db.ref("friendRequests/" + uid + "/" + requesterId).remove();

  // karşıya bildirim (opsiyonel)
  alert("✅ İşlem tamamlandı!");
}
