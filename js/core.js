window.showRegister = function () {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.remove("hidden");
}

window.showLogin = function () {
  document.getElementById("registerScreen").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
}

window.login = function () {
  enterApp();
}

window.register = function () {
  const username = document.getElementById("regUsername").value;
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
