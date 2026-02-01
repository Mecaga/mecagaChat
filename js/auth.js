// js/auth.js
document.getElementById("loginBtn").onclick = login;
document.getElementById("registerBtn").onclick = register;
document.getElementById("logoutBtn").onclick = logout;

auth.onAuthStateChanged(user => {
  if (user) {
    db.ref("users/" + user.uid).once("value").then(snap => {
      showChat(snap.val().username);
      loadMessages();
    });
  } else {
    showAuth();
  }
});

function register() {
  const username = registerUsername.value.trim();
  const email = registerEmail.value.trim();
  const password = registerPassword.value;

  if (!username) return alert("Kullanıcı adı boş");

  auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      db.ref("users/" + res.user.uid).set({
        username: username
      });
    });
}

function login() {
  auth.signInWithEmailAndPassword(
    loginEmail.value,
    loginPassword.value
  );
}

function logout() {
  auth.signOut();
}
