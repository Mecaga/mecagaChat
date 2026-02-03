import { register, login } from "./auth.js";

window.registerUser = async function(){

await register(
usernameInput.value,
emailInput.value,
passwordInput.value
);

alert("Kayıt tamam");

};

window.loginUser = async function(){

await login(
emailInput.value,
passwordInput.value
);

window.location="menu.html";

};
