// js/chat.js
let currentChannel = "general";

document.getElementById("sendBtn").onclick = sendMessage;

function sendMessage() {
  const text = messageInput.value.trim();
  const user = auth.currentUser;
  if (!text || !user) return;

  db.ref("channels/" + currentChannel + "/messages").push({
    uid: user.uid,
    text: text,
    time: Date.now()
  });

  messageInput.value = "";
}

function loadMessages() {
  messages.innerHTML = "";

  db.ref("channels/" + currentChannel + "/messages")
    .limitToLast(50)
    .on("child_added", snap => {
      const msg = snap.val();
      const div = document.createElement("div");
      div.innerText = msg.text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    });
}
import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { ref, get } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.onclick = () => {

sidebar.classList.toggle("open");

};


onAuthStateChanged(auth, async (user)=>{

if(!user){

window.location.href = "index.html";
return;

}

const snap = await get(ref(db,"users/"+user.uid));

if(snap.exists()){

document.getElementById("usernameDisplay").innerText =
snap.val().username;

}

});
