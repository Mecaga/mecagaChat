// Kayıt ol
async function register(email, password, name, avatarFile){
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    currentUser = userCredential.user;

    let avatarURL = "";
    if(avatarFile){
      const avatarRef = storage.ref().child(`avatars/${currentUser.uid}`);
      await avatarRef.put(avatarFile);
      avatarURL = await avatarRef.getDownloadURL();
    }

    await db.ref(`users/${currentUser.uid}`).set({
      name: name,
      email: email,
      avatarURL: avatarURL
    });

    showChat(name);

  } catch(e){
    alert(e.message);
  }
}

// Giriş yap
async function login(email, password){
  try{
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    currentUser = userCredential.user;
    const snapshot = await db.ref(`users/${currentUser.uid}/name`).get();
    showChat(snapshot.val());
  } catch(e){
    alert(e.message);
  }
}

// Chat ekranını göster
function showChat(name){
  document.getElementById("authDiv").style.display = "none";
  document.getElementById("chatDiv").style.display = "block";
  document.getElementById("userName").innerText = name;
}
