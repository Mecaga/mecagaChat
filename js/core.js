window.login = function () {
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      const user = res.user;
      myUser.innerText = user.email.split("@")[0] + "#" + user.uid.slice(0,4);
      enterApp();
    })
    .catch(err => alert(err.message));
};

window.register = function () {
  const username = regUsername.value;
  const email = regEmail.value;
  const password = regPassword.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      const user = res.user;
      db.ref("users/" + user.uid).set({
        username,
        email
      });
      myUser.innerText = username + "#" + user.uid.slice(0,4);
      enterApp();
    })
    .catch(err => alert(err.message));
};

window.showRegister = () => {
  loginScreen.classList.add("hidden");
  registerScreen.classList.remove("hidden");
};

window.showLogin = () => {
  registerScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
};

function enterApp() {
  loginScreen.classList.add("hidden");
  registerScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
}
