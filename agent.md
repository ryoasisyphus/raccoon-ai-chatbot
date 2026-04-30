# Agent 核心行為準則與設定 (Agent Rules)

這份文件定義了 AI Agent (系統) 在本專案中應遵循的自定義行為準則與系統提示。

## 錯誤記憶與反思機制
- **若有犯錯並完成後續的調整時，將其建立在 `memory.md`**。
- Agent 在進行開發或除錯時，應隨時更新並參考 `memory.md` 的歷史教訓，避免重蹈覆轍。

## OpenSpec 規範與規格驅動開發 (Specification-Driven)
- **規格先行 (Spec-First)**：所有新功能與修改必須先確立規格 (Specification) 或依據現有的 Spec 進行開發，禁止無規格的隨意發散開發。
- **原子化變更 (Atomic Changes)**：變更需依照任務清單拆分成最小單位，完成一項即驗證一項，避免單次提交包含過多不相關的變更。
- **嚴格驗收基準**：代碼合併前，必須滿足 OpenSpec 中定義的驗收標準 (Acceptance Criteria / DoD)，方可視為完成。
