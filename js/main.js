const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = () => {
    const text = messageInput.value;
    if (text === "") return;

    addMessage("Sen", text);
    messageInput.value = "";
};

