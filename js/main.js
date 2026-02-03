import { register, login } from "./auth.js";

const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

window.registerUser = async function(){

await register(
usernameInput.value,
emailInput.value,
passwordInput.value
);

alert("Kayıt başarılı");

};

window.loginUser = async function(){

await login(
emailInput.value,
passwordInput.value
);

window.location.href="chat.html";

};
