const auth = firebase.auth();

// ================= KAYIT =================
function register() {
  const username = document.getElementById("registerUsername").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!username || !email || !password) {
    alert("Tüm alanları doldur");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return cred.user.updateProfile({
        displayName: username
      });
    })
    .then(() => {
      console.log("Kayıt başarılı");
    })
    .catch(err => alert(err.message));
}

// ================= GİRİŞ =================
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .catch(err => alert(err.message));
}

// ================= OTOMATİK YÖNLENDİRME =================
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("authScreen").classList.add("hidden");
    document.getElementById("chatScreen").classList.remove("hidden");

    document.getElementById("myUser").innerText =
      user.displayName + "#" + user.uid.slice(0, 4);

    loadMessages();
  } else {
    document.getElementById("authScreen").classList.remove("hidden");
    document.getElementById("chatScreen").classList.add("hidden");
  }
});
