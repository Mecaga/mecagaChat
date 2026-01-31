window.toggleFriends = function () {
  togglePanel("friendsPanel");
}

window.toggleMail = function () {
  togglePanel("mailPanel");
}

window.toggleBox = function () {
  togglePanel("boxPanel");
}

function togglePanel(id) {
  document.getElementById(id).classList.toggle("hidden");
}

window.changeUsername = function () {
  const newName = prompt("Yeni kullanıcı adı:");
  if (newName) {
    document.getElementById("myUser").innerText = newName + "#0001";
  }
}
