# Arquitetura — como o código funciona

Site estático de arquivo único por linguagem. Sem build, sem dependência, sem
`node_modules`. Abrir `index.html` no navegador é suficiente.

```
index.html      todo o conteúdo e a estrutura das 6 seções
style.css       tokens e layout (ver DESIGN.md)
script.js       8 blocos numerados (dois com sub-bloco: 4b e 5b), ~710 linhas
verificar.html  página avulsa que checa quais arquivos de mídia já existem
.gitignore      mantém as gravações originais e o .claude/ fora do repositório
assets/         currículo em PDF, foto, e projetos/ com prints e vídeos
docs/           esta documentação
```

Não há roteamento, estado, nem dado dinâmico. O conteúdo é HTML escrito à mão.

## As 6 seções

Na ordem em que aparecem, cada uma com `id` usado pela navegação:

1. `#topo` — hero: título, frases rotativas, resumo, 2 CTAs, foto e **o terminal**
2. `#sobre` — trajetória em prosa + cartão "em uma linha"
3. `#stack` — 4 categorias de tecnologia
4. `#projetos` — **o centro do site**: Wida em destaque + 3 cards secundários
5. `#trajetoria` — timeline de experiência + formação + certificações
6. `#contato` — 4 cartões de contato + download do currículo

## Fora do `<main>`

Um `<aside>` fixo na goteira esquerda, visível só a partir de 1280px — abaixo disso some, e
tudo que contém já existe em outro lugar da página:

- `.rail-social`: GitHub, LinkedIn, WhatsApp, e-mail.

O índice de seções que existia na goteira direita (`.rail-index`/`.idx`, 01–05) foi
removido em 2026-09-25, por pedido do Vinícius — a navegação por seção continua na nav
(`.nav-links`) e no índice do terminal (comando `ajuda`).

## O que o JavaScript faz

Tudo em [`script.js`](../script.js), dentro de uma IIFE, em oito blocos numerados:

**1. Entrada ao rolar.** `IntersectionObserver` adiciona `.in` em cada `.reveal` quando entra
na viewport, e para de observar (revela uma vez, não repete ao rolar de volta). Antes disso,
cada elemento recebe `--d` conforme sua posição entre os irmãos que também revelam, o que dá
a cascata curta. Com `prefers-reduced-motion`, revela tudo de imediato e nem cria o observer.

**2. Link ativo na nav.** Um segundo `IntersectionObserver` com
`rootMargin: '-45% 0px -50% 0px'` — a seção conta como ativa quando cruza o meio da tela.
O mapa é `seção → [links]`, uma lista por seção. Ele já serviu a nav **e** ao índice lateral
da direita ao mesmo tempo; com o índice removido em 2026-09-25 sobrou só `.nav-links a` no
seletor, mas a estrutura de lista continua — se um dia voltar um segundo conjunto de links
de seção, é aqui que ele entra, sem criar um observer novo. Um listener de scroll adiciona
`.stuck` na nav.

**3. Detecção de mídia.** Explicado abaixo — é o padrão central do projeto.

**4. Lightbox.** `<dialog>` nativo com `showModal()`. O elemento nativo já entrega Esc,
backdrop, foco preso e semântica de modal — por isso não há biblioteca. O mesmo dialog serve
imagem e vídeo, alternando `hidden` entre `#lb-img` e `#lb-video`.

⚠️ **Alternar `hidden` só funciona porque o CSS tem uma regra explícita pra isso.** O padrão
do navegador para `[hidden]` é um seletor de atributo, e `#lb img`/`#lb video` é um seletor
por **ID** — que vence por especificidade e devolve `display: block` mesmo com o atributo
presente. Enquanto faltou `#lb img[hidden] { display: none }` no `style.css`, trocar o
atributo não escondia nada: abrir um vídeo mostrava a imagem ampliada antes dele, empilhada
no mesmo dialog. Se mexer nas regras de `#lb`, mantenha o par `[hidden]` — ver item 22 em
[REFERENCIAS.md](REFERENCIAS.md).

**5. Terminal.** Ver a seção própria abaixo.

**5b. Copiar link da seção.** Cada `h2` tem um botão `[data-copy-link="#sobre"]` (ver
[DESIGN.md](DESIGN.md), `.h2-copy`) que copia `location.origin + location.pathname + hash`
via `navigator.clipboard.writeText`. Se a Clipboard API falhar (contexto não seguro,
navegador antigo), cai para `location.hash = hash` em vez de falhar calado. O ícone troca
para um check e o `aria-label` muda para "Link copiado" por 1,6s — feedback visual e de
leitor de tela, não só um dos dois.

**6. Componentes menores.** Alternância de tema, frases rotativas e o relógio de Curitiba.
A alternância em si (clique + gravação em `localStorage`) fica em `script.js`; a decisão
do tema **na carga da página** é um `<script>` separado, inline, no `<head>` de
`index.html` — precisa rodar antes de `style.css` pintar, e `script.js` só carrega depois
do `<body>`. Ver a mecânica completa em [DESIGN.md](DESIGN.md#tema).

**7. Grade animada do hero.** `<canvas data-hero-grid>` desenhado à mão (sem lib) —
quadriculado que desliza e acende sob o cursor. **Ignora `prefers-reduced-motion` por
completo** — não lê a flag `reduced` do topo do arquivo, roda o loop de
`requestAnimationFrame`, o rastro do cursor e os listeners de mouse sempre. Cores lidas de
`--line`/`--accent` via `getComputedStyle`, relidas a cada clique no toggle de tema.

⚠️ **Isto é a terceira versão do código, e a exceção é deliberada — não "esquecida".**
Peça o histórico completo (com o raciocínio de cada tentativa) antes de mudar isto de
novo: [DESIGN.md](DESIGN.md#movimento). Resumo:

1. `display:none` sob a preferência → escondia a grade para qualquer visitante real com
   "reduzir movimento" ligado no sistema (comum no Windows). Relatado como bug.
2. Grade estática sob a preferência, animada sem ela → correto em teoria, mas o Vinícius
   não conseguiu manter a preferência do Windows desligada de forma estável (revertia
   sozinha) e ficou sem conseguir ver a versão animada que ele tinha pedido.
3. **Atual:** sempre animada, sem checar `reduced`. Mesma classe de exceção que a prévia
   de vídeo ao aparecer na tela (bloco 4b) — mas por um motivo diferente: lá é porque é
   gesto do visitante (rolar até o vídeo); aqui é porque as duas tentativas de respeitar a
   preferência corretamente deixaram o recurso inutilizável para quem pediu.

Pausa o loop com `IntersectionObserver` (fora da viewport) e `visibilitychange` (aba em
segundo plano) — mesmo padrão de economia que o resto do site já segue. Ver a origem e o
que foi simplificado do componente original em [REFERENCIAS.md](REFERENCIAS.md).

**`pointer-events` precisa passar pelo conteúdo até a grade.** `.hero-in` é
`pointer-events: none`; `.cta` e `.term` recebem `auto` de volta, porque são os únicos
filhos que precisam de clique/digitação real (o resto — `h1`, parágrafos, a foto, as
coordenadas — não tem interação própria). Sem isso, o mouse nunca alcança o `<canvas>`
nas áreas cobertas por esses elementos: a grade continua desenhada ali (`prefers-` não
afeta o desenho), só não reage ao cursor — foi relatado como "a grade não funciona atrás
do texto", e a causa real era essa, não a renderização. Ao adicionar um elemento
interativo novo dentro de `.hero-in`, lembre de lhe dar `pointer-events: auto`
explicitamente, senão ele fica visível mas inclicável.

**8. Animação controlada pelo scroll.** Procura todo `[data-scroll-video-track]` da
página — hoje a lata de Sobre mim, o halter na seção Stack e a moto em Trajetória (as três
que o Vinícius avisou que viriam). Para cada um: lê `--frames` (e `--fps`, se
houver vídeo) do `style`
inline do próprio track, escuta `scroll`/`resize` com throttle por `requestAnimationFrame`
(mesmo padrão de `ticking`/`tentarIniciar` que a grade do hero já usa, agora extraído na
função `ligarScrub(track, aoProgresso)`), e a cada tick calcula o progresso a partir de
`getBoundingClientRect()` da pista (`track`) sozinha:

```
percurso  = innerHeight − NAV_H + rTrack.height
progresso = (innerHeight − rTrack.top) / percurso   — sempre 0..1 (trava em 1 no fim)
```

`progresso = 0` quando a pista **entra** pela borda de baixo da janela; `progresso = 1`
quando ela **termina de sair** pela borda de cima (por trás da nav, em `NAV_H`). A
animação cobre a janela de visibilidade inteira do elemento — não só o trecho em que o
`position: sticky` está "grudado" no lugar (isso é só o efeito visual de prender a tela;
ver ⚠️ mais abaixo). Por isso a função não precisa da altura do pin pra nada — só de
`track`.

O que acontece com esse `progresso` depende do que existe dentro da pista — **dois braços,
escolhidos automaticamente**:

- `<video data-scroll-video>` → `video.currentTime = progresso × (frames / fps)`. Nunca
  recebe `.play()` — o scroll é que "toca" o vídeo, quadro a quadro.
- `<canvas data-scroll-frames data-frame-src="...f_%03d.webp">` → desenha
  `Math.round(progresso × (frames − 1))` num `drawImage`, a partir de um array de `Image()`,
  uma por quadro. Usado quando o vídeo teve o fundo removido: ver ⚠️ abaixo sobre por que
  isso não é um `<video>` com canal alfa.

  ⚠️ **Os quadros não são baixados no arranque da página — e não volte a fazer isso.** São
  597 arquivos somando as três sequências (12,4 MB); carregar tudo no `load` empurrava esse
  peso inteiro pra frente do primeiro carregamento, inclusive pra quem nunca rolasse até lá
  e inclusive no celular, que cai no ramo `telaEstreita` e nem usa o scrub. Desde 2026-09-25
  um `IntersectionObserver` com `rootMargin: '150% 0px'` dispara o carregamento quando a
  pista está a uma tela e meia de distância. O observer fica **antes** do `return` do ramo
  mobile, de propósito — os dois caminhos dependem dele. Se alguém rolar mais rápido que o
  download, `desenhar()` não pinta (a guarda `!img || !img.complete` cobre o array ainda
  vazio) e o canvas fica em branco por um instante, sem erro.

Quem prende e solta a tela nos dois casos é o **CSS puro** (`position: sticky` em
`.scroll-video-pin`, dentro de `.scroll-video-track` alto o bastante pra dar percurso de
rolagem); o JS só lê o progresso, nunca intercepta ou bloqueia o evento de scroll — por
isso não é scroll-jacking, e a barra de rolagem, o teclado e o gesto de arrastar continuam
funcionando o tempo todo. Como o progresso já é travado em `[0, 1]`, o último quadro fica
parado na tela quando a rolagem passa do fim — não precisa de lógica extra pra "congelar".

Abaixo de 900px o `if (telaEstreita)` desvia pra um caminho totalmente diferente em ambos
os braços: sem pista, sem sticky. Vídeo entra em loop (`video.loop = true`, `.play()` de
verdade) enquanto um `IntersectionObserver` o considera visível; canvas gira sozinho via
`setInterval` no mesmo gatilho de visibilidade — mais perto do padrão da prévia de vídeo do
bloco 4b (toca ao entrar na tela, pausa ao sair) do que do scroll-scrub.

⚠️ **O reencode com `-g 1` (um keyframe por quadro) não é opcional para o braço `<video>`.**
O vídeo original tinha só 5 keyframes em 117 quadros — buscar um quadro qualquer exigiria
decodificar desde o keyframe anterior, lento demais para acompanhar o scroll ao vivo. Todo
vídeo novo deste tipo (sem necessidade de remover fundo) precisa do mesmo tratamento antes
de entrar no site. Receita e o motivo completo em [REFERENCIAS.md](REFERENCIAS.md).

⚠️ **Vídeo com canal alfa (fundo transparente) não sobreviveu ao teste, então virou
sequência de imagens.** WebM/VP9 com `-pix_fmt yuva420p` codifica sem erro, mas o próprio
`ffmpeg` local, ao decodificar de volta o arquivo gerado, devolve o vídeo sempre opaco —
nem a ferramenta que gerou o arquivo confirma que a transparência sobrevive. Por isso a
lata de Sobre mim (fundo removido via `ffmpeg colorkey`) é 117 arquivos WebP estáticos
(`libwebp`, **não** `libwebp_anim` — esse junta tudo num único WebP animado, sem acesso por
índice de quadro) desenhados num `<canvas>`, não um `<video>`. Se um próximo vídeo do
Vinícius também precisar de fundo removido, repita esse braço; se não precisar, o braço
`<video>` original continua valendo e é mais simples.

⚠️ **Ao regerar os quadros WebP, não use `colorkey` sozinho — vai voltar o furinho e o
halo.** `colorkey` é só distância de cor por pixel, sem noção de região conectada: reflexo
claro no corpo do objeto vira buraco transparente solto (não é fundo, mas fica perto da cor
do fundo — às vezes até **mais branco** que o fundo, caso do reflexo específico do Monster,
ver [REFERENCIAS.md](REFERENCIAS.md#13-furo-no-meio-da-lata-visível-só-no-tema-escuro)), e
pixel de borda parcialmente transparente mantém a cor branca do fundo misturada (halo). O
pipeline de exportação faz um *closing* morfológico no alfa (`dilation` ×8 + `erosion` ×9 —
8 pra fechar buraco, +1 de *choke* pra comer a borda contaminada) — pule essas etapas só se
for reencodar um vídeo sem esses dois defeitos.

⚠️ **`colorkey` só funciona se o fundo do vídeo for uma cor única do início ao fim — se o
fundo muda (vinheta, sombra que aparece, escurecimento), troque de técnica.** A primeira
gravação da moto em Trajetória tinha esse problema (fundo branco que virava cinza com
vinheta conforme a câmera avança) — regravada depois com fundo verde-croma sólido
(`assets/moto_fundoverde.mp4`), o que trouxe `colorkey`/`chromakey` de volta como opção
viável (ver item 16 em [REFERENCIAS.md](REFERENCIAS.md)). Se aparecer outro vídeo com fundo
variável (câmera se aproximando, vinheta, sombra que muda), a saída de emergência é um
modelo de segmentação (`rembg`) em vez de distância de cor — decide "é objeto ou é fundo"
pelo conteúdo da imagem, não por uma cor de referência; ficou registrado como aprendizado
(item 14 em REFERENCIAS.md) mesmo não sendo mais o pipeline em produção da moto. Se precisar
de novo: `venv` isolado no scratchpad (nunca no Python do projeto), `pip install
"rembg[cpu]"`, baixa um modelo de ~179 MB na primeira execução, e é bem mais lento que
`colorkey`/`chromakey` (CPU, ~3 quadros/minuto — rode em background).

⚠️ **Fundo verde/azul usa `chromakey` (YUV) + `despill`, não `colorkey` (RGB) — `despill`
não existe pra fundo branco.** `chromakey` é mais preciso que `colorkey` pra chroma screen
saturado; `despill=type=green` (ou `blue`) limpa o resíduo de cor que sobra nas bordas
parcialmente transparentes (o mesmo problema de halo do item 13, mas com filtro pronto no
ffmpeg só pra verde/azul — fundo branco não tem despill nativo, dependeu do *choke* manual
descrito no item 13). Pipeline da moto atual: `chromakey=<hex>:<similarity>:<blend>` →
`despill=type=green:mix=0.5` → o mesmo *closing* (`dilation` ×8 + `erosion` ×9) de sempre.

⚠️ **O script `check_holes.py` (flood fill) dá falso positivo em roda raiada, disco de
freio perfurado, e qualquer cena com mais de um objeto solto (exploded view).** Ele só
enxerga "não está conectado à borda da imagem" — não distingue um furo de verdade (defeito)
de um vão intencional entre raios de roda, o furo de fábrica de um disco de freio, ou o
espaço entre duas peças soltas numa vista explodida. Aconteceu nas duas versões da moto
(141 quadros pela IA, depois 240 quadros por chromakey) — **todos** os quadros "deram furo"
no script nas duas vezes, e nenhum era defeito real: raio, furo de disco, vão entre peças,
confirmado comparando quadro a quadro sobre fundo escuro. **O script vale pra objeto único e
sólido (lata, halter); pra objeto vazado por natureza ou cena com múltiplos objetos soltos,
a inspeção tem que ser visual mesmo** — comparar contra fundo escuro sólido, não contra
xadrez (ver item 13 em [REFERENCIAS.md](REFERENCIAS.md)).

⚠️ **Não confie em inspeção visual sobre fundo axadrezado pra saber se sobrou furo — rode
`check_holes.py`.** O halter passou pela checagem visual "sem furo aparente" e tinha furo
de interior em 231 dos 240 quadros (a lata, 1 de 117) — o olho não pega isso de forma
confiável, principalmente sobre um padrão quadriculado. O script (não fica versionado no
repo — recriar a partir daqui se precisar) varre uma pasta de quadros WebP e conta pixel de
furo de interior de verdade, por *flood fill* vetorizado em numpy a partir das quatro
bordas da imagem (tudo que é `alpha < 50` e é alcançável a partir da borda é fundo de
verdade; o que sobra isolado é furo):

```python
import numpy as np
from PIL import Image
import glob, os, sys

def find_holes(path):
    im = np.array(Image.open(path).convert("RGBA"))
    bg = im[:, :, 3] < 50
    reached = np.zeros_like(bg)
    reached[0, :] = bg[0, :]; reached[-1, :] = bg[-1, :]
    reached[:, 0] = bg[:, 0]; reached[:, -1] = bg[:, -1]
    changed = True
    while changed:
        new = reached.copy()
        new[1:, :] |= reached[:-1, :]; new[:-1, :] |= reached[1:, :]
        new[:, 1:] |= reached[:, :-1]; new[:, :-1] |= reached[:, 1:]
        new &= bg
        changed = not np.array_equal(new, reached)
        reached = new
    return int((bg & ~reached).sum())

folder = sys.argv[1]
for f in sorted(glob.glob(os.path.join(folder, "f_*.webp"))):
    n = find_holes(f)
    if n > 0:
        print(os.path.basename(f), n, "hole px")
```

Critério de aceite: **zero furos em todos os quadros**, não "parece limpo numa amostra".
Rode de novo depois de qualquer ajuste no raio do `closing`.

⚠️ **A pista fica fora do `.wrap`, de propósito — é o que faz a animação cobrir a seção
inteira sem vh chutado, e sem alterar a estrutura do texto.** `.scroll-video-track` é irmã
de `.wrap.panel`, direto dentro da `<section>` de cada uma (`#sobre` pra lata, `#stack` pro
halter, `#trajetoria` pra moto — cada uma precisa de `position: relative`), com
`position: absolute; inset: 0`.
Como elemento absolutamente posicionado não contribui pra altura do pai, a altura da seção
continua vindo só do conteúdo normal (`.wrap.panel`) — e a pista, ocupando `inset: 0` desse
pai, automaticamente cobre exatamente essa altura, sem precisar de nenhum `<div>` extra nem
mudar em nada o HTML/CSS do texto que já existia ali. Não mexa nisso pra "arrumar" um vh —
se o texto crescer ou encolher, a pista acompanha sozinha. **Nunca crie uma `<div>`
dedicada só pra uma animação dessas** — a primeira versão do halter fez isso (um intervalo
solto entre `#stack` e `#projetos`, com altura própria) e o Vinícius pediu pra desfazer,
porque alterava a estrutura da página; a versão certa sempre mora dentro de uma seção que
já existe.

⚠️ **O pin sangra pra fora do `.wrap`, de propósito, pra dentro da goteira — direita pra
lata e pra moto, esquerda pro halter.** Lata e moto ficam alinhadas à direita
(`justify-content: flex-end`), halter à esquerda (`justify-content: flex-start`) — regra
comum em `#sobre .scroll-video-track, #trajetoria .scroll-video-track`. **A largura e o
`margin` do pin, porém, são regras separadas por seção** (`#sobre .scroll-video-pin`,
`#trajetoria .scroll-video-pin`, `#stack .scroll-video-pin`, cada uma com seu próprio
`margin-right`/`margin-left` e às vezes `width`/`height` também) — a moto usa um pin mais
estreito e uma margem menor que a lata (a composição explodida é mais larga e ficava sobre
o texto da timeline; ver item 16 em [REFERENCIAS.md](REFERENCIAS.md)), então **não assuma
que duas seções do mesmo lado compartilham a mesma medida** — confira a regra específica
antes de copiar valor de uma pra outra. Os três com `z-index: 95` — na esquerda, isso os
mantém acima de `.rail-social` (90) quando coincidirem na tela; na direita não há mais
trilho fixo (o índice de seções foi removido em 2026-09-25), mas o z-index ficou como
estava, sem motivo pra baixar.
Consequência: em larguras de tela intermediárias, o pin pode acabar cobrindo o começo do
`h2`/`.sec-lede` da seção (aconteceu com "02 Stack tecnológica", e de novo com a moto sobre
a timeline) — a correção não é sempre mexer no texto: pra Stack foi `padding-left` no
`h2`/`.sec-lede` (ver `#stack h2, #stack .sec-lede` em `style.css`); pra moto foi encolher
e reposicionar o próprio pin, porque mexer no texto da timeline não era uma opção (pedido
explícito de não alterar a estrutura do texto). Julgue caso a caso qual lado é mais barato
de ajustar.

⚠️ **O halter (`#stack .scroll-video-pin`) NÃO usa `position: sticky` — é
`position: static`, de propósito, diferente da lata e da moto.** Passou por duas rodadas de
ajuste tentando fazer o *sticky* "ficar estático" (dar mais altura à pista pra segurar o
percurso grudado inteiro, depois encolher o pin pra alinhar com o `h2`) — nenhuma resolveu
de vez, porque o pedido real (`"não deve sair do lado do título Stack tecnológica"`) é
incompatível com `sticky` por natureza: `sticky` faz o pin **parar de se mover relativo à
viewport** assim que engata, e o `h2` ao lado dele (que não é sticky) continua rolando
normal — os dois sempre divergem em algum ponto do scroll, não importa quanto tempo fica
grudado nem que altura tem o pin. **A ferramenta certa era outra, não um ajuste fino da
mesma.** Trocado pra `position: static` — o pin vira um item de flex comum dentro da pista
(que continua `position: absolute`, ancorada a um ponto fixo do *documento*), e por isso
rola no mesmo ritmo que o `h2`: sempre à mesma distância relativa dele, em qualquer ponto
do scroll. Verificado com harness medindo `pin.top − h2.top` em 11 pontos (30% antes da
seção até 50% depois): delta idêntico em todos, prova de que nunca diverge. **O scroll
continua controlando a animação normalmente** — `ligarScrub` só lê a pista
(`getBoundingClientRect()`), nunca soube nem precisou saber se o pin é sticky ou static;
trocar o posicionamento não tocou uma linha de JS.

**Quando usar `sticky` (lata, moto) vs. `static` (halter) pra uma animação nova:** pergunte
se a intenção é "prender a tela até a animação acabar, feito cinema" (sticky — caso de
`#sobre`/`#trajetoria`, seções longas onde isso foi pedido explicitamente) ou "ficar ao
lado de um ponto fixo do texto o tempo todo, sem prender nada" (static — caso do halter).
São comportamentos diferentes; a resposta muda a técnica inteira, não só os parâmetros de
altura/duração. Ver o histórico completo (as duas tentativas que não resolveram, antes de
chegar na correta) em [REFERENCIAS.md](REFERENCIAS.md).

⚠️ **`position: sticky` (visual, CSS) e a janela de progresso da animação (`ligarScrub`,
JS) são duas coisas independentes — não confunda uma com a outra.** O `sticky` só decide
quando o pin fica fixo na tela (efeito visual de "prender"); o progresso decide qual quadro
desenhar, e cobre a visibilidade da pista **inteira**, incluindo o trecho em que o pin
ainda não grudou (entrando por baixo) e o trecho depois de soltar (saindo por cima) — não
só o miolo grudado. Foi um pedido explícito do Vinícius depois de ver a primeira versão
(que só animava durante o trecho grudado, ficando parada no primeiro/último quadro nas
pontas): "deve começar assim que aparecer na tela e terminar quando sumir". Não amarre o
cálculo de progresso a quando o `sticky` engata — use a pista inteira contra a janela.

⚠️ **CSS de posicionamento é dividido em base + por local de uso — cada instância nova
define o próprio alinhamento, não mexe na base.** `.scroll-video-track`/`-pin`/`.scroll-video`
em `style.css` levam só a mecânica comum (sticky, sizing, fallback mobile). O alinhamento
específico — goteira direita pra lata (`#sobre .scroll-video-pin { margin-right: ... }`),
goteira esquerda pro halter (`#stack .scroll-video-pin { margin-left: ... }`) — fica em
blocos próprios, escopados pela seção de cada instância. Uma terceira animação ganha seu
próprio bloco `<contexto> .scroll-video-pin { ... }` com o alinhamento que fizer sentido
pro lugar (sempre dentro de uma seção existente, nunca numa `<div>` nova — ver aviso
acima), não edita os dois existentes.

⚠️ **Vídeo com seek OU reprodução normal (`.play()`) continua não sendo testável de forma
confiável no Chrome headless deste projeto — mas `position: sticky` e geometria de scroll
SÃO, com o método certo.** `wida-planta.mp4` (já em produção) não tem `currentTime` legível
após um seek, neste ambiente — isso continua valendo, não gaste tempo tentando provar scrub
de `<video>` por aqui. **Confirmado de novo ao testar autoplay-ao-aparecer (bloco 4b):**
`video.play()` nesse ambiente não devolve uma `Promise` de verdade (o `await` nela resolve
na hora, sem esperar nada — não é o comportamento padrão da spec), `.paused` vira `false`
normalmente, mas `currentTime` **não avança**, nem depois de segundos de espera — o decode
não roda de verdade no headless, mesmo a chamada tendo "funcionado" sem erro. Testado
isolado (chamando `v.play()` direto, sem IntersectionObserver no meio) pra garantir que não
era bug de lógica — não era: é o mesmo ambiente que já não seekava direito. Pra qualquer
vídeo novo com autoplay/scrub, teste que o código está certo (revisão + `.play()` não
lança erro, atributos `muted`/`playsinline` presentes) e peça confirmação visual num
navegador de verdade — não tente provar reprodução por aqui.

Só que a tentativa inicial de testar `sticky`/scroll via iframe tinha sido descartada cedo
demais como "não confiável" — o problema não era a técnica, era **não imprimir os números
como texto**. Tentar ler a posição por diferença de pixel num screenshot (ou usar uma
janela gigante pra "ver tudo de uma vez", que quebra `sticky` por completo — ver aviso
abaixo) mascarava o resultado. **O jeito que funciona de verdade:**

1. Um harness `<iframe>` de tamanho **normal** (não infle `--window-size`), servido pela
   mesma origem do site (ver aviso mais abaixo sobre `file://`).
2. `iframe.contentWindow.document.documentElement.style.scrollBehavior = 'auto'` antes de
   rolar — sem isso, `scroll-behavior: smooth` do site atrapalha `scrollTo()` sucessivos.
3. `contentWindow.scrollTo(0, y)` de verdade rola o iframe (isso sempre funcionou — o que
   faltava era o passo 2 e o próximo).
4. **Ler `getBoundingClientRect()` dos elementos e escrever os números como texto na
   página do harness** (não tentar interpretar visualmente) — só então tirar o screenshot,
   do **harness**, não do site, pra ler esse texto.

Foi assim que o bug do item 15 (`overflow-x` no `body` quebrando `sticky`) foi encontrado:
`pin.top` idêntico a `track.top` em todo ponto do scroll = sticky nunca engatou. Depois da
correção, mesmo harness confirmou `pin.top` travando em `96` (o valor de `top` do CSS)
enquanto havia percurso, só voltando a acompanhar a pista perto do fim de cada seção — ver
apuração completa em [REFERENCIAS.md](REFERENCIAS.md#15-positionsticky-nunca-tinha-realmente-grudado--bug-de-overflow-x-no-body).
**Esse é agora o método padrão pra validar `sticky`/scroll neste projeto** — não descarte
como "não testável" de novo sem tentar isso primeiro.

## O terminal

O `<pre>` do ASCII, a caixa `comandos` e **a saída de `whoami` já estão no HTML**. Sem
JavaScript o visitante vê o terminal completo e os quatro números de prova; o script só
acrescenta a capacidade de rodar comandos novos.

Comandos em `CMDS`: `ajuda`, `whoami`, `projetos`, `stack`, `sobre`, `contato`, `cv`,
`limpar`. `ALIASES` mapeia variantes (`help`, `clear`, `ls`, `curriculo`…). Comando
desconhecido responde nomeando o problema **e a saída** — `Digite ajuda…` —, que é o padrão
de mensagem de erro do projeto.

Pontos que não devem ser simplificados:

- **O eco do comando usa nó de texto, nunca `innerHTML`.** O visitante digita o que quiser;
  se isso virasse HTML, o site teria XSS. As respostas usam `innerHTML` porque são strings
  fixas do próprio arquivo. Há teste automatizado para isso — ver abaixo.
- **`cv` dispara o download de verdade**, criando um `<a download>` e clicando. Comando que
  anuncia uma ação precisa executá-la.
- **Tab só completa quando há um único candidato**, senão o Tab continua servindo para sair
  do campo — do contrário o teclado ficaria preso no terminal.
- **O campo não recebe foco no carregamento.** Roubar foco rolaria a página até o terminal.
- O clique na área do terminal devolve o foco ao campo, mas ignora cliques em link, botão
  ou quando há texto selecionado.
- O indicador de foco é o bloco `.term-caret` mais a borda em `:focus-within`, já que o
  `outline` nativo do campo foi desligado. Se remover um, reponha o outro.

## O padrão de mídia (o mais importante daqui)

O site foi construído **antes de existir qualquer captura de tela**. Ele precisa ficar
apresentável com zero arquivos de mídia e ir melhorando conforme eles chegam, sem que
nenhuma linha de código mude.

A mecânica, igual para imagem, vídeo e a foto do hero:

```html
<button class="shot" data-src="assets/projetos/wida-01-producao.png" data-cap="legenda">
  <img src="assets/projetos/wida-01-producao.png" alt="descrição">
  <span class="shot-ph"><b>Produção</b>Ordens e apontamento por máquina</span>
</button>
```

1. No CSS, `<img>` e `<video>` nascem com `display: none`. O que se vê é o `.shot-ph`,
   um placeholder com o rótulo do módulo.
2. O JS tenta carregar o arquivo. **Só se carregar de verdade** (`naturalWidth > 0` para
   imagem, `videoWidth > 0` para vídeo) ele adiciona a classe `.ok`.
3. `.ok` mostra a mídia; a regra `img.ok + .shot-ph { display: none }` esconde o placeholder.
4. O lightbox só abre para slot com `.ok`. Clicar num placeholder não faz nada.

**Por que não `onerror`:** com `display:none` de partida, o navegador nunca chega a desenhar
o ícone de imagem quebrada. `onerror` corrigiria depois do fato, com um flash visível.

**Consequência prática:** para adicionar uma captura, o único passo é salvar o arquivo com o
nome certo em `assets/projetos/`. Ver [ASSETS.md](ASSETS.md).

⚠️ **Nunca use `loading="lazy"` num `<img class="shot">`.** Foi tentado (era o padrão em
todos os `<img class="shot">` que existiam então — os 5 de "Telas do sistema" mais os 2 do
VCWB, removidos no mesmo dia) e, abrindo `index.html` direto
como arquivo local (`file://`, sem servidor) — que é o modo de uso que este documento
promete funcionar, linha 4 —, o carregamento adiado nunca disparava em pelo menos um
Chromium (Brave) testado pelo Vinícius: o placeholder ficava para sempre, mesmo com o
arquivo existindo e correto no disco, cache limpo e aba anônima. O `<video>` do mesmo grid,
sem `loading="lazy"` (não existe essa API pra vídeo), carregava normalmente — foi o que
apontou pra causa. Removido de todos os `<img class="shot">` em 2026-09-25 (ver
[REFERENCIAS.md](REFERENCIAS.md)). Como o site é uma página só com poucas dezenas de
imagens no total, carregar tudo sem lazy não pesa o suficiente pra valer o risco.

### Vídeo

Slots de vídeo usam `.shot-vid` e `data-video` em vez de `data-src`. O `<video>` fica com
`preload="metadata"` e serve de miniatura (primeiro frame). O `<span class="play">` só
aparece quando o vídeo existe, via seletor irmão `video.ok ~ .play`.

Ao abrir, o lightbox dá `play()` com `.catch(() => {})` — se a política de autoplay do
navegador bloquear, o usuário aperta play nos controles nativos e nada quebra.

**Ao fechar, o vídeo precisa parar.** Isso é feito com um `MutationObserver` no atributo
`open` do `<dialog>`, e não com o evento `close`. Motivo: o `close` não dispara de forma
confiável em todo ambiente (foi verificado que não dispara em Chrome headless dentro de
iframe), e vídeo que continua tocando com áudio por trás do modal é um defeito real, não
cosmético. Observar o atributo cobre os três caminhos de fechamento — botão, backdrop e Esc.

## Acessibilidade

Não simplifique estes pontos:

- `lang="pt-BR"` no `<html>`; link "pular para o conteúdo" como primeiro elemento focável.
- `alt` descritivo em toda imagem; `aria-label` em todo `<video>`.
- `:focus-visible` com contorno ciano de 2px — nunca remova o outline sem repor algo.
- Alvos de toque com no mínimo 44px de altura (os links da nav no mobile estão exatamente no
  limite: `padding: .72rem` existe por isso).
- O lightbox é `<dialog>` justamente porque o foco preso e o Esc vêm prontos e corretos.
- `prefers-reduced-motion` desliga a animação de entrada, as transições e a cascata do
  `.reveal` — mas **não** tudo. Há quatro exceções deliberadas e documentadas: a grade do
  hero (bloco 7), a prévia de vídeo ao aparecer (bloco 4b) e as três animações controladas
  por scroll (bloco 8). As três últimas se justificam por serem resposta a um gesto do
  visitante, não movimento ambiente; a da grade tem história própria — ver o bloco 7 acima e
  [DESIGN.md](DESIGN.md#movimento). Não "conserte" nenhuma delas sem ler o motivo antes.
- O terminal é um `<form>` com `<input>` e `<label>` de verdade, descrito por `#term-hint`
  (texto só para leitor de tela). Nada ali é `<div>` fingindo ser campo.
- O trilho social é conteúdo **redundante**: some abaixo de 1280px sem perda, porque as
  mesmas redes já estão no hero e na seção de contato.
- Os SVGs decorativos levam `aria-hidden="true"`; os links do trilho social levam
  `aria-label`, já que não têm texto visível.

## Como verificar uma mudança

Sem framework de teste. A verificação é o navegador:

1. Abra `index.html` — as 6 seções na ordem, a nav levando a cada uma.
2. Abra `verificar.html` — confirma quais arquivos de mídia o site está enxergando.
3. DevTools em 375px: sem scroll horizontal, tudo em uma coluna, os trilhos sumidos.
4. Clique num slot com mídia: lightbox abre; `Esc` fecha; vídeo para ao fechar.
5. Clique num placeholder: não deve acontecer nada.
6. Ligue "reduzir movimento" no SO e recarregue: conteúdo aparece sem animação.
7. **Terminal:** `ajuda`, um comando válido, um inválido e `limpar`. Depois `↑` recupera o
   anterior. Desligue o JavaScript e confirme que os quatro números continuam visíveis.
8. **Tema:** clique no botão sol/lua — a página inteira muda, o terminal continua dark.
   Recarregue: o tema escolhido persistiu. Limpe o `localStorage` e recarregue nos dois
   modos do SO (claro/escuro): o site abre no tema correspondente, sem flash do tema
   errado por uma fração de segundo.
9. Acima de 1280px de largura, o trilho social aparece na goteira esquerda; abaixo, some.
10. **Grade do hero:** um quadriculado bem sutil desliza atrás do título; passar o mouse
    acende as células por baixo do cursor com um rastro que apaga. Roda sempre, mesmo com
    "reduzir movimento" ligado no sistema — exceção deliberada, ver
    [DESIGN.md](DESIGN.md#movimento).
11. **Lata do scroll (seção Sobre, na goteira direita):** a lata de Monster Energy começa a
    girar assim que a borda de baixo dela aparece na tela (rolando pra baixo), não só depois
    de "grudar" — e termina de girar (último quadro) exatamente quando ela some por trás da
    nav, rolando pra cima. Na goteira direita. Fundo transparente, sem caixa/moldura atrás.
    Rolando pra cima, o giro volta ao contrário. Em tela ≤900px, sem goteira, ela aparece
    embutida no início da seção e só gira sozinha em loop, sem travar nada.
12. **Halter do scroll (seção Stack, na goteira esquerda):** mesmo comportamento da lata,
    espelhado pra esquerda — gira assim que aparece na tela, termina no último quadro
    exatamente quando some, na lateral esquerda, parcialmente sobre o trilho social
    (GitHub/LinkedIn/WhatsApp/e-mail). "02 Stack tecnológica" e a linha "Ferramentas que uso
    em produção..." não devem ficar por baixo dele em nenhuma largura de tela — se ficarem,
    é o `padding-left` de `#stack h2`/`#stack .sec-lede` que precisa de mais folga, não o
    pin que precisa mudar de lugar. Em tela ≤900px, sem goteira, aparece embutido no início
    da seção e só gira sozinho em loop.
13. **Moto do scroll (seção Trajetória, na goteira direita):** mesmo comportamento da lata
    (mesma goteira, mesma regra de CSS) — a moto começa montada e vai se desmontando peça
    por peça conforme rola, terminando explodida ao fim da seção. Timeline (empregos),
    Formação e Certificações continuam exatamente como estavam, sem nenhuma mudança de
    estrutura. Em tela ≤900px, sem goteira, aparece embutida no início da seção e só roda
    sozinha em loop.
14. **Prévias de vídeo tocando sozinhas (bloco 4b):** são **8 vídeos** no total — "RH — Ponto"
    dentro de "Telas do sistema", os 4 de "Em funcionamento" (Wida), e "Demonstração"
    (VCWB), "Demonstração" (LifeManager) e "Navegação" (Sites institucionais). Cada um
    começa a tocar (mudo, em loop) assim que entra na tela, sem precisar passar o mouse nem
    clicar; pausa e volta pro primeiro quadro ao sair de tela. Abrir o lightbox (clicar num
    deles) pausa todas as prévias por trás do modal; fechar o lightbox retoma só as que
    continuam visíveis.
15. **Lightbox não mistura mídias:** abra um vídeo, feche, abra uma **imagem**, feche, abra
    outro vídeo. Cada um deve mostrar só o que foi clicado. Se aparecer a mídia anterior
    junto, a regra `#lb img[hidden]` sumiu do `style.css` — ver o ⚠️ do bloco 4.
16. **Carregamento adiado dos quadros:** abra o DevTools na aba Network, filtre por `.webp`
    e recarregue **sem rolar**. Não deve haver requisição de quadro nenhum. Comece a rolar:
    os quadros de cada sequência só começam a aparecer quando a seção correspondente está
    perto. Se 597 arquivos forem pedidos de cara, o `IntersectionObserver` do bloco 8 foi
    desfeito — é o que segura ~12,4 MB fora do primeiro carregamento.

Se for mexer em `script.js`, vale dirigir a página por um iframe em Chrome headless.
Armadilhas que já custaram tempo:

- **A página de teste precisa ser servida pela mesma origem do site.** Um harness em
  `file://` apontando para `http://localhost:8000` é bloqueado por cross-origin. Suba o
  servidor, coloque o harness na pasta do site, rode e apague o arquivo depois.
- **`taskkill //F //IM python.exe` (ou equivalente "mata todo processo travado") derruba o
  servidor local junto** — `python -m http.server` também é `python.exe`. Se usar isso pra
  limpar processo travado de outra tarefa (ex.: script de verificação em Python), o servidor
  cai sem aviso; próximo teste no navegador só dá erro de conexão. Suba de novo
  (`python -m http.server 8000` na pasta do site) antes de continuar testando.
- **`scrollWidth` maior que `clientWidth` não significa scroll horizontal aqui.** As linhas
  de tela têm 200vw de propósito e sangram além do container; `overflow-x: clip` as corta.
  Para achar overflow de verdade, compare `getBoundingClientRect().right` de cada elemento
  com o `clientWidth` — se nenhum passa, não há defeito.
- **Clicar um toggle e tirar o print no mesmo passo pode capturar uma repintura pela
  metade** — viu-se a nav mudar de tema e o resto da página não, num teste automatizado,
  sem que fosse um bug real. Dê folga entre o clique e a captura, ou teste gravando a
  escolha em `localStorage` e recarregando (o caminho que um visitante de verdade usa).
- **O Chrome headless usado nos testes sempre reporta `prefers-reduced-motion: reduce`.**
  Qualquer elemento condicionado a essa preferência parece ausente ou quebrado no
  screenshot sem estar. A grade do hero e a prévia de vídeo já são imunes a isso (rodam
  sempre, ver [DESIGN.md](DESIGN.md#movimento)); para outro elemento que dependa de
  movimento normal, sobreponha a preferência só no teste, nunca no arquivo real — por CSS
  injetado ou substituindo `window.matchMedia` num `<script>` posto **antes** de
  `script.js` (precisa disso porque `reduced` é lido uma vez, no topo do arquivo).
- **`requestAnimationFrame` não roda em iframe posicionado fora da tela.** Um harness de
  teste com `iframe { position:absolute; left:-9999px }` (para esconder a UI de teste)
  faz o navegador suspender o rAF do conteúdo dentro dele — o loop de animação da grade
  parecia travado (contagem de quadros em zero) só por causa disso, sem bug nenhum no
  código. Para testar algo que depende de rAF, o iframe do teste precisa estar
  genuinamente visível (dentro da viewport, sem `left`/`top` negativos).
- **`<canvas>`, como `<img>` e `<video>`, é elemento substituído.** `position:absolute;
  inset:0` sozinho **não** o estica para preencher o pai como faria com uma `<div>` — sem
  `width`/`height` explícitos em CSS, ele fica no tamanho intrínseco padrão (300×150) e
  `offsetWidth`/`offsetHeight` dão 0. Foi assim que a grade do hero nasceu invisível. Ver
  [DESIGN.md](DESIGN.md#slots-de-mídia-como-janelas).
- **`--window-size` gigante pra caber a página inteira num só screenshot quebra
  `position: sticky`.** Um teste que tirou print com janela de ~5200px de altura pra
  capturar a seção Sobre inteira de uma vez mostrou um vão vazio enorme entre o texto e o
  "Resumo" — parecia que `.scroll-video-track` alto demais (210vh) tinha estourado o
  layout. Não era: `sticky` só gruda contra o *viewport real*; com uma janela artificialmente
  alta o bastante pra o documento inteiro caber sem rolar, o "viewport" vira do tamanho do
  documento e o elemento nunca tem contra o que grudar — ele só fica parado na posição de
  fluxo normal, exatamente como ficaria com `position: static`. Numa janela de altura normal
  (~900px) isso não acontece: o pin gruda e o "vão" nunca é visto de uma vez, porque o
  scroll está acontecendo por trás dele. Pra inspecionar a seção Sobre sem esse artefato,
  use janela de altura normal e role de verdade (ou aceite ver só o topo da seção sem
  scroll) — nunca infle `--window-size` além da altura real de um monitor pra "ver tudo de
  uma vez" em algo que usa `sticky`.

Além do navegador, `node --check script.js` pega erro de sintaxe antes de abrir a página.
