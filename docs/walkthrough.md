# AI 客服機器人 原型開發紀錄 (Walkthrough)

我們已經成功完成了「AI 客服聊天機器人」的 MVP 原型開發。以下是實作內容的總結與操作指南。

## 1. 實作功能清單
- **[x] 高質感 UI 設計**：採用現代感十足的玻璃擬態 (Glassmorphism) 風格與平滑動畫。
- **[x] 智能意圖辨識 (模擬)**：
    - **FAQ 檢索**：自動比對關鍵字提供運費、退換貨、支付等資訊。
    - **商品推薦**：根據使用者尋找禮物的需求，展示格式化的商品卡片。
    - **真人轉接**：偵測到不滿或特定需求時，提供轉接按鈕與模擬彈窗。
- **[x] 快速動作按鈕**：提供常見問題的快捷選單，提升易用性。

## 2. 檔案結構
- [index.html](file:///Users/fongmingchong/raccoon-ai/index.html)：主要的 Demo 頁面（包含 UI 與邏輯）。
- [data/faq.json](file:///Users/fongmingchong/raccoon-ai/data/faq.json)：FAQ 知識庫原始資料。
- [data/products.json](file:///Users/fongmingchong/raccoon-ai/data/products.json)：商品清單原始資料。
- [docs/product_spec.md](file:///Users/fongmingchong/raccoon-ai/docs/product_spec.md)：產品規格文件。

## 3. 如何預覽 Demo
1. 導覽至專案目錄：`/Users/fongmingchong/raccoon-ai`
2. 直接使用瀏覽器打開 `index.html`。
3. **測試建議路徑**：
    - 點擊下方按鈕「運費計算」。
    - 輸入「我想買個禮物」查看推薦卡片。
    - 輸入「我要找真人客服」測試轉接功能。

## 4. 下一步優化方向 (Next Steps)
- **接入真實 LLM**：目前使用邏輯判斷，未來可串接 Gemini API 實現真正的自然語言理解。
- **向量資料庫**：當 FAQ 增加到上千條時，改用 RAG 架構（如 Pinecone 或 ChromaDB）。
- **後端整合**：實作簡單的 API Server 來動態管理資料庫內容。
