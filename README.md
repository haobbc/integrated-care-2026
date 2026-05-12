# 林口長庚腦癌團隊精準治療 · SNQ 2026 簡報

第六組 · 疾病治療整合照護與醫療服務品質提升 — 腦癌團隊精準治療。

🌐 **線上瀏覽**：[haobbc.github.io/integrated-care-2026](https://haobbc.github.io/integrated-care-2026/)

主報：陳品元 · 林口長庚紀念醫院

---

## 簡報內容

13 章 / 62 步 / ~7-8 分鐘口播（SNQ 8-10 min slot）

| # | 章節 | 步數 | Slide |
|---|---|---|---|
| 1 | 引言 + 疾病背景 | 7 | 1+2 |
| 2 | 二十年團隊歷史 | 3 | 3 |
| 3 | 跨科團隊合作 | 4 | 4 |
| 4 | 特色 1 · 清醒開顱 | 5 | 5 |
| 5 | 特色 2 · 聚焦超音波 | 4 | 6 |
| 6 | 特色 3 · 臨床試驗 | 4 | 7 |
| 7 | 結果 · 執行度 | 5 | 8 |
| 8 | 結果 · 服務量 | 4 | 9 |
| 9 | 結果 · 安全性 | 5 | 10 |
| 10 | 結果 · 滿意度 | 5 | 11 |
| 11 | 結果 · 國際定位 | 5 | 12 |
| 12 | 總結 · SNQ 銅獎 | 6 | 13 |
| 13 | 展望 + 謝幕 | 5 | 14 |

## 重點數據

- **N = 672** 例清醒開顱手術（2013–2025）
- **5.6%** 術後長期神經缺損（國際水準）
- **>95%** 顯影腫瘤切除率、**70%** 非顯影切除率
- **13.6%** 全國腦瘤手術市佔率
- **96.2%** 整體照護滿意度 · **100%** × 4 項細項
- 國家生技醫療品質獎 **SNQ 銅獎** 肯定

## 技術 stack

- Vite + React + TypeScript
- Theme: monochrome-print（NEJM 期刊風）
- 所有 mind maps / 架構圖 / 表格 / 內部數據圖 — native HTML/SVG 重建
- 僅保留 6 張原圖：paper-figs / 石碑團隊照 / 線上會議照 / 手術室照 / 護理插畫 / SNQ 頒獎照
- Built with the [`web-video-presentation`](https://github.com/ConardLi/garden-skills/tree/main/skills/web-video-presentation) skill

## 引用文獻

| 章 | 引文 |
|---|---|
| 1 | Stupp NEJM 2005 · Sanai 2015 NEJM · J Neurosurg 2009 · Duffau 2021 Neurosurgery · 台灣癌症登記 2023 · thebraintumourcharity.org |
| 7 | Molinaro et al · JAMA Oncol 2020;6(4):495-503 |
| 8 | thebraintumourcharity.org |
| 9 | De Witt Hamer JCO 2012 · Lemaitre Neuro-Oncology 2022 · Cochereau Brain Struct Funct 2020 · Rijnen J Neurosurg 2020 |

## 本機開發

```bash
cd presentation
npm install
npm run dev          # http://localhost:5174
npm run build        # production bundle → dist/
```

---

🤖 Built with [Claude Code](https://claude.com/claude-code).
