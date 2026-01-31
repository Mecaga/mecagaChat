function toggleFriends() {
  togglePanel("friendsPanel");
}

function toggleMail() {
  togglePanel("mailPanel");
}

function toggleBox() {
  togglePanel("boxPanel");
}

function togglePanel(id) {
  document.getElementById(id).classList.toggle("hidden");
}

function changeUsername() {
  let newName = prompt("Yeni kullanıcı adı:");
  if (newName) {
    document.getElementById("myUser").innerText = newName + "#0001";
  }
}
