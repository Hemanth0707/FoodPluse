import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag, 
  Utensils, 
  Award, 
  Clock, 
  AlertTriangle, 
  BarChart3, 
  Menu, 
  X,
  Mail,
  Lock,
  User,
  Activity,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  // Login form state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authStudentId, setAuthStudentId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styleContent = `
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
  `;

  const renderHome = () => (
    <>
      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow fade-up">Next-Gen Student Dining</p>
          <h1 className="fade-up fade-up-1">
            FoodPulse – Smart<br />
            <span className="grad">Campus Food</span><br />
            <span className="blue-grad">Ecosystem</span>
          </h1>
          <p className="hero-desc fade-up fade-up-2">
            Redefining campus meals with real-time AI food verification, seamless mobile pre-ordering, queue analytics, and a reward system students love.
          </p>
          <div className="hero-actions fade-up fade-up-3">
            <button onClick={() => handleViewChange('login')} className="btn-primary">Explore Marketplace →</button>
            <button onClick={() => handleViewChange('signup')} className="btn-ghost">Report Food Issue</button>
          </div>
          <div className="hero-stats fade-up fade-up-4">
            <div className="stat-item">
              <span className="stat-num">5k+</span>
              <span className="stat-label">Active Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-num pink">99.8%</span>
              <span className="stat-label">AI Scan Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-num orange">20k+</span>
              <span className="stat-label">Points Redeemed</span>
            </div>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="hero-visual fade-up fade-up-2">
          <div className="dashboard-card">
            <div className="dc-header">
              <div className="dc-dots">
                <span className="dc-dot r" />
                <span className="dc-dot y" />
                <span className="dc-dot g" />
              </div>
              <span style={{ marginLeft: '8px' }}>foodpulse.lpu.in/dashboard</span>
            </div>
            <div className="dc-body">
              {/* Queue chart */}
              <div className="queue-section">
                <div className="queue-title">
                  <span>MESS 1 QUEUE PREDICTION</span>
                  <span style={{ color: 'var(--muted)', fontSize: '11px' }}>12:30</span>
                  <span className="badge-optimal">Optimal</span>
                </div>
                <div className="bar-chart">
                  <div className="bar" style={{ height: '40%' }} />
                  <div className="bar" style={{ height: '55%' }} />
                  <div className="bar" style={{ height: '65%' }} />
                  <div className="bar" style={{ height: '75%' }} />
                  <div className="bar peak" style={{ height: '100%' }} />
                  <div className="bar" style={{ height: '80%' }} />
                  <div className="bar" style={{ height: '60%' }} />
                  <div className="bar" style={{ height: '48%' }} />
                  <div className="bar" style={{ height: '38%' }} />
                </div>
                <div className="chart-labels">
                  <span>11:00 AM</span>
                  <span style={{ color: 'var(--pink)' }}>Peak (12:30)</span>
                  <span>2:00 PM</span>
                </div>
              </div>

              {/* Verification HUD */}
              <div className="hud-card">
                <div className="hud-title">
                  <span>Verification HUD</span>
                  <span className="hud-live">AI Live</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className="alert-pill">Roti: Undercooked</span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Detected by AI scan</span>
                </div>
              </div>

              {/* Quality Alert */}
              <div className="quality-alert pulse">
                <div>
                  <div className="qa-label">Quality Alert</div>
                  <div className="qa-sub">BH2 Mess · Scan Verified</div>
                </div>
                <div className="qa-pts">+150 Points</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ HOW IT WORKS ══ */}
      <section className="section-pad" id="how-it-works">
        <div className="container">
          <p className="section-eyebrow">Workflow</p>
          <h2 className="section-title">How FoodPulse <span className="grad">Works</span></h2>
          <p className="section-sub">Our ecosystem is engineered to keep dining high-quality and order checkout frictionless.</p>

          <div className="workflow-grid">
            <div className="workflow-card">
              <div className="wf-num">01</div>
              <div className="wf-icon purple">🛒</div>
              <div className="wf-title">Browse Marketplace</div>
              <div className="wf-desc">Access the campus digital food court, check menus, and order your favorite meals.</div>
            </div>
            <div className="workflow-card active">
              <div className="wf-num">02</div>
              <div className="wf-icon pink">🍽️</div>
              <div className="wf-title">Order or Report</div>
              <div className="wf-desc">Enjoy quick queue-free meals or report poor-quality food items instantly.</div>
            </div>
            <div className="workflow-card">
              <div className="wf-num">03</div>
              <div className="wf-icon blue">🛡️</div>
              <div className="wf-title">AI Verification</div>
              <div className="wf-desc">Computer vision scans details to verify complaints automatically in seconds.</div>
            </div>
            <div className="workflow-card">
              <div className="wf-num">04</div>
              <div className="wf-icon orange">🏅</div>
              <div className="wf-title">Earn Rewards</div>
              <div className="wf-desc">Receive instant compensation points and unlock premium reward badges.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ PLATFORM BENEFITS / FEATURES ══ */}
      <section className="section-pad" id="features">
        <div className="container">
          <p className="section-eyebrow">Platform Benefits</p>
          <h2 className="platform-title">Engineered for LPU Campus</h2>
          <p className="section-sub" style={{ marginBottom: '40px' }}>Discover custom-designed tools designed to address common dining and kitchen issues.</p>

          <div className="features-strip">
            <div className="feat-item">
              <span className="feat-badge instant">Instant</span>
              <div className="feat-icon">⏱️</div>
              <div className="feat-title">Faster Ordering</div>
              <div className="feat-desc">Skip queues by ordering menu items ahead of arrival.</div>
              <ul className="feat-checks">
                <li>30% Less Waiting Time</li>
                <li>Real-time Queue Updates</li>
              </ul>
            </div>
            <div className="feat-item">
              <span className="feat-badge auto">Automated</span>
              <div className="feat-icon">🛡️</div>
              <div className="feat-title">AI Verification</div>
              <div className="feat-desc">Computer vision verifies food texture and ingredients.</div>
              <ul className="feat-checks">
                <li>99.5% Accuracy Rate</li>
                <li>Instant Issue Detection</li>
              </ul>
            </div>
            <div className="feat-item">
              <span className="feat-badge transp">Transparent</span>
              <div className="feat-icon">⚠️</div>
              <div className="feat-title">Complaint Tracking</div>
              <div className="feat-desc">Track mess issues live from detection to resolution.</div>
              <ul className="feat-checks">
                <li>Live Status Updates</li>
                <li>Full Transparency</li>
              </ul>
            </div>
            <div className="feat-item">
              <span className="feat-badge live">Live</span>
              <div className="feat-icon">📊</div>
              <div className="feat-title">Queue Reduction</div>
              <div className="feat-desc">Optimize preparation times with predictive insights.</div>
              <ul className="feat-checks">
                <li>Predictive Analytics</li>
                <li>Smart Load Balancing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ STATS ROW ══ */}
      <section>
        <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-box-icon">👥</span>
              <span className="stat-box-num">5K+</span>
              <span className="stat-box-label">Active Students</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-icon">🎯</span>
              <span className="stat-box-num pink">99.8%</span>
              <span className="stat-box-label">AI Scan Accuracy</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-icon">🎁</span>
              <span className="stat-box-num orange">20K+</span>
              <span className="stat-box-label">Points Redeemed</span>
            </div>
            <div className="stat-box">
              <span className="stat-box-icon">⚙️</span>
              <span className="stat-box-num purple">8.5 hrs</span>
              <span className="stat-box-label">Avg. Time Saved / Week</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ BENTO GRID ══ */}
      <section className="section-pad" id="students">
        <div className="container">
          <p className="bento-eyebrow">Bento Grid</p>
          <h2 className="section-title">How FoodPulse<br />Helps <span className="grad">Students</span></h2>
          <p className="section-sub">Simplifying student dining while building mess administration transparency.</p>

          <div className="bento-grid">
            {/* Saves Time */}
            <div className="bento-card">
              <div className="bento-icon">⏰</div>
              <div className="bento-title">Saves Time & Reduces Waiting</div>
              <div className="bento-desc">Tired of waiting 30 minutes for lunch? Pre-order on the marketplace, monitor the live queue prediction index, and grab your plate the moment it is ready.</div>
              <div className="progress-block">
                <div className="progress-label">
                  <span>Checkout Wait-Time Progress</span>
                  <span>9.2 min saved</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" /></div>
                <div className="progress-ticks">
                  <span>Traditional: 25 mins waiting</span>
                  <span>FoodPulse Fast-Track: 4.5 mins</span>
                </div>
                <div className="progress-footer">8.5 Hours Saved Average / Student</div>
              </div>
            </div>

            {/* Hygiene Scores */}
            <div className="bento-card">
              <div className="bento-icon">🛡️</div>
              <div className="bento-title">Mess Hygiene Scores</div>
              <div className="bento-desc">Real-time quality audits flag messes with active issues, letting you make healthy choices on where to dine.</div>
              <div className="hygiene-list">
                <div className="hygiene-row">
                  <span className="hygiene-name">Central Mess</span>
                  <span className="hygiene-score a-plus">A+ (99.8%)</span>
                </div>
                <div className="hygiene-row">
                  <span className="hygiene-name">BH1 Dining</span>
                  <span className="hygiene-score a-minus">A- (93.1%)</span>
                </div>
                <div className="hygiene-row">
                  <span className="hygiene-name">BH2 Mess Cafeteria</span>
                  <span className="hygiene-score b">B (82.5%)</span>
                </div>
              </div>
              <div className="hygiene-footer">Safety Verified</div>
            </div>

            {/* Gives Students a Voice */}
            <div className="bento-card">
              <div className="bento-icon">⚠️</div>
              <div className="bento-title">Gives Students a Voice</div>
              <div className="bento-desc">No more ignored feedback letters. Submit visual proof and let the automated computer vision verification hold kitchen operators accountable.</div>
              <div className="audit-item">
                <div>
                  <div className="audit-title">Undercooked Meat Audit</div>
                  <div className="audit-sub">Scan Verified</div>
                </div>
                <div className="audit-pts">+150 pts</div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bento-card" id="leaderboard">
              <div className="bento-icon">📈</div>
              <div className="bento-title">Audited Mess Performance Leaderboard</div>
              <div className="bento-desc">Stall performance ratings, live queue speeds, and resolved complaints data are broadcast directly to the student leaderboard.</div>
              <div className="lb-podium">
                <div className="lb-item">
                  <div className="lb-rank">🥇</div>
                  <div className="lb-name">#1 Central Stall</div>
                  <div className="lb-rating">4.95 ⭐</div>
                </div>
                <div className="lb-item">
                  <div className="lb-rank">🥈</div>
                  <div className="lb-name">#2 BH2 Cafe</div>
                  <div className="lb-rating">4.88 ⭐</div>
                </div>
                <div className="lb-item">
                  <div className="lb-rank">🥉</div>
                  <div className="lb-name">#3 Central Cafe</div>
                  <div className="lb-rating">4.79 ⭐</div>
                </div>
              </div>
              <div className="lb-footer">Full Campus Food Quality Statistics Available</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderLogin = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '100px 0' }}>
      <div className="auth-card">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Log in to manage your FoodPulse dashboard and wallet points</p>
        
        <form onSubmit={(e) => { e.preventDefault(); alert("Mock Authentication Successful!"); handleViewChange('home'); }}>
          <div className="auth-input-group">
            <label>Student Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-icon" />
              <input 
                type="email" 
                required 
                placeholder="e.g. student@lpu.in"
                className="auth-input"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Account Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-icon" />
              <input 
                type="password" 
                required 
                placeholder="••••••••••••"
                className="auth-input"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="auth-btn">Log In</button>
        </form>

        <p className="auth-toggle font-semibold">
          Don't have an account? 
          <button onClick={() => handleViewChange('signup')}>Sign Up</button>
        </p>
      </div>
    </div>
  );

  const renderSignup = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '100px 0' }}>
      <div className="auth-card">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Join FoodPulse to browse stalls and earn verified points</p>
        
        <form onSubmit={(e) => { e.preventDefault(); alert("Registration Mock Successful!"); handleViewChange('login'); }}>
          <div className="auth-input-group">
            <label>LPU Student ID</label>
            <div className="auth-input-wrapper">
              <User size={16} className="auth-icon" />
              <input 
                type="text" 
                required 
                placeholder="e.g. 12015382"
                className="auth-input"
                value={authStudentId}
                onChange={(e) => setAuthStudentId(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Student Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-icon" />
              <input 
                type="email" 
                required 
                placeholder="e.g. student@lpu.in"
                className="auth-input"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Create Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-icon" />
              <input 
                type="password" 
                required 
                placeholder="••••••••••••"
                className="auth-input"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p className="auth-toggle font-semibold">
          Already have an account? 
          <button onClick={() => handleViewChange('login')}>Log In</button>
        </p>
      </div>
    </div>
  );

  const renderHowItWorks = () => (
    <div style={{ width: '100%', padding: '100px 0' }}>
      <p className="section-eyebrow">Documentation</p>
      <h2 className="section-title">How FoodPulse <span className="grad">Works</span></h2>
      <p className="section-sub">A comprehensive breakdown of LPU's automated student dining and crowd auditing platform.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', width: '100%', marginTop: '20px' }} className="bento-grid">
        <div className="bento-card">
          <div className="bento-icon">🛒</div>
          <h3 className="bento-title">1. Marketplace Discovery</h3>
          <p className="bento-desc" style={{ marginBottom: 0 }}>
            Students access LPU's decentralized digital food marketplace to view live menus, queue predictions, and place pre-orders. Skip traditional dining hall lines by purchasing tokens directly using dining reward points or wallet balances.
          </p>
        </div>

        <div className="bento-card">
          <div className="bento-icon">🤖</div>
          <h3 className="bento-title">2. AI Kitchen Verification</h3>
          <p className="bento-desc" style={{ marginBottom: 0 }}>
            Every meal served can be photographed and uploaded for instantaneous verification. FoodPulse's proprietary computer vision models verify portion control, structural parameters, food color profiles, and detect preparation anomalies like undercooked components.
          </p>
        </div>

        <div className="bento-card">
          <div className="bento-icon">⚠️</div>
          <h3 className="bento-title">3. Real-Time Crowd Auditing</h3>
          <p className="bento-desc" style={{ marginBottom: 0 }}>
            Any food preparation discrepancy automatically creates an active audit ticket on the student dashboard. Neighboring students act as decentralized auditors, reviewing photos to confirm or reject anomalies, enforcing dining hall transparency and hygiene.
          </p>
        </div>

        <div className="bento-card">
          <div className="bento-icon">🪙</div>
          <h3 className="bento-title">4. Rewards Compensation</h3>
          <p className="bento-desc" style={{ marginBottom: 0 }}>
            Once the crowd-audited quality ticket is flagged and verified by the system, points are instantly refunded to the student's Smart Wallet. Users redeem these verified points at LPU campus stalls, ensuring dining hall operator accountability.
          </p>
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div style={{ width: '100%', padding: '100px 0' }}>
      <p className="section-eyebrow">Capabilities Matrix</p>
      <h2 className="section-title">Platform <span className="grad">Features</span></h2>
      <p className="section-sub">Explore LPU FoodPulse's advanced AI-powered dining optimization technologies.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%' }} className="workflow-grid">
        <div className="bento-card" style={{ gridColumn: 'span 1' }}>
          <div className="bento-icon">⏱️</div>
          <h3 className="bento-title">Queue-Free Pipeline</h3>
          <p className="bento-desc" style={{ marginBottom: 0 }}>
            Our smart routing algorithm allows students to order food items remotely and pick them up instantly upon arrival. Real-time updates track preparation status directly on the web app.
          </p>
        </div>

        <div className="bento-card" style={{ gridColumn: 'span 1' }}>
          <div className="bento-icon">📷</div>
          <h3 className="bento-title">AI Texture Tracking</h3>
          <p className="bento-desc" style={{ marginBottom: 0 }}>
            Harnessing state-of-the-art computer vision to analyze plate contents. Automatically flags hygiene indices, undercooked roti, cold gravy, or incorrect portion sizing before the first bite.
          </p>
        </div>

        <div className="bento-card" style={{ gridColumn: 'span 1' }}>
          <div className="bento-icon">📊</div>
          <h3 className="bento-title">Predictive Load Balancing</h3>
          <p className="bento-desc" style={{ marginBottom: 0 }}>
            Minimizes peak dining hall congestion by tracking wait-time curves. Directs students to under-utilized messes, improving campus load distribution and saving hours of waiting time.
          </p>
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div style={{ width: '100%', padding: '100px 0' }}>
      <p className="section-eyebrow">Leaderboard</p>
      <h2 className="section-title">Audited Mess <span className="grad">Rankings</span></h2>
      <p className="section-sub">Live student-curated food quality ratings, AI-verified audits, and queue metrics across LPU dining halls.</p>

      <div className="table-container">
        <table className="lead-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Dining Venue / Stall</th>
              <th>Hygiene Rating</th>
              <th>Avg Waiting Time</th>
              <th>Anomalies Verified</th>
              <th>Platform Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="rank-cell">🥇 #1</td>
              <td className="font-semibold">Central Mess Hall</td>
              <td style={{ color: 'var(--green)', fontWeight: 700 }}>A+ (99.8%)</td>
              <td>4.2 minutes</td>
              <td>12 complaints</td>
              <td><span className="status-badge stable">Stable</span></td>
            </tr>
            <tr>
              <td className="rank-cell">🥈 #2</td>
              <td className="font-semibold">BH2 Cafe & Stall</td>
              <td style={{ color: '#86efac', fontWeight: 700 }}>A- (93.1%)</td>
              <td>6.5 minutes</td>
              <td>19 complaints</td>
              <td><span className="status-badge check">Check Quality</span></td>
            </tr>
            <tr>
              <td className="rank-cell">🥉 #3</td>
              <td className="font-semibold">Block 34 Cafeteria</td>
              <td style={{ color: '#facc15', fontWeight: 700 }}>B+ (88.4%)</td>
              <td>8.0 minutes</td>
              <td>34 complaints</td>
              <td><span className="status-badge alert">Alert Active</span></td>
            </tr>
            <tr>
              <td className="rank-cell">#4</td>
              <td className="font-semibold">BH1 Student Dining</td>
              <td style={{ color: '#86efac', fontWeight: 700 }}>A (91.5%)</td>
              <td>5.0 minutes</td>
              <td>8 complaints</td>
              <td><span className="status-badge stable">Stable</span></td>
            </tr>
            <tr>
              <td className="rank-cell">#5</td>
              <td className="font-semibold">Central Cafe Annex</td>
              <td style={{ color: '#facc15', fontWeight: 700 }}>B (82.5%)</td>
              <td>9.5 minutes</td>
              <td>45 complaints</td>
              <td><span className="status-badge check">Quality Notice</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg)' }}>
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />

      {/* ══ NAV ══ */}
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <button onClick={() => handleViewChange('home')} className="logo" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <div className="logo-icon">⚡</div>
          FoodPulse
        </button>
        <ul className="nav-links">
          <li><button onClick={() => handleViewChange('how-it-works')} className={currentView === 'how-it-works' ? 'active' : ''}>How It Works</button></li>
          <li><button onClick={() => handleViewChange('features')} className={currentView === 'features' ? 'active' : ''}>Features</button></li>
          <li><button onClick={() => handleViewChange('leaderboard')} className={currentView === 'leaderboard' ? 'active' : ''}>Leaderboard</button></li>
        </ul>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => handleViewChange('login')} className="nav-cta hidden md:inline-block">Explore Marketplace →</button>
          <button 
            className="mobile-hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mobile-menu-drawer"
          >
            <button onClick={() => handleViewChange('how-it-works')}>How It Works</button>
            <button onClick={() => handleViewChange('features')}>Features</button>
            <button onClick={() => handleViewChange('leaderboard')}>Leaderboard</button>
            <button onClick={() => handleViewChange('login')} className="nav-cta text-center mt-2">Explore Marketplace →</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ MAIN WORKSPACE CONTAINER ══ */}
      <div className="w-full max-w-7xl xl:max-w-[90vw] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center">
        {currentView === 'home' && renderHome()}
        {currentView === 'login' && renderLogin()}
        {currentView === 'signup' && renderSignup()}
        {currentView === 'how-it-works' && renderHowItWorks()}
        {currentView === 'features' && renderFeatures()}
        {currentView === 'leaderboard' && renderLeaderboard()}
      </div>

      <div className="section-divider" />

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="w-full max-w-7xl xl:max-w-[90vw] mx-auto px-6 md:px-12 lg:px-16">
          <div className="footer-grid">
            <div className="footer-brand">
              <button onClick={() => handleViewChange('home')} className="logo" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <div className="logo-icon">⚡</div>
                FoodPulse
              </button>
              <p>Building a smarter, healthier campus food ecosystem through technology and transparent crowd auditing.</p>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px' }}>© 2026 FoodPulse. Redesigned with premium SaaS aesthetics. All rights reserved.</p>
            </div>
            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                <li><button onClick={() => handleViewChange('login')}>Stall Marketplace</button></li>
                <li><button onClick={() => handleViewChange('signup')}>Report Issue</button></li>
                <li><button onClick={() => handleViewChange('how-it-works')}>How It Works</button></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Support</h5>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Connect</h5>
              <div className="footer-social">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Discord</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>FoodPulse · Smart Campus Food Ecosystem</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
