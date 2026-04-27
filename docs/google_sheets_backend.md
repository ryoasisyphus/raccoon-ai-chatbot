# Google Sheets 後端資料庫串接指南

本專案支援將 Google 試算表 (Google Sheets) 作為免費的無伺服器 (Serverless) 資料庫。透過 Google Apps Script (GAS)，你可以讓團隊中的任何人（如 PM、行銷人員）直接在試算表中修改 FAQ 或上架新商品，而前端網頁會自動抓取最新資料。

## 步驟一：建立試算表
1. 前往 Google Drive，建立一個新的 Google 試算表。
2. 將第一張工作表 (Sheet1) 重新命名為 `FAQ`。
   - 第一行建立標題：A1填入 `keywords`，B1填入 `answer`。
   - 填寫資料範例：
     - A2: `運費,郵資,免運`
     - B2: `全站訂單滿 NT$1,000 即享免運！`
3. 建立第二張工作表，命名為 `Products`。
   - 第一行建立標題：A1 `id`, B1 `name`, C1 `price`, D1 `category`, E1 `desc`, F1 `image`。
   - 填寫資料範例：
     - A2: `p1`
     - B2: `極簡質感保溫瓶`
     - C2: `880`
     - D2: `居家生活`
     - E2: `304 不鏽鋼材質...`
     - F2: `https://images.unsplash.com/...`

## 步驟二：部署 Google Apps Script (GAS)
1. 在試算表上方選單點擊 **擴充功能 (Extensions) > Apps Script**。
2. 將編輯器內原本的程式碼清空，貼上以下這段 API 程式碼：

```javascript
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. 抓取 FAQ 資料
  var faqSheet = ss.getSheetByName("FAQ");
  var faqData = faqSheet.getDataRange().getValues();
  var faqArray = [];
  
  // 跳過標題列 (i=1)
  for (var i = 1; i < faqData.length; i++) {
    if (faqData[i][0]) {
      faqArray.push({
        keywords: faqData[i][0].toString().split(",").map(k => k.trim()),
        answer: faqData[i][1]
      });
    }
  }
  
  // 2. 抓取 Products 資料
  var productSheet = ss.getSheetByName("Products");
  var productData = productSheet.getDataRange().getValues();
  var productArray = [];
  
  // 跳過標題列 (i=1)
  for (var j = 1; j < productData.length; j++) {
    if (productData[j][0]) {
      productArray.push({
        id: productData[j][0].toString(),
        name: productData[j][1].toString(),
        price: Number(productData[j][2]),
        category: productData[j][3].toString(),
        desc: productData[j][4].toString(),
        image: productData[j][5].toString()
      });
    }
  }
  
  // 3. 回傳 JSON
  var result = {
    faq: faqArray,
    products: productArray
  };
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. 點擊上方的 **「部署 (Deploy)」 > 「新增部署作業 (New deployment)」**。
4. 點擊齒輪圖示，選擇 **網頁應用程式 (Web app)**。
5. 設定如下：
   - 說明：`v1.0 API`
   - 執行身分：`我 (Me)`
   - 誰可以存取：**`所有人 (Anyone)`** *(這很重要，否則前端抓不到資料)*
6. 點擊「部署」。系統會要求授權，請允許權限。
7. 部署完成後，複製畫面上顯示的 **「網頁應用程式網址 (Web app URL)」**。

## 步驟三：將 API 網址貼回前端
回到本專案的 `src/app.js` 檔案中，找到大約第 30 行的地方：

```javascript
// --- 資料庫設定 ---
// 在這裡填入你發佈的 Google Apps Script Web App URL
const GAS_API_URL = "將剛才複製的長網址貼到這裡面"; 
```

儲存檔案後，重新整理你的網頁。如果你有打開瀏覽器的 Console (F12)，你應該會看到 `✅ 成功從 Google Sheets 載入資料庫！` 的提示。

**恭喜！你已經成功為這個 Prototype 搭建了一個完全免費且易於維護的後端資料庫了！**
