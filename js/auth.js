// ================= AUTH =================
const auth = firebase.auth();

// Ekranlar
const authScreen = document.getElementById("authScreen");
const chatScreen = document.getElementById("chatScreen");

// KAYIT
function register() {
  const email = document.getElementById("registerEmail").value.trim();
  const pass = document.getElementById("registerPassword").value.trim();
  const username = document.getElementById("registerUsername").value.trim();

  if (!email || !pass || !username) {
    alert("Tüm alanları doldur");
    return;
  }

  auth.createUserWithEmailAndPassword(email, pass)
    .then(res => {
      return res.user.updateProfile({
        displayName: username
      });
    })
    .then(() => {
      console.log("Kayıt OK");
    })
    .catch(err => alert(err.message));
}

// GİRİŞ
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();

  if (!email || !pass) {
    alert("Alanlar boş");
    return;
  }

  auth.signInWithEmailAndPassword(email, pass)
    .catch(err => alert(err.message));
}

// ÇIKIŞ
function logout() {
  auth.signOut();
}

// AUTH STATE (EN KRİTİK KISIM)
auth.onAuthStateChanged(user => {
  if (user) {
    // GİRİŞ VAR
    authScreen.classList.add("hidden");
    chatScreen.classList.remove("hidden");

    const myUser = document.getElementById("myUser");
    if (myUser) {
      myUser.innerText = user.displayName || "kullanici";
    }

    // mesajları yükle (chat.js'de var)
    if (typeof loadMessages === "function") {
      loadMessages();
    }

  } else {
    // GİRİŞ YOK
    chatScreen.classList.add("hidden");
    authScreen.classList.remove("hidden");
  }
});
