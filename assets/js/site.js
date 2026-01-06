(() => {
  const btn = document.querySelector('.navbtn');
  const drawer = document.querySelector('.navdrawer');
  if (!btn || !drawer) return;

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
})();