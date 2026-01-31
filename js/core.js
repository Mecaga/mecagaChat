// Ekran geçişleri
window.showRegister = () => { loginScreen.classList.add("hidden"); registerScreen.classList.remove("hidden"); };
window.showLogin = () => { registerScreen.classList.add("hidden"); loginScreen.classList.remove("hidden"); };

// Giriş
window.login = function() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth.signInWithEmailAndPassword(email,password)
    .then(userCredential => {
      const user = userCredential.user;
      loadUserData(user);
    })
    .catch(err => alert("❌ Giriş Hatası: " + err.message));
};

// Kayıt
window.register = function() {
  const username = regUsername.value;
  const email = regEmail.value;
  const password = regPassword.value;

  auth.createUserWithEmailAndPassword(email,password)
    .then(userCredential => {
      const user = userCredential.user;
      db.ref("users/"+user.uid).set({
        username: username,
        email: email,
        platform: detectPlatform()
      });
      enterApp(username,user.uid);
    })
    .catch(err => alert("❌ Kayıt Hatası: "+err.message));
};

// Kullanıcı verilerini yükle
function loadUserData(user){
  db.ref("users/"+user.uid+"/username").once("value").then(snap=>{
    const name = snap.val() || "user";
    enterApp(name,user.uid);
  });
}

// Platform algılama
function detectPlatform(){
  const ua = navigator.userAgent;
  if(/android/i.test(ua)) return "Android";
  if(/iPad|Tablet/i.test(ua)) return "Tablet";
  return "PC";
}

// Ana ekrana geçiş
function enterApp(username,uid){
  loginScreen.classList.add("hidden");
  registerScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  myUser.innerText = username+"#"+uid.slice(0,4);

  // ekran boyutu ayarı
  if(detectPlatform()==="Android" || detectPlatform()==="Tablet"){
    mainScreen.style.fontSize="14px";
  } else {
    mainScreen.style.fontSize="16px";
  }
}
