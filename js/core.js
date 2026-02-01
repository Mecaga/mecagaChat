// ================= FIREBASE AUTH STATE =================
firebase.auth().onAuthStateChanged(user => {
  const loginScreen = document.getElementById("loginScreen");
  const registerScreen = document.getElementById("registerScreen");
  const mainScreen = document.getElementById("mainScreen");

  if (user) {
    // GİRİŞ VAR
    loginScreen.classList.add("hidden");
    registerScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");

    // Kullanıcı adını yaz
    const name = user.displayName || "kullanici";
    document.getElementById("myUser").innerText =
      name + "#" + user.uid.slice(0, 4);

    // 🔥 MESAJLARI SADECE BURADA YÜKLE
    loadMessages();

  } else {
    // GİRİŞ YOK
    mainScreen.classList.add("hidden");
    registerScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
  }
});

