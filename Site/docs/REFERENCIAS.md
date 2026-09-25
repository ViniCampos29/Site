# Referências de UI/UX

Repositórios que o Vinícius escolheu como inspiração visual, clonados e analisados em
2026-09-15. Este arquivo guarda **o que foi extraído de cada um** e o que foi deixado de
fora — para que uma sessão futura não precise reanalisar, e não copie o que já foi
descartado de propósito.

## 1. chanhdai.com

**https://github.com/ncdai/chanhdai.com** · site: https://chanhdai.com
Next.js + Tailwind v4 + shadcn/ui. Autodescrito como "a pixel-perfect dev portfolio".

### O que foi adotado

**Componentes** (arquivo de origem em `src/features/portfolio/components/`):

| Componente original | Como ficou aqui | Classe |
|---|---|---|
| `panel.tsx` — seção com `border-x` + `screen-line` | bordas verticais em todo o container de cada seção; junto das linhas horizontais forma a coluna de papel técnico | `.panel` |
| `overview/` + `intro-item.tsx` — grid de ícone + texto em mono, divisor tracejado no meio | substituiu o card "Em uma linha" na seção Sobre; 8 itens com ícone SVG inline | `.overview`, `.ov` |
| `ui/icon-tile.tsx` — chip quadrado 24px com borda + ring | ícone de cada item do overview | `.tile` |
| `overview/current-local-time-item.tsx` — relógio local | hora de Curitiba via `Intl.DateTimeFormat`, atualiza a cada 30s | `[data-clock]` |
| `tech-stack.tsx` — tabela `[01 Categoria \| badges]` com divisor tracejado | substituiu os 4 cards de stack; badges viraram pílulas | `.stack`, `.stack-row` |
| `experiences/experience-item.tsx` — ponto pulsante (`animate-ping`) no emprego atual | ao lado de "Ago/2025 — Atual" na timeline | `.ping` |
| `flip-sentences.tsx` — frases rotativas em mono | 4 frases sob o título do hero, troca a cada 3s | `.flip`, `[data-flip]` |
| `profile-header.tsx` — legenda "Fig. 1." na figura | abaixo da foto do hero | `.fig` |

**Padrões de superfície** (`src/styles/globals.css`):

| Utilitário original | Aqui |
|---|---|
| `screen-line-top` — pseudo-elemento `left:-100vw; width:200vw` | `.screen-line-top`, acima das estatísticas do hero |
| `screen-dashed-line-*` — mesma coisa, tracejada | `.screen-dashed-bottom`, abaixo de cada `h2` |
| `diagonal-stripes` — `repeating-linear-gradient(315deg…)` 10px | `.stripe-divider` antes do contato; fundo dos placeholders |
| `link-underline` — sublinhado a 30%, forte no hover | `.link-underline` nos links do overview |

O efeito somado dessas linhas é de **papel técnico / blueprint** — que cai bem num
portfólio de dados industriais, e é o motivo de terem sido escolhidas em vez de outros
padrões do repositório.

### O que foi deixado de fora

- Toda a stack (Next, React, Tailwind, shadcn) — este site é HTML/CSS/JS puro de propósito.
- `command-menu` (⌘K), `toc-minimap`, `duck-follower`, `avatar-lights`,
  `github-contributions`, `pronounce-my-name` — peso e complexidade que não se pagam num site
  de uma página, ou dependem de dado que o Vinícius não tem público (contribuições no GitHub).
- Tema claro/escuro com tokens `oklch`. **Atualização de 2026-09-22:** o site ganhou um
  toggle claro/escuro próprio (pedido do Vinícius, ver a segunda rodada abaixo), mas
  implementado do zero com os tokens hex já existentes — não importou o sistema `oklch`
  do chanhdai. Ver [DESIGN.md](DESIGN.md#tema).

## 2. joaofortes.dev

**https://github.com/askuovye/Portifolio** · site: https://joaofortes.dev
Vue 3 + GSAP + Motion + SCSS. **É o mesmo site citado como referência no pedido original
deste projeto** — o repositório é o código-fonte dele.

### Tokens do original, para consulta

```scss
--background: #030303;   --surface: #080808;    --surface-secondary: #0d0d0d;
--text-primary: #f2f2f2; --text-secondary: #aaa; --border: #4b4b4b;
--accent: #173cff;       --accent-bright: #3157ff;   /* azul elétrico */
--font-display: 'Dirtyline';  --font-mono: 'Courier New';
--site-gutter: clamp(1rem, 3vw, 2.5rem);
--section-space: clamp(3.5rem, 8vw, 8rem);
```

### O que foi adotado

**Componentes** (arquivo de origem em `src/components/`):

| Componente original | Como ficou aqui | Classe |
|---|---|---|
| `ui/RetroButton.vue` — mono, maiúsculas, borda 1px, sem raio, seta que desliza | todos os CTAs (hero e contato); hover inverte cor e desloca 3px | `.rbtn`, `.rbtn-primary` |
| `ui/RetroWindow.vue` — barra de título azul com nome de arquivo e botão ×, sombra offset dura | a foto do hero está numa janela `vinicius.dev — profile.exe` (o original usa `joao.dev - profile.exe`) | `.rwin`, `.rwin-bar`, `.rwin-x` |
| `ui/RetroWindow.vue` (idem) | cada slot de mídia tem barra de título com o nome do módulo e três controles | `.shot::before`, `.shot::after` |
| `ui/TypedText.vue` — digita ao entrar na viewport, caret `_` piscando | o eyebrow do hero é digitado a 24ms/caractere; com movimento reduzido, aparece pronto | `[data-typed]`, `.caret` |
| `ui/SectionTitle.vue` — `<span>//</span> Título` com `//` em accent | `// 01 Sobre mim` em todo `h2` | `.num::before` |
| `home/HeroSection.vue` — `<aside class="coordinates">` com globo, lat/long e país | canto superior direito do hero: `25.4284° S / 49.2733° W · Curitiba, BR` | `.coords` |
| `contact/AvailabilitySection.vue` — ponto verde + status + local/GMT + modo | bloco antes dos cartões de contato | `.avail` |
| `--font-mono` em rótulo e barra de janela | JetBrains Mono em todo metadado do site | `--mono` |

A moldura de janela é a adoção mais útil: os slots de mídia **são** capturas de aplicação,
então mostrá-los dentro de uma janela é literal, não decorativo. Também resolve o problema
dos placeholders vazios parecerem erro de carregamento.

### O que foi deixado de fora

- **Azul `#173cff`.** O ciano `#38BDF8` já é a identidade do site e tem contraste melhor
  sobre o fundo escolhido. Trocar a cor de marca não melhoraria nada mensurável.
- **Fonte display Dirtyline** — decorativa demais para um portfólio de dados industriais.
- **Metáfora de player de música** nos projetos (`ProjectPlayer`, `ProjectPlaylist`,
  `ProjectNowPlaying`, `ProjectEqualizer`). Criativa, mas não comunica sistema industrial.
- **GSAP, PageLoader, `ScrollVideo`.** O scroll reveal atual resolve com `IntersectionObserver`
  e zero dependência. (`TypedText` foi adotado, mas só no eyebrow — nunca no `h1`, para não
  atrasar a leitura da frase principal.)

---

# Segunda rodada — 2026-09-22

Cinco referências novas trazidas pelo Vinícius. Ao contrário das duas primeiras, estas
**não têm código-fonte público** — são sites publicados e shots do Dribbble. Foram
analisadas por captura de tela em Chrome headless; as capturas não ficaram no repositório.

**Decisão de direção, tomada pelo Vinícius antes de qualquer alteração:** *amplificar a
identidade existente*, não substituí-la. O ciano `#38BDF8`, o dark industrial, as janelas
retrô e o papel técnico permanecem. As referências entraram como **estrutura e componentes**,
nunca como paleta ou tipografia. Nenhuma cor de marca nova foi adicionada ao sistema.

## 3. devmachado.com.br

**https://devmachado.com.br** · Gabriel Machado, Software Engineer Full Stack.
Vite + fontes próprias. Tema escuro `#0E100F` com acento verde-menta.

### O que foi adotado

| Do original | Como ficou aqui | Classe |
|---|---|---|
| trilho vertical fixo de redes sociais na lateral esquerda | GitHub, LinkedIn, WhatsApp e e-mail em coluna fixa na goteira esquerda | `.rail-social` |
| hero com respiro muito generoso e poucos elementos | hero reduzido de 7 blocos para 4: título, frases rotativas, resumo, 2 CTAs | — |

> **Os trilhos laterais foram removidos e depois restaurados, no mesmo dia.** Primeiro o
> Vinícius pediu para tirar — *"as barras laterais de sumário e links estão ocupando muito
> espaço da tela"* — e horas depois pediu de volta, sem dar motivo. Ambos os pedidos foram
> atendidos como vieram. Se o espaço voltar a incomodar, a opção mais barata é recuar o
> ponto de corte de 1280px para uma largura maior, em vez de remover de novo.

### O que foi deixado de fora

- **Verde-menta como acento** e o fundo quase preto. O ciano já é a identidade.
- **Bricolage Grotesque + Caveat** (display pesado + manuscrita). A manuscrita não combina
  com dados industriais. A troca da fonte display continua em aberto — ver a nota no fim.
- **Avatar 3D** como peça central. O Vinícius vai usar foto real.
- Seletor de idioma PT/EN/ES e toggle de tema: o site é pt-BR e dark único, de propósito.

## 4. Dribbble — "Sr. Full-stack Developer Portfolio Website"

**https://dribbble.com/shots/24663405** · Tushar Joshi / Buddyse Team, 2024.
Preto puro, tipografia display branca em escala enorme.

### O que foi adotado

| Do original | Como ficou aqui |
|---|---|
| `>_` como motivo gráfico do portfólio técnico | virou o terminal de verdade — ver a seção 6 abaixo |
| título display em escala muito maior que o corpo | `h1` subiu de `clamp(2.1rem, 6.2vw, 4rem)` para `clamp(2.35rem, 6.6vw, 4.4rem)`, tracking em `-.04em` |

### O que foi deixado de fora

- **Tríades de pontos** e textura de partículas/ondas: decoração sem função.
- **Texto girado na vertical** na lateral: ilegível e mal suportado por leitor de tela.
- **Mockups de laptop e celular flutuando**: os slots de mídia já são janelas de aplicação,
  que é mais honesto do que simular um dispositivo que ele não usou.

## 5. husseinabdow.me

**https://www.webportfolios.dev/portfolios/x0BhjyrFFdet439pCrwEHqaSsEX2** ·
Hussein Abdow. Next.js + Tailwind + Framer Motion.

### O que foi adotado

Nada de estrutura. O site abre com uma frase centralizada sobre um **brilho radial** — o
portfólio já tinha esse recurso em `.hero::before`, então a referência apenas **confirmou**
que o brilho estava certo e podia continuar.

### O que foi deixado de fora

- **Tela de abertura com citação** antes do conteúdo. Atrasa um recrutador que tem 30
  segundos — contradiz diretamente o objetivo do site (ver [CONTEXTO.md](CONTEXTO.md)).
- Mural de comunidade com Supabase e formulário de contato: exigem backend, e a ausência de
  formulário é escolha explícita do Vinícius.

## 6. zalt.me — a referência mais aproveitada

**https://www.webportfolios.dev/portfolios/Iku9Sj8GLzQva1IL43QmOPPR0kp1** ·
Mahmoud Zalt, AI Engineering. Navy escuro, duplo acento verde + âmbar.

### O que foi adotado

| Do original | Como ficou aqui | Classe |
|---|---|---|
| **bloco de CLI** com chrome de janela, logo em ASCII, caixa `commands` e prompt | **o terminal interativo** — a mudança maior desta rodada | `.term` |
| rótulo da caixa de comandos apoiado sobre a borda | `comandos` sobre a borda superior, com fundo recortando a linha | `.term-help-t` |
| faixa horizontal de logos de tecnologia | 11 marcas oficiais (simple-icons), **monocromáticas**, acendendo em ciano no hover | `.logos` |
| checklist em duas colunas com check verde | "O que está no ar" no projeto Wida — 8 itens | `.checks` |
| números de prova em destaque | viraram a **saída do comando `whoami`**, não uma faixa de estatísticas | `.term-kv` |

O terminal é a adoção mais forte porque **não é metáfora**: o Vinícius sobe VPS, escreve
unit de systemd e entra por SSH. Um shell na página é descrição literal do trabalho dele.

### O que foi deixado de fora

- **Verde `#4ADE80` e âmbar `#F5B841` como acentos de marca.** Aqui verde e âmbar continuam
  **semânticos** — `--live` para "em produção", `--wip` para "em desenvolvimento". A única
  extensão permitida foi o prompt do terminal em `--live`, que é indicador de ativo.
- **Logos coloridos das marcas.** Doze cores de terceiros destruiriam a coerência do ciano.
- **Retrato em anel circular com pontos orbitando.** A janela retrô já resolve o retrato.
- Cards de estatística com ícone: caem no molde "número grande + rótulo pequeno", que o site
  passou a evitar justamente ao mover os números para dentro do `whoami`.
- Seção de serviços, consultoria e CTA de agendamento: ele procura emprego, não clientes.

## 7. Dribbble — "Modern & Minimal Portfolio for Back-end Developers"

**https://dribbble.com/shots/26640395** · Rasoul Kh. Mirzaei.
Tema **claro**, minimalista, preto sobre off-white.

### O que foi adotado

| Do original | Como ficou aqui | Classe |
|---|---|---|
| índice de seções numerado em trilho fixo à direita (00–04) | 01–05 na goteira direita, sincronizado com o `IntersectionObserver` da nav | `.rail-index`, `.idx` |
| pill "Open to work" com ponto verde na barra de navegação | `● Disponível` na nav — **absorveu o eyebrow** que ficava acima do `h1` | `.status` |

O índice à direita é o que justifica os números `01`–`05` nos títulos de seção: eles não
são só ordenação, são referência de navegação real — ver a nota sobre os trilhos na
seção 3.

### O que foi deixado de fora

- **Tema claro como padrão único ou automático.** O site adicionou um toggle claro/escuro
  em 2026-09-22 (ver [DESIGN.md](DESIGN.md#tema)), mas continua abrindo em dark por padrão
  para quem não tem preferência salva nem `prefers-color-scheme: light` no sistema.
- **Recorte do retrato com balão "hello!" desenhado à mão.** Tom errado para o público.
- **Seção "Services"** com carrossel: ele não vende serviço avulso.

---

# Terceira rodada — 2026-09-22

O Vinícius pediu para explorar mais fundo os dois repositórios originais (chanhdai.com e
joaofortes.dev) em busca de componentes ainda não usados. Os dois foram clonados de novo e
lidos por inteiro — `src/features/portfolio/components/` do chanhdai (73 arquivos) e
`src/components/` do joaofortes (35 arquivos).

## O que foi adotado

| Componente original | Como ficou aqui | Classe |
|---|---|---|
| `ui/kbd.tsx` (chanhdai) — tecla desenhada, fundo sutil + sombra interna | a dica do comando `ajuda` no terminal usa `<kbd>` para Tab/↑/↓ em vez de texto solto | `.kbd` |
| `panel-title-copy.tsx` (chanhdai) — botão que copia o link âncora da seção, aparece no hover do título | um botão por `h2`, copia a URL com `#sobre` etc.; ícone troca para check e o rótulo de acessibilidade muda para "Link copiado" por 1,6s | `.h2-copy` |

Os dois foram escolhidos por serem **pequenos, de baixo custo e verificáveis** — dão para
testar objetivamente (o texto do `<kbd>`, o conteúdo copiado, a troca de ícone) sem exigir
dado que o Vinícius não tem.

## O que foi visto e descartado — com o motivo

Registrado para não ser reconsiderado sem motivo novo na próxima rodada:

| Componente | Do quê | Por que ficou de fora |
|---|---|---|
| `CareerSkillTree.vue` | joaofortes — árvore de habilidades estilo jogo, nós conectados, "locked nodes", tooltip de proveniência | Show visual impressionante, mas pede um dataset de habilidades-e-conexões que não existe (o currículo do Vinícius não descreve dependências entre competências) — inventar isso quebraria a regra de não fabricar fato do [CONTEXTO.md](CONTEXTO.md). Também é peso e complexidade (SVG animado, hit-testing, layout responsivo próprio) desproporcional ao ganho |
| `insights-metrics.tsx` | chanhdai — grade de métricas tipo analytics (visitantes, sessões) com seta de tendência | Precisa de dado real de tráfego que o site não coleta. E é, estruturalmente, o mesmo molde "número grande + rótulo pequeno" que **já foi removido do hero nesta refatoração** (ver segunda rodada) — recolocar em outro lugar contradiz a própria decisão |
| `FakeCaptcha.vue` | joaofortes — puzzle de "verificação humana" com 9 blocos da foto do usuário | Brincalhão, tom errado para "industrial, técnico, calmo" ([DESIGN.md](DESIGN.md)); pede a foto cortada em 9 blocos, o que essa foto (retrato de corpo, não still de estúdio) não comporta bem |
| `verified-icon.tsx` | chanhdai — selo azul de "verificado", estilo redes sociais | Implica uma verificação oficial que não existe — sinal de credibilidade fabricado |
| `handwritten-note.tsx` + `HandwrittenArrow` | chanhdai — anotação em fonte manuscrita com filtro de textura de tinta | Exigiria uma terceira família tipográfica só para uma anotação; o sistema tem duas por design (sans para conteúdo, mono para metadado) e cada uma tem papel definido. Também foge do tom industrial |
| `ExperienceScrollDecoration.vue` | joaofortes — vídeo de fundo (uma lata de bebida) com parallax fixo atrás da timeline | Literal ao produto do João; não existe equivalente para Vinícius. Dependeria do `ScrollVideo.vue`/GSAP já descartados na primeira rodada |
| `sponsors.tsx`, `testimonials.tsx`, `recognition/` | chanhdai — patrocinadores, depoimentos, prêmios | O Vinícius não tem patrocinador, depoimento coletado nem prêmio registrado. Adicionar a seção vazia ou com dado inventado violaria a regra de conteúdo do [CONTEXTO.md](CONTEXTO.md) |

## O que saiu do site nesta rodada

Registrado para que ninguém recoloque sem motivo:

| Removido | Por quê |
|---|---|
| `.eyebrow` acima do `h1` (com o efeito de digitação) | rótulo antes do título é ruído; o `h1` se sustenta sozinho. A informação virou a pill `● Disponível` na nav e as coordenadas no canto |
| faixa `.stats` com os 4 números | é o molde "número grande + rótulo pequeno". Os mesmos números agora são a saída de `whoami`, escritos no HTML — aparecem sem JavaScript |
| 2 dos 4 botões do hero | LinkedIn e GitHub foram para o trilho social; sobraram 2 CTAs com hierarquia clara |
| `Cloudflare` na faixa de logos | com 12 itens sobrava um órfão na segunda linha em 1440px. Continua listado na tabela de stack |
| seta `→` e `↓` como caractere Unicode nos botões | viraram SVG autoral, no mesmo traço do resto dos ícones |
| triângulo do botão de play feito com truque de `border` | virou SVG, pelo mesmo motivo |

## Nota em aberto — a fonte

O detector de design sinaliza **Inter** como fonte saturada: aparece em tantos sites que
deixou de ser distintiva. A observação é justa, e o devmachado.com.br mostra o caminho
oposto (Bricolage Grotesque dá personalidade imediata ao nome).

**Não foi trocada** porque tipografia é decisão de identidade, e a direção acordada foi
amplificar o que existe, não substituir. Se o Vinícius quiser encarar, a troca é só do token
`--font` — o `--mono` (JetBrains Mono) deve ficar, já que marca metadado e código.

## Como usar estas referências

Os dois primeiros repositórios têm código e podem ser clonados de novo:

```bash
git clone --depth 1 https://github.com/ncdai/chanhdai.com.git
git clone --depth 1 https://github.com/askuovye/Portifolio.git
```

Os cinco desta segunda rodada só existem como site publicado. Para reanalisar:

```bash
chrome --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=9000 --window-size=1440,2600 \
  --screenshot=ref.png https://zalt.me/
```

Ao pedir um ajuste visual, vale citar de qual referência vem a ideia. E quando entrarem
referências novas, registre aqui o que foi adotado **e o que foi descartado de propósito** —
a segunda lista evita refazer discussão já encerrada.

---

# Quarta rodada — 2026-09-22

## 8. Uiverse.io — "CodePen Card" por Praashoo7

**https://uiverse.io** (autor: Praashoo7). O Vinícius colou o CSS direto, sem link — é um
componente de card com thumbnail, botão de tela cheia no canto (aparece no hover) e chips
de likes/comentários/visualizações que também aparecem no hover, mais um switch deslizante
separado.

### O que foi adotado — e depois ajustado no mesmo dia

| Do original | Primeira tentativa | Versão final | Classe |
|---|---|---|---|
| `.fullscreen` — botão de ampliar no canto, opacidade 0 → 1 no hover do card | ícone de "ampliar" no canto, mesmo papel do original | **substituído**: o Vinícius não queria a promessa de tela cheia — só a *animação* de revelar mais informação. Virou uma legenda que sobe do rodapé com o texto de `data-cap` (o mesmo que já alimenta o lightbox) | `.shot-info` |

A ideia de fundo do Uiverse — algo aparece no hover para comunicar mais sobre o card — foi
mantida. O que mudou foi **o quê** aparece: não um atalho de navegação (tela cheia), e sim
conteúdo real que já existia (a legenda). Reconstruído nos tokens do próprio site
(`.ico-stroke`, a mecânica `.ok` de mídia carregada) em vez de herdar as cores/fonte do
Uiverse (`#252525`, `#727890`, Montserrat). Ver a mecânica completa, e o bug de ordem no
DOM que a primeira tentativa causou, em [DESIGN.md](DESIGN.md#slots-de-mídia-como-janelas).

### O que foi deixado de fora

- **Chips de likes/comentários/visualizações.** O site não tem essas métricas — mostrar
  contador seria dado fabricado, contra a regra do [CONTEXTO.md](CONTEXTO.md).
- **O switch deslizante.** O Vinícius perguntou especificamente por isto num campo
  separado da pergunta e **não escolheu essa opção** — o toggle de tema continua sendo o
  botão sol/lua já existente (ver segunda rodada). Se pedir de novo, o CSS do switch já
  foi lido; a implementação viraria tokens do site do mesmo jeito que os outros dois itens.
- **`card_back`, a animação de escala do card inteiro no hover.** O `.shot` já tem o
  próprio hover (`translateY(-3px)` + borda ciano); duplicar com outra animação de escala
  por cima teria virado movimento demais no mesmo elemento.

---

# Quinta rodada — 2026-09-22

## 9. ShapeGrid — componente React trazido pelo Vinícius

Sem link — o Vinícius colou o código-fonte direto. É um `<canvas>` que desenha uma grade
(quadrado, hexágono, triângulo ou círculo) deslizando devagar numa direção, com as células
sob o cursor acendendo e deixando um rastro que apaga sozinho. Pedido explícito: usar como
plano de fundo.

### Onde entrou, e por quê só ali

**Só no hero**, por escolha do Vinícius numa pergunta direta. O site já tem um momento de
movimento autoral — o terminal (ver [DESIGN.md](DESIGN.md#movimento)) — e essa regra
("um momento, não movimento espalhado") continua valendo. Colocar a grade na página
inteira, fixa atrás de tudo, competiria com o terminal pelo posto e manteria um loop de
`requestAnimationFrame` rodando o scroll inteiro. Contida no hero, ela é textura de
abertura, não um segundo protagonista.

### O que foi adotado

| Do original | Como ficou aqui | Onde |
|---|---|---|
| Grade em canvas, desliza numa direção, quadrado/hexágono/triângulo/círculo configuráveis | só **quadrado** — é o que bate com o "papel técnico" que o resto do site já sugere (`.screen-line`, `.stripe-divider`, as coordenadas do hero). Hexágono/triângulo/círculo nunca seriam usados aqui, então saíram do código em vez de ficar como opção morta | `.hero-grid`, bloco 7 de `script.js` |
| Cor de borda e de preenchimento por prop (`borderColor`, `hoverFillColor`) | lidas de `var(--line)` e `var(--accent)` via `getComputedStyle`, **relidas a cada troca de tema** (clique no botão sol/lua chama `lerCores()` de novo) — o original não tinha tema para trocar | mesmo bloco |
| Rastro de células que apaga (`hoverTrailAmount`) | mantido como estava, 5 células | mesmo bloco |
| Pausa fora da viewport e com a aba em segundo plano (`IntersectionObserver` + `visibilitychange`) | mantido — é o mesmo cuidado que o resto do site já tem com custo de CPU/bateria | mesmo bloco |

### Bug real encontrado e corrigido: canvas é elemento substituído

A primeira versão usava só `.hero-grid { position: absolute; inset: 0; }` — e o canvas
renderizava em **0×0**, invisível, sem erro no console. `<canvas>`, como `<img>` e
`<video>`, é um **elemento substituído**: `inset: 0` sozinho não o estica para preencher o
contêiner como faria com uma `<div>`; sem `width`/`height` explícitos em CSS, ele fica no
tamanho intrínseco padrão do elemento (300×150) — e como o pai (`.hero`) é maior, a régua
de `offsetWidth`/`offsetHeight` que o JS lê para dimensionar o canvas também dava 0,
fechando o círculo do bug. A correção foi adicionar `width: 100%; height: 100%;` junto do
`inset: 0`. Documentado em detalhe, com o motivo, em
[DESIGN.md](DESIGN.md#slots-de-mídia-como-janelas) — não é intuitivo e é fácil de
reintroduzir sem essa nota.

### Três voltas até a grade animar de verdade

**1. Armadilha de teste, não do site.** O Chrome headless usado para tirar screenshot
**sempre reporta `prefers-reduced-motion: reduce`**, e a primeira versão de `.hero-grid`
tinha `display: none` sob essa preferência — escondendo o canvas em todo screenshot,
parecendo bug sem ser. Confirmado sobrepondo `display: block !important` só no teste.

**2. Bug real, relatado pelo próprio Vinícius: "não foi adicionado a grade animada".**
O `display: none` do item 1 não era só um estorvo de teste — era a regra de verdade do
site, e qualquer visitante com "reduzir movimento" ligado no sistema (comum no Windows,
fácil estar ligado sem lembrar) simplesmente não via a grade nenhuma. **Escondida
demais**: a preferência deveria tirar a animação, não o conteúdo. Correção: a grade passou
a desenhar sempre, estática sob a preferência e animada sem ela — a régua "certa" que o
resto do site (`.reveal`) também segue.

**3. Segundo relato, ainda insatisfeito: "a animação ainda não está funcionando".** A
correção do item 2 era tecnicamente correta e ainda assim não resolveu o problema do
Vinícius, porque a causa raiz não era o código — era o **Windows dele revertendo sozinho**
a opção "Mostrar animações" (ligada ao `prefers-reduced-motion` que os navegadores leem),
provavelmente por Economia de Energia. Ele nunca conseguiu manter a preferência desligada
tempo suficiente pra ver a grade animar, e não tem por que ter que brigar com o próprio
sistema operacional para usar o site dele mesmo. **Correção final: a grade ignora
`prefers-reduced-motion` por completo**, igual à prévia de vídeo no hover — uma segunda
exceção deliberada, abrindo mão conscientemente da proteção de acessibilidade nessa peça
específica porque as duas tentativas de respeitá-la à risca deixaram o recurso
inutilizável para quem pediu. Ver a mecânica exata e o raciocínio completo em
[DESIGN.md](DESIGN.md#movimento) e [ARQUITETURA.md](ARQUITETURA.md).

Uma armadilha extra apareceu ao investigar o item 3: testar com `matchMedia` sobreposto
num iframe **posicionado fora da tela** (`left:-9999px`, para esconder a UI do teste)
mostrava zero quadros de animação — não porque a grade estivesse quebrada, mas porque
navegadores suspendem `requestAnimationFrame` em conteúdo fora da viewport. Só ficou claro
que o código sempre funcionou testando com o iframe genuinamente visível.

### Quarto relato: "só não funciona atrás do texto"

Com a animação já rodando de verdade, o Vinícius reportou que a grade não funcionava
especificamente atrás do título e do parágrafo do hero. Medi a densidade de pixels
desenhados atrás do texto contra outras áreas do hero (foto, margens): **praticamente
idêntica em todo lugar** (3,8% a 4,7%), e uma ampliação pixel a pixel confirmou as linhas
cruzando visivelmente atrás e ao redor das letras. A grade sempre desenhou ali —
**o problema era o hover, não o desenho.**

Causa: `.hero-text` (e o resto de `.hero-in` — foto, coordenadas) fica numa camada
(`z-index:1`) acima do `<canvas>` porque precisa disso para ser clicável e selecionável.
Isso significa que o mouse nunca alcançava o elemento do canvas nessas áreas — o
navegador entrega o evento `mousemove` para o elemento mais alto sob o cursor, que era o
texto, não a grade por baixo. Fora do texto (margens vazias, dentro do terminal já com
seu próprio scroll), o mouse chegava direto ao canvas e o hover funcionava — daí o
Vinícius perceber que "funcionava, só não atrás do texto".

Corrigido com `pointer-events: none` em `.hero-in`, devolvendo `pointer-events: auto`
só para `.cta` (os dois botões) e `.term` (o terminal inteiro) — os únicos filhos que
precisam de clique ou digitação de verdade. O resto do conteúdo do hero passa a ser
"transparente" para o mouse, deixando-o atravessar até o canvas. Ver a mecânica exata em
[DESIGN.md](DESIGN.md#movimento) e [ARQUITETURA.md](ARQUITETURA.md).

### O que foi deixado de fora

- **Hexágono, triângulo, círculo.** Ver acima — nenhum se encaixa na identidade do site, e
  manter os três como código morto (nunca chamado) não se paga.
- **Props genéricas via componente reutilizável.** O original é um componente React
  parametrizável para qualquer uso; aqui existe **uma instância, um lugar**. Os valores
  (tamanho de célula, velocidade, rastro) viraram constantes no topo do bloco, não
  parâmetros — não há um segundo `<canvas>` no site que precise de outra configuração.

---

# Sexta rodada — 2026-09-23

## 10. ScrollVideo.vue (joaofortes.dev) — vídeo controlado pelo scroll

O mesmo componente que tinha sido **descartado na primeira rodada** ("GSAP, PageLoader,
`ScrollVideo`. O scroll reveal atual resolve com `IntersectionObserver` e zero
dependência") voltou por pedido explícito do Vinícius: um vídeo (`assets/sobre-monster.mp4`
— uma lata de Monster Energy girando 360°) que trava na tela dentro da seção Sobre mim
enquanto o usuário rola, avançando quadro a quadro, e solta a página quando termina.
Primeiro de três — ele avisou que vai pedir mais dois do mesmo tipo.

### Como ficou aqui — sem GSAP

O original usa GSAP ScrollTrigger para o pin e o scrub. Aqui o mesmo resultado sai só de
CSS + `currentTime`:

| Do original (GSAP ScrollTrigger) | Como ficou aqui |
|---|---|
| `pin: true` + `start`/`end` — trava o elemento via JS | `position: sticky` no CSS. O navegador já resolve "gruda no topo enquanto o pai rola, solta quando o pai acaba" nativamente — não é scroll-jacking, a barra de rolagem nunca é interceptada |
| `onUpdate` mapeando progresso → frame do vídeo | um `scroll`/`resize` listener com throttle por `requestAnimationFrame`, lendo `getBoundingClientRect()` da pista e do elemento pinado pra calcular o progresso, e setando `video.currentTime` |

`.scroll-video-track` (a "pista", com a altura que dá o percurso de rolagem) e
`.scroll-video-pin` (o que gruda, via `sticky`) são genéricos — qualquer vídeo novo do
mesmo tipo só precisa do mesmo par de elementos com `--frames`/`--fps` próprios no atributo
`style`; o JS em `script.js` (bloco 8) já processa `[data-scroll-video-track]` em lote, sem
precisar de código novo por vídeo.

### Reencode obrigatório: um keyframe por quadro

O vídeo original (117 quadros, apenas 5 keyframes) travaria feio em scroll-scrub — buscar
um quadro qualquer exige decodificar desde o keyframe anterior, e com só 5 num vídeo de 5s
isso é lento demais para acompanhar o scroll em tempo real. Reencodado com
`-g 1 -keyint_min 1 -sc_threshold 0` (todo quadro é keyframe), sem áudio (`-an`, já que o
vídeo é mudo por requisito), 640px de largura — 814 KB, contra 1,5 MB do original mesmo
sendo tecnicamente "menos comprimido" (I-frame em todo quadro custa mais bits por quadro
que P/B-frames, mas a remoção do áudio e a escala menor compensaram de sobra).

```bash
ffmpeg -i original.mp4 -an -vf "scale=640:-2" \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 20 -preset slow -movflags +faststart \
  saida.mp4
```

### Limitação de teste encontrada — e como foi contornada

**O Chrome headless usado para testar este projeto não consegue buscar (`seek`) posição
de vídeo de forma confiável.** Isso não é específico deste arquivo: o mesmo teste rodado
contra `wida-planta.mp4` — um vídeo já em produção no site, confirmado funcionando antes
nesta mesma sessão — trava exatamente do mesmo jeito (`currentTime` sempre volta a 0 ou
para um valor fixo baixo, `readyState` às vezes regride e não recupera). Testado com três
combinações de flags do Chrome (`headless=new` com e sem `--disable-gpu`, `--headless`
clássico, `--use-gl=swiftshader`) — nenhuma resolveu.

**Conclusão: é uma limitação do ambiente de teste, não um bug no código ou no vídeo.**
A mecânica foi validada de outras formas, todas confiáveis neste ambiente:

- A geometria do scroll (`getBoundingClientRect()` da pista e do pin, o cálculo de
  progresso) foi testada isoladamente e bate exatamente com o scroll real, em pixel — só
  a última etapa (aplicar isso a `video.currentTime` e ler de volta) não pôde ser
  confirmada aqui.
- `position: sticky` foi confirmado computado corretamente no elemento pin.
- A integridade do arquivo reencodado foi confirmada via `ffprobe` (117 de 117 quadros são
  keyframe, duração correta, sem erro de decodificação).
- Atributos (`muted`, sem `controls`, `playsinline`, `src` correto) confirmados via DOM.

**O que não pôde ser verificado automaticamente: a suavidade e a precisão do scrub de
verdade, num navegador real.** Isso precisa de confirmação visual do Vinícius.

### O que foi deixado de fora

- **GSAP e ScrollTrigger.** O site inteiro já evita dependência externa; `position:sticky`
  nativo faz o mesmo trabalho do `pin:true` sem precisar de biblioteca.
- **Texto ao lado do vídeo durante o scroll.** O Vinícius escolheu explicitamente "só o
  vídeo" numa pergunta direta — sem frase/legenda acompanhando enquanto a lata gira.
- **Scroll-jacking de verdade (interceptar o evento de wheel/scroll e chamar
  `preventDefault`).** Method mais frágil, quebra o scroll por teclado, barra de rolagem
  arrastada com o mouse, e leitores de tela — `position: sticky` entrega a mesma sensação
  de "travado" sem nenhuma dessas desvantagens.

### Atualização, mesmo dia — fundo removido, `<video>` virou `<canvas>` + sequência WebP

Pedido seguinte do Vinícius: remover o fundo branco do vídeo ("deve ser apenas a lata"),
mover a lata pra dentro de `.about` (ao lado do parágrafo de texto, não numa faixa acima
dele) e confirmar que ela congela no último quadro em vez de sumir ao fim do scroll.

**Remoção de fundo — `ffmpeg colorkey`.** O fundo é branco bem uniforme (RGB ~252-253 em
todo canto testado); a lata tem áreas claras próprias (RGB ~157-216 em partes do corpo
metálico) bem mais próximas do branco do que se gostaria. Limiares altos de `colorkey`
(0.12-0.32) recortavam pedaço do corpo da lata junto com o fundo; `colorkey=white:0.05:0.02`
manteve o fundo 100% transparente sem comer a lata, confirmado quadro a quadro nas
121 posições da rotação (não só numa amostra).

**Por que não virou vídeo com alfa.** WebM/VP9 suporta canal alfa nominalmente
(`-pix_fmt yuva420p`), e o encode até roda sem erro — mas o próprio `ffmpeg` desta máquina,
ao decodificar de volta o `.webm` gerado, devolve o vídeo sempre opaco
(`pix_fmt=yuv420p`, tag `alpha_mode=1` presente no container mas nunca recomposta no
decode). Ou seja: nem a ferramenta que gerou o arquivo consegue confirmar que a
transparência sobrevive de volta — sinal forte demais de fragilidade pra confiar num
`<video>` em produção sem poder validar. A saída foi trocar o mecanismo: em vez de um
`<video>`, os 117 quadros viram arquivos WebP estáticos (`libwebp`, não `libwebp_anim` —
esse gera um único WebP animado, sem acesso por índice de quadro), com alfa real
confirmado via composição sobre um fundo axadrezado antes de entrar no site. Um
`<canvas>` desenha o quadro certo a cada tick de scroll — mesmo `drawImage` de sempre,
sem nenhuma dependência de codec de vídeo com transparência.

**Layout: `<canvas>` dentro do grid de `.about`.** `.scroll-video-track`/`-pin` deixaram de
ser uma faixa entre o `<h2>` e `.about` e passaram a ser a segunda coluna do grid de
`.about` (`grid-template-areas: "text video" / "overview overview"`), ao lado do parágrafo
de "Sobre mim" de verdade, não acima dele. A pista perdeu a altura de `220vh` (pensada pra
uma faixa de página inteira) e caiu pra `130vh` — ainda dá bastante percurso de scroll pra
scrub suave, sem exigir uma seção gigante só pra essa coluna.

**Recorte dos quadros.** A lata não só gira, ela se desloca bastante dentro do quadro
original (1280×720) — a posição da lata em cada um dos 121 quadros foi medida
(bounding box da transparência via PIL) e o corte final usa a união de todas: praticamente
o quadro inteiro (x: 1-71%, y: 5-97%), então não dava pra cortar muito sem arriscar cortar
a lata em algum ângulo da rotação. O ganho de tamanho perceptível veio de alargar a coluna
do `<canvas>` no CSS (260px → 340px), não do corte da imagem.

**Modo genérico do bloco 8, agora com dois braços.** `script.js` bloco 8 passou a suportar
`<video data-scroll-video>` (mecanismo original, ainda vale pra vídeo sem necessidade de
transparência) e `<canvas data-scroll-frames data-frame-src="...f_%03d.webp">` (sequência
de imagens) no mesmo loop `[data-scroll-video-track]`, escolhendo o modo pelo que existe
dentro da pista. A leitura de progresso do scroll (`ligarScrub`) é compartilhada pelos
dois — só a última etapa (setar `currentTime` vs. desenhar no canvas) muda. Os próximos
dois vídeos do mesmo tipo (avisados pelo Vinícius) usam o braço que fizer sentido pra cada
um: `<video>` se não precisar de fundo removido, `<canvas>` se precisar.

**"Congela no fim" já vinha de graça.** O cálculo de progresso já era
`Math.min(1, Math.max(0, ...))` — passado o fim da pista, o progresso trava em `1` e o
quadro desenhado trava no último (`frames - 1`); não precisou de lógica nova pra "não
sumir ao terminar".

**Ajuste de ritmo — pista mais alta.** Depois de ver o resultado, o Vinícius pediu pra não
"deixar preso" na seção Sobre: a pista original desse pivô (130vh) dava só ~710px de
percurso de rolagem pra passar pelos 117 quadros — rápido demais, a rotação "pulava" em vez
de fluir como o vídeo original tocando a 24fps. Subida para `210vh` (percurso ≈1400px+,
mais generoso até que o pin de tela cheia da primeira versão), com `.scroll-video-track`
ocupando as duas linhas do grid (texto + resumo) via `grid-template-areas` pra não sobrar
vão vazio entre elas no fluxo normal do documento. Ver a pegadinha de teste correspondente
em [ARQUITETURA.md](ARQUITETURA.md) — capturar a página inteira com uma janela gigante pra
caber tudo num print faz `position: sticky` nunca grudar, e isso pareceu (sem ser) um vão
vazio gigante quebrado no meio do layout.

**Terceiro ajuste — sai do `.wrap`, cobre a seção inteira, invade a goteira.** Pedido novo
do Vinícius, citando a página `/about` do joaofortes.dev como referência de identidade
visual: a lata não deveria ficar "presa" dentro do bloco de texto — deveria começar
exatamente no topo da seção Sobre mim e terminar exatamente onde a seção Stack começa, e
tem permissão explícita pra invadir a goteira onde mora `.rail-index` (o índice numerado
01-05 fixo na lateral), sem se preocupar em ficar contida dentro do container de 1100px.

Isso trocou a abordagem de vez: `.scroll-video-track` deixou de ser filha de `.about`
(dentro do grid, dentro de `.wrap`) e virou **irmã** de `.wrap.panel`, direto dentro de
`<section id="sobre">` — com `#sobre { position: relative }` e a pista em
`position: absolute; inset: 0`. Isso faz a altura da pista ser **exatamente** a altura real
da seção (calculada pelo navegador a partir do conteúdo normal — `.wrap.panel` — sem
nenhum vh chutado), o que já resolve sozinho "começa em Sobre, termina no início de Stack"
e substitui o `210vh` chutado do ajuste anterior: o fim de `#sobre` é, por definição, onde
`#stack` começa.

O pin (`.scroll-video-pin`) ficou alinhado à direita da pista via flexbox, com
`margin-right` copiando a mesma fórmula de distância da borda que `.rail-index` já usava
(`clamp(.75rem, calc(50vw - 638px), 3rem)`) — mesma goteira, de propósito. `z-index: 95` no
track garante que a lata passe **por cima** do índice lateral (`z-index: 90`) quando as
duas coincidirem na tela durante o scroll, em vez de ficar escondida atrás dele — "invadir"
aqui significa sobrepor, não só ocupar o mesmo espaço.

**Quarto ajuste — qualidade da imagem e da borda.** Pedido do Vinícius pra refinar a
qualidade depois de aprovar a posição. Dois defeitos reais apareceram numa inspeção de
perto (composto sobre fundo axadrezado, fora do navegador):

1. **Furinhos no corpo da lata.** Os reflexos claros do metal (quase brancos) batiam perto
   o suficiente do limiar do `colorkey` pra virar buraquinhos transparentes soltos no meio
   da lata, sem estar conectados ao fundo de verdade. `colorkey` não faz análise de região
   conectada — é só distância de cor por pixel — então não distingue "fundo branco de
   verdade" de "reflexo branco na lata". Corrigido com um *closing* morfológico no canal
   alfa antes de exportar: `dilation` (fecha os buraquinhos pequenos) seguido de `erosion`
   (desfaz o crescimento da dilatação, mas os buracos já preenchidos não reabrem — pequenos
   demais pra sobreviver ao processo).
2. **Halo esbranquiçado na borda.** Pixel de borda parcialmente transparente é uma mistura
   de cor da lata com o branco do fundo original — o `colorkey` não faz *decontaminação* de
   cor (não existe filtro pronto no ffmpeg pra isso fora de green/blue screen; `despill` só
   cobre esses dois casos, sem opção pra fundo branco). Em vez de reconstruir a cor
   verdadeira, a saída prática foi "apertar" (*choke*) a máscara: mais um `erosion` depois
   do closing, comendo ~1-2px da borda contaminada pra dentro. Perde-se um triz de nitidez
   no contorno, ganha-se a ausência do halo.

Pipeline final por quadro:
```
colorkey=white:0.05:0.02, crop (bounding box do movimento da lata),
format=yuva420p, split → [rgb] e [a]
[a] alphaextract → dilation → erosion → erosion → [ae]
[rgb][ae] alphamerge → scale=640:-2 (achatamento morfológico feito
                                      em resolução alta, antes do downscale
                                      final — o downscale ainda suaviza
                                      qualquer serrilhado residual)
→ format=rgba → WebP q:v 90 (subiu de 82)
```
Resolução dos quadros subiu de 420px pra 640px de largura — a exibição no site usa até
~300px CSS de largura, e em tela de alto DPI (`devicePixelRatio` até 2, ver script.js) isso
vira até 600px reais de canvas; com a fonte em 420px, esse canvas estava fazendo upscale
(borrão) em telas assim. 640px cobre esse caso com folga. Custo: ~2,3 MB no total dos 117
quadros (de ~1,3 MB) — ainda leve pro que entrega.

`ctx.imageSmoothingQuality = 'high'` também foi ligado no desenho do canvas (bloco 8 do
`script.js`) — `setTransform`/resize do canvas reseta esse estado a cada troca de tamanho,
então precisa ser religado a cada `desenhar()`, não só uma vez no arranque.

**Verificação nesta sessão.** A transparência foi confirmada duas vezes: (1) compondo os
quadros WebP sobre um fundo axadrezado via `ffmpeg overlay`, fora do navegador; (2) com
Chrome headless carregando o site de verdade (não um teste isolado) e tirando screenshot
da seção Sobre — o `<canvas>` aparece com a lata flutuando sem nenhuma caixa/moldura atrás,
confirmando que o alfa sobrevive do arquivo até a tela. O scrub em si (avançar quadro a
quadro *durante* o scroll) não pôde ser reproduzido automaticamente aqui — mesma limitação
de scroll simulado descrita acima para o `<video>`, ver a seção abaixo — mas como o novo
código reusa a mesma função `ligarScrub` já testada geometricamente para o vídeo, e a
única mudança é "chamar uma função de desenho em vez de setar `currentTime`", a confiança
é alta; ainda assim pede confirmação visual do Vinícius rolando a página de verdade.

---

# Sétima rodada — 2026-09-24

## 11. Halter controlado pelo scroll — segunda animação do mesmo tipo

O Vinícius tinha avisado, quando pediu a lata, que viriam **mais duas** animações do mesmo
tipo. Esta é a primeira das duas: um halter (peso/dumbbell) girando, entre a seção Stack
tecnológica e a seção Sistemas que eu construí (`assets/halter.mp4` → 240 quadros, 24fps,
10s, 1280×720, fundo branco — mesmo formato de material que o Monster).

### Posicionamento — espelho da lata, na goteira esquerda

Primeira tentativa: como o halter não tem uma seção de texto pra "morar dentro" (é a
transição entre duas seções, não conteúdo de uma delas), virou um `<div class="halter-scroll">`
**dedicado**, solto entre `</section id="stack">` e `<section id="projetos">`, com altura
própria em `vh` e pin centralizado. O Vinícius corrigiu: isso alterava a estrutura da
página (um bloco novo, com altura própria, entre as duas seções) quando o pedido era só
"aparecer ao lado" do texto, sem mexer em nada mais.

Correção: o halter virou **espelho exato da lata**, só que na goteira esquerda em vez da
direita. `.scroll-video-track` é irmã de `.wrap.panel`, direto dentro de `<section
id="stack">` (que por isso precisa de `position: relative`, igual `#sobre`) — a pista cobre
com `inset: 0` a altura real de Stack, sem `<div>` dedicada nem alteração na estrutura do
texto (`.stack`, `.logos`, os parágrafos — nada disso mudou). O pin fica alinhado à
**esquerda** (`justify-content: flex-start` + `margin-left`), sangrando pra fora do `.wrap`
e invadindo a goteira de `.rail-social` (os ícones de GitHub/LinkedIn/WhatsApp/e-mail) —
mesma fórmula de distância da borda que `.rail-social` já usa, e mesmo `z-index: 95` acima
do trilho (90) que a lata usa contra `.rail-index`.

Isso motivou separar o CSS em duas camadas (ver `style.css`): uma base genérica
(`.scroll-video-track`/`.scroll-video-pin`/`.scroll-video`, mecânica de `sticky` comum a
qualquer instância) e blocos específicos por local de uso (`#sobre .scroll-video-*` pra
goteira direita, `#stack .scroll-video-*` pra goteira esquerda). Isso é o padrão pra
qualquer terceira animação futura: escolher uma seção existente pra "morar dentro" (nunca
uma `<div>` nova só pra isso) e adicionar um bloco `<contexto> .scroll-video-pin { ... }`
com o alinhamento que fizer sentido pro lugar, sem duplicar a mecânica de scroll em si.

### Preparação do vídeo — mesmo pipeline da lata, sem susto

Antes de reencodar, o vídeo foi checado quadro a quadro (início, meio, fim) — diferente da
lata, o objeto aqui é **escuro** (borracha preta, cabo metálico cinza-médio) contra fundo
branco, o oposto do problema anterior (lata clara perto do fundo branco). Amostragem de
pixel confirmou: nenhum ponto interno do objeto chega perto do branco do fundo (o pixel
mais claro encontrado fora do fundo era um pixel de borda anti-aliasada, não um reflexo de
verdade) — risco de "furo" bem menor que na lata, mas o pipeline de limpeza (closing +
choke, ver item anterior) foi aplicado do mesmo jeito, por consistência e porque não custa
nada aplicar.

A caixa delimitadora do movimento (bounding box da transparência, medida nos 240 quadros)
cobre quase o frame inteiro (98% da largura, 100% da altura — o halter se move bastante,
chega a tocar a borda inferior em parte da rotação) — sem espaço sobrando pra cortar, então
os quadros finais mantêm o frame cheio (1280×720 → 640×360), sem crop, diferente da lata
(que teve crop porque sobrava bastante fundo morto).

```bash
ffmpeg -i halter.mp4 -an \
  -vf "colorkey=white:0.05:0.02,format=yuva420p,split[rgb][a];
       [a]alphaextract,dilation=coordinates=255,erosion=coordinates=255,erosion=coordinates=255[ae];
       [rgb][ae]alphamerge,scale=640:-2,format=rgba" \
  -c:v libwebp -q:v 90 -vsync 0 assets/halter-frames/f_%03d.webp
```

240 quadros, 640×360, ~3 MB no total — surpreendentemente mais leve por quadro que a lata
(~12 KB/quadro vs. ~20 KB/quadro), porque um objeto majoritariamente preto sólido comprime
melhor em WebP que uma superfície metálica cheia de textura/reflexo.

### Verificação

Mesmo método da lata: composição sobre fundo axadrezado fora do navegador (sem furos, sem
halo, primeiro e último quadro da rotação conferidos) e screenshot do site de verdade
carregado (não um teste isolado) mostrando o halter na goteira esquerda da seção Stack,
flutuando sem moldura/caixa. O scrub em si (avançar quadro a quadro durante o scroll de
verdade) tem a mesma limitação de teste já documentada — pede confirmação visual do
Vinícius.

---

# Oitava rodada — 2026-09-24

## 12. Dois ajustes de acompanhamento — texto sobrepondo o halter, e ritmo do scroll

### Texto de Stack colidindo com o pin do halter

Depois de ver o halter na goteira esquerda, o Vinícius reportou: "02 Stack tecnológica" e
"Ferramentas que uso em produção, não em tutorial." ficavam por baixo do pin em parte das
larguras de tela — o cálculo de goteira (`margin-left: clamp(.75rem, calc(50vw - 638px),
3rem)` + largura do pin até 300px) e o cálculo de onde `.wrap` começa (`(100vw - 1100px)/2`)
não têm a mesma curva conforme a viewport muda, então numa faixa de larguras (grosso modo,
1140-1750px) o pin de fato invade o espaço onde o título e a linha-guia começam.

Resolvido com `padding-left: clamp(0px, 16vw, 190px)` só em `#stack h2` e
`#stack .sec-lede` — não no resto do conteúdo de Stack (a faixa de logos e as linhas de
categoria/tags já nascem mais abaixo, fora do alcance vertical do pin, e não precisavam
mexer). Testado em 910px, 1024px, 1440px e 1920px de largura — sem sobreposição em nenhuma.
Não é uma fórmula matematicamente exata pra zero sobreposição em toda largura possível
(cruzar os dois `clamp()` com precisão exigiria variáveis CSS compartilhadas entre o pin e
o texto, ou JS medindo de verdade) — é uma folga generosa o bastante pras larguras de tela
reais que importam aqui.

### Animação presa ao trecho "grudado", não à visibilidade real

Pedido do Vinícius: tanto a lata quanto o halter devem **começar a animar assim que
aparecem na tela e terminar quando somem** — não só durante o trecho em que o `position:
sticky` está "grudado".

Antes, o progresso (`script.js`, `ligarScrub`) usava `NAV_H` (o topo, onde o pin gruda) e
`rPin.height` como referência: `progresso = (NAV_H − rTrack.top) / (rTrack.height −
rPin.height)`. Isso fazia o progresso ficar em `0` (primeiro quadro, parado) durante todo o
trecho em que o elemento ainda está entrando na tela mas o `sticky` ainda não "grudou", e
em `1` (último quadro, parado) durante o trecho em que ele já soltou e está saindo de tela
— a animação de verdade só rodava no meio, durante o trecho grudado.

Novo cálculo usa a visibilidade da **pista inteira** na janela, não o trecho grudado:

```js
const percurso = innerHeight - NAV_H + rTrack.height;
const progresso = Math.min(1, Math.max(0, (innerHeight - rTrack.top) / percurso));
```

`progresso = 0` exatamente quando a pista começa a entrar pela borda de baixo da janela
(`rTrack.top === innerHeight`); `progresso = 1` exatamente quando ela termina de sumir por
trás da nav, pela borda de cima (`rTrack.top === NAV_H − rTrack.height`, ou seja
`rTrack.bottom === NAV_H`). O `position: sticky` continua fazendo o mesmo trabalho visual
de prender o pin na tela — isso não mudou, é CSS puro, independente desse cálculo — só o
mapeamento de "quanto rolei" → "que quadro mostrar" deixou de ignorar as pontas
(entrada/saída) e passou a cobrir a janela de visibilidade inteira.

Efeito colateral bom: a função não precisa mais da altura do pin (`rPin.height`) pra nada,
então `ligarScrub` perdeu o parâmetro `pin` — assinatura foi de
`ligarScrub(track, pin, aoProgresso)` pra `ligarScrub(track, aoProgresso)`. Uma terceira
animação futura não muda nada nesse mecanismo, só entra no mesmo loop genérico.

## 13. Furo no meio da lata, visível só no tema escuro

O Vinícius reportou: no tema escuro a lata tinha falhas deixando o fundo vazar por dentro
do corpo dela; no tema claro parecia certo. Isso não é um problema de tema — é um furo real
no canal alfa que só o tema escuro deixa óbvio.

### Por que só aparecia no escuro

O *closing* morfológico aplicado no pivô de qualidade (dilation + erosion, ver item 10)
fechava a maioria dos furos, mas sobrava um — um reflexo especular no corpo da lata que
bate em **(255,255,255) puro**, mais branco ainda que o próprio fundo já removido
(~252-253). Nenhum limiar de `colorkey` distingue os dois (o reflexo é literalmente "mais
branco que o branco" usado como referência de fundo) — então aquele pixel sempre vira
furo, nunca teve como o `colorkey` sozinho resolver isso. Contra fundo claro (quase branco
também) o furo é invisível por coincidência de cor; contra fundo escuro ele aparece como um
pontinho preto cortando o desenho, bem no meio da área da garra do logo.

### Correção — fechamento morfológico maior, choke igual

O `closing` (dilation + erosion) do pivô anterior usava raio 1 (uma passada de cada) — de
sobra pros furos pequenos testados na época, pequeno demais pra esse furo específico
(~10×12px na imagem final de 640px de largura). Primeira tentativa, raio 6, fechou quase
tudo mas sobrou 1 quadro (de 117) com um furo maior ainda (164px) na mesma região —
raio final **8**:

```
dilation ×8, erosion ×9   (8 pra fechar, +1 de choke — mesma quantidade de choke de antes)
```

O choke (erosão líquida além do fechamento) continua sendo exatamente 1px — a mesma
quantidade de antes, então a borda externa da lata não muda. Só a capacidade de **fechar
buracos maiores** aumentou. Testado nos 117 quadros por script (ver abaixo), não só numa
amostra visual — 0 furos de interior restantes. Comparado lado a lado com a versão de raio
1 nas garras do logo e no texto "Nutrition Facts": sem distorção perceptível.

**O halter tinha o mesmo problema, bem mais grave.** Rodado o mesmo script no halter antes
de reencodar: 231 dos 240 quadros tinham furo de interior (o cabo metálico tem reflexos
especulares parecidos, e em alguns quadros o furo passava de 300px) — não tinha sido notado
porque a verificação daquela vez também foi só visual, sobre xadrez. Reencodado com o mesmo
raio 8: 0 furos nos 240 quadros.

### Como isso foi encontrado — e por que o método de verificação mudou

Verificar "tem buraco?" olhando o quadro sobre fundo axadrezado (método usado até aqui)
**não é confiável, nem pra furo grande** — o padrão do xadrez quebra a leitura visual do
olho, e o halter (231/240 quadros com furo, alguns bem grandes) passou por essa verificação
antes sem ninguém notar. O que expôs o furo de verdade foi comparar contra um fundo
**sólido escuro** igual ao `--bg` real do tema escuro do site (`#0B0E14`) — e, principal-
mente, parar de confiar em olho nu: um script (`check_holes.py`, não versionado — recriar
se precisar, receita abaixo) varre **todos** os quadros e conta pixel de furo de verdade,
por coordenada.

Preenchimento por inundação (*flood fill*, vetorizado em numpy — dilatação booleana
repetida do array de "é fundo" a partir das quatro bordas, até convergir) marca tudo que é
fundo de verdade alcançável a partir da borda da imagem; pixel de alfa baixo que **não foi
alcançado** é furo de interior, isolado, e não devia existir. **Esse script é o critério de
aceite agora, não a inspeção visual sobre xadrez** — rode em toda sequência de quadros nova
(e de novo depois de qualquer ajuste no raio do closing) antes de publicar. Ver receita
completa e uso em [ARQUITETURA.md](ARQUITETURA.md).

---

# Nona rodada — 2026-09-24

## 14. Moto se desmontando — terceira e última animação do mesmo tipo

Terceira das três animações controladas pelo scroll que o Vinícius avisou que viria, na
seção Trajetória: uma moto (Honda Africa Twin) se desmontando em exploded view, do estado
montado até as peças todas separadas — ideia dele: representar a evolução a cada emprego da
linha do tempo. `assets/moto.mp4`, 141 quadros, 24fps, 1280×720, ~6s, fundo branco.

### Por que `colorkey` não serviu desta vez

Diferente da lata e do halter (fundo branco uniforme do início ao fim), o vídeo da moto
**muda de fundo ao longo da gravação**: começa branco puro, mas conforme a câmera se
aproxima e as peças se espalham, o fundo vira um cinza com vinheta (mais escuro nas
bordas) — não é mais uma cor única a remover. `colorkey` (limiar de distância de cor fixo)
não acompanha um fundo que muda; testado, ele varava a moto em algumas partes e deixava
resíduo de cinza em volta em outras, sem um valor de limiar que funcionasse pro vídeo
inteiro. Composto isso com metal/prata claro nas peças (mesmo risco da lata) e a técnica
de sempre ficou sem margem de manobra.

### Solução — modelo de recorte por IA (matting), não mais por cor

Trocada a abordagem: em vez de decidir "é fundo" por distância de cor, um modelo de
segmentação (`rembg`, modelo `isnet-general-use` — rede treinada pra separar objeto de
fundo em fotos genéricas, não assume cor de fundo nenhuma) decide "é moto ou é fundo"
olhando o conteúdo da imagem. Resolve o problema da vinheta de raiz: o modelo não liga pra
brilho de fundo, só reconhece a forma do objeto.

Rodado num **ambiente virtual Python isolado, dentro da pasta de scratchpad da sessão**
(nunca no Python do projeto/sistema) — `python -m venv` + `pip install "rembg[cpu]"`. Isso
baixa um arquivo de modelo (~179 MB) pra `C:\Users\<usuário>\.rembg\` na primeira execução;
não faz parte do projeto, pode apagar depois se quiser (baixa nessa mesma pasta de novo se
precisar rodar outra vez).

Pipeline por quadro: `rembg.remove()` no quadro cru → esmaecimento de alfa nos 7% mais
próximos de cada borda do frame (pra peça cortada pelo enquadramento da câmera não ficar
com corte reto, tipo recorte de tesoura) → `resize` pra 640×360 com Lanczos → WebP.

### A armadilha do "contador de furos" com esse tipo de imagem

O script de detecção de furo (item 13) apontou **furo em 141 dos 141 quadros** — parecia
um desastre. Não era: motos têm roda raiada (vão real entre raio e raio) e discos de freio
perfurados (furo de verdade, de fábrica) — e nos quadros de peças espalhadas, o vão *entre*
duas peças soltas também conta como "furo" pro script, porque ele só enxerga "isso não está
conectado à borda da imagem", sem saber que é um vão intencional entre dois objetos
diferentes, não um buraco no meio de UM objeto só. **O script de flood fill vale pra objeto
único e sólido (a lata, o halter) — não serve pra objeto vazado por natureza (roda raiada)
ou pra cena com múltiplos objetos soltos (exploded view).** Conferido visualmente, quadro a
quadro nos piores casos apontados pelo script: sem defeito de verdade em nenhum — só roda,
disco de freio e vão entre peça e peça, tudo correto.

### Sem crop — mesma situação do halter

Caixa delimitadora do movimento medida nos 141 quadros: cobre praticamente o frame inteiro
(0,8%–99% nos dois eixos) — no pico da explosão as peças ocupam quase toda a área, sem
sobra de fundo morto pra cortar. Mesma decisão do halter: sem crop, só redimensiona.

### Peso — mais pesado que os outros dois, por natureza da imagem

~8,7 MB em qualidade WebP 90 (contra ~2,2 MB da lata e ~2,9 MB do halter, ambas com bem
menos quadros). A borda alfa aqui é muito mais complexa — raios de roda, parafusos soltos,
dezenas de peças pequenas espalhadas — e isso comprime pior que um contorno liso de lata ou
halter. Comparado visualmente WebP 90 vs. 80 num quadro cheio de peças (o mais pesado da
sequência): **sem diferença perceptível** — publicado em qualidade 80, ~15-20% mais leve.

### Posicionamento — mesmo padrão da lata (goteira direita)

`#trajetoria` virou o terceiro contexto com esse mecanismo (junto de `#sobre` e `#stack`):
`position: relative` na seção, pista `position: absolute; inset: 0` como irmã de
`.wrap.panel`, pin na goteira direita com a mesma fórmula de `.rail-index` — sem alterar
em nada a estrutura do texto da linha do tempo, exatamente como pedido. A regra de CSS
(`#sobre .scroll-video-pin, #trajetoria .scroll-video-pin { margin-right: ... }`) já
existia pronta pra receber um terceiro contexto — só precisou entrar no seletor.

### O que ficou de fora

O Vinícius mencionou associar o estágio da desmontagem a cada um dos 3 empregos da linha do
tempo (moto montada → emprego mais antigo, semidesmontada → emprego do meio, toda
explodida → emprego atual, por exemplo). Isso não foi implementado nesta rodada — a
animação hoje avança de forma contínua pelo scroll da seção inteira, sem sincronizar com
os itens específicos da `<ol class="timeline">`. Fica como possível refinamento futuro se
o Vinícius pedir: exigiria mapear os 141 quadros em 3 faixas e travar o progresso de cada
faixa à posição de scroll de cada `<li>` da timeline, não só à altura da seção.

---

# Décima rodada — 2026-09-24

## 15. `position: sticky` nunca tinha realmente grudado — bug de `overflow-x` no `body`

O Vinícius reportou que a moto em Trajetória ficava "travada no início do bloco de texto"
em vez de acompanhar o scroll. Não era bug da moto — era um bug **estrutural, presente
desde a primeira animação (a lata)**, só que nunca confirmado com scroll de verdade: até
aqui, toda verificação de `position: sticky` neste projeto foi feita por captura de tela
estática (documentado nas ⚠️ de [ARQUITETURA.md](ARQUITETURA.md) como limitação de teste),
e captura estática não prova que o `sticky` engatou — só mostra a posição de repouso.

### Como foi encontrado — geometria real via iframe, não screenshot

Em vez de tirar print, um harness (`<iframe>` de tamanho normal, servido pela mesma
origem, com `scrollBehavior:'auto'`) rolou a página de verdade e leu
`getBoundingClientRect()` do `track` e do `pin` em vários pontos do scroll, imprimindo os
números como texto (sem depender de interpretar pixels). O resultado: **`pin.top` era
idêntico a `track.top` em todo ponto medido**, nas três seções (lata, halter, moto) — ou
seja, o pin nunca ficava parado num valor fixo (o que aconteceria se tivesse grudado); ele
se movia exatamente junto com a pista, como se `position: sticky` fosse `static`.

### Causa raiz

```css
body { overflow-x: hidden; }
```

Definir só `overflow-x` (sem `overflow-y`) faz o navegador computar `overflow-y: auto`
implicitamente — é a regra de acoplamento do `overflow` na especificação CSS. Isso faz o
`<body>` virar seu próprio contexto de rolagem, em vez de deixar a viewport ser a única
referência de scroll da página — e `position: sticky` de qualquer descendente para de
grudar contra a viewport.

**O mais irônico: o projeto já tinha se protegido contra exatamente esse bug — só que no
lugar errado.** A regra de `html` já tinha o comentário: *"'hidden' aqui quebraria a nav
sticky"* — e por isso usa `overflow-x: clip` em vez de `hidden`. A causa raiz do bug do
scroll das três animações é que a mesmíssima armadilha foi reintroduzida na regra
**seguinte**, `body { overflow-x: hidden }`, sem ninguém perceber que era o mesmo problema
descrito duas linhas acima. Corrigido trocando pro mesmo `overflow-x: clip` do `html`
(clipa o sangramento horizontal das `.screen-line`/200vw sem criar contexto de scroll).

### Por que não foi visto antes

A nav (`.nav { position: sticky; top: 0 }`) sempre pareceu funcionar porque ela está fixa
no **topo da página inteira** (`top: 0`) — ela "gruda" já na primeira rolagem, então o
efeito visual de "ficar parada lá em cima" é indistinguível de "nunca saiu do lugar",
mesmo com o sticky quebrado. As animações de scroll (lata, halter, moto) são o primeiro
caso no projeto onde o sticky precisa **soltar depois de grudar em algum ponto no meio da
página** — e é exatamente esse comportamento (grudar, segurar, soltar) que só funciona com
`position: sticky` de verdade, não com o movimento normal de um elemento no fluxo. Por
isso o bug só ficou óbvio quando alguém rolou devagar por uma seção comprida (Trajetória)
e prestou atenção.

### Confirmação pós-correção

Mesmo harness, depois da troca pra `clip`: `pin.top` passou a travar em `96` (o valor de
`top: calc(64px + 2rem)` do CSS) enquanto a pista ainda tinha percurso, e só voltou a
acompanhar `track.top` perto do fim de cada seção — exatamente o comportamento esperado de
"gruda, segura, solta". Conferido nas três seções. `documentElement.scrollWidth` continua
igual a `clientWidth` depois da troca (sem regressão de scroll horizontal).

---

# Décima primeira rodada — 2026-09-24

## 16. Moto com fundo verde — troca do vídeo, e dois ajustes de posição/ritmo

O Vinícius regravou a moto com fundo verde-croma (`assets/moto_fundoverde.mp4`, 240
quadros, mesmo padrão do halter) em vez de pedir a correção via Gemini do vídeo de fundo
branco com vinheta. Resultado: fundo **sólido e constante do início ao fim** (~RGB
34,234,44 em todo canto testado, sem vinheta) — o problema raiz do vídeo anterior (fundo
que mudava de valor ao longo da gravação, inviabilizando `colorkey`) deixou de existir.

### Chromakey + despill substituiu o recorte por IA

Com fundo verde de verdade, voltou a valer a técnica mais simples e leve (mesma família da
lata/halter): `chromakey` (opera em YUV, mais preciso que `colorkey` — RGB — pra fundo
verde saturado) + `despill=type=green` (remove o resíduo verde que sobra nas bordas
parcialmente transparentes, equivalente ao problema de halo já visto na lata, mas com
solução pronta no ffmpeg pra green/blue screen — diferente do fundo branco, que não tem
despill nativo). Mesmo pipeline de fechamento de furo (`dilation` ×8 + `erosion` ×9) por
cima, por segurança.

```bash
ffmpeg -i moto_fundoverde.mp4 -an \
  -vf "chromakey=0x22EA2C:0.12:0.06,despill=type=green:mix=0.5,format=yuva420p,split[rgb][a];
       [a]alphaextract,dilation=coordinates=255×8,erosion=coordinates=255×9[ae];
       [rgb][ae]alphamerge,scale=640:-2,format=rgba" \
  -c:v libwebp -q:v 80 -vsync 0 assets/moto-frames/f_%03d.webp
```

**Resultado bem mais leve e confiável que a versão anterior**: 240 quadros, 8,8 MB (contra
141 quadros, 7,3 MB da versão por IA — ou seja, quase o dobro de quadros por um custo
proporcionalmente menor), sem precisar de modelo de segmentação nem ambiente virtual
Python. O script de contagem de furos continuou dando falso positivo em todo quadro (mesmo
motivo do item 14: raios de roda, parafusos soltos, vão entre peças na vista explodida) —
critério de aceite voltou a ser inspeção visual mesmo, contra fundo escuro sólido, em 5
quadros espalhados pela rotação inteira (início, 25%, 50%, 75%, fim): limpo nos cinco.

`assets/moto.mp4` (o vídeo antigo, fundo branco com vinheta) e o ambiente virtual do
`rembg` continuam no scratchpad/repo — não apagados, o Vinícius que decide se quer manter.
`data-frame-src` continua apontando pra `assets/moto-frames/`, só o conteúdo da pasta e o
`--frames` no HTML mudaram (141 → 240).

### Moto mais encostada no canto — estava por cima do texto

A composição da moto explodida é mais larga que a lata (peças se espalham pros dois
lados), e na margem/largura compartilhada com a lata (`margin-right` calculado a partir de
`.rail-index`) ficava sobre o texto da timeline em larguras de tela intermediárias.
Separado num seletor próprio (`#trajetoria .scroll-video-pin`, distinto de
`#sobre .scroll-video-pin`): pin mais estreito (`clamp(150px, 15vw, 240px)`, contra
`clamp(180px, 20vw, 300px)` da lata) e margem menor
(`clamp(0px, calc(50vw - 700px), 1.25rem)`, mais perto da borda de verdade que a fórmula
da lata `calc(50vw - 638px)`). Testado em 1280px e 1600px de largura — sem sobrepor
"Trajetória" nem o primeiro item da timeline em nenhuma das duas.

## 17. Halter "não fica estático" — pin grudava por pouco tempo, seção curta

Depois do bug do item 15 corrigido (`sticky` passou a engatar de verdade), o Vinícius
notou que o halter dava a impressão de não ficar parado — soltava e deslizava junto com a
página por boa parte da seção Stack, misturando "deslizar" com "trocar de quadro" ao mesmo
tempo, o que lia como "não fluido".

### Medição — harness de novo, não suposição

Mesmo harness de `getBoundingClientRect()` do item 15, medindo `#stack` especificamente:
seção com **717px de altura**, pin original de **460px** — só ~257px (≈26% da seção) de
percurso "grudado" antes de soltar. Comparado com a lata/moto (seções bem mais altas,
`#sobre`/`#trajetoria` têm parágrafos + grids grandes), Stack é uma seção naturalmente mais
curta (uma faixa de logos + uma grade de tags, sem parágrafos longos) — não dá pra alterar
isso sem violar a regra de "nunca inflar altura de seção com conteúdo falso" (ver item 15 e
os avisos em [ARQUITETURA.md](ARQUITETURA.md)).

### Primeira tentativa — pin mais baixo (meio-termo, não resolveu de vez)

Primeiro ajuste: reduzir a altura do **pin**, já que `percurso-grudado = altura(track) −
altura(pin)` — pin menor, maior fração da seção grudada. De `min(58vh, 460px)` (base) pra
`min(28vh, 200px)`, só em `#stack`. Foi de ~26% pra ~50-60% de percurso grudado — melhor,
mas o Vinícius pediu de novo: "a animação do halter deve ser estática no mesmo lugar
fixo". Ainda soltava e deslizava no terço final da seção.

### Correção definitiva — a pista fica mais alta que a seção, não o pin mais baixo

Virou a equação: em vez de encolher o pin pra caber no espaço que a seção já tinha, a
**pista** (`.scroll-video-track`) ganhou altura própria, maior que 100% de `#stack`:

```css
#stack {
  --halter-pin-h: min(40vh, 320px);
}
#stack .scroll-video-track {
  bottom: auto;
  height: calc(100% + var(--halter-pin-h));
}
#stack .scroll-video-pin {
  height: var(--halter-pin-h);
}
```

A conta: `percurso-grudado = altura(track) − altura(pin)`. Se `altura(track) =
altura(seção) + altura(pin)`, o `altura(pin)` cancela dos dois lados —
`percurso-grudado = altura(seção)`, **sempre**, não importa o tamanho do pin. O pin fica
grudado pelo percurso de rolagem inteiro de `#stack` e só solta quando a seção termina de
verdade — não antes, não precisa encolher o pin pra isso. Reaproveitada a mesma variável
CSS (`--halter-pin-h`) na altura da pista e do pin, pra nunca dessincronizar as duas contas
se o valor mudar de novo.

Isso não é `<div>` nova nem conteúdo falso — `.scroll-video-track` continua
`position: absolute`, não contribui em nada pra altura real de `#stack` (mesmo princípio
do item 15). Só que, em vez de `inset: 0` (altura idêntica à da seção), a pista agora
**passa um pouco da borda de baixo de `#stack`**, dentro do espaço de `#projetos` — de
propósito: é esse excedente que dá o percurso extra pro pin nunca soltar cedo. Como o pin
solta exatamente quando a pista acaba (e a pista acaba pouco depois do fim de `#stack`),
na prática ele já solta bem perto de onde `#projetos` começa a aparecer, sem chegar a
sobrepor o conteúdo dela — confirmado com harness: no momento em que `#projetos` alcança o
topo da viewport, o pin já tinha acabado de soltar havia pouco (posição bem próxima de onde
estava grudado, não um salto visível).

Medido: grudado dos 0% aos ~75-80% da seção (contra ~26% na v1, ~50-60% na v2), solta só
no trecho final, coincidindo com o fim de Stack — não com "meio da seção" como antes.

### "Estático" de novo — dessa vez era posição, não tempo

O Vinícius repetiu o pedido: "a animação do halter deve ser estática no mesmo lugar fixo
ao lado de Stack tecnológica". Duas correções de *tempo* de grudado (acima) não resolveram
porque o pedido nunca foi sobre tempo — era sobre **qual conteúdo** o pin fica ao lado.
Perguntado diretamente, a resposta confirmou: a posição vertical do pin não coincidia com
o título "Stack tecnológica" especificamente.

Medido com o mesmo harness (`getBoundingClientRect()` do `h2` e do `pin`, real): o pin já
grudava bem perto do topo do `h2` (`pin.top=96` vs. `h2.top=105`, 9px de diferença — quase
coincidente) — o problema nunca foi a âncora superior. Era a **altura** do pin (320px,
herdada do ajuste de "fica parado o tempo todo"): um pin alto começa colado no título mas
se estende bem além dele, terminando ao lado do texto-guia (`.sec-lede`) e das primeiras
tags, não do título. Visualmente lia como "ao lado do parágrafo", não "ao lado do título".

**Correção: encolher o pin pra cobrir só a altura do `h2`, sem soltar o percurso
grudado.** Como a fórmula do ajuste anterior cancela a altura do pin dos dois lados
(`percurso-grudado = altura(seção)`, sempre, ver acima), dava pra encolher o pin livremente
sem perder nada do "fica parado a seção inteira". Medido o `h2` de verdade (`h2.top=105`,
`h2.bottom=180`, `.sec-lede.top=202` no momento em que a seção aparece): `--halter-pin-h`
ajustada pra `min(13vh, 108px)` — cobre o `h2` inteiro (96 a 204) e para bem na borda de
onde o texto-guia começa (202), sem invadir. Confirmado visualmente: o halter agora fica
ao lado só do título, não do parágrafo abaixo.

**Lição prática**: "estático"/"fixo" pode significar coisas bem diferentes — duração do
grudado (quanto tempo sem deslizar) ou posição vertical (ao lado de qual conteúdo). Quando
o mesmo pedido se repete depois de uma correção que pareceu resolver, vale perguntar antes
de tentar de novo — economizou uma terceira rodada de ajuste errado aqui.

### A resposta certa era mais simples: tirar o `sticky`, não ajustar ele

O Vinícius voltou uma última vez: "quero que a animação do halter seja controlada com o
scroll, porém o halter e a animação devem ficar em uma posição vertical fixa (não deve sair
do lado do título Stack tecnológica)". As duas rodadas anteriores (duração do grudado,
depois altura do pin) mexeram nos parâmetros do `sticky` sem questionar se `sticky` era a
ferramenta certa — não era.

**A causa de fundo**: `position: sticky` faz o pin **parar de se mover relativo à
viewport** assim que engata — nesse momento ele já não acompanha mais nada que continua no
fluxo normal da página, incluindo o próprio `h2`. Não importa quanto tempo ele fica
grudado nem que altura ele tem: mais cedo ou mais tarde (quando solta) ou o tempo todo
enquanto está grudado (o `h2`, que rola normal, se afasta dele), a relação entre os dois
sempre diverge em algum ponto — é inerente ao mecanismo, não um parâmetro pra ajustar.

**A correção**: `#stack .scroll-video-pin` deixou de ser `position: sticky` e virou
`position: static` — um item de flex comum, dentro da mesma pista
(`.scroll-video-track { position: absolute; inset: 0 }`, ancorada num ponto fixo do
*documento*, não da viewport). Sem sticky, o pin rola no mesmo ritmo que qualquer outro
elemento da página — inclusive o `h2` ao lado dele. Os dois se movem sempre à mesma
distância relativa, porque nenhum dos dois está preso à tela.

**O scroll continua controlando a animação** — isso nunca dependeu do `sticky`. A função
`ligarScrub` (script.js) só lê `track.getBoundingClientRect()` pra calcular o progresso; ela
não sabe nem precisa saber se o pin dentro da pista é `sticky` ou `static`. Trocar o
posicionamento do pin não tocou em uma linha de JS — só a "câmera" (a caixa que mostra os
quadros) parou de tentar prender a tela; o que ela mostra continua 100% amarrado ao scroll.

**Verificação**: harness medindo `pin.top - h2.top` em 11 pontos do scroll, de 30% antes da
seção até 50% depois dela — `delta = -104` em **todos** os pontos, sem variar 1px. Antes
(com `sticky`), esse delta variava de 0 a centenas de pixels dependendo de quanto a seção
já tinha rolado. Essa é a prova de que "nunca sai do lado do título" — não uma aproximação
visual, uma igualdade exata testada em pontos espalhados por toda a jornada de scroll.

**Por que isso não vale pra lata/moto**: `#sobre` e `#trajetoria` são seções bem mais altas
(parágrafos longos), e ali o pedido original sempre foi "trava a tela até acabar" — o efeito
cinematográfico de prender e depois soltar É o comportamento desejado, não um bug. O halter
é o caso diferente: a intenção nunca foi prender a tela, era ficar ao lado de um título
específico o tempo todo — `sticky` nunca deveria ter sido a ferramenta ali. Se aparecer uma
quarta animação no futuro, a pergunta certa antes de copiar o padrão da lata é: "isso deve
prender a tela, ou só acompanhar um ponto fixo do texto?" — são dois comportamentos
diferentes, e a resposta muda a técnica inteira, não só os parâmetros.

### Halter pequeno demais — agora que não é mais `sticky`, crescer é de graça

Depois de virar `position: static`, o `--halter-pin-h` continuava em `108px` (herdado do
ajuste anterior, quando precisava cobrir só a altura do `h2` pra não "sair do lado do
título" com `sticky`). Sem `sticky`, essa restrição não existe mais — o pin rola junto com
o `h2` **em qualquer tamanho**, então o motivo original pra mantê-lo pequeno tinha
desaparecido, só ninguém tinha voltado a crescer o pin. O Vinícius pediu pra ocupar mais
espaço.

Medido de novo (mesmo harness, `getBoundingClientRect()`): entre o fim do `h2` e o começo
da faixa de logos (`.logos`, sem `padding-left` de proteção como o `h2`/`.sec-lede` têm)
sobra um vão de ~165px (do topo da seção até ~270px). Ajustado `--halter-pin-h` pra
`min(22vh, 240px)` — ocupa quase todo esse vão sem chegar a tocar os ícones da faixa de
logos — e a largura de `min(180px,20vw,300px)` pra `clamp(200px, 22vw, 320px)`. Testado em
1280px e 1600px de largura, sem sobrepor nada.

Se `--halter-pin-h` crescer de novo no futuro (mais espaço ainda), o teto real agora é onde
`.logos` começa (~270px do topo de `#stack`) — passar disso exige dar padding-left também a
`.logos`, senão o pin visualmente cobre os ícones das tecnologias.

---

# Décima segunda rodada — 2026-09-25

## 18. Prévia de vídeo: de "ao apontar" pra "autoplay ao aparecer"

O Vinícius pediu: os vídeos devem tocar assim que aparecem na tela (sem precisar de clique
nem hover), e — perguntado o que fazer quando há vários juntos, como os 4 da grade "Em
funcionamento" da Wida — confirmou que cada um deve tocar de forma **independente**, sem
revezamento entre eles (a ideia de "quando faltar 10s pra um acabar, o próximo já começa"
do pedido original não se aplica aqui, porque cada vídeo já fica em loop sozinho — não tem
"próximo" dentro do mesmo quadrado).

### O que mudou

O bloco 4b do `script.js` trocou o gatilho de `mouseenter`/`mouseleave`/`focus`/`blur` por
um `IntersectionObserver` por vídeo (`threshold: .35`) — toca ao entrar na tela, pausa e
volta pro primeiro quadro ao sair. Os 6 `.shot-vid` do site (4 da grade Wida + os vídeos de
demonstração do LifeManager e Sites institucionais) usam o mesmo mecanismo, sem
diferenciação — não havia motivo pra tratar diferente.

Duas armadilhas resolvidas:

1. **Corrida entre "ficou visível" e "arquivo carregou".** Se o vídeo entra na tela antes
   do `loadedmetadata` disparar (que é quando a classe `.ok` é adicionada, no bloco 3),
   `tocar()` retorna cedo e nunca tenta de novo sozinho. Resolvido escutando
   `loadedmetadata` também dentro do bloco 4b, chamando `tocar()` de novo se `visivel` já
   for `true` naquele momento.
2. **Lightbox por cima das prévias.** O `MutationObserver` que já existia (fecha o vídeo do
   lightbox ao fechar o `<dialog>`) pausava as prévias ao abrir, mas não tinha como
   retomá-las ao fechar — antes elas só voltavam a tocar com um novo `mouseenter`, que não
   existe mais nesse modelo. Resolvido com um array `retomarPrevias` (populado no bloco 4b,
   consultado no `MutationObserver` do bloco 4) que só retoma quem `visivel` ainda é
   `true` — quem saiu de tela enquanto o modal estava aberto continua pausado.

### Confirmação — mesma limitação de vídeo do Chrome headless, agora também pra `.play()`

Testado com harness (iframe real, não screenshot) rolando até cada vídeo: os 4 primeiros
(grade Wida) mostraram `paused=false` e `currentTime` avançando ao longo de várias
capturas — parecia funcionar. Mas um segundo teste, só aumentando o tempo de espera entre
rolar e conferir (600ms → 2000ms), deu resultado **oposto**: todos com `paused=true`,
`currentTime=0`. Resultado inconsistente entre duas rodadas do mesmo teste é sinal de
ambiente não confiável, não de bug real — isolado com um teste à parte, chamando
`v.play()` direto, sem `IntersectionObserver` nem scroll no meio:

- `v.play()` **não devolve uma `Promise` de verdade** nesse Chrome headless (o `await`
  nela resolve na hora, sem esperar nada — foge da spec).
- `.paused` vira `false` normalmente (a chamada "funciona").
- `.currentTime` **não avança**, nem depois de 1s de espera — o decode não roda de verdade.

Isso bate com a limitação de `currentTime`/seek em vídeo já documentada nesta base (ver
item 10) — só que dessa vez também derrubou reprodução comum via `.play()`, não só seek.
**Critério de aceite virou revisão de código** (atributos `muted`/`playsinline` presentes,
`.play()` não lança erro, lógica do `IntersectionObserver` sem furo) + pedido de
confirmação visual num navegador de verdade — não dá pra provar reprodução de vídeo por
headless neste projeto, documentado com mais um caso concreto em
[ARQUITETURA.md](ARQUITETURA.md).

---

# Décima terceira rodada — 2026-09-25

## 19. Índice de seções (goteira direita) removido — segunda vez, agora definitiva

O `.rail-index`/`.idx` (índice numerado 01–05, fixo na goteira direita, sincronizado com a
seção visível) tinha entrado e saído no mesmo dia durante a refatoração de 2026-09-22 (ver
segunda rodada): removido a pedido do Vinícius por ocupar espaço visual demais, **restaurado
horas depois, sem motivo dado** — o registro da época já deixa isso explícito, não tem
justificativa além de "pedido de volta". Só bem mais tarde nesse mesmo dia (sexta rodada) a
lata controlada pelo scroll passou a sangrar de propósito pra dentro dessa goteira — uma
coincidência de posicionamento com o índice que já estava de volta, não o motivo da volta
dele. Ficou no ar por três dias, até esta remoção.

Pedido do Vinícius em 2026-09-25: remover de novo. Dessa vez não veio acompanhado de pedido
pra recolocar — tratado como decisão final, não como o vaivém de 09-22.

### O que saiu

- HTML: o `<aside class="rail rail-index">` inteiro, com a `<ul class="idx">` e os 5 links.
- CSS: todas as regras de `.rail-index`/`.idx` (goteira, espaçamento, rótulo em hover,
  traço ativo) — `.rail`/`.rail-social` (trilho de redes, goteira esquerda) continuam
  intactas, é uma classe base compartilhada, não dependia do índice.
- JS: `.idx a` saiu do seletor que mapeia links pra seções no bloco 2
  (`document.querySelectorAll('.nav-links a')`, sem o `, .idx a`) — o resto do mecanismo de
  "link ativo conforme a seção visível" continua igual, só que só afeta a nav agora.

### O que ficou — e por quê

A lata (`#sobre`) e a moto (`#trajetoria`) continuam sangrando pra fora do `.wrap` na mesma
goteira direita, com a mesma fórmula de distância da borda (`calc(50vw - 638px)`) que tinha
sido calibrada pra coincidir com a posição do índice removido. Não havia motivo pra mudar:
o valor ainda posiciona o pin de forma sensata na goteira, só que agora sem nada ali pra
"invadir" — deixou de ser sobreposição proposital e virou só "mora na goteira direita". O
`z-index: 95` (que existia pra passar por cima do índice, `z-index: 90`) também ficou —
inofensivo sem nada pra competir, e evita ter que reconsiderar esse valor se o índice
voltar um dia.

### Documentação

Diferente de outras correções desta base, essa mexeu em referências espalhadas por
[ARQUITETURA.md](ARQUITETURA.md) e [DESIGN.md](DESIGN.md) que descreviam `.rail-index` como
parte do estado atual do site (tabela de componentes, checklist de verificação, comentários
sobre "invadir" a goteira). Essas duas docs são referência de **estado atual**, não log
histórico como este arquivo — foram atualizadas pra não descrever mais algo que não existe.
Onde a menção era sobre uma decisão de design já tomada no passado (ex.: "por que o índice
lateral usava `--muted`"), a frase virou passado, não foi apagada — o raciocínio por trás
da decisão original continua válido pra outros elementos, mesmo que o índice em si tenha
saído.

# Décima quarta rodada — 2026-09-25

## 20. As cinco telas que faltavam, e um sétimo módulo descoberto no processo (RH — Ponto)

O Vinícius mandou 5 capturas de tela coladas na conversa e pediu pra colocar "nas telas que
estavam faltando", avisando que os arquivos originais estavam nos downloads mais recentes do
computador — e pediu também pra incluir `rh.mp4`, um vídeo na área de trabalho, sem dizer
onde ele entra.

### Localizando os arquivos reais

As imagens coladas na conversa são cópias temporárias, feitas só pra exibição — não dá pra
publicar a partir delas. Foram localizadas em `Downloads/` pelo horário de modificação (as
cinco, entre 15:17 e 15:18 de 2026-09-25): `auditoria_sistema.jpeg`, `oee.jpeg`,
`comercial.jpeg`, `produção.jpeg`, `SQL_SISTEMA.jpeg`. O conteúdo de cada uma bateu com o
nome do arquivo, confirmando o pareamento antes de copiar qualquer coisa.

### Onde cada uma entrou

A seção "Telas do sistema" (`.gallery-6`) tinha 6 slots — `wida-01` a `wida-06` — todos
vazios desde sempre (só listados em [ASSETS.md](ASSETS.md) como referência). As 5 imagens
batiam de conteúdo com 4 desses slots sem ambiguidade:

| Slot | Legenda antiga (nunca teve arquivo) | Arquivo entregue | Bate? |
|---|---|---|---|
| `wida-03-produtividade` | "ranking por colaborador e OEE de turno" | `oee.jpeg` — OEE **máquina a máquina**, por setor | Parcial — legenda corrigida (ver abaixo) |
| `wida-04-comercial` | "metas, carteira e acompanhamento de vendas" | `comercial.jpeg` — meta comercial, gauge, meta×vendido | Sim |
| `wida-05-auditoria` | "rastreabilidade e consistência dos lançamentos" | `auditoria_sistema.jpeg` — detecção de anomalias de PCP/cadastro | Sim, é literalmente isso |
| `wida-06-painel-tv` | "auto-refresh para o chão de fábrica" | `produção.jpeg` — painel de meta mensal/semanal/por turno | Sim |

A quinta imagem, `SQL_SISTEMA.jpeg`, é uma captura do VS Code com uma query PL/SQL aberta
(`queries_fechamentos.sql`) — não é tela de um módulo, é o editor de código. Não bate com
nenhuma legenda existente. Perguntado, o Vinícius disse pra usar mesmo assim num dos slots
vagos, sem criar um card a mais. Foi pro `wida-01-producao` (o conteúdo da query é sobre
apontamento de produção) com título e legenda reescritos do zero — "Motor de dados" — pra
não afirmar que aquilo é uma tela do sistema quando não é.

### O vídeo `rh.mp4` — sétimo módulo, não achado prévio

`rh.mp4` não tinha seção nem legenda correspondente em lugar nenhum do site. Em vez de
adivinhar o conteúdo, ele foi inspecionado com `ffprobe`/`ffmpeg` (mosaico de frames extraído
pra revisão, nunca publicado): mostra o módulo **RH — Ponto** — importação de espelho de
ponto, resumo por funcionário, tratamento de faltas/atrasos e uma "Ficha do Colaborador" com
OEE individual (produtividade, qualidade, assiduidade, pontualidade). O colaborador de
exemplo usado na gravação inteira é o próprio Vinícius ("VINICIUS DE OLIVEIRA DE CAMPOS") —
nenhum outro nome de funcionário aparece em nenhum frame verificado.

Perguntado onde deveria entrar, o Vinícius disse pra usar um dos slots vagos de "Telas do
sistema", sem criar um a mais. O único slot que sobrou depois das 4 imagens acima era
`wida-02-financeiro` — cuja legenda original ("fluxo de caixa e KPIs de resultado") não tem
nenhuma relação com RH. Em vez de publicar um vídeo de RH com legenda de Financeiro (o exato
tipo de erro que [CONTEXTO.md](CONTEXTO.md) proíbe), o botão inteiro foi renomeado pra
"RH — Ponto", com título, `alt`, `data-cap` e texto do `.shot-ph`/`.shot-info` reescritos pra
descrever o que o vídeo realmente mostra.

Esse slot também mudou de tipo: de `<button class="shot">` com `<img>` pra
`<button class="shot shot-vid">` com `<video>`, seguindo exatamente o padrão dos 4 vídeos da
galeria "Em funcionamento" (mesma ordem de filhos: `video` → `.shot-ph` → `.play` →
`.shot-info`, ver regra em [ASSETS.md](ASSETS.md)). Como `.shot-vid` normalmente força
proporção 16:9 e os outros 5 cards de "Telas do sistema" são 16:10, foi adicionada uma
exceção em `style.css` — `.gallery-6 .shot-vid { aspect-ratio: 16 / 10; }` — só pra esse
contexto, pra não desalinhar a grade dos 5 irmãos.

Vale registrar: o currículo do Vinícius descreve a plataforma Wida como tendo **7 módulos**
([CONTEXTO.md](CONTEXTO.md)), mas até este ponto o site só documentava 6 (Produção,
Financeiro, Produtividade, Comercial, Auditoria, Painel TV). RH — Ponto pode ser o sétimo —
mas isso não foi confirmado com o Vinícius, então não virou afirmação em nenhum texto do
site, só esta observação aqui.

### Tratamento do vídeo — dado sensível

`rh.mp4` original (2,6 MB, 1360×732, 13,8s, gravado com Bandicam) tinha o mesmo problema já
documentado em [ASSETS.md](ASSETS.md) para os outros vídeos: marca d'água, abas do navegador,
barra de favoritos com nomes de pastas pessoais e — mais importante — **a barra de endereço
mostrando um IP interno da rede da fábrica** (endereço privado + porta, não reproduzido aqui
de propósito — ver a nota na revisão de segurança, item 25), que a regra de dado sensível do
próprio ASSETS.md proíbe explicitamente ("IP da rede fabril"). Um frame de
inspeção confirmou o limite exato do chrome do navegador (borda inferior da barra de
favoritos, ~110px de 732px de altura) antes de aplicar o corte definitivo:

```bash
ffmpeg -i rh.mp4 -vf "crop=1360:622:0:110,scale=1280:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset slow -g 60 -an -movflags +faststart \
  wida-02-financeiro.mp4
```

Resultado: 1280×586, 13,8s, 833 KB — sem marca d'água, sem chrome de navegador, sem IP,
sem barra de favoritos. Nomenclatura do arquivo manteve `wida-02-financeiro.mp4` (o nome do
slot antigo) em vez de renomear pra `wida-02-rh.mp4`, porque o HTML referencia esse caminho
e trocar o nome do arquivo exigiria trocar o `<button data-video>` e o `<video src>` junto —
puramente estético, sem ganho, então não foi feito.

### O que não foi confirmado com o Vinícius (registrado por transparência)

- Se `RH — Ponto` é de fato um dos 7 módulos citados no currículo, ou um módulo à parte não
  mencionado lá.
- Se a legenda "OEE máquina a máquina" do `wida-03-produtividade` (corrigida nesta rodada,
  porque a legenda antiga falava de "ranking por colaborador" e a imagem entregue é por
  máquina/setor) precisa de mais ajuste — o conteúdo real da imagem é o que está descrito,
  não o que a legenda antiga presumia antes de qualquer arquivo existir.

Nenhuma das duas pendências foi inventada como fato no site — as legendas descrevem
estritamente o que aparece nos arquivos publicados.

## 21. Bug: `loading="lazy"` nunca disparava em `file://` — as 5 imagens não apareciam

Depois da rodada anterior (item 20), o Vinícius reportou que as imagens não apareciam —
mostrou print com a seção "Telas do sistema": o vídeo "RH — Ponto" carregado normalmente
(dava pra ver o frame da interface dentro do card), mas as 5 imagens (Motor de dados,
Produtividade, Comercial, Auditoria, Painel TV) mostrando só o placeholder.

### Descartando as causas óbvias, uma a uma

1. **Servidor errado?** Não — `curl` contra `localhost:8000` confirmava os 6 arquivos com
   `Content-Length` batendo exatamente com o tamanho em disco, `Content-Type` correto.
2. **HTML servido desatualizado?** Não — `curl http://localhost:8000/index.html` mostrava
   o `<button>`/`<img>` corretos, apontando pros arquivos certos.
3. **Cache do navegador?** O Vinícius tentou `Ctrl+Shift+R`, aba anônima — sem efeito.
4. **`verificar.html` desatualizado?** Achado e corrigido um bug real aqui (linha 59 ainda
   listava `wida-02-financeiro.png`, mas o arquivo entregue nessa rodada foi
   `wida-02-financeiro.mp4`) — mas isso não explicava as 5 imagens não aparecerem no
   `index.html` propriamente, só deixava a ferramenta de checagem com resultado errado.
5. **Processo de servidor obsoleto?** Havia um `python -m http.server 8000` (PID 11636) já
   rodando de sessão anterior. Matei e subi um novo, explicitamente a partir de
   `C:\Users\jflas\Desktop\Site`, confirmando via `netstat` que só um processo escutava a
   porta. Não resolveu — o print seguinte, já depois disso, mostrava o mesmo problema.
6. **PNG corrompido?** `ffmpeg -i arquivo.png -f null -` decodifica o arquivo inteiro e
   falha alto se corrompido — os 5 arquivos passaram limpos, `exit 0`.

### A pista que resolveu: o endereço do navegador

O print do Vinícius mostrava a barra de endereço do Brave com **`Arquivo
C:/Users/jflas/Desktop/Site/index.html`** — ele não estava usando `localhost:8000`, estava
abrindo o arquivo direto (`file://`). Isso muda tudo: sem servidor de verdade por trás, uma
página `file://` não tem as mesmas garantias de rede que `http://` tem.

A diferença entre o vídeo (carregou) e as imagens (não carregaram) apontou o culpado: todo
`<img class="shot">` no site tem `loading="lazy"`; nenhum `<video>` usa o equivalente (não
existe `loading="lazy"` para vídeo). `loading="lazy"` depende do navegador decidir, via
heurística própria, quando o elemento está perto o bastante do viewport pra iniciar o
carregamento — e em pelo menos uma versão do Brave/Chromium testada, essa heurística nunca
disparava para uma página aberta com `file://`. O resultado: o `<img>` nunca inicia o
carregamento, `complete` fica `false` para sempre, o evento `load` nunca dispara, a classe
`.ok` nunca é adicionada — o placeholder fica pra sempre, mesmo com o arquivo perfeito no
disco.

**Por que isso nunca tinha aparecido antes**: nenhum dos 7 slots de `<img class="shot">`
("Telas do sistema" + os 2 do VCWB) teve um arquivo real até a rodada anterior (item 20) —
eram todos placeholder puro desde a criação do site. O bug estava lá desde sempre, latente,
porque nunca houve uma imagem real pra ele impedir de aparecer. A foto do hero
(`assets/foto-vinicius.jpg`) nunca teve `loading="lazy"` e sempre funcionou — por isso não
serviu de alerta antes.

### A correção

`loading="lazy"` removido de **todos os 7** `<img class="shot">` (os 5 novos + os 2 do
VCWB, ainda vazios, por consistência e pra não deixar a mesma armadilha pronta pra quando
esse mídia chegar). Página é única, quantidade de imagens é pequena — carregar tudo sem
lazy não pesa o bastante pra justificar manter um recurso que quebra silenciosamente no
modo de uso que o projeto promete suportar (`file://`, sem servidor —
[ARQUITETURA.md](ARQUITETURA.md) linha 4: "Abrir `index.html` no navegador é suficiente").

Documentado como alerta permanente em [ARQUITETURA.md](ARQUITETURA.md), na seção "O padrão
de mídia", pra não ser reintroduzido por engano numa próxima captura de tela.

### Lição de processo

Achar isso levou seis hipóteses descartadas por evidência (servidor, HTML servido, cache,
`verificar.html`, processo obsoleto, corrupção de arquivo) antes de reparar em um detalhe
do próprio print que o Vinícius mandou — a barra de endereço. Nenhuma dessas seis
verificações foi desperdício: cada uma eliminou uma causa real e mais provável antes de
chegar numa causa mais rara (comportamento de `loading="lazy"` especificamente sob
`file://`), e o `verificar.html` desatualizado (item 5) era, de fato, um bug de verdade,
só que um bug diferente do que o Vinícius estava relatando.

## 22. Bug: lightbox mostrando a mídia anterior por cima da nova

Assim que a rodada anterior corrigiu as imagens, o Vinícius reportou um segundo problema:
clicar em qualquer vídeo abria o lightbox mostrando **a imagem que ele tinha ampliado
antes**, no lugar do vídeo.

### Causa

O JS alterna qual elemento aparece no lightbox só trocando a propriedade `.hidden`:

```js
lbImg.hidden = ehVideo;
lbVid.hidden = !ehVideo;
```

`hidden` é um atributo booleano que, por padrão do navegador, vira `display: none` via uma
regra de baixíssima especificidade (`[hidden] { display: none }`, um seletor de atributo).
O CSS do lightbox, porém, tinha:

```css
#lb img,
#lb video { display: block; /* ... */ }
```

Um seletor por **ID** (`#lb img`) tem mais peso que um seletor de **atributo**
(`[hidden]`) na cascata — não importa a ordem no arquivo, `display: block` sempre ganhava.
Resultado: `lbImg.hidden = true` mudava o atributo no DOM, mas visualmente o `<img>`
continuava ocupando o mesmo espaço que o `<video>`, empilhado antes dele — como os dois são
blocos dentro do mesmo `<dialog>` de largura fixa, a imagem antiga ficava por cima/antes do
vídeo na área visível.

Interessante que isso não é um bug novo desta sessão — é um bug que **sempre existiu** no
lightbox, só nunca tinha sido percebido: até a rodada anterior (item 20), nenhum dos slots
de imagem em "Telas do sistema" tinha arquivo real, então clicar neles não fazia nada
(`if (!midia || !midia.classList.contains('ok')) return`). O primeiro clique que já
alternava entre imagem-com-arquivo-real e vídeo-com-arquivo-real só ficou possível depois
que as 6 telas ganharam mídia real nesta mesma leva de mudanças.

### Correção

Adicionada uma regra com especificidade equivalente em ID **mais** o próprio atributo, que
bate a regra original:

```css
#lb img[hidden],
#lb video[hidden] { display: none; }
```

`#lb img[hidden]` tem mais especificidade que `#lb img` (o atributo soma peso), então essa
regra vence sem precisar de `!important`. Não foi preciso mexer no JS — a lógica de
alternância sempre esteve correta, só o CSS não respeitava o que ela definia.

## 23. VCWB Bikes Pro — o último item de mídia do site, resolvido

O Vinícius mandou `C:\Users\jflas\VCWB_Oficina\demo\vcwb_demo.mp4` pedindo pra adicionar
"a última imagem/vídeo em VCWB" — o único projeto que ainda estava sem nenhuma mídia real
desde a criação do site (os dois slots de print, `vcwb-01-os.png` e `vcwb-02-dashboard.png`,
nunca tiveram arquivo).

### Duas decisões que só o Vinícius podia tomar

O vídeo (1600×900, 2min43s / 163s) tem tabelas com nome de cliente, telefone e valor pago —
exatamente o tipo de dado que a regra de sensibilidade deste documento manda verificar antes
de publicar. E a duração é mais de 4× o padrão do site (20-40s). Perguntado:

- **Dado real ou fictício?** Fictício — gerado só pra essa gravação de demonstração. Podia
  publicar sem censura.
- **Cortar pra caber no padrão, ou usar inteiro?** Usar o vídeo inteiro. Mesma exceção já
  registrada pro `wida-estoque.mp4` (item da rodada de 2026-09-22), mas por motivo
  diferente: lá era censura ("não censure nada"), aqui é duração.

### Processamento

Sem crop — a gravação já é tela cheia, sem chrome de navegador nem marca d'água, só a
navegação lateral e o cabeçalho nativos do próprio app (Streamlit), que são parte da
interface real e não saem. Só escala e compressão:

```bash
ffmpeg -i vcwb_demo.mp4 -vf "scale=1280:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset slow -g 60 -an -movflags +faststart \
  vcwb-demo.mp4
```

Resultado: 1280×720, 163s, 5,34 MB — bem acima dos <2MB que o resto dos vídeos do site mira,
mas consistente com a decisão de manter a gravação inteira.

### HTML

Os dois `<button class="shot">` de print (nunca usados) foram substituídos por **um** único
`<button class="shot shot-vid shot-wide">`, mesmo padrão já usado no LifeManager e no Sites
institucionais (vídeo sozinho, ocupando a `.gallery-2` inteira, sem print ao lado — decisão
já tomada em 2026-09-24 pros outros dois, aplicada aqui pela primeira vez porque só agora
existe gravação de verdade do VCWB pra decidir isso).

### Estado da mídia do site depois desta rodada

Com o VCWB resolvido, **não sobra nenhum placeholder de mídia no site** — pela primeira vez
desde a criação do projeto, hero, os 4 projetos e as 6 telas do Wida têm arquivo real em
todo slot. [ASSETS.md](ASSETS.md) e [CONTEXTO.md](CONTEXTO.md) foram atualizados pra
refletir isso.

## 24. VCWB — ajuste fino do corte (10s do início, 23s do fim)

Logo depois da rodada anterior, o Vinícius pediu pra cortar os primeiros 10s e os últimos
23s do `vcwb-demo.mp4` — de 163s foi para **130s (2min10s)**. Refeito a partir do arquivo
original (`vcwb_demo.mp4`, não do já comprimido) pra não perder qualidade num recorte em
cima de recorte:

```bash
ffmpeg -ss 10 -i vcwb_demo.mp4 -t 130 -vf "scale=1280:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset slow -g 60 -an -movflags +faststart \
  vcwb-demo.mp4
```

Resultado: 1280×720, 130s, **4,63 MB** (era 5,34 MB). Mesmo nome de arquivo, então nada
mudou no `index.html` nem no `verificar.html`.

> Nota de 2026-09-25, na revisão final: a primeira versão desta linha dizia "4,85 MB" e a do
> item anterior "5,6 MB" — eu tinha dividido os bytes por 1.000.000 em vez de 1.048.576,
> misturando MB decimal com MiB. Os valores acima são MiB, a mesma unidade que `du` e o
> explorador de arquivos mostram, e batem com o resto das tabelas do [ASSETS.md](ASSETS.md).

# Décima quinta rodada — 2026-09-25

## 25. Revisão de segurança e otimização antes de publicar no GitHub

Pedido do Vinícius antes de subir o site pro GitHub Pages. O achado principal não estava no
código — estava nesta própria documentação.

### O vazamento: a documentação da censura anulava a censura

`docs/ASSETS.md` tinha uma tabela registrando o que foi encontrado de dado sensível em cada
gravação e o que foi decidido sobre cada um. Para ser útil, ela nomeava o que apareceu: a
razão social de um cliente real da Wida, dois nomes de pessoas reais, e dois valores
financeiros da empresa.

O problema é que **o vídeo tinha esses nomes borrados e o markdown os escrevia legíveis**.
Pixel borrado em vídeo não é pesquisável; texto em repositório público é indexado pelo Google
e encontrável por busca de nome. Ou seja: publicar o repo tornaria o dado *mais* exposto do
que ele estaria se nunca tivéssemos censurado nada — o esforço de borrar o vídeo seria
revertido pelo arquivo que explicava o borrão.

A mesma armadilha tinha me pegado no item 20 desta rodada: eu recortei o IP interno da
fábrica do `rh.mp4` por ser dado sensível e, na frase seguinte, escrevi o IP inteiro em
texto puro no REFERENCIAS.md para documentar o recorte.

**Correção**: a tabela do ASSETS.md passou a descrever *categorias* ("razão social de um
cliente", "valor de faturamento do período") em vez dos dados; o IP virou "endereço privado
+ porta, não reproduzido aqui de propósito". Nenhuma decisão foi apagada — só o dado que
tornava a decisão identificável. Um aviso em destaque no topo da tabela explica a regra para
quem for editar depois.

**A lição generalizável**: documentar uma censura é criar um segundo lugar onde o dado pode
vazar, e esse segundo lugar costuma ser *pior* que o primeiro, porque texto é pesquisável e
mídia não. Descreva a categoria, nunca o valor.

### Otimização: 12,4 MB saíram do caminho crítico

As três sequências de quadros (`sobre-monster` 117, `halter-frames` 240, `moto-frames` 240 —
597 arquivos, 12,4 MB) eram pré-carregadas **no load da página**, com um `for` que criava os
597 `new Image()` de uma vez. Isso acontecia mesmo para quem nunca rolasse até lá, e mesmo no
celular — que nem usa o scrub por scroll (cai no ramo `telaEstreita`, que só gira em loop).

Trocado por um `IntersectionObserver` com `rootMargin: '150% 0px'`: os quadros só começam a
baixar quando a seção está a uma tela e meia de distância. O observer fica **antes** do
`return` do ramo mobile, então os dois caminhos ganham. Se alguém rolar rápido demais,
`desenhar()` não pinta (a guarda `!img || !img.complete` já existia) e o canvas fica vazio
por um instante — degrada em silêncio.

Peso imediato do primeiro carregamento: **14,3 MB → ~2 MB**.

⚠️ **Não foi verificado em navegador** — não havia ferramenta de browser nesta sessão, só
`node --check` e revisão de lógica. As três animações de scroll são o mecanismo mais delicado
do site; se alguma parar de desenhar, é aqui que se olha primeiro.

### O que o `.gitignore` passou a barrar

Não existia `.gitignore`, e o `git add .` do README mandaria:

- `assets/*.mp4` — 12,6 MB das **gravações originais** (`moto.mp4`, `halter.mp4`,
  `moto_fundoverde.mp4`, `video_do_monster_branc.mp4`). Nenhuma é servida pelo site (a única
  menção a `moto_fundoverde.mp4` está dentro de um comentário HTML), e algumas ainda têm
  marca d'água e chrome de navegador — exatamente o material não tratado.
- `.claude/scheduled_tasks.lock` — lock de sessão de ferramenta.

O padrão `assets/*.mp4` foi **testado num repositório descartável** com `git check-ignore`
antes de confiar nele: `*` não atravessa `/`, então os vídeos tratados em
`assets/projetos/` continuam sendo publicados. Valia testar — é o controle que impede
material não tratado de ir ao ar.

### O que foi verificado e estava correto

- **XSS**: o único caminho de entrada do visitante até `innerHTML` é a mensagem de "comando
  não encontrado" do terminal, que remove `<>&` em contexto de nó de texto — suficiente, já
  que sem `<` não se abre tag e sem `&` não se usa entidade. Nada lê `location.search` ou
  `location.hash` (o `location.hash` da linha 353 é **escrita**), então não há XSS refletido;
  no pior caso seria self-XSS. Fica o registro de que é **frágil, não vulnerável**: mover essa
  interpolação para dentro de um atributo HTML tornaria injetável, porque aspas não são
  removidas.
- Os 9 `target="_blank"` já tinham `rel="noopener"`.
- Nenhum segredo, token ou credencial. `localStorage` guarda só o tema.
- Nenhum caminho local no site servido — só o README tinha `C:\Users\jflas\...` (expunha o
  nome de usuário do Windows), trocado por instrução relativa.
- O PDF do currículo tem só bairro/cidade, sem endereço completo nem documento.

### Decisões do Vinícius nesta revisão

- **Telefone mantido** no site. A pendência estava aberta em [CONTEXTO.md](CONTEXTO.md) desde
  o começo do projeto; com a publicação ele decidiu manter — conversão direta por WhatsApp
  vale mais que o risco de spam. Pendência encerrada.
- **`docs/` continua no repositório**, com os dados censurados (a alternativa era deixar a
  pasta inteira fora do `git`).

### Itens apresentados que seguem sem decisão

- `wida-01-producao.png` mostra o schema interno do ERP do empregador (nomes de tabela e
  coluna) e, na barra lateral do editor, nomes de arquivo de documentos internos.
- O aval do empregador sobre publicar prints e vídeos de sistemas internos em produção.

## 26. Auditoria de documentação antes de tornar o repositório público

Pedido do Vinícius logo depois da revisão de segurança: conferir se todos os `.md` descrevem
o site que existe hoje. Como o repositório ia ficar público, documentação errada deixaria de
ser um problema interno e viraria a primeira coisa que um recrutador técnico lê.

O método foi cruzar cada afirmação **verificável** contra o código, com `grep`/`ffprobe`, em
vez de reler procurando o que parecesse errado. As contagens conferidas: 8 botões de vídeo,
5 de imagem, 14 entradas no `verificar.html`, 8 blocos no `script.js`, 3 canvas de quadros,
9 links externos (todos com `rel="noopener"`), 0 `loading="lazy"` — todas batendo com o que
os documentos afirmam, depois das correções abaixo.

### O que estava desatualizado

Quase tudo vinha das mudanças das últimas rodadas, que mexeram em coisas que a documentação
descrevia de passagem em vários lugares:

| Onde | Dizia | Realidade |
|---|---|---|
| ARQUITETURA, estrutura | `script.js` tem "4 comportamentos, ~90 linhas" | 8 blocos, ~710 linhas — e o próprio documento já dizia "oito blocos" 30 linhas abaixo |
| ARQUITETURA, bloco 2 | "um mesmo observer marca a nav **e o trilho da direita**" | o índice da direita saiu em 09-25; sobrou só a nav |
| ARQUITETURA, blocos 7 e 8 | "a prévia de vídeo **no hover**" (2×) | virou autoplay ao aparecer na tela em 09-25 |
| ARQUITETURA, bloco 8 | quadros "pré-carregados **no arranque**" | passaram a carregar sob demanda na revisão de otimização |
| ARQUITETURA, acessibilidade | "`prefers-reduced-motion` desliga **toda** animação" | há 4 exceções deliberadas, documentadas no mesmo arquivo |
| ARQUITETURA, acessibilidade | "os trilhos laterais" (plural) | só o social existe |
| ARQUITETURA, checklist | prévias de vídeo: 6 vídeos | são 8 |
| ASSETS, tabela de vídeos | cabeçalho "4 slots" sobre uma tabela de 6 linhas, e mais 2 vídeos descritos soltos em parágrafos | reescrita como inventário único dos 8, com coluna dizendo em que galeria cada um vive |
| ASSETS + CONTEXTO | "os 6 vídeos 'Em funcionamento'" | "Em funcionamento" tem 4; o 6 era o total antigo do site |
| CONTEXTO | vídeo do VCWB com "2min43s" | foi cortado pra 2min10s na rodada anterior |
| README | estrutura sem o `.gitignore`, `script.js` descrito por 4 dos 8 blocos | atualizado |

### Um erro de unidade meu

As entradas dos itens 23 e 24 diziam 5,6 MB e 4,85 MB para o vídeo do VCWB. Eu tinha
dividido os bytes por 1.000.000 (MB decimal) enquanto todas as outras tabelas do ASSETS.md
usam 1.048.576 (MiB, o que `du` e o Windows mostram). Corrigido para 5,34 MB e 4,63 MB, com
nota explicando — números em log só servem se forem comparáveis entre si.

### O que também foi documentado agora, e não existia

- O ⚠️ sobre `#lb img[hidden]` no bloco 4 do ARQUITETURA: a correção do item 22 estava
  registrada aqui, mas quem fosse mexer nas regras de `#lb` no CSS não tinha como saber que
  aquele par de seletores é o que faz o `hidden` funcionar.
- Dois itens novos no checklist de verificação: lightbox não misturar mídias (item 15) e o
  carregamento adiado dos quadros (item 16, com o passo a passo no DevTools pra confirmar
  que 597 arquivos **não** são pedidos no load).

### Regra que fica

Mudança de comportamento quase nunca mora num lugar só na documentação. As trocas de 09-25
(índice removido, hover → autoplay) foram registradas com cuidado em REFERENCIAS e DESIGN no
dia, e mesmo assim sobreviveram cinco menções contraditórias em ARQUITETURA — porque lá elas
apareciam **de passagem**, dentro de explicações sobre outra coisa. Ao mudar comportamento,
vale um `grep` pelo termo antigo em `docs/` antes de fechar a rodada.
