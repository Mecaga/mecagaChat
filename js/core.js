// ================= GLOBAL STATE =================
let currentUser = null;
let currentChannel = "general";

// ================= SCREEN SWITCH =================
function showLogin() {
  hideAllScreens();
  document.getElementById("loginScreen").classList.remove("hidden");
}

function showRegister() {
  hideAllScreens();
  document.getElementById("registerScreen").classList.remove("hidden");
}

function showMain() {
  hideAllScreens();
  document.getElementById("mainScreen").classList.remove("hidden");
}

function hideAllScreens() {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.add("hidden");
  });
}

// ================= DEVICE DETECT =================
function isMobile() {
  return window.innerWidth <= 768;
}

// ================= ARKADASLIK ISTEGI GONDERME =================
function sendFriendRequest() {
  const input = document.getElementById("addFriendInput").value.trim();
  if (!input.includes("#")) return alert("Kullanıcı adı hatalı");

  const [name, tag] = input.split("#");
  const db = firebase.database();
  const myUid = firebase.auth().currentUser.uid;

  db.ref("users").once("value", snap => {
    let targetUid = null;

    snap.forEach(user => {
      if (user.val().username === `${name}#${tag}`) {
        targetUid = user.key;
      }
    });

    if (!targetUid) return alert("Kullanıcı bulunamadı");
    if (targetUid === myUid) return alert("Kendini ekleyemezsin");

    db.ref(`friendRequests/${targetUid}/${myUid}`).set(true);
    alert("Arkadaş isteği gönderildi");
  });
}
