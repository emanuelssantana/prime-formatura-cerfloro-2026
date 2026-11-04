# Estado e continuidade — 03/11/2026

Emanuel autorizou nesta conversa repositório separado e trabalho direto no WordPress. Essa instrução posterior altera o gate de staging dos textos v1.4 preservados em briefing-v1.4. A entrega depende de validação no domínio público; manter um escritor por módulo.

## Recursos
- Central e página do evento criadas no WordPress (2436/2437).
- Release 0.1.1 publicada e verificada por HTTP/hash: módulos v1.4 sem a faixa PREVIEW em produção; falas/docentes/drone permanecem EM_CURADORIA quando sem mídia validada.
- Sete testes Node de manifesto aprovados. Browser: seis larguras 320/375/390/768/1024/1440 sem overflow do documento; filtro Dia2 e FAQ abertos com sucesso no preview. Não equivale a playback com mídia real ou teste Safari físico.
- Bug de MIME .mjs em hosting corrigido usando .js de módulo. O plugin enfileira assets só nas páginas dos shortcodes.

## Integração
Neste módulo CRM permanece desligado. A presença de outros conectores Prime no WordPress não comprova o novo fluxo CERFloRO. Contatos comerciais são voluntários; fotografia/participação não cria lead. C10=pedido, C16=conhecimento revisado, C1=chatbot local. C15 esportivo não é reutilizado por palpite.

## Como os próximos lotes entram
1. Receber caminhos originais; não alterar RAW/áudios fonte.
2. Preparar prévias otimizadas; inventariar dia/sessão e direitos.
3. Atualizar event.json somente com conteúdo revisado/publicável.
4. Confirmar plataforma/link final de entrega gratuita e providerVerified.
5. Dossiês: três falas por docente, slides, áudio e identificação conferidos.
6. Aplicar atualização diretamente no WordPress com backup anterior e recibo; conferir o mesmo endereço público.

## Perguntas para o revisor
- As funcionalidades do plano v1.4 estão corretamente representadas como implementadas, em curadoria ou pendentes?
- Há inconsistências entre markup, manifesto, validação e runtime?
- Falta conteúdo de acessibilidade, SEO, privacidade ou contexto acadêmico?
- Algum módulo compromete o salvamento/orçamento existente da Prime?

## Reversão
Backup privado antes de cada versão; restaurar somente arquivos deste plugin e limpar o cache correspondente. Não reverter páginas ou plugins de outras equipes. Nova publicação não inclui migração de banco. Segredos e backups sensíveis ficam fora do GitHub público.


## Atualização 0.1.2 — 03/11/2026 ~21h18 Manaus
A versão atual foi aplicada ao WordPress com backup e verificação pública. Sanitizador gera event.public.json somente com campos permitidos/aprovados; event.json é alias igualmente sanitizado. Fonte editorial privada não é versionada/publicada. AudioManager impede cruzamento entre docentes e repõe estados. Os 12 testes locais importam os módulos do plugin servido. O workflow GitHub run41752798601 passou unit/PHP e browser Chromium/WebKit contra WordPress. Capturas de produção em docs/imagens/wordpress-012-*; não confundir com imagens anteriores.

Limites: testes de áudio com objetos simulados; sem voz/música/drone real do congresso ou Safari físico. Deck de destaque só aparece quando houver fotos reais aprovadas. Agenda oficial 2026 não foi verificada diretamente: anexo permanece fonte candidata; nenhum docente/nome/horário inventado. Prioridade mídia e merge visual completo continua. Veja DELTA_012_VIDEO_E_AUDITORIA.md.
