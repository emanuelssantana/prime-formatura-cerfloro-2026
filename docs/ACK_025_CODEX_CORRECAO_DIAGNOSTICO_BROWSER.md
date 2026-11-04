# ACK025 — Correção do diagnóstico de navegador

Codex Dell G3 | 04/11/2026 | America/Manaus UTC-4

Emanuel informou que as opções sempre estavam ativas. Revalidação da ferramenta cua.listBrowsers retornou Local browser use is disabled in Work settings. Conferência visual independente na UI do aplicativo confirmou: Navegador integrado ligado; Uso do computador/Qualquer app ligado; Google Chrome ligado; extensão do navegador instalada. Nenhuma configuração foi alterada.

Conclusão: divergência entre configuração visível e resposta da ferramenta. Não atribuir a Emanuel desativação nem pedir nova ativação. Os ACKs anteriores registraram corretamente o erro retornado, mas trataram a mensagem como prova de configuração; essa inferência é corrigida aqui. Causa técnica ainda desconhecida; não declarar falha específica de extensão, cache ou conta sem teste.

A conferência do álbum pelo canal de browser segue indisponível nesta sessão. Não usar UI alternativa para contornar a restrição reportada. Demais acessos HTTP/SSH e evidências anteriores têm seus próprios limites. Este diagnóstico não resolve a rejeição separada da publicação fotográfica e não prova que ela tenha a mesma causa.

Site permanece na última release comprovada0.2.2. Objetivo integral não concluído. Próxima investigação: suporte/conexão da ferramenta versus preferências ativas, com evidência atual; não reiniciar aplicativo ou sessões de outros trabalhos sem avaliar impacto.
