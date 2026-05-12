import type { ChapterStepProps } from "../../registry/types";
import "./Awake.css";

/* Chapter 4 — 特色進展 1 · 個人化清醒開顱手術 (slide 5).
   Five steps: feature reveal → cross-specialty cards → 2017 timeline →
   core method (cognitive + motor monitoring) → conclusion金句.
   Surgery room photo becomes ambient bottom strip from step 3 onward. */

const SPECIALTIES = [
  { tag: "麻醉部", en: "Anesthesiology", note: "麻醉最佳化流程，喚醒節奏可控" },
  { tag: "神經內科", en: "Neurology", note: "術中神經電生理與監測判讀" },
  { tag: "復健科", en: "Rehabilitation", note: "術前認知 / 動作評估與術後追蹤" },
  { tag: "神經外科實驗室", en: "Neurosurgery Lab", note: "個別化術中評估準則開發" },
];

export default function Awake({ step }: ChapterStepProps) {
  return (
    <div className="aw-scene">
      <Folio />

      <header className="aw-head">
        <div className="aw-chip">特色進展　1</div>
        <h1 className="aw-title">
          惡性腦瘤<span className="aw-title__accent">個人化清醒開顱手術</span>
        </h1>
        <div className="aw-sub-en">Awake Craniotomy · Personalized Functional Mapping</div>
      </header>

      <div className="aw-body">
        {/* ── step 1: cross-specialty four cards ── */}
        <section
          className={`aw-panel aw-specs ${step >= 1 ? "aw-panel--on" : "aw-panel--off"}`}
          aria-hidden={step < 1}
        >
          <div className="aw-panel__label">跨科整合 · Cross-Specialty Team</div>
          <div className="aw-specs__grid">
            {SPECIALTIES.map((s, i) => (
              <div
                key={s.tag}
                className={`aw-spec-card ${step >= 1 ? "aw-spec-card--on" : ""}`}
                style={{ ["--i" as string]: i }}
              >
                <div className="aw-spec-card__tag">{s.tag}</div>
                <div className="aw-spec-card__en">{s.en}</div>
                <div className="aw-spec-card__note">{s.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── step 2: 2017 timeline marker ── */}
        <section
          className={`aw-panel aw-timeline ${step >= 2 ? "aw-panel--on" : "aw-panel--off"}`}
          aria-hidden={step < 2}
        >
          <div className="aw-timeline__row">
            <div className="aw-timeline__year">
              <span className="hero-num aw-timeline__num">2017</span>
              <span className="aw-timeline__since">起</span>
            </div>
            <div className="aw-timeline__rule">
              <span className="aw-timeline__node aw-timeline__node--start" />
              <span className="aw-timeline__line" />
              <span className="aw-timeline__node aw-timeline__node--end" />
            </div>
            <div className="aw-timeline__badge">
              <div className="aw-timeline__badge-zh">手術流程標準化</div>
              <div className="aw-timeline__badge-en">Standardized Workflow</div>
            </div>
          </div>
        </section>

        {/* ── step 3: core method — two parallel monitoring streams ── */}
        <section
          className={`aw-panel aw-core ${step >= 3 ? "aw-panel--on" : "aw-panel--off"}`}
          aria-hidden={step < 3}
        >
          <div className="aw-core__streams">
            <div className="aw-core__stream">
              <div className="aw-core__stream-label">術中監測 A</div>
              <div className="aw-core__stream-name">認知功能</div>
              <div className="aw-core__stream-en">Cognitive Mapping</div>
              <div className="aw-core__wave">
                <svg viewBox="0 0 320 40" preserveAspectRatio="none">
                  <path
                    d="M0 20 L40 20 L52 8 L68 32 L84 16 L100 24 L140 20 L156 6 L172 34 L188 18 L204 22 L240 20 L256 10 L272 30 L288 18 L320 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>
            </div>

            <div className="aw-core__converge">
              <span className="aw-core__arrow">→</span>
              <div className="aw-core__personal">
                <div className="aw-core__personal-label">收斂至</div>
                <div className="aw-core__personal-text">個人化層級</div>
                <div className="aw-core__personal-en">Per-Patient Resolution</div>
              </div>
              <span className="aw-core__arrow aw-core__arrow--up">→</span>
            </div>

            <div className="aw-core__stream">
              <div className="aw-core__stream-label">術中監測 B</div>
              <div className="aw-core__stream-name">運動功能</div>
              <div className="aw-core__stream-en">Motor Mapping</div>
              <div className="aw-core__wave">
                <svg viewBox="0 0 320 40" preserveAspectRatio="none">
                  <path
                    d="M0 20 L24 20 L40 12 L58 28 L78 14 L96 26 L120 20 L140 8 L160 30 L180 16 L200 24 L228 20 L248 12 L268 28 L290 18 L320 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ── step 4: conclusion金句 ── */}
        <section
          className={`aw-panel aw-conc ${step >= 4 ? "aw-panel--on" : "aw-panel--off"}`}
          aria-hidden={step < 4}
        >
          <div className="aw-conc__left">
            <div className="aw-conc__lead">關鍵功能 ↔ 手術區域 · 緊密連接</div>
            <div className="aw-conc__main">
              <span className="aw-conc__line">精準引導腫瘤切除</span>
              <span className="aw-conc__sep">·</span>
              <span className="aw-conc__line aw-conc__line--em">提升神經功能保留率</span>
            </div>
          </div>
          <div className="aw-conc__right">
            <div className="aw-conc__metric">
              <span className="aw-conc__metric-label">廣泛應用</span>
              <span className="aw-conc__metric-value">新診斷 + 復發膠質瘤</span>
            </div>
          </div>
        </section>
      </div>

      {/* ── surgery room photo: large fill on step 2 (the 2017 timeline beat),
              fades out on step 3+ ── */}
      <div
        className={
          "aw-strip " +
          (step === 2 ? "aw-strip--on" : step >= 3 ? "aw-strip--out" : "aw-strip--off")
        }
        aria-hidden={step !== 2}
      >
        <img
          src={import.meta.env.BASE_URL + "assets/surgery-room-slide5.png"}
          alt="清醒開顱手術室 · team and monitors"
          className="aw-strip__img"
        />
        <div className="aw-strip__caption">
          <span>清醒開顱手術室 · Linkou CGMH</span>
          <span className="aw-strip__caption-sep">·</span>
          <span>Awake Craniotomy Suite</span>
        </div>
      </div>

      <div className="aw-foot aw-mono">
        <span>Standardized since 2017</span>
        <span className="aw-foot__sep">·</span>
        <span>Anesthesiology · Neurology · Rehabilitation · Neurosurgery Lab</span>
      </div>
    </div>
  );
}

function Folio() {
  return <div className="aw-folio">林口長庚 · 腦瘤精準治療</div>;
}
