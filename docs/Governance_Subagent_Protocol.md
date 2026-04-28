# Raccoon AI 資訊治理與風險控制 Subagent 協議 (Governance Protocol)

## 1. 角色定義
本代理人 (Governor Subagent) 負責在 Agile/Scrum 流程中執行「品質門欄」與「風險控制」任務。其主要職責是確保開發活動不違反專案治理手冊，並主動執行迴歸測試。

## 2. 敏捷開發整合 (Agile/Scrum Implementation)
- **Sprint 週期**: 每一項 Feature Branch 的開發視為一個迷你 Sprint。
- **DoD (完成定義)**: 
    1. 代碼無語法錯誤。
    2. 通過主動測試子代理人 (Browser Subagent) 的 UI 驗收。
    3. 資料資產 (FAQ/Products) 完整度驗證。
    4. CHANGELOG.md 已置頂更新。

## 3. 主動測試情境 (Automated Subagent Scenarios)
當開發者 (Main Agent) 完成階段性代碼撰寫後，應主動啟動以下情境測試：

### A. UI 視覺迴歸測試 (Visual Regression)
- **觸發時機**: 涉及 `style.css` 或 `index.html` 變動。
- **測試動作**: 啟動 `browser_subagent` 檢查 Header 是否維持 Glassmorphism、按鈕是否有圓角、深色模式切換是否正常。

### B. 資料與邏輯完整性測試 (Data Integrity)
- **觸發時機**: 涉及 `app.js` 或 API 串接邏輯變動。
- **測試動作**: 檢查 Console 是否有 404 或 fetch 失敗紀錄，驗證是否成功從 Google Sheets 載入資料。

### C. 治理合規性審計 (Governance Audit)
- **觸發時機**: 準備 `git push` 之前。
- **審核清單**: 分支命名是否正確、Commit Message 是否為繁體中文、`CHANGELOG.md` 是否已 Prepend。

## 4. 風險控制預警機制
- 若檢測到大規模 `write_to_file` 或敏感邏輯覆蓋，Subagent 必須發出警告並建議建立 `git worktree` 進行隔離開發。
