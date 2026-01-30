// ====================== CHAT ======================

function sendMessage(){
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if(!text) return;

  if(!channels[currentChannel]){
    channels[currentChannel] = { messages: [], owner: null };
  }

  channels[currentChannel].messages.push({
    user: user.name,
    userId: user.id,
    text: text,
    time: Date.now()
  });

  input.value = "";
  renderMessages();
}

// Kanal değiştir
function switchChannel(name){
  currentChannel = name;
  document.getElementById("chatTitle").innerText = name;
  unreadMessages[name] = 0;
  renderMessages();
  renderChatPanel();
}

// Arkadaş sohbeti başlat
function startFriendChat(id){
  const f = friends.find(x=>x.id==id);
  if(!f) return;

  const full = `${f.name}#${f.id}`;

  if(!activeChats.find(c=>c.id==f.id && c.type==="friend")){
    activeChats.push({ name: f.name, id: f.id, type: "friend" });
  }

  if(!channels[full]){
    channels[full] = { messages: [], owner: null };
  }

  switchChannel(full);
}

// Arkadaş sil
function removeFriend(id){
  if(!confirm("Arkadaş silinsin mi?")) return;
  friends = friends.filter(f=>f.id!=id);
  activeChats = activeChats.filter(c=>c.id!=id);
  renderFriendsPanel();
  renderChatPanel();
}

// Başlangıç
document.getElementById("profile").innerText =
  `${user.name}#${user.id}`;

renderFriendsPanel();
renderChatPanel();
renderMessages();
