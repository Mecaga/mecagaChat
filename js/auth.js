import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { ref, set } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


export async function register(username,email,password){

const userCred = await createUserWithEmailAndPassword(auth,email,password);

const tag = Math.floor(1000 + Math.random()*9000);

await set(ref(db,"users/"+userCred.user.uid),{

username: username,
tag: tag

});

}

export async function login(email,password){
await signInWithEmailAndPassword(auth,email,password);
}
