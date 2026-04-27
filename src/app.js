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

function appendMessage(role, content, isHtml = false) {
    if (welcomeScreen && welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
    }
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}-msg`;
    if (isHtml) msgDiv.innerHTML = content;
    else msgDiv.textContent = content;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

window.handleQuickAction = function(text) {
    document.getElementById('user-input').value = text;
    sendMessage();
};

window.sendMessage = function() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';
    
    document.getElementById('typing-indicator').style.display = 'block';
    setTimeout(() => {
        document.getElementById('typing-indicator').style.display = 'none';
        processResponse(text);
    }, 1000);
};

function processResponse(text) {
    // 1. 精準匹配
    let found = FAQ.find(f => f.keywords.some(k => text.includes(k)));
    if (found) {
        failCount = 0;
        appendMessage('ai', found.answer);
        return;
    }

    // 2. 推薦邏輯
    if (text.includes('推薦') || text.includes('禮物') || text.includes('買')) {
        failCount = 0;
        let html = "這是我為您精選的幾款熱門商品：<br>";
        PRODUCTS.forEach(p => {
            html += `<div class="product-card"><div class="product-name">${p.name}</div><div class="product-price">NT$ ${p.price}</div><div style="font-size:12px; color:#64748b;">${p.desc}</div></div>`;
        });
        appendMessage('ai', html, true);
        return;
    }

    // 3. 模糊匹配 / 無法理解的動態引導
    failCount++;
    
    if (failCount === 1) {
        let html = "抱議，我不太確定您的意思。您是不是想詢問以下內容？<br>";
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
        alert("系統訊息：已成功發送專員連線請求。");
    }, 800);
};
