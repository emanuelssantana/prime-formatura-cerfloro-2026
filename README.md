# Prime Formatura — II CERFloRO 2026

**Entrada para ChatGPT e outros revisores:** este README, docs/ESTADO_E_CONTINUIDADE.md e docs/briefing-v1.4/01_PLANO_DIRETOR_IMPLEMENTACAO_PRIME_CERFLORO_v1_4.md. Este repositório é separado da aplicação CRM e dos outros sites.

## Páginas reais
- Central: https://primeformatura.com.br/fotos/
- Evento: https://primeformatura.com.br/fotos/ii-cerfloro-2026/

WordPress: páginas 2436 e 2437. Plugin: `plugin/prime-memoria-eventos`. Marca Prime Formatura; fotógrafo Emanuel Santana, graduando do último período de Engenharia Florestal. Datas do evento informadas pelo proprietário: 3 e 4/11/2026. Entrega gratuita anunciada; provedor final ainda em definição. 174 JPGs recebidos; edição atual em reconciliação privada. Drone e gravações continuam pendentes.

## Release publicada 0.1.8

Logos responsivos v2 publicados no WordPress, commit `9716dfb`, CI [41771303401](https://github.com/emanuelssantana/prime-formatura-cerfloro-2026/actions/runs/41771303401) concluída com sucesso. A galeria pública permanece vazia. As correções ACK014 posteriores são código preparado, sem novo deploy declarado. Consulte docs/ACK_012_CODEX_PARA_GPT_LOGOS_E_FOTOS_20261104.md. As evidências anteriores permanecem preservadas.

## Como avaliar sem confundir código com entrega
A página funciona diretamente no WordPress. Código Git é fonte versionada e permite revisão; execução local e testes não substituem navegação no domínio. Evidência de publicação da release fica em docs/ESTADO_E_CONTINUIDADE.md. Os textos de briefing preservam instruções antigas: a orientação mais recente do proprietário é avançar diretamente no WordPress, com backup/rollback e validação pública. Não reconstruir sites fonte ou alterar o CRM por esta instrução.

## Arquivos
| Arquivo | Função |
|---|---|
| plugin/prime-memoria-eventos/prime-memoria-eventos.php | Shortcodes, assets condicionais e CollectionPage JSON-LD |
| event.html / central.html | Conteúdo HTML progressivo, sem JS colado no Gutenberg |
| event.public.json | Projeção sanitizada de conteúdo aprovado; fonte editorial fica privada |
| style.css | Layout, responsive e alternativas sem movimento |
| app.js | Filtros por dia, fotos ampliáveis, entrega e FAQ nativo |
| v14-app.js | Docentes, slides, voz, música/ducking, drone e timeline |
| v14-core.js | Regras para conteúdo marcado publicado |
| src/v14-core.mjs | Fonte equivalente do validador para testes Node |
| tests/manifest.test.mjs | Testes sintéticos de manifesto/evidência |
| docs/briefing-v1.4 | Os seis documentos recebidos, preservados como referência histórica |

## Recursos e dependências reais
WordPress/PHP, HTML/CSS/JS nativos. Fontes DM Sans e Manrope via Google Fonts. Não há React, Three.js, nova base de dados, token no navegador, pagamento ou reconhecimento facial executado por este plugin. As consultas 21st identificaram dois candidatos; nenhum código integral de componente foi importado. As alternativas atuais são próprias.

## Conteúdo científico
Cada docente publicado precisa de identidade revisada, fontes e exatamente três falas com texto literal, arquivo de áudio HTTPS, intervalo em milissegundos, revisão e direitos. Slides publicados exigem revisão e direitos. Nenhum dado em branco deve virar nome, fala, biografia ou foto fictícia. O esquema inicial e os testes ajudam a prevenir publicação indevida; não substituem revisão editorial.

## Desenvolvimento e publicação
Alterações são aplicadas ao módulo WordPress autorizado, relidas/hash conferido e observadas no domínio real. Os scripts privados de autenticação, credenciais, dumps e mídia original não fazem parte deste repositório público. O deploy exige acesso do owner; GitHub sozinho não publica no WordPress.

Para verificar o validador: `npm test` (Node; sem dependências externas).

## Limites
Mídias reais, provider, cards docentes preenchidos, reprodução auditiva/iPhone, CRM C10/C16, artigos de escolas/BPA/SEDAM e QA completo continuam pendentes. Não classificar o projeto completo por existir esta base. Não copiar preços de Mugiwara/XCM para o congresso. Não presumir apoio institucional.

Autor da implementação: Codex Dell G3, a pedido de Emanuel Santana, 03/11/2026 America/Manaus. Os originais Mugiwara/XCM permanecem intactos.

## Revisão com o ChatGPT
Abra [o roteiro de auditoria](docs/PARA_CHATGPT.md). A comprovação dos arquivos que o WordPress está servindo está em [VERIFICACAO_PUBLICA.json](docs/VERIFICACAO_PUBLICA.json). Há imagens de referência com ambiente e versão identificados em docs/imagens.

