/* Portfólio — comportamento.
   1. entrada ao rolar   2. nav + índice lateral   3. detecção de mídia
   4. lightbox           5. terminal interativo    6. componentes menores
   7. grade animada do hero   8. vídeo controlado pelo scroll */

(() => {
  'use strict';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Entrada ao rolar ──────────────────────────────
     Escalonada por grupo: irmãos que revelam juntos entram em
     cascata curta, em vez de todos de uma vez. */
  const reveals = document.querySelectorAll('.reveal');

  if (reduced) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    reveals.forEach(el => {
      const irmaos = [...el.parentElement.children].filter(n => n.classList.contains('reveal'));
      const i = irmaos.indexOf(el);
      if (i > 0) el.style.setProperty('--d', `${Math.min(i * 70, 280)}ms`);
    });

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);          // revela uma vez só
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  }

  /* ── 2. Link ativo na nav, e borda da nav ─────────────── */
  const alvos = new Map();   // seção -> [links que apontam para ela]
  document.querySelectorAll('.nav-links a').forEach(a => {
    const sec = document.querySelector(a.getAttribute('href'));
    if (!sec) return;
    if (!alvos.has(sec)) alvos.set(sec, []);
    alvos.get(sec).push(a);
  });

  const todos = [...alvos.values()].flat();
  const navIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      todos.forEach(a => a.classList.remove('active'));
      alvos.get(e.target)?.forEach(a => a.classList.add('active'));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  alvos.forEach((_, sec) => navIo.observe(sec));

  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('stuck', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 3. Mídia só aparece quando carrega de verdade ────
     Enquanto o arquivo não existe, o <img>/<video> fica escondido e o
     placeholder do HTML continua à mostra — nunca um ícone quebrado.
     Vale para os prints, os vídeos e a foto do hero. */
  const marcarSeCarregar = (el) => {
    const ok = () => el.classList.add('ok');
    if (el.tagName === 'VIDEO') {
      if (el.readyState >= 1 && el.videoWidth > 0) ok();
      else el.addEventListener('loadedmetadata', ok, { once: true });
    } else {
      if (el.complete && el.naturalWidth > 0) ok();
      else el.addEventListener('load', ok, { once: true });
    }
  };
  document.querySelectorAll('.shot img, .shot video, .hero-foto img')
          .forEach(marcarSeCarregar);

  /* ── 4. Lightbox com <dialog> nativo ──────────────────
     O <dialog> já entrega Esc, backdrop e foco preso de graça.
     Só abre para mídia que existe — placeholder não amplia nada. */
  const lb    = document.getElementById('lb');
  const lbImg = document.getElementById('lb-img');
  const lbVid = document.getElementById('lb-video');
  const lbCap = document.getElementById('lb-cap');
  const retomarPrevias = [];   // preenchido no bloco 4b — ver o MutationObserver abaixo

  document.querySelectorAll('.shot').forEach(btn => {
    btn.addEventListener('click', () => {
      const midia = btn.querySelector('img, video');
      if (!midia || !midia.classList.contains('ok')) return;  // ainda sem arquivo

      const ehVideo = !!btn.dataset.video;
      lbImg.hidden = ehVideo;
      lbVid.hidden = !ehVideo;

      if (ehVideo) {
        lbVid.src = btn.dataset.video;
        lbVid.play().catch(() => {});   // autoplay bloqueado é aceitável
      } else {
        lbImg.src = btn.dataset.src;
        lbImg.alt = midia.alt;
      }
      lbCap.textContent = btn.dataset.cap || '';
      lb.showModal();
    });
  });

  /* ── 4b. Prévia ao aparecer na tela ───────────────────
     Cada miniatura de vídeo toca sozinha, muda e em loop assim que
     entra na tela — sem precisar de clique nem hover — e pausa ao
     sair (não gasta CPU/bateria tocando o que não está visível).

     Isto roda mesmo com 'prefers-reduced-motion'. É uma exceção
     deliberada, mesma família das outras animações controladas por
     scroll do site: rolar até o vídeo aparecer é gesto do visitante,
     não movimento ambiente disparado sozinho — e o vídeo é mudo e
     para assim que sai de vista. */
  document.querySelectorAll('.shot-vid').forEach(btn => {
    const v = btn.querySelector('video');
    if (!v) return;
    v.loop = true;

    let visivel = false;

    const tocar = () => {
      if (!v.classList.contains('ok')) return;   // ainda sem arquivo
      if (lb.open) return;                       // o lightbox está por cima
      btn.classList.add('tocando');
      v.play().catch(() => btn.classList.remove('tocando'));
    };
    const parar = () => {
      btn.classList.remove('tocando');
      v.pause();
      v.currentTime = 0;                         // volta para a capa
    };

    // O arquivo pode ainda não ter carregado quando o vídeo já está
    // visível — tenta de novo assim que a classe 'ok' chegar (bloco 3).
    v.addEventListener('loadedmetadata', () => { if (visivel) tocar(); });

    new IntersectionObserver(entries => {
      visivel = entries[0].isIntersecting;
      visivel ? tocar() : parar();
    }, { threshold: .35 }).observe(btn);

    // Chamado pelo MutationObserver do lightbox (acima) ao fechar: retoma
    // só quem continua visível por trás do modal.
    retomarPrevias.push(() => { if (visivel) tocar(); });
  });

  document.getElementById('lb-close').addEventListener('click', () => lb.close());

  // clicar no backdrop fecha (o alvo é o próprio dialog, não o conteúdo)
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });

  // Fechar precisa parar o vídeo, senão o áudio continua tocando por trás.
  // Observar o atributo 'open' cobre os três caminhos de fechamento (botão,
  // backdrop e Esc) sem depender do evento 'close', que nem todo ambiente
  // dispara de forma confiável.
  new MutationObserver(() => {
    if (lb.open) {
      // as prévias tocando sozinhas (bloco 4b) ficam por baixo do modal —
      // para todas, senão o áudio (mudo, mas ainda assim) e o processamento
      // continuam atrás dele
      document.querySelectorAll('.shot-vid').forEach(b => {
        b.classList.remove('tocando');
        b.querySelector('video')?.pause();
      });
      return;
    }
    if (lbVid.getAttribute('src')) {
      lbVid.pause();
      lbVid.removeAttribute('src');
      lbVid.load();                // solta o buffer que já foi baixado
    }
    // volta a tocar as prévias que continuam visíveis por trás do modal
    retomarPrevias.forEach(fn => fn());
  }).observe(lb, { attributes: true, attributeFilter: ['open'] });

  /* ── 5. Terminal interativo ───────────────────────────
     A saída inicial de `whoami` está escrita no HTML: sem JavaScript o
     visitante ainda vê os números. Daqui para baixo é só o que o
     JavaScript acrescenta — digitar novos comandos. */
  const term = document.querySelector('[data-term]');
  if (term) {
    const log   = term.querySelector('[data-term-log]');
    const form  = term.querySelector('[data-term-form]');
    const input = form.querySelector('.term-in');
    const PROMPT = 'vinicius@dev:~/portfolio$';

    // Cada resposta é uma string fixa deste arquivo — nada do que o
    // visitante digita entra como HTML (o eco usa nó de texto).
    const CMDS = {
      ajuda: {
        desc: 'lista os comandos',
        run: () => `<p>Comandos disponíveis:</p>
          <ul class="term-kv term-kv-wide">
            ${Object.entries(CMDS).map(([n, c]) => `<li><b>${n}</b> ${c.desc}</li>`).join('')}
          </ul>
          <p class="term-dim">Dica: <kbd class="kbd">Tab</kbd> completa o comando, <kbd class="kbd">↑</kbd> e
          <kbd class="kbd">↓</kbd> repetem os anteriores.</p>`
      },
      whoami: {
        desc: 'quem eu sou',
        run: () => `<p>Analista de Dados &amp; Automação <span class="term-dim">@ Wida Embalagens · Curitiba, PR</span></p>
          <ul class="term-kv">
            <li><b>7</b> módulos em produção</li>
            <li><b>4</b> painéis TV autônomos</li>
            <li><b>~5h</b> semanais automatizadas</li>
            <li><b>1</b> responsável de TI na planta</li>
          </ul>`
      },
      projetos: {
        desc: 'os sistemas',
        run: () => `<ul class="term-kv">
            <li><b>01</b> Sistema Integrado Wida <span class="term-dim">— BI industrial, em produção</span></li>
            <li><b>02</b> VCWB Bikes Pro <span class="term-dim">— gestão de oficina, concluído</span></li>
            <li><b>03</b> LifeManager <span class="term-dim">— finanças offline-first, em desenvolvimento</span></li>
            <li><b>04</b> Sites institucionais <span class="term-dim">— dois entregues</span></li>
          </ul>
          <p><a href="#projetos">abrir a seção de projetos</a></p>`
      },
      stack: {
        desc: 'o que eu uso',
        run: () => `<ul class="term-kv">
            <li><b>dados</b> Oracle SQL · Power BI · DAX · Pandas · Plotly</li>
            <li><b>dev</b> Python · Streamlit · HTML/CSS/JS · REST</li>
            <li><b>auto</b> n8n · Docker · LLM · RPA</li>
            <li><b>infra</b> Linux · Nginx · systemd · WireGuard · Git</li>
          </ul>
          <p><a href="#stack">abrir a seção de stack</a></p>`
      },
      sobre: {
        desc: 'minha trajetória',
        run: () => `<p>Vim do administrativo — Electrolux, depois suprimentos — e migrei para
            tecnologia. Hoje sou o time de TI inteiro de uma indústria de embalagens:
            levanto o requisito na máquina, modelo a query, escrevo o Python, subo o
            servidor e penduro a TV na parede.</p>
          <p><a href="#sobre">abrir a seção sobre</a> · <a href="#trajetoria">ver a trajetória completa</a></p>`
      },
      contato: {
        desc: 'falar comigo',
        run: () => `<ul class="term-kv">
            <li><b>mail</b> <a href="mailto:vinicampos29@gmail.com">vinicampos29@gmail.com</a></li>
            <li><b>zap</b> <a href="https://wa.me/5541987334348" target="_blank" rel="noopener">(41) 98733-4348</a></li>
            <li><b>in</b> <a href="https://www.linkedin.com/in/vinicius-de-oliveira-de-campos-347213236/" target="_blank" rel="noopener">/vinicius-de-oliveira-de-campos</a></li>
            <li><b>git</b> <a href="https://github.com/ViniCampos29" target="_blank" rel="noopener">@ViniCampos29</a></li>
          </ul>`
      },
      cv: {
        desc: 'baixar o currículo',
        run: () => {
          const a = document.createElement('a');
          a.href = 'assets/curriculo-vinicius-de-campos.pdf';
          a.download = '';
          a.click();
          return `<p>Baixando <code>curriculo-vinicius-de-campos.pdf</code>…</p>
            <p class="term-dim">Se o navegador bloquear, use o botão “Baixar currículo” no topo.</p>`;
        }
      },
      limpar: { desc: 'limpa a tela', run: () => null }
    };

    const ALIASES = { help: 'ajuda', clear: 'limpar', cls: 'limpar', ls: 'projetos',
                      curriculo: 'cv', 'currículo': 'cv', contatos: 'contato', quem: 'whoami' };

    const eco = (texto) => {
      const p = document.createElement('p');
      p.className = 'term-cmd term-new';
      const s = document.createElement('span');
      s.className = 'term-prompt';
      s.textContent = PROMPT;
      // nó de texto: o que o visitante digitou nunca é interpretado como HTML
      p.append(s, ' ' + texto);
      log.append(p);
    };

    const saida = (html) => {
      const d = document.createElement('div');
      d.className = 'term-out term-new';
      d.innerHTML = html;
      log.append(d);
    };

    const historico = [];
    let hPos = -1;

    const executar = (bruto) => {
      const texto = bruto.trim();
      if (!texto) { eco(''); return; }

      eco(texto);
      historico.push(texto);
      hPos = historico.length;

      const nome = texto.split(/\s+/)[0].toLowerCase();
      const chave = ALIASES[nome] || nome;
      const cmd = CMDS[chave];

      if (!cmd) {
        saida(`<p class="term-err">comando não encontrado: ${nome.replace(/[<>&]/g, '')}</p>
               <p class="term-dim">Digite <code>ajuda</code> para ver os comandos disponíveis.</p>`);
        return;
      }
      if (chave === 'limpar') { log.replaceChildren(); return; }
      saida(cmd.run());
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      executar(input.value);
      input.value = '';
      log.scrollTop = log.scrollHeight;
    });

    input.addEventListener('keydown', (e) => {
      // histórico
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        if (!historico.length) return;
        e.preventDefault();
        hPos += e.key === 'ArrowUp' ? -1 : 1;
        hPos = Math.max(0, Math.min(hPos, historico.length));
        input.value = historico[hPos] ?? '';
        return;
      }
      // Tab completa — mas só quando há prefixo e um único candidato,
      // senão o Tab continua servindo para sair do campo.
      if (e.key === 'Tab' && input.value.trim()) {
        const pre = input.value.trim().toLowerCase();
        const hits = Object.keys(CMDS).filter(n => n.startsWith(pre));
        if (hits.length === 1) { e.preventDefault(); input.value = hits[0]; }
      }
    });

    // clicar na área do terminal devolve o foco ao campo, como num
    // emulador de verdade — sem roubar o clique de links e botões
    term.querySelector('.term-body').addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      if (getSelection().toString()) return;   // não atrapalha copiar texto
      input.focus();
    });
  }

  /* ── 5b. Copiar link da seção (ref. chanhdai's PanelTitleCopy) ──
     Copia a URL com a âncora da seção. Se a Clipboard API não estiver
     disponível (contexto não seguro, navegador antigo), navega para a
     âncora em vez de falhar em silêncio. */
  document.querySelectorAll('[data-copy-link]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const hash = btn.dataset.copyLink;
      const url = location.origin + location.pathname + hash;
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        location.hash = hash;
        return;
      }
      btn.classList.add('copiado');
      const rotulo = btn.getAttribute('aria-label');
      btn.setAttribute('aria-label', 'Link copiado');
      clearTimeout(btn._copiadoTimer);
      btn._copiadoTimer = setTimeout(() => {
        btn.classList.remove('copiado');
        btn.setAttribute('aria-label', rotulo);
      }, 1600);
    });
  });

  /* ── 5c. Copiar e-mail ao clicar em qualquer link mailto: ──
     Em vez de abrir o cliente de e-mail, copia o endereço e avisa
     com um toast. */
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.addEventListener('click', async (e) => {
      const email = a.href.replace(/^mailto:/, '').split('?')[0];
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        return; // sem Clipboard API: deixa o link abrir o cliente normalmente
      }
      e.preventDefault();
      mostrarToast('E-mail copiado!');
    });
  });

  let toastTimer;
  function mostrarToast(texto) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = texto;
    toast.classList.add('mostrar');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('mostrar'), 1800);
  }

  /* ── 6. Componentes menores (ver docs/REFERENCIAS.md) ── */

  // Alternância de tema. O <head> já aplicou o tema salvo antes da
  // primeira pintura (evita flash); aqui só o clique e a gravação.
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const claro = document.documentElement.getAttribute('data-theme') === 'light';
      if (claro) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('tema', 'dark');
        if (metaTheme) metaTheme.content = '#0B0E14';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('tema', 'light');
        if (metaTheme) metaTheme.content = '#F4F6F9';
      }
    });
  }

  // FlipSentences (chanhdai): uma frase por vez, troca a cada 3s.
  const flip = document.querySelector('[data-flip]');
  if (flip) {
    const items = [...flip.children];
    let cur = 0;
    items[0].classList.add('on');
    if (!reduced && items.length > 1) {
      setInterval(() => {
        items[cur].classList.replace('on', 'off');
        const prev = cur;
        cur = (cur + 1) % items.length;
        items[cur].classList.add('on');
        setTimeout(() => items[prev].classList.remove('off'), 500);
      }, 3000);
    }
  }

  // CurrentLocalTime (chanhdai): relógio de Curitiba, atualiza por minuto.
  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('pt-BR', { timeZone: clock.dataset.clock, hour: '2-digit', minute: '2-digit' });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }

  /* ── 7. Grade animada do hero ──────────────────────────
     Grade de quadrados que desliza devagar e acende sob o cursor — a
     versão ao vivo do papel quadriculado/blueprint que o resto do site
     já sugere com .screen-line e .stripe-divider. Adaptado de um
     componente React (ShapeGrid) trazido pelo Vinícius; ver
     docs/REFERENCIAS.md para o que foi simplificado e por quê.

     Só quadrados — o original também desenhava hexágono, triângulo e
     círculo, mas só o quadrado bate com a identidade "papel técnico"
     do site, e os outros três nunca seriam usados aqui.

     Exceção deliberada a prefers-reduced-motion, igual à prévia de
     vídeo no hover (bloco 4b): a grade sempre desliza e reage ao
     cursor, mesmo com a preferência ligada. Duas versões anteriores já
     tentaram respeitar a preferência à risca — primeiro escondendo o
     `<canvas>` inteiro, depois deixando a textura parada — e as duas
     minaram o pedido original do Vinícius de ter uma grade animada.
     No Windows 10 dele a opção "Mostrar animações" reverte sozinha
     (Economia de Energia, provavelmente) e não fica desligada tempo
     suficiente para testar; travar a decisão nessa preferência tornou
     o recurso inutilizável na prática. Ver docs/DESIGN.md para o
     raciocínio completo e a ressalva de acessibilidade que isso abre. */
  const heroGrid = document.querySelector('[data-hero-grid]');
  if (heroGrid) {
    const ctx = heroGrid.getContext('2d');
    const SIZE = 46;     // px por célula
    const SPEED = .35;   // px por quadro — bem devagar, é textura, não protagonista
    const TRAIL = 5;     // células de rastro atrás do cursor

    let w = 0, h = 0, offset = 0;
    let borderColor = '#000', fillColor = 'transparent';
    const hovered = { x: null, y: null };
    const trail = [];
    const opacities = new Map();

    // Cores vêm dos tokens do site, não de valor fixo — por isso são
    // relidas a cada troca de tema em vez de fixadas uma vez.
    const lerCores = () => {
      const cs = getComputedStyle(document.documentElement);
      borderColor = cs.getPropertyValue('--line').trim();
      const accent = cs.getPropertyValue('--accent').trim();
      fillColor = `color-mix(in srgb, ${accent} 22%, transparent)`;
    };
    lerCores();

    const resize = () => {
      w = heroGrid.width = heroGrid.offsetWidth;
      h = heroGrid.height = heroGrid.offsetHeight;
    };
    resize();

    const celulaEm = (px, py) => {
      const ox = ((offset % SIZE) + SIZE) % SIZE;
      return { x: Math.floor((px - ox) / SIZE), y: Math.floor(py / SIZE) };
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, w, h);
      const ox = ((offset % SIZE) + SIZE) % SIZE;
      const cols = Math.ceil(w / SIZE) + 2;
      const rows = Math.ceil(h / SIZE) + 1;

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          const sx = c * SIZE + ox;
          const sy = r * SIZE;
          const alpha = opacities.get(c + ',' + r);
          if (alpha) {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = fillColor;
            ctx.fillRect(sx, sy, SIZE, SIZE);
            ctx.globalAlpha = 1;
          }
          ctx.strokeRect(sx + .5, sy + .5, SIZE, SIZE);
        }
      }
    };

    const atualizarOpacidades = () => {
      const alvos = new Map();
      if (hovered.x !== null) alvos.set(hovered.x + ',' + hovered.y, 1);
      trail.forEach((t, i) => {
        const key = t.x + ',' + t.y;
        if (!alvos.has(key)) alvos.set(key, (trail.length - i) / (trail.length + 1));
      });
      alvos.forEach((_, key) => { if (!opacities.has(key)) opacities.set(key, 0); });
      opacities.forEach((val, key) => {
        const alvo = alvos.get(key) || 0;
        const prox = val + (alvo - val) * .15;
        if (prox < .005) opacities.delete(key); else opacities.set(key, prox);
      });
    };

    desenhar();   // primeiro quadro, antes do loop assumir

    addEventListener('resize', resize, { passive: true });
    let raf = null;
    const quadro = () => {
      offset -= SPEED;
      atualizarOpacidades();
      desenhar();
      raf = requestAnimationFrame(quadro);
    };

    const marcarCelula = (x, y) => {
      if (hovered.x !== null && (hovered.x !== x || hovered.y !== y)) {
        trail.unshift({ x: hovered.x, y: hovered.y });
        trail.length = Math.min(trail.length, TRAIL);
      }
      hovered.x = x; hovered.y = y;
    };

    heroGrid.addEventListener('mousemove', (e) => {
      const rect = heroGrid.getBoundingClientRect();
      const cel = celulaEm(e.clientX - rect.left, e.clientY - rect.top);
      if (hovered.x !== cel.x || hovered.y !== cel.y) marcarCelula(cel.x, cel.y);
    });
    heroGrid.addEventListener('mouseleave', () => {
      if (hovered.x !== null) { trail.unshift({ x: hovered.x, y: hovered.y }); trail.length = Math.min(trail.length, TRAIL); }
      hovered.x = hovered.y = null;
    });

    // Para de rodar fora da tela ou com a aba em segundo plano — mesmo
    // cuidado que o resto do site já tem com custo de CPU/bateria.
    let visivel = false, paginaVisivel = !document.hidden;
    const tentarIniciar = () => { if (visivel && paginaVisivel && !raf) raf = requestAnimationFrame(quadro); };
    const tentarParar = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };
    new IntersectionObserver(([entry]) => {
      visivel = entry.isIntersecting;
      visivel ? tentarIniciar() : tentarParar();
    }, { threshold: 0 }).observe(heroGrid);
    document.addEventListener('visibilitychange', () => {
      paginaVisivel = !document.hidden;
      paginaVisivel ? tentarIniciar() : tentarParar();
    });

    if (themeBtn) themeBtn.addEventListener('click', lerCores);
    tentarIniciar();
  }

  /* ── 8. Animação controlada pelo scroll ─────────────────
     Ref. ScrollVideo.vue (joaofortes.dev) — ver docs/REFERENCIAS.md.
     Função genérica: procura todo `[data-scroll-video-track]` da
     página e liga o mesmo mecanismo em cada um — pensada para as
     próximas animações desse tipo, não só a de Sobre. Dois modos,
     conforme o que o HTML puser dentro da pista:
       - `<video data-scroll-video>`      → currentTime quadro a quadro.
       - `<canvas data-scroll-frames>`    → sequência de imagens com
         alfa desenhada quadro a quadro (usado quando o fundo do vídeo
         foi removido: nenhum codec de vídeo testado aqui manteve
         transparência real de forma confiável, então a "lata" de
         Sobre é uma sequência de WebP com canal alfa).

     Em nenhum dos dois modos o scroll é "sequestrado": o
     `position: sticky` do CSS já resolve prender/soltar a tela; aqui
     só se lê o progresso do scroll dentro da pista e se converte em
     quadro. Gesto do visitante, não movimento ambiente — mesma classe
     de exceção a `prefers-reduced-motion` que a prévia de vídeo no
     hover (bloco 4b) e a grade do hero (bloco 7) já têm: a animação só
     muda quando a pessoa rola, nunca sozinha. */
  const NAV_H = 64;   // mesmo valor do `top` de .scroll-video-pin no CSS
  const telaEstreita = matchMedia('(max-width: 900px)').matches;

  // Liga `aoProgresso(0..1)` ao progresso do scroll: 0 assim que a pista
  // entra na tela (borda de baixo da janela), 1 quando ela termina de
  // sair (borda de cima, já por trás da nav) — a animação inteira roda
  // enquanto o elemento está visível, não só durante o trecho "grudado"
  // pelo `position: sticky` (esse é só o efeito visual de prender a
  // tela; o progresso do desenho é sobre a pista inteira estar em tela).
  const ligarScrub = (track, aoProgresso) => {
    let ticking = false;
    const atualizar = () => {
      ticking = false;
      const rTrack = track.getBoundingClientRect();
      const percurso = innerHeight - NAV_H + rTrack.height;
      if (percurso <= 0) return;
      const progresso = Math.min(1, Math.max(0, (innerHeight - rTrack.top) / percurso));
      aoProgresso(progresso);
    };
    const aoRolar = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(atualizar);
    };
    addEventListener('scroll', aoRolar, { passive: true });
    addEventListener('resize', aoRolar, { passive: true });
    atualizar();
  };

  document.querySelectorAll('[data-scroll-video-track]').forEach(track => {
    const pin = track.querySelector('[data-scroll-video-pin]');
    const video = track.querySelector('[data-scroll-video]');
    const canvas = track.querySelector('[data-scroll-frames]');
    if (!pin || (!video && !canvas)) return;

    const cs = getComputedStyle(track);
    const frames = parseFloat(cs.getPropertyValue('--frames')) || 1;

    if (video) {
      const fps = parseFloat(cs.getPropertyValue('--fps')) || 24;
      const duracao = frames / fps;

      if (telaEstreita) {
        // Sem gutter pra prender a tela por telas inteiras num celular —
        // o vídeo toca sozinho, em loop, enquanto está visível.
        video.loop = true;
        new IntersectionObserver(entries => {
          entries[0].isIntersecting ? video.play().catch(() => {}) : video.pause();
        }, { threshold: .3 }).observe(video);
        return;
      }

      let pronto = false;
      video.addEventListener('loadedmetadata', () => { pronto = true; }, { once: true });
      ligarScrub(track, progresso => {
        if (!pronto) return;
        video.currentTime = progresso * duracao;
      });
      return;
    }

    // Modo canvas: pré-carrega a sequência de quadros (WebP com alfa)
    // e desenha o quadro correspondente ao progresso do scroll.
    const src = canvas.dataset.frameSrc;
    const ctx = canvas.getContext('2d');
    const imgs = new Array(frames);

    const desenhar = i => {
      const img = imgs[i];
      if (!img || !img.complete || !img.naturalWidth) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      const pw = Math.round(w * dpr), ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, w, h);
      const escala = Math.min(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * escala, dh = img.naturalHeight * escala;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    /* Os quadros só começam a baixar quando a seção se aproxima da tela.
       São 117 a 240 arquivos por sequência — 597 no total, 12,4 MB somando as
       três. Baixar tudo no load da página (como era antes) empurrava esse peso
       inteiro pra frente do primeiro carregamento, mesmo pra quem nunca rolasse
       até lá, e no celular isso é a diferença entre a página abrir e a página
       engasgar. O `rootMargin` de 150% dá uma tela e meia de antecedência.

       Se alguém rolar rápido demais e chegar antes dos quadros, `desenhar()`
       simplesmente não pinta (a guarda no topo dela cobre `imgs[i]` indefinido)
       e o canvas fica vazio por um instante — degrada em silêncio, não quebra. */
    const carregarQuadros = () => {
      for (let i = 0; i < frames; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = src.replace('%03d', String(i + 1).padStart(3, '0'));
        if (i === 0) img.addEventListener('load', () => desenhar(0), { once: true });
        imgs[i] = img;
      }
    };

    new IntersectionObserver((entradas, obs) => {
      if (!entradas[0].isIntersecting) return;
      obs.disconnect();          // uma vez só: depois de baixado, não recarrega
      carregarQuadros();
    }, { rootMargin: '150% 0px' }).observe(track);

    if (telaEstreita) {
      // Sem gutter pra prender a tela por telas inteiras num celular —
      // gira sozinha, em loop, enquanto está visível.
      let i = 0, timer = null;
      const passo = () => { desenhar(i); i = (i + 1) % frames; };
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (!timer) timer = setInterval(passo, 1000 / 24);
        } else if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }, { threshold: .3 }).observe(canvas);
      return;
    }

    ligarScrub(track, progresso => {
      desenhar(Math.min(frames - 1, Math.round(progresso * (frames - 1))));
    });
  });
})();
