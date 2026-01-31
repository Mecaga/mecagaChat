// ================= PANELS =================
function closePanels() {
  document.getElementById("friendsPanel").classList.add("hidden");
  document.getElementById("mailPanel").classList.add("hidden");
  document.getElementById("boxPanel").classList.add("hidden");
}

function toggleFriends() {
  closePanels();
  document.getElementById("friendsPanel").classList.toggle("hidden");
}

function toggleMail() {
  closePanels();
  loadNotifications();
  document.getElementById("mailPanel").classList.toggle("hidden");
}

function toggleBox() {
  closePanels();
  document.getElementById("boxPanel").classList.toggle("hidden");
}

// ================= MODALS =================
function closeModals() {
  document.querySelectorAll(".modal").forEach(m => {
    m.classList.add("hidden");
  });
}

function showCreateChannel() {
  closeModals();
  document.getElementById("channelForm").classList.remove("hidden");
}

function showJoinChannel() {
  closeModals();
  document.getElementById("joinForm").classList.remove("hidden");
}

function toggleUserMenu() {
  closeModals();
  document.getElementById("userMenu").classList.toggle("hidden");
}

// ================= CHAT UI =================
function openGeneralChannel() {
  currentChannel = "general";
  document.getElementById("chatTitle").innerText = "Genel Sohbet";
  document.getElementById("messages").innerHTML = "";
}


// ================= Bildirim Panelini Doldurma =================
function loadNotifications() {
  const uid = auth.currentUser.uid;
  const panel = document.getElementById("mailPanel");
  panel.innerHTML = "<h3>📧 Bildirimler</h3>";

  db.ref("notifications/" + uid).on("child_added", snap => {
    const div = document.createElement("div");
    div.innerText = snap.val();
    panel.appendChild(div);
  });
}
