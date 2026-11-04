# 03 — Fontes, máquinas e retomada

Codex | DELL_MACBOOK_NO | 2026-11-04T07:53:06-04:00 | revisão documental v2.1 | ACK027

## Código receptor
- GitHub https://github.com/emanuelssantana/prime-formatura-cerfloro-2026
- Checkout Dell C:\lcjob\prime-cerfloro-public, snapshot público PRIME_codigo_53bd570.zip neste pacote.
- Plugin plugin/prime-memoria-eventos, WordPress páginas 2436 e 2437.
- Público https://primeformatura.com.br/fotos/ e https://primeformatura.com.br/fotos/ii-cerfloro-2026/.
- Arquivos de produção sob /home/u249999030/domains/primeformatura.com.br/public_html/wp-content/plugins/prime-memoria-eventos.
- Backup anterior registrado no PROD_024.json nas evidências; não tratar backup como restauração testada.

## Fontes doadoras copiadas para FONTES
- XCM original C:\lcjob\site_xcm\payload_final.html; gerador montar_final.py; CSS complementar e musica_autoplay.js. Cópias portáteis FONTES/XCM.
- Mugiwara original G:\Meu Drive\IDEs_Agents_26\Manu_fotografias_RO&Manu_fotografia_esportiva\Entrega_fotos_eventos\Mugiwara_Fest_2026; FONTES/MUGIWARA traz HTML base, CSS/JS, player vendor e módulos Antigravity. São snapshots com hashes; comparar com doadores vivos antes de alegar versão mais recente.
- Fontes vivas XCM https://manufotografiaesportiva.com.br/entregafotos/ciclismo_final_circuito_centro_oeste_xcm_2026_alvorada/ e Mugiwara https://estudiocriativoprimefotografia.com/entregafotos/mugiwarafest/.
- player MFMusic origem web/vendor/music-youtube-v1.2.1.js → receptor mf-music-legacy.js; deck origem hero-3d-card/updateDeck → receptor app.js/style.css/event.html; moldura origem mf-v12.css → style.css. Copiados parcialmente, não paridade integral.
- mf-galeria.css/js, módulos carrossel-equipe, moldura-gamer e efeitos-personagem precisam confronto função a função, sem importar identidade temática do doador.

## Mídias e rede
- X:\#ENTREGA_FOTOS_26_SSD447_X-B550\11_03-11-26_ii-congresso-florestal; no Dell X: mapeia \\R5-5500-5500M\X_ssd_447_workFOTOS_usb. Na B550 localizar o volume físico correspondente, não presumir letra X igual.
- P: no Dell mapeia \\R5-5500-5500M\II_raw_1de2_F--B550. Slides RAW em P:\11_01-nov-26_II-Congresso-Florestal-CERFloRO\DIA1_Raw_II-CERfLOro-5d3\Dia1_slides+elmentos_raw_No-people.
- T:\aPOWERrec\Palestra_IIcongreso_srt existe como fonte informada; nesta leitura T: não expôs UNC. Não inventar endereço de rede. Índice SRT privado foi copiado para inventários.
- Pré-processados Dell C:\lcjob\cerfloro-previews-final, agora cópias em G:\Meu Drive\IDEs_Agents_26\Site_primeformatura-com-br\08_EVIDENCIAS\CERFLORO_PARTE2_20261104_CDX\PREVIAS_PRIVADAS e manifesto G:\Meu Drive\IDEs_Agents_26\Site_primeformatura-com-br\09_INVENTARIOS\CERFLORO_REUSO_20261104_CDX\MANIFEST_PORTATIL_356.json.
- Vídeos finais Dell C:\lcjob\cerfloro-video. Oito MP4 públicos em wp-content/uploads/cerfloro-2026/filmes-v1/; originais MOV na pasta Videos_fotos_iphone/II CONFRESSO FLORESTAL de X:.
- Drive G: é raiz observada no Dell. Presença local e hash não provam sincronização nem leitura B550; emitir recibo no destino.

## Credenciais e ferramentas
Reusar cofre Bitwarden oficial, selecionar credencial Hostinger/Prime e manter valores somente no processo. O helper de sessão deste Dell fica em C:\Users\Usuario\.local\bin\Usar-BitwardenSessao.ps1; sessão e caminhos C: não são portáveis entre hosts. Referência de acessos indicada por Emanuel em Z:\#Logins_APIs_credenciais_entre-outros_b550. Não há senha/token/chave neste pacote.
Scripts locais de deploy C:\lcjob\cerfloro\deploy-024-films.py e access.py são referências do Dell, não executar automaticamente em outra máquina. Recriar ambiente autenticado do próprio host e validar estado atual antes do deploy.

## Exceção de cópia
O HTML Mugiwara v15 na origem Drive apresentou leitura inconsistente e a cópia não passou no hash. O artefato incompleto produzido nesta rodada foi removido. Consultar o original e o link do plano GPT v2.0; as demais fontes CSS/JS/HTML base e módulos estão copiadas com hashes.
