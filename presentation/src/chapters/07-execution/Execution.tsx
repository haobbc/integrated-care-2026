import type { ChapterStepProps } from "../../registry/types";
import "./Execution.css";

/* Chapter 7 — Results · execution fidelity (slide 8).
   5-row × 3-col comparison table rebuilt natively.
   Per-step: row highlights + contrast bars + hero subtitle on step 1. */

type Row = {
  id: string;
  label: string;
  us: { n: number; pct: number };
  them: { n: number; pct: number };
  /** Which step (1-indexed within this chapter) highlights this row. */
  highlightStep: number | null;
};

const ROWS: Row[] = [
  {
    id: "mri-4d",
    label: "惡性腦瘤患者 4 天內接受腦部 MRI",
    us: { n: 95, pct: 84.8 },
    them: { n: 11, pct: 9.0 },
    highlightStep: 2,
  },
  {
    id: "path",
    label: "惡性腦瘤患者最終組織病理學診斷",
    us: { n: 110, pct: 98.2 },
    them: { n: 22, pct: 18.0 },
    highlightStep: null,
  },
  {
    id: "opd-30d",
    label: "惡性腦瘤患者 30 天內首次門診",
    us: { n: 95, pct: 84.2 },
    them: { n: 22, pct: 18.0 },
    highlightStep: 3,
  },
  {
    id: "opd-4x",
    label: "林口院區內惡性腦瘤患者於 1 年內至少 4 次門診",
    us: { n: 89, pct: 79.5 },
    them: { n: 9, pct: 8.0 },
    highlightStep: 4,
  },
  {
    id: "mri-6m",
    label: "惡性腦瘤患者於 6 個月內接受至少 1 次 MRI 追蹤",
    us: { n: 95, pct: 84.8 },
    them: { n: 4, pct: 3.6 },
    highlightStep: null,
  },
];

export default function Execution({ step }: ChapterStepProps) {
  if (step === 0) return <Scene step={0} />;
  if (step === 1) return <Scene step={1} />;
  if (step === 2) return <Scene step={2} />;
  if (step === 3) return <Scene step={3} />;
  if (step === 4) return <Scene step={4} />;
  return <Scene step={step} />;
}

function Scene({ step }: { step: number }) {
  // Which row to highlight on this step (null = none).
  const activeRowId = ROWS.find((r) => r.highlightStep === step)?.id ?? null;
  const showHero = step === 1;

  return (
    <div className="ex-scene">
      <div className="ex-head">
        <div className="ex-eyebrow">結果面 · 治療計畫執行度</div>
        <h2 className="ex-subtitle">
          腦瘤團隊標準化治療與追蹤流程完善度領先全國
          <span className="ex-period">（資料期間 2020–2024）</span>
        </h2>
      </div>

      {showHero && (
        <div className="ex-hero" key="hero">
          <div className="ex-hero__years">
            <span className="hero-num ex-hero__num">2020</span>
            <span className="ex-hero__dash">—</span>
            <span className="hero-num ex-hero__num">2024</span>
          </div>
          <div className="ex-hero__caption">五年資料 · 全國領先</div>
        </div>
      )}

      <div className={`ex-table ${showHero ? "ex-table--background" : ""}`}>
        <div className="ex-table__head">
          <div className="ex-th ex-th--label">指　標</div>
          <div className="ex-th ex-th--us">本院　(n　/　%)</div>
          <div className="ex-th ex-th--them">他院　(n　/　%)</div>
        </div>

        {ROWS.map((row) => {
          const isActive = activeRowId === row.id;
          const isDim = activeRowId !== null && !isActive;
          return (
            <div
              key={row.id}
              className={
                "ex-row" +
                (isActive ? " ex-row--active" : "") +
                (isDim ? " ex-row--dim" : "")
              }
            >
              <div className="ex-cell ex-cell--label">{row.label}</div>

              <div className="ex-cell ex-cell--us">
                <div className="ex-bar">
                  <div
                    className="ex-bar__fill ex-bar__fill--us"
                    style={{ width: `${row.us.pct}%` }}
                  />
                </div>
                <div className="ex-stat">
                  <span className="hero-num ex-stat__pct">{row.us.pct}</span>
                  <span className="ex-stat__unit">%</span>
                  <span className="ex-stat__n">n=&nbsp;{row.us.n}</span>
                </div>
              </div>

              <div className="ex-cell ex-cell--them">
                <div className="ex-bar">
                  <div
                    className="ex-bar__fill ex-bar__fill--them"
                    style={{ width: `${row.them.pct}%` }}
                  />
                </div>
                <div className="ex-stat ex-stat--them">
                  <span className="hero-num ex-stat__pct">{row.them.pct}</span>
                  <span className="ex-stat__unit">%</span>
                  <span className="ex-stat__n">n=&nbsp;{row.them.n}</span>
                </div>
              </div>

              {isActive && (
                <div className="ex-gap" aria-hidden="true">
                  <span className="ex-gap__label">差距</span>
                  <span className="hero-num ex-gap__num">
                    {Math.round(row.us.pct - row.them.pct)}
                  </span>
                  <span className="ex-gap__unit">pp</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="ex-cite">
        Molinaro et al · JAMA Oncol 2020;6(4):495–503
      </div>
    </div>
  );
}
