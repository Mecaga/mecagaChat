// ================= FRIENDS SYSTEM =================
const db = firebase.database();
const auth = firebase.auth();

// Arkadaş ekleme
function sendFriendRequest() {
  const input = document.getElementById("addFriendInput");
  const friendTag = input.value.trim();
  if (!friendTag) return alert("Lütfen kullanıcı adını girin.");

  const user = auth.currentUser;
  if (!user) return;

  // Basit kullanıcı etiketiyle arkadaş ekleme
  db.ref("users").orderByChild("tag").equalTo(friendTag).once("value", snapshot => {
    if (!snapshot.exists()) {
      return alert("Kullanıcı bulunamadı!");
    }

    snapshot.forEach(child => {
      const friendUid = child.key;
      if (friendUid === user.uid) return alert("Kendinizi ekleyemezsiniz!");

      // Arkadaş ekleme
      db.ref("friends/" + user.uid + "/" + friendUid).set(true);
      db.ref("friends/" + friendUid + "/" + user.uid).set(true);

      alert(friendTag + " eklendi!");
      input.value = "";
      loadFriends(); // Listeyi yenile
    });
  });
}

// Arkadaş listesini yükleme
function loadFriends() {
  const friendsList = document.getElementById("friendsList");
  friendsList.innerHTML = "";

  const user = auth.currentUser;
  if (!user) return;

  db.ref("friends/" + user.uid).once("value", snapshot => {
    snapshot.forEach(child => {
      const friendUid = child.key;

      db.ref("users/" + friendUid).once("value", userSnap => {
        const friend = userSnap.val();
        if (friend) {
          const div = document.createElement("div");
          div.innerText = friend.username + "#" + friend.uid.slice(0, 4);
          friendsList.appendChild(div);
        }
      });
    });
  });
}

// Auth state değişince arkadaşları yükle
auth.onAuthStateChanged(user => {
  if (user) loadFriends();
});

