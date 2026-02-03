import { signOut } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
ref,
push,
onValue,
get
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


// ================= SIDEBAR =================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
sidebar.classList.toggle("open");
});


// ================= ELEMENTLER =================

const usernameDisplay = document.getElementById("usernameDisplay");
const msgInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let currentUser = null;
let currentUsername = "Bilinmiyor";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {

await signOut(auth);

window.location.href = "index.html";

});


// ================= KULLANICI KONTROL =================

onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href = "index.html";
return;
}

currentUser = user;


// Firebase kullanıcı verisi çek
try{

const snap = await get(ref(db,"users/"+user.uid));

if(snap.exists()){

const data = snap.val();

currentUsername = data.username + "#" + data.tag;

usernameDisplay.innerText = currentUsername;

}else{

usernameDisplay.innerText = "Kullanıcı bulunamadı";

}

}catch(err){
console.log(err);
}


// ================= MESAJLARI DİNLE =================

onValue(ref(db,"messages"), (snapshot)=>{

messagesDiv.innerHTML = "";

snapshot.forEach(child=>{

const msg = child.val();

const div = document.createElement("div");

div.classList.add("message");

if(msg.uid === currentUser.uid){
div.classList.add("myMessage");
}

div.innerText = msg.username + ": " + msg.text;

messagesDiv.appendChild(div);

});

});

});


// ================= MESAJ GÖNDER =================

sendBtn.addEventListener("click", sendMessage);

msgInput.addEventListener("keypress", (e)=>{
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
