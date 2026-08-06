/* ═══════════════════════════════════════════════════════════
   naguib.sys — portfolio runtime
   No framework, no build step. Everything below is progressive
   enhancement: the page is complete and readable without it.
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── theme ─────────────────────────────────────────────── */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  else if (matchMedia('(prefers-color-scheme: light)').matches) root.dataset.theme = 'light';

  const setTheme = t => {
    root.dataset.theme = t;
    localStorage.setItem('theme', t);
    $('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f7f5f0' : '#08090d');
  };
  $('#themeToggle')?.addEventListener('click', () =>
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));

  /* ── boot sequence ─────────────────────────────────────── */
  const boot = $('#boot'), bootLog = $('#bootLog'), bootBar = $('#bootBar');
  const bootLines = [
    'init  naguib.sys',
    'load  profile ................ <span class="ok">ok</span>',
    'conn  postgres:5432 .......... <span class="ok">ok</span>',
    'conn  redis:6379 ............. <span class="ok">ok</span>',
    'mount /projects (10) ......... <span class="ok">ok</span>',
    'serve <span class="ok">ready</span>'
  ];

  function runBoot() {
    if (!boot) return;
    if (reduced || sessionStorage.getItem('booted')) { boot.remove(); return; }
    sessionStorage.setItem('booted', '1');
    document.body.classList.add('is-locked');

    let i = 0;
    const tick = () => {
      if (i < bootLines.length) {
        bootLog.innerHTML += (i ? '\n' : '') + bootLines[i];
        bootBar.style.width = `${((i + 1) / bootLines.length) * 100}%`;
        i++;
        setTimeout(tick, 105);
      } else {
        setTimeout(() => {
          boot.classList.add('done');
          document.body.classList.remove('is-locked');
          setTimeout(() => boot.remove(), 600);
        }, 220);
      }
    };
    tick();
  }
  runBoot();

  /* ── nav ───────────────────────────────────────────────── */
  const nav = $('#nav');
  const onScroll = () => {
    nav.classList.toggle('stuck', scrollY > 20);
    const h = document.documentElement.scrollHeight - innerHeight;
    $('#progress').style.width = `${h > 0 ? (scrollY / h) * 100 : 0}%`;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('#burger')?.addEventListener('click', e => {
    const open = nav.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });
  $$('.nav__links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  // active-section highlighting
  const navLinks = $$('.nav__links a');
  const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ── reveal on scroll ──────────────────────────────────── */
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      obs.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach(el => revealer.observe(el));

  /* ── animated counters ─────────────────────────────────── */
  const counters = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      obs.unobserve(el);
      const to = +el.dataset.to, suffix = el.dataset.suffix || '';
      if (reduced) { el.textContent = to.toLocaleString() + suffix; return; }
      const dur = 1300, t0 = performance.now();
      const step = now => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased).toLocaleString() + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  $$('.count').forEach(el => counters.observe(el));

  /* ── hero role rotator ─────────────────────────────────── */
  const rotator = $('#rotator');
  const phrases = [
    'APIs that survive real traffic.',
    'normalised schemas, not JSON blobs.',
    'queues that absorb the burst.',
    'access control you can prove.',
    'allocators, in C, for fun.'
  ];
  if (rotator) {
    if (reduced) {
      rotator.textContent = phrases[0];
    } else {
      let pi = 0, ci = 0, deleting = false;
      const type = () => {
        const word = phrases[pi];
        ci += deleting ? -1 : 1;
        rotator.textContent = word.slice(0, ci);
        let wait = deleting ? 26 : 52;
        if (!deleting && ci === word.length) { wait = 2000; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; wait = 320; }
        setTimeout(type, wait);
      };
      setTimeout(type, 700);
    }
  }

  /* ── Cairo clock ───────────────────────────────────────── */
  const clock = $('#localTime');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false
    });
    const tickClock = () => { clock.textContent = `${fmt.format(new Date())} EET`; };
    tickClock();
    setInterval(tickClock, 20000);
  }
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── cursor spotlight ──────────────────────────────────── */
  const spot = $('#spotlight');
  if (spot && !reduced && matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', e => {
      spot.style.setProperty('--mx', `${e.clientX}px`);
      spot.style.setProperty('--my', `${e.clientY}px`);
    }, { passive: true });
  }

  // per-card glow follows the pointer
  $$('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--cx', `${e.clientX - r.left}px`);
      card.style.setProperty('--cy', `${e.clientY - r.top}px`);
    });
  });

  /* ── project filters ───────────────────────────────────── */
  const cards = $$('#cards .card');
  $$('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.f;
      $$('.filter').forEach(b => {
        const on = b === btn;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-selected', String(on));
      });
      cards.forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f));
    });
  });

  /* ── case study toggle ─────────────────────────────────── */
  const stage = $('#caseStage');
  $$('.case__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const arch = btn.dataset.arch;
      $$('.case__btn').forEach(b => b.classList.toggle('is-on', b === btn));
      stage.dataset.arch = arch;
      $$('.ro__v', stage).forEach(v => { v.textContent = v.dataset[arch]; });
    });
  });

  /* ── live GitHub enrichment ────────────────────────────── */
  const GH_USER = 'AhmedNaguib01';
  const SHORT_LANG = { 'Jupyter Notebook': 'Jupyter', 'JavaScript': 'JS', 'TypeScript': 'TS' };
  const relative = iso => {
    const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
    if (days < 1) return 'today';
    if (days < 30) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  (async () => {
    try {
      const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`);
      if (!res.ok) return;                       // rate-limited or offline — static copy stands
      const repos = await res.json();
      if (!Array.isArray(repos)) return;

      const byName = new Map(repos.map(r => [r.name, r]));

      // headline repo count
      const countEl = $('#repoCount');
      if (countEl) { countEl.dataset.to = repos.length; }
      const meta = $('#repoMeta');
      const newest = repos.reduce((a, b) => (new Date(a.pushed_at) > new Date(b.pushed_at) ? a : b), repos[0]);
      if (meta && newest) meta.textContent = `last push ${relative(newest.pushed_at)} · ${newest.name}`;

      // per-card badges
      $$('#cards .card[data-repo]').forEach(card => {
        const repo = byName.get(card.dataset.repo);
        const slot = $('[data-gh]', card);
        if (!repo || !slot) return;
        const bits = [];
        if (repo.stargazers_count) {
          bits.push(`<span><svg class="ico"><use href="#i-star"/></svg>${repo.stargazers_count}</span>`);
        }
        if (repo.language) bits.push(`<span>${SHORT_LANG[repo.language] || repo.language}</span>`);
        bits.push(`<span>${relative(repo.pushed_at)}</span>`);
        slot.innerHTML = bits.join('');
      });
    } catch { /* offline — nothing to do */ }
  })();

  /* ── command palette ───────────────────────────────────── */
  const palette = $('#palette');
  const pInput  = $('#paletteInput');
  const pList   = $('#paletteList');

  const commands = [
    { g: 'go',      t: 'Home',                      d: 'top',      a: () => jump('#top') },
    { g: 'go',      t: 'About',                     d: '01',       a: () => jump('#about') },
    { g: 'go',      t: 'Experience',                d: '02',       a: () => jump('#work') },
    { g: 'go',      t: 'Projects',                  d: '03',       a: () => jump('#projects') },
    { g: 'go',      t: 'Stack & education',         d: '04',       a: () => jump('#stack') },
    { g: 'go',      t: 'Contact',                   d: '05',       a: () => jump('#contact') },

    { g: 'open',    t: 'Eduvance — my platform',    d: 'eduvance.au', a: () => open_('https://www.eduvance.au/') },
    { g: 'open',    t: 'Inventory Command',         d: 'live',     a: () => open_('https://sales-and-inventory-management-syst-six.vercel.app') },
    { g: 'open',    t: 'Reddit Replica',            d: 'live',     a: () => open_('https://reddit-replica-asu.vercel.app/') },
    { g: 'open',    t: 'EduVerse',                  d: 'live',     a: () => open_('https://edu-verse-frontend-chi.vercel.app') },
    { g: 'open',    t: 'Air-Gym demo video',        d: 'youtube',  a: () => open_('https://youtu.be/diQB5B5d1SY') },
    { g: 'open',    t: 'Social Sphere',             d: 'repo',     a: () => open_('https://github.com/AhmedNaguib01/Social-Sphere') },
    { g: 'open',    t: 'MNIST From Scratch',        d: 'repo',     a: () => open_('https://github.com/AhmedNaguib01/Machine-Learning-MNIST') },
    { g: 'open',    t: 'Jigsaw Puzzle Solver',      d: 'repo',     a: () => open_('https://github.com/AhmedNaguib01/Jigsaw_Puzzle_Solver') },
    { g: 'open',    t: 'TINY Language Compiler',    d: 'repo',     a: () => open_('https://github.com/AhmedNaguib01/Tiny-Language-Compiler') },

    { g: 'contact', t: 'Email Ahmed',               d: 'gmail',    a: () => open_('mailto:amnoe20052007@gmail.com', true) },
    { g: 'contact', t: 'WhatsApp',                  d: '+20 106…', a: () => open_('https://wa.me/201062796067') },
    { g: 'contact', t: 'LinkedIn',                  d: 'profile',  a: () => open_('https://www.linkedin.com/in/ahmed-naguib-075415328/') },
    { g: 'contact', t: 'GitHub',                    d: 'profile',  a: () => open_('https://github.com/AhmedNaguib01') },

    { g: 'action',  t: 'Toggle light / dark theme', d: 'theme',    a: () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light') },
    { g: 'action',  t: 'Copy email address',        d: 'clipboard', a: () => navigator.clipboard?.writeText('amnoe20052007@gmail.com') }
  ];

  const jump  = hash => { $(hash)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); };
  const open_ = (url, same) => { same ? (location.href = url) : window.open(url, '_blank', 'noopener'); };

  let filtered = commands, cursor = 0;

  const render = () => {
    if (!filtered.length) {
      pList.innerHTML = '<li class="empty">no matches</li>';
      return;
    }
    pList.innerHTML = filtered.map((c, i) =>
      `<li role="option" data-i="${i}" class="${i === cursor ? 'on' : ''}" aria-selected="${i === cursor}">
         <span class="pi">${c.g}</span><span>${c.t}</span><span class="pd">${c.d}</span>
       </li>`).join('');
  };

  const search = q => {
    const n = q.trim().toLowerCase();
    filtered = n ? commands.filter(c => (c.t + ' ' + c.g + ' ' + c.d).toLowerCase().includes(n)) : commands;
    cursor = 0;
    render();
  };

  const openPalette = () => {
    palette.hidden = false;
    document.body.classList.add('is-locked');
    pInput.value = '';
    search('');
    pInput.focus();
  };
  const closePalette = () => {
    palette.hidden = true;
    document.body.classList.remove('is-locked');
  };
  const runCursor = () => {
    const cmd = filtered[cursor];
    if (!cmd) return;
    closePalette();
    cmd.a();
  };

  $('#paletteOpen')?.addEventListener('click', openPalette);
  $('#paletteOpen2')?.addEventListener('click', openPalette);
  $('[data-close]', palette)?.addEventListener('click', closePalette);
  pInput?.addEventListener('input', e => search(e.target.value));

  pList?.addEventListener('click', e => {
    const li = e.target.closest('li[data-i]');
    if (!li) return;
    cursor = +li.dataset.i;
    runCursor();
  });
  pList?.addEventListener('pointermove', e => {
    const li = e.target.closest('li[data-i]');
    if (!li || +li.dataset.i === cursor) return;
    cursor = +li.dataset.i;
    render();
  });

  addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.hidden ? openPalette() : closePalette(); return; }
    if (palette.hidden) {
      if (e.key === '/' && !/input|textarea/i.test(e.target.tagName)) { e.preventDefault(); openPalette(); }
      return;
    }
    if (e.key === 'Escape')    { e.preventDefault(); closePalette(); }
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); cursor = (cursor + 1) % filtered.length; render(); scrollCursor(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); cursor = (cursor - 1 + filtered.length) % filtered.length; render(); scrollCursor(); }
    if (e.key === 'Enter')     { e.preventDefault(); runCursor(); }
  });
  const scrollCursor = () => $('.on', pList)?.scrollIntoView({ block: 'nearest' });

  /* ── hero topology canvas ──────────────────────────────
     A small service graph: nodes wander slightly, edges
     connect them, and packets travel edge to edge — the same
     shape as the systems described further down the page.
     ───────────────────────────────────────────────────── */
  const cv = $('#topology');
  if (cv && !reduced) {
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, dpr = 1, nodes = [], edges = [], packets = [], raf = 0, visible = true;

    const palette3 = () => {
      const s = getComputedStyle(root);
      return {
        line: s.getPropertyValue('--line-2').trim() || '#2a3143',
        a:    s.getPropertyValue('--mint').trim()   || '#5ee9b5',
        b:    s.getPropertyValue('--blue').trim()   || '#7aa2ff',
        c:    s.getPropertyValue('--amber').trim()  || '#ff9d5c'
      };
    };
    let colors = palette3();

    const build = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // layered layout: clients → edge → services → data
      const cols = 5;
      const count = w < 700 ? 14 : 22;
      nodes = Array.from({ length: count }, (_, i) => {
        const col = i % cols;
        return {
          x: (w / (cols + 1)) * (col + 1) + (Math.random() - .5) * w * 0.07,
          y: Math.random() * h,
          vx: (Math.random() - .5) * 0.16,
          vy: (Math.random() - .5) * 0.16,
          r: 1.6 + Math.random() * 1.8,
          col
        };
      });

      // connect nodes to nodes in the next column
      edges = [];
      nodes.forEach((n, i) => {
        const next = nodes.filter(m => m.col === n.col + 1);
        if (!next.length) return;
        next.sort((a, b) => Math.abs(a.y - n.y) - Math.abs(b.y - n.y))
            .slice(0, 2)
            .forEach(m => edges.push([i, nodes.indexOf(m)]));
      });

      packets = Array.from({ length: Math.min(edges.length, 16) }, () => spawn());
    };

    const spawn = () => ({
      e: (Math.random() * edges.length) | 0,
      t: Math.random(),
      sp: 0.0022 + Math.random() * 0.0042,
      col: [colors.a, colors.a, colors.b, colors.c][(Math.random() * 4) | 0]
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // edges
      ctx.strokeStyle = colors.a;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.14;
      ctx.beginPath();
      edges.forEach(([a, b]) => {
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
      });
      ctx.stroke();

      // nodes
      ctx.globalAlpha = 0.38;
      ctx.fillStyle = colors.a;
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // packets
      ctx.globalAlpha = 1;
      packets.forEach(p => {
        const e = edges[p.e];
        if (!e) { Object.assign(p, spawn()); return; }
        const [a, b] = e;
        p.t += p.sp;
        if (p.t > 1) { Object.assign(p, spawn()); p.t = 0; }
        const x = nodes[a].x + (nodes[b].x - nodes[a].x) * p.t;
        const y = nodes[a].y + (nodes[b].y - nodes[a].y) * p.t;
        const fade = Math.sin(p.t * Math.PI);

        ctx.globalAlpha = fade;
        ctx.fillStyle = p.col;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.col;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const stop  = () => { cancelAnimationFrame(raf); raf = 0; };

    build();
    start();

    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 180); });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

    // pause once the hero has scrolled away
    new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      visible ? start() : stop();
    }, { threshold: 0 }).observe(cv);

    // re-read colours when the theme flips
    new MutationObserver(() => { colors = palette3(); packets.forEach(p => Object.assign(p, spawn())); })
      .observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  }
})();
