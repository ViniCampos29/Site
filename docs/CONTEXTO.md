# Contexto — por que este site existe

> Se você está chegando agora neste projeto, leia este arquivo primeiro.
> Os outros documentos assumem o que está aqui.

## O dono

**Vinícius de Oliveira de Campos** — Analista de Dados & Automação na Wida Indústria e
Comércio de Embalagens, em Curitiba/PR. Na prática ele é o time de TI inteiro da planta:
levanta requisito com o operador na máquina, modela a query no Oracle, escreve o Python,
sobe o servidor e pendura a TV na parede. Também responde por PCP e pela infraestrutura
crítica da fábrica.

Veio do administrativo (Electrolux como Jovem Aprendiz, depois suprimentos na Linkedata) e
migrou para tecnologia. Essa origem importa para o tom do site: o diferencial dele não é
saber mais framework que os outros, é entender o processo industrial antes de escrever
código.

Contatos: vinicampos29@gmail.com · (41) 98733-4348 ·
[LinkedIn](https://www.linkedin.com/in/vinicius-de-oliveira-de-campos-347213236/) ·
[github.com/ViniCampos29](https://github.com/ViniCampos29)

## O problema que o site resolve

Os sistemas que ele construiu são **internos de empresa e os repositórios são privados**.
O GitHub dele, para um recrutador, parece vazio. O currículo em PDF diz que ele fez uma
plataforma de BI industrial com 7 módulos, mas não mostra nenhuma.

O portfólio existe para fechar essa lacuna: provar visualmente o que o GitHub não prova.
Daí a estrutura — a seção de projetos é o centro do site, não um apêndice, e cada projeto é
contado como **problema → solução → engenharia → impacto**, não como lista de features.

## Para quem o site é escrito

Recrutador técnico e gestor de área, em processo seletivo. Alguém que abre o link por
30 segundos antes de decidir se chama para entrevista. Consequências disso:

- O número vem antes da explicação (as estatísticas do hero existem por isso).
- Nada de jargão sem contexto — "OEE" aparece junto do que significa na prática.
- O currículo em PDF está a um clique em dois lugares (hero e contato).
- O site é uma página só. Não há navegação que possa dar errado.

## De onde vem o conteúdo

**Todo texto factual do site saiu dos dois currículos em PDF do Vinícius**
(`Desktop/Curriculo Vinicius.pdf` e `Desktop/Curriculo_Vinicius.pdf`). Os dois são
consistentes; o segundo tem descrições mais longas de experiência, usadas para enriquecer a
timeline.

Duas exceções, ambas deliberadas:

1. **LifeManager** — no currículo aparece como "App de Controle Financeiro com IA". O nome
   real e os detalhes (offline-first, SQLCipher, sync só em LAN, Hub Python) vieram de
   `Desktop/LifeManager/PRODUCT.md` e `README.md`, que são fonte primária do próprio projeto.
2. **Textos de narrativa** (o "Sobre mim", os blocos "O problema"/"A solução") foram
   escritos para o site a partir dos fatos do currículo. São interpretação, não invenção —
   cada afirmação técnica neles tem respaldo no PDF.

### Regra para quem for editar

**Não invente fato novo.** Número de módulos, stack, datas, cargos, carga horária de curso —
tudo isso está no currículo e deve bater com ele. Se precisar de um dado que não está lá,
pergunte ao Vinícius em vez de estimar. Um portfólio com dado inflado é um problema em
entrevista técnica.

## Decisões já tomadas (e por quê)

| Decisão | Motivo |
|---|---|
| HTML/CSS/JS puro, sem build | Site de conteúdo estático. Sem `npm install`, sem pipeline, publica de graça no GitHub Pages. Ele mesmo consegue mexer. |
| **Dark por padrão, com alternância para claro** (revisto em 2026-09-22) | A decisão original era dark único — ver o motivo abaixo, no histórico. O Vinícius pediu o toggle de volta; a implementação está em [DESIGN.md](DESIGN.md#tema). O terminal continua dark nos dois temas, por ser tratado como aparelho, não página. |
| **Sem formulário de contato** | Escolha explícita do Vinícius. Formulário em site estático exige serviço externo (Formspree/Web3Forms) e mais uma coisa para quebrar. Botões diretos convertem melhor. |
| Wida como projeto herói | Escolha explícita do Vinícius. É o único sistema em produção real e o mais completo. Os outros três são cards secundários. |
| Placeholders para mídia ausente | Não existia nenhuma captura dos sistemas na máquina. O site foi construído para funcionar vazio e melhorar conforme os arquivos chegam. Ver [ASSETS.md](ASSETS.md). |
| **Amplificar a identidade, não trocar** (2026-09-22) | Escolha explícita do Vinícius ao trazer 5 referências novas. O ciano, o dark industrial e as janelas retrô ficam; as referências entraram como estrutura e componentes. Ver [REFERENCIAS.md](REFERENCIAS.md). |
| **Terminal interativo no hero** (2026-09-22) | Escolha explícita do Vinícius. Não é enfeite: ele sobe VPS, escreve systemd e entra por SSH. O shell descreve o trabalho dele literalmente — e carrega os números de prova na saída de `whoami`. |

## Estado atual

O site está **completo em estrutura e conteúdo**, e passou por uma refatoração de UI/UX em
**2026-09-22** a partir de cinco referências novas — entraram o terminal interativo, a
faixa de logos e o checklist; saiu o eyebrow, a faixa de estatísticas e dois dos quatro
CTAs do hero. Os trilhos laterais (redes à esquerda, índice de seções à direita) foram
removidos e **depois restaurados no mesmo dia**, a pedido do Vinícius nos dois casos. Em
**2026-09-25**, o índice de seções (goteira direita) foi removido de novo, dessa vez pra
valer — o trilho social (goteira esquerda) continua. O registro completo está em
[REFERENCIAS.md](REFERENCIAS.md).

**Mídia: completa (2026-09-25).** São 14 peças no total — a foto do Vinícius, 5 prints e
8 vídeos: os 6 slots de "Telas do sistema" (5 prints + o vídeo de RH), os 4 vídeos de "Em
funcionamento" (Wida), e um vídeo em cada card de LifeManager, Sites e VCWB Bikes Pro
(`vcwb-demo.mp4`, 2min10s, dado fictício de demonstração). Estão todos no lugar. Os dois slots de print do VCWB (`vcwb-01-os.png`, `vcwb-02-dashboard.png`)
nunca tiveram arquivo e foram removidos do HTML — mesmo padrão já usado pro LifeManager e
Sites, vídeo sozinho sem print ao lado. Não há mais nenhum placeholder de mídia pendente no
site. Detalhes em [ASSETS.md](ASSETS.md) e [REFERENCIAS.md](REFERENCIAS.md).

**Tema claro adicionado** (2026-09-22, revertendo a decisão original de dark único — ver
tabela acima). Alterna via botão na nav, salva a escolha e respeita
`prefers-color-scheme` na primeira visita. O terminal fica dark nos dois temas.

Uma questão ficou **em aberto**: a fonte. O `--font` é Inter, que é tecnicamente correta mas
saturada. Trocar por uma display com mais personalidade é possível e mexe num token só, mas
não foi feito porque tipografia é decisão de identidade e a direção acordada foi amplificar,
não substituir. Detalhes em [REFERENCIAS.md](REFERENCIAS.md).

O Vinícius disse que vai ajustar os detalhes aos poucos, então espere pedidos incrementais
de refinamento visual e de conteúdo.

## Telefone público — decidido

O celular **(41) 98733-4348 está público** no site, como botão de WhatsApp. A pendência
ficou aberta desde o começo do projeto e foi **encerrada em 2026-09-25**, na revisão de
segurança feita antes de publicar no GitHub: perguntado diretamente, com a ressalva de que
publicar torna o número indexável em definitivo, o Vinícius decidiu **manter** — conversão
direta por WhatsApp vale mais que o risco de spam. Não reabra isso por conta própria. Se um
dia ele pedir para tirar, é o bloco `.ccard` do WhatsApp em `index.html`, na seção de
contato, e mais 3 ocorrências do número no mesmo arquivo.

## Antes de publicar qualquer coisa nova

Vale ler o item 25 de [REFERENCIAS.md](REFERENCIAS.md) (revisão de segurança de 2026-09-25).
A regra que saiu de lá e vale para sempre: **documentar um dado censurado é criar um segundo
lugar onde ele vaza — e texto é pesquisável, mídia não.** Ao registrar o que foi borrado num
print ou vídeo, descreva a *categoria* ("razão social de um cliente", "IP interno"), nunca o
valor.

## Mapa dos documentos

| Arquivo | Para quê |
|---|---|
| [CONTEXTO.md](CONTEXTO.md) | este arquivo — quem, por quê, o que não inventar |
| [DESIGN.md](DESIGN.md) | tema, tokens de cor, tipografia, componentes |
| [ARQUITETURA.md](ARQUITETURA.md) | como o código funciona, o padrão de mídia, acessibilidade |
| [ASSETS.md](ASSETS.md) | inventário dos slots de imagem, vídeo e foto |
| [REFERENCIAS.md](REFERENCIAS.md) | repositórios de inspiração, o que foi adotado e o que foi descartado |
| [../README.md](../README.md) | como rodar, verificar e publicar |
