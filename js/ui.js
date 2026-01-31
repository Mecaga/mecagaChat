const panels = ["friendsPanel", "mailPanel", "boxPanel"];
const modals = ["channelForm", "joinForm", "userMenu", "deleteConfirm"];

function hideAllPanels() {
  panels.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function hideAllModals() {
  modals.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

/* ===== PANELS ===== */
function toggleFriends() {
  const panel = document.getElementById("friendsPanel");
  const open = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!open) panel.classList.remove("hidden");
}

function toggleMail() {
  const panel = document.getElementById("mailPanel");
  const open = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!open) panel.classList.remove("hidden");
}

function toggleBox() {
  const panel = document.getElementById("boxPanel");
  const open = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!open) panel.classList.remove("hidden");
}

/* ===== MODALS ===== */
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

function toggleUserMenu() {
  const menu = document.getElementById("userMenu");
  const open = !menu.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!open) menu.classList.remove("hidden");
}

function closeModals() {
  hideAllModals();
}

/* ===== CHAT ===== */
function openGeneralChannel() {
  hideAllPanels();
  hideAllModals();
  document.getElementById("chatTitle").innerText = "Genel Sohbet";
}
