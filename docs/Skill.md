# Raccoon AI Assistant: 開發與維護標準作業流程 (Skills)

本文件紀錄了在開發與維護 Raccoon AI Assistant 時，高度重複且不可或缺的標準作業流程。
若有新的 AI 助手接手此專案，請務必先閱讀並掌握以下 5 個核心 Skills。

## 🚀 Skill 1: 前端發布與強制清除快取 (Cache-Busting)
- **觸發時機**：當修改了 `src/app.js` 或 `static/css/style.css` 之後。
- **標準動作**：必須開啟 `index.html`，並將對應的引入標籤後綴版本號往上加（例如從 `?v=1.4.0` 改為 `?v=1.5.0`）。
- **背後原因**：GitHub Pages 會進行嚴格的快取，如果沒有手動更改版本號，測試時容易誤以為代碼沒生效。

## 📚 Skill 2: 全局文件同步更新 (Doc Synchronization)
- **觸發時機**：專案有架構改動、新增功能或修復重大 Bug 時。
- **標準動作**：必須一次性檢查並更新以下 5 份文件：
  1. `CHANGELOG.md` (寫入新版本號與變更點)
  2. `README.md` (確認架構或描述是否過時)
  3. `docs/walkthrough.md` (更新實作紀錄)
  4. `docs/developer_guide.md` (更新開發指引)
  5. `docs/product_spec.md` (若有改變產品行為或邊界條件，需更新規格書)
- **背後原因**：保持「文件與程式碼 100% 一致」，消滅技術債。

## 🛡️ Skill 3: 雲端與本地資料降級同步 (Fallback Data Sync)
- **觸發時機**：在 Google Sheets (雲端資料庫) 大幅更新了欄位格式，或是擴充了極大量的內容時。
- **標準動作**：需要手動將具代表性的資料備份更新至本地的 `data/faq.json` 與 `data/products.json`。
- **背後原因**：我們雖然上了 Serverless 架構，但如果 GAS API 出現 CORS 錯誤或請求限制，系統會退回使用本地資料。保持本地資料的結構正確，才能發揮安全網的作用。

## 🎨 Skill 4: UI 元件與視覺一致性檢驗 (UI Consistency)
- **觸發時機**：只要有新增 UI 元件（如新的彈窗、按鈕、卡片）。
- **標準動作**：必須確保套用了全域的 CSS 變數（如 `var(--primary)`, `var(--bg-card)` 等），且必須加入平滑的過渡動畫 (transition)。
- **背後原因**：確保符合「質感即信任」的易用性原則，維持 Glassmorphism (玻璃擬態) 的設計語言。

## 📦 Skill 5: 一鍵自動化部署 (Git Deploy Flow)
- **觸發時機**：當上述所有步驟（測試、改版、改文件）都完成後。
- **標準動作**：統一執行 `git add .`、使用符合語意（如 `feat:`, `fix:`, `docs:`）的 commit message，最後執行 `git push origin main` 以觸發 GitHub Pages 重建。
