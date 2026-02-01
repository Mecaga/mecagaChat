// ================= MESAJ GÖNDER =================
function sendMessage() {
  const input = document.getElementById("messageInput");
  if (!input) return;

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
  if (!messagesDiv) return;

  messagesDiv.innerHTML = "";

  const ref = db.ref("channels/" + currentChannel + "/messages");
  ref.off();

  ref.limitToLast(50).on("child_added", snapshot => {
    const msg = snapshot.val();
    showMessage(msg);
  });
}

// ================= MESAJI GÖSTER =================
function showMessage(msg) {
  const messagesDiv = document.getElementById("messages");
  const user = firebase.auth().currentUser;
  if (!messagesDiv) return;

  const div = document.createElement("div");
  div.className = "message";

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

// ================= ENTER İLE GÖNDER (KESİN ÇÖZÜM) =================
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const input = document.getElementById("messageInput");
    if (input && document.activeElement === input) {
      e.preventDefault();
      sendMessage();
    }
  }
});
