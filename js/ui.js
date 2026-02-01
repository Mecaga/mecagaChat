// ================= PANELS & MODALS =================
const panels = ["friendsPanel", "mailPanel", "boxPanel"];
const modals = ["channelForm", "joinForm", "userMenu", "deleteConfirm"];

// --------- PANELLER ---------
function hideAllPanels() {
  panels.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function togglePanel(id) {
  const panel = document.getElementById(id);
  if (!panel) return;

  const isOpen = !panel.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();

  if (!isOpen) {
    panel.classList.remove("hidden");
  }
}

// --------- MODALLAR ---------
function hideAllModals() {
  modals.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function showModal(id) {
  hideAllPanels();
  hideAllModals();

  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeModals() {
  hideAllModals();
}

// ================= BUTON FONKSİYONLARI =================

// TOP BAR
function toggleFriends() {
  togglePanel("friendsPanel");
}

function toggleMail() {
  togglePanel("mailPanel");
}

function toggleBox() {
  togglePanel("boxPanel");
}

// MAIN BUTTONS
function showCreateChannel() {
  showModal("channelForm");
}

function showJoinChannel() {
  showModal("joinForm");
}

// USER MENU
function toggleUserMenu() {
  const menu = document.getElementById("userMenu");
  if (!menu) return;

  const isOpen = !menu.classList.contains("hidden");
  hideAllPanels();
  hideAllModals();

  if (!isOpen) {
    menu.classList.remove("hidden");
  }
}

// ================= ACCOUNT =================
function changeUsername() {
  const newName = prompt("Yeni kullanıcı adını gir:");
  if (!newName) return;

  const user = firebase.auth().currentUser;
  if (!user) return;

  user.updateProfile({ displayName: newName })
    .then(() => {
      document.getElementById("myUser").innerText =
        newName + "#" + user.uid.slice(0, 4);
      alert("Kullanıcı adı değiştirildi");
    })
    .catch(err => {
      console.error(err);
      alert("Hata oluştu");
    });

  closeModals();
}

function deleteAccount() {
  showModal("deleteConfirm");
}

function confirmDeleteAccount() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  user.delete()
    .then(() => {
      alert("Hesap silindi");
      location.reload();
    })
    .catch(err => {
      alert("Hesap silinemedi. Tekrar giriş yap.");
      console.error(err);
    });

  closeModals();
}
