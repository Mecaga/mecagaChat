import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


export function register(username,email,password){

return createUserWithEmailAndPassword(auth,email,password)
.then((cred)=>{

set(ref(db,"users/"+cred.user.uid),{
username: username,
email: email
});

});

}


export function login(email,password){

return signInWithEmailAndPassword(auth,email,password);

}
