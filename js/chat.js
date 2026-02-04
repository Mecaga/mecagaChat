import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
doc,
getDoc,
collection,
addDoc,
onSnapshot,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const userTag = document.getElementById("userTag");
const logoutBtn = document.getElementById("logoutBtn");

let currentUserTag = "";

/* Kullanıcı kontrol */

onAuthStateChanged(auth, async (user) => {

if(!user){
window.location.href="index.html";
return;
}

const userDoc = await getDoc(doc(db,"users",user.uid));
currentUserTag = userDoc.data().tag;

userTag.innerText = currentUserTag;

loadMessages();

});


/* Mesaj Gönder */

window.sendMessage = async function(){

if(messageInput.value.trim()=="") return;

await addDoc(collection(db,"messages"),{

user: currentUserTag,
text: messageInput.value,
time: Date.now()

});

messageInput.value="";

}


/* Mesajları Yükle */

function loadMessages(){

const q = query(collection(db,"messages"), orderBy("time"));

onSnapshot(q,(snapshot)=>{

chatBox.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

const div = document.createElement("div");
div.className="message";

div.innerText = data.user + " : " + data.text;

chatBox.appendChild(div);

});

});

}


/* Çıkış */

logoutBtn.onclick = async ()=>{

await signOut(auth);
window.location.href="index.html";

}/* KULLANICI */

onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href="index.html";
return;
}

currentUser = user;

const snap = await get(ref(db,"users/"+user.uid));

const data = snap.val();

currentUsername = data.username + "#" + data.tag;

usernameDisplay.innerText = currentUsername;


/* MESAJ DİNLE */

onValue(ref(db,"messages"), (snapshot)=>{

messagesDiv.innerHTML="";

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


/* MESAJ GÖNDER */

sendBtn.onclick = sendMessage;

msgInput.addEventListener("keypress",(e)=>{
if(e.key==="Enter") sendMessage();
});


function sendMessage(){

const text = msgInput.value.trim();
if(text==="") return;

push(ref(db,"messages"),{

uid: currentUser.uid,
username: currentUsername,
text: text,
time: Date.now()

});

msgInput.value="";
}
