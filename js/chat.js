import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
ref,
push,
onValue,
get
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


/* ========================= */
/* SIDEBAR */
/* ========================= */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.onclick = () => {
sidebar.classList.toggle("open");
};


/* ========================= */
/* ELEMENTLER */
/* ========================= */

const msgInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let currentUser = null;
let currentUsername = "";


/* ========================= */
/* KULLANICI KONTROL */
/* ========================= */

onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href = "index.html";
return;
}

currentUser = user;

/* Firebase kullanıcı verisi çek */
const snap = await get(ref(db,"users/"+user.uid));

if(snap.exists()){

const data = snap.val();

currentUsername = data.username + "#" + data.tag;

/* ÜSTTE GÖSTER */
document.getElementById("usernameDisplay").innerText =
currentUsername;

}


/* ========================= */
/* MESAJLARI DİNLE */
/* ========================= */

onValue(ref(db,"messages"), (snapshot)=>{

messagesDiv.innerHTML = "";

snapshot.forEach(child=>{

const msg = child.val();

const div = document.createElement("div");

div.classList.add("message");

if(msg.uid === currentUser.uid){
div.classList.add("myMessage");
}

/* username#tag mesajda görünür */
div.innerText = msg.username + ": " + msg.text;

messagesDiv.appendChild(div);

});

});

});


/* ========================= */
/* MESAJ GÖNDER */
/* ========================= */

sendBtn.onclick = sendMessage;

msgInput.addEventListener("keypress", function(e){
if(e.key === "Enter"){
sendMessage();
}
});

function sendMessage(){

const text = msgInput.value.trim();

if(text === "") return;

push(ref(db,"messages"),{

uid: currentUser.uid,
username: currentUsername,
text: text,
time: Date.now()

});

msgInput.value = "";

}
