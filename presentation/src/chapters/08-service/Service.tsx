import type { ChapterStepProps } from "../../registry/types";
import "./Service.css";

/* Chapter 8 — 結果面 · 服務量 + 存活 (slide 9).
   Four steps:
     0 — eyebrow + volume trend chart (left active, survival dim)
     1 — 13.6% hero callout overlay on left chart
     2 — survival chart on right takes focus (volume dims)
     3 — comparison annotation: 國外 12-18m baseline vs 林口長庚 longer

   Both charts are native SVG built from inferred data.
*/

// ── Chart 1: annual service volume 2009-2024 ──
const VOLUME: Array<{ year: number; n: number }> = [
  { year: 2009, n: 30 },
  { year: 2010, n: 35 },
  { year: 2011, n: 45 },
  { year: 2012, n: 55 },
  { year: 2013, n: 65 },
  { year: 2014, n: 75 },
  { year: 2015, n: 80 },
  { year: 2016, n: 85 },
  { year: 2017, n: 90 },
  { year: 2018, n: 95 },
  { year: 2019, n: 100 },
  { year: 2020, n: 110 },
  { year: 2021, n: 118 },
  { year: 2022, n: 125 },
  { year: 2023, n: 130 },
  { year: 2024, n: 136 },
];

// ── Chart 2: median OS comparison ──
const SURVIVAL = {
  external: { lo: 12, hi: 18, label: "國外平均", en: "Literature pooled" },
  ours: { value: 32, label: "林口長庚 · 清醒開顱", en: "Linkou CGMH · Awake" },
  axisMax: 40, // months
};

export default function Service({ step }: ChapterStepProps) {
  const showLeftHero = step >= 1;
  const focusRight = step >= 2;
  const showCompare = step >= 3;

  return (
    <div className="sv-scene">
      <Folio />

      <header className="sv-head">
        <div className="sv-eyebrow">結果面　·　服務質量</div>
        <h1 className="sv-title">
          全國最完整腦瘤團隊
          <span className="sv-title__hint">　·　量能與品質兼具</span>
        </h1>
      </header>

      <div className="sv-grid">
        {/* ─── LEFT · service volume trend ─── */}
        <section
          className={`sv-panel sv-vol ${focusRight ? "sv-panel--dim" : "sv-panel--on"}`}
        >
          <div className="sv-panel__head">
            <div className="sv-panel__tag">CHART 1</div>
            <div className="sv-panel__title">腦瘤團隊年服務量</div>
            <div className="sv-panel__sub">Annual surgical volume · 2009–2024</div>
          </div>

          <VolumeChart highlightEnd={!focusRight} />

          {/* 13.6% hero callout — step 1 onward, fades when focus shifts right */}
          <div
            className={`sv-callout ${showLeftHero && !focusRight ? "sv-callout--on" : "sv-callout--off"}`}
            aria-hidden={!(showLeftHero && !focusRight)}
          >
            <div className="sv-callout__label">佔全國</div>
            <div className="sv-callout__num">
              <span className="hero-num">13.6</span>
              <span className="sv-callout__unit">%</span>
            </div>
            <div className="sv-callout__sub">National share · brain-tumor surgery</div>
          </div>
        </section>

        {/* ─── RIGHT · median survival comparison ─── */}
        <section
          className={`sv-panel sv-surv ${focusRight ? "sv-panel--on" : "sv-panel--dim"}`}
        >
          <div className="sv-panel__head">
            <div className="sv-panel__tag">CHART 2</div>
            <div className="sv-panel__title">第四級惡性腦瘤清醒開顱後</div>
            <div className="sv-panel__sub">Median overall survival · GBM after awake craniotomy</div>
          </div>

          <SurvivalChart showCompare={showCompare} focusRight={focusRight} />

          {/* baseline label / hero numbers — step 3 onward */}
          <div
            className={`sv-surv__legend ${showCompare ? "sv-surv__legend--on" : "sv-surv__legend--off"}`}
            aria-hidden={!showCompare}
          >
            <div className="sv-surv__legend-row">
              <span className="sv-surv__swatch sv-surv__swatch--mute" />
              <span className="sv-surv__legend-name">國外平均</span>
              <span className="sv-surv__legend-val">
                <span className="hero-num">12–18</span>
                <span className="sv-surv__legend-unit">m</span>
              </span>
            </div>
            <div className="sv-surv__legend-row sv-surv__legend-row--em">
              <span className="sv-surv__swatch sv-surv__swatch--accent" />
              <span className="sv-surv__legend-name">林口長庚</span>
              <span className="sv-surv__legend-val sv-surv__legend-val--em">大幅提升</span>
            </div>
          </div>
        </section>
      </div>

      <div className="sv-cite sv-mono">thebraintumourcharity.org</div>
    </div>
  );
}

function Folio() {
  return <div className="sv-folio">林口長庚　·　腦瘤精準治療</div>;
}

/* ─────────────────────────────────────────────────────────────────────
 * VolumeChart — line chart 2009→2024, N=136 endpoint highlight
 * ───────────────────────────────────────────────────────────────────── */
function VolumeChart({ highlightEnd }: { highlightEnd: boolean }) {
  // viewBox plot area
  const W = 720;
  const H = 360;
  const PAD = { top: 36, right: 60, bottom: 46, left: 56 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const yMax = 150;
  const xOf = (i: number) =>
    PAD.left + (i / (VOLUME.length - 1)) * innerW;
  const yOf = (n: number) =>
    PAD.top + innerH - (n / yMax) * innerH;

  // smooth-ish path via simple polyline
  const pts = VOLUME.map((d, i) => `${xOf(i)},${yOf(d.n)}`).join(" ");

  // catmull-rom-ish smooth path
  const smoothPath = (() => {
    const points = VOLUME.map((d, i) => ({ x: xOf(i), y: yOf(d.n) }));
    if (points.length < 2) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  })();

  const yTicks = [0, 30, 60, 90, 120, 150];

  // x-axis labels every 3 years
  const xLabelIdx = VOLUME.map((_, i) => i).filter(
    (i) => i % 3 === 0 || i === VOLUME.length - 1,
  );

  const lastIdx = VOLUME.length - 1;
  const lastX = xOf(lastIdx);
  const lastY = yOf(VOLUME[lastIdx].n);

  return (
    <div className="sv-chart sv-chart--vol">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="sv-svg">
        {/* y grid */}
        {yTicks.map((t) => (
          <g key={`g-${t}`}>
            <line
              x1={PAD.left}
              y1={yOf(t)}
              x2={W - PAD.right}
              y2={yOf(t)}
              className="sv-grid"
            />
            <text
              x={PAD.left - 10}
              y={yOf(t) + 4}
              className="sv-tick"
              textAnchor="end"
            >
              {t}
            </text>
          </g>
        ))}

        {/* y axis label */}
        <text
          x={14}
          y={PAD.top - 14}
          className="sv-axis-label"
        >
          手術例數 / yr
        </text>

        {/* baseline x-axis */}
        <line
          x1={PAD.left}
          y1={yOf(0)}
          x2={W - PAD.right}
          y2={yOf(0)}
          className="sv-axis"
        />

        {/* x labels */}
        {xLabelIdx.map((i) => (
          <text
            key={`xl-${i}`}
            x={xOf(i)}
            y={H - PAD.bottom + 22}
            className="sv-tick"
            textAnchor="middle"
          >
            {VOLUME[i].year}
          </text>
        ))}

        {/* area under curve (subtle) */}
        <path
          d={`${smoothPath} L ${xOf(lastIdx)} ${yOf(0)} L ${xOf(0)} ${yOf(0)} Z`}
          className="sv-vol__area"
        />

        {/* line */}
        <path d={smoothPath} className="sv-vol__line" />

        {/* points */}
        {VOLUME.map((d, i) => (
          <circle
            key={`p-${d.year}`}
            cx={xOf(i)}
            cy={yOf(d.n)}
            r={i === lastIdx ? 6 : 3}
            className={i === lastIdx ? "sv-vol__pt sv-vol__pt--end" : "sv-vol__pt"}
          />
        ))}

        {/* polyline fallback (invisible, kept for accessibility text shape) */}
        <polyline points={pts} className="sv-vol__poly" />

        {/* endpoint label "136" */}
        {highlightEnd && (
          <g className="sv-vol__endlabel">
            <line
              x1={lastX}
              y1={lastY - 18}
              x2={lastX}
              y2={lastY - 6}
              className="sv-vol__leader"
            />
            <text
              x={lastX}
              y={lastY - 26}
              className="sv-vol__endnum"
              textAnchor="middle"
            >
              136
            </text>
            <text
              x={lastX}
              y={lastY - 46}
              className="sv-vol__endcap"
              textAnchor="middle"
            >
              N · 2024
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 * SurvivalChart — horizontal range bars
 *   國外平均: 12–18m (range bar, muted)
 *   林口長庚: ~32m endpoint (accent), with "顯著提升" arrow when compare
 * ───────────────────────────────────────────────────────────────────── */
function SurvivalChart({
  showCompare,
  focusRight,
}: {
  showCompare: boolean;
  focusRight: boolean;
}) {
  const W = 640;
  const H = 360;
  const PAD = { top: 60, right: 100, bottom: 64, left: 150 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const xMax = SURVIVAL.axisMax;
  const xOf = (m: number) => PAD.left + (m / xMax) * innerW;

  // x-axis ticks every 6 months
  const xTicks = [0, 6, 12, 18, 24, 30, 36];

  const rowH = innerH / 2;
  const rowY = (i: number) => PAD.top + i * rowH + rowH / 2;

  const extLo = SURVIVAL.external.lo;
  const extHi = SURVIVAL.external.hi;
  const ours = SURVIVAL.ours.value;

  const yExternal = rowY(0);
  const yOurs = rowY(1);

  const barH = 22;

  return (
    <div className="sv-chart sv-chart--surv">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="sv-svg">
        {/* row guide lines */}
        <line
          x1={PAD.left}
          y1={yExternal}
          x2={W - PAD.right}
          y2={yExternal}
          className="sv-grid-faint"
        />
        <line
          x1={PAD.left}
          y1={yOurs}
          x2={W - PAD.right}
          y2={yOurs}
          className="sv-grid-faint"
        />

        {/* x grid */}
        {xTicks.map((t) => (
          <line
            key={`xg-${t}`}
            x1={xOf(t)}
            y1={PAD.top - 6}
            x2={xOf(t)}
            y2={H - PAD.bottom + 6}
            className="sv-grid"
          />
        ))}

        {/* x ticks */}
        {xTicks.map((t) => (
          <text
            key={`xt-${t}`}
            x={xOf(t)}
            y={H - PAD.bottom + 24}
            textAnchor="middle"
            className="sv-tick"
          >
            {t}
          </text>
        ))}

        {/* x axis label */}
        <text
          x={W - PAD.right}
          y={H - PAD.bottom + 44}
          textAnchor="end"
          className="sv-axis-label"
        >
          months · median OS
        </text>

        {/* baseline axis */}
        <line
          x1={PAD.left}
          y1={H - PAD.bottom}
          x2={W - PAD.right}
          y2={H - PAD.bottom}
          className="sv-axis"
        />

        {/* ─── row 0: 國外平均 12–18m (range bar) ─── */}
        <g className="sv-surv__row sv-surv__row--ext">
          <text
            x={PAD.left - 16}
            y={yExternal + 5}
            textAnchor="end"
            className="sv-surv__rowlabel"
          >
            國外平均
          </text>
          {/* range bar */}
          <rect
            x={xOf(extLo)}
            y={yExternal - barH / 2}
            width={xOf(extHi) - xOf(extLo)}
            height={barH}
            className="sv-surv__bar sv-surv__bar--mute"
          />
          {/* whisker caps */}
          <line
            x1={xOf(extLo)}
            y1={yExternal - barH / 2 - 6}
            x2={xOf(extLo)}
            y2={yExternal + barH / 2 + 6}
            className="sv-surv__cap"
          />
          <line
            x1={xOf(extHi)}
            y1={yExternal - barH / 2 - 6}
            x2={xOf(extHi)}
            y2={yExternal + barH / 2 + 6}
            className="sv-surv__cap"
          />
          {/* range label */}
          <text
            x={xOf(extHi) + 12}
            y={yExternal + 5}
            className="sv-surv__barlabel"
          >
            12–18 m
          </text>
        </g>

        {/* ─── row 1: 林口長庚 (accent, longer) ─── */}
        <g
          className={`sv-surv__row sv-surv__row--ours ${focusRight ? "sv-surv__row--on" : ""}`}
        >
          <text
            x={PAD.left - 16}
            y={yOurs + 5}
            textAnchor="end"
            className="sv-surv__rowlabel sv-surv__rowlabel--em"
          >
            林口長庚
          </text>
          <rect
            x={PAD.left}
            y={yOurs - barH / 2}
            width={focusRight ? xOf(ours) - PAD.left : 0}
            height={barH}
            className="sv-surv__bar sv-surv__bar--accent"
          />
          {/* arrow head at right tip when grown */}
          {focusRight && (
            <polygon
              points={`${xOf(ours)},${yOurs - barH / 2 - 6} ${xOf(ours) + 14},${yOurs} ${xOf(ours)},${yOurs + barH / 2 + 6}`}
              className="sv-surv__arrow"
            />
          )}
          {focusRight && (
            <text
              x={xOf(ours) + 22}
              y={yOurs + 5}
              className="sv-surv__barlabel sv-surv__barlabel--em"
            >
              大幅提升
            </text>
          )}
        </g>

        {/* compare bracket — appears step 3 */}
        {showCompare && (
          <g className="sv-surv__compare">
            {/* dashed baseline showing 18m cutoff */}
            <line
              x1={xOf(extHi)}
              y1={PAD.top - 4}
              x2={xOf(extHi)}
              y2={H - PAD.bottom + 4}
              className="sv-surv__cutoff"
            />
            <text
              x={xOf(extHi)}
              y={PAD.top - 12}
              textAnchor="middle"
              className="sv-surv__cutoff-label"
            >
              18 m · 國外上限
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
