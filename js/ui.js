// ====================== UI / DOM ======================

// DOM elementleri
const profilePanel = document.getElementById("profilePanel");
const mailPanel = document.getElementById("mailPanel");
const profileDiv = document.getElementById("profile");
const friendsPanel = document.getElementById("friendsPanel");
const chatPanel = document.getElementById("chatPanel");
const messagesDiv = document.getElementById("messages");
const chatTitle = document.getElementById("chatTitle");
const friendsList = document.getElementById("friendsList");
const channelList = document.getElementById("channelList");
const activeChatsList = document.getElementById("activeChats");

// ====================== PANEL AÇ / KAPA ======================

function openProfile(){
  profilePanel.style.display =
    profilePanel.style.display === "none" ? "block" : "none";
  mailPanel.style.display = "none";
}

function openMail(){
  mailPanel.style.display =
    mailPanel.style.display === "none" ? "block" : "none";
  profilePanel.style.display = "none";
  renderMailPanel();
}

function toggleFriendsPanel(){
  friendsPanel.style.display =
    friendsPanel.style.display === "none" ? "block" : "none";
  renderFriendsPanel();
}

function toggleChatPanel(){
  chatPanel.style.display =
    chatPanel.style.display === "none" ? "block" : "none";
  renderChatPanel();
}

// ====================== RENDER ======================

function renderFriendsPanel(){
  friendsList.innerHTML = "";

  friends.forEach(f=>{
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="friends-online ${f.online ? "online" : "offline"}"></span>
      ${f.name}#${f.id}
      <span class="friend-actions">
        <button onclick="startFriendChat('${f.id}')">💬</button>
        <button onclick="removeFriend('${f.id}')">❌</button>
      </span>
    `;
    friendsList.appendChild(li);
  });
}

function renderChatPanel(){
  // Gruplar
  channelList.innerHTML = "";
  activeChats.filter(c=>c.type==="group").forEach(c=>{
    const li = document.createElement("li");
    li.className = "chat-item group";
    li.innerText = `${c.name}#${c.id}`;
    li.onclick = ()=>switchChannel(`${c.name}#${c.id}`);
    channelList.appendChild(li);
  });

  // Arkadaş sohbetleri
  activeChatsList.innerHTML = "";
  activeChats.filter(c=>c.type==="friend").forEach(c=>{
    const full = `${c.name}#${c.id}`;
    const li = document.createElement("li");
    li.className = "chat-item friend";
    li.innerHTML = `
      ${full}
      ${unreadMessages[full] ? '<span class="unread-dot"></span>' : ''}
    `;
    li.onclick = ()=>switchChannel(full);
    activeChatsList.appendChild(li);
  });
}

function renderMessages(){
  messagesDiv.innerHTML = "";

  if(!channels[currentChannel]) return;

  channels[currentChannel].messages.forEach(m=>{
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<b>${m.user}:</b> ${m.text}`;
    messagesDiv.appendChild(div);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ====================== PROFİL ======================

function saveName(){
  const input = document.getElementById("changeName");
  const newName = input.value.trim();
  if(!newName) return alert("Boş olamaz");

  user.name = newName;
  profileDiv.innerText = `${user.name}#${user.id}`;

  // Eski mesajlardaki ismi güncelle
  Object.values(channels).forEach(ch=>{
    ch.messages.forEach(m=>{
      if(m.userId === user.id) m.user = user.name;
    });
  });

  renderMessages();
  renderFriendsPanel();
  renderChatPanel();
}

