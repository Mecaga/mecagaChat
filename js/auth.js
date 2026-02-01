// auth.js

auth.onAuthStateChanged(user => {
  if (user) {
    showChat();
    loadMessages();
  } else {
    showLogin();
  }
});

function login() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, pass)
    .catch(err => alert(err.message));
}

function register() {
  const email = document.getElementById("registerEmail").value;
  const pass = document.getElementById("registerPassword").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut();
}
