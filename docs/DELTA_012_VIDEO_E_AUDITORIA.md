# Delta 0.1.2 — explicação do proprietário e auditoria v1.6

03/11/2026 · Codex Dell G3. Fonte de requisitos: vídeo do proprietário (06:43) e auditoria estática ChatGPT v1.6. O vídeo original e transcrição ficam no acervo local autorizado, fora do repositório público. Markdown de entendimento ao lado do MP4. A revisão automática da voz tem palavras imprecisas e não é transcrição literal certificada.

| Pedido/achado | Alteração | Limite de prova |
|---|---|---|
| Cabeçalho com rotação XCM | deck 3D CSS, controles, pausa reduced-motion/foco e fotos revisadas | sem fotos recebidas o deck não aparece; ainda não é cabeçalho fotográfico final |
| Cards por palestrante/slides/frases | renderização por pessoa e links de trechos preservados | faltam fotos/vozes/identidades revisadas |
| Música por docente | AudioManager dedicado, troca encerra áudio anterior, reset de estado, seek e ducking | testes com objetos simulados; sem teste auditivo no iPhone físico |
| Não expor curadoria no JSON | editorial privado fora da hospedagem/Git; exportação allowlist para event.public.json | campos públicos revisados ainda exigem revisão de conteúdo; não é classificador semântico de PII |
| Testar código servido | testes importam plugin/v14-core.js e audio-manager.js | não mais uma cópia em src |
| Sem CI/browser | workflow Node/PHP + Chromium/WebKit em GitHub Actions contra WordPress | CI é evidência em nuvem; WebKit emulado não é iPhone físico |
| Conteúdo de época | texto Dia2 sem amanhã; wrapper sem main aninhado | auditabilidade do tema inteiro e SEO completos pendentes |
| Divulgação e tutorial | seções encontrar/guardar/compartilhar, CTA copiar link, crédito e redes Prime | banner de arte/imagens autorais ainda depende das mídias |
| Efeitos/logotipo | glow discreto da marca, navegação sticky e progresso, deck e alternância editorial | adaptação original própria; não cópia de componente licenciado 21st |
| Gratuidade15dias | questão registrada ao proprietário | sem inventar data/preço/condição após prazo |

As páginas Mugiwara e XCM não foram alteradas. Sem uso de cosplay/atletas como fotos do CERFloRO. Não há CRM, pagamentos nem captura automática de fotografados nesta release.
