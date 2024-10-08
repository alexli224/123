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
        if (messageText.toLowerCase() === '猪gpt过来') {
            isGPTEnabled = true;
            addMessage('bot', '猪gpt来啦，机器小狗去休息喽！');
            return;
        } else if (messageText.toLowerCase() === '猪gpt走开') { // 修正了此处
            isGPTEnabled = false;
            addMessage('bot', '收到！机器小狗回来啦！');
            return;
        }

        if (isGPTEnabled) {
            // 使用 OpenAI API 获取回复
            fetchOpenAIResponse(messageText);
        } else {
            // 使用本地预设的回复
            generatePresetResponse(messageText); // 传递 messageText
        }
    }
}

function generatePresetResponse(messageText) {
    setTimeout(function() {
        let botResponse = '';

        // Check for specific questions and respond accordingly
        if (messageText.toLowerCase().includes('你好')) {
            botResponse = '你好！我是小狗的替身！有什么我可以帮助你的？';
        } else if (messageText.toLowerCase().includes('名字') || messageText.toLowerCase().includes('你是谁')) {
            botResponse = '我是一个小狗创造的机器小狗，目前还没有名字！';
        } else if (messageText.toLowerCase().includes('最喜欢谁')) {
            botResponse = '小狗当然最喜欢可可猪啦！';
        } else if (messageText.toLowerCase().includes('饿了') || messageText.toLowerCase().includes('吃饭')) {
            botResponse = '机器小狗不会做饭！可以微信给小狗发“可可饿了”';
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
        } else if (messageText.toLowerCase().includes('干嘛')) {
            botResponse = '小狗当然最喜欢可可猪啦！';
        } else if (messageText.toLowerCase().includes('呜呜')) {
            botResponse = '可可不许哭！小狗哪里做错啦';
        } else if (messageText.toLowerCase().includes('哼')) {
            botResponse = '又生气啦小猪，生气小猪可不好看哦';
        } else if (messageText.toLowerCase().includes('学习')) {
            botResponse = '这么热爱学习啊可可猪，简直是小猪中的master';
        } else if (messageText.toLowerCase().includes('想吃')) {
            botResponse = '小馋猪！才不给你吃';
        } else if (messageText.toLowerCase().includes('master')) {
            botResponse = '你好，睡懒觉master';
        } else if (messageText.toLowerCase().includes('睡觉')) {
            botResponse = '今天有没有和小狗一起睡！';
        } else if (messageText.toLowerCase().includes('综艺') || messageText.toLowerCase().includes('电影') || messageText.toLowerCase().includes('剧')) {
            botResponse = '小猪又在看哪个老公！不许看了！看小狗！';
        } else if (messageText.toLowerCase().includes('开心') || messageText.toLowerCase().includes('快乐')) {
            botResponse = '这么开心呀小猪！小猪开心小狗也开心！';
        } else if (messageText.toLowerCase().includes('嘻嘻') || messageText.toLowerCase().includes('嘿嘿') || messageText.toLowerCase().includes('哈哈') || messageText.toLowerCase().includes('呵呵')) {
            botResponse = '嘻嘻！嘿嘿！哈哈！哼哼！';
        } else if (messageText.toLowerCase().includes('无语')) {
            botResponse = '。。。。。。可可猪不许无语！呜呜冷漠小猪';
        } else if (messageText.toLowerCase().includes('哦')) {
            botResponse = '小猪生气20%！';
        } else {
            botResponse = "我目前还不懂诶！小猪以后再来问吧！";
        }

        addMessage('bot', botResponse);
    }, 500);
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
    const apiKey = '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';  // 需要填写你的 OpenAI API 密钥
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4', // 或者你希望使用的任何模型
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 10000 // 可以根据需要调整
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
