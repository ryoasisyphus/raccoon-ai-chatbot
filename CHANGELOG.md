# 更新日誌 (Changelog)

本專案遵循「易用性優先」的原則進行開發。以下是本開發階段的所有變更紀錄：

## [v1.7.0] - 2026-04-28

### 🚀 新增
- **Bypass 模式與自動化開發**：在 `docs/Development_Governance.md` 中新增第 8 章，授權 AI 在開發分支中自主執行非破壞性指令，減少開發過程中的人工確認。
- **風險隔離機制**：確立開發分支與自動 Commit 規範，確保 Bypass 模式下的變更具備可追溯性與快速還原能力。

## [v1.6.2] - 2026-04-28

### 🚀 新增
- **Agile/Scrum 治理體系**：在 `docs/Development_Governance.md` 中引進 Scrum 的完成定義 (DoD) 與回顧 (Retro) 機制。
- **治理 Subagent 協議**：建立 `docs/Governance_Subagent_Protocol.md`，定義 `Raccoon-Governor` 角色，支援主動測試情境與風險預警。

## [v1.6.1] - 2026-04-28

### 🚀 新增
- **分支與工作區治理**：在 `docs/Development_Governance.md` 中新增第 6 章，確立 Git 分支開發與 Worktree 隔離策略，防止 `main` 分支汙染。

## [v1.6.0] - 2026-04-28 (當前版本)
### 💎 專案治理與 UI 巔峰還原 (Governance & UI Restore)
- **[治理]** 建立 `docs/Development_Governance.md`：定義原子化變更、視覺繼承與 CHANGELOG 強制更新規範。
- **[治理]** 建立 `docs/Premium_UI_UX_Standards.md`：明訂玻璃擬態與互動細節標準。
- **[視覺]** **Senior PM 級 UI 恢復**：恢復高品質標題列布局、`.icon-btn` 懸浮細節及 `backdrop-filter: blur(30px)` 模糊質感。
- **[優化]** **對話歷史分層**：新增對話歷史分隔線與灰階降噪處理，提升使用者對當前對話的專注度。
- **[邏輯]** **FAQ 檢索強化**：重新實作模糊匹配演算法（正規化處理與雙向包含判定），確保 80 條 FAQ 檢索精準。
- **[移除]** **清除紀錄功能**：為維持核心穩定性，徹底拔除不穩定的選單式清除功能。
- **[修復]** 徹底清理 `app.js` 代碼汙染並修正 JavaScript 函式閉合語法錯誤。

## [v1.5.1] - 2026-04-27
### 🤖 LLM 效能最佳化 (Token Optimization)
- **[文件]** 重構內部工程文件 (`product_spec.md`, `developer_guide.md`, `Skill.md`) 為高度壓縮的 XML/YAML 混合標籤格式。
- **[目的]** 大幅降低 AI 讀取專案規範時的 Token 消耗，並藉由嚴格的結構化提升 AI 輸出代碼的精準度與一致性。

## [v1.5.0] - 2026-04-27
### ☁️ 無伺服器架構與動態邏輯升級 (Serverless & Dynamic Logic)
- **[架構]** 整合 **Google Sheets Serverless API**：將知識庫從靜態 JSON 升級為動態資料庫，實現免發布即時更新。
- **[功能]** 實作 **動態轉接真人機制 (Dynamic Handover)**：AI 判斷回覆中包含關鍵字時，自動渲染 UI 轉接按鈕。
- **[資料庫]** **商品擴充**：將商品目錄從 6 項擴充至 50+ 項，支援更廣泛的推薦情境。

## [v1.4.0] - 2026-04-27
### 🛍️ 電商體驗閉環與深度優化 (E-commerce & Deep Polish)
- **[新功能]** 實作 **「一鍵結帳流程 (Checkout Flow)」**：支援從商品詳情無縫切換至模擬結帳。
- **[新功能]** 新增 **「商品詳情微彈窗 (Product Modal)」**：點擊卡片查看大圖與詳細描述。
- **[新功能]** 導入 **「滿意度回饋機制 (Response Feedback)」**：提供 👍/👎 互動。
- **[新功能]** 加入 **「智慧導航標籤 (Smart Navigation Tabs)」**：分類快捷問題並升級為現代感膠囊按鈕。

## [v1.3.0] - 2026-04-27
### ✨ 極致易用性優化 (Usability Polish)
- **[新增]** 手動深色模式切換按鈕 (Manual Theme Toggle)。
- **[優化]** 語音輸入狀態回饋：點擊麥克風時圖示呈現閃爍動畫。
- **[持久化]** 記憶使用者的主題偏好 (Dark/Light Mode persistence)。

## [v1.2.0] - 2026-04-27
### 🧠 核心功能大改版 (Major Overhaul)
- **[功能]** 實作 **LocalStorage** 對話紀錄持久化，重新整理不丟失內容。
- **[功能]** 實作 **Natural Typing** 效果，模擬真人打字回應。
- **[功能]** 整合 **Web Speech API**，支援中文語音輸入。
- **[導引]** 實作 **Dynamic Placeholder**，輸入框自動輪播功能範例。

## [v1.1.0] - 2026-04-27
### 📱 移動端與 RWD 優化
- **[調整]** 針對螢幕 < 480px 自動切換為「全螢幕 App 模態」。
- **[優化]** 支援 iOS/Android **Safe Area** 適配，解決瀏海屏遮擋。

## [v1.0.1] - 2026-04-27
### 📝 文件與邏輯補全
- **[文件]** 建立「產品需求規格書」與「開發者交接指南」。

## [v1.0.0] - 2026-04-27
### 🚀 初始版本發布
- **[核心]** 基於 Vanilla JS/CSS 的智能客服原型，採用現代玻璃擬態風格。
