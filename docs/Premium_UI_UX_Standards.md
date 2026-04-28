# Premium UI/UX 設計規範 (Raccoon AI Standards)

本文件定義了 Raccoon AI 客服原型的核心設計準則，所有功能開發必須遵循以下「高易用性」與「高質感」要求。

## 1. 視覺語調 (Visual Tone)
- **玻璃擬態 (Glassmorphism)**: 所有的浮層、選單與視窗必須具備 `backdrop-filter: blur(30px)` 以上的模糊效果。
- **邊框細節**: 使用極細的半透明邊框 (`rgba(255, 255, 255, 0.1)`) 來定義物件輪廓。
- **陰影層次**: 使用擴散範圍大但顏色淡的陰影 (`rgba(0, 0, 0, 0.1)`) 營造懸浮感。

## 2. 易用性原則 (Usability Principles)
- **零預設樣式**: 嚴禁使用瀏覽器預設的連結藍、底線或原生按鈕邊框。所有元素必須經過自定義樣式。
- **互動回饋 (Feedback)**: 
  - 所有可點擊元素必須具備 `hover` 狀態（縮放、背景變換）。
  - 重要操作（如清除資料）必須具備明顯的色標（如紅色危險區域）與二次確認。
- **層次感**: 
  - 歷史訊息應具備 `opacity: 0.6` 的視覺降噪。
  - 當前對話必須具備 100% 視覺權重。

## 3. 組件規範 (Component Standards)
- **Dropdowns**: 必須使用 `position: absolute`，嚴禁撐開父容器。
- **Icons**: 統一使用 `icon-btn` 類別，確保大小 (`36x36px`) 與圓角 (`10px`) 一致。
- **Typography**: 標題字重為 `700`, 描述字重為 `400`, 且必須指定 `Outfit` 與 `Noto Sans TC` 為優先字體。

---
*本文件為 Raccoon AI 專案之核心資產，由 AI 產品經理維護。*
