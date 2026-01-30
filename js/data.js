// ====================== DATA ======================

// Kullanıcı
let user = {
  name: "Misafir",
  id: Math.floor(Math.random() * 9000 + 1000)
};

// Arkadaşlar
let friends = [
  { name: "Ahmet", id: "1001", online: true },
  { name: "Ayşe", id: "1002", online: false }
];

// Aktif sohbetler
let activeChats = [];

// Kanallar
let channels = {
  "Genel#0000": {
    messages: [],
    owner: null
  }
};

// Okunmamış mesajlar
let unreadMessages = {};

// Aktif kanal
let currentChannel = "Genel#0000";

