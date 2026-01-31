window.sendMessage = () => {
  if (!messageInput.value) return;
  const div = document.createElement("div");
  div.innerText = "Sen: " + messageInput.value;
  messages.appendChild(div);
  messageInput.value = "";
};
