// Ekranlar arası geçiş
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
  else return "PC";
}

// Ana ekrana geçiş
function enterApp(username,uid){
  loginScreen.classList.add("hidden");
  registerScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  myUser.innerText = username+"#"+uid.slice(0,4);

  // ekran boyutunu platforma göre ayarla
  if(detectPlatform()==="Android"){
    mainScreen.style.fontSize="14px";
  } else {
    mainScreen.style.fontSize="16px";
  }
}

// Kullanıcı adı değiştirme
window.changeUsername = function(){
  if(!auth.currentUser) return alert("❌ Giriş yapmalısınız!");
  const newName = prompt("Yeni kullanıcı adı:");
  if(!newName) return;
  const uid = auth.currentUser.uid;
  db.ref("users/"+uid).update({username:newName})
    .then(()=> myUser.innerText=newName+"#"+uid.slice(0,4))
    .catch(err=>alert("❌ Hata: "+err.message));
};

// Hesap silme
window.deleteAccount = function(){
  if(!auth.currentUser) return;
  const confirmDel = confirm("❌ Hesabınızı silmek istediğinize emin misiniz?");
  if(!confirmDel) return;

  const uid = auth.currentUser.uid;

  // 1️⃣ Mesaj, arkadaşlık ve diğer verileri sil
  db.ref("users/"+uid).remove();
  db.ref("friends/"+uid).remove();
  db.ref("friendRequests/"+uid).remove();
  db.ref("chats/").once("value").then(chats=>{
    chats.forEach(chatSnap=>{
      const chatId = chatSnap.key;
      chatSnap.forEach(msgSnap=>{
        if(msgSnap.val().sender===uid){
          msgSnap.ref.update({sender:"deleteuser#0000"});
        }
      });
    });
  });

  // 2️⃣ Firebase Auth hesabını sil
  auth.currentUser.delete().then(()=>{
    alert("✅ Hesabınız silindi!");
    location.reload();
  }).catch(err=>{
    alert("❌ Hata: "+err.message);
  });
};
// Kullanıcı adı üzerine basınca menü aç
window.toggleUserMenu = () => {
  userMenu.classList.toggle("hidden");
};

// Kullanıcı adı değiştir
window.changeUsername = () => {
  if(!auth.currentUser) return alert("❌ Giriş yapmalısınız!");
  const newName = prompt("Yeni kullanıcı adı:");
  if(!newName) return;

  const uid = auth.currentUser.uid;
  db.ref("users/"+uid).update({username:newName})
    .then(() => myUser.innerText=newName+"#"+uid.slice(0,4))
    .catch(err=>alert("❌ Hata: "+err.message));
};

// Hesap silme
window.deleteAccount = () => {
  if(!auth.currentUser) return;
  const confirmDel = confirm("❌ Hesabınızı silmek istediğinize emin misiniz?");
  if(!confirmDel) return;

  const uid = auth.currentUser.uid;

  // 1️⃣ Mesajlar ve arkadaş listesi
  db.ref("users/"+uid).remove();
  db.ref("friends/"+uid).remove();
  db.ref("friendRequests/"+uid).remove();
  db.ref("chats/").once("value").then(chats=>{
    chats.forEach(chatSnap=>{
      const chatId = chatSnap.key;
      chatSnap.forEach(msgSnap=>{
        if(msgSnap.val().sender===uid){
          msgSnap.ref.update({sender:"deleteuser#0000"});
        }
      });
    });
  });

  // 2️⃣ Auth hesabını sil
  auth.currentUser.delete().then(()=>{
    alert("✅ Hesabınız silindi!");
    location.reload();
  }).catch(err=>alert("❌ Hata: "+err.message));
};
window.showCreateChannel = () => {
  channelForm.classList.remove("hidden");
  joinForm.classList.add("hidden");
};

window.showJoinChannel = () => {
  joinForm.classList.remove("hidden");
  channelForm.classList.add("hidden");
};

window.createChannel = () => {
  const name = channelNameInput.value;
  if(!name) return alert("Kanal adı gerekli!");
  const uid = auth.currentUser.uid;
  const id = Math.floor(Math.random()*9000+1000); // basit ID

  db.ref("channels/"+name+"#"+id).set({
    creator: uid,
    name: name
  }).then(()=>alert("✅ Kanal oluşturuldu!"));
};

window.joinChannel = () => {
  const fullName = joinChannelInput.value;
  db.ref("channels/"+fullName).once("value").then(snap=>{
    if(!snap.exists()) return alert("❌ Kanal bulunamadı!");
    alert("✅ Kanal katıldınız!");
  });
};

window.openGeneralChannel = () => {
  alert("Genel Sohbet açıldı!");
};
