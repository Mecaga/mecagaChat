window.toggleFriends = () => togglePanel("friendsPanel");
window.toggleMail = () => togglePanel("mailPanel");
window.toggleBox = () => togglePanel("boxPanel");

function togglePanel(id) {
  const panel = document.getElementById(id);
  panel.classList.toggle("hidden");
  ["friendsPanel","mailPanel","boxPanel"].forEach(pid => {
    if(pid!==id) document.getElementById(pid).classList.add("hidden");
  });
}
