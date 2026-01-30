function sendMessage(){
  const input = document.getElementById("messageInput");
  if(!input.value.trim()) return;

  if(!channels[currentChannel]){
    channels[currentChannel] = { messages: [], owner: null };
  }

  channels[currentChannel].messages.push({
    user: user.name,
    userId: user.id,
    text: input.value
  });

  input.value = "";
  renderMessages();
}

function switchChannel(name){
  currentChannel = name;
  document.getElementById("chatTitle").innerText = name;
  unreadMessages[name] = 0;
  renderMessages();
  renderChatPanel();
}
