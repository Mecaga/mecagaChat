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

  function register() {
  const email = document.getElementById("registerEmail").value;
  const pass = document.getElementById("registerPassword").value;
  const username = document.getElementById("registerUsername").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(cred => {
      return cred.user.updateProfile({
        displayName: username
      });
    })
    .catch(err => alert(err.message));
}


function logout() {
  auth.signOut();
}
