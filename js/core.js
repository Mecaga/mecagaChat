// ====================== CORE DATA ======================
// Bu dosyada SADECE veri ve global durumlar var
// UI, Firebase, render YOK

// Kullanıcı
let user = {
  name: "Misafir",
  id: "0000"
};

// Arkadaş listesi
let friends = [
  { name: "Ahmet", id: "1001", online: true },
  { name: "Ayşe", id: "1002", online: false }
];

// Aktif sohbetler
// { name, id, type: "friend" | "group" }
let activeChats = [];

// Kanallar ve mesajlar
// "Genel#0000": { messages: [], owner: null }
let channels = {
  "Genel#0000": {
    messages: [],
    owner: null
  }
};

// Şu an açık olan sohbet
let currentChannel = "Genel#0000";

// Okunmamış mesajlar
// "Ahmet#1001": true
let unreadMessages = {};

// Arkadaşlık istekleri
// { fromId, fromName, toId, status }
let friendRequests = [];

// Bildirimler
// { userId, message, read }
let notifications = [];

