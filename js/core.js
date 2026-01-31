// ================= GLOBAL STATE =================
let currentUser = null;
let currentChannel = "general";

// ================= SCREEN SWITCH =================
function showLogin() {
  hideAllScreens();
  document.getElementById("loginScreen").classList.remove("hidden");
}

function showRegister() {
  hideAllScreens();
  document.getElementById("registerScreen").classList.remove("hidden");
}

function showMain() {
  hideAllScreens();
  document.getElementById("mainScreen").classList.remove("hidden");
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.add("hidden");
  });
}

// ================= DEVICE DETECT =================
function isMobile() {
  return window.innerWidth <= 768;
}
