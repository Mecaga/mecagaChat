import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
ref,
push,
onValue,
get
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.onclick = () => {
sidebar.classList.toggle("open");
};


const msgInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

let currentUser = null;


/* Kullanıcı kontrol */

onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href = "index.html";
return;
}

currentUser = user;

/* Kullanıcı adı çek */

const snap = await get(ref(db,"users/"+user.uid));

if(snap.exists()){

document.getElementById("usernameDisplay").innerText =
snap.val().username + "#" + snap.val().tag;

}

/* Mesajları dinle */

onValue(ref(db,"messages"), (snapshot)=>{

messagesDiv.innerHTML = "";

snapshot.forEach(child=>{

const msg = child.val();

const div = document.createElement("div");

div.classList.add("message");

if(msg.uid === user.uid){
div.classList.add("myMessage");
}

div.innerText = msg.username + ": " + msg.text;

messagesDiv.appendChild(div);

});

});

});


/* Mesaj gönder */

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
username: document.getElementById("usernameDisplay").innerText,
text: text,
time: Date.now()

});

msgInput.value = "";

}
