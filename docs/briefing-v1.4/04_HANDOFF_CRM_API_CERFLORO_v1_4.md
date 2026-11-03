# 04 — HANDOFF DE INTEGRAÇÃO CRM GLOBAL RAKABIA / PRIME FORMATURAS / CERFLORO

**Natureza:** especificação de integração e plano de validação; NÃO É comprovante de conexão. **Marca:** Prime Formaturas. **Evento:** II CERFloRO. 

## Fontes de verdade e estado anterior
- `02_GLOBAL_PRIME.md`, Dell G3, seções 26, 30–32 e aditivos mais recentes. No corte de 25/10/2026: API global FastAPI/PostgreSQL 16 RLS, Next.js e adapters por WordPress; CRM **staging** C10 instalado/testado por fixture sintética e replay; **produção Prime desligada**; demais integrações de sites não comprovadas. Validar no runtime em 03/11 antes de afirmar situação atual.
- Plano Global: `G:\Meu Drive\IDEs_Agents_26\Sites_Todos_meus_sites_crm_chatbot_clientes_organizadores_parceiros\COORDENACAO_ECOSISTEMA_GLOBAL\22_FRAMEWORK_E_ROTEIRO\00_FRAMEWORK_ROTEIRO_20261025.md`.
- Repositório existente: https://github.com/emanuelssantana/rakabia-crm-platform — privado, autenticação do usuário; não clonar indiscriminadamente para dentro do WordPress.
- Em 02/11, ACK160 Antigravity indicava widget webchat ausente / módulo ADK em conflito com ACK197 anterior; confirmar o que está realmente publicado e integrado. DAK não é chatbot, ADK/Vertex/Colab não são pré-requisitos.

## Contratos isolados — SEM misturar finalidades
| Contrato existente | Finalidade conhecida | Uso CERFloRO | Regra |
|---|---|---|---|
| **C10** | Lead, orçamento/pedido por instalação WordPress | Pedido de orçamento Prime, contato autorizado, proposta de formatura | Opt-in desmarcado; salvar evento no WP / outbox; POST servidor->servidor; fixture, replay/idempotência, leitura no tenant certo |
| **C15** | Evento/atendimento esportivo e logística (referência histórica) | **NÃO usar para CERFloRO sem revisão de schema/necessidade** | Não equiparar palestra com evento esportivo só para obter endpoint |
| **C16** | Leitura de conhecimento aprovado para chatbot | FAQ de entrega, palestrantes, slides autorizados, consulta por evento | Token de leitura próprio, read-scope e ACL; C16 desligado até prova de integração |
| **C1** | Bridge chatbot local A320↔plataforma | Atendimento humano/chat com escalonamento futuro | Não migrar Docker A320 só para entregar a página; preservar serviço existente |

## IDs lógicos (não presumir serem registros existentes)
`event_code = CERFLORO_2026`; `brand_code = PRIME_FORMATURAS`. IDs de tenant, installation, API e WP devem ser **descobertos/gerados pelo sistema autorizado**, não adivinhados. Não gravar nomes ou IDs reais de terceiros sem confirmação.

## Entidades locais do portal
- `edition`: id, ano, local, fontes, status de verificação, licença do acervo.
- `session`: id, date, start/end local, day, talk title, speaker IDs, local e fonte de agenda.
- `speaker`: id, nome, instituição, cargo, fontes, status, media IDs, relações com 3 quote slots.
- `media`: hash, URI privada/publicável, EXIF, owner, atribuição, licença, moderação, derivatives, size.
- `quote`: speaker_id, transcrição literal, audio_id, timestamps ms, reviewed_by, approved.
- `slide`: speaker_id, image_id, ordem, OCR revisto, timestamp vinculado, rights.
- `question`: session_id, participant_public_id (pode ser ANON), transcrição, voice segment, photos, permission.
- `crm_event`: event_code, site_installation_id, anonymous_session, action, timestamp, consent_scope (quando aplicável), request_id, delivery_status.

## Eventos de site passíveis de telemetria mínima
`page_view`, `hero_play_click`, `speaker_open`, `quote_play_click`, `slide_zoom`, `gallery_filter`, `album_outbound_click`, `faq_open`, `commercial_cta_click`, `chatbot_open`, `lead_opt_in`.

Métricas estritamente necessárias. Evitar mandar nomes de alunos, URLs de áudio bruto, reconhecimento facial, embedding, telefone e dados acadêmicos no payload de analytics. Se a natureza do cookie/identificador exigir consentimento, respeitar o gate. Tráfego de navegador para API sensível deve passar por backend do WP/autorizado, não chave em JavaScript.

## Fluxo Prime C10 seguro
1. Confirmar instalação e tenant Prime **no ambiente certo** (staging ≠ produção), segredo com escopo mínimo, rotas e schema reais.
2. Formulário Prime: campos mínimos, CTA consistente, checkbox de consentimento específico **desmarcado**, política acessível. Nunca importação silenciosa de visitante fotografado para CRM.
3. Validação de servidor, persistência segura e outbox durável local; identidades e request_id estáveis para evitar duplicata; proteção anti-spam.
4. POST para endpoint validado com Bearer server-side; `201` inserção / `200` replay segundo contrato vigente; não presumir status sem conferência.
5. Prova com dados sintéticos: 1ª ingestão; replay idempotente; payload conflitante; timeout; 4xx; 429; 5xx; tenant vizinho proibido; read-back exato no tenant esperado; exclusão/revogação quando pertinente.
6. Proteções adicionais: nenhum log PII/tokens, rate limit e assinatura/verificação se aplicáveis, flag de shadow/rollback, consent versioning.
7. MANTER Prime produção OFF até tratar as pendências de segurança apontadas no Plano Global (inclusive rota diagnóstica e validador público P08, conforme escopo da aplicação) e receber decisão do proprietário.

## Bot / RAG / ADK
- **FAQ local sem IA** funciona imediatamente na landing mesmo sem CRM.
- **RAG** só sobre fontes publicadas e revisadas; respostas com links para o próprio card e minuto do áudio; fallback “não localizado” quando faltarem evidências.
- C16 e ADK são opcionais e só após autenticação, ACL de tenant/site, testes de fonte, prompt injection e logs. Não enviar gravações integrais não públicas para serviço externo sem autorização.
- WhatsApp/Instagram não enviar mensagens comerciais automáticas sem base e opt-in; usar fallback para atendimento manual quando hub não estiver operacional.

## Release checklist específico
[ ] inventário do contrato atual; [ ] formulário e copy aprovados; [ ] staging 201/replay e read-back; [ ] negativo cross-tenant; [ ] token único/site guardado; [ ] política de privacidade atualizada; [ ] P08 gate saneado; [ ] screenshot WP; [ ] rollback/flag testado; [ ] owner autoriza produção; [ ] ACK com hashes e evidências. Nenhuma etapa se presume concluída.

**Fontes:** plano local `02_GLOBAL_PRIME.md` (25/10/26), `CRM ACK160` (02/11/26), documentação local e handoff v1.3. **Responsável por resolver conflito de estado:** Codex via repo/runtime + aprovação do owner, jamais apenas por relatos.
