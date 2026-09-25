# Design — tema e sistema visual

Todo o visual vive em [`style.css`](../style.css). Não há framework, nem Tailwind, nem
pré-processador. Os tokens estão em `:root` no topo do arquivo.

## Personalidade

**Industrial escuro, técnico, calmo.** A referência é painel de operação e ferramenta de
engenharia, não landing page de startup. O conteúdo é dado e sistema — o visual não pode
competir com ele.

Anti-referências, para não derrapar: gradiente decorativo em texto, glassmorphism gratuito,
emoji como ícone, sombra colorida, animação que chama atenção para si mesma, roxo de
template de IA.

## Tema

**Dark por padrão, com alternância para claro**, adicionada em 2026-09-22 a pedido do
Vinícius — revertendo a decisão original de dark único (o motivo antigo está em
[CONTEXTO.md](CONTEXTO.md), preservado como histórico).

Mecânica, em duas partes:

1. **`index.html` tem um `<script>` inline no `<head>`**, antes do `<link rel="stylesheet">`
   fazer efeito, que lê `localStorage.getItem('tema')` e, na ausência de escolha salva, cai
   para `matchMedia('(prefers-color-scheme: light)')`. Se o resultado for claro, aplica
   `data-theme="light"` no `<html>` **antes da primeira pintura**. Isso existe só para
   evitar o flash de tema errado (dark → claro) que aconteceria se a decisão ficasse para
   `script.js`, que carrega depois do `<body>`.
2. **O clique no botão** (`[data-theme-toggle]`, ícone de sol/lua na nav) alterna o atributo
   e grava a escolha em `localStorage`, em `script.js`.

Toda cor está em `:root`; o tema claro é um bloco `:root[data-theme="light"]` logo abaixo,
redefinindo os mesmos tokens. Não existe bloco `@media (prefers-color-scheme)` no CSS — a
detecção do sistema acontece uma vez, em JS, no primeiro carregamento sem preferência salva.

**O terminal fica dark nos dois temas** (`--term-bg` não muda). É tratado como aparelho —
como um editor de código — e não como parte da página que segue o tema do site.

## Tokens de cor

```css
/* dark (padrão) */
--bg:        #0B0E14   /* fundo da página                        */
--bg-alt:    #0F131B   /* faixa de seção alternada (.sec-alt)    */
--surface:   #141922   /* card, painel, nav                      */
--surface-2: #1B212C   /* chip, tag, botão secundário            */
--line:      #242B38   /* toda borda e divisória                 */
--text:      #E6EAF2   /* texto principal                        */
--text-2:    #BAC4D4   /* corpo secundário — parágrafo, item de lista */
--muted:     #8B95A7   /* texto secundário curto, legenda, metadado */
--accent:    #38BDF8   /* ciano industrial — a única cor de marca */
--accent-dk: #0EA5E9   /* hover/gradiente do botão primário      */
--on-accent: #04121C   /* texto/ícone sobre fundo sólido --accent */
--live:      #34D399   /* verde: "em produção", indicador ativo  */
--wip:       #FBBF24   /* âmbar: "em desenvolvimento"            */

--term-bg:   #070A0F   /* fundo do terminal — fixo, não muda de tema */
--ease: cubic-bezier(.16, 1, .3, 1);   /* saída exponencial */
```

```css
/* claro — :root[data-theme="light"], mesmos nomes, valores diferentes */
--bg:        #F4F6F9
--bg-alt:    #EAEEF3
--surface:   #FFFFFF
--surface-2: #EEF1F5
--line:      #DDE3EA
--text:      #10141C
--text-2:    #38414F
--muted:     #5B6577
--accent:    #0284C7   /* mais escuro que no dark: #38BDF8 sobre branco
                           não passa de 2:1 de contraste; #0284C7 passa de 4.6:1 */
--accent-dk: #0369A1
--on-accent: #FFFFFF
--live:      #047857
--wip:       #B45309
```

Ao adicionar um token novo em `:root`, **sempre** decida também o valor dele no bloco
`[data-theme="light"]` — um token esquecido ali herda o valor dark em cima de um fundo
claro, o que geralmente quebra contraste. `--term-bg` é a única exceção deliberada: existe
só no bloco dark porque o claro não o redefine de propósito.

**Regras de cor:**

- O ciano é a única cor de identidade. Ele marca: número de seção, rótulo de bloco, link
  ativo, tag de stack, botão primário, borda em `:hover`. Nunca como decoração.
- Verde e âmbar são **semânticos**, só para status de projeto. Não use para outra coisa.
  Há **uma extensão permitida**: o prompt do terminal usa `--live`, porque prompt de shell
  em verde é convenção universal e porque ele é, literalmente, o indicador de "ativo".
- **Logos de tecnologia são monocromáticos.** As marcas oficiais entram em `#757F92` e
  acendem em ciano no `:hover`. Doze cores de terceiros quebrariam a coerência.
- Texto de corpo secundário usa `--text-2`, não `--muted` — `--muted` é para legenda e
  metadado curto, e ficaria com contraste baixo demais em parágrafo longo.
- Texto ou ícone **sobre um fundo sólido `--accent`** (botão primário no hover, ícone da
  marca, barra da janela retrô) usa `--on-accent`, nunca uma cor fixa. O tema claro usa um
  ciano mais escuro que precisa de texto branco em cima; o dark usa um ciano claro que
  precisa de texto quase preto. Um valor fixo (`#04121C` ou `#fff`) funciona só num dos
  dois temas.
- Contraste mínimo de 4.5:1 no corpo, nos dois temas. Se mudar um token, reconfira os dois.

## Tipografia

**Duas famílias, com papéis separados** — via Google Fonts:

- **Inter** (`--font`) — todo o conteúdo: títulos, parágrafos, bullets.
- **JetBrains Mono** (`--mono`) — todo **metadado**: número de seção, rótulo em maiúsculas,
  tag de tecnologia, data da timeline, badge de status, estatística do hero, legenda de
  slot, barra de título das janelas.

A separação é semântica, não decorativa: mono marca o que é dado/rótulo, sans marca o que é
prosa. Isso veio do joaofortes.dev — ver [REFERENCIAS.md](REFERENCIAS.md). Dentro de cada
família, hierarquia por peso e tamanho.

| Uso | Tamanho | Peso |
|---|---|---|
| `h1` do hero | `clamp(2.35rem, 6.6vw, 4.4rem)`, `letter-spacing: -.04em` | 800 |
| `h2` de seção | `clamp(1.55rem, 4vw, 2.3rem)` | 700 |
| `h3` de card/projeto | 1rem – 1.25rem | 700 |
| `h4` rótulo de bloco | .78rem, maiúsculas, `letter-spacing: .07em` | 700 |
| corpo | 16px / 1.65 | 400 |
| legenda, metadado | .84 – .92rem | 400–500 |

Títulos grandes levam `letter-spacing` negativo (`-.02em` a `-.035em`) — sem isso o Inter
fica frouxo em tamanho display.

## Espaçamento e layout

- Largura máxima do conteúdo: `--wrap: 1100px`, com 20px de respiro lateral. A classe
  `.wrap` faz as duas coisas e é o único lugar que define margem lateral.
- Raio padrão: `--r: 14px` (cards, botões usam 11px, foto do hero 18px).
- Seções alternam fundo via `.sec-alt` para separar sem precisar de divisória forte.
- **Todo grid usa `repeat(auto-fit, minmax(Xpx, 1fr))`** e colapsa sozinho no mobile. Só há
  media query onde `auto-fit` não resolve: hero (880px) e timeline/nav (720px).
- Duas exceções propositais a `auto-fit`: `.proj-body` é `1fr 1fr` fixo (são 4 blocos, e
  `auto-fit` deixava o quarto órfão numa terceira coluna) e `.gallery-6` usa `minmax(280px)`
  para dar exatamente 3 colunas na largura do wrap, fechando 6 telas em 3×2.

## Componentes

| Classe | O que é |
|---|---|
| `.term` | **o terminal interativo** — peça central do hero, ver seção própria abaixo (zalt) |
| `.status` | pill `● Disponível` na nav; substituiu o eyebrow do hero (Dribbble back-end) |
| `.theme-toggle` | botão sol/lua na nav; alterna `[data-theme]` no `<html>` — ver seção Tema |
| `.rail-social` | trilho fixo de redes na goteira esquerda (devmachado / Dribbble back-end) |
| `.kbd` | tecla desenhada — usada na dica do terminal (`Tab`, `↑`, `↓`); ref. chanhdai |
| `.h2-copy` | botão de copiar link da seção, num de cada `h2`; ref. chanhdai |
| `.shot-info` | legenda que sobe no hover de cada slot de mídia, com o texto de `data-cap`; ref. Uiverse.io |
| `.hero-grid` | quadriculado animado em `<canvas>`, só no hero; ref. ShapeGrid — ver Movimento, item 7 |
| `.scroll-video-track` / `.scroll-video-pin` | animação que avança com o scroll (vídeo ou canvas+quadros WebP com alfa); três instâncias, todas na goteira — a lata (`#sobre`, direita) e a moto (`#trajetoria`, direita) travam a tela (`position: sticky`), o halter (`#stack`, esquerda) rola junto com o título ao lado (`position: static`, de propósito); ref. ScrollVideo.vue — ver Movimento, item 8 |
| `.logos` | faixa de 11 marcas oficiais, monocromáticas (zalt) |
| `.checks` | checklist em duas colunas com check verde desenhado (zalt) |
| `.ico-stroke` / `.ico-brand` | os dois conjuntos de ícone — ver abaixo |
| `.panel` | bordas verticais no container da seção — assinatura do chanhdai |
| `.rbtn` / `.rbtn-primary` | botão retrô: mono, maiúsculas, borda, seta que desliza (joaofortes) |
| `.rwin` | janela retrô com barra de título e botão × (joaofortes) |
| `.overview` / `.ov` / `.tile` | grid de ícone+texto com IconTile (chanhdai) |
| `.stack` / `.stack-row` | stack como tabela numerada com divisor tracejado (chanhdai) |
| `.flip` | frases rotativas em mono (chanhdai) |
| `.coords` | coordenadas com globo no canto do hero (joaofortes) |
| `.avail` | bloco de disponibilidade no contato (joaofortes) |
| `.ping` | ponto pulsante no emprego atual (chanhdai) |
| `.card` | painel genérico: superfície + borda + raio + padding |
| `.proj` | card de projeto; é `flex column` para a galeria poder ancorar na base |
| `.proj-hero` | variante larga do projeto em destaque, com brilho ciano no canto |
| `.badge` | status do projeto (`.badge-live`, `.badge-wip`) |
| `.tags` / `.tags-stack` | chips de tecnologia; `-stack` é a variante ciano |
| `.shot` | slot de mídia, estilizado como **janela de aplicação** — ver abaixo |
| `.screen-line-top` / `.screen-dashed-bottom` | linha de 1px que atravessa a viewport inteira |
| `.stripe-divider` | faixa de listras diagonais entre seções |
| `.link-underline` | sublinhado discreto que firma no hover |
| `.timeline` | experiência profissional, duas colunas virando uma no mobile |
| `.ccard` | cartão de contato |
| `.reveal` | qualquer elemento que entra com animação de scroll |

## Linhas de tela

Um pseudo-elemento com `left: -100vw; width: 200vw` faz uma linha de 1px atravessar a
viewport inteira, mesmo estando dentro do container de 1100px. É o que dá o ar de papel
técnico. Usado em dois lugares onde o efeito é visível:

- **abaixo de cada `h2`** (variante tracejada)
- **acima do bloco de estatísticas** do hero

Nas `<section>`, que já ocupam a largura toda, um `border-top` comum dá o mesmo resultado —
por isso elas não usam o pseudo-elemento.

⚠️ `html { overflow-x: clip }` existe **por causa dessas linhas**. Sem ele os 200vw geram
scroll horizontal. Tem de ser `clip`, não `hidden`: `hidden` no `html` quebraria a nav
`sticky`.

## Slots de mídia como janelas

Cada `.shot` é desenhado como janela de aplicação: barra de título com o nome do módulo
(vem do atributo `data-title`, renderizado via `content: attr(data-title)`) e três pontos de
controle à direita. É literal — o conteúdo do slot **é** uma captura de aplicação — e
resolve o placeholder vazio parecer erro de carregamento.

A barra come 26px do topo, então em slot estreito não caberia ícone + título + legenda. Uma
**container query** (`@container (max-width: 240px)`) mede o próprio slot e reduz o
placeholder só ao título. Por isso a legenda do placeholder está envolvida em `<i>` — para
poder ser escondida sem mexer no título.

**A legenda que sobe no hover** (`.shot-info`, ref. Uiverse.io — ver
[REFERENCIAS.md](REFERENCIAS.md)) mostra o mesmo texto do `data-cap` — o que já alimenta a
legenda do lightbox — direto no card, sem precisar clicar. Só aparece quando a mídia
carregou de verdade (mesmo gate que o `.play` usa: `img.ok ~ .shot-info` /
`video.ok ~ .shot-info`). É puramente visual — `pointer-events: none`, o clique continua
sendo do `<button>` inteiro, igual sempre foi.

A primeira versão deste componente era um ícone de "ampliar" no canto (`.shot-expand`).
**Foi trocado a pedido do Vinícius**: ele não queria a promessa de tela cheia, só a
animação de revelar mais informação — que já existia como texto real (`data-cap`), então
não foi preciso inventar dado novo, só reaproveitá-lo num segundo lugar.

⚠️ **A ordem dos filhos dentro do `<button class="shot">` importa.** Tem que ser sempre
mídia → `.shot-ph` → `.play` (só vídeo) → `.shot-info`, nessa sequência exata. As regras
`img.ok + .shot-ph` e `video.ok + .shot-ph` usam o combinador `+` (irmão **imediato**) — um
elemento novo inserido entre a mídia e `.shot-ph` quebra silenciosamente a troca de
placeholder por mídia real. Foi exatamente o bug da primeira tentativa (com `.shot-expand`):
nasceu entre a mídia e o placeholder, e os 18 slots pararam de revelar a mídia carregada. A
correção foi mover o elemento para o fim, depois de tudo — e essa regra vale igual para
`.shot-info`.

## O terminal

A peça com mais presença do site, e a única com movimento de verdade. Vem do bloco de CLI
do zalt.me, mas aqui **não é metáfora**: o Vinícius sobe VPS, escreve unit de systemd e
entra por SSH. Um shell na página descreve o trabalho dele literalmente.

Partes, de cima para baixo: barra de título `vinicius@wida: ~/portfolio` com três controles,
logo em ASCII de blocos sólidos, caixa `comandos` com o rótulo apoiado sobre a borda,
área de log e a linha de entrada com o bloco piscante.

Três decisões que não devem ser desfeitas:

1. **A saída de `whoami` está escrita no HTML.** Os quatro números de prova (7 módulos,
   4 painéis, ~5h, 1 responsável) aparecem mesmo com o JavaScript desligado. O script só
   acrescenta a capacidade de digitar comandos novos.
2. **O ASCII usa só `█` e espaço.** A versão com glifos de sombra (estilo "ANSI Shadow")
   virava ruído de renderização em tamanho pequeno. Blocos sólidos ficam nítidos em
   qualquer tamanho. O desenho é gerado letra a letra — ver `docs/REFERENCIAS.md`.
3. **O log rola por dentro** (`max-height: min(22rem, 45vh)`). Sem isso o terminal cresceria
   a cada comando e empurraria a página inteira.

O `min-width: 0` em `.term` e `.term-body` é **obrigatório**: sem ele o `<pre>` do ASCII
força o item de grid a ficar mais largo que a tela no mobile.

## Os dois conjuntos de ícone

Nenhum ícone é caractere Unicode ou emoji. São dois conjuntos, cada um coerente consigo:

| Classe | O quê | Estilo |
|---|---|---|
| `.ico-stroke` | interface: seta, download, e-mail, os tiles do overview | traço autoral, `stroke-width: 1.9`, pontas arredondadas |
| `.ico-brand` | tecnologia e redes: Python, Docker, GitHub… | marcas oficiais do [simple-icons](https://simpleicons.org), preenchidas, monocromáticas |

Os SVGs de marca estão **inline no HTML**, não em arquivo externo — o site não tem build e
não deve depender de CDN. Para acrescentar um: baixe de
`cdn.jsdelivr.net/npm/simple-icons@13/icons/<nome>.svg`, tire o `<path>` e embrulhe em
`<svg viewBox="0 0 24 24" class="ico-brand" aria-hidden="true">`.

## Movimento

**Um momento autoral no corpo da página, não efeito espalhado.** A entrada do terminal é
esse momento; o resto do scroll é discreto o bastante para não competir com ele. A grade
animada do hero (item 7) é a exceção deliberada — mas fica **contida na primeira dobra**,
então não conta como "espalhado": ninguém rola a página e encontra um segundo protagonista
de movimento no meio do caminho.

1. **Terminal** — sobe 26px, sai de `scale(.985)` e de `blur(7px)` até assentar, em 800ms
   com saída exponencial. O blur é o que dá sensação de aparelho ligando em vez de mais um
   card subindo. Em seguida as linhas do log entram em cascata (340ms → 660ms).
2. **Entrada de seção** — `.reveal` sobe 12px em 550ms, escalonada: irmãos que revelam
   juntos ganham `--d` de até 280ms, em vez de aparecerem todos no mesmo instante.
3. **Hover** — cards sobem 2–3px e a borda vira ciano; botões retrô invertem cor; a seta
   desliza. Os trilhos laterais acendem em ciano.
4. **Frases rotativas** — 4 frases sob o `h1`, troca a cada 3s.
5. **Ping** — ponto verde pulsando na pill da nav e no emprego atual, 1.8s em loop.
6. **Prévia do vídeo ao aparecer na tela** — a miniatura toca sozinha, em loop, muda, assim
   que entra na tela (sem precisar de clique nem hover), e volta ao primeiro quadro ao sair.
   Era só ao apontar (hover/foco de teclado) até 2026-09-25; trocado por pedido do
   Vinícius pra autoplay assim que visível — ver [REFERENCIAS.md](REFERENCIAS.md).
7. **Grade do hero** (`.hero-grid`, ref. ShapeGrid — ver [REFERENCIAS.md](REFERENCIAS.md)) —
   quadriculado em `<canvas>` deslizando devagar (.35px/quadro) atrás do conteúdo do hero;
   as células sob o cursor acendem em ciano e deixam um rastro de 5 células que apaga
   sozinho. Só existe no hero, por pedido do Vinícius — ver a justificativa de escopo no
   topo desta seção. **Roda sempre**, independente de `prefers-reduced-motion` — ver a nota
   abaixo. **`.hero-in` é `pointer-events: none`**, com `auto` de volta só em `.cta` e
   `.term` — sem isso, o título, a foto e as coordenadas ficam numa camada acima do
   `<canvas>` (precisam disso pra ser clicáveis/selecionáveis) e o mouse nunca chega à
   grade nessas áreas: nenhuma célula acende ao passar por cima do texto, mesmo a grade
   estando desenhada ali (foi confundido com "a grade não funciona atrás do texto" — a
   grade sempre desenhou ali, só não reagia ao mouse).

> **Duas exceções deliberadas a `prefers-reduced-motion`: itens 6 e 7.** O item 6 porque
> rolar até o elemento aparecer é gesto explícito do visitante, não movimento ambiente. O item 7
> — a grade — é uma exceção por um motivo diferente: **histórico de três tentativas**.
>
> 1. Primeira versão: escondia o `<canvas>` inteiro (`display:none`) sob a preferência.
>    Longe demais — sumia para qualquer visitante com "reduzir movimento" ligado no
>    sistema, o que é comum e fácil de estar ligado sem lembrar (Windows tem essa opção).
>    Relatado como bug pelo próprio Vinícius: "não foi adicionado a grade animada".
> 2. Segunda versão: desenhava a grade parada, sem deslizar nem reagir ao cursor, sob a
>    preferência — a régua "conteúdo aparece, só a animação desliga" que o resto do site
>    já segue. Mais correta em teoria, mas na prática o Vinícius **não conseguiu desligar a
>    preferência do Windows de forma estável** — a opção "Mostrar animações" revertia
>    sozinha (provavelmente Economia de Energia) — e ficou preso vendo só a versão parada,
>    sem conseguir testar nem usar a versão animada que ele tinha pedido.
> 3. Versão final: a grade **ignora `prefers-reduced-motion` por completo**, como o item 6.
>    Decisão consciente, não descuido — abre mão de uma proteção de acessibilidade real
>    (a grade tem deslizamento contínuo, o tipo de movimento que a preferência existe para
>    desligar) porque as duas tentativas anteriores de respeitá-la deixaram o recurso
>    inutilizável para quem pediu. Se algum dia isso importar para outro visitante, a
>    correção é reverter para a régua do item 2 (`if (reduced) { desenhar(); } else { ...
>    loop ... }` — o código já existiu, está no histórico do repositório).
>
> Cuidado ao testar: **o Chrome headless reporta `prefers-reduced-motion: reduce` por
> padrão.** Um recurso condicionado a essa consulta parece quebrado no teste automatizado
> sem estar quebrado no navegador real — e o inverso também aconteceu aqui: código que
> parecia certo no teste (grade escondida "corretamente") escondia de verdade no navegador
> real de quem tinha a preferência ligada. Teste os dois sentidos, não só um.

8. **Animação controlada pelo scroll** (`.scroll-video-track`/`.scroll-video-pin`, ref.
   ScrollVideo.vue — ver [REFERENCIAS.md](REFERENCIAS.md)) — uma lata de Monster Energy gira
   conforme o usuário rola pela seção Sobre mim. A pista cobre a seção inteira (fora do
   `.wrap`, irmã dele): **começa exatamente no topo de "Sobre mim" e termina exatamente onde
   "Stack tecnológica" começa** — a duração do scroll-scrub é a altura real da seção, não um
   valor chutado. O pin fica alinhado à direita, sangrando pra fora do `.wrap` e ocupando a
   goteira direita, em vez de ficar contido dentro do bloco de texto (essa goteira teve um
   índice de seções, `.rail-index`, removido em 2026-09-25 — a lata já sangrava por cima
   dele antes, e continua ocupando o mesmo espaço agora vazio). A tela fica travada nela (via `position:
   sticky`, sem JS bloqueando o scroll de verdade) enquanto a pista passa por baixo; a
   **animação em si roda por toda a janela de visibilidade** — começa a girar assim que a
   lata aparece na tela (entrando por baixo), termina no último quadro exatamente quando
   ela some por trás da nav (saindo por cima), não só durante o trecho "grudado". **Terceira
   exceção a `prefers-reduced-motion`**, mesma família das dos itens 6 e 7: a animação só
   avança quando a pessoa rola — é o gesto dela, não movimento ambiente. Em telas ≤900px,
   sem goteira nem gutter pra sustentar a trava por telas inteiras, ela muda de
   comportamento: aparece embutida no início da seção, girando sozinha em loop enquanto
   está visível, sem prender o scroll.

   **Segunda instância: um halter, na seção Stack tecnológica — única que não "prende a
   tela".** Goteira **esquerda** em vez de direita, ao lado de `.rail-social` (os ícones de
   GitHub/LinkedIn/WhatsApp/e-mail). Vive dentro de `#stack`, a
   pista herda a altura real da seção — sem `<div>` dedicada, sem alterar a estrutura do
   texto de Stack (logos, categorias, tags continuam exatamente como estavam). Diferente da
   lata e da moto, o pin do halter **não é `position: sticky`** — fica `static`, rolando no
   mesmo ritmo que o título "Stack tecnológica" ao lado dele, sempre à mesma distância,
   nunca "prendendo a tela". O giro continua 100% controlado pelo scroll (mesmo mecanismo
   de leitura de progresso); só a câmera parou de tentar ficar fixa na viewport — ver
   [REFERENCIAS.md](REFERENCIAS.md) pelo raciocínio completo (foram três tentativas até
   chegar aqui). O título e a linha-guia logo abaixo ganharam um respiro à esquerda
   (`padding-left`) só pra não ficarem por baixo do pin nas larguras de tela onde os dois
   coincidem — o resto do conteúdo da seção não precisou mudar. Mesma exceção a
   `prefers-reduced-motion`, mesmo fallback em loop abaixo de 900px.

   **Terceira instância: uma moto se desmontando, na seção Trajetória.** Mesma goteira
   **direita** da lata — vive dentro de `#trajetoria`, mesma regra de CSS reaproveitada
   (`#sobre .scroll-video-pin, #trajetoria .scroll-video-pin`). A moto (Honda Africa Twin)
   começa montada e se desmonta peça por peça conforme a pessoa rola pela seção — ideia do
   Vinícius: representar a evolução a cada emprego da linha do tempo. Timeline, Formação e
   Certificações continuam exatamente como estavam. Fundo removido por um modelo de
   segmentação por IA em vez de recorte por cor — o vídeo original muda de fundo (começa
   branco, vira cinza com vinheta) ao longo da gravação, e recorte por distância de cor
   fixa não acompanha isso; ver [REFERENCIAS.md](REFERENCIAS.md) pelo porquê.

   O fundo original do vídeo (branco) foi removido via `ffmpeg colorkey` — é só a lata,
   sem moldura/card atrás. Isso é desenhado num `<canvas>` a partir de 117 quadros WebP
   com canal alfa (`data-scroll-frames`/`data-frame-src`), **não** um `<video>`: nenhum
   codec de vídeo com transparência testado aqui (WebM/VP9 alpha) sobreviveu de forma
   confiável ao próprio decode do `ffmpeg` local, então o mecanismo de scrub (bloco 8 do
   `script.js`) tem dois braços — `<video>` para animações futuras que não precisem de
   fundo removido, `<canvas>` + sequência de quadros para as que precisam — escolhidos
   automaticamente pelo que existe dentro de cada `[data-scroll-video-track]`. Ver a
   apuração completa em [REFERENCIAS.md](REFERENCIAS.md).
   > **Limitação de teste conhecida:** o Chrome headless deste ambiente não consegue
   > simular scroll de forma confiável dentro de um iframe aninhado (usado para testar sem
   > afetar o site em produção), nem confirmar `video.currentTime` via seek — nem em vídeos
   > já funcionando em produção no site. A geometria do scroll (pin/progresso) e a
   > transparência real do `<canvas>` foram validadas (a última, com screenshot do site de
   > verdade rodando); o resultado visual do scrub em si precisa de confirmação num
   > navegador de verdade.

Nenhuma transição anima largura, altura ou margem — sempre `transform`/`opacity`, e
qualquer rótulo que apareça sob hover fica posicionado em absoluto para não refluir o
elemento ao redor (era o caso do índice lateral, removido em 2026-09-25 — o princípio
continua valendo pro que restou, como o `.h2-copy` e o `.shot-info`).

`prefers-reduced-motion: reduce` desliga quase tudo: revela o conteúdo imediatamente, zera
as transições e troca o scroll suave por salto direto. **Nunca remova esse bloco** — sem
ele o site fica inutilizável para quem tem sensibilidade vestibular. As exceções são os
itens 6, 7 e 8 acima (prévia de vídeo, grade do hero, vídeo do scroll), deliberadas e
documentadas ali — qualquer item novo que reaja a movimento deve continuar respeitando a
preferência por padrão, a menos que haja o mesmo tipo de motivo forte.

## Superfícies do navegador

As partes que o navegador desenha sozinho também são do projeto. Estão todas tematizadas
no topo de `style.css` e não devem voltar ao padrão:

- `::selection` — ciano a 26% sobre texto quase branco.
- **Barra de rolagem** — `scrollbar-color` para Firefox e `::-webkit-scrollbar` para o
  resto: trilho no fundo da página, polegar em `--surface-2` com borda de 2px que simula
  respiro.
- **Caret do terminal** — o nativo é desligado (`caret-color: transparent`) e substituído
  pelo bloco piscante `.term-caret`, que é o indicador de foco do campo.
- `font-variant-numeric: tabular-nums` em tudo que é número em coluna: estatísticas do
  terminal, datas da timeline, coordenadas.

## O que foi removido de propósito

Não recoloque sem motivo — a justificativa completa está em
[REFERENCIAS.md](REFERENCIAS.md):

- **Eyebrow acima do `h1`.** Rótulo antes do título é ruído. A informação virou a pill
  `● Disponível` na nav e as coordenadas no canto do hero.
- **Os dois trilhos laterais fixos** (redes à esquerda, índice de seções à direita).
  Entraram na refatoração de 2026-09-22 e **saíram no mesmo dia, a pedido do Vinícius**:
  ocupavam espaço visual demais para conteúdo que já existe na nav, no hero e no contato.
  Voltaram os dois pouco depois (ainda em 2026-09-22, largura >1280px). O trilho social
  (`.rail-social`) continua no ar; **o índice de seções (`.rail-index`/`.idx`) foi removido
  de novo em 2026-09-25**, dessa vez por decisão final — a navegação por seção continua na
  nav e no comando `ajuda` do terminal. Se o índice voltar, que seja sem rótulo que invada
  o texto (o motivo original de 09-22 continua valendo).
- **Faixa de estatísticas do hero.** É o molde "número grande + rótulo pequeno". Os mesmos
  números agora são a saída de `whoami` no terminal.
- **Dois dos quatro CTAs do hero.** LinkedIn e GitHub vivem no trilho social.

## Ao mexer no visual

1. Mude o token em `:root`, não o valor no componente — e decida o par no bloco
   `[data-theme="light"]` na mesma edição, nunca depois.
2. Confira contraste se tocar em cor de texto, **nos dois temas**. Texto pequeno precisa
   de 4.5:1 — foi por isso que o índice lateral (removido em 2026-09-25) tinha subido pra
   `--muted` em vez de um cinza mais apagado, quando ainda existia.
3. Nunca use uma cor fixa (`#0B0E14`, `#fff`, um `rgba(...)` de fundo escuro) fora dos
   tokens. Um valor hardcoded funciona só no tema em que foi escrito e vaza no outro —
   foi o que quebrou a nav e a `::selection` na primeira versão do toggle, corrigido com
   `color-mix(in srgb, var(--bg) 82%, transparent)` no lugar do rgba fixo.
4. Reconfira em 375px — é onde quebra primeiro. Todo item de grid que contenha `<pre>`,
   tabela ou texto longo precisa de `min-width: 0`. Toda `minmax(Npx, 1fr)` em grade que
   possa aparecer numa tela mais estreita que N precisa virar `minmax(min(Npx, 100%), 1fr)`
   — sem o `min()`, a coluna trava em N e a grade estoura (foi o bug do `.gallery-v`, que
   nasceu com `minmax(420px, 1fr)` e overflowava a partir de ~414px).
5. Não introduza uma segunda cor de marca sem motivo forte; o ciano sozinho é o que dá
   coerência ao conjunto.
6. Ícone é desenhado, nunca caractere Unicode nem emoji. Use um dos dois conjuntos.
7. Não anime largura, altura, padding ou margem. Use `transform` e `opacity`.
8. Ao testar tema com script automatizado: **clique + captura de tela no mesmo passo pode
   flagrar uma corrida de repintura que não existe de verdade** — o clique dispara a
   mudança de `data-theme`, mas o navegador pode não ter repintado tudo a tempo do
   screenshot. Dê uma folga (algumas centenas de ms) entre o clique e a captura, ou —
   mais confiável — grave o tema em `localStorage` e recarregue a página, testando o
   caminho real de "visitante que já escolheu antes".
