/* ================= GENEL ================= */
const panels = ["friendsPanel", "mailPanel", "boxPanel"];
const modals = ["channelForm", "joinForm", "userMenu"];

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

/* ================= PANELLER ================= */
function toggleFriends() {
  const panel = document.getElementById("friendsPanel");
  const isOpen = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) panel.classList.remove("hidden");
}

function toggleMail() {
  const panel = document.getElementById("mailPanel");
  const isOpen = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) panel.classList.remove("hidden");
}

function toggleBox() {
  const panel = document.getElementById("boxPanel");
  const isOpen = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) panel.classList.remove("hidden");
}

/* ================= MODALLAR ================= */
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
  const isOpen = !menu.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) menu.classList.remove("hidden");
}

function closeModals() {
  hideAllModals();
}

/* ================= GENEL SOHBET ================= */
function openGeneralChannel() {
  hideAllPanels();
  hideAllModals();
  document.getElementById("chatTitle").innerText = "Genel Sohbet";
}


function hideAllPanels() {
  document.getElementById("friendsPanel").classList.add("hidden");
  document.getElementById("mailPanel").classList.add("hidden");
  document.getElementById("boxPanel").classList.add("hidden");
  document.getElementById("userMenu").classList.add("hidden");
}
