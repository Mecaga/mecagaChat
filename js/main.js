// main.js

// HTML elemanları
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Mesaj gönderme
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // ui.js içindeki fonksiyon
    addMessage("Sen", text);

    messageInput.value = "";
}

