function login() {
  enterApp();
}

function register() {
  enterApp();
}

function enterApp() {
  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("mainScreen").classList.remove("hidden");
}
