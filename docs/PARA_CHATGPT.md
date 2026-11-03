# Auditoria para o ChatGPT — comece aqui

Revise este repositório público completo: https://github.com/emanuelssantana/prime-formatura-cerfloro-2026

1. Leia README.md, docs/ESTADO_E_CONTINUIDADE.md e o plano diretor integral em docs/briefing-v1.4.
2. Leia todos os arquivos em plugin/prime-memoria-eventos. Compare a versão do plugin com os arquivos realmente servidos em https://primeformatura.com.br/fotos/ii-cerfloro-2026/ .
3. Use docs/VERIFICACAO_PUBLICA.json para conferir hashes e ambiente. Os sete assets estáticos conferiram byte a byte entre WordPress, fonte e GitHub em 03/11/2026. PHP foi conferido no upload autenticado e lint remoto; não tem fonte PHP exposta pela hospedagem.
4. Classifique cada requisito como implementado, parcialmente implementado, em curadoria, não testado ou pendente. Não classifique scaffolding, upload, GET200 ou teste unitário como conteúdo final ou fluxo completo.
5. Verifique desktop/mobile, áudio, slides, três falas por docente e eventuais erros de validação. Os sete testes são de regras de dados; não provam identidade, direitos ou citação literal.
6. Considere a instrução vigente: continuar a implantação diretamente no WordPress autorizado, com backup e verificação pública. O gate antigo de staging do briefing foi alterado expressamente pelo proprietário nesta conversa em 03/11.
7. Produza recomendações aditivas, sem reescrever ou alterar Mugiwara/XCM, sem migrar chatbot, sem credenciais no navegador, sem inventar mídia, docentes ou plataformas/valores.

## Prints
- imagens/base-wordpress-010-desktop.png: base inicial 0.1.0 vista no WordPress.
- imagens/preview-v14-mobile-antes-publicacao.png: preview v1.4 mobile anterior à publicação 0.1.1; não é uma nova captura final de produção.

A conferência final visual via Chrome foi interrompida pelo controle do navegador. A release atual foi verificada por HTTP, HTML e hashes; playback com mídias reais e inspeção final de interação na produção ainda pendentes.
