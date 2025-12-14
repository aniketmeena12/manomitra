import React, { useEffect, useMemo, useState } from "react";


export default function ResourcesPage() {
  const RAW = useMemo(
    () => ({
      meditation: [
        {
          title: "10 Min Morning Meditation",
          desc: "Calm your mind before study.",
          link: "https://www.youtube.com/watch?v=inpok4MKVLM",
          minutes: 10,
          tags: ["calm", "focus", "mindfulness"],
        },
        {
          title: "5 Min Box Breathing",
          desc: "Quick stress relief breathing exercise.",
          link: "https://www.youtube.com/watch?v=nmFUDkj1Aq0",
          minutes: 5,
          tags: ["breathing", "anxiety"],
        },
        {
          title: "Body Scan for Sleep (15m)",
          desc: "Release tension before bed.",
          link: "https://www.youtube.com/watch?v=86m4RC_ADEY",
          minutes: 15,
          tags: ["sleep", "relax"],
        },
      ],
      wellness: [
        {
          title: "Manage Study Stress: 6 Practical Tips",
          desc: "Simple tools for busy students.",
          link: "https://www.youtube.com/watch?v=hnpQrMqDoqE",
          minutes: 9,
          tags: ["stress", "study", "habits"],
        },
        {
          title: "Sleep Hygiene for Better Focus",
          desc: "Routines that improve rest.",
          link: "https://www.youtube.com/watch?v=1zG1U3q4k2Y",
          minutes: 8,
          tags: ["sleep", "productivity"],
        },
        {
          title: "Mindful Study Break (7m)",
          desc: "Reset your attention between tasks.",
          link: "https://www.youtube.com/watch?v=w6T02g5hnT4",
          minutes: 7,
          tags: ["focus", "break"],
        },
      ],
      motivation: [
        {
          title: "Growth Mindset Explained",
          desc: "Believe you can improve.",
          link: "https://www.youtube.com/watch?v=_X0mgOOSpLU",
          minutes: 10,
          tags: ["mindset", "learning"],
        },
        {
          title: "Stay Motivated in College",
          desc: "Keep going when it’s hard.",
          link: "https://www.youtube.com/watch?v=ZXsQAXx_ao0",
          minutes: 6,
          tags: ["motivation", "discipline"],
        },
      ],
    }),
    []
  );

  const MOODS = [
    { key: "stressed", label: "Stressed", suggest: "meditation" },
    { key: "anxious", label: "Anxious", suggest: "meditation" },
    { key: "low", label: "Low Mood", suggest: "motivation" },
    { key: "meh", label: "Low Focus", suggest: "wellness" },
  ];

  const [tab, setTab] = useState("meditation");
  const [q, setQ] = useState("");
  const [maxMins, setMaxMins] = useState(null);
  const [mood, setMood] = useState(null);
  const [favs, setFavs] = useState(() => {
    try {
      const raw = localStorage.getItem("mh_favs");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("mh_favs", JSON.stringify(favs));
    } catch (e) {}
  }, [favs]);

  const chosenTab = mood
    ? MOODS.find((m) => m.key === mood)?.suggest || tab
    : tab;

  const items = RAW[chosenTab] || [];

  const filtered = items.filter((it) => {
    const text = `${it.title} ${it.desc} ${it.tags.join(" ")}`.toLowerCase();
    const okQ = q ? text.includes(q.toLowerCase()) : true;
    const okM = maxMins ? it.minutes <= maxMins : true;
    return okQ && okM;
  });

  const allItems = Object.values(RAW).flat();
  const favItems = allItems.filter((it) => favs.includes(it.title));

  const Style = () => (
    <style>{`
      .container { max-width: 1100px; margin: 0 auto; padding: 24px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; color: #111; }
      .title { text-align:center; font-weight: 800; font-size: 28px; }
      .sub { text-align:center; color:#666; margin-top:6px; }
      .mood { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:8px; margin-top:24px; }
      .mood button { border:1px solid #ddd; background:#fff; padding:10px 12px; border-radius:12px; cursor:pointer; text-align:left; }
      .mood button.active { background:#f6f6f6; }
      .toolbar { display:flex; gap:12px; flex-wrap:wrap; align-items:center; margin-top:16px; }
      .input { flex:1; min-width: 220px; border:1px solid #ddd; padding:10px 12px; border-radius:10px; }
      .btn { border:1px solid #ddd; background:#fff; padding:9px 12px; border-radius:10px; cursor:pointer; }
      .btn.primary { background:#111; color:#fff; border-color:#111; }
      .btn.ghost { background:transparent; }
      .tabs { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin: 18px 0; }
      .tab { border:1px solid #ddd; padding:8px 12px; border-radius:999px; background:#fff; cursor:pointer; }
      .tab.active { background:#111; color:#fff; border-color:#111; }
      .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap:16px; }
      .card { border:1px solid #eee; border-radius:16px; padding:16px; box-shadow: 0 2px 10px rgba(0,0,0,.05); background:#fff; display:flex; flex-direction:column; gap:8px; }
      .title-sm { font-weight:700; }
      .muted { color:#666; font-size: 14px; }
      .badges { display:flex; gap:6px; flex-wrap:wrap; margin:6px 0; }
      .badge { border:1px solid #eee; border-radius:999px; padding:3px 8px; font-size:12px; }
      .row { display:flex; gap:8px; align-items:center; }
      .spacer { flex:1; }
      .footer { margin-top: 24px; color:#666; font-size: 12px; text-align:center; }
      .heart { cursor:pointer; user-select:none; }
      @media (max-width: 640px) { .mood { grid-template-columns: repeat(2, minmax(0,1fr)); } }
    `}</style>
  );

  return (
    <div className="bg-[rgb(255,255,255,0.6)] rounded-xl p-3 shadow-md">
    <div className="resources-page">
      <Style />
      <div className="container">
        <div className="title">🌿 Wellness Resources</div>
        <div className="sub">Take a break. and relax. </div>

        {/* Mood shortcuts */}
        <div className="mood">
          {MOODS.map((m) => (
            <button
              key={m.key}
              className={mood === m.key ? "active" : ""}
              onClick={() => setMood((prev) => (prev === m.key ? null : m.key))}
              aria-pressed={mood === m.key}
            >
              <div style={{ fontWeight: 600 }}>{m.label}</div>
              <div className="muted">suggests: {m.suggest}</div>
            </button>
          ))}
        </div>

        {/* Search + quick filters */}
        <div className="toolbar">
          <input
            className="input"
            placeholder="Search: sleep, stress, focus, breathing…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {[5, 10, 15].map((m) => (
            <button
              key={m}
              className={`btn ${maxMins === m ? "primary" : ""}`}
              onClick={() => setMaxMins((v) => (v === m ? null : m))}
            >
              ≤ {m} min
            </button>
          ))}
          <button  className="border bg-black cursor-pointer text-white rounded-lg px-3 py-2 hover:bg-gray-800"
            onClick={() => {
              setQ("");
              setMaxMins(null);
              setMood(null);
            }}>Clear</button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {(["meditation", "wellness", "motivation", "favourites"])?.map((t) => (
            <button
              key={t}
              className={`tab ${(!mood && tab === t) || (mood && t === (MOODS.find((m) => m.key === mood)?.suggest || "")) ? "active" : ""}`}
              onClick={() => { setTab(t); setMood(null); }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab !== "favourites" ? (
          <CardsGrid
            items={filtered}
            favs={favs}
            onToggleFav={(title) =>
              setFavs((prev) => (prev.includes(title) ? prev.filter((x) => x !== title) : [...prev, title]))
            }
          />
        ) : (
          <CardsGrid
            items={favItems}
            favs={favs}
            onToggleFav={(title) =>
              setFavs((prev) => (prev.includes(title) ? prev.filter((x) => x !== title) : [...prev, title]))
            }
            emptyText="No favourites yet. Click the ♥ on any resource to save it here."
          />
        )}

        <div className="footer">
          💡 These resources support wellbeing but don’t replace professional help. If you’re struggling, contact your campus counselor or local helpline.
        </div>
      </div>
    </div>
    </div>
  );
}

function CardsGrid({ items, favs, onToggleFav, emptyText }) {
  if (!items || items.length === 0) {
    return <p className="muted" style={{ textAlign: "center", marginTop: 12 }}>{emptyText || "No results match your filters."}</p>;
  }
  return (
    <div className="grid">
      {items.map((res) => (
        <div key={res.title} className="card">
          <div>
            <div className="title-sm">{res.title}</div>
            <div className="muted" style={{ marginTop: 4 }}>{res.desc}</div>
          </div>
          <div className="badges">
            <span className="badge">~{res.minutes} min</span>
            {res.tags.slice(0, 3).map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
          <div className="row">
            <a className="btn" href={res.link} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${res.title}`}>
              ▶ Watch on YouTube
            </a>
            <div className="spacer" />
            <span
              className="heart"
              role="button"
              aria-label={favs.includes(res.title) ? "Remove from favourites" : "Add to favourites"}
              title={favs.includes(res.title) ? "Remove from favourites" : "Add to favourites"}
              onClick={() => onToggleFav(res.title)}
              style={{ fontSize: 20 }}
            >
              {favs.includes(res.title) ? "♥" : "♡"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

