// ================= MAIN SYSTEM =================
const db = firebase.database();
const auth = firebase.auth();

let currentChannel = "general";

// Kanal değiştirme
function openGeneralChannel() {
  currentChannel = "general";
  document.getElementById("chatTitle").innerText = "Genel Sohbet";
  loadMessages();
}

// Kanal oluşturma
function createChannel() {
  const input = document.getElementById("channelNameInput");
  const name = input.value.trim();
  if (!name) return alert("Kanal adı girin!");

  db.ref("channels/" + name).set({
    createdBy: auth.currentUser.uid,
    createdAt: Date.now()
  }).then(() => {
    alert("Kanal oluşturuldu!");
    input.value = "";
    closeModals();
  });
}

// Kanal katıl
function joinChannel() {
  const input = document.getElementById("joinChannelInput");
  const channel = input.value.trim();
  if (!channel) return alert("Kanal adı girin!");

  db.ref("channels/" + channel).once("value", snapshot => {
    if (!snapshot.exists()) return alert("Kanal bulunamadı!");
    currentChannel = channel;
    document.getElementById("chatTitle").innerText = channel;
    loadMessages();
    closeModals();
  });
}
