document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// 状态变量来控制 GPT 模式
let isGPTEnabled = false;

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const messageText = userInput.value.trim();

    if (messageText !== '') {
        addMessage('user', messageText);
        userInput.value = '';

        // 检查是否是切换 GPT 模式的指令
        if (messageText.toLowerCase() === '召唤gpt') {
            isGPTEnabled = true;
            addMessage('bot', 'GPT 模式已开启！现在由 OpenAI 来回答。');
            return;
        } else if (messageText.toLowerCase() === '关闭gpt') {
            isGPTEnabled = false;
            addMessage('bot', 'GPT 模式已关闭！恢复预设回答模式。');
            return;
        }

        if (isGPTEnabled) {
            // 使用 OpenAI API 获取回复
            fetchOpenAIResponse(messageText);
        } else {
            // 使用本地预设的回复
            generatePresetResponse(messageText);
        }
    }
}

function generatePresetResponse(messageText) {
    let botResponse = '';

    // 预设的回答逻辑
    if (messageText.toLowerCase().includes('你好')) {
        botResponse = '你好！我是小狗的替身！有什么我可以帮助你的？';
    } else if (messageText.toLowerCase().includes('名字') || messageText.toLowerCase().includes('你是谁')) {
        botResponse = '我是一个小狗创造的机器小狗，目前还没有名字！';
    } else if (messageText.toLowerCase().includes('最喜欢谁')) {
        botResponse = '小狗当然最喜欢可可猪啦！';
    } 
    // 其他预设回答...
    else {
        botResponse = "我目前还不懂诶！小猪以后再来问吧！";
    }

    addMessage('bot', botResponse);
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
        avatarElement.src = 'keke.png';  // Path to user avatar image
        avatarElement.alt = 'User Avatar';
    } else if (sender === 'bot') {
        messageElement.classList.add('bot-message');
        avatarElement.src = 'meme.png';  // Path to bot avatar image
        avatarElement.alt = 'Bot Avatar';
    }

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(messageContentElement);
    chatHistory.appendChild(messageElement);

    // Scroll to the bottom of the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function fetchOpenAIResponse(prompt) {
    const apiKey = 'sk-qyKAMUhS14rHUYb_67mIsWWfKpfELE4X04epgmkhX_T3BlbkFJnMLM1rlC82pZKL07MrrfMpEHRPC0vnmX-4HobGrh0A';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // 或者你希望使用的任何模型
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100 // 可以根据需要调整
            })
        });

        const data = await response.json();
        const gptResponse = data.choices[0].message.content;
        addMessage('bot', gptResponse);
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        addMessage('bot', '抱歉，无法从 OpenAI 获取响应。');
    }
}
