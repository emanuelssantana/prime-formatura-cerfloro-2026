# ACK005 — Vídeo reconciliado, player e mobile — 0.1.4

Codex | dell_macbook_note | 03/11/2026 22:42:56 UTC−4.

Revisados novamente quadros de toda a duração, transcrição e música_autoplay.js do XCM. Não declarar vídeo integralmente atendido.

## Matriz de atendimento

| Solicitação | Estado real |
|---|---|
| Central /fotos e evento com URL fixa | Publicados WordPress |
| Identidade acadêmica, FAQ, história autoral, compartilhamento e links entre marcas | Publicados; refinamento editorial ainda possível |
| Prazo gratuito e dois cartões equipe | Publicados 0.1.3; mantidos |
| Carrossel em pilha e controles | Código condicional pronto; sem fotos do congresso para demonstração real |
| Dossiê por palestrante, slides, três falas com timecodes | Componentes preparados; sem cadastros/mídia revisados, não funcional com conteúdo real ainda |
| Tema musical individual | Suporte por speaker.music.url; falta cadastro dos temas |
| Música ao abrir, sem mute artificial | 0.1.4 tenta play audível a 25%; caso bloqueado aguarda toque e mostra controle. Não garante autoplay sonoro no celular |
| Mesma playlist/player completo do XCM | Lógica auditada e adaptada ao gerenciador atual. Catálogo YouTube do XCM não importado como arquivos de áudio; não afirmar playlist transferida |
| Som por pessoa sem mistura | Unidade testa troca/pausa, erro de autoplay e ducking de voz. Reprodução com mídia real ainda pendente |
| Mobile | Responsivo e WebKit 390×844 + Chromium desktop testados; falta iPhone físico e conteúdo multimídia real |
| Logo animado, banners flutuantes e carrosséis editoriais completos do Mugiwara | Merge visual completo ainda pendente; não são todos dependentes de fotos |
| Tutorial real de resgate e álbum final | Pendente plataforma/URL. Instruções gerais já presentes |
| Vídeo drone e fotografias Dia 1/2 | Aguardando arquivos e curadoria |

## Publicação e auditoria

Código implantado: 5f7feac36e46f4b9d20b3f952816152de6ab47c1. URL https://primeformatura.com.br/fotos/ii-cerfloro-2026/ . CI https://github.com/emanuelssantana/prime-formatura-cerfloro-2026/actions/runs/41762184761 aprovado: 14 testes unitários, lint e browser público desktop/WebKit. Não há música no manifesto para provar reprodução real: interface informa trilhas em preparação. Testes de áudio usam objetos simulados explicitamente.

Backup anterior + hashes em 09_RELEASE/PROD_014.json. Comparação final pública de nove assets passou com SHA Git fixo; PHP por SFTP/lint. Uma primeira conferência encontrou hash de v14-app divergente porque o arquivo local havia avançado durante a primeira transferência; a leitura remota provou blob exato do commit 9fa4c32. Não era escrita de outro agente. Atualização final instalada e comparada sem divergências.

## Permissões e continuidade

Não é necessário pedir a Emanuel ampliação de permissões agora. Chrome e extensão aparecem habilitados no aplicativo; nova ferramenta local não foi revalidada. A política de autoplay do visitante independe das permissões Codex: https://www.chromium.org/audio-video/autoplay/ . Não desativar controles ou contornar preferência do visitante.

Próximo: terminar merge visual ainda ausente; incorporar mídia real e temas por docente; validar downloads na plataforma escolhida; executar testes de reprodução e aparelho físico quando disponíveis. Preservar XCM/Mugiwara fontes e não atribuir conteúdo deles ao congresso.
