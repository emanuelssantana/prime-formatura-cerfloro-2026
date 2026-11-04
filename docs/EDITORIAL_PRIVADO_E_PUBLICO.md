# Fonte editorial privada e exportação pública

O plugin só recebe `event.public.json`, uma projeção de campos e registros aprovados. O nome legado `event.json` contém a mesma projeção sanitizada para compatibilidade e não é local de edição de rascunhos.

O arquivo editorial fonte fica fora de public_html, fora do repositório público e fora dos assets do plugin. Nunca colocar conteúdo em curadoria com nomes/áudios privados no JSON do plugin. `scripts/export-public.mjs <fonte-privada> <saida-publica>` seleciona campos por lista permitida; exclui registros em curadoria, campos desconhecidos e dados internos. A fonte privada usada no exemplo desta execução permanece no disco do proprietário e não está neste repo.

Nenhum telefone, credencial, caminho privado, embedding ou áudio bruto é necessário na projeção. Legendas, biografias e transcrições aprovadas ainda precisam de revisão humana: allowlist não identifica todo dado pessoal dentro de prosa. Testes negativos usam marcadores sintéticos, não dados reais.

Pipeline: editar fonte privada → revisar identidades/conteúdo/direitos → exportar → executar testes e revisão de conteúdo → backup → aplicar somente projeção e assets no WordPress → conferência pública. Manter também a fonte atual aprovada e recibos, sem publicar o documento privado.
