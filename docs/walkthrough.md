# AI 客服機器人 原型開發紀錄 (Walkthrough)

我們已經成功完成了「AI 客服聊天機器人」的 MVP 原型開發。以下是實作內容的總結與操作指南。

## 1. 實作功能清單
- **[x] 高質感 UI 設計**：採用現代感十足的玻璃擬態 (Glassmorphism) 風格與平滑動畫。
- **[x] Serverless 後端架構**：成功串接 Google Sheets API (GAS)，實現免伺服器的動態資料庫管理。
- **[x] 智能意圖辨識與引導**：
    - **FAQ 檢索**：自動比對關鍵字提供運費、退換貨、支付等資訊。
    - **商品推薦**：支援擴充至 50+ 項目的商品資料庫，根據使用者需求動態展示商品卡片。
    - **動態真人轉接**：不僅在多次錯誤時跳出，當 FAQ 回覆內文含有「轉接真人」時，亦能自動解析並無縫渲染出對應的 UI 按鈕。
- **[x] 快速動作按鈕**：提供常見問題的快捷選單，提升易用性。

## 2. 檔案結構
- [index.html](file:///Users/fongmingchong/raccoon-ai/index.html)：主要的 Demo 頁面（包含 UI 結構）。
- [src/app.js](file:///Users/fongmingchong/raccoon-ai/src/app.js)：核心商業邏輯，處理資料載入、狀態與互動。
- [data/faq.json](file:///Users/fongmingchong/raccoon-ai/data/faq.json) / [data/products.json](file:///Users/fongmingchong/raccoon-ai/data/products.json)：備用的本地資料庫，確保斷網時依然可用。
- [docs/product_spec.md](file:///Users/fongmingchong/raccoon-ai/docs/product_spec.md)：產品規格文件。

## 3. 如何預覽 Demo
1. 導覽至專案目錄：`/Users/fongmingchong/raccoon-ai`
2. 直接使用瀏覽器打開 `index.html`。
3. **測試建議路徑**：
    - 點擊下方按鈕「運費計算」。
    - 輸入「我想買個禮物」查看推薦卡片。
    - 輸入「我要找真人客服」測試轉接功能。

## 4. 下一步優化方向 (Next Steps)
- **接入真實 LLM**：目前意圖辨識依賴本地邏輯與字串比對，未來可串接 Gemini API 實現真正的自然語言理解。
- **向量資料庫 (Vector DB)**：當 FAQ 或商品增加到千級別時，改用 RAG 架構（如 Pinecone 或 ChromaDB）。
- **個人化行銷**：記錄使用者歷史點擊行為，優化商品推薦的優先順序。
