window.sendMessage = function () {
  let input = document.getElementById("messageInput");
  if (!input.value) return;

  let msg = document.createElement("div");
  msg.innerText = "Sen: " + input.value;

  document.getElementById("messages").appendChild(msg);
  input.value = "";
}
