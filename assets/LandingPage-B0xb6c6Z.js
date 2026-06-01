import{n as e,s as t,t as n}from"./jsx-runtime-CnSBKPes.js";import{t as r}from"./proxy-C6eSG-Z_.js";import{t as i}from"./index-DbUNsM87.js";import{t as a}from"./lock-CgWEsz_6.js";import{t as o}from"./mail-CcpIanq7.js";import{n as s,t as c}from"./user-Cf2OcY9K.js";import{t as l}from"./x-DzlYIBvB.js";var u=t(e(),1),d=n(),f=()=>{let[e,t]=(0,u.useState)(!1),[n,f]=(0,u.useState)(!1),[p,m]=(0,u.useState)(`home`),[h,g]=(0,u.useState)(``),[_,v]=(0,u.useState)(``),[y,b]=(0,u.useState)(``);(0,u.useEffect)(()=>{let e=()=>{t(window.scrollY>20)};return window.addEventListener(`scroll`,e),()=>window.removeEventListener(`scroll`,e)},[]);let x=e=>{m(e),f(!1),window.scrollTo({top:0,behavior:`smooth`})};return(0,d.jsxs)(`div`,{style:{position:`relative`,width:`100%`,minHeight:`100vh`,background:`var(--bg)`},children:[(0,d.jsx)(`style`,{dangerouslySetInnerHTML:{__html:`
    :root {
      --bg: #08080f;
      --surface: #0f0f1a;
      --card: #121220;
      --card2: #161628;
      --border: rgba(255,255,255,0.07);
      --purple: #7c3aed;
      --purple-light: #a855f7;
      --pink: #ec4899;
      --blue: #3b82f6;
      --orange: #f97316;
      --green: #22c55e;
      --text: #f1f0ff;
      --muted: #8b8aaa;
      --accent-grad: linear-gradient(135deg, #7c3aed, #ec4899);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, h5 { font-family: 'Syne', sans-serif; line-height: 1.15; }

    /* ── Noise overlay ── */
    body::before {
      content: '';
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.03;
    }

    /* ── NAV ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 48px;
      background: rgba(8,8,15,0.85);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--border);
      transition: all 0.3s ease;
    }
    nav.nav-scrolled {
      padding: 12px 48px;
      background: rgba(8,8,15,0.95);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    .logo {
      display: flex; align-items: center; gap: 10px;
      font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700;
      text-decoration: none; color: var(--text);
    }

    .logo-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--accent-grad);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }

    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links button { 
      background: transparent;
      border: none;
      color: var(--muted); 
      font-size: 14px; 
      font-weight: 500; 
      cursor: pointer;
      transition: color .2s; 
    }
    .nav-links button:hover { color: var(--text); }
    .nav-links button.active { color: var(--text); font-weight: 700; }

    .nav-cta {
      background: var(--accent-grad); color: #fff;
      border: none; padding: 10px 22px; border-radius: 8px;
      font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px;
      cursor: pointer; text-decoration: none; transition: opacity .2s;
    }
    .nav-cta:hover { opacity: 0.85; }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: grid; grid-template-columns: 7fr 5fr;
      align-items: center;
      padding: 160px 0 80px;
      gap: 60px;
      position: relative;
      width: 100%;
    }

    .hero::after {
      content: '';
      position: absolute; top: 10%; left: -10%; width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(124,58,237,.18) 0%, transparent 70%);
      pointer-events: none;
    }

    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
      color: var(--purple-light); margin-bottom: 20px;
    }
    .hero-eyebrow::before { content: '⚡'; font-size: 14px; }

    .hero h1 {
      font-size: clamp(44px, 5.5vw, 72px);
      font-weight: 800;
      line-height: 1.08;
      margin-bottom: 24px;
    }

    .hero h1 .grad {
      background: var(--accent-grad);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero h1 .blue-grad {
      background: linear-gradient(135deg, #a78bfa, #60a5fa);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-desc {
      font-size: 17px; color: var(--muted); max-width: 520px;
      line-height: 1.7; margin-bottom: 36px;
    }

    .hero-actions { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-bottom: 56px; }

    .btn-primary {
      background: var(--accent-grad);
      color: #fff; border: none;
      padding: 14px 28px; border-radius: 10px;
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px;
      cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
      transition: transform .2s, box-shadow .2s;
      box-shadow: 0 0 30px rgba(124,58,237,.35);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 40px rgba(124,58,237,.5); }

    .btn-ghost {
      background: transparent; color: var(--muted);
      border: 1px solid var(--border);
      padding: 14px 24px; border-radius: 10px;
      font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px;
      cursor: pointer; text-decoration: none;
      transition: color .2s, border-color .2s;
    }
    .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,.25); }

    .hero-stats { display: flex; gap: 40px; flex-wrap: wrap; }
    .stat-item { display: flex; flex-direction: column; gap: 2px; }
    .stat-num { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: var(--text); }
    .stat-num.pink { color: var(--pink); }
    .stat-num.orange { color: var(--orange); }
    .stat-label { font-size: 11px; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }

    /* Dashboard mockup */
    .hero-visual { position: relative; width: 100%; }

    .dashboard-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,.6);
    }

    .dc-header {
      background: rgba(255,255,255,.04);
      padding: 10px 16px;
      display: flex; align-items: center; gap: 8px;
      border-bottom: 1px solid var(--border);
      font-size: 12px; color: var(--muted);
    }

    .dc-dots { display: flex; gap: 5px; }
    .dc-dot { width: 10px; height: 10px; border-radius: 50%; }
    .dc-dot.r { background: #ff5f57; }
    .dc-dot.y { background: #ffbd2e; }
    .dc-dot.g { background: #28c840; }

    .dc-body { padding: 20px; }

    .queue-section { margin-bottom: 20px; }
    .queue-title { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
    .badge-optimal { background: rgba(34,197,94,.15); color: var(--green); font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; border: 1px solid rgba(34,197,94,.3); }

    .bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 80px; margin-bottom: 8px; }
    .bar { flex: 1; border-radius: 4px 4px 0 0; background: rgba(124,58,237,.35); transition: background .2s; }
    .bar.peak { background: var(--pink); }
    .bar:hover { background: var(--purple-light); }

    .chart-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--muted); }

    .hud-card {
      background: rgba(255,255,255,.04);
      border: 1px solid var(--border);
      border-radius: 12px; padding: 14px;
      margin-bottom: 12px;
    }
    .hud-title { font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; display: flex; justify-content: space-between; }
    .hud-live { color: var(--green); }

    .alert-pill {
      display: inline-block; background: rgba(239,68,68,.2); color: #f87171;
      border: 1px solid rgba(239,68,68,.35); border-radius: 6px;
      font-size: 11px; font-weight: 700; padding: 4px 10px;
    }

    .quality-alert {
      background: rgba(239,68,68,.08); border: 1px solid rgba(239,68,68,.2);
      border-radius: 10px; padding: 12px 14px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .qa-label { font-size: 11px; font-weight: 700; color: #f87171; }
    .qa-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
    .qa-pts { font-size: 13px; font-weight: 700; color: var(--green); }

    /* ── SECTION WRAPPER ── */
    section { position: relative; z-index: 1; width: 100%; }
    .container { width: 100%; }
    .section-pad { padding: 100px 0; }

    .section-eyebrow {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
      color: var(--purple-light); margin-bottom: 16px;
    }
    .section-eyebrow::before { content: '+'; font-size: 14px; font-weight: 900; }

    .section-title { font-size: clamp(32px, 4vw, 52px); font-weight: 800; margin-bottom: 14px; }
    .section-title .grad { background: var(--accent-grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .section-sub { font-size: 17px; color: var(--muted); max-width: 560px; margin-bottom: 60px; }

    /* ── HOW IT WORKS ── */
    .workflow-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; width: 100%;
    }

    .workflow-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 16px; padding: 28px 24px;
      transition: border-color .2s, transform .2s;
      position: relative; overflow: hidden;
      min-height: 280px;
    }
    .workflow-card:hover { border-color: rgba(124,58,237,.4); transform: translateY(-4px); }
    .workflow-card.active { border-color: var(--purple); }
    .workflow-card.active::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: var(--accent-grad);
    }

    .wf-num { font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: .1em; margin-bottom: 16px; }
    .wf-icon {
      width: 56px; height: 56px; border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      font-size: 26px; margin-bottom: 20px;
    }
    .wf-icon.purple { background: linear-gradient(135deg, #7c3aed, #a855f7); }
    .wf-icon.pink { background: linear-gradient(135deg, #ec4899, #f43f5e); }
    .wf-icon.blue { background: linear-gradient(135deg, #3b82f6, #6366f1); }
    .wf-icon.orange { background: linear-gradient(135deg, #f97316, #ef4444); }

    .wf-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 17px; margin-bottom: 10px; }
    .wf-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }

    /* ── FEATURES STRIP ── */
    .features-strip {
      display: grid; grid-template-columns: repeat(4, 1fr);
      border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
      margin-top: 60px;
      width: 100%;
    }

    .feat-item {
      padding: 28px 24px;
      border-right: 1px solid var(--border);
      position: relative;
    }
    .feat-item:last-child { border-right: none; }

    .feat-badge {
      position: absolute; top: 18px; right: 18px;
      font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px;
    }
    .feat-badge.instant { background: rgba(124,58,237,.15); color: var(--purple-light); }
    .feat-badge.auto { background: rgba(59,130,246,.15); color: var(--blue); }
    .feat-badge.transp { background: rgba(234,179,8,.12); color: #facc15; }
    .feat-badge.live { background: rgba(34,197,94,.12); color: var(--green); }

    .feat-icon { font-size: 22px; margin-bottom: 14px; }
    .feat-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; margin-bottom: 8px; }
    .feat-desc { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
    .feat-checks { list-style: none; display: flex; flex-direction: column; gap: 6px; }
    .feat-checks li { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
    .feat-checks li::before { content: '✓'; color: var(--purple-light); font-weight: 700; }

    /* ── PLATFORM BENEFITS ── */
    .platform-title { font-size: clamp(38px, 5vw, 64px); font-weight: 800; margin-bottom: 12px; }

    /* ── STATS ROW ── */
    .stats-row {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 0;
      border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
      margin-bottom: 80px;
      width: 100%;
    }
    .stat-box {
      padding: 32px 28px;
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
    }
    .stat-box:last-child { border-right: none; }
    .stat-box-icon { font-size: 22px; }
    .stat-box-num { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; }
    .stat-box-num.pink { color: var(--pink); }
    .stat-box-num.purple { color: var(--purple-light); }
    .stat-box-num.orange { color: var(--orange); }
    .stat-box-label { font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }

    /* ── BENTO GRID ── */
    .bento-eyebrow { color: var(--blue); font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 16px; }

    .bento-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 20px;
      width: 100%;
    }

    .bento-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 20px; padding: 36px;
      overflow: hidden; position: relative;
    }
    .bento-card:hover { border-color: rgba(124,58,237,.3); }

    .bento-icon { font-size: 24px; margin-bottom: 18px; }
    .bento-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px; margin-bottom: 12px; }
    .bento-desc { font-size: 15px; color: var(--muted); margin-bottom: 28px; line-height: 1.65; }

    /* Progress bar */
    .progress-block { margin-top: auto; }
    .progress-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 8px; }
    .progress-label span:last-child { color: var(--green); font-weight: 700; }
    .progress-bar { height: 6px; background: rgba(255,255,255,.08); border-radius: 3px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, var(--purple), var(--pink)); border-radius: 3px; width: 70%; }
    .progress-ticks { display: flex; justify-content: space-between; font-size: 10px; color: var(--muted); margin-top: 6px; }
    .progress-footer { font-size: 12px; color: var(--purple-light); margin-top: 16px; display: flex; align-items: center; gap: 6px; }
    .progress-footer::before { content: '⚡'; }

    /* Hygiene scores */
    .hygiene-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
    .hygiene-row { display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
    .hygiene-name { color: var(--text); }
    .hygiene-score { font-weight: 700; }
    .hygiene-score.a-plus { color: var(--green); }
    .hygiene-score.a-minus { color: #86efac; }
    .hygiene-score.b { color: #facc15; }
    .hygiene-footer { font-size: 11px; color: var(--green); margin-top: 16px; display: flex; align-items: center; gap: 6px; }
    .hygiene-footer::before { content: '🛡️'; }

    /* Voice card */
    .audit-item {
      background: rgba(255,255,255,.04); border: 1px solid var(--border);
      border-radius: 12px; padding: 14px 16px;
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 24px;
    }
    .audit-title { font-size: 14px; font-weight: 600; }
    .audit-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .audit-pts { font-size: 14px; font-weight: 700; color: var(--green); }

    /* Leaderboard */
    .lb-podium { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px; }
    .lb-item {
      background: rgba(255,255,255,.04); border: 1px solid var(--border);
      border-radius: 12px; padding: 18px 12px; text-align: center;
    }
    .lb-rank { font-size: 20px; margin-bottom: 8px; }
    .lb-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px; }
    .lb-rating { font-size: 12px; color: var(--muted); margin-top: 4px; }
    .lb-footer { font-size: 12px; color: var(--blue); margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 6px; }
    .lb-footer::before { content: '📊'; }

    /* Auth panel */
    .auth-card {
      background: var(--card);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px;
      padding: 40px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(20px);
    }
    .auth-title {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 8px;
      text-align: center;
    }
    .auth-sub {
      font-size: 14px;
      color: var(--muted);
      text-align: center;
      margin-bottom: 30px;
    }
    .auth-input-group {
      margin-bottom: 20px;
      position: relative;
    }
    .auth-input-group label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .auth-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .auth-icon {
      position: absolute;
      left: 14px;
      color: var(--muted);
    }
    .auth-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px 16px 12px 42px;
      color: var(--text);
      font-size: 14px;
      transition: all 0.2s;
    }
    .auth-input:focus {
      border-color: var(--purple-light);
      background: rgba(255, 255, 255, 0.04);
      outline: none;
    }
    .auth-btn {
      width: 100%;
      background: var(--accent-grad);
      color: white;
      border: none;
      padding: 14px;
      border-radius: 12px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 15px;
      cursor: pointer;
      margin-top: 10px;
      transition: transform 0.2s;
    }
    .auth-btn:hover {
      transform: translateY(-1px);
      opacity: 0.95;
    }
    .auth-toggle {
      text-align: center;
      margin-top: 24px;
      font-size: 13px;
      color: var(--muted);
    }
    .auth-toggle button {
      background: transparent;
      border: none;
      color: var(--purple-light);
      font-weight: 600;
      cursor: pointer;
      margin-left: 4px;
    }
    .auth-toggle button:hover {
      text-decoration: underline;
    }

    /* Leaderboard table styles */
    .table-container {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--card);
      margin-top: 30px;
    }
    .lead-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }
    .lead-table th {
      background: rgba(255,255,255,0.02);
      padding: 16px 24px;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      color: var(--muted);
      border-bottom: 1px solid var(--border);
    }
    .lead-table td {
      padding: 18px 24px;
      border-bottom: 1px solid var(--border);
      color: var(--text);
    }
    .lead-table tr:last-child td {
      border-bottom: none;
    }
    .lead-table tr:hover td {
      background: rgba(255,255,255,0.01);
    }
    .rank-cell {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 16px;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
    }
    .status-badge.stable {
      background: rgba(34,197,94,0.15);
      color: var(--green);
      border: 1px solid rgba(34,197,94,0.3);
    }
    .status-badge.alert {
      background: rgba(239,68,68,0.15);
      color: #f87171;
      border: 1px solid rgba(239,68,68,0.3);
    }
    .status-badge.check {
      background: rgba(249,115,22,0.15);
      color: var(--orange);
      border: 1px solid rgba(249,115,22,0.3);
    }

    /* ── FOOTER ── */
    footer {
      border-top: 1px solid var(--border);
      padding: 64px 0 36px;
      width: 100%;
    }

    .footer-grid {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px; margin-bottom: 48px;
    }

    .footer-brand p { font-size: 14px; color: var(--muted); max-width: 280px; margin-top: 14px; line-height: 1.7; }

    .footer-col h5 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 18px; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul button { 
      background: transparent;
      border: none;
      text-align: left;
      font-size: 14px; 
      color: var(--muted); 
      cursor: pointer;
      transition: color .2s; 
    }
    .footer-col ul button:hover { color: var(--text); }

    .footer-social { display: flex; gap: 12px; margin-top: 4px; }
    .social-link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color .2s; }
    .social-link:hover { color: var(--text); }

    .footer-bottom {
      border-top: 1px solid var(--border); padding-top: 28px;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 13px; color: var(--muted);
      width: 100%;
    }

    .footer-bottom a { color: var(--muted); text-decoration: none; }
    .footer-bottom a:hover { color: var(--text); }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      nav { padding: 14px 24px; }
      .nav-links { display: none; }
      .hero { grid-template-columns: 1fr; padding: 120px 24px 60px; gap: 40px; }
      .workflow-grid { grid-template-columns: 1fr 1fr; }
      .features-strip { grid-template-columns: 1fr 1fr; }
      .bento-grid { grid-template-columns: 1fr; }
      .stats-row { grid-template-columns: 1fr 1fr; }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .container { padding: 0 24px; }
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp .7s ease both; }
    .fade-up-1 { animation-delay: .1s; }
    .fade-up-2 { animation-delay: .2s; }
    .fade-up-3 { animation-delay: .3s; }
    .fade-up-4 { animation-delay: .4s; }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(236,72,153,.3); }
      50% { box-shadow: 0 0 40px rgba(236,72,153,.6); }
    }
    .pulse { animation: pulse-glow 2.5s ease-in-out infinite; }

    /* divider */
    .section-divider { height: 1px; background: var(--border); margin: 0; }

    /* Mobile Nav custom layout */
    .mobile-hamburger {
      display: none;
      background: transparent;
      border: none;
      color: var(--text);
      cursor: pointer;
    }
    @media (max-width: 900px) {
      .mobile-hamburger {
        display: block;
      }
    }
    .mobile-menu-drawer {
      position: fixed;
      top: 73px; left: 0; right: 0;
      background: #08080f;
      border-bottom: 1px solid var(--border);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      z-index: 99;
    }
    .mobile-menu-drawer button {
      background: transparent;
      border: none;
      text-align: left;
      color: var(--muted);
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
    }
    .mobile-menu-drawer button:hover {
      color: var(--text);
    }
  `}}),(0,d.jsxs)(`nav`,{className:e?`nav-scrolled`:``,children:[(0,d.jsxs)(`button`,{onClick:()=>x(`home`),className:`logo`,style:{background:`transparent`,border:`none`,cursor:`pointer`},children:[(0,d.jsx)(`div`,{className:`logo-icon`,children:`⚡`}),`FoodPulse`]}),(0,d.jsxs)(`ul`,{className:`nav-links`,children:[(0,d.jsx)(`li`,{children:(0,d.jsx)(`button`,{onClick:()=>x(`how-it-works`),className:p===`how-it-works`?`active`:``,children:`How It Works`})}),(0,d.jsx)(`li`,{children:(0,d.jsx)(`button`,{onClick:()=>x(`features`),className:p===`features`?`active`:``,children:`Features`})}),(0,d.jsx)(`li`,{children:(0,d.jsx)(`button`,{onClick:()=>x(`leaderboard`),className:p===`leaderboard`?`active`:``,children:`Leaderboard`})})]}),(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`12px`},children:[(0,d.jsx)(`button`,{onClick:()=>x(`login`),className:`nav-cta hidden md:inline-block`,children:`Explore Marketplace →`}),(0,d.jsx)(`button`,{className:`mobile-hamburger`,onClick:()=>f(!n),"aria-label":`Toggle Menu`,children:n?(0,d.jsx)(l,{size:24}):(0,d.jsx)(s,{size:24})})]})]}),(0,d.jsx)(i,{children:n&&(0,d.jsxs)(r.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},className:`mobile-menu-drawer`,children:[(0,d.jsx)(`button`,{onClick:()=>x(`how-it-works`),children:`How It Works`}),(0,d.jsx)(`button`,{onClick:()=>x(`features`),children:`Features`}),(0,d.jsx)(`button`,{onClick:()=>x(`leaderboard`),children:`Leaderboard`}),(0,d.jsx)(`button`,{onClick:()=>x(`login`),className:`nav-cta text-center mt-2`,children:`Explore Marketplace →`})]})}),(0,d.jsxs)(`div`,{className:`w-full max-w-7xl xl:max-w-[90vw] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center`,children:[p===`home`&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(`section`,{className:`hero`,children:[(0,d.jsxs)(`div`,{className:`hero-content`,children:[(0,d.jsx)(`p`,{className:`hero-eyebrow fade-up`,children:`Next-Gen Student Dining`}),(0,d.jsxs)(`h1`,{className:`fade-up fade-up-1`,children:[`FoodPulse – Smart`,(0,d.jsx)(`br`,{}),(0,d.jsx)(`span`,{className:`grad`,children:`Campus Food`}),(0,d.jsx)(`br`,{}),(0,d.jsx)(`span`,{className:`blue-grad`,children:`Ecosystem`})]}),(0,d.jsx)(`p`,{className:`hero-desc fade-up fade-up-2`,children:`Redefining campus meals with real-time AI food verification, seamless mobile pre-ordering, queue analytics, and a reward system students love.`}),(0,d.jsxs)(`div`,{className:`hero-actions fade-up fade-up-3`,children:[(0,d.jsx)(`button`,{onClick:()=>x(`login`),className:`btn-primary`,children:`Explore Marketplace →`}),(0,d.jsx)(`button`,{onClick:()=>x(`signup`),className:`btn-ghost`,children:`Report Food Issue`})]}),(0,d.jsxs)(`div`,{className:`hero-stats fade-up fade-up-4`,children:[(0,d.jsxs)(`div`,{className:`stat-item`,children:[(0,d.jsx)(`span`,{className:`stat-num`,children:`5k+`}),(0,d.jsx)(`span`,{className:`stat-label`,children:`Active Students`})]}),(0,d.jsxs)(`div`,{className:`stat-item`,children:[(0,d.jsx)(`span`,{className:`stat-num pink`,children:`99.8%`}),(0,d.jsx)(`span`,{className:`stat-label`,children:`AI Scan Accuracy`})]}),(0,d.jsxs)(`div`,{className:`stat-item`,children:[(0,d.jsx)(`span`,{className:`stat-num orange`,children:`20k+`}),(0,d.jsx)(`span`,{className:`stat-label`,children:`Points Redeemed`})]})]})]}),(0,d.jsx)(`div`,{className:`hero-visual fade-up fade-up-2`,children:(0,d.jsxs)(`div`,{className:`dashboard-card`,children:[(0,d.jsxs)(`div`,{className:`dc-header`,children:[(0,d.jsxs)(`div`,{className:`dc-dots`,children:[(0,d.jsx)(`span`,{className:`dc-dot r`}),(0,d.jsx)(`span`,{className:`dc-dot y`}),(0,d.jsx)(`span`,{className:`dc-dot g`})]}),(0,d.jsx)(`span`,{style:{marginLeft:`8px`},children:`foodpulse.lpu.in/dashboard`})]}),(0,d.jsxs)(`div`,{className:`dc-body`,children:[(0,d.jsxs)(`div`,{className:`queue-section`,children:[(0,d.jsxs)(`div`,{className:`queue-title`,children:[(0,d.jsx)(`span`,{children:`MESS 1 QUEUE PREDICTION`}),(0,d.jsx)(`span`,{style:{color:`var(--muted)`,fontSize:`11px`},children:`12:30`}),(0,d.jsx)(`span`,{className:`badge-optimal`,children:`Optimal`})]}),(0,d.jsxs)(`div`,{className:`bar-chart`,children:[(0,d.jsx)(`div`,{className:`bar`,style:{height:`40%`}}),(0,d.jsx)(`div`,{className:`bar`,style:{height:`55%`}}),(0,d.jsx)(`div`,{className:`bar`,style:{height:`65%`}}),(0,d.jsx)(`div`,{className:`bar`,style:{height:`75%`}}),(0,d.jsx)(`div`,{className:`bar peak`,style:{height:`100%`}}),(0,d.jsx)(`div`,{className:`bar`,style:{height:`80%`}}),(0,d.jsx)(`div`,{className:`bar`,style:{height:`60%`}}),(0,d.jsx)(`div`,{className:`bar`,style:{height:`48%`}}),(0,d.jsx)(`div`,{className:`bar`,style:{height:`38%`}})]}),(0,d.jsxs)(`div`,{className:`chart-labels`,children:[(0,d.jsx)(`span`,{children:`11:00 AM`}),(0,d.jsx)(`span`,{style:{color:`var(--pink)`},children:`Peak (12:30)`}),(0,d.jsx)(`span`,{children:`2:00 PM`})]})]}),(0,d.jsxs)(`div`,{className:`hud-card`,children:[(0,d.jsxs)(`div`,{className:`hud-title`,children:[(0,d.jsx)(`span`,{children:`Verification HUD`}),(0,d.jsx)(`span`,{className:`hud-live`,children:`AI Live`})]}),(0,d.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`},children:[(0,d.jsx)(`span`,{className:`alert-pill`,children:`Roti: Undercooked`}),(0,d.jsx)(`span`,{style:{fontSize:`11px`,color:`var(--muted)`},children:`Detected by AI scan`})]})]}),(0,d.jsxs)(`div`,{className:`quality-alert pulse`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`div`,{className:`qa-label`,children:`Quality Alert`}),(0,d.jsx)(`div`,{className:`qa-sub`,children:`BH2 Mess · Scan Verified`})]}),(0,d.jsx)(`div`,{className:`qa-pts`,children:`+150 Points`})]})]})]})})]}),(0,d.jsx)(`div`,{className:`section-divider`}),(0,d.jsx)(`section`,{className:`section-pad`,id:`how-it-works`,children:(0,d.jsxs)(`div`,{className:`container`,children:[(0,d.jsx)(`p`,{className:`section-eyebrow`,children:`Workflow`}),(0,d.jsxs)(`h2`,{className:`section-title`,children:[`How FoodPulse `,(0,d.jsx)(`span`,{className:`grad`,children:`Works`})]}),(0,d.jsx)(`p`,{className:`section-sub`,children:`Our ecosystem is engineered to keep dining high-quality and order checkout frictionless.`}),(0,d.jsxs)(`div`,{className:`workflow-grid`,children:[(0,d.jsxs)(`div`,{className:`workflow-card`,children:[(0,d.jsx)(`div`,{className:`wf-num`,children:`01`}),(0,d.jsx)(`div`,{className:`wf-icon purple`,children:`🛒`}),(0,d.jsx)(`div`,{className:`wf-title`,children:`Browse Marketplace`}),(0,d.jsx)(`div`,{className:`wf-desc`,children:`Access the campus digital food court, check menus, and order your favorite meals.`})]}),(0,d.jsxs)(`div`,{className:`workflow-card active`,children:[(0,d.jsx)(`div`,{className:`wf-num`,children:`02`}),(0,d.jsx)(`div`,{className:`wf-icon pink`,children:`🍽️`}),(0,d.jsx)(`div`,{className:`wf-title`,children:`Order or Report`}),(0,d.jsx)(`div`,{className:`wf-desc`,children:`Enjoy quick queue-free meals or report poor-quality food items instantly.`})]}),(0,d.jsxs)(`div`,{className:`workflow-card`,children:[(0,d.jsx)(`div`,{className:`wf-num`,children:`03`}),(0,d.jsx)(`div`,{className:`wf-icon blue`,children:`🛡️`}),(0,d.jsx)(`div`,{className:`wf-title`,children:`AI Verification`}),(0,d.jsx)(`div`,{className:`wf-desc`,children:`Computer vision scans details to verify complaints automatically in seconds.`})]}),(0,d.jsxs)(`div`,{className:`workflow-card`,children:[(0,d.jsx)(`div`,{className:`wf-num`,children:`04`}),(0,d.jsx)(`div`,{className:`wf-icon orange`,children:`🏅`}),(0,d.jsx)(`div`,{className:`wf-title`,children:`Earn Rewards`}),(0,d.jsx)(`div`,{className:`wf-desc`,children:`Receive instant compensation points and unlock premium reward badges.`})]})]})]})}),(0,d.jsx)(`div`,{className:`section-divider`}),(0,d.jsx)(`section`,{className:`section-pad`,id:`features`,children:(0,d.jsxs)(`div`,{className:`container`,children:[(0,d.jsx)(`p`,{className:`section-eyebrow`,children:`Platform Benefits`}),(0,d.jsx)(`h2`,{className:`platform-title`,children:`Engineered for LPU Campus`}),(0,d.jsx)(`p`,{className:`section-sub`,style:{marginBottom:`40px`},children:`Discover custom-designed tools designed to address common dining and kitchen issues.`}),(0,d.jsxs)(`div`,{className:`features-strip`,children:[(0,d.jsxs)(`div`,{className:`feat-item`,children:[(0,d.jsx)(`span`,{className:`feat-badge instant`,children:`Instant`}),(0,d.jsx)(`div`,{className:`feat-icon`,children:`⏱️`}),(0,d.jsx)(`div`,{className:`feat-title`,children:`Faster Ordering`}),(0,d.jsx)(`div`,{className:`feat-desc`,children:`Skip queues by ordering menu items ahead of arrival.`}),(0,d.jsxs)(`ul`,{className:`feat-checks`,children:[(0,d.jsx)(`li`,{children:`30% Less Waiting Time`}),(0,d.jsx)(`li`,{children:`Real-time Queue Updates`})]})]}),(0,d.jsxs)(`div`,{className:`feat-item`,children:[(0,d.jsx)(`span`,{className:`feat-badge auto`,children:`Automated`}),(0,d.jsx)(`div`,{className:`feat-icon`,children:`🛡️`}),(0,d.jsx)(`div`,{className:`feat-title`,children:`AI Verification`}),(0,d.jsx)(`div`,{className:`feat-desc`,children:`Computer vision verifies food texture and ingredients.`}),(0,d.jsxs)(`ul`,{className:`feat-checks`,children:[(0,d.jsx)(`li`,{children:`99.5% Accuracy Rate`}),(0,d.jsx)(`li`,{children:`Instant Issue Detection`})]})]}),(0,d.jsxs)(`div`,{className:`feat-item`,children:[(0,d.jsx)(`span`,{className:`feat-badge transp`,children:`Transparent`}),(0,d.jsx)(`div`,{className:`feat-icon`,children:`⚠️`}),(0,d.jsx)(`div`,{className:`feat-title`,children:`Complaint Tracking`}),(0,d.jsx)(`div`,{className:`feat-desc`,children:`Track mess issues live from detection to resolution.`}),(0,d.jsxs)(`ul`,{className:`feat-checks`,children:[(0,d.jsx)(`li`,{children:`Live Status Updates`}),(0,d.jsx)(`li`,{children:`Full Transparency`})]})]}),(0,d.jsxs)(`div`,{className:`feat-item`,children:[(0,d.jsx)(`span`,{className:`feat-badge live`,children:`Live`}),(0,d.jsx)(`div`,{className:`feat-icon`,children:`📊`}),(0,d.jsx)(`div`,{className:`feat-title`,children:`Queue Reduction`}),(0,d.jsx)(`div`,{className:`feat-desc`,children:`Optimize preparation times with predictive insights.`}),(0,d.jsxs)(`ul`,{className:`feat-checks`,children:[(0,d.jsx)(`li`,{children:`Predictive Analytics`}),(0,d.jsx)(`li`,{children:`Smart Load Balancing`})]})]})]})]})}),(0,d.jsx)(`div`,{className:`section-divider`}),(0,d.jsx)(`section`,{children:(0,d.jsx)(`div`,{className:`container`,style:{paddingTop:`60px`,paddingBottom:`60px`},children:(0,d.jsxs)(`div`,{className:`stats-row`,children:[(0,d.jsxs)(`div`,{className:`stat-box`,children:[(0,d.jsx)(`span`,{className:`stat-box-icon`,children:`👥`}),(0,d.jsx)(`span`,{className:`stat-box-num`,children:`5K+`}),(0,d.jsx)(`span`,{className:`stat-box-label`,children:`Active Students`})]}),(0,d.jsxs)(`div`,{className:`stat-box`,children:[(0,d.jsx)(`span`,{className:`stat-box-icon`,children:`🎯`}),(0,d.jsx)(`span`,{className:`stat-box-num pink`,children:`99.8%`}),(0,d.jsx)(`span`,{className:`stat-box-label`,children:`AI Scan Accuracy`})]}),(0,d.jsxs)(`div`,{className:`stat-box`,children:[(0,d.jsx)(`span`,{className:`stat-box-icon`,children:`🎁`}),(0,d.jsx)(`span`,{className:`stat-box-num orange`,children:`20K+`}),(0,d.jsx)(`span`,{className:`stat-box-label`,children:`Points Redeemed`})]}),(0,d.jsxs)(`div`,{className:`stat-box`,children:[(0,d.jsx)(`span`,{className:`stat-box-icon`,children:`⚙️`}),(0,d.jsx)(`span`,{className:`stat-box-num purple`,children:`8.5 hrs`}),(0,d.jsx)(`span`,{className:`stat-box-label`,children:`Avg. Time Saved / Week`})]})]})})}),(0,d.jsx)(`div`,{className:`section-divider`}),(0,d.jsx)(`section`,{className:`section-pad`,id:`students`,children:(0,d.jsxs)(`div`,{className:`container`,children:[(0,d.jsx)(`p`,{className:`bento-eyebrow`,children:`Bento Grid`}),(0,d.jsxs)(`h2`,{className:`section-title`,children:[`How FoodPulse`,(0,d.jsx)(`br`,{}),`Helps `,(0,d.jsx)(`span`,{className:`grad`,children:`Students`})]}),(0,d.jsx)(`p`,{className:`section-sub`,children:`Simplifying student dining while building mess administration transparency.`}),(0,d.jsxs)(`div`,{className:`bento-grid`,children:[(0,d.jsxs)(`div`,{className:`bento-card`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`⏰`}),(0,d.jsx)(`div`,{className:`bento-title`,children:`Saves Time & Reduces Waiting`}),(0,d.jsx)(`div`,{className:`bento-desc`,children:`Tired of waiting 30 minutes for lunch? Pre-order on the marketplace, monitor the live queue prediction index, and grab your plate the moment it is ready.`}),(0,d.jsxs)(`div`,{className:`progress-block`,children:[(0,d.jsxs)(`div`,{className:`progress-label`,children:[(0,d.jsx)(`span`,{children:`Checkout Wait-Time Progress`}),(0,d.jsx)(`span`,{children:`9.2 min saved`})]}),(0,d.jsx)(`div`,{className:`progress-bar`,children:(0,d.jsx)(`div`,{className:`progress-fill`})}),(0,d.jsxs)(`div`,{className:`progress-ticks`,children:[(0,d.jsx)(`span`,{children:`Traditional: 25 mins waiting`}),(0,d.jsx)(`span`,{children:`FoodPulse Fast-Track: 4.5 mins`})]}),(0,d.jsx)(`div`,{className:`progress-footer`,children:`8.5 Hours Saved Average / Student`})]})]}),(0,d.jsxs)(`div`,{className:`bento-card`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`🛡️`}),(0,d.jsx)(`div`,{className:`bento-title`,children:`Mess Hygiene Scores`}),(0,d.jsx)(`div`,{className:`bento-desc`,children:`Real-time quality audits flag messes with active issues, letting you make healthy choices on where to dine.`}),(0,d.jsxs)(`div`,{className:`hygiene-list`,children:[(0,d.jsxs)(`div`,{className:`hygiene-row`,children:[(0,d.jsx)(`span`,{className:`hygiene-name`,children:`Central Mess`}),(0,d.jsx)(`span`,{className:`hygiene-score a-plus`,children:`A+ (99.8%)`})]}),(0,d.jsxs)(`div`,{className:`hygiene-row`,children:[(0,d.jsx)(`span`,{className:`hygiene-name`,children:`BH1 Dining`}),(0,d.jsx)(`span`,{className:`hygiene-score a-minus`,children:`A- (93.1%)`})]}),(0,d.jsxs)(`div`,{className:`hygiene-row`,children:[(0,d.jsx)(`span`,{className:`hygiene-name`,children:`BH2 Mess Cafeteria`}),(0,d.jsx)(`span`,{className:`hygiene-score b`,children:`B (82.5%)`})]})]}),(0,d.jsx)(`div`,{className:`hygiene-footer`,children:`Safety Verified`})]}),(0,d.jsxs)(`div`,{className:`bento-card`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`⚠️`}),(0,d.jsx)(`div`,{className:`bento-title`,children:`Gives Students a Voice`}),(0,d.jsx)(`div`,{className:`bento-desc`,children:`No more ignored feedback letters. Submit visual proof and let the automated computer vision verification hold kitchen operators accountable.`}),(0,d.jsxs)(`div`,{className:`audit-item`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`div`,{className:`audit-title`,children:`Undercooked Meat Audit`}),(0,d.jsx)(`div`,{className:`audit-sub`,children:`Scan Verified`})]}),(0,d.jsx)(`div`,{className:`audit-pts`,children:`+150 pts`})]})]}),(0,d.jsxs)(`div`,{className:`bento-card`,id:`leaderboard`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`📈`}),(0,d.jsx)(`div`,{className:`bento-title`,children:`Audited Mess Performance Leaderboard`}),(0,d.jsx)(`div`,{className:`bento-desc`,children:`Stall performance ratings, live queue speeds, and resolved complaints data are broadcast directly to the student leaderboard.`}),(0,d.jsxs)(`div`,{className:`lb-podium`,children:[(0,d.jsxs)(`div`,{className:`lb-item`,children:[(0,d.jsx)(`div`,{className:`lb-rank`,children:`🥇`}),(0,d.jsx)(`div`,{className:`lb-name`,children:`#1 Central Stall`}),(0,d.jsx)(`div`,{className:`lb-rating`,children:`4.95 ⭐`})]}),(0,d.jsxs)(`div`,{className:`lb-item`,children:[(0,d.jsx)(`div`,{className:`lb-rank`,children:`🥈`}),(0,d.jsx)(`div`,{className:`lb-name`,children:`#2 BH2 Cafe`}),(0,d.jsx)(`div`,{className:`lb-rating`,children:`4.88 ⭐`})]}),(0,d.jsxs)(`div`,{className:`lb-item`,children:[(0,d.jsx)(`div`,{className:`lb-rank`,children:`🥉`}),(0,d.jsx)(`div`,{className:`lb-name`,children:`#3 Central Cafe`}),(0,d.jsx)(`div`,{className:`lb-rating`,children:`4.79 ⭐`})]})]}),(0,d.jsx)(`div`,{className:`lb-footer`,children:`Full Campus Food Quality Statistics Available`})]})]})]})})]}),p===`login`&&(0,d.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,width:`100%`,padding:`100px 0`},children:(0,d.jsxs)(`div`,{className:`auth-card`,children:[(0,d.jsx)(`div`,{className:`absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none`}),(0,d.jsx)(`h2`,{className:`auth-title`,children:`Welcome Back`}),(0,d.jsx)(`p`,{className:`auth-sub`,children:`Log in to manage your FoodPulse dashboard and wallet points`}),(0,d.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),alert(`Mock Authentication Successful!`),x(`home`)},children:[(0,d.jsxs)(`div`,{className:`auth-input-group`,children:[(0,d.jsx)(`label`,{children:`Student Email Address`}),(0,d.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,d.jsx)(o,{size:16,className:`auth-icon`}),(0,d.jsx)(`input`,{type:`email`,required:!0,placeholder:`e.g. student@lpu.in`,className:`auth-input`,value:h,onChange:e=>g(e.target.value)})]})]}),(0,d.jsxs)(`div`,{className:`auth-input-group`,children:[(0,d.jsx)(`label`,{children:`Account Password`}),(0,d.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,d.jsx)(a,{size:16,className:`auth-icon`}),(0,d.jsx)(`input`,{type:`password`,required:!0,placeholder:`••••••••••••`,className:`auth-input`,value:_,onChange:e=>v(e.target.value)})]})]}),(0,d.jsx)(`button`,{type:`submit`,className:`auth-btn`,children:`Log In`})]}),(0,d.jsxs)(`p`,{className:`auth-toggle font-semibold`,children:[`Don't have an account?`,(0,d.jsx)(`button`,{onClick:()=>x(`signup`),children:`Sign Up`})]})]})}),p===`signup`&&(0,d.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,width:`100%`,padding:`100px 0`},children:(0,d.jsxs)(`div`,{className:`auth-card`,children:[(0,d.jsx)(`div`,{className:`absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none`}),(0,d.jsx)(`h2`,{className:`auth-title`,children:`Create Account`}),(0,d.jsx)(`p`,{className:`auth-sub`,children:`Join FoodPulse to browse stalls and earn verified points`}),(0,d.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),alert(`Registration Mock Successful!`),x(`login`)},children:[(0,d.jsxs)(`div`,{className:`auth-input-group`,children:[(0,d.jsx)(`label`,{children:`LPU Student ID`}),(0,d.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,d.jsx)(c,{size:16,className:`auth-icon`}),(0,d.jsx)(`input`,{type:`text`,required:!0,placeholder:`e.g. 12015382`,className:`auth-input`,value:y,onChange:e=>b(e.target.value)})]})]}),(0,d.jsxs)(`div`,{className:`auth-input-group`,children:[(0,d.jsx)(`label`,{children:`Student Email Address`}),(0,d.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,d.jsx)(o,{size:16,className:`auth-icon`}),(0,d.jsx)(`input`,{type:`email`,required:!0,placeholder:`e.g. student@lpu.in`,className:`auth-input`,value:h,onChange:e=>g(e.target.value)})]})]}),(0,d.jsxs)(`div`,{className:`auth-input-group`,children:[(0,d.jsx)(`label`,{children:`Create Password`}),(0,d.jsxs)(`div`,{className:`auth-input-wrapper`,children:[(0,d.jsx)(a,{size:16,className:`auth-icon`}),(0,d.jsx)(`input`,{type:`password`,required:!0,placeholder:`••••••••••••`,className:`auth-input`,value:_,onChange:e=>v(e.target.value)})]})]}),(0,d.jsx)(`button`,{type:`submit`,className:`auth-btn`,children:`Sign Up`})]}),(0,d.jsxs)(`p`,{className:`auth-toggle font-semibold`,children:[`Already have an account?`,(0,d.jsx)(`button`,{onClick:()=>x(`login`),children:`Log In`})]})]})}),p===`how-it-works`&&(0,d.jsxs)(`div`,{style:{width:`100%`,padding:`100px 0`},children:[(0,d.jsx)(`p`,{className:`section-eyebrow`,children:`Documentation`}),(0,d.jsxs)(`h2`,{className:`section-title`,children:[`How FoodPulse `,(0,d.jsx)(`span`,{className:`grad`,children:`Works`})]}),(0,d.jsx)(`p`,{className:`section-sub`,children:`A comprehensive breakdown of LPU's automated student dining and crowd auditing platform.`}),(0,d.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`30px`,width:`100%`,marginTop:`20px`},className:`bento-grid`,children:[(0,d.jsxs)(`div`,{className:`bento-card`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`🛒`}),(0,d.jsx)(`h3`,{className:`bento-title`,children:`1. Marketplace Discovery`}),(0,d.jsx)(`p`,{className:`bento-desc`,style:{marginBottom:0},children:`Students access LPU's decentralized digital food marketplace to view live menus, queue predictions, and place pre-orders. Skip traditional dining hall lines by purchasing tokens directly using dining reward points or wallet balances.`})]}),(0,d.jsxs)(`div`,{className:`bento-card`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`🤖`}),(0,d.jsx)(`h3`,{className:`bento-title`,children:`2. AI Kitchen Verification`}),(0,d.jsx)(`p`,{className:`bento-desc`,style:{marginBottom:0},children:`Every meal served can be photographed and uploaded for instantaneous verification. FoodPulse's proprietary computer vision models verify portion control, structural parameters, food color profiles, and detect preparation anomalies like undercooked components.`})]}),(0,d.jsxs)(`div`,{className:`bento-card`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`⚠️`}),(0,d.jsx)(`h3`,{className:`bento-title`,children:`3. Real-Time Crowd Auditing`}),(0,d.jsx)(`p`,{className:`bento-desc`,style:{marginBottom:0},children:`Any food preparation discrepancy automatically creates an active audit ticket on the student dashboard. Neighboring students act as decentralized auditors, reviewing photos to confirm or reject anomalies, enforcing dining hall transparency and hygiene.`})]}),(0,d.jsxs)(`div`,{className:`bento-card`,children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`🪙`}),(0,d.jsx)(`h3`,{className:`bento-title`,children:`4. Rewards Compensation`}),(0,d.jsx)(`p`,{className:`bento-desc`,style:{marginBottom:0},children:`Once the crowd-audited quality ticket is flagged and verified by the system, points are instantly refunded to the student's Smart Wallet. Users redeem these verified points at LPU campus stalls, ensuring dining hall operator accountability.`})]})]})]}),p===`features`&&(0,d.jsxs)(`div`,{style:{width:`100%`,padding:`100px 0`},children:[(0,d.jsx)(`p`,{className:`section-eyebrow`,children:`Capabilities Matrix`}),(0,d.jsxs)(`h2`,{className:`section-title`,children:[`Platform `,(0,d.jsx)(`span`,{className:`grad`,children:`Features`})]}),(0,d.jsx)(`p`,{className:`section-sub`,children:`Explore LPU FoodPulse's advanced AI-powered dining optimization technologies.`}),(0,d.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, 1fr)`,gap:`24px`,width:`100%`},className:`workflow-grid`,children:[(0,d.jsxs)(`div`,{className:`bento-card`,style:{gridColumn:`span 1`},children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`⏱️`}),(0,d.jsx)(`h3`,{className:`bento-title`,children:`Queue-Free Pipeline`}),(0,d.jsx)(`p`,{className:`bento-desc`,style:{marginBottom:0},children:`Our smart routing algorithm allows students to order food items remotely and pick them up instantly upon arrival. Real-time updates track preparation status directly on the web app.`})]}),(0,d.jsxs)(`div`,{className:`bento-card`,style:{gridColumn:`span 1`},children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`📷`}),(0,d.jsx)(`h3`,{className:`bento-title`,children:`AI Texture Tracking`}),(0,d.jsx)(`p`,{className:`bento-desc`,style:{marginBottom:0},children:`Harnessing state-of-the-art computer vision to analyze plate contents. Automatically flags hygiene indices, undercooked roti, cold gravy, or incorrect portion sizing before the first bite.`})]}),(0,d.jsxs)(`div`,{className:`bento-card`,style:{gridColumn:`span 1`},children:[(0,d.jsx)(`div`,{className:`bento-icon`,children:`📊`}),(0,d.jsx)(`h3`,{className:`bento-title`,children:`Predictive Load Balancing`}),(0,d.jsx)(`p`,{className:`bento-desc`,style:{marginBottom:0},children:`Minimizes peak dining hall congestion by tracking wait-time curves. Directs students to under-utilized messes, improving campus load distribution and saving hours of waiting time.`})]})]})]}),p===`leaderboard`&&(0,d.jsxs)(`div`,{style:{width:`100%`,padding:`100px 0`},children:[(0,d.jsx)(`p`,{className:`section-eyebrow`,children:`Leaderboard`}),(0,d.jsxs)(`h2`,{className:`section-title`,children:[`Audited Mess `,(0,d.jsx)(`span`,{className:`grad`,children:`Rankings`})]}),(0,d.jsx)(`p`,{className:`section-sub`,children:`Live student-curated food quality ratings, AI-verified audits, and queue metrics across LPU dining halls.`}),(0,d.jsx)(`div`,{className:`table-container`,children:(0,d.jsxs)(`table`,{className:`lead-table`,children:[(0,d.jsx)(`thead`,{children:(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`th`,{children:`Rank`}),(0,d.jsx)(`th`,{children:`Dining Venue / Stall`}),(0,d.jsx)(`th`,{children:`Hygiene Rating`}),(0,d.jsx)(`th`,{children:`Avg Waiting Time`}),(0,d.jsx)(`th`,{children:`Anomalies Verified`}),(0,d.jsx)(`th`,{children:`Platform Status`})]})}),(0,d.jsxs)(`tbody`,{children:[(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{className:`rank-cell`,children:`🥇 #1`}),(0,d.jsx)(`td`,{className:`font-semibold`,children:`Central Mess Hall`}),(0,d.jsx)(`td`,{style:{color:`var(--green)`,fontWeight:700},children:`A+ (99.8%)`}),(0,d.jsx)(`td`,{children:`4.2 minutes`}),(0,d.jsx)(`td`,{children:`12 complaints`}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`status-badge stable`,children:`Stable`})})]}),(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{className:`rank-cell`,children:`🥈 #2`}),(0,d.jsx)(`td`,{className:`font-semibold`,children:`BH2 Cafe & Stall`}),(0,d.jsx)(`td`,{style:{color:`#86efac`,fontWeight:700},children:`A- (93.1%)`}),(0,d.jsx)(`td`,{children:`6.5 minutes`}),(0,d.jsx)(`td`,{children:`19 complaints`}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`status-badge check`,children:`Check Quality`})})]}),(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{className:`rank-cell`,children:`🥉 #3`}),(0,d.jsx)(`td`,{className:`font-semibold`,children:`Block 34 Cafeteria`}),(0,d.jsx)(`td`,{style:{color:`#facc15`,fontWeight:700},children:`B+ (88.4%)`}),(0,d.jsx)(`td`,{children:`8.0 minutes`}),(0,d.jsx)(`td`,{children:`34 complaints`}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`status-badge alert`,children:`Alert Active`})})]}),(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{className:`rank-cell`,children:`#4`}),(0,d.jsx)(`td`,{className:`font-semibold`,children:`BH1 Student Dining`}),(0,d.jsx)(`td`,{style:{color:`#86efac`,fontWeight:700},children:`A (91.5%)`}),(0,d.jsx)(`td`,{children:`5.0 minutes`}),(0,d.jsx)(`td`,{children:`8 complaints`}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`status-badge stable`,children:`Stable`})})]}),(0,d.jsxs)(`tr`,{children:[(0,d.jsx)(`td`,{className:`rank-cell`,children:`#5`}),(0,d.jsx)(`td`,{className:`font-semibold`,children:`Central Cafe Annex`}),(0,d.jsx)(`td`,{style:{color:`#facc15`,fontWeight:700},children:`B (82.5%)`}),(0,d.jsx)(`td`,{children:`9.5 minutes`}),(0,d.jsx)(`td`,{children:`45 complaints`}),(0,d.jsx)(`td`,{children:(0,d.jsx)(`span`,{className:`status-badge check`,children:`Quality Notice`})})]})]})]})})]})]}),(0,d.jsx)(`div`,{className:`section-divider`}),(0,d.jsx)(`footer`,{children:(0,d.jsxs)(`div`,{className:`w-full max-w-7xl xl:max-w-[90vw] mx-auto px-6 md:px-12 lg:px-16`,children:[(0,d.jsxs)(`div`,{className:`footer-grid`,children:[(0,d.jsxs)(`div`,{className:`footer-brand`,children:[(0,d.jsxs)(`button`,{onClick:()=>x(`home`),className:`logo`,style:{background:`transparent`,border:`none`,cursor:`pointer`},children:[(0,d.jsx)(`div`,{className:`logo-icon`,children:`⚡`}),`FoodPulse`]}),(0,d.jsx)(`p`,{children:`Building a smarter, healthier campus food ecosystem through technology and transparent crowd auditing.`}),(0,d.jsx)(`p`,{style:{fontSize:`13px`,color:`var(--muted)`,marginTop:`12px`},children:`© 2026 FoodPulse. Redesigned with premium SaaS aesthetics. All rights reserved.`})]}),(0,d.jsxs)(`div`,{className:`footer-col`,children:[(0,d.jsx)(`h5`,{children:`Quick Links`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:(0,d.jsx)(`button`,{onClick:()=>x(`login`),children:`Stall Marketplace`})}),(0,d.jsx)(`li`,{children:(0,d.jsx)(`button`,{onClick:()=>x(`signup`),children:`Report Issue`})}),(0,d.jsx)(`li`,{children:(0,d.jsx)(`button`,{onClick:()=>x(`how-it-works`),children:`How It Works`})})]})]}),(0,d.jsxs)(`div`,{className:`footer-col`,children:[(0,d.jsx)(`h5`,{children:`Support`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsx)(`li`,{children:(0,d.jsx)(`a`,{href:`#`,children:`Contact Us`})}),(0,d.jsx)(`li`,{children:(0,d.jsx)(`a`,{href:`#`,children:`FAQ`})}),(0,d.jsx)(`li`,{children:(0,d.jsx)(`a`,{href:`#`,children:`Privacy Policy`})})]})]}),(0,d.jsxs)(`div`,{className:`footer-col`,children:[(0,d.jsx)(`h5`,{children:`Connect`}),(0,d.jsxs)(`div`,{className:`footer-social`,children:[(0,d.jsx)(`a`,{href:`#`,className:`social-link`,children:`Twitter`}),(0,d.jsx)(`a`,{href:`#`,className:`social-link`,children:`LinkedIn`}),(0,d.jsx)(`a`,{href:`#`,className:`social-link`,children:`Discord`})]})]})]}),(0,d.jsxs)(`div`,{className:`footer-bottom`,children:[(0,d.jsx)(`span`,{children:`FoodPulse · Smart Campus Food Ecosystem`}),(0,d.jsxs)(`div`,{style:{display:`flex`,gap:`20px`},children:[(0,d.jsx)(`a`,{href:`#`,children:`Terms of Service`}),(0,d.jsx)(`a`,{href:`#`,children:`Cookies Settings`})]})]})]})})]})};export{f as default};