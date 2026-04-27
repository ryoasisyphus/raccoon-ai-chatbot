# Raccoon AI Assistant: 開發者指南 (Developer Guide)

本文件旨在協助開發人員快速理解專案架構，並完成從「靜態原型」到「動態應用」的轉換。

---

## 1. 專案結構說明
*   `index.html`: 應用的入口點，採用極簡結構。
*   `src/app.js`: 核心業務邏輯，包含意圖辨識 (Intent detection) 與 UI 交互。
*   `static/css/style.css`: 全域樣式，基於 CSS Variables 方便快速換膚。
*   `data/*.json`: 模擬資料庫，包含 FAQ 與商品清單。

---

## 2. 核心邏輯：意圖辨識 (Intent Handling)
目前的 `src/app.js` 使用的是基於關鍵字的「模擬意圖辨識」：
1.  **Exact Match**: 檢查輸入是否包含特定 FAQ 關鍵字。
2.  **Logic Branching**: 處理推薦請求與真人轉接的計數器 (`failCount`)。
3.  **UI Feedback**: 自動控制 `typing-indicator` 與滾動條位置。

---

## 3. 如何接入真實 LLM API (例如 Gemini)
若要將此原型轉為真實應用，請參考以下步驟：
1.  **環境設定**: 在後端 (Node.js/Python) 設定 API Key。
2.  **API 串接**:
    ```javascript
    async function getLLMResponse(userInput) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message: userInput })
        });
        return await response.json();
    }
    ```
3.  **更新 `src/app.js`**: 將 `processResponse` 函數中的本地判斷改為調用上述 API。
4.  **RAG 整合**: 將 `data/faq.json` 內容傳入 LLM 作為 `system_instruction` 或使用向量資料庫。

---

## 4. 數據更新
*   **更新 FAQ**: 修改 `data/faq.json` 中的內容。
*   **更新商品**: 修改 `data/products.json` 中的項目。
*   **更新視覺**: 替換 `static/concept.png`。

---

## 5. 部署建議
*   **前端**: 可直接部署至 Vercel, Netlify 或 GitHub Pages。
*   **後端**: 若需隱藏 API Key，建議使用 Vercel Functions 或 Cloudflare Workers 作為代理。
