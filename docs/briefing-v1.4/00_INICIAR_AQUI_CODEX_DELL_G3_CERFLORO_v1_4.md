# 00 — LEIA PRIMEIRO / ORDEM DE SERVIÇO PARA CODEX DELL G3

**ID:** HND-CERFLORO-PRIME-20261103-v1.4  
**Autoridade de solicitação:** Emanuel / owner do ecossistema  
**Destino na máquina:** `G:\Meu Drive\IDEs_Agents_26\Sites_Todos_meus_sites_crm_chatbot_clientes_organizadores_parceiros\-Sites_Todos_meus_sites_WK_Codex-dell-g3`  
**Evento:** II Congresso de Engenharia e Recursos Florestais de Rondônia (II CERFloRO), 03–04/11/2026.  
**Marca dona do produto:** Prime Formaturas.  
**Estado:** ORDEM DE IMPLEMENTAÇÃO LOCAL COM GATES. Não é aprovação para publicar, alterar outras páginas, ativar CRM de produção ou apagar mídia.  

## INSTRUÇÃO EXECUTÁVEL

Você é o **CODEX Dell G3**, integrador único da nova super landing page Prime Formaturas para o II CERFloRO. Leia este documento INTEIRO e depois `01_PLANO_DIRETOR_IMPLEMENTACAO_PRIME_CERFLORO_v1_4.md`, `04_HANDOFF_CRM_API_CERFLORO_v1_4.md`, os manifestos do pacote e os handoffs externos. **Não comece por `npm create`, por WordPress ou por publicar**: inventarie primeiro.

Use o caminho exato informado pelo proprietário como **workspace de coordenação**. Crie apenas uma subpasta nova de projeto, caso ainda não exista, p.ex. `CERFLORO_2026_PRIME_FORMARTURAS/` (preferir `CERFLORO_2026_PRIME_FORMATURAS/` se ainda não há contrato, validar e não renomear pastas existentes). Não sobrescreva arquivos com nomes iguais: coloque em `handoff_chatgpt_v1_4/` e incorpore sob versionamento. Não presuma que a unidade G: esteja montada no Dell G3: descubra o caminho real com `Test-Path`, Drive sincronizado, `git worktree` e aliases locais; registre sem reescrever os links históricos.

### Ordem de leitura OBRIGATÓRIA
1. `02_GLOBAL_PRIME.md` — seção vigente PG26 e revisões posteriores; contrato C10/C15/C16, registros de staging, pendências de segurança e tenant.
2. `COORDENACAO_ECOSISTEMA_GLOBAL\22_FRAMEWORK_E_ROTEIRO\00_FRAMEWORK_ROTEIRO_20261025.md` — roteiro R01–R15; **validar se houve atualização posterior**.
3. `HANDOFF_MUGIWARA_FEST_CLAUDE_20261019.md` e código canônico do Mugiwara, somente leitura/branch.
4. `HANDOFF_MESTRE_XCM_ALVORADA_LIGHTCRAFT_E_SITE_20261101.md`, `ACK__214__ANTIGRAVITY...` e arquivos locais WordPress XCM; conciliar divergências de rota e versões.
5. `CERFLORO_2026_BRIEFING_PLANO_DIRETOR_MULTIAGENTES_v1_3.md`, `CERFLORO_2026_SCHEMA_CARROSSEL_DOCENTE_v1_3.json`, agenda provisória v1.2, e **este pacote v1.4, que é o delta executor**.
6. `21ST_SELECAO_COMPONENTES.md` (histórico) + `03_MATRIZ_REUSO_21ST_DEV_v1_4.csv` + docs atuais do 21st.dev.

### O que construir, sem lacunas
- **Hero com filmagem AUTORAL do drone da UNIR** do Emanuel (não usar floresta genérica como substituta em produção). Otimizar vídeo, poster, controles, versão mobile e modo sem vídeo. Não alegar apoio/endosso institucional sem autorização.
- Linha do tempo documental 2024–2026 com procedência comprovada. O evento fotografado em Rolim em 2025/2026 é **outro acervo até prova contrária**.
- **Um dossiê/carrossel POR PALESTRANTE**: identidade/tema, trajetória verificada, fotografias, **principais slides fotografados**, **EXATAMENTE TRÊS frases marcantes DELE/DELA** (citações literais, áudio original, timestamp, revisão), pergunta/resposta do público e música dedicada original/licenciada com ducking.
- Galerias das duas datas, coffee break, pôsteres, alunos, perguntas, mesas, bastidores, instituições e equipes; fotos não identificadas em seção neutra sem fabricar nomes.
- Busca/filtros, CTA de entrega, links de álbuns, vídeos, fotos gratuitas/pagas somente onde o provedor permitir, FAQ, redes sociais e crosslinks multimarca; preservar as funcionalidades aprovadas de Mugiwara **E** XCM.
- Microinterações e scroll storytelling do 21st.dev **apenas após testar compatibilidade com WordPress**: não instalar React/Three.js global desnecessariamente; melhor CSS+JS leve quando o efeito for equivalente; registrar autor/licença/dependências.
- Interface no tema real da **Prime Formaturas**: nunca copiar paleta anime, logotipo de cosplay ou propaganda esportiva indiscriminadamente.
- CRM Global Rakabia apenas via adapter e contratos existentes com tenant e site próprios, funções C10/C15/C16 separadas, consentimento e chaves server-side; sem indexar RAW, áudio privado ou embeddings faciais no CRM.

### Cinco travas de segurança
1. **NENHUM DEPLOY AUTOMÁTICO.** Construir staging/preview; liberar produção somente após aprovação de Emanuel e evidências.
2. **NÃO EDITAR** páginas dos legados Mugiwara/XCM, seus geradores originais, bancos e assets; somente importar componentes derivados e creditados em workspace isolado.
3. **NUNCA ASSOCIAR FOTO, VOZ, NOME, CARGO OU SLIDE POR INFERÊNCIA ÚNICA**: gerar candidato e usar autoapresentação, programa, horários e confirmação humana.
4. **NÃO PUBLICAR** citações sem comparação literal com áudio nem slides científicos sem direito de uso confirmado; ausência de mídia vira `EM_CURADORIA`, não conteúdo falso.
5. **NUNCA EXIBIR** tokens/credenciais, nem fazer alterações sem backup/rollback e lock de writer. Não usar tokens de um tenant para outro; não reutilizar tokens C10 como C16.

### Primeiro ACK obrigatório (ANTES DE CODAR)
Produza `99_ACK/ACK_000_INVENTARIO_PRE_IMPLEMENTACAO.md` com: ambiente real Dell G3, pastas encontradas/ausentes, repositórios e branches, IDs reais de páginas WP e site Prime, URLs verificadas, arquivos e hashes das versões anteriores, matriz recursos Mugiwara×XCM×Prime, 21st disponível, acesso à mídia do drone, áudio e slides, estado CRM runtime + staging, bloqueios e ordem de prioridade. **Não invente sucessos.**

### Entrega final esperada por item
Para cada módulo: `source_file`, `source_hash`, `destination_file`, `component`, `status: NOT_STARTED|IN_PROGRESS|IMPLEMENTED_LOCAL|TESTED_STAGING|APPROVED|PUBLISHED|BLOCKED`, screenshot, teste, licença, URL se publicada, data/hora, rollback. Entregar log cumulativo `99_ACK/ACK_NNN_*` sem descartar estados antigos.

**Documentos do pacote:** `01_PLANO_DIRETOR_IMPLEMENTACAO_PRIME_CERFLORO_v1_4.md`; `02_PROMPT_PARA_COLAR_NO_CODEX.txt`; `03_MATRIZ_REUSO_21ST_DEV_v1_4.csv`; `04_HANDOFF_CRM_API_CERFLORO_v1_4.md`; `05_CHECKLIST_QA_ACEITE_v1_4.csv`; `06_ESTRUTURA_DADOS_E_PASTAS_v1_4.md`; anexos v1.3, agenda e schema.  
**Não executar etapa não verificada somente porque está escrita num arquivo de handoff.**
