import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

function generateID(){
return Math.floor(1000 + Math.random() * 9000);
}

window.register = async function(){

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!username || !email || !password){
alert("Tüm alanları doldur");
return;
}

try{

const userCred = await createUserWithEmailAndPassword(auth,email,password);

const id = generateID();

await setDoc(doc(db,"users",userCred.user.uid),{
username: username,
tag: username + "#" + id
});

window.location.href="chat.html";

}catch(err){
alert(err.message);
}

}

window.login = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

await signInWithEmailAndPassword(auth,email,password);
window.location.href="chat.html";

}catch(err){
alert(err.message);
}

}
