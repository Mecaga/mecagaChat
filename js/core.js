window.login = function() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;

      // Kullanıcı adı database'den alınacak
      db.ref("users/" + user.uid + "/username").once("value", snap => {
        const name = snap.val() || email.split("@")[0];
        myUser.innerText = name + "#" + user.uid.slice(0,4);
        enterApp();
      });
    })
    .catch(err => alert("❌ Giriş Hatası: " + err.message));
};

window.register = function() {
  const username = regUsername.value;
  const email = regEmail.value;
  const password = regPassword.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;

      db.ref("users/" + user.uid).set({
        username: username,
        email: email
      });

      myUser.innerText = username + "#" + user.uid.slice(0,4);
      enterApp();
    })
    .catch(err => alert("❌ Kayıt Hatası: " + err.message));
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

// Kullanıcı adı değiştirme
window.changeUsername = function() {
  if (!auth.currentUser) return alert("❌ Giriş yapmalısınız!");
  const newName = prompt("Yeni kullanıcı adı:");
  if (!newName) return;

  const uid = auth.currentUser.uid;

  db.ref("users/" + uid).update({ username: newName })
    .then(() => myUser.innerText = newName + "#" + uid.slice(0,4))
    .catch(err => alert("❌ Hata: " + err.message));
};
