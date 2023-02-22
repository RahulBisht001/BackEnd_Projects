const socket = io()

let Name;
/*
This do while loop will work till you provide the UserName
doesn't matter you cancel it or OK it. if name.length()=0
it will run the loop
*/
do {
    Name = prompt('Please Enter Your Name')
} while (!Name)

let textarea = document.getElementById('textarea')
let messageArea = document.querySelector('.message-area')

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})


const sendMessage = (msg) => {

    let msgObj = {
        user: Name,
        message: msg.trim()
    }
    // Append
    appendMessage(msgObj, 'outgoing')
    scrollToBottom()
    textarea.value = ''

    // Sending to the server
    socket.emit('message', msgObj)
}

const appendMessage = (msgObj, type) => {

    let mainDiv = document.createElement('div')
    let className = type

    mainDiv.classList.add(className, 'message')
    let markup = `
     <h4>${msgObj.user}</h4>
    <p>${msgObj.message}</p> `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Receiving msg
socket.on('message', (msgObj) => {
    appendMessage(msgObj, 'incoming')
    scrollToBottom()
})


// Scrolling to the last message

const scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight
}