window.showCreateChannel = () => { channelForm.classList.remove("hidden"); joinForm.classList.add("hidden"); };
window.showJoinChannel = () => { joinForm.classList.remove("hidden"); channelForm.classList.add("hidden"); };
window.createChannel = () => {
  const name = channelNameInput.value;
  if(!name) return alert("Kanal adı gerekli!");
  const uid = auth.currentUser.uid;
  const id = Math.floor(Math.random()*9000+1000);
  db.ref("channels/"+name+"#"+id).set({creator: uid, name: name})
    .then(()=>alert("✅ Kanal oluşturuldu!"));
};
window.joinChannel = () => {
  const fullName = joinChannelInput.value;
  db.ref("channels/"+fullName).once("value").then(snap=>{
    if(!snap.exists()) return alert("❌ Kanal bulunamadı!");
    alert("✅ Kanal katıldınız!");
  });
};
window.openGeneralChannel = () => { alert("Genel Sohbet açıldı!"); };
window.sendMessage = () => { alert("Mesaj gönderme fonksiyonu henüz eklenmedi!"); };
