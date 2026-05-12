import type { ChapterStepProps } from "../../registry/types";
import "./Collab.css";

/* Chapter 3 — collab · cross-specialty consensus (slide 4)
   Left: native SVG mind map (8 specialties around center 腦瘤).
   Right: team meeting photo + step-specific text.
   All 4 steps share the two-col scaffold; step drives highlights. */

type Spec = {
  id: string;
  label: string;
  angle: number; // degrees, 0 = right, 90 = bottom (SVG y-down)
};

/* 8 specialties at 45° intervals.
   Positioning matches the spec exactly:
     腦神經外科 top · 麻醉部 top-right · 放射腫瘤部 right ·
     神經內科部 bottom-right · 復健部 bottom · 影像診療部 bottom-left ·
     解剖病理部 left · 腫瘤科 top-left
   SVG y axis points down → top = -90°. */
const SPECS: Spec[] = [
  { id: "ns",  label: "腦神經外科", angle: -90  },
  { id: "an",  label: "麻醉部",     angle: -45  },
  { id: "rt",  label: "放射腫瘤部", angle:   0  },
  { id: "neu", label: "神經內科部", angle:  45  },
  { id: "rh",  label: "復健部",     angle:  90  },
  { id: "rad", label: "影像診療部", angle: 135  },
  { id: "pa",  label: "解剖病理部", angle: 180  },
  { id: "on",  label: "腫瘤科",     angle: 225  },
];

const VB = 620;            // SVG viewBox size (square)
const CX = VB / 2;
const CY = VB / 2;
const R_RING = 240;        // ring radius
const R_NODE = 64;          // node radius
const R_CENTER = 84;        // center node radius

function nodePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + R_RING * Math.cos(rad), y: CY + R_RING * Math.sin(rad) };
}

export default function Collab({ step }: ChapterStepProps) {
  return (
    <div className="cb-scene">
      <div className="cb-eyebrow-row">
        <div className="cb-eyebrow">團隊合作 · 跨科共識</div>
        {step === 0 && (
          <div className="cb-hero-sub">惡性腦瘤跨專科治療團隊</div>
        )}
      </div>

      <div className="cb-grid">
        {/* ───────── LEFT · mind map ───────── */}
        <div className="cb-map">
          <MindMap step={step} />
        </div>

        {/* ───────── RIGHT · photo + step text ───────── */}
        <div className="cb-right">
          <figure className="cb-photo">
            <img
              src={import.meta.env.BASE_URL + "assets/team-meeting-slide4.png"}
              alt="跨科團隊會議"
              className="cb-photo__img"
            />
            <figcaption className="cb-photo__cap">
              跨科團隊會議 · 林口長庚腦瘤中心
            </figcaption>
          </figure>

          <div className="cb-textwell">
            {step === 0 && (
              <div className="cb-step cb-step--core">
                <div className="cb-step__kicker">核心</div>
                <div className="cb-step__big">跨科共識</div>
                <div className="cb-step__sub">是整個團隊的核心</div>
              </div>
            )}

            {step === 1 && (
              <div className="cb-step">
                <div className="cb-step__kicker">常態運作</div>
                <div className="cb-step__line">
                  <span className="hero-num cb-step__num">1</span>
                  <span className="cb-step__unit">週</span>
                  <span className="cb-step__lbl">跨科診療討論</span>
                </div>
                <div className="cb-step__line">
                  <span className="hero-num cb-step__num">1</span>
                  <span className="cb-step__unit">月</span>
                  <span className="cb-step__lbl">特殊個案病理討論</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="cb-step">
                <div className="cb-step__kicker">整合 · 個人化</div>
                <div className="cb-step__big cb-step__big--med">分子腫瘤整合</div>
                <div className="cb-step__divider" />
                <div className="cb-step__line cb-step__line--accent">
                  <span className="cb-step__chip">個管師</span>
                  <span className="cb-step__lbl">術後照護整合</span>
                </div>
                <div className="cb-step__foot">
                  → 每位病患 <em>最完整的個人化計畫</em>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="cb-step cb-step--quote">
                <div className="cb-step__kicker">疫情期間 · 持續線上會議</div>
                <div className="cb-quote">
                  <span className="cb-quote__mark">「</span>
                  同中求異<span className="cb-quote__sep">·</span>異中求同
                  <span className="cb-quote__mark">」</span>
                </div>
                <div className="cb-step__sub cb-step__sub--quiet">
                  開放討論的團隊精神
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── mind map ─────────────────────────── */

function MindMap({ step }: { step: number }) {
  // Which spokes should glow per step.
  // step 0: all dim (overview)
  // step 1: all spokes glow (weekly cross-specialty)
  // step 2: highlight 解剖病理部 (pa) + 影像診療部 (rad) + add 個管師 callout
  // step 3: all spokes glow softly (continuing online)
  const litIds: Set<string> =
    step === 1 ? new Set(SPECS.map((s) => s.id))
    : step === 2 ? new Set(["pa", "rad"])
    : step === 3 ? new Set(SPECS.map((s) => s.id))
    : new Set();

  return (
    <svg
      viewBox={`0 0 ${VB} ${VB}`}
      className="cb-svg"
      role="img"
      aria-label="腦瘤跨專科團隊心智圖"
    >
      <defs>
        <filter id="cb-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* outer faint ring */}
      <circle
        cx={CX}
        cy={CY}
        r={R_RING}
        className="cb-ring-outline"
      />

      {/* radial spokes — stop ~8px before the node edge so the lit
          stroke never grazes the node circle / label. */}
      {SPECS.map((s) => {
        const p = nodePos(s.angle);
        const lit = litIds.has(s.id);
        const rad = (s.angle * Math.PI) / 180;
        const trim = R_NODE + 8;
        const startX = CX + R_CENTER * Math.cos(rad);
        const startY = CY + R_CENTER * Math.sin(rad);
        const endX = p.x - trim * Math.cos(rad);
        const endY = p.y - trim * Math.sin(rad);
        return (
          <line
            key={`spoke-${s.id}`}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            className={`cb-spoke ${lit ? "cb-spoke--lit" : ""}`}
          />
        );
      })}

      {/* case-manager callout connector (step 2 only) */}
      {step === 2 && (
        <>
          {/* dashed bracket connecting pa + rad through a labelled hub */}
          <CaseManagerCallout />
        </>
      )}

      {/* outer specialty nodes */}
      {SPECS.map((s) => {
        const p = nodePos(s.angle);
        const lit = litIds.has(s.id);
        return (
          <g
            key={s.id}
            className={`cb-node ${lit ? "cb-node--lit" : ""}`}
            transform={`translate(${p.x} ${p.y})`}
          >
            <circle r={R_NODE} className="cb-node__bg" />
            <circle r={R_NODE} className="cb-node__ring" />
            <text className="cb-node__lbl" textAnchor="middle" dy="0.35em">
              {s.label}
            </text>
          </g>
        );
      })}

      {/* center node */}
      <g className="cb-center" transform={`translate(${CX} ${CY})`}>
        <circle r={R_CENTER} className="cb-center__bg" />
        <text className="cb-center__lbl" textAnchor="middle" dy="0.36em">
          腦瘤
        </text>
      </g>
    </svg>
  );
}

/* Case-manager callout: dashed bracket linking 解剖病理部 (left) and
   影像診療部 (bottom-left), with a label "個管師" placed outside the ring. */
function CaseManagerCallout() {
  const pa = nodePos(180);          // 解剖病理部
  const rad = nodePos(135);         // 影像診療部
  // Hub anchor — out beyond the ring on the lower-left.
  const hub = { x: 70, y: 470 };
  const labelAt = { x: 70, y: 510 };

  return (
    <g className="cb-cm">
      <path
        d={`M ${pa.x} ${pa.y} Q ${hub.x - 20} ${hub.y - 80} ${hub.x} ${hub.y}`}
        className="cb-cm__path"
      />
      <path
        d={`M ${rad.x} ${rad.y} Q ${hub.x + 10} ${hub.y - 40} ${hub.x} ${hub.y}`}
        className="cb-cm__path"
      />
      <circle cx={hub.x} cy={hub.y} r="6" className="cb-cm__dot" />
      <text
        x={labelAt.x}
        y={labelAt.y}
        textAnchor="middle"
        className="cb-cm__lbl"
      >
        個管師
      </text>
      <text
        x={labelAt.x}
        y={labelAt.y + 26}
        textAnchor="middle"
        className="cb-cm__sub"
      >
        Case Manager
      </text>
    </g>
  );
}
