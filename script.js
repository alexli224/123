// script.js

document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const messageText = userInput.value.trim();

    if (messageText !== '') {
        addMessage('user', messageText);
        userInput.value = '';

        // Simulate a bot response
        setTimeout(function() {
            let botResponse = '';

            // Check for specific questions and respond accordingly
            if (messageText.toLowerCase().includes('你好')) {
                botResponse = '你好！我是小狗的替身！有什么我可以帮助你的？';
            } else if (messageText.toLowerCase().includes('名字')) {
                botResponse = '我是一个小狗创造的机器小狗，目前还没有名字！';
            } else if (messageText.toLowerCase().includes('是谁')) {
                botResponse = '我是一个小狗创造的机器小狗，目前还没有名字！';
            } else if (messageText.toLowerCase().includes('最喜欢谁')) {
                botResponse = '小狗当然最喜欢可可猪啦！';
            } else if (messageText.toLowerCase().includes('你能做什么')) {
                botResponse = '我目前只能回答可可猪一些简单的问题，并且模仿小狗聊天。';
            } else if (messageText.toLowerCase().includes('你过来')) {
                botResponse = '小狗一直陪在可可猪身边。';
            } else if (messageText.toLowerCase().includes('在哪')) {
                botResponse = '小狗在可可猪心里';
            } else if (messageText.toLowerCase().includes('想你')) {
                botResponse = '小狗也想可可猪！';
            } else if (messageText.toLowerCase().includes('啊啊')) {
                botResponse = '疯狂可可！';
            } else if (messageText.toLowerCase().includes('公主')) {
                botResponse = '你好公主殿下！';
            } else {
                botResponse = "我目前还不懂诶！小猪以后再来问吧！";
            }

            addMessage('bot', botResponse);
        }, 500);
    }
}


function addMessage(sender, text) {
    const chatHistory = document.getElementById('chat-history');
    const messageElement = document.createElement('div');
    const avatarElement = document.createElement('img');
    const messageContentElement = document.createElement('div');

    messageElement.classList.add('chat-message');
    avatarElement.classList.add('avatar');
    messageContentElement.classList.add('message-content');

    messageContentElement.textContent = text;

    if (sender === 'user') {
        messageElement.classList.add('user-message');
        avatarElement.src = 'https://p8.itc.cn/images01/20210712/58988b898401400e8824d4b0bd7daca5.jpeg';  // Path to user avatar image
        avatarElement.alt = 'User Avatar';
    } else if (sender === 'bot') {
        messageElement.classList.add('bot-message');
        avatarElement.src = 'https://img.shoplineapp.com/media/image_clips/620b69a4b62f160029421122/original.png?1644915107';  // Path to bot avatar image
        avatarElement.alt = 'Bot Avatar';
    }

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(messageContentElement);
    chatHistory.appendChild(messageElement);

    // Scroll to the bottom of the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
function showMessage(messageElement) {
    messageElement.classList.add('chat-message');
}

function handleNewMessage(messageText) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-content';
    messageElement.textContent = messageText;
    const messageWrapper = document.createElement('div');
    messageWrapper.className = 'chat-message-wrapper';
    messageWrapper.appendChild(messageElement);
    document.querySelector('.chat-history').appendChild(messageWrapper);
    
    requestAnimationFrame(() => {
        showMessage(messageWrapper);
    });
}
