# ACK006 — Reaproveitamento corrigido do legado musical

Codex | dell_macbook_note | 03/11/2026 22:48:57 UTC−4.

## Achado e correção

A implementação 0.1.4 não reaproveitava o motor completo. Usava AudioManager nativo próprio e nenhum catálogo. Portanto a falta de músicas não era exclusivamente falta de material do proprietário. O script C:/lcjob/site_xcm/musica_autoplay.js é apenas bootstrap dependente de MFMusic. O motor completo foi localizado no Drive e copiado sem alterar o original.

Fonte exata: G:\Meu Drive\IDEs_Agents_26\Manu_fotografias_RO&Manu_fotografia_esportiva\Entrega_fotos_eventos\Mugiwara_Fest_2026\web\vendor\music-youtube-v1.2.1.js
SHA256 legado e cópia: adbb100f382cdb9377a71043da07e75a199301389457e27e03899d41d5c72e48.
Cópia: plugin/prime-memoria-eventos/mf-music-legacy.js. Cabeçalho interno MFMusic 2.0.0 (nome histórico 1.2.1). Catálogo de 27 vídeos extraído de window.__MF_TRACKS__ no payload_final.html XCM. Versão Prime 0.1.5, código 5ec418e, teste af9ee0f.

Agora WordPress usa o motor legado, não uma recriação reduzida: YouTube, playlist, volume, dock mobile, persistência de faixa/posição/pausa, tentativa de autoplay audível e retomada por gesto. Trilha genérica de navegação identificada como reaproveitada do XCM; não são músicas escolhidas individualmente pelos docentes. Botão de trilha por dossiê usa o catálogo; curadoria final por docente ainda precisa ser refinada. Áudio de fala usa AudioManager e duck do MFMusic para pausar e retomar sem duas músicas simultâneas.

Relatório histórico encontrado: hub_fotos_v2/tests/MUSIC_TEST_REPORT.md no workspace Claude B550. 19/22 verificações passaram em 18/10; autoplay liberado tocou, política padrão bloqueou e clique iniciou, houve observação de YouTube tocando sem gesto em headless. Touchend mobile e reduced motion tiveram falhas históricas. Não chamar isso de garantia universal nem de teste atual. Há screenshots e fontes completas no mesmo workspace.

## Evidência atual

Deploy real 0.1.5 feito com backup e hashes: 09_RELEASE/PROD_015.json. Comparação pública por SHA passou. 14 testes unitários passaram. CI browser com checagem do motor, iframe e 27 faixas em andamento na criação deste ACK; complementar resultado antes de declarar fechado. Não há prova de som audível em aparelho físico nesta rodada.

## Continuidade

Falta completar merge visual de logos/banners/carrosséis editoriais do vídeo, incorporar mídias reais, tutorial final da plataforma e personalização musical. Não atribuir todos esses itens à falta de fotos. Originais XCM/Mugiwara preservados; produção alterada somente no plugin CERFloRO.


Atualização final de publicação: commit 56bb9ce; 10 assets estáticos conferidos com GitHub e WordPress, PHP conferido por SFTP/lint. CI atual: https://github.com/emanuelssantana/prime-formatura-cerfloro-2026/actions/runs/41763250076 . Mudança no teste: aguardar DOM e estado real do player, sem exigir silêncio de rede do YouTube. Resultado final de browser ainda em apuração.
