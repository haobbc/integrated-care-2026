import type { ChapterDef } from "./types";
import Intro from "../chapters/01-intro/Intro";
import { narrations as introNarrations } from "../chapters/01-intro/narrations";
import History from "../chapters/02-history/History";
import { narrations as historyNarrations } from "../chapters/02-history/narrations";
import Collab from "../chapters/03-collab/Collab";
import { narrations as collabNarrations } from "../chapters/03-collab/narrations";
import Awake from "../chapters/04-awake/Awake";
import { narrations as awakeNarrations } from "../chapters/04-awake/narrations";
import Fus from "../chapters/05-fus/Fus";
import { narrations as fusNarrations } from "../chapters/05-fus/narrations";
import Trials from "../chapters/06-trials/Trials";
import { narrations as trialsNarrations } from "../chapters/06-trials/narrations";
import Execution from "../chapters/07-execution/Execution";
import { narrations as executionNarrations } from "../chapters/07-execution/narrations";
import Service from "../chapters/08-service/Service";
import { narrations as serviceNarrations } from "../chapters/08-service/narrations";
import Safety from "../chapters/09-safety/Safety";
import { narrations as safetyNarrations } from "../chapters/09-safety/narrations";
import Satisfaction from "../chapters/10-satisfaction/Satisfaction";
import { narrations as satisfactionNarrations } from "../chapters/10-satisfaction/narrations";
import Positioning from "../chapters/11-positioning/Positioning";
import { narrations as positioningNarrations } from "../chapters/11-positioning/narrations";
import Summary from "../chapters/12-summary/Summary";
import { narrations as summaryNarrations } from "../chapters/12-summary/narrations";
import Outlook from "../chapters/13-outlook/Outlook";
import { narrations as outlookNarrations } from "../chapters/13-outlook/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  { id: "intro",         title: "引言",          narrations: introNarrations,        Component: Intro },
  { id: "history",       title: "團隊歷史",      narrations: historyNarrations,      Component: History },
  { id: "collab",        title: "跨科合作",      narrations: collabNarrations,       Component: Collab },
  { id: "awake",         title: "清醒開顱",      narrations: awakeNarrations,        Component: Awake },
  { id: "fus",           title: "聚焦超音波",    narrations: fusNarrations,          Component: Fus },
  { id: "trials",        title: "臨床試驗",      narrations: trialsNarrations,       Component: Trials },
  { id: "execution",     title: "執行度",        narrations: executionNarrations,    Component: Execution },
  { id: "service",       title: "服務量",        narrations: serviceNarrations,      Component: Service },
  { id: "safety",        title: "安全性",        narrations: safetyNarrations,       Component: Safety },
  { id: "satisfaction",  title: "滿意度",        narrations: satisfactionNarrations, Component: Satisfaction },
  { id: "positioning",   title: "國際定位",      narrations: positioningNarrations,  Component: Positioning },
  { id: "summary",       title: "總結 · SNQ",    narrations: summaryNarrations,      Component: Summary },
  { id: "outlook",       title: "展望",          narrations: outlookNarrations,      Component: Outlook },
];
