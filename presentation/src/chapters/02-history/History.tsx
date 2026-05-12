import type { ChapterStepProps } from "../../registry/types";
import "./History.css";

/* Chapter 2 — twenty-year team history (slide 3).
   Native rebuild of slide 3:
     • LEFT  → date hero "20040318 創立加入癌症中心" + two stacked decade panels
     • RIGHT → preserved photo of the "人本濟世 勤勞樸實" stone monument + team
   Per-step driver: hero marker is the anchor on step 0; decade panels light up
   in sequence on steps 1 and 2 (each panel dims when the next one takes over). */

export default function History({ step }: ChapterStepProps) {
  if (step === 0) return <Scene step={0} />;
  if (step === 1) return <Scene step={1} />;
  return <Scene step={2} />;
}

function Scene({ step }: { step: number }) {
  /* decade panel highlight state */
  const firstActive = step >= 1;
  const secondActive = step >= 2;
  const firstDim = step >= 2;

  return (
    <div className="hs-scene">
      <div className="hs-folio">林口長庚 · 腦瘤精準治療</div>

      <header className="hs-head">
        <div className="hs-eyebrow">團隊歷史</div>
        <div className="hs-eyebrow-sub hs-mono">
          <span>20 年</span>
          <span className="hs-eyebrow-sep">·</span>
          <span>SINCE 2004</span>
        </div>
      </header>

      <div className="hs-body">
        {/* ── LEFT: native two-decade timeline ── */}
        <div className="hs-timeline">
          <div className="hs-anchor">
            <div className="hs-anchor__label hs-mono">創立 · 加入癌症中心</div>
            <div className="hs-anchor__date hero-num">20040318</div>
            <hr className="rule hs-anchor__rule" />
          </div>

          <div className="hs-decades">
            <article
              className={
                "hs-decade" +
                (firstActive ? " hs-decade--active" : " hs-decade--pending") +
                (firstDim ? " hs-decade--past" : "")
              }
            >
              <div className="hs-decade__mark">
                <div className="hs-decade__order hs-mono">PHASE I</div>
                <div className="hs-decade__num hero-num">10</div>
                <div className="hs-decade__unit">年</div>
              </div>
              <div className="hs-decade__body">
                <div className="hs-decade__kicker">前十年</div>
                <h3 className="hs-decade__title">
                  型塑完整<span className="hs-decade__accent">治療團隊</span>
                </h3>
                <p className="hs-decade__sub">同步歐美治療準則</p>
                <div className="hs-decade__chips">
                  <span className="hs-chip">WHO-CNS</span>
                  <span className="hs-chip">NCCN compliant</span>
                </div>
              </div>
            </article>

            <div className="hs-link" aria-hidden>
              <span className="hs-link__tick" />
            </div>

            <article
              className={
                "hs-decade" +
                (secondActive ? " hs-decade--active" : " hs-decade--pending")
              }
            >
              <div className="hs-decade__mark">
                <div className="hs-decade__order hs-mono">PHASE II</div>
                <div className="hs-decade__num hero-num">10</div>
                <div className="hs-decade__unit">年</div>
              </div>
              <div className="hs-decade__body">
                <div className="hs-decade__kicker">後十年</div>
                <h3 className="hs-decade__title">
                  打造<span className="hs-decade__accent">轉譯研究團隊</span>
                </h3>
                <p className="hs-decade__sub">突破治療困境</p>
                <div className="hs-decade__chips">
                  <span className="hs-chip">translational</span>
                  <span className="hs-chip">clinical trials</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* ── RIGHT: preserved stone-monument + team photo ── */}
        <aside className="hs-photo">
          <div className="hs-photo__frame">
            <img
              src={import.meta.env.BASE_URL + "assets/stone-team-slide3.jpg"}
              alt="林口長庚腦瘤團隊合影 · 人本濟世 勤勞樸實 石碑前"
              className="hs-photo__img"
            />
          </div>
          <div className="hs-photo__cap hs-mono">
            <span>林口長庚紀念醫院</span>
            <span className="hs-photo__sep">·</span>
            <span>腦瘤團隊合影</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
