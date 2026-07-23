/* ===========================
   Sloth Studio — Retro Scripts
   =========================== */

// ── Retro starfield ──────────────────────────────────
(function starfield() {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');

  let stars = [];
  const STAR_COUNT = 100;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.floor(Math.random() * 3) + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.2,
        color: Math.random() < 0.15 ? '#ff2d95' : Math.random() < 0.3 ? '#0ff' : '#ffffff',
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
      s.y += s.speed;
      if (s.y > canvas.height + 5) {
        s.y = -5;
        s.x = Math.random() * canvas.width;
      }

      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.opacity;

      // Draw square "pixel" stars
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });
})();

// ── Mobile nav toggle ────────────────────────────────
(function nav() {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// ── Reveal on scroll ──────────────────────────────────
(function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.blankslate, .value-chip, .about__text p').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
})();
