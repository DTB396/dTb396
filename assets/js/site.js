(() => {
  // Mobile nav logic (existing)
  const btn = document.querySelector('.navbtn');
  const drawer = document.querySelector('.navdrawer');
  if (btn && drawer) {
    const open = () => {
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add('is-open'));
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('nav-open');
    };
    const close = () => {
      drawer.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-open');
      setTimeout(() => (drawer.hidden = true), 160);
    };
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      expanded ? close() : open();
    });
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // Smooth header scroll effect
  const header = document.querySelector('.header');
  if (!header) return;
  let lastScrollY = window.scrollY;
  let ticking = false;
  function onScroll() {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 80) {
      header.classList.add('header--hide');
    } else {
      header.classList.remove('header--hide');
    }
    lastScrollY = currentY;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
})();

(() => {
  const markLoaded = () => document.body.classList.add('is-loaded');
  if (document.readyState === 'complete') {
    markLoaded();
  } else {
    window.addEventListener('load', markLoaded);
  }

  const tiles = document.querySelectorAll('[data-tile]');
  tiles.forEach((tile) => {
    tile.addEventListener('mouseenter', () => tile.classList.add('is-animated'));
    tile.addEventListener('mouseleave', () => tile.classList.remove('is-animated'));
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogGrid = document.querySelector('[data-blog-grid]');
  if (filterButtons.length && blogGrid) {
    const tiles = Array.from(blogGrid.querySelectorAll('.tile'));
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;
        tiles.forEach((tile) => {
          const tags = (tile.dataset.tags || '').split(',').map((t) => t.trim());
          const match = filter === 'all' || tags.includes(filter);
          tile.style.display = match ? '' : 'none';
        });
      });
    });
  }

  const tileBuilder = document.getElementById('tile-builder');
  if (tileBuilder && window.Sortable) {
    new Sortable(tileBuilder, {
      animation: 150,
      ghostClass: 'sortable-ghost',
    });
  }
})();
window.addEventListener("scroll", () => {
  const socialShare = document.querySelector(".social-share");
  if (window.scrollY > 500) {
    socialShare.classList.add("show");
  } else {
    socialShare.classList.remove("show");
  }
});
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.classList.add('visible');
    }
  });
});
