# Portfólio — Vinícius de Campos

Site estático de página única. Sem build, sem `npm install`, sem dependência.
**Para ver: duplo clique em `index.html`.**

> **Chegando agora neste projeto?** Leia [`docs/CONTEXTO.md`](docs/CONTEXTO.md) primeiro —
> explica para que o site existe, de onde vem cada texto e o que não pode ser inventado.

## Documentação

| Arquivo | Para quê |
|---|---|
| [docs/CONTEXTO.md](docs/CONTEXTO.md) | quem é o dono, por que o site existe, decisões tomadas |
| [docs/DESIGN.md](docs/DESIGN.md) | tema, tokens de cor, tipografia, componentes |
| [docs/ARQUITETURA.md](docs/ARQUITETURA.md) | como o código funciona, padrão de mídia, acessibilidade |
| [docs/ASSETS.md](docs/ASSETS.md) | inventário de mídia (o que já está no lugar, o que falta) e como adicionar |
| [docs/REFERENCIAS.md](docs/REFERENCIAS.md) | repositórios usados como inspiração e o que foi extraído de cada um |

## Estrutura

```
index.html       conteúdo e estrutura das 6 seções
style.css        tokens, layout, responsivo
script.js        8 blocos: reveal, nav ativa, detecção de mídia, lightbox,
                 terminal, tema, grade do hero e animações por scroll
verificar.html   mostra quais arquivos de mídia já estão no lugar
.gitignore       deixa as gravações originais fora do repositório
assets/          currículo, foto e projetos/ (prints + vídeos)
docs/            documentação
```

## Rodar localmente

Duplo clique em `index.html` já funciona. Se preferir servidor, a partir da pasta do
projeto:

```bash
python -m http.server 8000
```

Depois abra http://localhost:8000 — deixe o terminal aberto enquanto usa.

⚠️ **Não use `loading="lazy"` em `<img class="shot">`.** Abrindo o site como arquivo local
(`file://`), o carregamento adiado não dispara em alguns Chromium e a imagem nunca aparece.
Detalhes em [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md).

## Mídia

**Completa.** Foto do hero, as 6 telas do Wida, os 4 vídeos "Em funcionamento" e os vídeos
de LifeManager, Sites e VCWB Bikes Pro estão todos em `assets/`. Não há mais nenhum slot em
placeholder.

Todos os slots do site funcionam com placeholder e nenhum código muda ao preencher um:
basta salvar o arquivo com o nome exato listado em [`docs/ASSETS.md`](docs/ASSETS.md).
Depois abra **`verificar.html`** no navegador para confirmar que o site enxergou — serve
para pegar nome de arquivo digitado errado.

As gravações originais (`assets/*.mp4`) ficam fora do repositório pelo `.gitignore`: são
~12,6 MB, não são servidas pelo site, e algumas ainda têm marca d'água ou chrome de
navegador. Só os arquivos já tratados, em `assets/projetos/`, são publicados.

⚠️ Print de sistema de empresa pode ter nome de cliente, valor de faturamento ou nome de
colaborador. Borre antes de publicar — o site é público. Detalhes e o que já foi tratado
em vídeos anteriores estão em [`docs/ASSETS.md`](docs/ASSETS.md).

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/ViniCampos29/portfolio.git
git push -u origin main
```

No repositório: **Settings → Pages → Source: `main` / root**.
O site sobe em `https://vinicampos29.github.io/portfolio/`.
