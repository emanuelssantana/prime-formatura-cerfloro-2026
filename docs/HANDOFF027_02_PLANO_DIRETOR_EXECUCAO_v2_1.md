# 02 — Plano diretor de continuidade e divisão

Codex | DELL_MACBOOK_NO | 2026-11-04T07:53:06-04:00 | revisão documental v2.1 | ACK027

## Estado de corte
HEAD público/local 53bd570efd84f9c63ea67e1d5b3a603716cc62b8. Release registrada 0.2.4. HTTP atual da página contém 8 elementos video; event.html tem hash coincidente com PROD_024. event.public.json ainda não tem media nem speakers. Sessões previstas estão cadastradas. Isso não comprova playback completo, paridade visual, galerias reais ou CRM.
CI 41821060548 terminou failure: 15 testes de browser passaram e 1 falhou, no clique da seta do deck desktop. Player/legenda interceptam pointer events. Corrigir empilhamento/layout, não mascarar com force-click. A falha é parte da passagem, não CI verde.
A gravação mostra visual antigo verde. HTTP atual entrega vídeos e cache max-age=604800. Cache é hipótese a investigar, não causa provada; conferir shortcode/post, HTML, CSS efetivo, cache do navegador/CDN e viewport.

## Divisão pedida por Emanuel
- Executor principal B550 (Codex, Claude ou Antigravity que assumir): maior parte da implementação WordPress, fotos, paridade visual, cards, conteúdo e QA. Escrever ACK de recebimento com host e SHA, declarar os arquivos/rotas em que atuará.
- Codex Dell desta conversa: pacote de continuidade, procedência, evidências e revisão independente posterior do commit/URL. Nesta rodada não fará deploy concorrente. Pode apoiar diagnóstico isolado solicitado pelo executor, combinando escopo antes.
- GPT web/chatbot revisor: ler informe público e plano, revisar diferenças e provas. Espelho de documento não equivale a recebimento do outro agente.

## Ordem executável
1. Conferir ACKs recentes, checkout remoto/main e produção antes de editar. Ler vídeo parte 1 e parte 2, plano GPT integral e matriz de doadores. Reutilizar snapshot sem recomeçar.
2. Reproduzir a Prime como visitante desktop e mobile, incluindo URL limpa. Resolver entrega do HTML/CSS vigente e sobreposição que bloqueia setas. Capturar antes e depois.
3. Implantar primeiro lote real das fotos revistas e preencher manifesto; preservar IDs/hashes, reconciliar J81A3502 e J81A3564 - Copia como arquivos distintos. Os 356 WEBPs e manifesto portátil estão nas evidências/inventários. Originais não precisam ser reexportados.
4. Completar portabilidade literal dos elementos XCM/Mugiwara — hero, carrosséis por pessoa, música, molduras, banners, tutorial, FAQ, equipe e mobile. Medir paridade por elemento. Copiar mecânica e visual, sem importar cosplay/atletas/preços como se fossem deste congresso.
5. Dossiês científicos com SRT/áudio e slides reais. Confirmar nome e sessão por fontes adequadas, separar programa previsto de execução real, revisar trechos e três falas. Os áudios já chegaram; pendência é análise, não envio do usuário.
6. Completar vídeos/posters e verificar playback/áudio, uma mídia por vez, música reduzida durante voz. Player deve tentar áudio conforme navegador e ter botão claro quando precisa de gesto; não prometer autoplay audível universal.
7. Conferir tutorial Banlek como visitante, filtros, zoom, lote 40, links próprios, compartilhamento, teclado, 320/390/600/601/768/1440 px e Safari/WebKit. Corrigir CI e comprovar no WordPress público.
8. Backup antes de publicação, deploy por um executor, hash Git/servidor, purge específico e rollback documentado. ACK PRE/MID/POST, evidência visual e pendências sem afirmar 100% por HTTP200.

## Revisões dos pareceres GPT que continuam válidas
Manifesto público só com conteúdo publicável; curadoria privada separada. Não atribuir músicas por índice. Preservar IDs das fotos correspondentes. Testar breakpoint 600/601. Atualizar README/release. Publicar ciência somente com fontes/trechos reais. CRM deste módulo ainda sem fluxo comprovado; reutilizar contrato global, sem inventar integração pronta ou duplicar conectores. Mantêm-se os 15 módulos do plano v1.4.

## Correção do diagnóstico antigo
A mensagem genérica “blocked by policy” ocorreu numa ação anterior e não identifica uma configuração ativada por Emanuel. A interface já foi observada com permissões ligadas, divergindo da ferramenta de navegador. Causa continua NÃO DIAGNOSTICADA. O executor deve reavaliar a operação concreta e capacidades do seu host; isso não é requisito de produto nem uma proibição permanente da galeria. Tampouco há prova para afirmar que o erro foi removido ou que era bug confirmado. Não repetir como conclusão técnica de todas as publicações.
