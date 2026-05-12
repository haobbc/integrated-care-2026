import type { ChapterStepProps } from "../../registry/types";
import "./Positioning.css";

/* Chapter 11 — Results · international positioning (slide 12).
   4-dimension × 4-column comparison rebuilt natively as a CSS grid table.
   Per-step: row highlights + per-row hero number callout. */

type Cell = {
  /** Main text content (Chinese label) */
  text: string;
  /** Optional accent number rendered as hero numeral */
  num?: string;
  /** Optional unit / suffix rendered next to the number */
  unit?: string;
  /** Optional secondary line (smaller, muted) */
  sub?: string;
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

const ROWS: Row[] = [
  {
    id: "volume",
    dim: "量",
    us: {
      text: "本院年腦瘤手術量",
      num: ">120",
      unit: "例 / 年",
      sub: "急救清醒手術",
    },
    national: { text: "冠絕全國", crown: true },
    asia: { text: "多於日本", sub: "東京大學醫院" },
    west: { text: "多於 Gui de Chauliac", sub: "美國中心" },
    highlightStep: 1,
  },
  {
    id: "quality",
    dim: "質",
    us: {
      text: "手術切除率",
      num: ">95",
      unit: "%",
      sub: "4 年 80% 神經保留",
    },
    national: { text: "未有大型統計" },
    asia: { text: "比北京大學醫院、台大醫院" },
    west: { text: "比 Gui de Chauliac" },
    highlightStep: 2,
  },
  {
    id: "innovation",
    dim: "創新性",
    us: {
      text: "聚焦超音波 phase II",
      sub: "清醒手術門診 + 全國唯一",
      crown: true,
    },
    national: { text: "本院唯一具備", sub: "awake clinic + FUS 試驗" },
    asia: { text: "韓國 MRgFUS", sub: "日本臨床試驗" },
    west: { text: "Gui de Chauliac · Stanford", sub: "臨床試驗", crown: true },
    highlightStep: 3,
  },
  {
    id: "papers",
    dim: "論文發表",
    us: {
      text: "腦瘤",
      num: "132",
      unit: "篇",
      sub: "清醒開顱 / 聚焦超音波 5 篇",
    },
    national: { text: "北京 25", sub: "清醒開顱 0 (北京)" },
    asia: { text: "日本 122", sub: "韓國 208" },
    west: { text: "美國 393 · 法國 / 英國 89", sub: "韓國 12" },
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
      <div className="ps-cell__text">{cell.text}</div>
      {cell.num && (
        <div className="ps-cell__num">
          <span className="hero-num ps-num">{cell.num}</span>
          {cell.unit && <span className="ps-num__unit">{cell.unit}</span>}
        </div>
      )}
      {cell.sub && <div className="ps-cell__sub">{cell.sub}</div>}
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
