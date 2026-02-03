import { register, login } from "./auth.js";

window.registerUser = async function(){

try{
await register(usernameInput.value,emailInput.value,passwordInput.value);
alert("Kayıt başarılı");
}catch(e){
alert(e.message);
}

}

window.loginUser = async function(){

try{
await login(emailInput.value,passwordInput.value);

window.location.href = "chat.html";

}catch(e){
alert(e.message);
}

}
