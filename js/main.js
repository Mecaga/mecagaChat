import { register, login } from "./auth.js";

window.registerUser = async function(){

const username = usernameInput.value;
const email = emailInput.value;
const password = passwordInput.value;

try{
await register(username,email,password);
alert("Kayıt başarılı");
}catch(e){
alert(e.message);
}

}

window.loginUser = async function(){

const email = emailInput.value;
const password = passwordInput.value;

try{
await login(email,password);
alert("Giriş başarılı");
}catch(e){
alert(e.message);
}

}
