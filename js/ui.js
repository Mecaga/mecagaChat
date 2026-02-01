// ui.js

function showLogin() {
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("chatScreen").style.display = "none";
}

function showChat() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("chatScreen").style.display = "flex";
}
