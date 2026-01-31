function showRegister(){loginScreen.classList.add('hidden');registerScreen.classList.remove('hidden')}
function showLogin(){registerScreen.classList.add('hidden');loginScreen.classList.remove('hidden')}

function login(){
  mainScreen.classList.remove('hidden');
  loginScreen.classList.add('hidden');
}

function register(){
  mainScreen.classList.remove('hidden');
  registerScreen.classList.add('hidden');
}

function closePopup(){
  popupOverlay.classList.add('hidden');
  createChannelPopup.classList.add('hidden');
  joinChannelPopup.classList.add('hidden');
}

function showCreateChannel(){
  closePopup();
  popupOverlay.classList.remove('hidden');
  createChannelPopup.classList.remove('hidden');
}

function showJoinChannel(){
  closePopup();
  popupOverlay.classList.remove('hidden');
  joinChannelPopup.classList.remove('hidden');
}

function openGeneralChannel(){
  chatTitle.innerText='Genel Sohbet';
}
