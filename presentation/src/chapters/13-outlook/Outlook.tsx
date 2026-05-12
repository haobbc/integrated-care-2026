import type { ChapterStepProps } from "../../registry/types";
import "./Outlook.css";

/* Chapter 13 — outlook + closing (slide 14).
   Five steps:
     0 — section hero "展望" + 3 empty numbered card placeholders
     1 — card 01 lights up: integrate internal + external resources
     2 — card 02 lights up: scale team care experience
     3 — card 03 lights up: translate R&D to bedside
     4 — final clean closing slide: thank-you + Q&A, italic serif, max white space
*/

const OUTLOOK_CARDS = [
  {
    num: "01",
    zh: "整合資源 · 打造堅強團隊",
    en: "Integrate internal and external resources",
    sub: "把跨科共識、研究中心、臨床試驗網絡，串成一支更穩定的團隊。",
  },
  {
    num: "02",
    zh: "平行推展 · 複製流程",
    en: "Scale team care experience to other sites",
    sub: "把腦癌團隊的照護流程，平行推展到院內其他癌別與院外合作機構。",
  },
  {
    num: "03",
    zh: "落地研發 · 強化臨床試驗運行",
    en: "Continuous translation from lab to bedside",
    sub: "把實驗室成果落地成試驗，再把試驗結果送到病人床邊。",
  },
];

export default function Outlook({ step }: ChapterStepProps) {
  if (step === 4) return <SceneClosing />;
  return <SceneOutlook step={step} />;
}

/* ── Steps 0-3: 展望 三件事 ── */
function SceneOutlook({ step }: { step: number }) {
  return (
    <div className="ok-scene ok-scene--outlook">
      <Folio />

      <header className="ok-head">
        <div className="ok-eyebrow">Chapter Outlook · 結語</div>
        <h1 className="ok-title">
          展<span className="ok-title__gap" />望
        </h1>
        <div className="ok-sub">
          <span className="ok-sub__lead">Three Forward Commitments</span>
          <span className="ok-sub__sep">·</span>
          <span className="ok-sub__count">三件事</span>
        </div>
        <hr className="rule ok-head__rule" />
      </header>

      <div className="ok-grid">
        {OUTLOOK_CARDS.map((c, i) => {
          const cardStep = i + 1;
          const state =
            step === cardStep ? "on" : step > cardStep ? "dim" : "empty";
          return (
            <article
              key={c.num}
              className={`ok-card ok-card--${state}`}
              style={{ ["--i" as string]: i }}
            >
              <div className="ok-card__head">
                <span className="hero-num ok-card__num">{c.num}</span>
                <span className="ok-card__bar" aria-hidden />
              </div>
              <div className="ok-card__body">
                <h2 className="ok-card__zh">{c.zh}</h2>
                <div className="ok-card__en">{c.en}</div>
                <p className="ok-card__sub">{c.sub}</p>
              </div>
              <div className="ok-card__foot">
                <span className="ok-card__tag">No. {c.num}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="ok-foot ok-mono">
        <span>SNQ 2026 · 第六組 · 腦癌團隊精準治療</span>
        <span className="ok-foot__sep">·</span>
        <span>Outlook</span>
      </div>
    </div>
  );
}

/* ── Step 4: closing thank-you slide ── */
function SceneClosing() {
  return (
    <div className="ok-scene ok-scene--closing">
      <div className="ok-close">
        <div className="ok-close__eyebrow">Thank You · Q &amp; A</div>

        <h1 className="ok-close__hero">
          <span className="ok-close__hero-line">謝謝各位委員</span>
          <span className="ok-close__hero-sep" aria-hidden />
          <span className="ok-close__hero-line ok-close__hero-line--it">
            歡迎提問
          </span>
        </h1>

        <hr className="rule ok-close__rule" />

        <div className="ok-close__byline">
          <div className="ok-close__author">
            <span className="ok-close__author-role">主報</span>
            <span className="ok-close__author-name">陳品元</span>
          </div>
          <div className="ok-close__inst">
            林口長庚紀念醫院 · 腦癌團隊
            <span className="ok-close__inst-sep">·</span>
            Chang Gung Memorial Hospital, Linkou
          </div>
        </div>

        <div className="ok-close__mark ok-mono">SNQ 2026 · 第六組</div>
      </div>
    </div>
  );
}

function Folio() {
  return <div className="ok-folio">林口長庚 · 腦瘤精準治療</div>;
}
