window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("myUser").innerText =
        user.email.split("@")[0] + "#" + user.uid.slice(0, 4);
      enterApp();
    })
    .catch((error) => {
      alert("❌ Giriş başarısız: " + error.message);
    });
};

window.register = function () {
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // kullanıcıyı database'e kaydet
      db.ref("users/" + user.uid).set({
        username: username,
        email: email
      });

      document.getElementById("myUser").innerText =
        username + "#" + user.uid.slice(0, 4);

      enterApp();
    })
    .catch((error) => {
      alert("❌ Kayıt başarısız: " + error.message);
    });
};

window.showRegister = function () {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.remove("hidden");
};

window.showLogin = function () {
  document.getElementById("registerScreen").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
};

function enterApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("registerScreen").classList.add("hidden");
  document.getElementById("mainScreen").classList.remove("hidden");
}
