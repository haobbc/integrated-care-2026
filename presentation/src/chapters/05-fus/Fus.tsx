import type { ChapterStepProps } from "../../registry/types";
import "./Fus.css";

/* Chapter 5 — 特色進展 2 · 聚焦超音波臨床試驗團隊 (slide 6).
   4 steps:
     0 — hero (chip + title)
     1 — 學研醫創產 5-actor chain
     2 — 4-quadrant application grid
     3 — NaviFUS clinical-trial timeline 2014 → 2025
*/

export default function Fus({ step }: ChapterStepProps) {
  return (
    <div className="fs-scene">
      <Chip />
      <Hero step={step} />

      {step === 1 && <ChainScene />}
      {step === 2 && <GridScene />}
      {step === 3 && <TimelineScene />}
    </div>
  );
}

/* ── chip ── */
function Chip() {
  return (
    <div className="fs-chip">
      <span className="fs-chip__mark">特色進展 2</span>
      <span className="fs-chip__sep">·</span>
      <span className="fs-chip__name">聚焦超音波</span>
    </div>
  );
}

/* ── hero title ── */
function Hero({ step }: { step: number }) {
  return (
    <header className={`fs-hero ${step === 0 ? "fs-hero--full" : "fs-hero--compact"}`}>
      <h1 className="fs-hero__title">
        聚焦超音波<span className="fs-hero__amp">　·　</span>臨床試驗團隊
      </h1>
      {step === 0 && (
        <div className="fs-hero__sub">
          學研醫創產<span className="fs-hero__sub-sep">　全面整合　</span>四大臨床應用
        </div>
      )}
      {step === 0 && (
        <div className="fs-hero__pillars">
          <span className="fs-hero__pill">學</span>
          <span className="fs-hero__pill">研</span>
          <span className="fs-hero__pill">醫</span>
          <span className="fs-hero__pill">創</span>
          <span className="fs-hero__pill">產</span>
        </div>
      )}
    </header>
  );
}

/* ── Step 1: 學研醫創產 chain ── */
function ChainScene() {
  const nodes = [
    { tag: "醫", title: "神經外科", sub: "Neurosurgery", note: "臨床主導" },
    { tag: "研", title: "神經科學研究中心", sub: "Neuroscience Research Center", note: "轉譯研究" },
    { tag: "學", title: "大學電機系", sub: "EE · Academic", note: "聲學工程" },
    { tag: "創", title: "新創公司", sub: "NaviFUS Corp.", note: "技術產化" },
    { tag: "產", title: "跨國臨床試驗", sub: "Clinical Trials", note: "臨床落地" },
  ];
  return (
    <section className="fs-stage fs-stage--chain">
      <div className="fs-section-label">學研醫創產 全面整合</div>
      <div className="fs-chain">
        {nodes.map((n, i) => (
          <div className="fs-chain__row" key={n.title}>
            <div className="fs-node">
              <div className="fs-node__tag">{n.tag}</div>
              <div className="fs-node__body">
                <div className="fs-node__title">{n.title}</div>
                <div className="fs-node__sub">{n.sub}</div>
                <div className="fs-node__note">{n.note}</div>
              </div>
            </div>
            {i < nodes.length - 1 && (
              <svg className="fs-arrow" viewBox="0 0 60 24" aria-hidden="true">
                <line x1="2" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <polyline points="42,5 54,12 42,19" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="fs-stage__foot fs-mono">
        Neurosurgery · NRC · EE · NaviFUS · International trial sites
      </div>
    </section>
  );
}

/* ── Step 2: 4-quadrant application grid ── */
function GridScene() {
  const apps = [
    {
      idx: "01",
      title: "血腦障壁開啟",
      en: "BBB Opening",
      brief: "微氣泡 + 聚焦超音波 暫時打開血腦屏障，化療與標靶藥得以穿透。",
    },
    {
      idx: "02",
      title: "輔助腦瘤放射治療",
      en: "FUS-assisted Radiotherapy",
      brief: "結合再放射治療，提升復發 GBM 對放射線之敏感度。",
    },
    {
      idx: "03",
      title: "腦瘤聲動力療法",
      en: "Sonodynamic Therapy",
      brief: "超音波啟動聲動力藥物產生細胞毒性反應，攻擊腫瘤。",
    },
    {
      idx: "04",
      title: "液態活體採檢",
      en: "Liquid Biopsy",
      brief: "BBB 開啟後 循環腫瘤 DNA 釋出 提升液態活檢靈敏度。",
    },
  ];
  return (
    <section className="fs-stage fs-stage--grid">
      <div className="fs-section-label">四大臨床應用</div>
      <div className="fs-grid">
        {apps.map((a) => (
          <div className="fs-card" key={a.idx}>
            <div className="fs-card__idx fs-mono">{a.idx}</div>
            <div className="fs-card__title">{a.title}</div>
            <div className="fs-card__en fs-mono">{a.en}</div>
            <hr className="rule fs-card__rule" />
            <div className="fs-card__brief">{a.brief}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Step 3: NaviFUS timeline 2014 → 2025 ── */
function TimelineScene() {
  const events = [
    {
      year: "2014",
      phase: "Phase I",
      title: "First-in-human · Safety",
      nct: "NCT06214976",
      body: "BBB opening 首例人體試驗 — 安全性確立。",
    },
    {
      year: "2018",
      phase: "Phase II",
      title: "Efficacy + Safety · Re-irradiation",
      nct: "NCT04446426",
      body: "復發 GBM 合併再放射治療之第二期試驗。",
    },
    {
      year: "2020",
      phase: "Phase II",
      title: "NaviFUS + Bevacizumab",
      nct: "NCT04988750",
      body: "BBB 開啟合併標靶 bevacizumab。",
    },
    {
      year: "2024-25",
      phase: "Phase III",
      title: "Sonodynamic · Liquid biopsy",
      nct: "Multi-center, international",
      body: "跨國第三期 — 聲動力 + 液態活檢平台化。",
      emphasis: true,
    },
  ];
  return (
    <section className="fs-stage fs-stage--timeline">
      <div className="fs-section-label">
        NaviFUS 臨床試驗里程碑
        <span className="fs-section-label__span fs-mono">2014 → 2025</span>
      </div>

      <div className="fs-timeline">
        <div className="fs-timeline__axis" />
        {events.map((e) => (
          <div className={`fs-event ${e.emphasis ? "fs-event--em" : ""}`} key={e.year}>
            <div className="fs-event__year hero-num">{e.year}</div>
            <div className="fs-event__dot" />
            <div className="fs-event__card">
              <div className="fs-event__phase fs-mono">{e.phase}</div>
              <div className="fs-event__title">{e.title}</div>
              <div className="fs-event__nct fs-mono">{e.nct}</div>
              <div className="fs-event__body">{e.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="fs-stage__foot fs-mono">
        ClinicalTrials.gov · NaviFUS Corp. · Linkou CGMH
      </div>
    </section>
  );
}
