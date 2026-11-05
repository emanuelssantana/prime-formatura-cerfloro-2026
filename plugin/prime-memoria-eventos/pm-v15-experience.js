/**
 * PRIME MEMÓRIA EVENTOS — v15 Experience, Players, 3D, Animated Borders & Extensão Março/2026
 * Author: Antigravity Dell G3
 * Non-destructive additive module engineered to layer cleanly on top of v0.3.0.
 */
(function () {
  "use strict";

  const M26_JSON_URL = "/wp-content/plugins/prime-memoria-eventos/edicao-marco-2026.public.json";
  const M26_UPLOAD_BASE = "https://primeformatura.com.br/wp-content/uploads/cerfloro-2026/edicao-marco-2026";

  const CYCLING_REPLACEMENTS = [
    [/Ciclismo\s*Hard\s*&\s*MTB/gi, "Energia & Ciência Florestal"],
    [/Ciclismo\s*&\s*Pelot[aã]o/gi, "Auditório & Comunidade UNIR"],
    [/Ciclismo\s*de\s*Estrada/gi, "Jornada Acadêmica UNIR"],
    [/Rock\s*Ciclismo/gi, "Rock Instrumental"],
    [/Sprint\s*&\s*MTB/gi, "Dinâmica & Inovação"],
    [/Trilha\s*&\s*MTB/gi, "Manejo & Floresta"],
    [/MTB\s*&\s*Aventura/gi, "Campo & Bioeconomia"],
    [/Staff\s*Moto/gi, "Bastidores & Equipe Prime"],
    [/\bCiclismo\b/gi, "Congresso"],
    [/\bMTB\b/gi, "UNIR"],
    [/\bCorrida\b/gi, "Encontro"],
    [/\bPelot[aã]o\b/gi, "Comunidade"]
  ];

  function sanitizeTextString(str) {
    if (!str || typeof str !== "string") return str;
    let out = str;
    for (const [regex, repl] of CYCLING_REPLACEMENTS) {
      out = out.replace(regex, repl);
    }
    return out;
  }

  /* 1. Sanitize MFMusic tracks & DOM labels in runtime */
  function sanitizeMusicRuntime() {
    try {
      if (window.MFMusic && Array.isArray(window.MFMusic.tracks)) {
        window.MFMusic.tracks.forEach((t) => {
          if (t.name) t.name = sanitizeTextString(t.name);
          if (t.cat) t.cat = sanitizeTextString(t.cat);
          if (t.title) t.title = sanitizeTextString(t.title);
        });
      }
      const selectors = [
        "#mfd-title",
        ".mfd-sub",
        "#mf-music-panel .mfp-item",
        "#mf-music-panel .mfp-name",
        "#mf-music-panel .mfp-cat",
        ".char-card .btn-theme"
      ];
      document.querySelectorAll(selectors.join(",")).forEach((el) => {
        if (el.childNodes && el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
          const clean = sanitizeTextString(el.textContent);
          if (clean !== el.textContent) el.textContent = clean;
        } else if (el.innerHTML) {
          const cleanHtml = sanitizeTextString(el.innerHTML);
          if (cleanHtml !== el.innerHTML) el.innerHTML = cleanHtml;
        }
      });
    } catch (e) {
      /* ignore */
    }
  }

  /* 2. Smart Audio/Video Coordination & Mobile Dock Minimize Button */
  function initSmartMediaCoordination() {
    const activeMedia = new Set();

    function updateDuckingState() {
      const hasActiveMedia = activeMedia.size > 0;
      if (window.AudioManager && typeof window.AudioManager.duck === "function") {
        window.AudioManager.duck(hasActiveMedia);
      }
      // Also directly duck any MFMusic <audio> element if playing
      document.querySelectorAll("audio").forEach((aud) => {
        if (!aud.closest("#pm-speakers") && !aud.dataset.isVoice) {
          if (hasActiveMedia && !aud.paused) {
            aud.dataset.prevVol = aud.volume || 1;
            aud.volume = 0.12;
          } else if (!hasActiveMedia && aud.dataset.prevVol) {
            aud.volume = parseFloat(aud.dataset.prevVol) || 0.85;
            delete aud.dataset.prevVol;
          }
        }
      });

      const dock = document.getElementById("mf-music-dock");
      if (dock) {
        let badge = dock.querySelector(".pm-ducking-indicator");
        if (hasActiveMedia) {
          if (!badge) {
            badge = document.createElement("span");
            badge.className = "pm-ducking-indicator";
            badge.textContent = "🔊 Vídeo/Voz em foco";
            dock.appendChild(badge);
          }
        } else if (badge) {
          badge.remove();
        }
      }
    }

    document.addEventListener(
      "play",
      (e) => {
        const el = e.target;
        if (!(el instanceof HTMLMediaElement)) return;
        if (el.classList.contains("pm-bg-drone-video") || el.muted) return;

        // Pause any other foreground <video> so two videos never clash
        if (el.tagName === "VIDEO") {
          document.querySelectorAll("video").forEach((v) => {
            if (v !== el && !v.classList.contains("pm-bg-drone-video") && !v.paused) {
              v.pause();
            }
          });
          activeMedia.add(el);
          updateDuckingState();
        }
      },
      true
    );

    ["pause", "ended", "emptied"].forEach((evtName) => {
      document.addEventListener(
        evtName,
        (e) => {
          const el = e.target;
          if (activeMedia.has(el)) {
            activeMedia.delete(el);
            updateDuckingState();
          }
        },
        true
      );
    });

    // Enhance #mf-music-dock with a minimize/expand button for mobile ergonomics
    function enhanceMusicDock() {
      const dock = document.getElementById("mf-music-dock");
      if (!dock || dock.querySelector(".pm-dock-toggle-btn")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pm-dock-toggle-btn";
      btn.setAttribute("aria-label", "Minimizar ou expandir player musical");
      btn.title = "Minimizar / Expandir player";
      btn.textContent = "–";
      btn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const min = dock.classList.toggle("pm-dock-minimized");
        btn.textContent = min ? "🎵" : "–";
      });
      dock.appendChild(btn);
    }

    enhanceMusicDock();
    setInterval(() => {
      sanitizeMusicRuntime();
      enhanceMusicDock();
    }, 1800);
  }

  /* 3. Enhance Sticky Header, Chapter Bar & Footer */
  function enhanceHeaderAndFooter() {
    const topNav = document.querySelector(".pm-nav nav");
    if (topNav && !topNav.querySelector('a[href="#memoria-marco-2026"]')) {
      const link = document.createElement("a");
      link.href = "#memoria-marco-2026";
      link.className = "pm-nav-highlight-m26";
      link.textContent = "🌱 I Congresso & V Semana (Mar/26)";
      const mapLink = topNav.querySelector('a[href="#mapa-do-site-prime"]');
      if (mapLink) {
        topNav.insertBefore(link, mapLink);
      } else {
        topNav.appendChild(link);
      }
    }

    const chapterNav = document.querySelector(".pm-chapter-nav");
    if (chapterNav && !chapterNav.querySelector('a[href="#memoria-marco-2026"]')) {
      const chLink = document.createElement("a");
      chLink.href = "#memoria-marco-2026";
      chLink.textContent = "06 · I Congresso & V Semana (Mar/26 · CREA-RO & IFRO)";
      const faqLink = chapterNav.querySelector('a[href="#perguntas"]');
      if (faqLink) {
        faqLink.textContent = "07 · FAQ (11)";
        chapterNav.insertBefore(chLink, faqLink);
      } else {
        chapterNav.appendChild(chLink);
      }
    }

    // Also add link in Footer sitemap
    const footerLists = document.querySelectorAll(".pm-sitemap-grid ul");
    if (footerLists.length >= 2) {
      const secondList = footerLists[1];
      if (!secondList.querySelector('a[href*="#memoria-marco-2026"]')) {
        const li = document.createElement("li");
        li.innerHTML =
          '<a href="#memoria-marco-2026" style="color:#ffd284;font-weight:700">🌱 Extensão Março/2026: I Congresso &amp; V Semana Acadêmica (UNIR · CREA-RO · IFRO Ji-Paraná)</a>';
        secondList.appendChild(li);
      }
    }
    if (footerLists.length >= 3) {
      const thirdList = footerLists[2];
      if (!thirdList.querySelector('a[href*="daefrm.unir.br"]')) {
        const liUnir = document.createElement("li");
        liUnir.innerHTML =
          '<a href="https://daefrm.unir.br/" target="_blank" rel="noopener">DAEFRM · Engenharia Florestal UNIR Rolim de Moura ↗</a>';
        thirdList.appendChild(liUnir);
        const liInstaUnir = document.createElement("li");
        liInstaUnir.innerHTML =
          '<a href="https://www.instagram.com/engenhariaflorestal.unir/" target="_blank" rel="noopener">Instagram @engenhariaflorestal.unir ↗</a>';
        thirdList.appendChild(liInstaUnir);
        const liInstaManu = document.createElement("li");
        liInstaManu.innerHTML =
          '<a href="https://www.instagram.com/manu.fotografias.ro/" target="_blank" rel="noopener">Instagram @manu.fotografias.ro ↗</a>';
        thirdList.appendChild(liInstaManu);
      }
    }
  }

  /* 4. 3D Interactive Tilt on Desktop & Touch Swipe on Mobile */
  function init3DTiltAndSwipe() {
    const isFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    if (isFinePointer) {
      document.addEventListener("pointermove", (e) => {
        const card = e.target.closest(
          ".char-card .mf-frame, .mfx-brand-card, .pm-m26-card, .pm-m26-pillar, .pm-m26-insta-card"
        );
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--rx", `${(-y * 5.5).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${(x * 5.5).toFixed(2)}deg`);
        card.classList.add("pm-tilt-active");
      });

      document.addEventListener(
        "pointerleave",
        (e) => {
          if (!(e.target instanceof Element)) return;
          const card = e.target.closest(".pm-tilt-active");
          if (card) {
            card.classList.remove("pm-tilt-active");
            card.style.removeProperty("--rx");
            card.style.removeProperty("--ry");
          }
        },
        true
      );
    }

    // Touch swipe helper for any stage with prev/next buttons
    let touchStartX = 0;
    let touchStartY = 0;
    let touchTarget = null;

    document.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches || e.touches.length !== 1) return;
        const stage = e.target.closest(
          ".char-stage, #pm-hero-carousel .hero-deck-stage, .pm-m26-deck-stage, .pm-m26-card-stage"
        );
        if (!stage) return;
        touchTarget = stage;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (e) => {
        if (!touchTarget || !e.changedTouches || e.changedTouches.length !== 1) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const stage = touchTarget;
        touchTarget = null;
        if (Math.abs(dx) < 38 || Math.abs(dx) < Math.abs(dy) * 1.2) return;

        if (stage.classList.contains("char-stage") || stage.classList.contains("pm-m26-card-stage")) {
          const prevBtn = stage.querySelector(".char-prev, .is-prev");
          const nextBtn = stage.querySelector(".char-next, .is-next");
          if (dx < 0 && nextBtn) nextBtn.click();
          if (dx > 0 && prevBtn) prevBtn.click();
        } else if (stage.closest("#pm-hero-carousel")) {
          const prevBtn = document.getElementById("hdc-prev");
          const nextBtn = document.getElementById("hdc-next");
          if (dx < 0 && nextBtn) nextBtn.click();
          if (dx > 0 && prevBtn) prevBtn.click();
        } else if (stage.classList.contains("pm-m26-deck-stage")) {
          const wrap = stage.closest(".pm-m26-deck-wrap");
          const prevBtn = wrap && wrap.querySelector('[data-m26-deck="prev"]');
          const nextBtn = wrap && wrap.querySelector('[data-m26-deck="next"]');
          if (dx < 0 && nextBtn) nextBtn.click();
          if (dx > 0 && prevBtn) prevBtn.click();
        }
      },
      { passive: true }
    );
  }

  /* 5. Open Photo in Main Lightbox (#pm-lightbox) */
  function openInLightbox(url, captionText) {
    const dlg = document.getElementById("pm-lightbox");
    if (!dlg) {
      window.open(url, "_blank", "noopener");
      return;
    }
    const img = dlg.querySelector("img");
    const cap = dlg.querySelector("p");
    if (img) {
      img.src = url;
      img.alt = captionText || "Fotografia do acervo Engenharia Florestal UNIR";
    }
    if (cap) {
      cap.textContent = captionText || "";
    }
    if (typeof dlg.showModal === "function") {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute("open", "open");
    }
  }

  /* 6. Build & Hydrate Extension Section: #memoria-marco-2026 */
  async function initMarco2026Extension() {
    if (document.getElementById("memoria-marco-2026")) return;

    const anchorTarget =
      document.getElementById("historia") ||
      document.getElementById("equipe") ||
      document.getElementById("perguntas");
    if (!anchorTarget || !anchorTarget.parentNode) return;

    const section = document.createElement("section");
    section.className = "pm-section pm-m26-section";
    section.id = "memoria-marco-2026";
    section.setAttribute(
      "aria-label",
      "Extensão Histórica: I Congresso e V Semana Acadêmica de Engenharia Florestal — 10 a 12 de Março de 2026"
    );

    section.innerHTML = `
      <div class="pm-m26-hero-box">
        <div class="pm-m26-hero-copy">
          <div class="pm-m26-badges">
            <span class="pm-m26-badge is-gold">🌱 EXTENSÃO HISTÓRICA · ONDE TUDO COMEÇOU EM 2026</span>
            <span class="pm-m26-badge">10 A 12 DE MARÇO DE 2026</span>
            <span class="pm-m26-badge is-green">UNIR ROLIM DE MOURA · CREA-RO · IFRO JI-PARANÁ</span>
          </div>
          <p class="pm-eyebrow">CAPÍTULO ESPECIAL DE MEMÓRIA · COBERTURA MANU FOTOGRAFIAS &amp; PRIME FORMATURA</p>
          <h2>Do I Encontro &amp; V Semana Acadêmica em Março<br><em>à consolidação no II CERFloRO.</em></h2>
          <p>Antes de nos reunirmos em novembro para o II CERFloRO, o ano de 2026 começou com três dias intensos entre <strong>10, 11 e 12 de março de 2026</strong> no Campus de Rolim de Moura da <strong>UNIR</strong>: a <strong>V Semana Acadêmica de Engenharia Florestal &amp; Ciclo Precursor do Congresso Florestal (Desafios, Bioeconomia e Empreendedorismo em Rondônia)</strong>.</p>
          <p>Foram <strong>749 fotografias originais</strong> e <strong>7 vídeos</strong> documentando a mesa solene com autoridades do <strong>CREA-RO</strong>, palestras magnas, dinâmicas práticas de grupo e o histórico encerramento integrado entre as delegações da <strong>UNIR Rolim de Moura</strong> e do <strong>IFRO Campus Ji-Paraná</strong>.</p>
          <div class="pm-m26-stats-row">
            <div class="pm-m26-stat">
              <strong>749</strong>
              <span>Registros nos 3 Dias (10 a 12/03)</span>
            </div>
            <div class="pm-m26-stat">
              <strong>112</strong>
              <span>Fotos Destaques Curadas</span>
            </div>
            <div class="pm-m26-stat">
              <strong>7</strong>
              <span>Filmes com Som Original</span>
            </div>
            <div class="pm-m26-stat">
              <strong>3</strong>
              <span>Instituições (UNIR · CREA-RO · IFRO)</span>
            </div>
          </div>
          <div class="pm-actions">
            <a class="pm-button" href="#pm-m26-galeria">Explorar os 112 Destaques de Março ↓</a>
            <a class="pm-link" href="#pm-m26-filmes">Assistir aos 7 vídeos (inclui Encerramento IFRO &amp; UNIR) ↓</a>
          </div>
        </div>

        <div class="pm-m26-deck-wrap" aria-label="Carrossel 3D de Destaques de Março de 2026">
          <div class="pm-m26-deck-stage" id="pm-m26-deck-stage"></div>
          <div class="pm-m26-deck-ctrls">
            <button type="button" data-m26-deck="prev" aria-label="Foto anterior de março">←</button>
            <button type="button" data-m26-deck="toggle" id="pm-m26-deck-toggle" aria-pressed="false">⏸ Pausar</button>
            <button type="button" data-m26-deck="next" aria-label="Próxima foto de março">→</button>
          </div>
        </div>
      </div>

      <div class="pm-m26-pillars-grid" aria-label="Linha do tempo dos 3 dias de março de 2026">
        <article class="pm-m26-pillar">
          <div class="pm-m26-pillar-head">
            <span class="pm-m26-pillar-day">DIA 1 · 10 DE MARÇO DE 2026</span>
            <span class="pm-m26-pillar-count">197 fotos · 31 destaques · 2 vídeos</span>
          </div>
          <h3>Solenidade de Abertura, Autoridades do CREA-RO &amp; Recepção</h3>
          <p>Credenciamento oficial pela manhã, entrega de pastas e crachás, mesa redonda de abertura com lideranças acadêmicas, docentes e representantes do <strong>CREA-RO</strong>, seguida de palestras técnicas e coffee break no auditório da UNIR Rolim de Moura.</p>
          <div class="pm-m26-pillar-tags">
            <span>CREA-RO</span>
            <span>Credenciamento</span>
            <span>Mesa de Honra</span>
            <span>Auditório UNIR</span>
          </div>
        </article>

        <article class="pm-m26-pillar">
          <div class="pm-m26-pillar-head">
            <span class="pm-m26-pillar-day">DIA 2 · 11 DE MARÇO DE 2026</span>
            <span class="pm-m26-pillar-count">265 fotos · 46 destaques · 4 vídeos</span>
          </div>
          <h3>Dinâmicas Acadêmicas, Bioeconomia &amp; Protagonismo Estudantil</h3>
          <p>Segundo dia marcado por intensas dinâmicas coletivas no palco e no auditório, debates sobre bioeconomia e empreendedorismo florestal em Rondônia, sorteios, apresentações práticas e engajamento das turmas de Engenharia Florestal.</p>
          <div class="pm-m26-pillar-tags">
            <span>Dinâmicas de Grupo</span>
            <span>Bioeconomia</span>
            <span>Empreendedorismo</span>
            <span>Práticas Florestais</span>
          </div>
        </article>

        <article class="pm-m26-pillar">
          <div class="pm-m26-pillar-head">
            <span class="pm-m26-pillar-day">DIA 3 · 12 DE MARÇO DE 2026</span>
            <span class="pm-m26-pillar-count">287 fotos · 35 destaques · 1 filme</span>
          </div>
          <h3>União Histórica IFRO Ji-Paraná &amp; UNIR Rolim de Moura</h3>
          <p>Jornada de encerramento celebrando o intercâmbio entre os estudantes e professores de Engenharia Florestal do <strong>IFRO Campus Ji-Paraná</strong> e da <strong>UNIR Campus Rolim de Moura</strong>, com dinâmicas finais, premiações e registro coletivo histórico.</p>
          <div class="pm-m26-pillar-tags">
            <span>IFRO Ji-Paraná</span>
            <span>UNIR Rolim de Moura</span>
            <span>Encerramento Oficial</span>
            <span>Integração Estadual</span>
          </div>
        </article>
      </div>

      <div id="pm-m26-storycards-wrap">
        <p class="pm-eyebrow">MEMÓRIA VIVA EM MOVIMENTO · 6 COLEÇÕES INTERATIVAS DE MARÇO/2026</p>
        <h3>Momentos que prepararam o caminho</h3>
        <p>Arraste para o lado no celular ou use as setas em cada cartão para navegar pelas séries fotográficas dos dias 10, 11 e 12 de março de 2026.</p>
        <div class="pm-m26-storycards-grid" id="pm-m26-storycards"></div>
      </div>

      <div id="pm-m26-filmes">
        <p class="pm-eyebrow">CINEMA DOCUMENTAL · 7 VÍDEOS ORIGINAIS DE 10 A 12 DE MARÇO DE 2026</p>
        <h3>A energia das dinâmicas e o encerramento <em>IFRO &amp; UNIR em vídeo</em></h3>
        <p>Ao dar play em qualquer vídeo abaixo, a música de fundo da página reduz o volume automaticamente para você ouvir o som ambiente original do auditório em Rolim de Moura.</p>
        <div class="pm-m26-videos-grid" id="pm-m26-videos-grid"></div>
      </div>

      <div id="pm-m26-galeria">
        <p class="pm-eyebrow">ACERVO CURADO · 112 FOTOGRAFIAS DE DESTAQUE (MARÇO DE 2026)</p>
        <h3>Galeria de Destaques · <em>10, 11 e 12 de Março de 2026</em></h3>
        <p>Filtre por dia para reviver a abertura com o CREA-RO (Dia 10/03), as dinâmicas acadêmicas (Dia 11/03) e a confraternização entre IFRO Ji-Paraná e UNIR Rolim de Moura (Dia 12/03). Clique em qualquer foto para ampliar em tela cheia.</p>
        <div class="pm-m26-filter-bar" role="group" aria-label="Filtrar destaques de março por dia">
          <button type="button" class="pm-m26-filter-btn is-active" data-m26-filter="all">Todos os 3 Dias (112 Destaques)</button>
          <button type="button" class="pm-m26-filter-btn" data-m26-filter="dia1_10mar">10 MAR · Dia 1 · Abertura &amp; CREA-RO (31)</button>
          <button type="button" class="pm-m26-filter-btn" data-m26-filter="dia2_11mar">11 MAR · Dia 2 · Dinâmicas &amp; Práticas (46)</button>
          <button type="button" class="pm-m26-filter-btn" data-m26-filter="dia3_12mar">12 MAR · Dia 3 · IFRO Ji-Paraná &amp; UNIR (35)</button>
        </div>
        <div class="pm-m26-photo-grid" id="pm-m26-photo-grid" aria-live="polite"></div>
        <div class="pm-m26-loadmore-wrap">
          <button type="button" class="pm-button" id="pm-m26-loadmore" hidden>Mostrar todas as 112 fotografias de março ↓</button>
        </div>
      </div>

      <div class="pm-m26-insta-grid" aria-label="Créditos institucionais e redes oficiais">
        <article class="pm-m26-insta-card">
          <span class="pm-eyebrow">REALIZAÇÃO ACADÊMICA · UNIR ROLIM DE MOURA</span>
          <strong>@engenhariaflorestal.unir · DAEFRM</strong>
          <p>Diretório Acadêmico e Coordenação de Engenharia Florestal da Universidade Federal de Rondônia — Campus Rolim de Moura.</p>
          <div class="pm-actions" style="margin-top:auto">
            <a class="pm-link" href="https://www.instagram.com/engenhariaflorestal.unir/" target="_blank" rel="noopener">Seguir @engenhariaflorestal.unir ↗</a>
            <a class="pm-link" href="https://daefrm.unir.br/" target="_blank" rel="noopener">Portal DAEFRM UNIR ↗</a>
          </div>
        </article>
        <article class="pm-m26-insta-card">
          <span class="pm-eyebrow">COBERTURA FOTOGRÁFICA &amp; AUDIOVISUAL</span>
          <strong>@manu.fotografias.ro · @primeformaturaro</strong>
          <p>Fotografia autoral por Emanuel Santana (Manu Fotografias &amp; Prime Formatura) — Rolim de Moura, Rondônia · WhatsApp (69) 98111-8769.</p>
          <div class="pm-actions" style="margin-top:auto">
            <a class="pm-link" href="https://www.instagram.com/manu.fotografias.ro/" target="_blank" rel="noopener">Seguir @manu.fotografias.ro ↗</a>
            <a class="pm-link" href="https://www.instagram.com/primeformaturaro/" target="_blank" rel="noopener">Seguir @primeformaturaro ↗</a>
          </div>
        </article>
        <article class="pm-m26-insta-card">
          <span class="pm-eyebrow">INTEGRAÇÃO INSTITUCIONAL · RONDÔNIA</span>
          <strong>CREA-RO &amp; IFRO Campus Ji-Paraná</strong>
          <p>Participação de conselheiros, lideranças e autoridades do CREA-RO e intercâmbio acadêmico com docentes e discentes de Engenharia Florestal do IFRO Ji-Paraná.</p>
          <div class="pm-actions" style="margin-top:auto">
            <a class="pm-link" href="#galeria">Subir para o Acervo de Novembro (356 fotos) ↑</a>
          </div>
        </article>
      </div>
    `;

    anchorTarget.parentNode.insertBefore(section, anchorTarget);

    // Fetch manifest JSON
    let data = null;
    try {
      const resp = await fetch(M26_JSON_URL, { cache: "no-cache" });
      if (resp.ok) {
        data = await resp.json();
      }
    } catch (err) {
      console.warn("Could not load edicao-marco-2026.public.json:", err);
    }

    if (!data || !Array.isArray(data.photos)) return;

    renderM26Deck(data.deck_slides || data.photos.slice(0, 9));
    renderM26StoryCards(data.story_cards || [], data.photos);
    renderM26Videos(data.videos || []);
    renderM26Gallery(data.photos);
  }

  function renderM26Deck(slides) {
    const stage = document.getElementById("pm-m26-deck-stage");
    if (!stage || !slides.length) return;
    let activeIdx = 0;
    let paused = false;

    stage.innerHTML = slides
      .map(
        (s, idx) => `
        <figure class="pm-m26-deck-slide" data-idx="${idx}" data-pos="-2" tabindex="0" role="button" aria-label="${s.title || s.day_label}">
          <img src="${s.preview_url}" alt="${s.title || s.day_label}" loading="lazy" decoding="async">
          <figcaption class="pm-m26-slide-cap">
            <span>${s.day_label} · ${s.camera_code || ""}</span>
            <strong>${s.title || s.day_title || "Destaque de Março de 2026"}</strong>
          </figcaption>
        </figure>
      `
      )
      .join("");

    const slideEls = Array.from(stage.querySelectorAll(".pm-m26-deck-slide"));

    function updatePositions() {
      const n = slideEls.length;
      slideEls.forEach((el, i) => {
        let diff = (i - activeIdx + n) % n;
        if (diff > n / 2) diff -= n;
        let pos = 2;
        if (diff === 0) pos = 0;
        else if (diff === -1) pos = -1;
        else if (diff === 1) pos = 1;
        else if (diff < -1) pos = -2;
        el.setAttribute("data-pos", String(pos));
      });
    }

    updatePositions();

    slideEls.forEach((el, i) => {
      el.addEventListener("click", () => {
        if (i === activeIdx) {
          const s = slides[i];
          openInLightbox(s.preview_url, `${s.day_label} — ${s.title || s.day_title} (${s.camera_code})`);
        } else {
          activeIdx = i;
          updatePositions();
        }
      });
    });

    const wrap = stage.closest(".pm-m26-deck-wrap");
    if (wrap) {
      const prevBtn = wrap.querySelector('[data-m26-deck="prev"]');
      const nextBtn = wrap.querySelector('[data-m26-deck="next"]');
      const toggleBtn = document.getElementById("pm-m26-deck-toggle");

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          activeIdx = (activeIdx - 1 + slideEls.length) % slideEls.length;
          updatePositions();
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          activeIdx = (activeIdx + 1) % slideEls.length;
          updatePositions();
        });
      }
      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          paused = !paused;
          toggleBtn.setAttribute("aria-pressed", String(paused));
          toggleBtn.textContent = paused ? "▶ Retomar" : "⏸ Pausar";
        });
      }
    }

    setInterval(() => {
      if (paused || document.hidden) return;
      const shell = document.querySelector(".pm-shell");
      if (shell && shell.classList.contains("reduce-motion")) return;
      activeIdx = (activeIdx + 1) % slideEls.length;
      updatePositions();
    }, 4200);
  }

  function renderM26StoryCards(storyCards, allPhotos) {
    const grid = document.getElementById("pm-m26-storycards");
    if (!grid || !storyCards.length) return;

    const photoMap = new Map(allPhotos.map((p) => [p.id, p]));

    grid.innerHTML = storyCards
      .map((card, cIdx) => {
        const items = (card.photo_ids || []).map((id) => photoMap.get(id)).filter(Boolean);
        if (!items.length) return "";
        const first = items[0];
        return `
          <article class="pm-m26-card" data-card-idx="${cIdx}">
            <div class="pm-m26-card-stage" data-mfx="${card.effect || "zoom"}">
              <span class="char-fx-badge">${card.badge || card.day_label}</span>
              <img src="${first.preview_url}" alt="${card.title}" loading="lazy" decoding="async">
              <button type="button" class="pm-m26-card-nav is-prev" aria-label="Foto anterior do cartão">‹</button>
              <button type="button" class="pm-m26-card-nav is-next" aria-label="Próxima foto do cartão">›</button>
              <span class="pm-m26-card-counter">1 / ${items.length}</span>
            </div>
            <p class="char-role">${card.subtitle}</p>
            <h4>${card.title}</h4>
            <p style="font-size:0.88rem;color:#cfd6f6;margin:0">${card.description}</p>
            <div class="char-actions" style="margin-top:auto;padding-top:8px">
              <button type="button" class="btn-theme pm-m26-open-card">🔍 Ampliar foto atual (${first.camera_code})</button>
            </div>
          </article>
        `;
      })
      .join("");

    const effects = ["fade", "right", "left", "up", "zoom", "blur", "flip", "wipe"];

    Array.from(grid.querySelectorAll(".pm-m26-card")).forEach((cardEl) => {
      const cIdx = parseInt(cardEl.getAttribute("data-card-idx"), 10);
      const cardData = storyCards[cIdx];
      const items = (cardData.photo_ids || []).map((id) => photoMap.get(id)).filter(Boolean);
      if (!items.length) return;

      let pIdx = 0;
      let fxIdx = cIdx % effects.length;
      const stage = cardEl.querySelector(".pm-m26-card-stage");
      const img = stage.querySelector("img");
      const counter = stage.querySelector(".pm-m26-card-counter");
      const openBtn = cardEl.querySelector(".pm-m26-open-card");

      function showPhoto(nextIndex) {
        pIdx = (nextIndex + items.length) % items.length;
        const item = items[pIdx];
        fxIdx = (fxIdx + 1) % effects.length;
        stage.setAttribute("data-mfx", effects[fxIdx]);
        img.src = item.preview_url;
        counter.textContent = `${pIdx + 1} / ${items.length}`;
        if (openBtn) {
          openBtn.textContent = `🔍 Ampliar foto atual (${item.camera_code})`;
        }
      }

      cardEl.querySelector(".is-prev").addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(pIdx - 1);
      });
      cardEl.querySelector(".is-next").addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(pIdx + 1);
      });
      img.addEventListener("click", () => {
        const item = items[pIdx];
        openInLightbox(item.preview_url, `${cardData.title} — ${item.day_label} (${item.camera_code})`);
      });
      if (openBtn) {
        openBtn.addEventListener("click", () => {
          const item = items[pIdx];
          openInLightbox(item.preview_url, `${cardData.title} — ${item.day_label} (${item.camera_code})`);
        });
      }
    });
  }

  function renderM26Videos(videos) {
    const grid = document.getElementById("pm-m26-videos-grid");
    if (!grid || !videos.length) return;

    // Put the closing IFRO + UNIR video first or highlighted
    const sorted = [...videos].sort((a, b) => {
      if (a.id === "v_12mar_1978") return -1;
      if (b.id === "v_12mar_1978") return 1;
      return 0;
    });

    grid.innerHTML = sorted
      .map((v) => {
        const isClosing = v.id === "v_12mar_1978";
        const durLabel = v.duration_sec ? `${Math.round(v.duration_sec)}s` : "";
        return `
          <article class="pm-m26-video-card ${isClosing ? "is-featured-closing" : ""}">
            <div class="pm-m26-video-meta">
              <span>${isClosing ? "🌟 DESTAQUE ESPECIAL · " : ""}${v.day_label}</span>
              <span>${durLabel} · SOM ORIGINAL</span>
            </div>
            <h4>${v.title}</h4>
            <p>${v.subtitle}</p>
            <video controls playsinline preload="metadata" poster="${v.poster_url}" src="${v.video_url}" aria-label="${v.title}">
              Seu navegador permite <a href="${v.video_url}">abrir o vídeo</a>.
            </video>
          </article>
        `;
      })
      .join("");
  }

  function renderM26Gallery(allPhotos) {
    const grid = document.getElementById("pm-m26-photo-grid");
    const loadMoreBtn = document.getElementById("pm-m26-loadmore");
    const filterBtns = Array.from(document.querySelectorAll(".pm-m26-filter-btn"));
    if (!grid) return;

    let currentFilter = "all";
    let limit = 36;

    function getFiltered() {
      if (currentFilter === "all") return allPhotos;
      return allPhotos.filter((p) => p.day_key === currentFilter);
    }

    function renderItems() {
      const list = getFiltered();
      const slice = list.slice(0, limit);
      grid.innerHTML = slice
        .map(
          (p) => `
          <figure class="pm-m26-photo-item ${p.orientation === "portrait" ? "is-portrait" : ""}" data-photo-id="${p.id}" tabindex="0" role="button" aria-label="${p.title || p.day_label} (${p.camera_code})">
            <img src="${p.preview_url}" alt="${p.title || p.day_title} — ${p.camera_code}" loading="lazy" decoding="async" width="${p.width}" height="${p.height}">
            <figcaption class="pm-m26-photo-overlay">
              <span>${p.day_label}</span>
              <small>${p.camera_code}</small>
            </figcaption>
          </figure>
        `
        )
        .join("");

      Array.from(grid.querySelectorAll(".pm-m26-photo-item")).forEach((fig) => {
        const pid = fig.getAttribute("data-photo-id");
        const p = allPhotos.find((x) => x.id === pid);
        if (!p) return;
        const handler = () => {
          openInLightbox(
            p.preview_url,
            `${p.day_label} (${p.date_iso}) — ${p.title || p.day_title} · Registro ${p.camera_code} · Cobertura Manu Fotografias & Prime Formatura`
          );
        };
        fig.addEventListener("click", handler);
        fig.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handler();
          }
        });
      });

      if (loadMoreBtn) {
        if (list.length > limit) {
          loadMoreBtn.hidden = false;
          loadMoreBtn.textContent = `Mostrar todas as ${list.length} fotografias desta seleção (+${list.length - limit} fotos) ↓`;
        } else {
          loadMoreBtn.hidden = true;
        }
      }
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        currentFilter = btn.getAttribute("data-m26-filter") || "all";
        limit = 36;
        renderItems();
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        limit = 999;
        renderItems();
      });
    }

    renderItems();
  }

  function enhanceCentralPage() {
    const centralShell = document.querySelector(".pm-shell.pm-central .pm-section");
    if (!centralShell || document.getElementById("pm-central-m26-card")) return;
    const card = document.createElement("article");
    card.className = "pm-event-card mf-car mfx-live";
    card.id = "pm-central-m26-card";
    card.style.marginTop = "28px";
    card.innerHTML = `
      <div class="pm-card-art" style="background:linear-gradient(145deg,#122923,#090b18);position:relative;overflow:hidden">
        <img src="/wp-content/uploads/cerfloro-2026/edicao-marco-2026/previews/m26-d11-29-j81a9771.webp" alt="I Congresso &amp; V Semana Acadêmica de Engenharia Florestal — Março 2026" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.42" loading="lazy">
        <span style="position:relative;z-index:1;color:#78eee7">I CONGRESSO &amp; V SEMANA ACADÊMICA</span>
        <strong style="position:relative;z-index:1;color:#ffd284">MAR / 2026</strong>
        <small style="position:relative;z-index:1">10 A 12 DE MARÇO DE 2026 · UNIR ROLIM · CREA-RO · IFRO JI-PARANÁ</small>
      </div>
      <div class="mf-frame">
        <p class="pm-eyebrow">MEMÓRIA HISTÓRICA DE 2026 · 749 REGISTROS · 112 DESTAQUES + 7 VÍDEOS</p>
        <h2>I Congresso &amp; V Semana Acadêmica de Engenharia Florestal (Desafios, Bioeconomia e Empreendedorismo)</h2>
        <p>Capítulo precursor realizado entre 10 e 12 de março de 2026 no Campus UNIR Rolim de Moura, reunindo autoridades do CREA-RO, dinâmicas práticas no viveiro florestal, trilha ecológica e o encerramento histórico integrado com o IFRO Campus Ji-Paraná.</p>
        <div class="pm-actions">
          <a class="pm-button" href="/fotos/ii-cerfloro-2026/#memoria-marco-2026">Explorar extensão de Março/2026 <span>→</span></a>
          <a class="pm-link" href="/fotos/ii-cerfloro-2026/#pm-m26-filmes">Assistir aos 7 vídeos de Março/2026 ↗</a>
        </div>
      </div>
    `;
    centralShell.appendChild(card);
  }

  function boot() {
    sanitizeMusicRuntime();
    enhanceHeaderAndFooter();
    enhanceCentralPage();
    initSmartMediaCoordination();
    init3DTiltAndSwipe();
    initMarco2026Extension();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
