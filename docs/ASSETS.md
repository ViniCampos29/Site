# Assets — inventário de mídia e como adicionar

O site funciona com a pasta de mídia vazia: cada slot mostra um placeholder com o nome do
módulo. Conforme os arquivos chegam, os placeholders somem sozinhos.

**Estado (atualizado em 2026-09-25, fim do dia): toda a mídia do site está resolvida.** São
**14 peças**: a foto do hero, 5 prints e 8 vídeos. Os 6 slots de "Telas do sistema", os 4 de
"Em funcionamento" e os cards de LifeManager, Sites e VCWB Bikes Pro — o último item que
faltava — estão todos no lugar. Os cards de LifeManager,
Sites institucionais e VCWB ficam só com vídeo de demonstração, sem print ao lado — os dois
slots de print do VCWB (que nunca tiveram arquivo) foram removidos do HTML nesta mesma
atualização, mesma decisão já tomada pro LifeManager e Sites em 2026-09-24 (galeria com
vídeo só).

**Para adicionar qualquer mídia: salve o arquivo com o nome exato da tabela abaixo.**
Nenhum código muda. Depois abra [`verificar.html`](../verificar.html) para confirmar que o
site enxergou.

## Foto do hero — feito

| Arquivo | Onde aparece |
|---|---|
| `assets/foto-vinicius.jpg` | coluna direita do hero — **no lugar** |

Retrato, proporção **4:5** (o slot recorta com `object-fit: cover`, então o rosto precisa
estar centralizado). Mínimo 600×750px. Aceita `.jpg` ou `.webp` — se usar `.webp`, troque a
extensão no `src` do `<figure class="hero-foto">` em `index.html`.

## Capturas de tela — "Telas do sistema", 6 slots, todos preenchidos (2026-09-25)

Todas em `assets/projetos/`, proporção **16:10**, mínimo 1280px de largura (exceto
`wida-02-financeiro.mp4`, que é vídeo — ver a tabela de vídeos abaixo).

| Arquivo | Tela | Origem |
|---|---|---|
| `wida-01-producao.png` | "Motor de dados" — consultas SQL/PL-SQL por trás dos módulos (não é tela de usuário, é o editor de código) | `Downloads/SQL_SISTEMA.jpeg`, 2026-09-25 |
| `wida-02-financeiro.mp4` | "RH — Ponto" — apuração de ponto, faltas/atrasos, ficha do colaborador com OEE individual. **Note o nome do arquivo**: ficou `financeiro` por herança do slot antigo, o conteúdo real é RH — o `data-title`/`data-cap` no HTML é que descrevem certo | `Desktop/rh.mp4`, 2026-09-25 — cortado (ver seção de vídeos) |
| `wida-03-produtividade.png` | Módulo Produtividade — OEE **máquina a máquina**, por setor (não é ranking por colaborador, que era a legenda antes de qualquer arquivo existir) | `Downloads/oee.jpeg`, 2026-09-25 |
| `wida-04-comercial.png` | Módulo Comercial — meta do período, % atingido, meta×vendido por tipo de item | `Downloads/comercial.jpeg`, 2026-09-25 |
| `wida-05-auditoria.png` | Módulo Auditoria — detecção automática de anomalias no PCP e no cadastro | `Downloads/auditoria_sistema.jpeg`, 2026-09-25 |
| `wida-06-painel-tv.png` | Painel TV autônomo — meta de produção mensal, semanal e por turno | `Downloads/produção.jpeg`, 2026-09-25 |

Detalhes de como cada arquivo foi localizado, pareado e (no caso do vídeo) tratado por dado
sensível estão em [REFERENCIAS.md](REFERENCIAS.md), rodada de 2026-09-25 ("As cinco telas que
faltavam").

## Vídeos — 8 no total, todos preenchidos

Todos em `assets/projetos/`. **MP4 (H.264, sem áudio)** — é o único formato que toca em todo
navegador sem `<source>` alternativo. Eles não estão todos na mesma galeria: só os quatro do
Wida ficam em "Em funcionamento".

| Arquivo | Onde aparece | O que mostra | Entregue |
|---|---|---|---|
| `wida-producao.mp4` | Em funcionamento | módulo de produção e aparas por setor | 1280×606 · 14s · 757 KB |
| `wida-planta.mp4` | Em funcionamento | planta isométrica, status por máquina, e os 3 modais de detalhe | 1280×606 · 12s · 443 KB |
| `wida-powerbi.mp4` | Em funcionamento | relatórios de produção em Power BI | 1152×792 · 25s · 1,43 MB |
| `wida-estoque.mp4` | Em funcionamento | estoque de matéria-prima no celular, vídeo completo sem cortes | 1280×720 · 31s · 902 KB |
| `wida-02-financeiro.mp4` | **Telas do sistema** | RH — Ponto (ver a tabela da seção anterior sobre o nome do arquivo) | 1280×586 · 13s · 814 KB |
| `vcwb-demo.mp4` | card do VCWB | OS com checklist, histórico e dashboard da oficina | 1280×720 · 130s · 4,63 MB |
| `lifemanager-demo.mp4` | card do LifeManager | app de finanças, tela de veículo e histórico | 1280×644 · 28s · 708 KB |
| `sites-demo.mp4` | card dos Sites | navegação pelo site da Wida Embalagens | 1280×606 · 25s · 1,59 MB |

Total: **11,2 MB** para os oito.

Os quatro vídeos do Wida ficam numa galeria 2×2 (`.gallery-v`, `minmax(420px, 1fr)`), que
dá a cada um largura suficiente para se ler a interface antes de ampliar. O `vcwb-demo`, o
`lifemanager-demo` e o `sites-demo` ficam sozinhos no card do projeto, com `shot-wide`
ocupando a linha inteira. O `wida-02-financeiro` é o único vídeo **misturado com prints**,
dentro de `.gallery-6`, e por isso tem uma exceção de CSS (`.gallery-6 .shot-vid`) que o
mantém em 16:10 como os 5 vizinhos, em vez do 16:9 padrão de `.shot-vid`.

## Vídeo — VCWB Bikes Pro, 1 slot, preenchido (2026-09-25)

Já consta na tabela geral de vídeos acima; esta seção existe pelas duas decisões
específicas que ele carrega (dado fictício e duração fora do padrão).

| Arquivo | O que mostra | Entregue |
|---|---|---|
| `vcwb-demo.mp4` | ordem de serviço com checklist, histórico de OS, e dashboard de desempenho (KPIs, gráficos, tabela de pagamentos) | 1280×720 · **2min10s (130s)** · 4,63 MB |

Fica sozinho num `.gallery-2` com `shot-wide` (mesmo padrão do LifeManager e Sites — vídeo
ocupa a linha inteira, sem print ao lado), substituindo os dois slots de print
(`vcwb-01-os.png`, `vcwb-02-dashboard.png`) que nunca tiveram arquivo e foram removidos do
HTML nesta atualização.

**Fonte dos dados**: nomes de cliente, telefone e valores em R$ que aparecem no vídeo
(tabela de pagamentos, ordens de serviço) são **fictícios — dado de demonstração gerado só
pra essa gravação**, confirmado pelo Vinícius em 2026-09-25. Por isso foi publicado sem
nenhuma censura.

**Duração fora do padrão, de propósito**: o original tem 2min43s (163s), bem acima dos
20-40s que o resto do site segue. Perguntado se preferia que um trecho fosse selecionado, o
Vinícius pediu inicialmente o vídeo completo (mesma exceção já usada no `wida-estoque.mp4`,
mas por duração em vez de censura); depois, numa rodada seguinte, pediu pra cortar os
primeiros 10s e os últimos 23s — resultando nos 130s atuais. Fora esse corte, só escala pra
1280 de largura, remoção de áudio e `+faststart`:

```bash
ffmpeg -ss 10 -i vcwb_demo.mp4 -t 130 -vf "scale=1280:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset slow -g 60 -an -movflags +faststart \
  vcwb-demo.mp4
```

Sem crop: a gravação já veio em tela cheia, sem chrome de navegador nem marca d'água — só
a barra lateral de navegação do próprio app (Streamlit) e o cabeçalho "Deploy" do Streamlit,
que fazem parte da interface real, não precisam sair.

### Como esses arquivos foram produzidos (2026-09-22)

As gravações originais estão na área de trabalho do Vinícius e **não entram no
repositório**. Três problemas tiveram de ser resolvidos antes de publicar:

**1. Marca d'água do Bandicam.** Todas as gravações feitas com ele têm
`www.BANDICAM.com` fixo no topo centro, em `y ≈ 8..30`. Recortar o topo elimina, e o mesmo
recorte já tira o chrome do navegador ou a faixa da área de trabalho.

**2. Chrome de janela.** O pedido era "mostrar apenas as janelas". Os recortes usados:

| Origem | Filtro | O que sai |
|---|---|---|
| gravação de navegador (1592×864) | `crop=1592:754:0:110` | marca d'água, abas, barra de endereço e favoritos |
| app desktop LifeManager (1592×864) | `crop=1592:800:0:64` | marca d'água e a faixa da área de trabalho |
| Power BI (1152×828) | `crop=1152:792:0:36` | marca d'água e a barra de título |

A barra de endereço tinha de sair também porque mostrava **caminho local**
(`C:/Users/jflas/...`) e a barra de favoritos, os nomes das pastas dele.

**3. Travamento no carregamento.** Duas causas, ambas resolvidas:

- **`-movflags +faststart`** é o que mais importa. Sem ele o índice do MP4 (átomo `moov`)
  fica no fim do arquivo, e o navegador precisa **baixar o vídeo inteiro** antes de saber a
  duração — que é exatamente o que os slots pedem com `preload="metadata"`. Com faststart,
  só alguns KB de cabeçalho são buscados no carregamento da página.
- **CRF 28 + escala para 1280 + `-an`.** Áudio removido também porque a especificação do
  site é vídeo mudo.

Receita completa, para um vídeo novo:

```bash
ffmpeg -i entrada.mp4 \
  -vf "crop=1592:754:0:110,scale=1280:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset slow -g 60 -an -movflags +faststart \
  saida.mp4
```

### Proporção e o lightbox

Depois do recorte os vídeos ficam largos (≈2,1:1), mas o slot é 16:9. A miniatura usa
`object-fit: cover` e corta as laterais; **ao ampliar, o lightbox usa `contain` e mostra o
quadro inteiro**. Por isso não é preciso forçar 16:9 na exportação — e não se deve, porque
cortar na horizontal comeria conteúdo de interface.

### Especificação para vídeos novos

- **20 a 40 segundos.** Comece já na ação, sem tela de login nem menu inicial.
- **Sem áudio.**
- **Menos de 2 MB** por vídeo. O GitHub Pages serve arquivo estático sem CDN.
- **Sempre com `+faststart`.**
- Grave em tela cheia, sem barra de tarefas e sem outras abas visíveis.
- Se usar Bandicam na versão gratuita, conte com a marca d'água e enquadre deixando margem
  no topo para poder recortá-la.

## Antes de publicar — dado sensível

Os prints saem de **sistemas de empresa em produção**. Antes de salvar, verifique e borre:

- nome e CNPJ de cliente real
- valor de faturamento, margem, custo unitário
- nome de colaborador em ranking de produtividade
- credencial, token, caminho de servidor interno, IP da rede fabril
- **caminho local e barra de favoritos** do navegador, se a gravação pegar o chrome

O site é público e indexável. Um print com dado de cliente é um problema com o empregador,
não um detalhe. **Na dúvida, borre** — um número desfocado ainda demonstra que a tela
existe e funciona.

### O que foi encontrado, e o que o Vinícius decidiu fazer (2026-09-22)

Das seis gravações originais, três tinham dado que a regra acima manda borrar. A primeira
passagem borrou tudo. Depois, o Vinícius revisou caso a caso e **decidiu publicar dois deles
sem censura** — decisão dele sobre o próprio risco, registrada aqui para não ser desfeita
por engano numa edição futura.

> ⚠️ **Esta tabela é deliberadamente vaga.** Ela descreve *categorias* de dado sensível, não
> o dado em si. Na primeira versão os nomes reais e os valores estavam escritos aqui — o que
> anulava a própria censura: o vídeo tinha os nomes **borrados**, e o markdown que explicava
> o borrão os escrevia legíveis, em texto indexável pelo Google. Foi corrigido em 2026-09-25,
> na revisão de segurança feita antes de publicar no GitHub. **Se for editar esta tabela, não
> reintroduza nome próprio, razão social nem valor exato** — descrever a categoria basta para
> a decisão continuar rastreável.

| Gravação | O que apareceu | Decisão final |
|---|---|---|
| `wida planta` | Razão social de um cliente; nome de um operador; ~20 razões sociais de clientes nas abas "Fila da máquina" e "Histórico" | **Censura parcial, mantida.** Cliente, operador e a tabela de funcionários ficam borrados nos dois momentos em que aparecem: na planta (rótulo de operador sob cada card, 0–3,15s e 9,55–13s) e na primeira tela do modal que abre ao clicar numa máquina ("OP em produção", 2,85–6,15s). **As abas "Fila da máquina" e "Histórico" — com a lista de ~20 clientes — foram liberadas a pedido do Vinícius** e aparecem sem nenhum bloqueio |
| `powerbi` | Valor de faturamento do período, tabela de preço unitário, e o nome real de uma pessoa na barra de título | Recortado em 3s–28s, só as páginas de produção. As páginas financeiras (a partir de ~80s) não entraram no arquivo publicado |
| `wida mobile estoque` | Valor total em estoque e custo unitário de cada matéria-prima | **Sem nenhuma censura, vídeo completo (31,6s), a pedido do Vinícius.** A tentativa inicial de desfoque temporizado foi descartada — ele pediu explicitamente "não censure nada". O card de valor em estoque e a coluna de R$ da lista aparecem normalmente |

**Se alguém for regravar ou substituir esses dois vídeos**, a régua de borrar dado sensível
do início deste documento continua valendo por padrão — a exceção acima é específica destes
dois arquivos, decidida pelo dono do site, não uma mudança da política geral.

Lições técnicas que valem para a próxima, independente da decisão de publicar ou não:

- **Dado que rola não se resolve com retângulo fixo.** Se o conteúdo sensível se move, as
  opções reais são, nesta ordem: **achar a janela de tempo em que ele não aparece**,
  recortar a região da tela que não o contém, ou não publicar. Desfocar só funciona quando
  o dado fica parado no mesmo lugar — foi o caso dos nomes de operador na planta.
- **Recortar pode valer mais que desfocar.** No vídeo do estoque, isolar o celular resolveu
  o que o desfoque estragava: o painel atrás era a fonte do vazamento, não o celular.
- **Vídeo vertical cabe em slot 16:9** sem distorcer nem sobrar barra preta: centralize
  sobre um fundo que é o próprio vídeo escalado, desfocado e escurecido.
- **Varra o vídeo inteiro antes de decidir**, não só um quadro. Um mosaico resolve:
  `ffmpeg -i v.mp4 -vf "select='not(mod(n,300))',scale=400:-2,tile=3x2" -frames:v 1 g.png`
- **Tela de dashboard com filtro de cliente é armadilha**: o nome aparece no dropdown, na
  tabela e na legenda do gráfico, em lugares diferentes a cada aba.

## Adicionar um slot novo

1. Copie um `<button class="shot">` existente dentro da `.gallery` do projeto.
2. Ajuste `data-src` (ou `data-video`), `data-cap`, o `src` interno, o `alt` e o texto do
   `.shot-ph`. **Atualize também o texto dentro de `<span class="shot-info">`** — ele
   repete o mesmo texto de `data-cap`, mostrado direto no card ao passar o mouse. Os dois
   têm que dizer a mesma coisa; é conteúdo duplicado de propósito (a legenda do lightbox e
   a legenda do hover), não um esquecido.
3. Para vídeo, mantenha `class="shot shot-vid"` e o `<span class="play">` antes do
   `<span class="shot-info">`.
4. **Não mude a ordem dos filhos do botão.** Tem que ser sempre
   `<img>`/`<video>` → `.shot-ph` → (`.play`, só em vídeo) → `.shot-info`, nessa
   sequência. O CSS depende disso: `img.ok + .shot-ph` e `video.ok + .shot-ph` exigem que
   `.shot-ph` seja o **irmão imediatamente seguinte** da mídia, e `.shot-info` só pode vir
   depois de tudo. Uma versão anterior deste elemento nasceu quebrada — inserida entre a
   mídia e o `.shot-ph` — ver [DESIGN.md](DESIGN.md) para a mecânica completa.
5. Acrescente a linha correspondente na lista `SLOTS` de `verificar.html`.

## Currículo

`assets/curriculo-vinicius-de-campos.pdf` — é uma cópia de
`Desktop/Curriculo Vinicius.pdf`. Para atualizar, substitua mantendo o mesmo nome; os dois
botões de download apontam para ele.
