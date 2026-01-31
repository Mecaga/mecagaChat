/* ================= UI.JS ================= */

/* ================= PANEL / MODAL AÇMA-KAPAMA ================= */
const panels = ["friendsPanel", "mailPanel", "boxPanel"];
const modals = ["channelForm", "joinForm", "userMenu", "deleteConfirm"];

/* Her panel ve modalı gizle */
function hideAllPanels() {
  panels.forEach(id => {
    const panel = document.getElementById(id);
    if (panel) panel.classList.add("hidden");
  });
}

function hideAllModals() {
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("hidden");
  });
}

/* Aç/Kapat işlevleri */
function togglePanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  const isOpen = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) panel.classList.remove("hidden");
}

function openModal(id) {
  hideAllPanels();
  hideAllModals();
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("hidden");
}

/* ================= PANEL BUTONLARI ================= */
function toggleFriends() { togglePanel("friendsPanel"); }
function toggleMail() { togglePanel("mailPanel"); }
function toggleBox() { togglePanel("boxPanel"); }

/* ================= MODAL BUTONLARI ================= */
function showCreateChannel() { openModal("channelForm"); }
function showJoinChannel() { openModal("joinForm"); }
function toggleUserMenu() { togglePanel("userMenu"); }
function closeModals() { hideAllModals(); }

/* ================= GENEL SOHBET ================= */
function openGeneralChannel() {
  hideAllPanels();
  hideAllModals();
  const title = document.getElementById("chatTitle");
  if (title) title.innerText = "Genel Sohbet";
}

/* ================= HESAP VE KULLANICI ================= */
function changeUsername() {
  const newName = prompt("Yeni kullanıcı adınızı girin:");
  if (!newName) return;

  const user = firebase.auth().currentUser;
  if (!user) return;

  firebase.database().ref("users/" + user.uid).update({ username: newName });
  const myUser = document.getElementById("myUser");
  if (myUser) myUser.innerText = newName + "#" + user.uid.slice(0,4);
  closeModals();
}

function deleteAccount() {
  openModal("deleteConfirm");
}

function confirmDeleteAccount() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  // Kullanıcıyı Firebase auth ve DB’den sil
  db.ref("users/" + user.uid).remove();
  user.delete().then(() => {
    alert("Hesabınız silindi!");
    location.reload();
  }).catch(err => {
    alert("Hesap silinemedi: " + err.message);
  });
  closeModals();
}
