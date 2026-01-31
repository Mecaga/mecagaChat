window.closeAllPanels();

const panels = ["friendsPanel", "mailPanel", "boxPanel"];

function closeAllPanels() {
  panels.forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });
}

function togglePanel(panelId) {
  const panel = document.getElementById(panelId);
  const isOpen = !panel.classList.contains("hidden");

  closeAllPanels();

  if (!isOpen) {
    panel.classList.remove("hidden");
  }
}

window.toggleFriends = () => togglePanel("friendsPanel");
window.toggleMail = () => togglePanel("mailPanel");
window.toggleBox = () => togglePanel("boxPanel");
