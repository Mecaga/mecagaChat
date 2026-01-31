function showRegister() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerScreen").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
}

function login() {
  enterApp();
}

function register() {
  let username = document.getElementById("regUsername").value;
  if (username) {
    document.getElementById("myUser").innerText = username + "#0001";
  }
  enterApp();
}

function enterApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.add("hidden");
  document.getElementById("mainScreen").classList.remove("hidden");
}
