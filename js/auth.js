import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
ref,
set
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

export async function register(username,email,password){

const userCred = await createUserWithEmailAndPassword(auth,email,password);

const uid = userCred.user.uid;

/* Rastgele 4 haneli ID */
const userTag = Math.floor(1000 + Math.random() * 9000);

await set(ref(db,"users/"+uid),{

username: username,
tag: userTag

});

}
