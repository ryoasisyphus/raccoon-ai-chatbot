const FAQ = [
    { keywords: ['運費', '郵資'], answer: "全站訂單滿 **NT$1,000** 即享免運！一般運費為 NT$80。" },
    { keywords: ['訂單', '追蹤', '進度'], answer: "您可以至「個人中心 > 我的訂單」查看即時物流狀態。一般發貨後約 2-3 個工作天送達。" },
    { keywords: ['優惠', '折扣', '活動'], answer: "本月慶典：全館滿 3,000 折 300！輸入代碼 `RACCOON88` 即可使用。" },
    { keywords: ['會員', '等級', '點數'], answer: "我們分為銀、金、鑽石三級。消費 1 元集 1 點，點數可直接折抵現金喔！" }
];

const PRODUCTS = [
    { name: "極簡質感保溫瓶", price: 880, desc: "304 不鏽鋼, 長效保溫" },
    { name: "降噪真無線耳機", price: 2480, desc: "沉浸式聽覺體驗" },
    { name: "智能氣氛燈", price: 1200, desc: "聲控切換 1600 萬色" }
];

let failCount = 0;
const chatWindow = document.getElementById('chat-window');
const welcomeScreen = document.getElementById('welcome-screen');
const userInput = document.getElementById('user-input');

// 0. 深色模式手動切換
window.toggleTheme = function() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('raccoon_theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('raccoon_theme', 'dark');
    }
};

const PLACEHOLDERS = [
    "跟我說點什麼吧...",
    "試試看：運費怎麼算？",
    "試試看：我想挑選禮物 ✨",
    "試試看：如何追蹤訂單？ 📦",
    "試試看：有哪些會員優惠？ 💎"
];

function startPlaceholderRotation() {
    let index = 0;
    setInterval(() => {
        index = (index + 1) % PLACEHOLDERS.length;
        userInput.placeholder = PLACEHOLDERS[index];
    }, 4000);
}

// 1. 初始化：載入歷史紀錄與啟動佔位符輪播
window.onload = () => {
    // 恢復主題
    const savedTheme = localStorage.getItem('raccoon_theme');
    if (savedTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
    
    startPlaceholderRotation();
    const history = JSON.parse(localStorage.getItem('raccoon_chat_history') || '[]');
    if (history.length > 0) {
        welcomeScreen.style.display = 'none';
        history.forEach(msg => appendMessage(msg.role, msg.content, msg.isHtml, false));
    }
};

// 2. 儲存紀錄到 LocalStorage
function saveHistory(role, content, isHtml) {
    const history = JSON.parse(localStorage.getItem('raccoon_chat_history') || '[]');
    history.push({ role, content, isHtml });
    localStorage.setItem('raccoon_chat_history', JSON.stringify(history.slice(-20))); // 只存最近 20 條
}

// 3. 訊息渲染 (支援逐字打字效果)
async function appendMessage(role, content, isHtml = false, shouldAnimate = true) {
    if (welcomeScreen && welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}-msg`;
    chatWindow.appendChild(msgDiv);

    if (role === 'ai' && shouldAnimate && !isHtml) {
        // 逐字打字效果
        let i = 0;
        const timer = setInterval(() => {
            msgDiv.textContent += content.charAt(i);
            i++;
            chatWindow.scrollTop = chatWindow.scrollHeight;
            if (i >= content.length) {
                clearInterval(timer);
                saveHistory(role, content, isHtml);
            }
        }, 30);
    } else {
        if (isHtml) msgDiv.innerHTML = content;
        else msgDiv.textContent = content;
        chatWindow.scrollTop = chatWindow.scrollHeight;
        if (shouldAnimate) saveHistory(role, content, isHtml);
    }
}

// 4. 語音輸入 (Web Speech API)
window.startVoice = function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("您的瀏覽器不支援語音辨識 😢");
        return;
    }
    const recognition = new SpeechRecognition();
    const btn = document.getElementById('voice-btn');
    
    recognition.lang = 'zh-TW';
    recognition.start();
    btn.classList.add('active');

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        userInput.value = text;
        btn.classList.remove('active');
        sendMessage();
    };

    recognition.onerror = () => btn.classList.remove('active');
    recognition.onend = () => btn.classList.remove('active');
};

// 5. 分享/複製商品功能
window.copyProduct = function(name, price) {
    const text = `推薦商品：${name}\n價格：NT$ ${price}\n立即查看：https://example.com/raccoon-shop`;
    navigator.clipboard.writeText(text).then(() => {
        alert("✅ 商品訊息已複製到剪貼簿！");
    });
};

window.handleQuickAction = function(text) {
    userInput.value = text;
    sendMessage();
};

window.sendMessage = function() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';
    
    document.getElementById('typing-indicator').style.display = 'block';
    setTimeout(() => {
        document.getElementById('typing-indicator').style.display = 'none';
        processResponse(text);
    }, 1200);
};

function processResponse(text) {
    let found = FAQ.find(f => f.keywords.some(k => text.includes(k)));
    if (found) {
        failCount = 0;
        appendMessage('ai', found.answer);
        return;
    }

    if (text.includes('推薦') || text.includes('禮物') || text.includes('買')) {
        failCount = 0;
        let html = "這是我為您精選的幾款熱門商品：<br>";
        PRODUCTS.forEach(p => {
            html += `
                <div class="product-card">
                    <button class="share-btn" onclick="copyProduct('${p.name}', ${p.price})" title="分享商品">🔗</button>
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">NT$ ${p.price}</div>
                    <div style="font-size:12px; color:var(--text-muted);">${p.desc}</div>
                </div>`;
        });
        appendMessage('ai', html, true);
        return;
    }

    failCount++;
    if (failCount === 1) {
        let html = "抱歉，我不太確定您的意思。您是不是想詢問以下內容？<br>";
        html += `<button class="suggestion-btn" onclick="handleQuickAction('最新優惠活動')">🔎 最近有什麼優惠嗎？</button>`;
        html += `<button class="suggestion-btn" onclick="handleQuickAction('如何追蹤訂單')">🔎 怎麼查看我的包裹進度？</button>`;
        html += `<button class="suggestion-btn" onclick="handleQuickAction('運費怎麼算')">🔎 運費是多少？</button>`;
        appendMessage('ai', html, true);
    } else {
        let html = "很抱歉我還是無法準確回答您的問題 😅<br>為了更有效地協助您，您是否需要聯繫我們的「真人專員」進行一對一處理？";
        html += `<div class="handover-card">
                    <p>專員將在 5 分鐘內與您連線</p>
                    <button class="handover-btn" onclick="triggerHandover()">立即聯繫真人客服</button>
                 </div>`;
        appendMessage('ai', html, true);
    }
}

window.triggerHandover = function() {
    appendMessage('user', "我要聯繫真人客服");
    setTimeout(() => {
        appendMessage('ai', "好的，正在為您接通客服專員... 請稍候。");
    }, 800);
};
