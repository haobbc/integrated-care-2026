import type { ChapterStepProps } from "../../registry/types";
import "./Satisfaction.css";

/* Chapter 10 — 結果面 · 病人滿意度 (slide 11).
   Five steps: eyebrow + nurse illust → survey scope chips → 4×100% grid →
   96.2% hero card with 3 sub-rows → 金句 conclusion.
   Nurse illustration stays as <img>; layout is rebuilt natively. */

const SCOPE_CHIPS = ["手術", "放療", "化療", "整體流程"];

const HUNDRED_CELLS = [
  { zh: "病情解釋", en: "Disease Explanation" },
  { zh: "認知評估", en: "Cognitive Assessment" },
  { zh: "治療流程", en: "Treatment Workflow" },
  { zh: "個案管理追蹤", en: "Case Management Follow-up" },
];

const OVERALL_ROWS = [
  { zh: "加護病房", en: "Intensive Care Unit" },
  { zh: "普通病房", en: "General Ward" },
  { zh: "整體照護流程", en: "Overall Care Pathway" },
];

export default function Satisfaction({ step }: ChapterStepProps) {
  return (
    <div className="st-scene">
      <Folio />

      <header className="st-head">
        <div className="st-chip">結果面 · 病人滿意度</div>
        <h1 className="st-title">
          高度肯定<span className="st-title__accent">團隊治療與溝通</span>
        </h1>
        <div className="st-sub-en">Patient Satisfaction Survey · CGMH Brain Tumor Team</div>
      </header>

      <div className="st-body">
        {/* ── LEFT column · content ── */}
        <div className="st-col-left">
          {/* step 1 — survey scope chips */}
          <section
            className={`st-panel st-scope ${step >= 1 ? "st-panel--on" : "st-panel--off"}`}
            aria-hidden={step < 1}
          >
            <div className="st-panel__label">調查涵蓋範圍 · Survey Scope</div>
            <div className="st-scope__row">
              {SCOPE_CHIPS.map((c, i) => (
                <span
                  key={c}
                  className={`st-scope__chip ${step >= 1 ? "st-scope__chip--on" : ""}`}
                  style={{ ["--i" as string]: i }}
                >
                  {c}
                </span>
              ))}
            </div>
          </section>

          {/* step 2 — 4×100% grid */}
          <section
            className={`st-panel st-hundred ${step >= 2 ? "st-panel--on" : "st-panel--off"}`}
            aria-hidden={step < 2}
          >
            <div className="st-panel__label">四項滿意度 · 100%</div>
            <div className="st-hundred__grid">
              {HUNDRED_CELLS.map((c, i) => (
                <div
                  key={c.zh}
                  className={`st-cell ${step >= 2 ? "st-cell--on" : ""}`}
                  style={{ ["--i" as string]: i }}
                >
                  <div className="st-cell__dim">
                    <div className="st-cell__zh">{c.zh}</div>
                    <div className="st-cell__en">{c.en}</div>
                  </div>
                  <div className="hero-num st-cell__num">
                    100<span className="st-cell__pct">%</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* step 3 — 96.2% overall card with 3 sub-rows */}
          <section
            className={`st-panel st-overall ${step >= 3 ? "st-panel--on" : "st-panel--off"}`}
            aria-hidden={step < 3}
          >
            <div className="st-overall__card">
              <div className="st-overall__left">
                <div className="st-overall__label">整體照護滿意度</div>
                <div className="hero-num st-overall__num">
                  96.2<span className="st-overall__pct">%</span>
                </div>
                <div className="st-overall__en">Overall Care Satisfaction</div>
              </div>
              <div className="st-overall__divider" />
              <div className="st-overall__right">
                {OVERALL_ROWS.map((r, i) => (
                  <div
                    key={r.zh}
                    className={`st-overall__row ${step >= 3 ? "st-overall__row--on" : ""}`}
                    style={{ ["--i" as string]: i }}
                  >
                    <span className="st-overall__dot" />
                    <div className="st-overall__row-body">
                      <span className="st-overall__row-zh">{r.zh}</span>
                      <span className="st-overall__row-en">{r.en}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* step 4 — 金句 conclusion */}
          <section
            className={`st-panel st-quote ${step >= 4 ? "st-panel--on" : "st-panel--off"}`}
            aria-hidden={step < 4}
          >
            <div className="st-quote__mark">「</div>
            <div className="st-quote__body">
              <div className="st-quote__lead">調查結果顯示，患者</div>
              <div className="st-quote__main">高度肯定團隊<span className="st-quote__em">治療與溝通方式</span></div>
            </div>
          </section>
        </div>

        {/* ── RIGHT column · nurse illustration ── */}
        <div className="st-col-right">
          <div className={`st-illust ${step >= 0 ? "st-illust--on" : ""}`}>
            <div className="st-illust__frame">
              <img
                src={import.meta.env.BASE_URL + "assets/nurse-illust-slide11.png"}
                alt="個案管理師與病患衛教 · nurse with patient checklist"
                className="st-illust__img"
              />
            </div>
            <div className="st-illust__caption">
              <span>個案管理 · 衛教與追蹤</span>
              <span className="st-illust__sep">·</span>
              <span>Case Management</span>
            </div>
          </div>
        </div>
      </div>

      <div className="st-foot st-mono">
        <span>Patient Satisfaction Survey</span>
        <span className="st-foot__sep">·</span>
        <span>CGMH Linkou · Brain Tumor Team</span>
      </div>
    </div>
  );
}

function Folio() {
  return <div className="st-folio">林口長庚 · 腦瘤精準治療</div>;
}
