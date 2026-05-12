import type { ChapterStepProps } from "../../registry/types";
import "./Intro.css";

/* Chapter 1 — title cover + disease background (slides 1 + 2).
   Pie is mounted once at chapter level; per-step changes highlight + sections. */

export default function Intro({ step }: ChapterStepProps) {
  if (step === 0) return <SceneCover />;
  return <SceneBackground step={step} />;
}

function Folio() {
  return <div className="in-folio">林口長庚 · 腦瘤精準治療</div>;
}

/* ── Step 0: cover ── */
function SceneCover() {
  return (
    <div className="in-scene in-scene--cover">
      <div className="in-cover">
        <div className="in-cover__eyebrow">SNQ 國家品質標章 · 第 28 屆</div>
        <h1 className="in-cover__title">
          疾病治療整合照護<br />與醫療服務品質提升
        </h1>
        <div className="in-cover__sub">
          <span className="in-cover__sub-strong">腦癌團隊精準治療</span>
        </div>
        <hr className="rule in-cover__rule" />
        <div className="in-cover__byline">
          <span className="in-cover__group">第六組</span>
          <span className="in-cover__sep">·</span>
          <span className="in-cover__author">主報　陳品元</span>
        </div>
        <div className="in-cover__inst">林口長庚紀念醫院 · Chang Gung Memorial Hospital, Linkou</div>
      </div>
    </div>
  );
}

/* ── Steps 1-6: disease background (replicates slide 2 layout) ── */
function SceneBackground({ step }: { step: number }) {
  return (
    <div className="in-scene in-scene--bg">
      <Folio />

      <div className="in-bg">
        <div className="in-bg__head">
          <div className="in-bg__eyebrow">惡性腦瘤（腦癌）</div>
          {step === 1 && (
            <div className="in-bg__transition">先看疾病本身。</div>
          )}
        </div>

        <div className="in-bg__body">
          <div className="in-bg__col-text">
            <div className={`in-bg__bullet ${step >= 2 ? "in-bg__bullet--active" : "in-bg__bullet--dim"}`}>
              <span className="in-bg__bullet-mark">▶</span>
              <div className="in-bg__bullet-body">
                <div className="in-bg__bullet-row">
                  <span>腦癌發生率排名第</span>
                  <span className="in-bg__num">20</span>
                  <span>位</span>
                </div>
                <div className="in-bg__bullet-row">
                  <span>死亡率男性第</span>
                  <span className="in-bg__num">13</span>
                  <span>、女性第</span>
                  <span className="in-bg__num">12</span>
                </div>
                <div className={`in-bg__bullet-row ${step >= 3 ? "in-bg__bullet-row--em" : ""}`}>
                  <span>第四級膠質瘤平均存活</span>
                  <span className="in-bg__num in-bg__num--em">12-18</span>
                  <span>個月</span>
                </div>
              </div>
            </div>

            <div className={`in-bg__bullet ${step >= 4 ? "in-bg__bullet--active" : "in-bg__bullet--dim"}`}>
              <span className="in-bg__bullet-mark">▶</span>
              <div className="in-bg__bullet-body">
                <span className="in-bg__bullet-row">
                  術前
                  <span className="in-bg__num in-bg__num--em">80%</span>
                  患者至少一項
                  <span className="in-bg__em">認知功能缺損</span>
                </span>
              </div>
            </div>

            <div className={`in-bg__bullet ${step >= 5 ? "in-bg__bullet--active" : "in-bg__bullet--dim"}`}>
              <span className="in-bg__bullet-mark">▶</span>
              <div className="in-bg__bullet-body">
                <div className="in-bg__bullet-row">
                  標準治療：
                  <span className="in-bg__chip">手術</span>
                  <span className="in-bg__chip">放射治療</span>
                  <span className="in-bg__chip">化學治療</span>
                  <span className="in-bg__chip">標靶治療</span>
                </div>
                <div className="in-bg__bullet-row in-bg__bullet-row--sub">
                  需要 <span className="in-bg__em">跨科配合</span>
                </div>
              </div>
            </div>

            <div className={`in-bg__bullet ${step >= 6 ? "in-bg__bullet--active" : "in-bg__bullet--dim"}`}>
              <span className="in-bg__bullet-mark">▶</span>
              <div className="in-bg__bullet-body">
                <div className="in-bg__bullet-row">
                  低手術切除率、運動或語言損傷、化療無法穿透血腦屏障
                </div>
                <div className="in-bg__bullet-row in-bg__bullet-row--sub">
                  → 與<span className="in-bg__em">極差的預後</span>高度相關
                </div>
              </div>
            </div>
          </div>

          <div className="in-bg__col-fig">
            <div className="in-bg__fig-frame">
              <img
                src={import.meta.env.BASE_URL + "assets/paper-figs-slide2.png"}
                alt="MRI · GBM median survival · primary resection paper figures"
                className="in-bg__fig-img"
              />
            </div>
            <div className="in-cite in-mono">
              Stupp NEJM 2005 · Sanai 2015 NEJM · J Neurosurg 2009 · Duffau 2021 Neurosurgery
            </div>
          </div>
        </div>

        <div className="in-bg__foot in-mono">
          台灣癌症登記資料 · 2023 · thebraintumourcharity.org
        </div>
      </div>
    </div>
  );
}
