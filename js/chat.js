// ================= AUTH =================
function login() {
  const email = loginEmail.value;
  const pass = loginPassword.value;

  auth.signInWithEmailAndPassword(email, pass)
    .catch(err => alert(err.message));
}

function register() {
  const email = regEmail.value.trim();
  const pass = regPassword.value.trim();
  const username = regUsername.value.trim();

  if (!email || !pass || !username) {
    alert("Tüm alanları doldur");
    return;
  }

  auth.createUserWithEmailAndPassword(email, pass)
    .then(res => {
      return res.user.updateProfile({
        displayName: username
      });
    })
    .then(() => {
      showMain();
    })
    .catch(err => {
      alert(err.message);
    });
}


// ================= MESSAGES =================
function sendMessage() {
  const text = messageInput.value;
  if (!text) return;

  const msg = {
    user: auth.currentUser.displayName || "kullanici",
    uid: auth.currentUser.uid,
    text: text,
    time: Date.now()
  };

  db.ref("channels/" + currentChannel).push(msg);
  messageInput.value = "";
}

// ================= LISTEN =================
function listenMessages() {
  db.ref("channels/" + currentChannel).off();

  db.ref("channels/" + currentChannel).on("child_added", snap => {
    const m = snap.val();
    const div = document.createElement("div");
    div.innerText = `${m.user}: ${m.text}`;
    document.getElementById("messages").appendChild(div);
  });
}

// Genel sohbet otomatik
listenMessages();

// ================= CHANNEL =================
function createChannel() {
  const name = channelNameInput.value.trim();
  if (!name) return;

  currentChannel = name;
  document.getElementById("chatTitle").innerText = name;
  document.getElementById("messages").innerHTML = "";
  closeModals();
  listenMessages();
}

function joinChannel() {
  const name = joinChannelInput.value.trim();
  if (!name) return;

  currentChannel = name;
  document.getElementById("chatTitle").innerText = name;
  document.getElementById("messages").innerHTML = "";
  closeModals();
  listenMessages();
}

// ================= ARKADASLIK AYARLARI =================
function sendFriendRequest(targetUid, targetName) {
  const myUid = auth.currentUser.uid;
  const myName = auth.currentUser.displayName;

  db.ref("friendRequests/" + targetUid + "/" + myUid).set({
    username: myName
  });

  db.ref("notifications/" + targetUid).push(
    myName + " sana arkadaşlık isteği gönderdi ❤️"
  );

  alert("Arkadaşlık isteği gönderildi");
}

function acceptFriend(senderUid, senderName) {
  const myUid = auth.currentUser.uid;

  db.ref("users/" + myUid + "/friends/" + senderUid).set(true);
  db.ref("users/" + senderUid + "/friends/" + myUid).set(true);

  db.ref("friendRequests/" + myUid + "/" + senderUid).remove();

  db.ref("notifications/" + senderUid).push(
    auth.currentUser.displayName + " isteğini kabul etti ✅"
  );
}
function rejectFriend(senderUid, senderName) {
  const myUid = auth.currentUser.uid;

  db.ref("friendRequests/" + myUid + "/" + senderUid).remove();

  db.ref("notifications/" + senderUid).push(
    auth.currentUser.displayName + " isteğini reddetti ❌"
  );
}
