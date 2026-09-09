(() => {
  const cfg = window.SERHII_SITE || {};
  const email = cfg.email || "kontakt@serhiiweb.pl";
  const telegram = cfg.telegram || "https://t.me/webbyserhii";
  const domain = cfg.domain || "";

  document.querySelectorAll('.js-telegram').forEach(a => a.href = telegram);
  document.querySelectorAll('.js-email-link').forEach(a => a.href = `mailto:${email}`);
  document.querySelectorAll('.js-email-text').forEach(el => {
    const parent = el.closest('strong');
    el.textContent = parent ? `${email} ↗` : email;
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const og = document.getElementById('ogUrl');
  if (og && domain && !domain.includes('twojadomena.pl')) og.setAttribute('content', domain);

  if (cfg.whatsappNumber) {
    document.querySelectorAll('.js-whatsapp').forEach(a => {
      a.classList.remove('whatsapp-hidden');
      a.href = `https://wa.me/${cfg.whatsappNumber}`;
    });
  }

  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  const closeMenu = () => {
    menu?.classList.remove('open');
    menuBtn?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  };
  menuBtn?.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const reveals = document.querySelectorAll('.reveal');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    reveals.forEach(el => io.observe(el));
  }

  const toast = document.getElementById('toast');
  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  };

  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  form?.addEventListener('submit', async e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const endpoint = cfg.formEndpoint || '';
    if (!endpoint || !endpoint.includes('script.google.com/macros/s/')) {
      showToast('Formularz nie jest jeszcze skonfigurowany.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn?.textContent || 'WYŚLIJ WIADOMOŚĆ →';
    if (formSuccess) formSuccess.classList.remove('show');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.textContent = 'WYSYŁANIE…';
    }

    const fd = new FormData(form);
    const params = new URLSearchParams();
    params.set('name', fd.get('name') || '');
    params.set('email', fd.get('email') || '');
    params.set('phone', fd.get('phone') || '');
    params.set('type', fd.get('type') || '');
    params.set('message', fd.get('message') || '');
    params.set('website', fd.get('website') || '');

    try {
      // Google Apps Script nie udostępnia standardowego nagłówka CORS dla
      // prostego statycznego portfolio. no-cors pozwala wysłać formularz
      // bez przeładowania i bez ujawniania żadnych kluczy w kodzie strony.
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params.toString()
      });

      form.reset();
      showToast('Dziękuję! Wiadomość została wysłana. Odpowiem najszybciej jak to możliwe.');
      if (formSuccess) formSuccess.classList.add('show');
      if (submitBtn) submitBtn.textContent = 'WIADOMOŚĆ WYSŁANA ✓';

      // Krótka blokada zapobiega przypadkowemu wysłaniu tej samej wiadomości kilka razy.
      await new Promise(resolve => setTimeout(resolve, 3500));
    } catch (error) {
      console.error(error);
      showToast('Nie udało się wysłać. Spróbuj ponownie za chwilę lub napisz do mnie bezpośrednio.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.textContent = originalLabel;
      }
    }
  });

  const details = [...document.querySelectorAll('.accordion details')];
  details.forEach(item => item.addEventListener('toggle', () => {
    if (item.open && window.innerWidth < 900) details.forEach(other => { if (other !== item) other.open = false; });
  }));
})();
