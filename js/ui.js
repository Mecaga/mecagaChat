window.changeUsername = () => {
  if (!auth.currentUser) {
    alert("❌ Giriş yapmalısınız!");
    return;
  }

  const newName = prompt("Yeni kullanıcı adı:");
  if (!newName) return;

  const uid = auth.currentUser.uid;

  // Firebase Realtime Database güncelle
  db.ref("users/" + uid).update({ username: newName })
    .then(() => {
      myUser.innerText = newName + "#" + uid.slice(0, 4);
      alert("✅ Kullanıcı adınız güncellendi!");
    })
    .catch(err => alert("❌ Hata: " + err.message));
};
