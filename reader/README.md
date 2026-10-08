# 《入菩薩行論》十品閱讀器／Bodhicaryāvatāra Reader

靜態網站（HTML + CSS + JavaScript），不使用後端、不要求 Cloudflare Access／Pages Functions，也不含追蹤碼。可直接上傳 GitHub 並由 Cloudflare Pages 發布。

## 部署到 GitHub 與 Cloudflare Pages

1. 建立新的 GitHub Repository，例如 `bodhicaryavatara-reader`，上傳此資料夾 **裡面的所有檔案與資料夾**（`index.html` 必須在 Repository 根目錄）。
2. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**。
3. 選擇 GitHub Repository，Framework preset 設 **None**，Build command 留空（若介面要求，使用 `exit 0`），Build output directory 設 **`.`**。
4. 儲存並部署，即可得到 `*.pages.dev` 網址。之後推送到 GitHub 主分支，Pages 會自動部署。
5. 本地測試：在專案根目錄執行 `python -m http.server 8000`，用瀏覽器開 `http://localhost:8000/`。目前已將全十品 JSON 資料內嵌在 `index.html`；解壓縮 ZIP 後，連同 `app.js`、`styles.css` 和 `assets/` 保留原資料夾結構，一般瀏覽器可直接開啟 `index.html` 離線閱讀。部分 iPhone 檔案預覽不執行 JavaScript，遇到此情況請以瀏覽器開啟、發布到 Cloudflare Pages，或使用另附 EPUB。

## 閱讀器功能

- **手機下方五個快速模式**：隆譯、如譯、雙譯、純藏文、藏漢對照；章節可以由上方快速選單跳轉，亦可透過側邊欄選擇。
- **隆蓮譯／如石譯**：可各別勾選或同時顯示；預設兩種都顯示。
- 介面語言：繁體中文／བོད་ཡིག／English。注意：切換介面語言**不會翻譯經典正文**，正文固定為原檔的兩種中文譯本及藏文。
- 全十品 914 偈，逐品導覽、章內跳號、中文全文搜尋、中文字級調整（可放大至 36 px）；`#c8-v25` 等網址可直接連結到特定偈頌。
- 列印用紙請優先使用另附的 A4 印刷版 PDF；瀏覽器列印僅適合短篇段落。

## 原典來源及編排說明

據使用者提供的《入菩薩行論》梵、藏、漢四版對照原檔（沈陽北塔藏文翻譯班，2010.03）重排，只收：

- 藏文原文字形；由於原 PDF 使用舊字型編碼，**藏文目前以原字形圖片顯示，不是可複製或搜尋的 Unicode 藏文**。請勿將圖片當作可機器比對的藏文資料。
- 兩種中文譯文：【隆】隆蓮法師、【如】如石法師。保持原檔用字、標點、順序；個別偈以原檔版面左半、右半拼回。
- 第十品第 11、13、14 偈跨原檔相鄰兩頁，已合併為同一偈；第八品第 25 偈與第十品第 16 偈依原檔標註缺文或省略號；原書另有二句、六句、八句等特殊長度偈。
- 對照、校勘仍請參照原版附錄（原檔第 948–953 頁）；本閱讀器並非新的佛典校勘本。

請自行確認公開發布原檔中文字與藏文字形的相關使用授權。本專案不聲稱擁有譯文或原版權利。

## 檔案結構

```text
index.html           讀者介面
styles.css           介面／印刷樣式
app.js               互動、導航、檢索、顯示模式
data/verses.json     全十品偈頌及來源頁碼
assets/tibetan/      每偈藏文原文字形 PNG（不含字型檔）
README.md            安裝、校勘及授權提醒
```
