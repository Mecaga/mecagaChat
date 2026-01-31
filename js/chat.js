// ================= FIREBASE REFERANSLARI =================
const db = firebase.database();
const auth = firebase.auth();

// Aktif kanal (şimdilik sadece genel)
let currentChannel = "general";

// ================= PANEL & MODAL =================
const panels = ["friendsPanel", "mailPanel", "boxPanel"];
const modals = ["channelForm", "joinForm", "userMenu", "deleteConfirm"];

function hideAllPanels() {
  panels.forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });
}

function hideAllModals() {
  modals.forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });
}

function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  const isOpen = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) panel.classList.remove("hidden");
}

function toggleUserMenu() {
  const menu = document.getElementById("userMenu");
  const isOpen = !menu.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) menu.classList.remove("hidden");
}

function showCreateChannel() {
  hideAllPanels();
  hideAllModals();
  document.getElementById("channelForm").classList.remove("hidden");
}

function showJoinChannel() {
  hideAllPanels();
  hideAllModals();
  document.getElementById("joinForm").classList.remove("hidden");
}

function closeModals() {
  hideAllModals();
}

// ================= MESAJ GÖNDER =================
function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  const user = auth.currentUser;
  if (!user) return;

  const messageData = {
    uid: user.uid,
    username: user.displayName || "Anonim",
    text: text,
    time: Date.now()
  };

  db.ref(`channels/${currentChannel}/messages`).push(messageData);
  input.value = "";
}

// ================= MESAJLARI YÜKLE =================
function loadMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  db.ref(`channels/${currentChannel}/messages`)
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
  div.classList.add("message");

  const user = auth.currentUser;
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

// ================= GENEL SOHBET AÇ =================
function openGeneralChannel() {
  hideAllPanels();
  hideAllModals();
  currentChannel = "general";
  document.getElementById("chatTitle").innerText = "Genel Sohbet";
  loadMessages();
}

// ================= ENTER TUŞU =================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("messageInput");

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});

// ================= KANAL OLUŞTUR & KATIL =================
function createChannel() {
  const nameInput = document.getElementById("channelNameInput");
  const channelName = nameInput.value.trim();
  if (!channelName) return;

  db.ref(`channels/${channelName}`).set({
    createdAt: Date.now()
  });

  nameInput.value = "";
  closeModals();
  currentChannel = channelName;
  document.getElementById("chatTitle").innerText = channelName;
  loadMessages();
}

function joinChannel() {
  const joinInput = document.getElementById("joinChannelInput");
  const channelName = joinInput.value.trim();
  if (!channelName) return;

  // Kanal mevcutsa katıl
  db.ref(`channels/${channelName}`).once("value", snapshot => {
    if (snapshot.exists()) {
      currentChannel = channelName;
      document.getElementById("chatTitle").innerText = channelName;
      loadMessages();
    } else {
      alert("Kanal bulunamadı!");
    }
  });

  joinInput.value = "";
  closeModals();
}

// ================= SAYFA YÜKLENDİĞİNDE =================
auth.onAuthStateChanged(user => {
  if (user) {
    loadMessages();
  }
});
