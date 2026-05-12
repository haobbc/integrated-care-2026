import type { ChapterStepProps } from "../../registry/types";
import "./Positioning.css";

/* Chapter 11 — Results · international positioning (slide 12).
   4-dimension × 4-column comparison rebuilt natively as a CSS grid table.
   Per-step: row highlights + per-row hero number callout. */

type LineItem = { topic: string; value: string };

type Cell = {
  /** Main text content (Chinese label) */
  text?: string;
  /** Optional accent number rendered as hero numeral */
  num?: string;
  /** Optional unit / suffix rendered next to the number */
  unit?: string;
  /** Optional secondary line (smaller, muted) */
  sub?: string;
  /** Multi-line topic→value rows (used by papers row to list 3 sub-topics). */
  lines?: LineItem[];
  /** Show a crown badge on this cell (leadership claim) */
  crown?: boolean;
};

type Row = {
  id: string;
  dim: string;       // 維度 label (column 1)
  us: Cell;          // 林口長庚腦瘤團隊 (column 2)
  national: Cell;    // 與國內相關機構比較 (column 3)
  asia: Cell;        // 與亞洲頂尖機構比較 (column 4)
  west: Cell;        // 與歐美頂尖機構比較 (column 5)
  /** Which step (1-indexed within this chapter) highlights this row. */
  highlightStep: number;
};

/* All rows verified against the original pptx slide 12 table. */
const ROWS: Row[] = [
  {
    id: "volume",
    dim: "量",
    us: {
      text: "本院每年腦瘤手術病例數",
      num: ">120",
      unit: "例 / 年",
      sub: "為全國最多",
    },
    national: { text: "冠於全國", crown: true },
    asia: {
      text: "多於日本東京大學醫院",
      sub: "與韓國首爾大學醫院",
    },
    west: {
      text: "多於美國麻州總醫院",
      sub: "與法國 Gui de Chauliac 醫院",
    },
    highlightStep: 1,
  },
  {
    id: "quality",
    dim: "質",
    us: {
      lines: [
        { topic: "手術切除率", value: ">95 %" },
        { topic: "第四期平均存活", value: "逾 24 個月" },
        { topic: "一年功能保留", value: "80 %" },
      ],
    },
    national: {
      crown: true,
      lines: [
        { topic: "切除率", value: "冠於全國" },
        { topic: "存活", value: "未有大型數據" },
        { topic: "保留率", value: "未有相關研究" },
      ],
    },
    asia: {
      lines: [
        { topic: "切除率", value: "優於日本東京大學醫院" },
        { topic: "與", value: "韓國首爾大學醫院" },
      ],
    },
    west: {
      lines: [
        { topic: "切除率", value: "比美國麻州總醫院" },
        { topic: "與", value: "法國 Gui de Chauliac 醫院" },
      ],
    },
    highlightStep: 2,
  },
  {
    id: "innovation",
    dim: "創新性",
    us: {
      lines: [
        { topic: "清醒開顱", value: "兼具腫瘤切除與功能保留之平衡" },
        { topic: "聚焦超音波", value: "世界首例手術導航導引型臨床試驗" },
      ],
    },
    national: {
      crown: true,
      lines: [
        { topic: "清醒開顱", value: "團隊與量均為國內 First" },
        { topic: "聚焦超音波", value: "與臨床試驗為國內 First" },
      ],
    },
    asia: {
      lines: [
        { topic: "清醒開顱", value: "日韓規模均小" },
        { topic: "聚焦超音波", value: "日韓 MRgFUS 尚未進入腦瘤試驗" },
      ],
    },
    west: {
      lines: [
        { topic: "清醒開顱", value: "優於美國麻州總醫院" },
        { topic: "聚焦超音波", value: "美法均無腦瘤臨床試驗" },
      ],
    },
    highlightStep: 3,
  },
  {
    id: "papers",
    dim: "論文發表",
    us: {
      lines: [
        { topic: "惡性腦瘤", value: "138 篇" },
        { topic: "清醒開顱", value: "10 篇" },
        { topic: "聚焦超音波", value: "28 篇" },
      ],
    },
    national: {
      lines: [
        { topic: "惡性腦瘤", value: "北榮 132 · 台大 25" },
        { topic: "清醒開顱", value: "北榮 3 · 台大 0" },
      ],
    },
    asia: {
      lines: [
        { topic: "惡性腦瘤", value: "日本 122 · 韓國 208" },
        { topic: "清醒開顱", value: "日本 1 · 韓國 0" },
      ],
    },
    west: {
      lines: [
        { topic: "惡性腦瘤", value: "美國 393 · 法國 184" },
        { topic: "清醒開顱", value: "美國 9 · 法國 0" },
      ],
    },
    highlightStep: 4,
  },
];

export default function Positioning({ step }: ChapterStepProps) {
  return <Scene step={step} />;
}

function Scene({ step }: { step: number }) {
  // Which row to highlight on this step (null = none → step 0 = overview).
  const activeRow = ROWS.find((r) => r.highlightStep === step) ?? null;

  return (
    <div className="ps-scene">
      <div className="ps-head">
        <div className="ps-eyebrow">結果面 · 國際定位</div>
        <h2 className="ps-subtitle">
          四個維度 · 三組對照
          <span className="ps-subtitle__sub">
            本院 vs 國內 / 亞洲 / 歐美頂尖中心
          </span>
        </h2>
      </div>

      <div className="ps-table" role="table">
        {/* Header row */}
        <div className="ps-table__head" role="row">
          <div className="ps-th ps-th--dim" role="columnheader">維度</div>
          <div className="ps-th ps-th--us" role="columnheader">
            林口長庚腦瘤團隊
          </div>
          <div className="ps-th" role="columnheader">
            與國內相關機構比較
          </div>
          <div className="ps-th" role="columnheader">
            與亞洲頂尖機構比較
          </div>
          <div className="ps-th" role="columnheader">
            與歐美頂尖機構比較
          </div>
        </div>

        {/* Data rows */}
        {ROWS.map((row) => {
          const isActive = activeRow?.id === row.id;
          const isDim = activeRow !== null && !isActive;
          return (
            <div
              key={row.id}
              role="row"
              className={
                "ps-row" +
                (isActive ? " ps-row--active" : "") +
                (isDim ? " ps-row--dim" : "")
              }
            >
              <div className="ps-cell ps-cell--dim" role="cell">
                <span className="ps-dim__label">{row.dim}</span>
              </div>
              <DataCell cell={row.us} variant="us" active={isActive} />
              <DataCell cell={row.national} active={isActive} />
              <DataCell cell={row.asia} active={isActive} />
              <DataCell cell={row.west} active={isActive} />
            </div>
          );
        })}
      </div>

      <div className="ps-foot">
        <div className="ps-foot__caption">
          {step === 0 && "四個維度，三組對照 — 全面領先全國，比肩國際"}
          {step === 1 && "服務量 · 冠絕全國"}
          {step === 2 && "質量 · 達國際水準"}
          {step === 3 && "創新性 · 全國唯一"}
          {step === 4 && "論文發表 · 與國際頂尖中心比肩"}
        </div>
        <div className="ps-foot__cite">
          PubMed · 機構自報資料 · 2020–2024
        </div>
      </div>
    </div>
  );
}

/* ── primitives ───────────────────────────────────────────────────── */

function DataCell({
  cell,
  variant,
  active,
}: {
  cell: Cell;
  variant?: "us";
  active: boolean;
}) {
  const hasHero = !!cell.num;
  return (
    <div
      role="cell"
      className={
        "ps-cell" +
        (variant === "us" ? " ps-cell--us" : "") +
        (hasHero ? " ps-cell--hero" : "")
      }
    >
      {cell.crown && <Crown active={active} />}
      {cell.text && <div className="ps-cell__text">{cell.text}</div>}
      {cell.num && (
        <div className="ps-cell__num">
          <span className="hero-num ps-num">{cell.num}</span>
          {cell.unit && <span className="ps-num__unit">{cell.unit}</span>}
        </div>
      )}
      {cell.sub && <div className="ps-cell__sub">{cell.sub}</div>}
      {cell.lines && (
        <div className="ps-cell__lines">
          {cell.lines.map((l) => (
            <div className="ps-cell__line" key={l.topic}>
              <span className="ps-cell__line-topic">{l.topic}</span>
              <span className="ps-cell__line-value">{l.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Crown({ active }: { active: boolean }) {
  return (
    <span className={"ps-crown" + (active ? " ps-crown--active" : "")} aria-hidden>
      <svg viewBox="0 0 28 22" width="28" height="22">
        {/* simple crown silhouette — 5 points, base bar, 3 jewels */}
        <path
          d="
            M 1 20
            L 1 6
            L 7 12
            L 14 2
            L 21 12
            L 27 6
            L 27 20
            Z
          "
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <rect x="1" y="18" width="26" height="2.2" fill="currentColor" />
        <circle cx="7" cy="14" r="1.1" fill="var(--surface-2)" />
        <circle cx="14" cy="6"  r="1.2" fill="var(--surface-2)" />
        <circle cx="21" cy="14" r="1.1" fill="var(--surface-2)" />
      </svg>
    </span>
  );
}
