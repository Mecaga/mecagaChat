// js/ui.js
function showAuth() {
  document.getElementById("authScreen").classList.remove("hidden");
  document.getElementById("chatScreen").classList.add("hidden");
}

function showChat(username) {
  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("chatScreen").classList.remove("hidden");
  document.getElementById("myUsername").innerText = username;
}
