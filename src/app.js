let FAQ = [
    // 物流與運費
    { keywords: ['運費', '郵資', '免運'], answer: "全站訂單滿 **NT$1,000** 即享免運！未達門檻一般宅配運費為 NT$80，超商取貨為 NT$60。" },
    { keywords: ['訂單', '追蹤', '進度', '出貨'], answer: "您可以至「個人中心 > 我的訂單」查看即時物流狀態。一般商品發貨後約 2-3 個工作天送達。" },
    { keywords: ['海外', '國際', '寄國外'], answer: "目前我們支援寄送至香港、澳門與新加坡，海外運費均一價 NT$350，約 5-7 個工作天送達。" },
    // 退換貨與售後
    { keywords: ['退換貨', '退貨', '換貨'], answer: "我們提供 **7 天猶豫期**無條件退貨服務。請保持商品全新且包裝完整，至「我的訂單」點選申請退貨即可。" },
    { keywords: ['退款', '多久退錢'], answer: "收到您的退貨包裹並驗收無誤後，我們將於 3-5 個工作天內完成退款程序。退款將退回原付款信用卡或指定帳戶。" },
    { keywords: ['瑕疵', '壞掉', '保固'], answer: "非常抱歉讓您收到瑕疵商品！請在收到商品 3 天內拍照並傳送給客服，我們將立即為您安排免費換新。家電類商品均享有一年原廠保固。" },
    // 支付與帳務
    { keywords: ['付款方式', '怎麼付錢', '信用卡'], answer: "我們支援多種付款方式：線上刷卡 (Visa/JCB/MasterCard)、LINE Pay、Apple Pay、以及超商取貨付款。" },
    { keywords: ['分期', '零利率'], answer: "單筆訂單滿 NT$3,000 即可享有信用卡 3 期零利率；滿 NT$10,000 可享 6 期零利率。" },
    { keywords: ['發票', '統編', '載具'], answer: "全站皆開立電子發票。結帳時可選擇捐贈、存入手機條碼載具，或輸入公司統編報帳。" },
    // 會員與優惠
    { keywords: ['優惠', '折扣', '活動', '促銷'], answer: "本月慶典：全館滿 3,000 折 300！結帳輸入代碼 `RACCOON88` 即可自動折抵。" },
    { keywords: ['會員', '等級', '點數'], answer: "會員分為銀卡、金卡、鑽石卡三級。消費 1 元集 1 點，點數可直接折抵現金（100點=1元），生日當月再享點數雙倍送！" },
    { keywords: ['生日禮', '壽星'], answer: "當月壽星將獲得專屬 NT$200 折價券，並享有單筆訂單點數雙倍回饋！請確保您已填寫完整會員資料。" }
];

let PRODUCTS = [
    { id: 'p1', name: "極簡質感保溫瓶", price: 880, category: "居家生活", desc: "304 不鏽鋼材質，長效保溫保冷 12 小時。霧面烤漆提升質感。", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 'p2', name: "降噪真無線耳機", price: 2480, category: "科技酷玩", desc: "主動降噪技術，沉浸式聽覺體驗。單次續航 8 小時，支援無線充電。", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 'p3', name: "智能氣氛燈", price: 1200, category: "科技酷玩", desc: "聲控切換 1600 萬色，支援 APP 遠端控制。打造專屬居家氛圍。", image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 'p4', name: "人體工學辦公椅", price: 5600, category: "居家生活", desc: "高透氣網布，3D 扶手與可調式腰靠。久坐不累，提升工作效率。", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 'p5', name: "輕量防潑水後背包", price: 1580, category: "戶外休閒", desc: "多夾層設計，可容納 15 吋筆電。防潑水材質，通勤出遊皆宜。", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200&h=200" },
    { id: 'p6', name: "香氛蠟燭禮盒", price: 1280, category: "禮品精選", desc: "三種經典木質香調。天然大豆蠟，燃燒無黑煙，放鬆身心靈。", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=200&h=200" }
];

// --- 資料庫設定 ---
// 在這裡填入你發佈的 Google Apps Script Web App URL
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxWEcFhQ5xo2g88PYuRr-wbhpPYahJTqfnYGMwj_y8-SpQq4_m8t2OBre_d_58Yw2EUhg/exec"; 

let failCount = 0;
let currentProduct = null; // 追蹤當前選取的商品
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
    "試試看：有哪些會員優惠？ 💎",
    "試試看：可以退換貨嗎？ 🔄"
];

function startPlaceholderRotation() {
    let index = 0;
    setInterval(() => {
        index = (index + 1) % PLACEHOLDERS.length;
        userInput.placeholder = PLACEHOLDERS[index];
    }, 4000);
}

// 1. 初始化
window.onload = async () => {
    const savedTheme = localStorage.getItem('raccoon_theme');
    if (savedTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
    
    startPlaceholderRotation();
    
    // 如果有設定 GAS API，嘗試抓取遠端資料庫
    if (GAS_API_URL) {
        try {
            document.getElementById('typing-indicator').style.display = 'flex';
            const response = await fetch(GAS_API_URL);
            const data = await response.json();
            if (data.faq && data.faq.length > 0) FAQ = data.faq;
            if (data.products && data.products.length > 0) PRODUCTS = data.products;
            document.getElementById('typing-indicator').style.display = 'none';
            console.log('✅ 成功從 Google Sheets 載入資料庫！');
        } catch (error) {
            console.error('❌ 資料庫載入失敗，使用本地備用資料。', error);
            document.getElementById('typing-indicator').style.display = 'none';
        }
    }

    const history = JSON.parse(localStorage.getItem('raccoon_chat_history') || '[]');
    if (history.length > 0) {
        welcomeScreen.style.display = 'none';
        history.forEach(msg => appendMessage(msg.role, msg.content, msg.isHtml, false));
    }
};

function saveHistory(role, content, isHtml) {
    const history = JSON.parse(localStorage.getItem('raccoon_chat_history') || '[]');
    history.push({ role, content, isHtml });
    localStorage.setItem('raccoon_chat_history', JSON.stringify(history.slice(-30))); // 增加至保存 30 條
}

// 3. 訊息渲染 (支援打字效果與滿意度回饋)
function appendMessage(role, content, isHtml = false, shouldAnimate = true) {
    if (welcomeScreen && welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
    }

    const msgWrapper = document.createElement('div');
    msgWrapper.className = `message-wrapper ${role}-wrapper`;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role}-msg`;
    msgWrapper.appendChild(msgDiv);

    chatWindow.appendChild(msgWrapper);

    if (role === 'ai' && shouldAnimate && !isHtml) {
        let i = 0;
        const timer = setInterval(() => {
            msgDiv.textContent += content.charAt(i);
            i++;
            chatWindow.scrollTop = chatWindow.scrollHeight;
            if (i >= content.length) {
                clearInterval(timer);
                addFeedbackButtons(msgWrapper);
                saveHistory(role, content, isHtml);
            }
        }, 30);
    } else {
        if (isHtml) msgDiv.innerHTML = content;
        else msgDiv.textContent = content;
        
        if (role === 'ai') addFeedbackButtons(msgWrapper);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        if (shouldAnimate) saveHistory(role, content, isHtml);
    }
}

// 加入滿意度回饋按鈕
function addFeedbackButtons(wrapper) {
    // 避免重複加入
    if(wrapper.querySelector('.feedback-actions')) return;
    
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-actions';
    feedbackDiv.innerHTML = `
        <button onclick="handleFeedback(this, 'up')" title="有幫助">👍</button>
        <button onclick="handleFeedback(this, 'down')" title="沒幫助">👎</button>
    `;
    wrapper.appendChild(feedbackDiv);
}

window.handleFeedback = function(btn, type) {
    const parent = btn.parentElement;
    parent.innerHTML = type === 'up' ? '<span class="feedback-thanks">感謝您的回饋！💖</span>' : '<span class="feedback-thanks">感謝回饋，我們會努力改進！🛠️</span>';
};

// 4. 語音輸入
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

// 5. 商品互動
window.copyProduct = function(name, price) {
    const text = `推薦商品：${name}\n價格：NT$ ${price}\n立即查看：https://raccoon-ai.example.com/products`;
    navigator.clipboard.writeText(text).then(() => {
        alert("✅ 商品訊息已複製到剪貼簿！可以貼給朋友囉！");
    });
};

window.viewProductDetail = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    currentProduct = product; // 記錄當前商品
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = `NT$ ${product.price}`;
    document.getElementById('modal-desc').textContent = product.desc;
    document.getElementById('product-modal').style.display = 'flex';
};

window.closeModal = function() {
    document.getElementById('product-modal').style.display = 'none';
};

// --- 結帳流程 ---
window.goToCheckout = function() {
    if (!currentProduct) return;
    
    // 關閉商品彈窗
    closeModal();
    
    // 填入結帳頁面資料
    document.getElementById('checkout-img').src = currentProduct.image;
    document.getElementById('checkout-title').textContent = currentProduct.name;
    document.getElementById('checkout-price').textContent = `NT$ ${currentProduct.price}`;
    document.getElementById('checkout-total').textContent = `NT$ ${currentProduct.price}`;
    
    // 顯示結帳畫面
    document.getElementById('checkout-screen').style.display = 'flex';
};

window.closeCheckout = function() {
    document.getElementById('checkout-screen').style.display = 'none';
};

window.submitOrder = function() {
    const btn = document.querySelector('.confirm-order-btn');
    btn.textContent = '處理中...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        closeCheckout();
        btn.textContent = '確認結帳';
        btn.style.opacity = '1';
        
        // 返回聊天室並給予成功回饋
        appendMessage('ai', `🎉 <b>訂單成立！</b><br>您訂購的「${currentProduct.name}」已成功結帳。<br>訂單編號：#RCN-${Math.floor(Math.random() * 10000)}<br>您可隨時詢問我訂單進度喔！`, true);
        currentProduct = null;
    }, 1500);
};

// 6. 快捷操作與發送邏輯
window.handleQuickAction = function(text) {
    userInput.value = text;
    sendMessage();
};

window.sendMessage = function() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';
    
    document.getElementById('typing-indicator').style.display = 'flex'; // skeleton display is flex
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
        document.getElementById('typing-indicator').style.display = 'none';
        processResponse(text);
    }, Math.random() * 800 + 600); // 隨機延遲模擬更真實的思考
};

function processResponse(text) {
    // 1. 精準 FAQ
    let found = FAQ.find(f => f.keywords.some(k => text.includes(k)));
    if (found) {
        failCount = 0;
        appendMessage('ai', found.answer);
        return;
    }

    // 2. 推薦邏輯
    if (text.includes('推薦') || text.includes('禮物') || text.includes('買') || text.includes('科技') || text.includes('居家')) {
        failCount = 0;
        let html = "這是我為您精選的幾款商品，點擊卡片可以查看詳情喔：<div class='product-grid'>";
        
        // 簡單關鍵字過濾，若無則推薦前三個
        let filtered = PRODUCTS.filter(p => text.includes(p.category.substring(0,2)));
        let toShow = filtered.length > 0 ? filtered : PRODUCTS.slice(0, 3);

        toShow.forEach(p => {
            html += `
                <div class="product-card" onclick="viewProductDetail('${p.id}')">
                    <button class="share-btn" onclick="event.stopPropagation(); copyProduct('${p.name}', ${p.price})" title="分享商品">🔗</button>
                    <div class="product-name">${p.name}</div>
                    <div class="product-price">NT$ ${p.price}</div>
                    <div style="font-size:12px; color:var(--text-muted); margin-top: 4px;">${p.category}</div>
                </div>`;
        });
        html += "</div>";
        appendMessage('ai', html, true);
        return;
    }

    // 3. 失敗次數累計與引導
    failCount++;
    if (failCount === 1) {
        let html = "抱歉，我不太確定您的意思。您是不是想詢問以下分類的內容？<br>";
        html += `<div class="suggestion-grid">`;
        html += `<button class="suggestion-btn" onclick="handleQuickAction('如何退換貨')">🔄 售後與退換貨</button>`;
        html += `<button class="suggestion-btn" onclick="handleQuickAction('有哪些付款方式')">💳 支付與發票</button>`;
        html += `<button class="suggestion-btn" onclick="handleQuickAction('海外可以寄送嗎')">✈️ 海外配送</button>`;
        html += `<button class="suggestion-btn" onclick="handleQuickAction('我想找禮物')">🎁 推薦商品</button>`;
        html += `</div>`;
        appendMessage('ai', html, true);
    } else {
        let html = "看來我目前還無法完美解答您的問題 😅<br>別擔心，我們的真人客服專家已經準備好為您服務了！";
        html += `<div class="handover-card">
                    <p>平均連線等候時間：約 2 分鐘</p>
                    <button class="handover-btn" onclick="triggerHandover()">轉接真人專員</button>
                 </div>`;
        appendMessage('ai', html, true);
    }
}

window.triggerHandover = function() {
    appendMessage('user', "轉接真人專員");
    document.getElementById('typing-indicator').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('typing-indicator').style.display = 'none';
        
        // 模擬真人接入後的表單
        let html = `<b>已為您建立專屬客服單號 #RCN-8892</b><br>在專員連線前，您可以先留下詳細問題描述，我們將透過 Email 回覆您：`;
        html += `<div class="contact-form">
                    <input type="text" placeholder="您的信箱 (選填)" style="width: 100%; margin-top: 10px; padding: 8px; border-radius: 8px; border: 1px solid var(--border);">
                    <textarea placeholder="請簡述您的問題..." style="width: 100%; margin-top: 8px; padding: 8px; border-radius: 8px; border: 1px solid var(--border); height: 60px; resize: none;"></textarea>
                    <button class="handover-btn" style="margin-top: 8px; width: 100%;" onclick="alert('表單已送出，客服將盡速回覆！')">送出留言</button>
                 </div>`;
        appendMessage('ai', html, true);
        failCount = 0; // 重置計數器
    }, 1200);
};

// 7. 智慧導航分類 (UI Tabs Logic)
window.switchCategory = function(btn, category) {
    // 移除所有 active
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // 隱藏所有晶片，顯示對應分類
    document.querySelectorAll('.action-chip').forEach(chip => {
        if(category === 'all' || chip.dataset.cat === category) {
            chip.style.display = 'inline-block';
        } else {
            chip.style.display = 'none';
        }
    });
};
