import type { ChapterStepProps } from "../../registry/types";
import "./Safety.css";

/* Chapter 9 — safety (slide 10)
   Two-col layout:
     LEFT  · 4 stacked bullets (>95%/70% · N=672/5.6% · 認知保留 · 低惡性度 80%)
     RIGHT · native SVG multi-line cognitive function deficit chart (n=114, 10 domains × 3 timepoints)

   Step drives which bullet is "active"; non-active dim. Chart is mounted
   from step 0 and gets a "lit" wrapper class on step 3. */

/* ─────────────────────────── chart data ─────────────────────────── */

type Domain = {
  id: string;
  label: string;
  /** Deficit rate (%) at follow-up 1.0 / 2.0 / 3.0 years */
  series: [number, number, number];
  /** Stroke shade key — colors come from CSS vars in Safety.css */
  shade: string;
};

const TIMES = [1.0, 2.0, 3.0];

/* Ordered roughly top → bottom by t=3 value so legend reads cleanly. */
const DOMAINS: Domain[] = [
  { id: "audi",   label: "audi",   series: [50, 46, 43], shade: "audi" },
  { id: "ori",    label: "ori",    series: [33, 29, 25], shade: "ori" },
  { id: "workme", label: "workme", series: [30, 27, 25], shade: "workme" },
  { id: "exe",    label: "exe",    series: [30, 25, 22], shade: "exe" },
  { id: "vis",    label: "vis",    series: [25, 23, 22], shade: "vis" },
  { id: "emo",    label: "emo",    series: [22, 18, 15], shade: "emo" },
  { id: "spa",    label: "spa",    series: [22, 17, 12], shade: "spa" },
  { id: "proc",   label: "proc",   series: [22, 16, 12], shade: "proc" },
  { id: "glob",   label: "glob",   series: [22, 16, 12], shade: "glob" },
  { id: "lan",    label: "lan",    series: [ 8,  5,  3], shade: "lan" },
];

/* SVG layout */
const VB_W = 720;
const VB_H = 460;
const PAD_L = 70;
const PAD_R = 22;
const PAD_T = 30;
const PAD_B = 56;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;
const Y_MAX = 60;

function xOf(t: number) {
  // map 1.0..3.0 → 0..PLOT_W
  return PAD_L + ((t - 1.0) / 2.0) * PLOT_W;
}
function yOf(v: number) {
  return PAD_T + (1 - v / Y_MAX) * PLOT_H;
}

/* ─────────────────────────── component ───────────────────────────── */

export default function Safety({ step }: ChapterStepProps) {
  // step 0 = eyebrow + skeleton
  // step 1 = bullet 1 active (>95% / 70%)
  // step 2 = bullet 2 active (N=672 / 5.6%)
  // step 3 = chart lit + bullet 3 active (n=114 cognitive)
  // step 4 = bullet 4 active (低惡性度 80%)
  const active = (n: number) => step === n;
  const dim = (n: number) => step !== 0 && step !== n;

  return (
    <div className="sf-scene">
      <div className="sf-head">
        <div className="sf-eyebrow">結果面 · 安全性</div>
        {step === 0 && (
          <div className="sf-head__sub">手術切除度、神經缺損、認知保留、功能維持</div>
        )}
      </div>

      <div className="sf-grid">
        {/* ──────────── LEFT · 4 bullets ──────────── */}
        <div className="sf-bullets">
          {/* 1. resection rate */}
          <div
            className={`sf-bullet ${active(1) ? "sf-bullet--on" : ""} ${dim(1) ? "sf-bullet--dim" : ""}`}
          >
            <div className="sf-bullet__index">01</div>
            <div className="sf-bullet__body">
              <div className="sf-bullet__kicker">顯影腫瘤切除率</div>
              <div className="sf-bullet__row">
                <span className="hero-num sf-bullet__num">&gt;95</span>
                <span className="sf-bullet__pct">%</span>
                <span className="sf-bullet__sep">/</span>
                <span className="sf-bullet__sublabel">非顯影</span>
                <span className="hero-num sf-bullet__num sf-bullet__num--sec">70</span>
                <span className="sf-bullet__pct">%</span>
              </div>
              <div className="sf-bullet__foot">達國際水準</div>
            </div>
          </div>

          {/* 2. awake craniotomy volume + complication */}
          <div
            className={`sf-bullet ${active(2) ? "sf-bullet--on" : ""} ${dim(2) ? "sf-bullet--dim" : ""}`}
          >
            <div className="sf-bullet__index">02</div>
            <div className="sf-bullet__body">
              <div className="sf-bullet__kicker">清醒開顱 · 2013 – 2025</div>
              <div className="sf-bullet__row">
                <span className="sf-bullet__nlabel">N =</span>
                <span className="hero-num sf-bullet__num">672</span>
                <span className="sf-bullet__sublabel sf-bullet__sublabel--right">例</span>
              </div>
              <div className="sf-bullet__row sf-bullet__row--sub">
                <span className="hero-num sf-bullet__num sf-bullet__num--sec">5.6</span>
                <span className="sf-bullet__pct">%</span>
                <span className="sf-bullet__sublabel">長期神經缺損</span>
              </div>
            </div>
          </div>

          {/* 3. cognitive function preserved (chart side bullet) */}
          <div
            className={`sf-bullet ${active(3) ? "sf-bullet--on" : ""} ${dim(3) ? "sf-bullet--dim" : ""}`}
          >
            <div className="sf-bullet__index">03</div>
            <div className="sf-bullet__body">
              <div className="sf-bullet__kicker">認知功能保留</div>
              <div className="sf-bullet__row sf-bullet__row--text">
                <span>術後追蹤膠質瘤患者</span>
              </div>
              <div className="sf-bullet__foot sf-bullet__foot--em">
                認知缺損比例持續下降
                <span className="sf-bullet__nlabel sf-bullet__nlabel--inline">n = 114</span>
              </div>
            </div>
          </div>

          {/* 4. low-grade glioma 80% */}
          <div
            className={`sf-bullet ${active(4) ? "sf-bullet--on" : ""} ${dim(4) ? "sf-bullet--dim" : ""}`}
          >
            <div className="sf-bullet__index">04</div>
            <div className="sf-bullet__body">
              <div className="sf-bullet__kicker">低惡性度膠質瘤</div>
              <div className="sf-bullet__row">
                <span className="hero-num sf-bullet__num">80</span>
                <span className="sf-bullet__pct">%</span>
                <span className="sf-bullet__sublabel">患者功能維持或進步</span>
              </div>
              <div className="sf-bullet__foot">達國際水準 · 優於部分國際團隊</div>
            </div>
          </div>
        </div>

        {/* ──────────── RIGHT · chart ──────────── */}
        <div className={`sf-chart-col ${step === 3 ? "sf-chart-col--lit" : ""}`}>
          <div className="sf-chart-title">
            惡性膠質瘤患者術後疾病穩定狀態之認知功能追蹤
            <span className="sf-chart-title__n">（n = 114）</span>
          </div>
          <CognitiveChart highlight={step === 3} />
          <Legend />
        </div>
      </div>

      <div className="sf-cite">
        De Witt Hamer JCO 2012 · Lemaitre Neuro-Oncology 2022 · Cochereau Brain Struct Funct 2020 · Rijnen J Neurosurg 2020
      </div>
    </div>
  );
}

/* ───────────────────────────── chart ─────────────────────────────── */

function CognitiveChart({ highlight }: { highlight: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={`sf-chart ${highlight ? "sf-chart--lit" : ""}`}
      role="img"
      aria-label="Cognitive function deficit rates over follow-up time, 10 domains, n=114"
    >
      {/* y-axis grid + ticks: 0, 10, 20, 30, 40, 50, 60 */}
      {[0, 10, 20, 30, 40, 50, 60].map((v) => (
        <g key={`y${v}`}>
          <line
            x1={PAD_L}
            x2={VB_W - PAD_R}
            y1={yOf(v)}
            y2={yOf(v)}
            className={v === 0 ? "sf-axis__base" : "sf-axis__grid"}
          />
          <text
            x={PAD_L - 12}
            y={yOf(v)}
            className="sf-axis__tick"
            textAnchor="end"
            dy="0.34em"
          >
            {v}
          </text>
        </g>
      ))}

      {/* y-axis label */}
      <text
        className="sf-axis__title"
        transform={`translate(${PAD_L - 50} ${PAD_T + PLOT_H / 2}) rotate(-90)`}
        textAnchor="middle"
      >
        Deficit Rate (%)
      </text>

      {/* x-axis ticks */}
      {TIMES.map((t) => (
        <g key={`x${t}`}>
          <line
            x1={xOf(t)}
            x2={xOf(t)}
            y1={yOf(0)}
            y2={yOf(0) + 6}
            className="sf-axis__base"
          />
          <text
            x={xOf(t)}
            y={yOf(0) + 22}
            className="sf-axis__tick"
            textAnchor="middle"
          >
            {t.toFixed(1)}
          </text>
        </g>
      ))}

      {/* x-axis label */}
      <text
        x={PAD_L + PLOT_W / 2}
        y={VB_H - 12}
        className="sf-axis__title"
        textAnchor="middle"
      >
        Follow-up Time (years)
      </text>

      {/* line series */}
      {DOMAINS.map((d, idx) => {
        const pts = d.series
          .map((v, i) => `${xOf(TIMES[i])},${yOf(v)}`)
          .join(" ");
        return (
          <g
            key={d.id}
            className={`sf-series sf-series--${d.shade}`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <polyline className="sf-series__line" points={pts} />
            {d.series.map((v, i) => (
              <circle
                key={i}
                cx={xOf(TIMES[i])}
                cy={yOf(v)}
                r={4}
                className="sf-series__dot"
              />
            ))}
            {/* end-of-line label */}
            <text
              x={xOf(TIMES[2]) - 6}
              y={yOf(d.series[2])}
              className="sf-series__lbl"
              textAnchor="end"
              dy="-0.5em"
            >
              {d.label}
            </text>
          </g>
        );
      })}

      {/* trend arrow — overall decline */}
      <g className="sf-trend">
        <line
          x1={xOf(1.05)}
          y1={yOf(38)}
          x2={xOf(2.95)}
          y2={yOf(20)}
          className="sf-trend__line"
        />
        <text
          x={xOf(2.0)}
          y={yOf(34)}
          className="sf-trend__lbl"
          textAnchor="middle"
        >
          deficit ↓
        </text>
      </g>
    </svg>
  );
}

function Legend() {
  return (
    <div className="sf-legend">
      {DOMAINS.map((d) => (
        <div key={d.id} className={`sf-legend__item sf-legend__item--${d.shade}`}>
          <span className="sf-legend__swatch" />
          <span className="sf-legend__lbl">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
