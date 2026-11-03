# PLANO DIRETOR DE IMPLEMENTAÇÃO E HANDOFF MESTRE — PRIME FORMATURAS / II CERFloRO 2026

**Contrato:** `HND-CERFLORO-PRIME-20261103-v1.4` | **Edição:** 03/11/2026, America/Porto_Velho | **Owner:** Emanuel | **Executor designado:** Codex Dell G3. 

**Workspace designado:** `G:\Meu Drive\IDEs_Agents_26\Sites_Todos_meus_sites_crm_chatbot_clientes_organizadores_parceiros\-Sites_Todos_meus_sites_WK_Codex-dell-g3`.

**Objetivo:** implementar no ecossistema **Prime Formaturas** uma SUPER LANDING PAGE da cobertura e entrega de fotos do **II Congresso de Engenharia e Recursos Florestais de Rondônia (II CERFloRO), 03–04 novembro de 2026, Rolim de Moura–RO**, com estética editorial/cinematográfica, vídeo autoral de drone da UNIR, seções documentais por palestrante, slides científicos fotografados, **três frases marcantes LITERAIS por palestrante**, trechos de voz, músicas dedicadas licenciadas, galerias de fotos por sessão e participantes, programa, resgate histórico, links de entrega de mídia, marca Prime, crosslinks de marcas irmãs e integração progressiva ao CRM Global Rakabia.

**Status real:** a execução é objeto deste handoff; este arquivo não significa que código, mídia, publicação, CRM, IA de fotos ou backend foram implementados, testados ou aprovados. Jamais afirmar sucesso sem recibo correspondente. **Não fazer deploy sem aprovação do proprietário.**

---

## 1. PRINCÍPIOS DO PROJETO (CONTRATO DE NÃO REGRESSÃO)
1. **Fusão aditiva, jamais substituição.** Inventariar o produto MugiwaraFest, o XCM Alvorada e as páginas institucionais `/fotos/`; encontrar ausências recíprocas, portar somente o que funciona, preservar seus contratos de origem, corrigir falhas herdadas.
2. **Prime Formaturas é a marca da nova página**. Estúdio Criativo Prime e Manu Fotografias RO/Manu Fotografia Esportiva podem aparecer como equipe, créditos e ecossistema, sem confundir empresa responsável ou afirmar cobertura oficial não contratada.
3. **A melhor mídia é a do proprietário:** hero com filmagem de drone da UNIR, não IA genérica. Fotos reais de dois dias e dos slides; áudio de autoapresentação; vídeo real se houver. Sem fotos/slides/áudio, módulo conserva layout e sinaliza `EM_CURADORIA`.
4. **Três citações POR PALESTRANTE**, não do evento inteiro: texto idêntico à fala, voz do próprio docente, arquivo e intervalo `start_ms`–`end_ms`, vínculo ao slide *quando real*, revisão e aceite. Sem autorização, pode sair texto resumido sem aspas/sem arquivo público.
5. **Todo indivíduo que segurou microfone:** tentar vincular foto e trecho, extraindo autoapresentação (nome, instituição, cargo/função), assunto da pergunta, resposta. Nunca identificar só por semelhança facial/horário; permitir que a instituição confirme o campo ou editar `PENDENTE`.
6. **Dados e direitos:** cuidado com reconhecimento facial/embeddings e consentimento; separar dados públicos, derivados editoriais e originais restritos. Fotos de slides podem conter material de terceiros ou não publicado; conferir direito de exibição.
7. **CRM global existe como sistema separado.** Não criar um segundo CRM ou duplicar banco. WordPress do site permanece independente, e as APIs têm contratos C10/C15/C16/C1 específicos.
8. **Accessibility, SEO e mobile primeiro.** Efeito cinematográfico deve ceder a texto legível, foco, toque e carregamento. Sem scroll-jacking; trilhas jamais iniciam audíveis automaticamente.
9. **Sem sobreescrever original**: editar em nova árvore, com hashes e arquivos imutáveis. Apenas um escritor da futura página Prime; os projetos fonte são READ-ONLY.
10. **Produção exige prova** de staging, performance, conteúdo aprovado, direitos, backup, plano de rollback e aceite humano.

## 2. FONTES REAIS PARA LEITURA — MAPA DE NAVEGAÇÃO DO CODEX

### 2.1. Memória e código dos sites
| Fonte | Papel na implementação | URL de referência | Caminho local histórico a verificar |
|---|---|---|---|
| MugiwaraFest (Claude/Codex/Antigravity, out/26) | Carrosséis individuais/duplas, temas, música e animações, banners, tutoriais, FAQ, crosslinks, marca d'água | https://drive.google.com/file/d/1W5iHo3p6jTPsLOfY2T8vlWOiXkiussiz/view | `G:\Meu Drive\IDEs_Agents_26\Manu_fotografias_RO&Manu_fotografia_esportiva\Entrega_fotos_eventos\Mugiwara_Fest_2026` |
| Mugiwara módulo visual A320 | borda animada, mídia/hover e complementos | https://drive.google.com/file/d/1yTFrtVNRT2lFhCnbsYVhysPXG-vTMoco/view | `web\modules\antigravity\` sob origem |
| XCM ACK-214 Antigravity | WordPress 3697, arena 3D, galeria de atletas, catalogação, rede de álbuns | https://drive.google.com/file/d/1T49X7TmZggSbrUQoFpuI-1DUr_---D2E/view | `G:\Meu Drive\IDEs_Agents_26\Site_Manu_Fotografia_esportiva_website\-Site_manuFotografiaESPORTIVA_FOTOS_antigravity_dellg3_partir_nov_26` |
| XCM Claude Handoff | 104 cards, 215 miniaturas, YuNet/SFace/Lightcraft, correções bugs CSS, vídeos/áudios | https://drive.google.com/file/d/1f6zRPH0d9ygnU76ewxy7alZ1I0lXyyTi/view | `C:\lcjob\site_xcm` e outros caminhos históricos *não garantidos no Dell atual* |
| XCM Codex lições 03/11 | identificação, vídeo, música, evidência, não sobrepor pessoa errada | https://drive.google.com/file/d/1Yc21SXbz3SkKg3t4NsPkX8LOqtBu2QcJ/view | fonte de processo, não código vivo |
| Prime Global 02_GLOBAL_PRIME | contratos, tenants, segredos, adapters, WordPress Prime, liberações | https://drive.google.com/file/d/1dFGGtAaXFiKf4-8b8hSeD6WeayvAIE_4/view | Buscar na árvore `COORDENACAO_ECOSISTEMA_GLOBAL` e subárvores Prime |
| 21st seleção anterior | autoria e protótipos de galerias 3D; **licenças pendentes à época** | https://drive.google.com/file/d/1_ux1bIlBOyYwmhkp1103l_79gVr2VTlV/view | verificar fonte, autor e licença hoje |
| CRM ACK160 (02/11) | divergência webchat/ADK e estado integração | https://drive.google.com/file/d/1P7ho5HflZpFphGCgmM-Fr7H6vB1ZLAE5/view | fonte de auditoria, não verdade imutável |
| Even3 CERFloRO 2026 | nome, datas, local, sessões, palestrantes, organização | https://www.even3.com.br/iicerfloro-760904/ | cache da pauta e prova de consulta |
| Even3 CERFloRO 2024 | edição anterior, 16–18/09/2024, Ji-Paraná | https://www.even3.com.br/cerfloro-478846/ | não associar fotos desconhecidas de Rolim a esta edição |
| 21st.dev documentação | React/TS, Tailwind/shadcn, MCP e CLI | https://docs.21st.dev/mcp | instalar somente o que o site precisa |

### 2.2. Rotas e estado histórico — nunca assumir como verdade viva
- Mugiwara WP ID 4218; `/entregafotos/mugiwarafest/`; pai 4217. V11 Codex + patch visual v12 Claude; validar página atual antes de referenciar uma versão canônica.
- XCM WP ID 3697, pai referenciado 3615; handoffs divergem entre `/fotos/ciclismo_final_circuito_centro_oeste_xcm_2026_alvorada/` e `/entregafotos/ciclismo_final_circuito_centro_oeste_xcm_2026_alvorada/`. Exigir GET real, páginas WordPress, admin, slug/canonical, cache e hash do corpo renderizado.
- Prime `/fotos/` e domínio de entrega final: **não adivinhar**. A v1.3 citava `primeformatura.com.br` como ROTA PROPOSTA NÃO VERIFICADA; verificar painel/site/dns/documentos reais. Caso o Prime esteja em outro domínio, usar URL canônica dele.
- `emanuelssantana/rakabia-crm-platform` e `emanuelssantana/manu-fotografia-esportiva-website-ops` são repositórios privados conhecidos; credenciais e remotos precisam ser conferidos.

## 3. AUDITORIA FUNCIONAL MUGIWARA × XCM × PRIME (ANTES DE ESCREVER)

Para **cada linha** registrar `SRC_MUGIWARA`, `SRC_XCM`, `PRIME_EXISTENTE`, `STATUS_IMPL`, `CANONICAL_CODE`, `SCREENSHOT`, `TEST`, `RISCO`:

| Bloco | Mugiwara documentado | XCM documentado | Exigência CERFloRO |
|---|---|---|---|
| Hero/Identidade | capa + botões/aviso de álbuns | arena 3D e contexto esportivo | vídeo original drone UNIR; capa Prime; título e data corretos |
| Carrosséis | personagens, duplas, animação, trilha temática, cartões extras | um card por atleta, 104 agrupamentos, miniaturas | um dossiê por docente, mesas, perguntas, sliders de slides |
| Álbum/Compra | botões Banlek, tutorial, preços/histórico divergente | Botões Banlek, edição e galeria por pessoa | links reais por sessão, modelos de gratuidade/pagamento configuráveis se provedor suportar |
| Pessoa/Identidade | curadoria temática manual | YuNet/SFace e revisão para evitar cluster errado | participante com microfone ↔ autointro áudio ↔ janela/fotos/slides ↔ conferência |
| Música | player e temas por card, v11/v12 | player com cinco links historicamente falhos | tema licenciado por docente + voz original + ducking e controles |
| Video | tutorial/apoios | vídeos individuais, YouTube e render (alguns links ausentes) | clipes da fala, reel, drone e vídeo do evento se disponíveis |
| FAQ/social | 11 FAQ, marcas irmãs, equipe e redes | FAQ parcial/crosslinks não confirmados | FAQ científico+compras, equipe, parceiros, redes, CTA CRM consentido |
| Acervo científico | não é função | não é função | 3 citações literais por docente + slides legíveis e resumo com fonte |
| História 2024–2026 | não é função | não é função | linha do tempo com mídias de 2024 verificadas e Rolim separado |
| Desktop/mobile | microanimações e vários carrosséis | 3D e overlays fixos problemáticos | 320px–1440px + Safari/Android + reduced-motion |

**Regra:** o Codex não consegue inferir automaticamente o que de fato está no ar de um ACK. Buscar código fonte, snapshot atual e provar visualmente. A tabela descreve conhecimento documental e é ponto de partida, não veredito final.

## 4. DECISÃO DE ARQUITETURA DO FRONTEND PRIME

### Preferência técnica: WordPress + plugin/tema filho isolado + bundle compilado
Se a Prime usar WordPress como indicado pelo Plano Global:

1. **Não modificar o tema nem outro plugin do site por conveniência.** Isolar em `prime-cerfloro-2026/` com PHP mínimo, assets `dist` versionados, markup acessível, CSS escopado em `[data-cerfloro-root]` e carregamento condicional para rota/shortcode.
2. **PHP**: template/shortcode/bloco do evento, `wp_enqueue_script/style`, sanitização de config pública, `wp_localize_script` apenas com URLs/IDs não sensíveis, nonce/REST somente quando necessário, CSP compatível, autorização de upload/edits conforme papel.
3. **Frontend**: HTML progressivo com conteúdo SEO disponível sem depender 100% de JS; componentes leves CSS/JS nativo como padrão. Se um módulo 21st justificar React, fazer **ilha React compilada** (Vite/Rollup) montada APENAS num elemento; React nunca deve ser despejado cru no Gutenberg. Separar CSS e JS do conteúdo para evitar WordPress transformar `&` em `&#038;`.
4. **JSON content manifest** validado com schema, versionamento por evento; o mesmo material abastece o build e a pesquisa chatbot após revisão. Cache com busting/hash e invalidadores por release.
5. **URLs e mídia**: WordPress Media Library ou CDN confiável conforme orçamento/licenças; originais RAW privados, derivados otimizados; fotos sob controle comercial real no provedor, não só CSS anti-download.
6. **Páginas independentes** dos legados. Criar nova rota canônica após testar colisão de slug, parent, 301s, sitemap e SEO; checar domínio Prime real, certificado TLS e autoridade editorial.

### Alternativas de compatibilidade (avaliação heurística, não benchmark)
| Arquitetura | Score 0–100 | Vantagem | Desvantagem |
|---|---:|---|---|
| WP isolado + bundle JS e eventual ilha React | **92** | Preserva Prime/SEO e encapsula 21st | Build/deploy exige disciplina e QA |
| Frontend Next.js separado com CMS/WP/headless | **77** | 21st nativo e fluxo moderno | Novo deploy, infra, analytics, URL e operação |
| React em iframe dentro do WordPress | **60** | Isolamento visual simples | SEO/deep link/audio/iOS/acessibilidade piores |
| Colar HTML+JS+CSS integralmente em Gutenberg | **45** | Primeiro protótipo rápido | Regressões Astra/entidades/cache/scripting já observadas |
**Pesos:** preservação stack existente 30, estabilidade/rollback 25, UX/performance 20, integração/SEO 15, custo operacional 10. São notas de projeto, não medições instrumentadas.

### Estrutura sugerida do plugin (se arquitetura confirmada)
```text
06_SITE/
  prime-cerfloro-2026/
    prime-cerfloro-2026.php
    includes/class-event-renderer.php
    includes/class-content-manifest.php
    public/src/main.ts
    public/src/components/{HeroDrone,Timeline,SpeakerStories,SlideViewer,VoiceQuote,AudienceQna,PhotoGallery,CommerceCta,FAQ,AudioMixer}.ts[x]
    public/src/styles/tokens.css
    public/dist/                 # saída versionada, NÃO editar manualmente
    data/manifest.cerfloro.json  # conteúdo somente aprovado
    schemas/manifest.schema.json
    tests/{unit,e2e,accessibility,contracts}/
  previews/
  visual-regressions/
```
Os nomes são sugestão para o novo projeto, **não prova de diretórios já existentes**. Se o WordPress Prime já tem plugin/adapters próprios, integrar aos contratos existentes em vez de instalar um segundo plugin redundante.

## 5. JORNADA VISUAL — SUPER LANDING PAGE EM 15 MÓDULOS

| Nº | Módulo | Conteúdo/efeito | Critério de pronto |
|---|---|---|---|
| 01 | HERO CINEMATOGRÁFICO UNIR | drone do Emanuel, poster estático, título, data, CTA Explorar e Encontrar minhas fotos; parallax suave | reprodução manual/mute, carga rápida em 4G, poster correto, rights/UNIR, redução de movimento |
| 02 | NAVEGAÇÃO E PROGRESSO | sticky nav discreta, índice Dia1/Dia2/Docentes/Galerias/Entregas/FAQ, breadcrumbs | sem bloquear conteúdo/controles; keyboard + touch |
| 03 | HISTÓRIA DO CERFloRO | texto original verificado, linha do tempo I 2024 → II 2026, marcos | fontes/datas verificadas; Rolim anterior NÃO fundido sem prova |
| 04 | PROGRAMAÇÃO POR DIA | horários, sessão, tema, docente, link âncora, data local | Even3 + revisão de agenda; conflito horário marcado e corrigido |
| 05 | DOCENTES — ÍNDICE | cards foto/nome/cargo/instituição, busca/filtro tema/dia | nomes públicos conferidos, fallback sem foto |
| 06 | DOSSIÊ DE CADA DOCENTE | fotos da apresentação, microbio com fontes, papel na programação | nome/cargo verificado, URLs e direitos conferidos |
| 07 | 3 FALAS MARCANTES POR DOCENTE | **3 por docente**, player voz e timestamp, transcrição exata, música dedicada com ducking | `speaker_id` idêntico nos 3; sem áudio não inserir aspas falsas |
| 08 | SLIDES PRINCIPAIS | fotos retificadas, ordem, zoom nativo, botão ouvir trecho vinculado | conteúdo científico legível e autorização, OCR revisado |
| 09 | PERGUNTAS DA PLATEIA | pessoa no microfone, autoapresentação, pergunta e áudio resposta, se aprovados | matching revisado; sem história pessoal inventada |
| 10 | GALERIA POR SESSÃO | fotos docente, plateia, pôsteres, coffeebreak e networking, bastidores, equipe | agrupamento por EXIF + captura + revisão; foto em múltiplos álbuns sem duplicar RAW |
| 11 | ENTREGA E COMÉRCIO | encontrar minhas fotos, álbuns externos Banlek/Fotto/Fottop reais e testados, FAQs de qualidade/resolução, vídeo | política por pasta e tamanho validada no provedor; preço não inventado |
| 12 | VÍDEOS / REELS / BASTIDORES | clipes verticais 9:16, vídeo do evento e teaser; trilha licenciada | poster/lazy, 1080p quando disponível, legenda, sem reprodução audível automática |
| 13 | EQUIPES, INSTITUIÇÕES E REDES | créditos com links conferidos, parceiros/autoria, marcas próprias | logos e alegação de endosso autorizados |
| 14 | CRM / CHATBOT / FORM | CTA Prime, lead voluntário com consentimento, FAQ e chat opcional | API C10 E2E comprovada em staging, prod flag OFF até aprovado |
| 15 | RODAPÉ E CONTROLES | FAQ, mapa de conteúdo, imprensa, termo de uso, política de privacidade, crédito de foto, links de retificação | links testados, controles acessíveis, hash da build |

### Direção visual
- Linguagem: documental científica, natureza/floresta/tecnologia, Prime Formaturas; fotos reais do congresso são o protagonista.
- Paleta inicial proposta (a validar com identidade Prime existente): verde floresta profundo, grafite/ardósia, branco acessível, acento cobre/dourado discreto; evitar neon gamer e excesso de partículas.
- Tipografia altamente legível, linhas de leitura curtas; cards com identificação persistente; esquema de design com tokens, não hex aleatório espalhado em componentes.
- Motion: entrance por scroll 120–350 ms, `translateY` pequeno, sem saltos de layout; mecanismos 21st apenas onde agregam leitura; `prefers-reduced-motion: reduce` = sem movimentos dispensáveis.
- Se o usuário estiver em rede lenta/data saver, somente poster do hero e primeiras fotos; lazy load progressivo, não carregar todos os 100+ cards de uma vez.

## 6. MÓDULOS 21ST.DEV — COMO BUSCAR, LICENCIAR E ADAPTAR

**Catálogo vivo:** https://docs.21st.dev/mcp e https://21st.dev. Instalar CLI SOMENTE se necessário/permitido: `npm i -g @21st-dev/cli`, `21st login`, `npx @21st-dev/cli install-skill`; para Codex verificar orientação oficial de `codex plugin marketplace add 21st-dev/codex-plugin` antes de executar. CLI `21st search "3d carousel"`; selecionar autoria/URL/requisito, visualizar e **inspecionar código, imports, licenças e dependencies** antes de `21st add <slug-real-retornado>`. Não inventar slug nem executar adição por palpite.

**Limites verificados em 03/11/26:** busca gratuita; conta free recebe duas cópias/instalações de código por dia; plano Builder no site cerca de USD 6/mês pago anualmente, sujeito a mudança/câmbio/impostos. Não prometer limites ilimitados no gratuito. React/TS/Tailwind/shadcn são stack padrão; WordPress precisa bundling ou adaptação. Sem scraping do catálogo, sem copiar preview como asset, validar atribuições por componente.

**Componentes testados por página pública (candidatos, NÃO instalados):**
1. `3D Parallax Unfurling Gallery` — https://21st.dev/@piyushxdev/components/3d-parallax-unfurling-gallery — galeria cinematográfica; doc indica `framer-motion`, licença MIT, julho/2026. Útil bastidores/transição, porém reduzir movimento em mobile.
2. `3D Carousel` cult/ui — https://21st.dev/@cult-ui/components/3d-carousel — cards de docente ou histórico; `framer-motion`, MIT. Modo 2D acessível obrigatório.
3. `Image Sphere` Tony Sebastian — https://21st.dev/@tonyzebastian/components/image-sphere — conjunto de fotos em esfera 3D; usar APENAS em vitrine secundária por ser pesado e de navegação difícil; licença/dependências avaliar diretamente.
4. `3D Image gallery` Jessi — https://21st.dev/@moazamtrade/components/3d-image-gallery — depende de `three`, `lucide-react`, `@react-three/drei` e `@react-three/fiber`: **não usar como padrão** por custo de GPU/JS no iPhone; candidato opcional desktop.
5. `3D Interactive Timeline` do arquivo 21ST_SELECAO_COMPONENTES.md → **URL histórica retornou Component Not Found** em 03/11. Buscar substituto existente, sem inventar que está disponível.

**Seleção por necessidade:** hero/intro, timeline, gallery, story cards, slide lightbox, quote/player, cards de CTA, FAQ accordion, modal de zoom. Exigir shortlist A/B/C, custo em KB, licença, dependências, acessibilidade e comparação. Se não agregar funcionalidade, manter HTML/CSS nativos.

## 7. PIPELINE FOTO / VÍDEO / AUDIO / SLIDE / IDENTIDADE

### 7.1. Ingestão local e metadados
1. RECEBER os caminhos que Emanuel organizar, apontar via manifesto; **não copiar nem editar RAW**; ter snapshot e hash SHA-256 da amostra/arquivos, tamanho, EXIF, fuso UTC-4, nomes e local de backup. Fotografias originais em storage controlado, versões de web em pasta de derivados.
2. Corrigir offsets de relógio entre câmeras/gravadores usando aplauso ou palavra identificável; não presumir EXIF sincronizado. Classificar por `day`, `session_id`, `camera`, `start`, `end`, `location` e `photographer`.
3. Gerar contact sheets por janela e fotos importantes. Usar detector de rostos como **agrupamento de candidatos** (YuNet/SFace do XCM, Immich para revisão opcional). Face clustering requer base adequada; duplicata visual no mesmo quadro implica identidades distintas, como erro XCM.
4. DETECTAR “pessoa segurando microfone”: visão + heurística/clips + análise manual; detectores prontos podem **não** conter classe específica de microfone. Não usar máscara de pessoa como prova de identidade.
5. Gerar catálogo `identification_candidates.csv`: `session_id,photo_id,candidate_cluster_id,audio_segment_id,self_introduction_ms,matching_basis,review_status,verified_name/institution/role,permission_status`. Sem nome? `PARTICIPANTE_PENDENTE_NNN`.

### 7.2. Processamento de áudio
1. Indexar áudio sem transcrever fora de ambiente aprovado. Local `faster-whisper` ou outra solução CPU/GPU comparada; `pyannote.audio` para diarização somente após validar dependências/licença e ambiente. Separar `SPEAKER_001`, `SPEAKER_002` sem atrelar a pessoas automaticamente.
2. Descobrir autoapresentações e perguntas. Extrair candidatos de nome/cargo/instituição e **verificar** com identidade visual, horários, Even3 e organização, registrando `source_reference`.
3. Para CADA docente: ranquear 5–8 trechos cientificamente fortes e selecionar **EXATAMENTE 3** após conferir literalidade, contexto, áudio start/end, sotaque, pontuação e direito de uso. A edição não pode criar afirmação nova por cortes.
4. Criar player separado por docente, acesso direto por URL `#speaker-<id>/quote-<i>`, transcrição revisada e música dedicada licenciada que pause/abaixe durante a fala. Nunca iniciar áudio com som sem gesto.
5. Ter fallback em texto quando licença ou áudio não estiverem liberados; não inventar citações literais.

### 7.3. Fotos dos slides
1. Detectar fotos de tela/superfície (classificação e revisão) com EXIF, construir sequence; `OpenCV` perspective transform/deskew em cópia; resolver rotação/corte com inspeção visual; manter hash original.
2. OCR só para apoio de pesquisa, nunca para confirmar fórmula, espécies, gráficos/tabelas/nomes científicos sem revisão humana. Mostrar slide real ampliável + texto acessível revisado.
3. Ordenar slides por sessão/palestrante/horário e linkar ao minuto da fala somente quando correlação comprovada. Slides de terceiros citados pelo palestrante são tratados com direitos específicos.
4. `slide_id`, `speaker_id`, `photo_hash`, `sequence`, `audio_start_ms`, `ocr_reviewed`, `legibility`, `rights_confirmed`, `public_url` apenas se aprovado.

### 7.4. Drone da UNIR (material do dono)
- Localizar vídeo original no caminho que Emanuel indicar. Confirmar data/contexto e direito de divulgação; evitar representar outra unidade/imagem como local exato do evento se não for.
- FFmpeg gerar `poster.webp` (quadro sem pessoas reconhecíveis em situação inadequada); exportar MP4 H.264 com otimização moov/faststart, e WebM/AV1 somente se realmente ajudar compatibilidade. Não exigir edição 4K para hero; variante 720/1080 conforme teste.
- Hero inicia muted/playsinline apenas quando visível e conforme dados/reduced-motion; permitir play/pause e não depender de autoplay; títulos em HTML (não texto queimado no vídeo).
- Vídeo licenciado, música autoral/licenciada e áudios docentes em canais independentes; sem reproduzir música de fundo protegida de gravação se os direitos não permitirem.

## 8. MÚSICA DEDICADA — GOVERNANÇA E USABILIDADE
- Identidade musical por docente não precisa ser música popular; priorizar trilha instrumental original/licenciada e estilo coerente com o tema (ex.: materiais, água, conservação), sem alegar que a trilha é preferência do docente.
- **Um único gerenciador de áudio global**; ao clicar em uma citação `voice_quote`, abaixar música atual (-12 a -20 dB conforme teste), depois retomar suavemente; proibir duas vozes simultâneas; controles de volume, pause e mute acessíveis.
- Eventos `play`, `pause`, `ended`, `error`, interrupção por outra aba e mudança de card. URLs de músicas verificadas; sem IDs YouTube expirados, autoplay forçado ou conflito com CTAs mobile.
- Controlar direitos de trilha, gravações e vozes; registrar `license_ref`, atribuição e termos, não apenas o link.

## 9. ENTREGA COMERCIAL DE FOTO/VÍDEO — SEM PROMETER FUNÇÃO INEXISTENTE
- Separar **coleção editorial gratuita** (fotos selecionadas para divulgação) de **galeria de entrega/comercial** (arquivos e venda). Um álbum pode ser gratuito e outro pago, com critérios distintos por sessão, por resolução e por vídeo — se o provedor suportar.
- Priorizar links para álbuns reais Banlek, Fotto, Fottop; validar em conta/ambiente real capacidade de preview, qualidade/gratuidade, pacote/resolução, vídeo, app iOS/Android, disponibilidade e comissão. Sem confirmação, apenas botões simples e texto factual, sem inventar preços ou bloqueio facial.
- Provedor de venda guarda e aplica preços/permissões; a landing só apresenta ofertas validadas e aponta para checkout. Não tentar implementar paywall com `pointer-events:none` ou `display:none`: não protege download.
- Cada botão exige `album_provider`, `album_url`, `price_policy_status`, `open_test`, `ownership`, `version`. Descontos históricos do Mugiwara não se propagam para CERFloRO sem regra comercial específica.

## 10. HISTÓRICO INSTITUCIONAL SEM FALSA EQUIVALÊNCIA
- I CERFloRO em Ji-Paraná: datas e fontes da Even3 2024; só publicar fotos reais dessa edição se houver autoria, origem e direitos verificados.
- Evento acadêmico que Emanuel afirma ter fotografado em Rolim em 2025/2026: buscar por EXIF, nomes de pasta, banners fotografados, convites, departamento. **Manter coleção separada** até prova de que tem continuidade formal com CERFloRO.
- Para os docentes, fontes recomendadas: programa Even3, sites institucionais, currículo público atualizado, slides/áudios autorizados. Biografia narrada combina fatos documentados; frases em aspas vêm somente da gravação. Registrar fontes por parágrafo no cadastro editorial.

## 11. CRM GLOBAL RAKABIA E CHATBOT — PLANO SEM INVASÃO DE OUTRAS EQUIPES
- Ler `04_HANDOFF_CRM_API_CERFLORO_v1_4.md` (normativo deste delta).
- **Prime Formaturas primeiro piloto C10** registrado no Plano Global de 25/10; WordPress staging com synthetic POST/replay, produção desligada e pendências de segurança/consentimento. NÃO repetir migrations, não reativar produção sem aprovação.
- `brand_code=PRIME_FORMATURAS` e `event_code=CERFLORO_2026` são **chaves lógicas**, não UUID de tenant real. Usar installation/tenant reais do ambiente e seu isolamento RLS.
- Contratos **C10** opt-in/form de proposta; **C15** esportivo não reaproveitar para científico sem revisão; **C16** leitura de base aprovada pelo chatbot somente após E2E; **C1** adaptação de chatbot no Docker A320, sem migrar serviços involuntariamente.
- P0: formulário/CTA independente sem ativar CRM, FAQ estática; P1: C10 staging apenas, P2: C16 RAG indexando dados públicos aprovados. Nunca enviar fotos RAW, gravações privadas, embeddings ou dados biométricos para CRM.
- Telemetria mínima se consentida e justificada: `speaker_open`, `quote_play_click`, `slide_zoom`, `album_click`, `commercial_cta_click`, `lead_opt_in`. Contatos comerciais só com opt-in e dados fornecidos voluntariamente; identificação do público no palco não vira lead.

## 12. EXECUÇÃO POR FASES — O QUE CODEX FAZ, COMO FAZ E PROVA

### P0 — Descoberta segura e backup (BLOQUEIO INICIAL)
**Entrada:** caminho Dell G3, docs v1.3/v1.4 e links. **Ação:** verificar host (`hostname`), letras/unidades, Git workspace, sites Prime, handoffs, scripts e WP/CRM acesso READ-ONLY; snapshot de source e hash; listar mídia faltante. **Saída:** `ACK_000_INVENTARIO_PRE_IMPLEMENTACAO.md`, matriz presença/ausência com screenshots da página ao vivo (Mugiwara e XCM), lista de dúvidas específicas. **Gate:** no write até confirmar a fonte canônica e status de ambiente.

### P1 — Arquitetura e design system
**Ação:** confirmar WP Prime, tema, plugins, integração C10 prévia e novo slug; montar `DESIGN_SYSTEM.md`, paleta derivada da Prime, wireframes mobile/desktop, decisão React island vs JS nativo. Pesquisar 21st via CLI/MCP com 3 candidatos por módulo, revisar código/licença, testar em branch isolada. **Saída:** mocks HTML, `21ST_COMPONENT_REGISTER.json`, bundle mínimo e prova de 21st compatível. **Gate:** revisão visual, zero alterações legadas.

### P2 — Landing editorial sem mídia pesada
**Ação:** montar seções HTML responsivas, hero com poster temporário identificado, título/dias e programa, carrosséis placeholders nomeados como provisórios (não inventar foto/quote), FAQ, crosslinks e CTAs. **Saída:** preview local/staging desativado de indexação, screenshots em 320/375/390/768/1024/1440. **Gate:** não publicar placeholders simulando fatos reais.

### P3 — Acervo, áudio e slides
**Ação:** quando mídia ficar disponível, manifestos e hashes, indexação EXIF/time sync, agrupamento, clipping e voice segments, slides corrigidos e candidatos às 3 quotes de cada speaker. Rever autoapresentação para perguntas. **Saída:** `speaker_dossiers/*.json`, `speaker_quote_review.csv`, `photo_audio_matching.csv`, contact sheets, `rights.csv`, lista pendências. **Gate:** revisão humana para todos os nomes, slides, frases.

### P4 — Experiência visual e mídia
**Ação:** integrar hero de drone real, otimização video/audio/slide, 21st 3D apenas em módulos aprovados, player de música/voz com ducking, filtros e carrosséis. **Saída:** diff em browser, controle de trilha/voz, alternativa reduced-motion, testes de memória e mobile. **Gate:** nota de performance, links acessíveis e sem alterações não planejadas.

### P5 — Comércio, CRM e chatbot
**Ação:** conectar álbuns efetivos e regras de publicação por grupo, parametrizar CTA, FAQ; contrato C10 staging, teste sintético, outbox/replay/cross-tenant, documentação consentimento. C16 só em stage separado e depois de aprovação; manter site navegável offline. **Saída:** `CRM_CONTRACT_TESTS.md`, recibos sintéticos, sem PII. **Gate:** produção off sem decisão do owner.

### P6 — QA final e release controlado
**Ação:** Playwright desktop/mobile, screenshots, `axe-core` a11y, SEO metadata/social previews, JSON-LD próprio de evento se dados completos, vídeo playback, link checker, orçamento de assets, mobile Safari físico quando disponível, revisão editorial e legal. Criar backup WP completo e dry-run de rollback. **Saída:** `QA_REPORT.md`, tabela de evidências, SHA de artefatos, checklist assinada. **Gate:** proprietário aprova por item, um único writer em produção, publicar e verificar GET real e cache/rollback.

### P7 — Handoff e manutenção
**Ação:** consolidar `README`, novos scripts, mapa de fontes, dashboard de pendências, docs de edição de docentes e programação, rotina de backup/rebuild, monitoramento de links. **Saída:** ACK final e changelog, URL real verificada, caminho da fonte, restaurabilidade. **Gate:** nunca alegar feito se ficou bloqueado.

## 13. MATRIZ DE ANTI-REGRESSÃO COM BASE NAS FALHAS CONHECIDAS

| Falha histórica | Corrigir no novo projeto | Prova |
|---|---|---|
| XCM perdeu CSS após regex procurando `<style>` sem ID | renderizador com parser/namespace, nunca regex frágil; assets enfileirados externamente | build falha se CSS crítico ausente; screenshot diff |
| Gutenberg transformou `&` em HTML entity dentro do JS | scripts JS versionados em arquivo; conteúdo Gutenberg só markup | console sem erros, checksum JS, funcionalidade testada |
| Astra altera h1/h2 fundo/largura | wrapper CSS escopado, testar tema real, override específico | screenshot antes/depois no WP |
| Mugiwara v11/v12 e gerador desincronizados | fonte canônica única; importar commit/patch revisado sem editar `montar_pagina_claude.ps1` | status/branch, no stale overwrite |
| Player fixo oculta botão de venda no celular | respeitar safe-area, bottom nav, não sobrepor conteúdo | 320px e iOS com CTA tocável |
| Cards faciais fundidos e identidades erradas | multievidência + validação; outliers de tamanho para revisão | log de confirmação por pessoa |
| Música quebrada/YouTube ausente | mídia/licença/URL testadas, fallback sem trilha | scanner links + escuta real |
| Preço divergente do Banlek | não importar descontos antigos sem checkout verificado | link de venda e política comercial checkados |
| Staging ≠ produção no CRM | feature flag off, consentimento, migração/versionamento e read-back | C10 fixture e autorização formal |
| 21st introduz Three.js em tela mobile fraca | orçamento de JS/GPU, lazy, CSS fallback | Lighthouse/dispositivo móvel + reduced motion |
| Idade do evento/media ausente | marcar dados não verificados e não deixar falsa história | editorial review e links fonte |

## 14. DEFINIÇÃO DE PRONTO POR MODALIDADE

### Implementação
- Entrega rastreável e reproduzível com um comando de build, sem credenciais embutidas, versionamento e hashes.
- Fonte canônica e registros de componentes portados (autoria, licença, versão e dependências).
- Código não edita o Mugiwara/XCM nem o CMS Prime fora da nova rota durante staging.

### Conteúdo
- Palestrante identificado/confirmado, 3 frases literais com arquivo/intervalo; 3 slots por docente com evidência, nenhuma citação atribuída a outro.
- Slide publicado legível, direitos confirmados e vinculação coerente à fala.
- Aluno com microfone identificado por autoapresentação e foto revisada, sem inventar biografia e sem transformar em lead.
- Histórico 2024 comprovado e Rolim fotografado como acervo distinto até prova de vínculo.

### Qualidade
- 320/375/390/768/1024/1440 sem overflow horizontal, controles/legendas/teclado, WCAG 2.2 AA como meta; testes de performance de campo ou laboratório com ferramenta e ambiente declarados.
- Sem vídeo pesado em carregamento inicial, sem música audível automática, CTA sempre tocável.
- Links externos e comerciais verificados, fallback para páginas sem consentimento e webchat indisponível.

### Release
- Backup + ensaio rollback; aprovação explícita; deploy um escritor; screenshot e URL pública checada sem autenticação; readback HTML e status HTTP.
- Documentar separadamente `LOCAL`, `STAGING`, `PRODUÇÃO` e `APROVAÇÃO_EDITORIAL`, jamais usar status único enganoso.

## 15. ORIENTAÇÃO DE ORGANIZAÇÃO ANTI-PERDA DE CONTEXTO

### Pastas no workspace oficial
```text
<WORKSPACE_CODEX_DELL_G3>/
  CERFLORO_2026_PRIME_FORMATURAS/
    00_GOVERNANCA/          # briefing, fonte da verdade, README, status, decisões
    01_INVENTARIO_LEGADOS/  # hash, prints e feature matrix Mugiwara/XCM/Prime
    02_FONTES_PROGRAMACAO/  # agenda, fontes, biografia validada, refs direitos
    03_MIDIA_REFERENCIADA/  # manifests, caminhos, metadados, sem RAW duplicado
    04_PESSOAS_PALESTRAS/   # speaker dossiers, 3 quotes, perguntas, slides
    05_21ST_CATALOG/       # autoria, URL, código licenciado, escolhas/bench
    06_SITE/               # plugin/build/previews/testes
    07_INTEGRACAO_CRM/     # contrato C10/C16, fixtures sintéticas
    08_QA/                # snapshots, device testing, relatórios
    09_RELEASE/           # backup, bundle, deploy, rollback
    10_AUTORIZACOES/      # conteúdo, slides, áudio, licenças, marca
    99_ACK/               # recibos append-only, lock, índice de progresso
```
- Drive = documentos e derivados editáveis em equipe; disco local (preferencialmente com backup) = RAW, caches e processos pesados; Git = código e schemas, **sem mídia privada nem secrets**; Telegram tópicos = andamento `#01_Briefing`, `#02_Midia`, `#03_Docentes_e_Falas`, `#04_Frontend_21st`, `#05_CRM`, `#06_QA`, `#07_Deploy_ACK`, sem áudios pessoais ou tokens.
- Checklist visível `00_GOVERNANCA/STATUS.md` com dono, `next_action`, impedimento, evidência e data. Atualizar ao terminar cada tarefa para preservar continuidade entre máquinas e sessões.

## 16. MATRIZ DE PERMISSÕES E RESPONSABILIDADES
- **Codex Dell G3**: proprietário técnico do projeto CERFloRO, integrador único/gestor de branch, investiga e adapta fontes, mantém build/testes/ACK, prepara deploy, não publica sem autorização.
- **Antigravity A320MH** (opcional): QA visual, contact sheets, busca de elementos e simulações em branch secundária, nenhum write no CMS Prime sem transferir patch revisado.
- **Claude Code** (opcional): revisão editorial/científica de narração/quotes e comparação dos componentes Mugiwara; entrega patch em branch, não altera origem fora do escopo.
- **Emanuel e organização/docentes**: fontes primárias de mídia e aprovações de identidade, falas, slides, direitos e publicação.
- **CRM owner existente**: API, token, schema, tenant, RLS e gate de segurança; Codex coordena contrato e não toma posse silenciosamente do runtime alheio.

## 17. QUESTÕES CONHECIDAS / COMO CONTORNAR SEM TRAVAR
- Drone da UNIR: está com proprietário mas caminho não informado → construir hero com poster padrão claramente `AGUARDA_VIDEO_AUTORAL`, sem gerar vídeo falso.
- Fotos, áudio e slides dos dias 3–4: não montados nesta sessão → construir schemas e ingestão; conteúdo não validado fica `EM_CURADORIA` e fora do site público.
- Evento anterior em Rolim: não identificado → acervo secundário separado; `historical_link=UNVERIFIED`.
- Domínio Prime e WP slug/ID: a confirmar → sandbox local; não inventar permalink.
- Regras de álbum, resolução, vídeo pago e comissões: configurar somente depois de testar provider atual; se sem API, usar links de álbum que funcionam.
- 21st componentes com licenças e stack variáveis: exigir registro de licença por componente; opção CSS/JS equivalente quando importação não viável.
- Integração C10 staging e ambiente de produção: não confundir; manter flag desligada e sem dados reais até gates.
- Programação de palestras do dia 4: horários/eventos podem se sobrepor e a palestra 7 vinha sem nome na agenda consultada → revisão com áudio/organização; não autovincular nomes por horários brutos.

## 18. CRITÉRIOS DE AVALIAÇÃO DO TRABALHO (SCORE INTERNO, NÃO METRICA REAL)
- Completude funcional de features legadas + científicas 25 pts.
- Proveniência correta de nome, voz, slides e quotes 25 pts.
- QA frontend mobile, acessibilidade e performance 20 pts.
- Integração CRM com consentimento, segurança e isolamento 15 pts.
- Governança de código, backups, hashes e reversibilidade 15 pts.

**Nota mínima desejada:** 90/100 para proposta de release; **qualquer gate crítico falho bloqueia deploy independentemente da pontuação**. Pontuação só depois de provas; no início = não avaliado.

## 19. TAREFAS DO PRIMEIRO CICLO — EXECUTE AGORA SEM ESPERAR MÍDIA
- [ ] confirmar G: e identificar workspace Dell G3 e ambiente real do projeto Prime.
- [ ] ler planos vigentes e buscar aditivos mais recentes; mapear C10 staging/produção e incidentes abertos.
- [ ] inventariar código fonte Mugiwara/XCM e páginas reais com print, URL, hash e diferenças.
- [ ] criar branch/worktree novo e estrutura de projeto sem alterar originais.
- [ ] mapear arquitetura WP Prime, identificar roteamento de nova página sem criar página pública.
- [ ] pesquisar 21st e validar 3 componentes úteis, mais CSS fallback; registrar licença e custo.
- [ ] criar design tokens Prime e protótipo responsivo com placeholders marcados.
- [ ] escrever schemas: persona, sessão, slides, 3 quotes por docente, microfone, galeria, mídia, consentimento.
- [ ] implementar suporte hero com filmagem real depois do caminho e alternativa poster.
- [ ] iniciar testes e gerar `ACK_000` com pendências sem mascarar ausência de áudio/fotos.

## 20. RASTREABILIDADE E FONTES
- V1.3 do projeto: `CERFLORO_2026_BRIEFING_PLANO_DIRETOR_MULTIAGENTES_v1_3.md`; v1.4 é o delta orientado ao **Codex Dell G3 + Prime Formaturas + 21st.dev**, não revoga direitos/citações e gates v1.3.
- Fontes principais nos links da Seção 2 e `04_HANDOFF_CRM_API_CERFLORO_v1_4.md`.
- Documentação contemporânea 21st (consultada 03/11/26): https://docs.21st.dev/mcp, https://21st.dev/plans, URLs individuais da Seção 6. Features, preços e licenças variam por componente/plano: confirmar no momento do download.
- **Nunca classificar `PLANEJADO` como `CONCLUÍDO`**. Registrar autor, máquina, branch, SHA Git, SHA256 do bundle, data/hora UTC−4, rota/ID WP somente se observados.

**Rastreabilidade**: `HND-CERFLORO-PRIME-20261103-v1.4` | 03/11/2026 | GPT-6 consolidando fontes e especificação | owner técnico futuro: Codex Dell G3 | implantação não executada nesta sessão | pendências: mídia, domínio Prime, validações editoriais, autorização de deploy, gate CRM.
