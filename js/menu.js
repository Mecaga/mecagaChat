import { auth, db } from "./firebase.js";
import { signOut, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { ref, get }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.onclick = () => sidebar.classList.toggle("open");

document.getElementById("logoutBtn").onclick = async ()=>{
await signOut(auth);
window.location="index.html";
};

onAuthStateChanged(auth, async user=>{

if(!user){
window.location="index.html";
return;
}

const snap = await get(ref(db,"users/"+user.uid));

const data = snap.val();

document.getElementById("usernameDisplay").innerText =
data.username + "#" + data.tag;

});
