import type { ChapterStepProps } from "../../registry/types";
import "./Summary.css";

/* Chapter 12 — Summary · 國際肯定 + SNQ 銅獎（slide 13）.
   Rebuilt natively:
     - section header 「總結」
     - left column: 「國際肯定」 progressive bullet reveal
     - right column: 「領先世界的腦瘤精準治療團隊」 key statement card
     - step 6: SNQ award reveal with photo + bronze hero ribbon
   The SNQ ceremony photo is preserved as <img>. */

type Bullet = {
  id: string;
  /** Step (within this chapter) at which this bullet first lights up. */
  revealStep: number;
  body: React.ReactNode;
};

export default function Summary({ step }: ChapterStepProps) {
  if (step === 0) return <SceneTitle />;
  if (step === 5) return <SceneAward />;
  return <SceneBody step={step} />;
}

/* ── Step 0 · 總結 title hero ───────────────────────────────────────── */
function SceneTitle() {
  return (
    <div className="sm-scene sm-scene--title">
      <div className="sm-title">
        <div className="sm-title__eyebrow">第 13 章 · CHAPTER XIII</div>
        <h1 className="sm-title__hero">總結</h1>
        <hr className="rule sm-title__rule" />
        <div className="sm-title__sub">
          領先世界的　<span className="sm-title__sub-em">腦瘤精準治療團隊</span>
        </div>
      </div>
    </div>
  );
}

/* ── Steps 1-4 · 國際肯定 bullets + key statement + tier compare ────── */
function SceneBody({ step }: { step: number }) {
  const bullets: Bullet[] = [
    {
      id: "asia",
      revealStep: 1,
      body: (
        <>
          <div className="sm-bullet__lead">個人化清醒開顱領域</div>
          <div className="sm-bullet__row">
            <span className="sm-badge sm-badge--asia">亞洲之冠</span>
            <span className="sm-bullet__sub">林口長庚腦瘤團隊</span>
          </div>
        </>
      ),
    },
    {
      id: "fus",
      revealStep: 2,
      body: (
        <>
          <div className="sm-bullet__lead">聚焦超音波應用於惡性腦瘤臨床試驗</div>
          <div className="sm-bullet__row">
            <span className="sm-badge sm-badge--global">全球領先</span>
            <span className="sm-bullet__sub">Focused Ultrasound · BBB opening</span>
          </div>
        </>
      ),
    },
    {
      id: "triad",
      revealStep: 4,
      body: (
        <>
          <div className="sm-bullet__lead">三位一體 · 神經腫瘤領域之典範</div>
          <div className="sm-triad">
            <div className="sm-triad__item">
              <span className="sm-triad__num hero-num">01</span>
              <span className="sm-triad__label">個人化手術設計</span>
            </div>
            <div className="sm-triad__plus">+</div>
            <div className="sm-triad__item">
              <span className="sm-triad__num hero-num">02</span>
              <span className="sm-triad__label">轉譯醫學研究</span>
            </div>
            <div className="sm-triad__plus">+</div>
            <div className="sm-triad__item">
              <span className="sm-triad__num hero-num">03</span>
              <span className="sm-triad__label">臨床試驗執行</span>
            </div>
          </div>
        </>
      ),
    },
  ];

  /* tier compare card appears at step 3 */
  const showTierCompare = step >= 3;
  /* statement card mode: showcase early; recedes once triad is on stage */
  const statementProminent = step <= 2;

  return (
    <div className="sm-scene sm-scene--body">
      <div className="sm-head">
        <div className="sm-eyebrow">總結 · INTERNATIONAL RECOGNITION</div>
        <h2 className="sm-headline">國際肯定</h2>
      </div>

      <div className="sm-body">
        {/* LEFT — bullets reveal */}
        <div className="sm-col sm-col--left">
          {bullets.map((b) => {
            const active = step >= b.revealStep;
            return (
              <div
                key={b.id}
                className={
                  "sm-bullet" +
                  (active ? " sm-bullet--active" : " sm-bullet--dim")
                }
              >
                <span className="sm-bullet__mark">▸</span>
                <div className="sm-bullet__body">{b.body}</div>
              </div>
            );
          })}

          {showTierCompare && (
            <div className="sm-tiers" key={`tiers-${step}`}>
              <div className="sm-tier">
                <span className="sm-tier__verb">領先</span>
                <span className="sm-tier__obj">全國</span>
              </div>
              <span className="sm-tier__sep">·</span>
              <div className="sm-tier">
                <span className="sm-tier__verb">優於</span>
                <span className="sm-tier__obj">日韓</span>
              </div>
              <span className="sm-tier__sep">·</span>
              <div className="sm-tier">
                <span className="sm-tier__verb">媲美</span>
                <span className="sm-tier__obj">歐美頂尖中心</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — key statement card */}
        <div className="sm-col sm-col--right">
          <div
            className={
              "sm-statement" +
              (statementProminent
                ? " sm-statement--prominent"
                : " sm-statement--recede")
            }
          >
            <div className="sm-statement__quote">「</div>
            <div className="sm-statement__title">
              領先世界的
              <br />
              <span className="sm-statement__em">腦瘤精準治療團隊</span>
            </div>
            <hr className="rule sm-statement__rule" />
            <div className="sm-statement__caption">
              World-leading precision neuro-oncology team
            </div>
            <div className="sm-statement__inst">
              林口長庚紀念醫院 · Chang Gung Memorial Hospital, Linkou
            </div>
          </div>

          <div className="sm-photo sm-photo--dim" aria-hidden>
            <img
              src={import.meta.env.BASE_URL + "assets/snq-award-slide13.png"}
              alt=""
              className="sm-photo__img"
            />
            <div className="sm-photo__veil" />
            <div className="sm-photo__hint">SNQ 28th · Awarding Ceremony</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 5 · SNQ 銅獎 reveal ───────────────────────────────────────── */
function SceneAward() {
  return (
    <div className="sm-scene sm-scene--award">
      <div className="sm-award">
        <div className="sm-award__photo">
          <img
            src={import.meta.env.BASE_URL + "assets/snq-award-slide13.png"}
            alt="SNQ 28th 國家品質標章 頒獎典禮"
            className="sm-award__img"
          />
        </div>

        <div className="sm-award__panel">
          <div className="sm-award__eyebrow">第 28 屆 · 國家生技醫療品質獎</div>

          {/* bronze ribbon — token-based with bronze hex exception */}
          <div className="sm-ribbon">
            <span className="sm-ribbon__pin" aria-hidden />
            <span className="sm-ribbon__label">SNQ</span>
            <span className="sm-ribbon__divider">·</span>
            <span className="sm-ribbon__medal">銅 獎</span>
          </div>

          <h2 className="sm-award__title">
            榮獲　<span className="sm-award__title-em">SNQ 銅獎</span>　肯定
          </h2>

          <hr className="rule sm-award__rule" />

          <div className="sm-award__meta">
            <div className="sm-award__meta-row">
              <span className="sm-award__meta-key">主辦</span>
              <span className="sm-award__meta-val">財團法人國家生技醫療產業策進會</span>
            </div>
            <div className="sm-award__meta-row">
              <span className="sm-award__meta-key">類別</span>
              <span className="sm-award__meta-val">疾病治療整合照護 · 醫療服務品質提升</span>
            </div>
            <div className="sm-award__meta-row">
              <span className="sm-award__meta-key">主題</span>
              <span className="sm-award__meta-val">腦癌團隊精準治療</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
