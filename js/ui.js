// ================= PANELS & MODALS =================
const panels = ["friendsPanel", "mailPanel", "boxPanel"];
const modals = ["channelForm", "joinForm", "userMenu", "deleteConfirm"];

// Tüm panelleri gizle
function hideAllPanels() {
  panels.forEach(id => {
    const panel = document.getElementById(id);
    if (panel) panel.classList.add("hidden");
  });
}

// Tüm modalları gizle
function hideAllModals() {
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("hidden");
  });
}

// Panel aç/kapa
function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  const isOpen = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) panel.classList.remove("hidden");
}

// Kullanıcı menüsü aç/kapa
function toggleUserMenu() {
  const menu = document.getElementById("userMenu");
  if (!menu) return;
  const isOpen = !menu.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();
  if (!isOpen) menu.classList.remove("hidden");
}

// Modal aç
function showModal(modalId) {
  hideAllPanels();
  hideAllModals();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("hidden");
}

// Modal kapat
function closeModals() {
  hideAllModals();
}

// ================= BUTTON FUNCTIONS =================

// Arkadaşlar paneli
function toggleFriends() {
  togglePanel("friendsPanel");
}

// Mail paneli
function toggleMail() {
  togglePanel("mailPanel");
}

// Box paneli
function toggleBox() {
  togglePanel("boxPanel");
}

// Kanal oluştur modal
function showCreateChannel() {
  showModal("channelForm");
}

// Kanal katıl modal
function showJoinChannel() {
  showModal("joinForm");
}

// Hesabı sil modal
function showDeleteConfirm() {
  showModal("deleteConfirm");
}

// Kullanıcı adı değiştir modal (userMenu içinde olacak)
function changeUsername() {
  const newName = prompt("Yeni kullanıcı adınızı girin:");
  if (!newName) return;

  const user = firebase.auth().currentUser;
  if (!user) return;

  user.updateProfile({
    displayName: newName
  }).then(() => {
    document.getElementById("myUser").innerText = newName + "#" + user.uid.slice(0, 4);
    alert("Kullanıcı adı güncellendi!");
  }).catch(err => {
    console.error(err);
    alert("Hata oluştu!");
  });

  closeModals();
}

// Hesabı sil
function deleteAccount() {
  showDeleteConfirm();
}

// Hesabı sil onayla
function confirmDeleteAccount() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  user.delete().then(() => {
    alert("Hesap silindi!");
    window.location.reload();
  }).catch(err => {
    console.error(err);
    alert("Hesap silinemedi! Tekrar giriş yapmayı deneyin.");
  });

  closeModals();
}

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {
  // Kullanıcı adı tıklama
  const myUser = document.getElementById("myUser");
  if (myUser) myUser.addEventListener("click", toggleUserMenu);
});
