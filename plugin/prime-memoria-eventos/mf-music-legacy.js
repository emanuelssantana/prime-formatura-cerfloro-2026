/*!
 * MFMusic v2.0.0 - Motor de musica do hub /fotos/ (Estudio Criativo Prime / Manu Fotografias RO)
 * IIFE unico, sem dependencias. CSS + DOM proprios injetados. Namespace "mfm-".
 * Expoe window.MFMusic. Arquivo em UTF-8 (servir com charset utf-8).
 *
 * Uso:
 *   MFMusic.init({
 *     mountPanel: '#mf-music-panel',   // opcional (default: #mf-music-panel se existir)
 *     youtube: [{title,artist,video}], // opcional (default: 26 músicas completas em clipes oficiais)
 *     storageKey: 'mfHubAudio.v2', heading: 'Trilha sonora oficial Geek & Cosplay', autoplay: true
 *   });
 * Metodos: play pause toggle next prev setMode('video') duck(bool[,{volume}])
 *          state() on(evento,fn)->off  | extras: off setVolume mute selectTrack openPanel mountPanel lists destroy
 * Eventos: 'state' 'blocked' 'playing' 'paused' | extras: 'ready' 'notice' 'time'
 */
(function () {
  'use strict';
  var W = window, D = document;
  if (W.MFMusic && W.MFMusic.__mfm) return;

  /* ------------------------------------------------------------------ defaults */
  var NATIVE_DEFAULT = [];
  var PLAYLIST_VERSION = "1.2.1";
  var YT_LEGACY_IDS = [
    "ZRtdQ81jPUQ", "mLW35YMzELE", "CwkzK-F0Y00", "1tk1pqwrOys", "D9G1VOjN_84",
    "fB8TyLTD7EE", "h7MYJghRWt0", "9lnh--ZOPyo", "1FliVTcX8bQ", "wsKw_Astidg",
    "ekr2nIex040", "hohuFW0zQUw", "LmZD-TU96q4", "MjeiIal1ZR0", "pZgZXej3OCg",
    "fzQ6gRAEoy0", "SRXH9AbT280", "Qp3b-RXtz4w", "HRL5Cp_mPeo", "UM9XNpgrqVk"
  ];
  var YT_DEFAULT = [
    ["ZRtdQ81jPUQ","Idol","YOASOBI"],
    ["-H_k7iwrWVY","SOULSOUP","Official HIGE DANDISM"],
    ["mLW35YMzELE","Bling-Bang-Bang-Born","Creepy Nuts"],
    ["CwkzK-F0Y00","Gurenge","LiSA"],
    ["1tk1pqwrOys","Kaikai Kitan","Eve"],
    ["D9G1VOjN_84","Enemy","Imagine Dragons & JID"],
    ["fB8TyLTD7EE","RISE","The Glitch Mob, Mako & The Word Alive"],
    ["h7MYJghRWt0","Die For You","Grabbitz"],
    ["9lnh--ZOPyo","Akuma no Ko","Ai Higuchi"],
    ["1FliVTcX8bQ","New Genesis","Ado"],
    ["wsKw_Astidg","Otonoke","Creepy Nuts"],
    ["ekr2nIex040","APT.","ROSÉ & Bruno Mars"],
    ["hohuFW0zQUw","Golden","HUNTR/X"],
    ["LmZD-TU96q4","IRIS OUT","Kenshi Yonezu"],
    ["MjeiIal1ZR0","lulu.","Mrs. GREEN APPLE"],
    ["pZgZXej3OCg","鳴らす","mill sage"],
    ["fzQ6gRAEoy0","Shelter","Porter Robinson & Madeon"],
    ["SRXH9AbT280","The Emptiness Machine","Linkin Park"],
    ["Qp3b-RXtz4w","Usseewa","Ado"],
    ["HRL5Cp_mPeo","DATEN","Creepy Nuts"],
    ["UM9XNpgrqVk","Kaijū no Hanauta","Vaundy"],
    ["983bBbJx0Mk","Soda Pop","Saja Boys · KPop Demon Hunters"],
    ["QGsevnbItdU","How It's Done","HUNTR/X · KPop Demon Hunters"],
    ["l8Dr7vzMSVE","Takedown","Jeongyeon, Jihyo & Chaeyoung · TWICE"],
    ["lTes4u4O7N0","Neighbor Like Me","The Math Club feat. Relaye & Melo Makes Music"],
    ["dePs7UPp6GQ","Brand New","Mrs. GREEN APPLE"],


  ].map(function (r) { return { video: r[0], title: r[1], artist: r[2] }; });

  var ICON = {
    play: 'M8 5v14l11-7z',
    pause: 'M6 5h4v14H6zm8 0h4v14h-4z',
    prev: 'M6 6h2v12H6zm3.5 6L18 18V6z',
    next: 'M16 6h2v12h-2zM6 18l8.5-6L6 6z',
    vol: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
    mute: 'M3 9v6h4l5 5V4L7 9H3zm13.6 3-2.7-2.7 1.4-1.4 2.7 2.7 2.7-2.7 1.4 1.4-2.7 2.7 2.7 2.7-1.4 1.4-2.7-2.7-2.7 2.7-1.4-1.4z',
    list: 'M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18A3 3 0 1 0 19 17V8h3V6h-5z',
    down: 'M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z',
    note: 'M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z',
    close: 'M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6z'
  };

  /* ------------------------------------------------------------------ util */
  function clamp(n, a, b) { n = +n; if (!isFinite(n)) n = a; return Math.min(b, Math.max(a, n)); }
  function wrap(i, n) { return n ? ((Math.floor(i) % n) + n) % n : 0; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }
  function reduced() { try { return W.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function icon(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICON[k] + '"/></svg>'; }

  /* ------------------------------------------------------------------ event bus */
  var handlers = {};
  function on(ev, fn) { if (typeof fn !== 'function') return function () {}; (handlers[ev] = handlers[ev] || []).push(fn); return function () { off(ev, fn); }; }
  function off(ev, fn) { var l = handlers[ev]; if (!l) return; var i = l.indexOf(fn); if (i > -1) l.splice(i, 1); }
  function emit(ev, d) { var l = handlers[ev]; if (!l) return; l.slice().forEach(function (f) { try { f(d); } catch (e) { /* handler externo nao derruba o motor */ } }); }

  /* ------------------------------------------------------------------ storage */
  function store() { try { return W.localStorage; } catch (e) { return null; } }
  function loadState(key) { try { var s = store(); if (!s) return null; var j = JSON.parse(s.getItem(key)); return j && typeof j === 'object' ? j : null; } catch (e) { return null; } }
  function saveState(key, o) { try { var s = store(); if (s) s.setItem(key, JSON.stringify(o)); } catch (e) { /* sem storage: segue sem persistir */ } }

  /* ------------------------------------------------------------------ module state */
  var O, S, NAT, YTL;
  var started = false, pend = [];
  var rt = { playing: false, pending: false, blocked: false, ducked: false, duckWas: false, duckMode: null, duckLevel: null,
    note: '', noteT: 0, armed: null, sp: 0, err: 0, buffering: false, viaSpare: false, moved: false, tx: 0, ty: 0, bt: 0 };
  var AU = [], act = 0;
  var yt = { iframe: null, player: null, ready: false, vid: '', want: null, playWhenReady: false, apiLoading: false, cbs: [] };
  var dock, fab, chip, drawer, panelHost, tickT = 0, ro = null, lifecycle = [];

  function au() { return AU[act]; }
  function spare() { return AU[1 - act]; }
  function markSP() { rt.sp = Date.now(); }
  function selfPaused() { return Date.now() - rt.sp < 600; }
  function roots() { return [dock, fab, chip, drawer, panelHost].filter(Boolean); }
  function qa(name) {
    var out = [];
    roots().forEach(function (r) { if (r.getAttribute && r.getAttribute('data-mfm') === name) out.push(r); [].push.apply(out, r.querySelectorAll('[data-mfm="' + name + '"]')); });
    return out;
  }
  function curList() { return S.mode === 'video' ? YTL : NAT; }
  function curIdx() { return S.mode === 'video' ? S.vi : S.ni; }
  function curTrack() {
    var t = curList()[curIdx()] || { title: '' };
    return S.mode === 'video' ? { title: t.title, artist: t.artist, id: t.video } : { title: t.title, artist: O.nativeArtist, id: t.url };
  }

  /* ------------------------------------------------------------------ config */
  function cleanNative() { return []; }
  function cleanYT(l) {
    if (!Array.isArray(l) || !l.length) return YT_DEFAULT.slice();
    var out = l.filter(function (x) { return x && typeof x.video === 'string' && /^[\w-]{6,20}$/.test(x.video); })
      .map(function (x, i) { return { video: x.video, title: String(x.title || ('Vídeo ' + (i + 1))), artist: String(x.artist || '') }; });
    return out.length ? out : YT_DEFAULT.slice();
  }
  function normalize(o) {
    return {
      mountPanel: o.mountPanel || null, native: cleanNative(o.native), youtube: cleanYT(o.youtube),
      storageKey: o.storageKey || 'mfHubAudio.v2', heading: o.heading || 'Trilha sonora oficial Geek & Cosplay',
      autoplay: o.autoplay !== false, nativeArtist: o.nativeArtist || 'Manu Fotografias RO'
    };
  }
  function mergeState(s) {
    s = s || {};
    var savedVideoId = typeof s.videoId === 'string' ? s.videoId : '';
    var legacyVideoId = !savedVideoId && !s.playlistVersion ? YT_LEGACY_IDS[wrap(+s.vi || 0, YT_LEGACY_IDS.length)] : '';
    var savedIndex = -1;
    var resumeVideoId = savedVideoId || legacyVideoId;
    if (resumeVideoId) {
      for (var i = 0; i < YTL.length; i++) {
        if (YTL[i].video === resumeVideoId) { savedIndex = i; break; }
      }
    }
    return {
      mode: 'video',
      ni: wrap(+s.ni || 0, NAT.length), vi: savedIndex >= 0 ? savedIndex : wrap(+s.vi || 0, YTL.length),
      nt: Math.max(0, +s.nt || 0), vt: Math.max(0, +s.vt || 0),
      vol: s.vol == null ? 0.35 : clamp(s.vol, 0, 1), muted: !!s.muted,
      playing: typeof s.playing === 'boolean' ? s.playing : O.autoplay,
      min: !!s.min, ts: +s.ts || 0, videoId: resumeVideoId, playlistVersion: PLAYLIST_VERSION
    };
  }

  /* ------------------------------------------------------------------ CSS */
  var CSS = [
    '.mfm,.mfm *{box-sizing:border-box}',
    '.mfm{--mfm-pur:#9b59b6;--mfm-pur2:#a855f7;--mfm-cy:#00d2ff;--mfm-tx:#eef2f7;--mfm-mut:#9fb0c4;font-family:"Outfit",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--mfm-tx);font-size:14px;line-height:1.3;-webkit-tap-highlight-color:transparent}',
    '.mfm[hidden],.mfm [hidden]{display:none!important}',
    '.mfm .mfm-btn{appearance:none;-webkit-appearance:none;margin:0;padding:0;width:44px;height:44px;min-width:44px;flex:0 0 44px;border-radius:50%;border:1px solid rgba(0,210,255,.4);background:rgba(255,255,255,.06);color:var(--mfm-tx);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;line-height:1;box-shadow:none;text-shadow:none;transition:background .15s,border-color .15s,transform .15s}',
    '.mfm .mfm-btn:hover{background:rgba(0,210,255,.18);border-color:var(--mfm-cy);color:#fff}',
    '.mfm .mfm-btn:active{transform:scale(.94)}',
    '.mfm .mfm-btn svg{width:22px;height:22px;fill:currentColor;pointer-events:none;display:block}',
    '.mfm .mfm-main{background:linear-gradient(135deg,#9b59b6,#a855f7);border-color:rgba(255,255,255,.4);box-shadow:0 0 14px rgba(168,85,247,.55);color:#fff}',
    '.mfm .mfm-main:hover{background:linear-gradient(135deg,#a86bc4,#b97bf8)}',
    '.mfm :focus-visible{outline:3px solid var(--mfm-cy);outline-offset:2px}',
    '.mfm-dock :focus-visible{outline-offset:-3px}',
    '.mfm .mfm-vol{-webkit-appearance:none;appearance:none;height:44px;margin:0;padding:0;background:transparent;flex:1 1 48px;min-width:48px;max-width:150px;cursor:pointer;--mfm-fill:35%;accent-color:var(--mfm-pur2)}',
    '.mfm .mfm-vol::-webkit-slider-runnable-track{height:6px;border-radius:3px;background:linear-gradient(90deg,var(--mfm-cy) var(--mfm-fill),rgba(255,255,255,.2) var(--mfm-fill))}',
    '.mfm .mfm-vol::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid var(--mfm-pur2);margin-top:-7px;box-shadow:0 0 8px rgba(168,85,247,.7)}',
    '.mfm .mfm-vol::-moz-range-track{height:6px;border-radius:3px;background:rgba(255,255,255,.2)}',
    '.mfm .mfm-vol::-moz-range-progress{height:6px;border-radius:3px;background:var(--mfm-cy)}',
    '.mfm .mfm-vol::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid var(--mfm-pur2)}',
    /* dock */
    '.mfm-dock{position:fixed;left:0;right:0;bottom:calc(8px + env(safe-area-inset-bottom,0px));margin:0 auto;width:calc(100% - 16px - env(safe-area-inset-left,0px) - env(safe-area-inset-right,0px));max-width:880px;z-index:9000;display:flex;flex-wrap:wrap;align-items:center;gap:0 8px;padding:5px 8px 6px;background:rgba(5,8,12,.92);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(168,85,247,.5);border-radius:18px;box-shadow:0 8px 28px rgba(0,0,0,.55),0 0 18px rgba(168,85,247,.25)}',
    '.mfm-prog{position:absolute;left:14px;right:14px;top:0;height:3px;border-radius:0 0 3px 3px;background:rgba(255,255,255,.08);overflow:hidden;pointer-events:none}',
    '.mfm-prog i,.mfm-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--mfm-pur2),var(--mfm-cy))}',
    '.mfm-d-title{flex:1 1 100%;min-width:0;min-height:22px;display:flex;align-items:center;gap:8px;padding:2px 4px 0}',
    '.mfm-marq{flex:1 1 auto;min-width:0;overflow:hidden;white-space:nowrap;font-weight:600;font-size:14px;text-align:left}',
    '.mfm-marq-in{display:inline-block;will-change:transform}',
    '.mfm-marq.is-long .mfm-marq-in{animation:mfm-marq var(--mfm-dur,10s) ease-in-out infinite alternate}',
    '@keyframes mfm-marq{0%,12%{transform:translateX(0)}88%,100%{transform:translateX(var(--mfm-shift,0))}}',
    '.mfm-d-ctrls{flex:1 1 100%;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:2px}',
    '@media (min-width:640px){.mfm-d-title{flex:1 1 180px;padding-top:0}.mfm-d-ctrls{flex:0 1 auto;flex-wrap:nowrap;justify-content:flex-end;gap:4px}.mfm-dock{flex-wrap:nowrap;padding:5px 10px}}',
    /* eq */
    '.mfm-eq{display:inline-flex;align-items:flex-end;gap:2px;width:16px;height:14px;flex:0 0 16px}',
    '.mfm-eq i{display:block;width:3px;height:30%;border-radius:2px;background:linear-gradient(0deg,var(--mfm-pur2),var(--mfm-cy))}',
    '.mfm-eq i:nth-child(2){height:60%}.mfm-eq i:nth-child(3){height:45%}',
    '.is-playing .mfm-eq i{animation:mfm-eq .9s ease-in-out infinite alternate}',
    '.is-playing .mfm-eq i:nth-child(2){animation-delay:.2s}.is-playing .mfm-eq i:nth-child(3){animation-delay:.45s}',
    '@keyframes mfm-eq{from{height:20%}to{height:100%}}',
    /* fab + chip */
    '.mfm-fab{position:fixed;right:calc(12px + env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:9000;width:48px;height:48px;border-radius:50%;padding:0;margin:0;border:1px solid rgba(255,255,255,.45);background:linear-gradient(135deg,#9b59b6,#a855f7);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.5),0 0 18px rgba(168,85,247,.6)}',
    '.mfm-fab svg{width:24px;height:24px;fill:currentColor;pointer-events:none}',
    '.mfm-fab.is-playing{animation:mfm-pulse 2.2s ease-in-out infinite}',
    '@keyframes mfm-pulse{0%,100%{box-shadow:0 6px 20px rgba(0,0,0,.5),0 0 12px rgba(168,85,247,.5)}50%{box-shadow:0 6px 20px rgba(0,0,0,.5),0 0 26px rgba(0,210,255,.75)}}',
    '.mfm-chip{position:fixed;left:0;right:0;margin:0 auto;width:max-content;max-width:calc(100% - 24px);bottom:calc(var(--mfm-off,0px) + 8px + env(safe-area-inset-bottom,0px));z-index:9001;display:flex;align-items:center;gap:8px;padding:10px 16px;min-height:44px;border-radius:999px;background:rgba(5,8,12,.95);border:1px solid var(--mfm-cy);color:#fff;font-weight:600;font-size:14px;text-align:left;box-shadow:0 6px 22px rgba(0,0,0,.55),0 0 18px rgba(0,210,255,.4);animation:mfm-chip 1.8s ease-in-out infinite}',
    '.mfm-chip svg{width:20px;height:20px;fill:var(--mfm-cy);flex:0 0 20px}',
    '@keyframes mfm-chip{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}',
    /* drawer + panel */
    '.mfm-drawer{position:fixed;left:0;right:0;margin:0 auto;width:calc(100% - 16px);max-width:560px;bottom:calc(var(--mfm-off,0px) + 8px + env(safe-area-inset-bottom,0px));max-height:calc(100vh - var(--mfm-off,0px) - 24px);max-height:calc(100dvh - var(--mfm-off,0px) - 24px);overflow:auto;z-index:9002;border-radius:20px}',
    '.mfm-drawer .mfm-panel{margin:0}',
    '.mfm-drawer-x{position:absolute;top:8px;right:8px;z-index:1}',
    '.mfm-panel{position:relative;width:100%;margin:0 auto;padding:16px;border-radius:20px;color:var(--mfm-tx);background:linear-gradient(145deg,rgba(168,85,247,.16),rgba(0,210,255,.06) 60%),rgba(5,8,12,.88);border:1px solid rgba(168,85,247,.45);box-shadow:0 10px 30px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.04);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}',
    '.mfm-panel .mfm-p-h{margin:0 0 12px;padding:0 48px 0 0;font-size:18px;font-weight:700;line-height:1.25;color:#fff;text-align:left;text-transform:none;letter-spacing:0;display:flex;align-items:center;gap:10px}',
    '.mfm-panel .mfm-p-h .mfm-eq{width:20px;flex-basis:20px;height:18px}',
    '.mfm-p-now{margin:0 0 12px;padding:10px 12px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(0,210,255,.25)}',
    '.mfm-p-now b{display:block;font-size:16px;font-weight:700;color:#fff;overflow-wrap:anywhere}',
    '.mfm-p-now span{display:block;font-size:13px;color:var(--mfm-mut);overflow-wrap:anywhere}',
    '.mfm-p-row{display:grid;grid-template-columns:1fr;gap:10px;margin:0 0 12px}',
    '@media (min-width:520px){.mfm-p-row{grid-template-columns:1fr 1fr}}',
    '.mfm-lab{display:block;margin:0;font-size:12px;font-weight:600;color:var(--mfm-mut);text-align:left}',
    '.mfm-lab>span{display:block;margin:0 0 4px}',
    '.mfm .mfm-sel{display:block;width:100%;min-height:44px;margin:0;padding:8px 38px 8px 12px;border-radius:12px;border:1px solid rgba(168,85,247,.55);background:#0b1119 url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23a855f7\' d=\'M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z\'/%3E%3C/svg%3E") no-repeat right 10px center/20px;color:#fff;font-size:14px;font-weight:500;appearance:none;-webkit-appearance:none;cursor:pointer;text-overflow:ellipsis}',
    '.mfm .mfm-sel option{background:#0b1119;color:#fff}',
    '.mfm-p-prog{display:flex;align-items:center;gap:10px;margin:0 0 6px;font-size:12px;color:var(--mfm-mut)}',
    '.mfm-bar{flex:1 1 auto;height:6px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden}',
    '.mfm-p-ctrls{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:6px 0 4px}',
    '.mfm-p-ctrls .mfm-vol{max-width:none;flex:1 1 90px}',
    '.mfm-status{margin:8px 0 0;min-height:18px;font-size:13px;color:var(--mfm-cy);text-align:left}',
    '.mfm-note{margin:6px 0 0;font-size:12px;color:var(--mfm-mut);text-align:left}',
    '.mfm-video{margin:12px 0 0;border-radius:14px;overflow:hidden;border:1px solid rgba(168,85,247,.45);background:#02040a;aspect-ratio:16/9;position:relative}',
    '.mfm-video .mfm-ph{position:absolute;inset:0;margin:0;padding:16px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:13px;color:var(--mfm-mut)}',
    '.mfm-video.mfm-has-video .mfm-ph{display:none}',
    '.mfm-yt{position:absolute;inset:0;width:100%;height:100%;border:0;display:block}',
    '.mfm-panel[data-mode="native"] .mfm-video.mfm-has-video{display:none}',
    '.mfm-panel[data-mode="video"] .mfm-note-n,.mfm-panel[data-mode="native"] .mfm-note-v{display:none}',
    /* espaco para o dock + scroll-top do Astra */
    'html.mfm-pad body{padding-bottom:calc(var(--mfm-pad0,0px) + var(--mfm-dock-h,0px) + 16px + env(safe-area-inset-bottom,0px))}',
    'html.mfm-pad #ast-scroll-top{bottom:calc(var(--mfm-off,0px) + 16px + env(safe-area-inset-bottom,0px))}',
    /* movimento reduzido */
    '@media (prefers-reduced-motion:reduce){.mfm,.mfm *{animation:none!important;transition:none!important}.mfm-marq-in{display:block;overflow:hidden;text-overflow:ellipsis}}'
  ].join('\n');

  function injectCSS() {
    if (D.getElementById('mfm-style')) return;
    var st = D.createElement('style'); st.id = 'mfm-style'; st.textContent = CSS; (D.head || D.documentElement).appendChild(st);
  }

  /* ------------------------------------------------------------------ UI */
  function btn(act, cls) { return '<button type="button" class="mfm-btn' + (cls ? ' ' + cls : '') + '" data-act="' + act + '"></button>'; }
  var LBL = { prev: 'Faixa anterior', next: 'Próxima faixa', toggle: 'Tocar', mute: 'Silenciar', panel: 'Abrir painel completo', min: 'Minimizar o player', close: 'Fechar painel' };
  var IC = { prev: 'prev', next: 'next', toggle: 'play', mute: 'vol', panel: 'list', min: 'down', close: 'close' };
  function fillButtons(root) {
    [].forEach.call(root.querySelectorAll('button[data-act]'), function (b) {
      var a = b.getAttribute('data-act'); b.innerHTML = icon(IC[a]); b.setAttribute('aria-label', LBL[a]);
    });
  }

  function buildDock() {
    dock = D.createElement('div'); dock.id = 'mfm-dock'; dock.className = 'mfm mfm-dock';
    dock.setAttribute('role', 'region'); dock.setAttribute('aria-label', 'Mini-player da trilha sonora');
    dock.innerHTML = '<div class="mfm-prog" aria-hidden="true"><i data-mfm="bar"></i></div>' +
      '<div class="mfm-d-title"><span class="mfm-eq" aria-hidden="true"><i></i><i></i><i></i></span><div class="mfm-marq" data-mfm="marq"><span class="mfm-marq-in" data-mfm="title"></span></div></div>' +
      '<div class="mfm-d-ctrls">' + btn('prev') + btn('toggle', 'mfm-main') + btn('next') + btn('mute') +
      '<input type="range" class="mfm-vol" data-mfm="vol" min="0" max="100" step="1" aria-label="Volume">' +
      btn('panel') + btn('min') + '</div>';
    fillButtons(dock);
    D.body.appendChild(dock);
    fab = D.createElement('button'); fab.type = 'button'; fab.id = 'mfm-fab'; fab.className = 'mfm mfm-fab';
    fab.setAttribute('aria-label', 'Abrir o mini-player da trilha sonora'); fab.setAttribute('data-act', 'restore');
    fab.innerHTML = icon('note'); fab.hidden = true; D.body.appendChild(fab);
    chip = D.createElement('div'); chip.id = 'mfm-chip'; chip.className = 'mfm mfm-chip'; chip.setAttribute('role', 'status');
    chip.innerHTML = icon('vol') + '<span>Toque em qualquer lugar para ligar a trilha</span>'; chip.hidden = true; D.body.appendChild(chip);
    [dock, fab, chip].forEach(wire);
  }

  function panelHTML() {
    return '<p class="mfm-p-h" role="heading" aria-level="3"><span class="mfm-eq" aria-hidden="true"><i></i><i></i><i></i></span>' + esc(O.heading) + '</p>' +
      '<div class="mfm-p-now"><b data-mfm="ptitle"></b><span data-mfm="partist"></span></div>' +
      '<div class="mfm-p-row">' +
      '<label class="mfm-lab"><span>Modo de reprodução</span><select class="mfm-sel" data-mfm="mode"><option value="video">' + YTL.length + ' músicas completas · vídeos oficiais</option></select></label>' +
      '<label class="mfm-lab"><span>Faixa</span><select class="mfm-sel" data-mfm="track"></select></label></div>' +
      '<div class="mfm-p-prog"><div class="mfm-bar" aria-hidden="true"><i data-mfm="bar"></i></div><span data-mfm="time">0:00</span></div>' +
      '<div class="mfm-p-ctrls">' + btn('prev') + btn('toggle', 'mfm-main') + btn('next') + btn('mute') +
      '<input type="range" class="mfm-vol" data-mfm="vol" min="0" max="100" step="1" aria-label="Volume"></div>' +
      '<p class="mfm-status" data-mfm="status" aria-live="polite"></p>' +
      '' +
      '<p class="mfm-note mfm-note-v">Músicas completas em vídeos oficiais do YouTube. A faixa e a posição ficam salvas para você retomar após voltar à página; o navegador pode pedir um toque.</p>' +
      '<div class="mfm-video" data-mfm="video"><p class="mfm-ph">O vídeo aparece aqui quando você escolhe o modo de vídeos.</p></div>';
  }
  function buildPanel() {
    var p = D.createElement('div'); p.className = 'mfm mfm-panel'; p.setAttribute('data-mode', S.mode); p.setAttribute('data-mfm', 'panel');
    p.innerHTML = panelHTML(); fillButtons(p); return p;
  }
  function mountPanel(target) {
    var el = typeof target === 'string' ? D.querySelector(target) : target;
    if (!el || !started) return false;
    if (panelHost && panelHost !== el) return false;
    if (panelHost === el) return true;
    var pn = buildPanel(); wire(pn); el.textContent = ''; el.appendChild(pn); panelHost = el;
    fillTrackSelect(); renderAll();
    if (S.mode === 'video' && !yt.iframe) ensureVideo();
    return true;
  }
  function ensureDrawer() {
    if (drawer) return drawer;
    drawer = D.createElement('div'); drawer.id = 'mfm-drawer'; drawer.className = 'mfm mfm-drawer';
    drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-label', 'Painel da trilha sonora'); drawer.hidden = true;
    var x = D.createElement('button'); x.type = 'button'; x.className = 'mfm-btn mfm-drawer-x'; x.setAttribute('data-act', 'close');
    x.innerHTML = icon('close'); x.setAttribute('aria-label', LBL.close);
    drawer.appendChild(x); drawer.appendChild(buildPanel()); wire(drawer); D.body.appendChild(drawer);
    fillTrackSelect(); renderAll();
    return drawer;
  }
  function drawerOpen(open) {
    if (panelHost) return;
    var d = ensureDrawer(); d.hidden = !open;
    [].forEach.call(dock.querySelectorAll('[data-act="panel"]'), function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    layout();
    if (open) { var f = d.querySelector('select'); try { f && f.focus({ preventScroll: true }); } catch (e) {} }
  }
  function openPanel() {
    if (panelHost) {
      try { panelHost.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' }); } catch (e) { panelHost.scrollIntoView(); }
      var f = panelHost.querySelector('select'); try { f && f.focus({ preventScroll: true }); } catch (e) {}
      return;
    }
    ensureDrawer(); drawerOpen(drawer.hidden);
  }

  function wire(root) {
    root.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!b || !root.contains(b)) return;
      var a = b.getAttribute('data-act');
      if (a === 'toggle') toggle();
      else if (a === 'next') next();
      else if (a === 'prev') prev();
      else if (a === 'mute') mute(!S.muted);
      else if (a === 'panel') openPanel();
      else if (a === 'close') { drawerOpen(false); var pb = dock.querySelector('[data-act="panel"]'); try { pb && pb.focus(); } catch (er) {} }
      else if (a === 'min') { S.min = true; if (drawer) drawerOpen(false); applyMin(); try { fab.focus(); } catch (er) {} saveNow(); }
      else if (a === 'restore') { S.min = false; applyMin(); var tb = dock.querySelector('[data-act="toggle"]'); try { tb && tb.focus(); } catch (er) {} saveNow(); }
    });
    root.addEventListener('change', function (e) {
      var k = e.target.getAttribute && e.target.getAttribute('data-mfm');
      if (k === 'mode') setMode(e.target.value);
      else if (k === 'track') selectTrack(+e.target.value);
    });
    root.addEventListener('input', function (e) {
      if (e.target.getAttribute && e.target.getAttribute('data-mfm') === 'vol') setVolume(e.target.value / 100);
    });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root === drawer) { drawerOpen(false); } });
  }

  function applyMin() {
    dock.hidden = !!S.min; fab.hidden = !S.min;
    layout(); renderAll();
  }
  function layout() {
    if (!dock) return;
    var h = S.min ? 0 : (dock.offsetHeight || 0), off = S.min ? 60 : h + 8, r = D.documentElement;
    r.style.setProperty('--mfm-dock-h', h + 'px'); r.style.setProperty('--mfm-off', off + 'px');
    r.classList.toggle('mfm-pad', !S.min);
  }
  function fitTitle() {
    var m = dock && dock.querySelector('.mfm-marq'), t = m && m.firstElementChild;
    if (!m || !t) return;
    m.classList.remove('is-long');
    if (reduced()) return;
    var over = t.scrollWidth - m.clientWidth;
    if (over > 2) { m.style.setProperty('--mfm-shift', '-' + (over + 12) + 'px'); m.style.setProperty('--mfm-dur', Math.max(6, Math.round(t.scrollWidth / 28)) + 's'); m.classList.add('is-long'); }
  }

  function fillTrackSelect() {
    var list = curList(), html = '';
    list.forEach(function (t, i) { html += '<option value="' + i + '">' + (i + 1) + '. ' + esc(t.title) + (S.mode === 'video' && t.artist ? ' — ' + esc(t.artist) : '') + '</option>'; });
    qa('track').forEach(function (s) { s.innerHTML = html; s.value = String(curIdx()); });
  }

  /* ------------------------------------------------------------------ status text */
  function statusText() {
    var t = curTrack();
    if (rt.note) return rt.note;
    if (rt.blocked) return 'Toque em qualquer lugar para ligar a trilha.';
    if (rt.ducked && !rt.playing) return 'Trilha em pausa enquanto o vídeo toca. Ela volta sozinha.';
    if (rt.playing) return 'Tocando: ' + t.title + (S.mode === 'video' && t.artist ? ' — ' + t.artist : '');
    if (S.playing && rt.pending) return 'Carregando…';
    return 'Pausado. Toque em play para ouvir.';
  }
  function notice(msg) {
    rt.note = msg; clearTimeout(rt.noteT); rt.noteT = setTimeout(function () { rt.note = ''; renderAll(); }, 5000);
    emit('notice', msg); renderAll();
  }

  /* ------------------------------------------------------------------ render */
  function renderAll() {
    if (!started) return;
    var t = curTrack(), title = t.title + (S.mode === 'video' && t.artist ? ' — ' + t.artist : '');
    var lbl = rt.playing ? 'Pausar' : 'Tocar';
    qa('title').forEach(function (e) { if (e.textContent !== title) e.textContent = title; });
    qa('ptitle').forEach(function (e) { e.textContent = t.title; });
    qa('partist').forEach(function (e) { e.textContent = S.mode === 'video' ? t.artist : t.artist + ' · trilha original'; });
    qa('status').forEach(function (e) { e.textContent = statusText(); });
    qa('mode').forEach(function (e) { e.value = S.mode; });
    qa('panel').forEach(function (e) { e.setAttribute('data-mode', S.mode); });
    var vs = qa('track'); if (vs.length && vs[0].options.length !== curList().length) fillTrackSelect();
    vs.forEach(function (e) { e.value = String(curIdx()); });
    roots().forEach(function (r) {
      r.classList.toggle('is-playing', rt.playing);
      [].forEach.call(r.querySelectorAll('[data-act="toggle"]'), function (b) { b.setAttribute('aria-label', lbl); b.firstChild && b.firstChild.firstChild && b.firstChild.firstChild.setAttribute('d', ICON[rt.playing ? 'pause' : 'play']); });
      [].forEach.call(r.querySelectorAll('[data-act="mute"]'), function (b) {
        b.setAttribute('aria-label', S.muted ? 'Ativar o som' : 'Silenciar'); b.setAttribute('aria-pressed', S.muted ? 'true' : 'false');
        b.firstChild && b.firstChild.firstChild && b.firstChild.firstChild.setAttribute('d', ICON[S.muted ? 'mute' : 'vol']);
      });
    });
    var pct = Math.round(S.vol * 100);
    qa('vol').forEach(function (e) { if (D.activeElement !== e) e.value = String(pct); e.style.setProperty('--mfm-fill', pct + '%'); e.setAttribute('aria-valuetext', pct + ' por cento'); });
    chip.hidden = !(rt.blocked && !rt.playing);
    renderTime(); fitTitle(); updateMS();
    emit('state', state());
  }
  function timeInfo() {
    var c = 0, d = 0;
    try {
      if (S.mode === 'native') { var a = au(); c = a.readyState >= 1 && a._idx === S.ni && !a._seek ? a.currentTime : S.nt; d = a._idx === S.ni && isFinite(a.duration) ? a.duration : 0; }
      else if (yt.ready && yt.player && yt.player.getCurrentTime) { c = yt.player.getCurrentTime() || 0; d = yt.player.getDuration() || 0; if (yt.vid !== YTL[S.vi].video) { c = S.vt; d = 0; } }
      else c = S.vt;
    } catch (e) {}
    return { c: c || 0, d: d || 0 };
  }
  function renderTime() {
    if (!started) return;
    var ti = timeInfo(), pct = ti.d ? Math.min(100, ti.c / ti.d * 100) : 0;
    qa('bar').forEach(function (e) { e.style.width = pct + '%'; });
    qa('time').forEach(function (e) { e.textContent = fmt(ti.c) + (ti.d ? ' / ' + fmt(ti.d) : ''); });
  }

  /* ------------------------------------------------------------------ persistence */
  function capture() {
    try {
      if (S.mode === 'native') {
        var a = au();
        if (a && a._idx === S.ni && a.readyState >= 1 && !a._seek && isFinite(a.currentTime)) S.nt = a.currentTime;
      } else if (yt.ready && yt.player && yt.player.getCurrentTime && yt.vid === YTL[S.vi].video) {
        var v = yt.player.getCurrentTime(); if (isFinite(v)) S.vt = v;
      }
    } catch (e) {}
  }
  function saveNow() { if (!started) return; capture(); S.ts = Date.now(); if (S.mode === 'video' && YTL[S.vi]) { S.videoId = YTL[S.vi].video; S.playlistVersion = PLAYLIST_VERSION; } saveState(O.storageKey, S); }
  function startTick() { if (!tickT) tickT = setInterval(tick, 1000); }
  function stopTick() { if (tickT) { clearInterval(tickT); tickT = 0; } }
  function tick() { saveNow(); renderTime(); emit('time', { time: timeInfo().c }); }

  function setPlaying(v) {
    v = !!v;
    if (v) { rt.pending = false; rt.blocked = false; rt.err = 0; S.playing = true; disarm(); clearTimeout(rt.bt); }
    if (rt.playing === v) { if (v) renderAll(); return; }
    rt.playing = v;
    if (v) startTick(); else stopTick();
    saveNow(); renderAll(); emit(v ? 'playing' : 'paused', state());
  }

  /* ------------------------------------------------------------------ audio nativo */
  function mkAudio(slot) {
    var a = D.createElement('audio'); a.preload = 'none'; a.hidden = true; a.className = 'mfm-audio';
    a.setAttribute('playsinline', ''); a.setAttribute('data-mfm-slot', slot); a._idx = -1; a._seek = 0;
    a.addEventListener('playing', function () { if (a === au() && S.mode === 'native') { nerr = 0; verr = 0; setPlaying(true); } });
    a.addEventListener('pause', function () {
      if (a !== au() || S.mode !== 'native' || a.ended) return;
      if (!selfPaused() && !rt.ducked) S.playing = false;
      setPlaying(false);
    });
    a.addEventListener('loadedmetadata', function () {
      if (a._seek > 0) { var s = a._seek; a._seek = 0; if (isFinite(a.duration) && s >= a.duration - 0.25) s = 0; try { a.currentTime = s; } catch (e) {} }
      if (a === au()) renderTime();
    });
    a.addEventListener('timeupdate', function () {
      if (a !== au() || S.mode !== 'native') return;
      renderTime();
      if (isFinite(a.duration) && a.duration - a.currentTime <= 6) {
        var n = (S.ni + 1) % NAT.length, sp = spare();
        if (sp._idx !== n) setSrc(sp, n);
      }
    });
    a.addEventListener('ended', function () { if (a === au() && S.mode === 'native') setNative(S.ni + 1, 0, true, true); });
    a.addEventListener('error', function () { if (a === au() && S.mode === 'native' && a.getAttribute('src')) onNativeError(); });
    return a;
  }
  function markActive() { AU.forEach(function (a, i) { a.setAttribute('data-mfm-active', i === act ? '1' : '0'); }); }
  function setSrc(a, i) { markSP(); a._idx = i; a._seek = 0; a.preload = 'auto'; a.src = NAT[i].url; }
  function applyVol() {
    var eff = S.vol * (rt.duckLevel == null ? 1 : rt.duckLevel);
    AU.forEach(function (a) { try { a.volume = clamp(eff, 0, 1); a.muted = S.muted; } catch (e) {} });
    if (yt.ready && yt.player) { try { yt.player.setVolume(Math.round(eff * 100)); if (S.muted) yt.player.mute(); else yt.player.unMute(); } catch (e) {} }
  }
  function setNative(i, seek, play, auto) {
    i = wrap(i, NAT.length); seek = seek || 0; S.ni = i; S.nt = seek;
    var cur = au(), sp = spare();
    if (cur._idx !== i && sp._idx === i && sp.getAttribute('src')) {
      markSP(); try { cur.pause(); } catch (e) {}
      act = 1 - act; markActive(); rt.viaSpare = !!auto;
    } else if (cur._idx !== i) setSrc(cur, i);
    var a = au(); a._seek = seek;
    if (a.readyState >= 1) { var s = a._seek; a._seek = 0; if (Math.abs(a.currentTime - s) > 0.01) { try { a.currentTime = s; } catch (e) {} } }
    applyVol();
    if (play) nativePlay(); else { markSP(); try { a.pause(); } catch (e) {} }
    renderAll(); saveNow();
  }
  function nativePlay() {
    var a = au(), p, my = a._idx;
    rt.pending = true;
    if (!a.getAttribute('src')) setSrc(a, S.ni);
    try { p = a.play(); } catch (e) { p = Promise.reject(e); }
    return Promise.resolve(p).then(function () { rt.viaSpare = false; return true; }, function (e) {
      var name = e && e.name;
      if (name === 'AbortError') return false;
      if (a !== au() || a._idx !== my) return false; /* resposta atrasada de uma faixa que ja foi trocada */
      if (name === 'NotAllowedError') {
        if (rt.viaSpare) { /* Safari/iOS: o elemento reserva nao foi liberado; usa o que ja tocou */
          rt.viaSpare = false; var old = spare(); act = 1 - act; markActive(); setSrc(old, S.ni); old._seek = 0;
          return nativePlay();
        }
        rt.pending = false; onBlocked(); return false;
      }
      rt.pending = false; onNativeError(); return false;
    });
  }
  var nerr = 0, lastErr = { i: -1, t: 0 };
  function onNativeError() {
    if (lastErr.i === S.ni && Date.now() - lastErr.t < 1500) return; /* 'error' + rejeicao do play() = um so salto */
    lastErr = { i: S.ni, t: Date.now() };
    nerr++;
    if (nerr >= NAT.length) { nerr = 0; S.playing = false; setPlaying(false); notice('Não foi possível carregar a trilha agora. Tente de novo mais tarde.'); return; }
    notice('A faixa “' + NAT[S.ni].title + '” não carregou. Pulando para a próxima.');
    setNative(S.ni + 1, 0, S.playing && !rt.ducked);
  }

  /* ------------------------------------------------------------------ YouTube (lazy) */
  function loadAPI(cb) {
    if (W.YT && W.YT.Player) { cb(); return; }
    yt.cbs.push(cb);
    if (yt.apiLoading) return;
    yt.apiLoading = true;
    var prev = W.onYouTubeIframeAPIReady;
    W.onYouTubeIframeAPIReady = function () {
      try { if (typeof prev === 'function') prev(); } catch (e) {}
      var l = yt.cbs.splice(0); l.forEach(function (f) { try { f(); } catch (e) {} });
    };
    if (!D.getElementById('mfm-yt-api') && !D.querySelector('script[src*="youtube.com/iframe_api"]')) {
      var s = D.createElement('script'); s.id = 'mfm-yt-api'; s.async = true; s.src = 'https://www.youtube.com/iframe_api';
      s.onerror = function () { yt.apiLoading = false; notice('Não foi possível carregar o player de vídeo. Verifique a conexão.'); };
      (D.head || D.documentElement).appendChild(s);
    }
  }
  function videoHost() {
    if (panelHost) return panelHost.querySelector('[data-mfm="video"]');
    ensureDrawer(); drawerOpen(true);
    return drawer.querySelector('[data-mfm="video"]');
  }
  function ensureVideo() {
    if (yt.iframe) return true;
    var host = videoHost(); if (!host) return false;
    var t = YTL[S.vi], q = ['enablejsapi=1', 'playsinline=1', 'controls=1', 'rel=0', 'modestbranding=1'];
    if (location.origin && location.origin !== 'null') q.push('origin=' + encodeURIComponent(location.origin));
    var st = Math.floor(S.vt || 0); if (st > 0) q.push('start=' + st);
    if (S.playing && !rt.ducked) q.push('autoplay=1');
    var f = D.createElement('iframe'); f.className = 'mfm-yt';
    f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(t.video) + '?' + q.join('&');
    f.title = 'Player de vídeo: ' + t.title + (t.artist ? ' — ' + t.artist : '');
    f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen'); f.setAttribute('allowfullscreen', '');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    host.appendChild(f); host.classList.add('mfm-has-video');
    yt.iframe = f; yt.vid = t.video; yt.ready = false;
    loadAPI(function () {
      try { yt.player = new W.YT.Player(f, { events: { onReady: ytReady, onStateChange: ytState, onError: ytError } }); }
      catch (e) { notice('Não foi possível iniciar o player de vídeo.'); }
    });
    return true;
  }
  function ytReady() {
    yt.ready = true; applyVol();
    if (yt.want) { var w = yt.want; yt.want = null; loadVideo(w.id, w.seek, w.play); }
    else if (S.mode === 'video' && (S.playing || yt.playWhenReady) && !rt.ducked) videoPlay();
    yt.playWhenReady = false; renderAll();
  }
  function loadVideo(id, seek, play) {
    try { var cfg = { videoId: id, startSeconds: seek || 0 }; if (play) yt.player.loadVideoById(cfg); else yt.player.cueVideoById(cfg); } catch (e) {}
    yt.vid = id; if (play) armBlockedTimer();
  }
  function armBlockedTimer() {
    clearTimeout(rt.bt);
    rt.bt = setTimeout(function () { if (S.mode === 'video' && S.playing && !rt.playing && !rt.ducked && !rt.buffering) onBlocked(); }, 3500);
  }
  function videoPause() { markSP(); yt.playWhenReady = false; clearTimeout(rt.bt); try { if (yt.ready && yt.player) yt.player.pauseVideo(); } catch (e) {} }
  function videoPlay() {
    rt.pending = true;
    if (!yt.iframe && !ensureVideo()) { rt.pending = false; onBlocked(); return Promise.resolve(false); }
    if (!yt.ready) { yt.playWhenReady = true; armBlockedTimer(); return Promise.resolve(true); }
    try { yt.player.playVideo(); } catch (e) {}
    armBlockedTimer(); return Promise.resolve(true);
  }
  function ytState(e) {
    var d = e && e.data;
    if (d === 1) {
      rt.buffering = false;
      if (S.mode !== 'video') { markSP(); AU.forEach(function (a) { try { a.pause(); } catch (er) {} }); S.mode = 'video'; fillTrackSelect(); }
      setPlaying(true);
    } else if (d === 2) {
      rt.buffering = false;
      if (S.mode === 'video') { if (!selfPaused() && !rt.ducked) S.playing = false; setPlaying(false); }
    } else if (d === 3) rt.buffering = true;
    else if (d === 0 && S.mode === 'video') { setVideo(S.vi + 1, 0, true); }
  }
  var verr = 0;
  function ytError() {
    verr++;
    if (verr >= YTL.length) { verr = 0; S.playing = false; setPlaying(false); notice('Nenhum vídeo pôde ser carregado agora.'); return; }
    notice('Este vídeo não está disponível aqui. Pulando para o próximo.');
    var play = S.playing && !rt.ducked; setTimeout(function () { setVideo(S.vi + 1, 0, play); }, 500);
  }
  function setVideo(i, seek, play) {
    i = wrap(i, YTL.length); S.vi = i; S.vt = seek || 0;
    var t = YTL[i];
    if (!yt.iframe) { if (S.mode === 'video') { if (play) S.playing = true; ensureVideo(); } }
    else {
      if (yt.iframe) yt.iframe.title = 'Player de vídeo: ' + t.title + (t.artist ? ' — ' + t.artist : '');
      if (yt.ready) loadVideo(t.video, seek || 0, play); else yt.want = { id: t.video, seek: seek || 0, play: !!play };
    }
    if (play) rt.pending = true;
    renderAll(); saveNow();
  }

  /* ------------------------------------------------------------------ autoplay honesto */
  var G_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'keydown', 'click'];
  function arm() {
    if (rt.armed) return;
    var opt = { capture: true, passive: true };
    var h = function (e) {
      if (e.type === 'touchstart') { var p = e.touches && e.touches[0]; rt.moved = false; if (p) { rt.tx = p.clientX; rt.ty = p.clientY; } return; }
      if (e.type === 'touchmove') { var q = e.touches && e.touches[0]; if (q && (Math.abs(q.clientX - rt.tx) > 10 || Math.abs(q.clientY - rt.ty) > 10)) rt.moved = true; return; }
      onGesture(e);
    };
    var evs = G_EVENTS.concat(['touchstart', 'touchmove']);
    evs.forEach(function (n) { D.addEventListener(n, h, opt); });
    rt.armed = function () { evs.forEach(function (n) { D.removeEventListener(n, h, opt); }); };
  }
  function disarm() { if (rt.armed) { rt.armed(); rt.armed = null; } }
  function onGesture(e) {
    if (e.type === 'pointerdown' && e.pointerType === 'touch') return;
    if (e.type === 'touchend' && rt.moved) { rt.moved = false; return; }
    if (rt.ducked) return;
    var t = e.target;
    if (t && t.closest) { var b = t.closest('[data-act="toggle"]'); if (b && roots().some(function (r) { return r.contains(b); })) return; }
    disarm();
    if (!S.playing) return;
    enginePlay().then(function (ok) { if (!ok && rt.blocked) arm(); });
  }
  function onBlocked() {
    if (!S.playing) return;
    var first = !rt.blocked;
    rt.blocked = true; rt.pending = false; arm(); renderAll();
    if (first) emit('blocked', { reason: 'autoplay' });
  }

  /* ------------------------------------------------------------------ controle */
  function enginePlay() {
    if (S.mode === 'video') return videoPlay();
    return nativePlay();
  }
  function enginePause() {
    markSP();
    AU.forEach(function (a) { try { a.pause(); } catch (e) {} });
    videoPause();
  }
  function play() {
    S.playing = true; if (rt.ducked) rt.duckWas = false;
    return enginePlay();
  }
  function pause() {
    S.playing = false; if (rt.ducked) rt.duckWas = false;
    rt.blocked = false; rt.pending = false; disarm(); enginePause();
    if (rt.playing) setPlaying(false); else { saveNow(); renderAll(); }
    return true;
  }
  function toggle() { return rt.playing ? pause() : play(); }
  function step(d) {
    S.playing = true; if (rt.ducked) rt.duckWas = false;
    if (S.mode === 'video') setVideo(S.vi + d, 0, true); else setNative(S.ni + d, 0, true);
  }
  function next() { step(1); }
  function prev() { step(-1); }
  function selectTrack(i) {
    S.playing = true;
    if (S.mode === 'video') setVideo(i, 0, true); else setNative(i, 0, true);
  }
  function setMode(m) {
    if (m !== 'video') return false;
    if (m === S.mode) { renderAll(); return true; }
    var was = rt.playing || (S.playing && (rt.blocked || rt.pending));
    saveNow(); enginePause();
    S.mode = m; rt.blocked = false; disarm();
    fillTrackSelect();
    if (m === 'video') {
      ensureVideo();
      if (yt.iframe && yt.ready && yt.vid !== YTL[S.vi].video) loadVideo(YTL[S.vi].video, S.vt, false);
      else if (yt.iframe && !yt.ready && yt.vid !== YTL[S.vi].video) yt.want = { id: YTL[S.vi].video, seek: S.vt, play: false };
      if (was) videoPlay();
    } else {
      setNative(S.ni, S.nt, false);
      if (was) nativePlay();
    }
    if (rt.playing) setPlaying(false);
    renderAll(); saveNow();
    return true;
  }
  function setVolume(v) {
    S.vol = clamp(v, 0, 1); if (S.vol > 0 && S.muted) S.muted = false;
    applyVol(); renderAll(); saveNow();
  }
  function mute(m) { S.muted = !!m; applyVol(); renderAll(); saveNow(); }
  function duck(f, o) {
    f = !!f;
    if (f === rt.ducked) return;
    rt.ducked = f;
    if (f) {
      rt.duckWas = rt.playing || rt.pending;
      if (o && typeof o.volume === 'number') { rt.duckMode = 'lower'; rt.duckLevel = clamp(o.volume, 0, 1); applyVol(); }
      else { rt.duckMode = 'pause'; if (rt.playing || rt.pending) { rt.pending = false; enginePause(); if (rt.playing) setPlaying(false); } }
    } else {
      var was = rt.duckWas; rt.duckWas = false;
      if (rt.duckMode === 'lower') { rt.duckLevel = null; applyVol(); }
      else if (S.playing && !rt.playing && (was || rt.blocked)) enginePlay();
      rt.duckMode = null;
    }
    renderAll();
  }

  /* ------------------------------------------------------------------ Media Session */
  function setupMS() {
    if (!('mediaSession' in navigator)) return;
    var ms = navigator.mediaSession;
    [['play', play], ['pause', pause], ['previoustrack', prev], ['nexttrack', next]].forEach(function (p) { try { ms.setActionHandler(p[0], p[1]); } catch (e) {} });
  }
  function updateMS() {
    if (!('mediaSession' in navigator)) return;
    try {
      var t = curTrack();
      if (typeof W.MediaMetadata === 'function') navigator.mediaSession.metadata = new W.MediaMetadata({ title: t.title, artist: t.artist, album: O.heading });
      navigator.mediaSession.playbackState = rt.playing ? 'playing' : 'paused';
    } catch (e) {}
  }

  /* ------------------------------------------------------------------ state() */
  function state() {
    if (!started) return { ready: false };
    var t = curTrack(), ti = timeInfo();
    return {
      ready: true, mode: S.mode, playing: rt.playing, paused: !rt.playing, wantPlay: S.playing, blocked: rt.blocked, ducked: rt.ducked,
      minimized: S.min, index: curIdx(), nativeIndex: S.ni, videoIndex: S.vi, nativeTime: S.nt, videoTime: S.vt,
      track: { title: t.title, artist: t.artist, id: t.id, index: curIdx() }, time: ti.c, duration: ti.d,
      volume: S.vol, muted: S.muted, counts: { native: NAT.length, video: YTL.length }, videoLoaded: !!yt.iframe
    };
  }

  /* ------------------------------------------------------------------ bootstrap */
  function idle(fn) { if (W.requestIdleCallback) W.requestIdleCallback(fn, { timeout: 1500 }); else setTimeout(fn, 1); }
  function start() {
    var saved = loadState(O.storageKey);
    S = mergeState(saved);
    injectCSS();
    var pad = 0; try { pad = parseFloat(W.getComputedStyle(D.body).paddingBottom) || 0; } catch (e) {}
    D.documentElement.style.setProperty('--mfm-pad0', pad + 'px');
    AU = [mkAudio(0), mkAudio(1)]; AU.forEach(function (a) { D.body.appendChild(a); }); act = 0; markActive();
    started = true;
    buildDock();
    var target = O.mountPanel || (D.querySelector('#mf-music-panel') ? '#mf-music-panel' : null);
    if (target) mountPanel(target);
    fillTrackSelect(); applyVol(); applyMin(); setupMS();
    if (W.ResizeObserver) { ro = new W.ResizeObserver(layout); ro.observe(dock); }
    var onResize = function () { layout(); fitTitle(); };
    W.addEventListener('resize', onResize);
    var save = function () { saveNow(); };
    var vis = function () { if (D.visibilityState === 'hidden') saveNow(); };
    var show = function (e) { if (e.persisted && S.playing && !rt.playing && !rt.ducked) enginePlay(); };
    W.addEventListener('pagehide', save); W.addEventListener('beforeunload', save);
    D.addEventListener('visibilitychange', vis); W.addEventListener('pageshow', show);
    lifecycle = [['resize', onResize, W], ['pagehide', save, W], ['beforeunload', save, W], ['visibilitychange', vis, D], ['pageshow', show, W]];
    if (S.mode === 'video') { if (panelHost) ensureVideo(); }
    else setNative(S.ni, S.nt, false);
    var wantPlay = S.playing;
    renderAll();
    var q = pend.splice(0); q.forEach(function (f) { try { f(); } catch (e) {} });
    emit('ready', state());
    if (wantPlay && !rt.playing) {
      if (S.mode === 'video' && !panelHost) onBlocked(); else enginePlay();
    }
  }

  function destroy() {
    if (!started) return;
    stopTick(); disarm(); enginePause(); clearTimeout(rt.bt); clearTimeout(rt.noteT);
    lifecycle.forEach(function (l) { l[2].removeEventListener(l[0], l[1]); });
    if (ro) ro.disconnect();
    [dock, fab, chip, drawer].forEach(function (e) { e && e.parentNode && e.parentNode.removeChild(e); });
    if (panelHost) panelHost.textContent = '';
    AU.forEach(function (a) { a.removeAttribute('src'); a.parentNode && a.parentNode.removeChild(a); });
    if (yt.iframe && yt.iframe.parentNode) yt.iframe.parentNode.removeChild(yt.iframe);
    var r = D.documentElement; r.classList.remove('mfm-pad'); r.style.removeProperty('--mfm-off'); r.style.removeProperty('--mfm-dock-h');
    started = false; dock = fab = chip = drawer = panelHost = null; yt.iframe = yt.player = null; yt.ready = false;
    rt.playing = rt.blocked = rt.ducked = false; delete W.__mfMusic;
  }

  function init(o) {
    if (W.__mfMusic) { if (started && o && o.mountPanel) mountPanel(o.mountPanel); return api; }
    W.__mfMusic = api;
    O = normalize(o || {}); NAT = O.native; YTL = O.youtube;
    var go = function () { idle(function () { try { start(); } catch (e) { started = false; emit('notice', 'Falha ao iniciar a trilha.'); } }); };
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go, { once: true }); else go();
    return api;
  }

  /* chamadas feitas antes do init terminar ficam na fila */
  function q(fn) { return function () { var a = arguments; if (started) return fn.apply(null, a); pend.push(function () { fn.apply(null, a); }); return false; }; }

  var api = {
    __mfm: 1, version: '2.0.0',
    init: init, on: on, off: off, state: state,
    play: q(play), pause: q(pause), toggle: q(toggle), next: q(next), prev: q(prev),
    setMode: q(setMode), duck: q(duck), setVolume: q(setVolume), mute: q(mute), selectTrack: q(selectTrack),
    lists: function () { return { native: (NAT || NATIVE_DEFAULT).slice(), youtube: (YTL || YT_DEFAULT).slice() }; },
    openPanel: q(openPanel), mountPanel: function (t) { return started ? mountPanel(t) : false; }, destroy: destroy
  };
  W.MFMusic = api;
})();
