import type { ChapterStepProps } from "../../registry/types";
import "./Trials.css";

/* Chapter 6 — trials · 特色進展 3 · 國內外臨床試驗 (slide 7)
   Native rebuild:
     • TOP   → chip "特色進展 3" + hero title "國內外臨床試驗"
     • LEFT  → 3 trial highlight cards (NaviFUS / NBM ADI / 國際影響力)
     • RIGHT → compact representative-trials table (6 rows, year/sponsor/phase)
   Cards light up in sequence on steps 1, 2, 3 — earlier cards dim to ghost.
   Card 1 reveals a Phase I → III progression badge bar.
   Card 2 reveals a "跨國 Phase II 多中心" tag.
   Card 3 reveals a Taiwan ⇔ Korea SVG link + a closing summary line. */

type TrialRow = {
  year: string;
  agent: string;
  sponsor: string;
  phase: string;
  /* which card the row supports (1 / 2 / 3) */
  cardId: 1 | 2 | 3;
};

const TABLE: TrialRow[] = [
  { year: "2014", agent: "NaviFUS",        sponsor: "林口長庚 自主研發", phase: "Phase I",         cardId: 1 },
  { year: "2019", agent: "NaviFUS",        sponsor: "林口長庚 自主研發", phase: "Phase I · done",  cardId: 1 },
  { year: "2025", agent: "NaviFUS · BBB",  sponsor: "林口長庚 · 多中心",  phase: "Phase III",       cardId: 1 },
  { year: "2022", agent: "NBM ADI",        sponsor: "NBM · 跨國協作",     phase: "Pre-clinical",    cardId: 2 },
  { year: "2024", agent: "NBM ADI",        sponsor: "NBM · 跨國多中心",   phase: "Phase II",        cardId: 2 },
  { year: "2025", agent: "MRgFUS 合作",     sponsor: "韓國指標醫學中心",   phase: "Joint program",   cardId: 3 },
];

export default function Trials({ step }: ChapterStepProps) {
  return <Scene step={step} />;
}

function Scene({ step }: { step: number }) {
  /* Card states: each card has three modes — pending (dim, before lit),
     active (current spotlight), past (lit before, now dimmed to ghost). */
  const cardState = (id: 1 | 2 | 3): "pending" | "active" | "past" => {
    if (step === 0) return "pending";
    if (step === id) return "active";
    if (step > id) return "past";
    return "pending";
  };

  return (
    <div className="tr-scene">
      {/* ─────────── head ─────────── */}
      <header className="tr-head">
        <div className="tr-chip-row">
          <span className="tr-chip tr-mono">特色進展 3</span>
          <span className="tr-chip-sep">·</span>
          <span className="tr-chip-en tr-mono">FEATURE&nbsp;III</span>
        </div>
        <h1 className="tr-title">
          偕同臨床試驗中心 · <span className="tr-title__accent">國內外臨床試驗</span>
        </h1>
        {step === 0 && (
          <div className="tr-sub">參與並領導國內外試驗，從自主研發到跨國協作。</div>
        )}
      </header>

      {/* ─────────── body grid ─────────── */}
      <div className="tr-body">
        {/* ── LEFT: 3 highlight cards ── */}
        <div className="tr-cards">
          <Card
            cardId={1}
            state={cardState(1)}
            kicker="自主研發"
            title="NaviFUS"
            roleLabel="ROLE · 開發中心"
            roleValue="林口長庚"
            lines={[
              { label: "團隊", value: "林口長庚 自主研發團隊" },
              { label: "里程碑 I", value: "二〇一九 完成 Phase I" },
              { label: "里程碑 II", value: "二〇二五 啟動多中心 Phase III" },
            ]}
          >
            <PhaseProgress active={cardState(1) !== "pending"} />
          </Card>

          <Card
            cardId={2}
            state={cardState(2)}
            kicker="藥物臨床合作"
            title="NBM ADI"
            roleLabel="ROLE · 主導試驗"
            roleValue="林口長庚"
            lines={[
              { label: "前期", value: "協助 NBM 藥物臨床前驗證" },
              { label: "戰略", value: "推動本土 ADI 藥物進軍國際" },
              { label: "現況", value: "主導 Phase II 跨國多中心試驗" },
            ]}
          >
            <div className="tr-tagrow">
              <span className="tr-tag tr-tag--solid tr-mono">跨國 Phase II</span>
              <span className="tr-tag tr-mono">多中心</span>
              <span className="tr-tag tr-mono">本土研發 → 國際</span>
            </div>
          </Card>

          <Card
            cardId={3}
            state={cardState(3)}
            kicker="國際影響力"
            title="國際合作"
            roleLabel="ROLE · 合作主軸"
            roleValue="台 ⇔ 韓"
            lines={[
              { label: "夥伴", value: "韓國指標醫學中心" },
              { label: "效益", value: "提升台灣研發能見度" },
              { label: "定位", value: "奠定國際臨床試驗的關鍵地位" },
            ]}
          >
            <CountryLink active={cardState(3) !== "pending"} />
          </Card>
        </div>

        {/* ── RIGHT: representative trials table ── */}
        <aside className="tr-table-wrap">
          <div className="tr-table-head">
            <span className="tr-table-kicker tr-mono">REPRESENTATIVE TRIALS</span>
            <span className="tr-table-meta tr-mono">2014 — 2025 · n = 6</span>
          </div>
          <table className="tr-table">
            <thead>
              <tr>
                <th className="tr-th tr-th--year">Year</th>
                <th className="tr-th">Agent / Programme</th>
                <th className="tr-th">Sponsor / Site</th>
                <th className="tr-th tr-th--phase">Phase</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row, idx) => {
                const s = cardState(row.cardId);
                const cls =
                  s === "active" ? "tr-tr tr-tr--active"
                  : s === "past" ? "tr-tr tr-tr--past"
                  : "tr-tr tr-tr--pending";
                return (
                  <tr key={idx} className={cls}>
                    <td className="tr-td tr-td--year hero-num">{row.year}</td>
                    <td className="tr-td tr-td--agent">{row.agent}</td>
                    <td className="tr-td">{row.sponsor}</td>
                    <td className="tr-td tr-td--phase tr-mono">{row.phase}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {step === 3 && (
            <div className="tr-table-foot">
              <hr className="rule" />
              <div className="tr-summary">
                <span className="tr-summary__kicker tr-mono">SUMMARY</span>
                <span className="tr-summary__text">
                  奠定<span className="tr-summary__em">國際臨床試驗</span>的<span className="tr-summary__em">關鍵地位</span>
                </span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ───────────────────────── card ───────────────────────── */

type CardLine = { label: string; value: string };

function Card({
  cardId,
  state,
  kicker,
  title,
  roleLabel,
  roleValue,
  lines,
  children,
}: {
  cardId: 1 | 2 | 3;
  state: "pending" | "active" | "past";
  kicker: string;
  title: string;
  roleLabel: string;
  roleValue: string;
  lines: CardLine[];
  children?: React.ReactNode;
}) {
  return (
    <article className={`tr-card tr-card--${state}`}>
      <div className="tr-card__rail">
        <div className="tr-card__order tr-mono">0{cardId}</div>
        <div className="tr-card__tick" />
      </div>
      <div className="tr-card__body">
        <div className="tr-card__top">
          <div className="tr-card__kicker">{kicker}</div>
          <h2 className="tr-card__title tr-mono">{title}</h2>
          <div className="tr-card__role">
            <span className="tr-card__role-lbl tr-mono">{roleLabel}</span>
            <span className="tr-card__role-val">{roleValue}</span>
          </div>
        </div>
        <ul className="tr-card__lines">
          {lines.map((l, i) => (
            <li key={i} className="tr-card__line">
              <span className="tr-card__line-lbl tr-mono">{l.label}</span>
              <span className="tr-card__line-val">{l.value}</span>
            </li>
          ))}
        </ul>
        {children && <div className="tr-card__extra">{children}</div>}
      </div>
    </article>
  );
}

/* ───────────── Phase I → III progress bar (card 1) ───────────── */

function PhaseProgress({ active }: { active: boolean }) {
  return (
    <div className={`tr-phase ${active ? "tr-phase--on" : ""}`}>
      <div className="tr-phase__line" />
      <div className="tr-phase__steps">
        <div className="tr-phase__node tr-phase__node--done">
          <div className="tr-phase__dot" />
          <div className="tr-phase__year hero-num">2019</div>
          <div className="tr-phase__lbl tr-mono">Phase I</div>
        </div>
        <div className="tr-phase__arrow tr-mono">—</div>
        <div className="tr-phase__node tr-phase__node--mid">
          <div className="tr-phase__dot" />
          <div className="tr-phase__year hero-num">2022</div>
          <div className="tr-phase__lbl tr-mono">Phase II</div>
        </div>
        <div className="tr-phase__arrow tr-mono">—</div>
        <div className="tr-phase__node tr-phase__node--now">
          <div className="tr-phase__dot" />
          <div className="tr-phase__year hero-num">2025</div>
          <div className="tr-phase__lbl tr-mono">Phase III · multi-center</div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Taiwan ⇔ Korea link (card 3) ───────────── */

function CountryLink({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 480 96"
      className={`tr-link ${active ? "tr-link--on" : ""}`}
      role="img"
      aria-label="台灣與韓國臨床試驗合作"
    >
      {/* Taiwan node */}
      <g transform="translate(60 48)">
        <circle r="34" className="tr-link__node" />
        <text textAnchor="middle" dy="-0.1em" className="tr-link__lbl">台</text>
        <text textAnchor="middle" dy="1.4em" className="tr-link__sub">Taiwan</text>
      </g>
      {/* Korea node */}
      <g transform="translate(420 48)">
        <circle r="34" className="tr-link__node" />
        <text textAnchor="middle" dy="-0.1em" className="tr-link__lbl">韓</text>
        <text textAnchor="middle" dy="1.4em" className="tr-link__sub">Korea</text>
      </g>
      {/* link */}
      <line x1="98" y1="48" x2="382" y2="48" className="tr-link__edge" />
      <polygon points="100,48 112,42 112,54" className="tr-link__arrow" />
      <polygon points="380,48 368,42 368,54" className="tr-link__arrow" />
      <text x="240" y="32" textAnchor="middle" className="tr-link__edge-lbl">
        joint trials
      </text>
    </svg>
  );
}
