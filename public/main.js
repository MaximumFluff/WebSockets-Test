let socket = io('http://localhost:4000');

let button = document.getElementById('submit');
let message = document.getElementById('message');
let user = document.getElementById('user');
let output = document.getElementById('chatbox');
let isTyping = document.getElementById('isTyping');

button.addEventListener('click', () => {
  const date = new Date();
  socket.emit('chat', {
    message: message.value,
    user: user.value,
    date: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  })
})

message.addEventListener('keypress', () => {
  socket.emit('typing', user.value);
})

socket.on('chat', data => {
  output.innerHTML += `<p><strong>${data.user}</strong> (${data.date}): ${data.message}</p>`
})

socket.on('typing', data => {
  isTyping.innerHTML = `<p>${data} is typing...</p>`
})