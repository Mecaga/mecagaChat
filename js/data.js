// VERİLER

let user = {
  name: "Misafir",
  id: Math.floor(Math.random() * 9000 + 1000)
};

let friends = [
  { name: "Ahmet", id: "1001", online: true },
  { name: "Ayşe", id: "1002", online: false }
];

let activeChats = [];

let channels = {
  "Genel#0000": { messages: [], owner: null }
};

let unreadMessages = {};

let currentChannel = "Genel#0000";
