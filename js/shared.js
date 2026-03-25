document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('body > nav');
  const navInner = nav ? nav.firstElementChild : null;
  const desktopLinkGroup = navInner ? navInner.querySelector('div.hidden.md\\:flex') : null;
  const navActions = navInner ? navInner.lastElementChild : null;

  if (nav && navInner && desktopLinkGroup && navActions && !nav.querySelector('#mobile-menu')) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'mobile-menu-btn';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-controls', 'mobile-menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">menu</span>';
    navActions.appendChild(toggle);

    const panel = document.createElement('div');
    panel.id = 'mobile-menu';
    panel.className = 'mobile-nav-panel hidden';

    const linkList = document.createElement('div');
    linkList.className = 'mobile-nav-links';

    desktopLinkGroup.querySelectorAll('a').forEach(function (link) {
      const clone = link.cloneNode(true);
      const href = clone.getAttribute('href');
      let isCurrent = false;

      if (href && !href.startsWith('#')) {
        try {
          isCurrent = new URL(href, window.location.href).pathname === window.location.pathname;
        } catch (error) {
          isCurrent = window.location.pathname.endsWith(href);
        }
      }

      clone.className = 'mobile-nav-link' + (isCurrent ? ' is-active' : '');
      linkList.appendChild(clone);
    });

    const actionList = document.createElement('div');
    actionList.className = 'mobile-nav-actions';

    const actionLinks = navActions.querySelectorAll('a');
    actionLinks.forEach(function (link, index) {
      const clone = link.cloneNode(true);
      const isPrimary = index === actionLinks.length - 1;
      clone.className = isPrimary ? 'mobile-nav-action mobile-nav-action--primary' : 'mobile-nav-action';
      actionList.appendChild(clone);
    });

    panel.appendChild(linkList);
    if (actionList.childElementCount) {
      panel.appendChild(actionList);
    }
    nav.appendChild(panel);

    const icon = toggle.querySelector('.material-symbols-outlined');
    const setMenuState = function (open) {
      panel.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      if (icon) {
        icon.textContent = open ? 'close' : 'menu';
      }
    };

    toggle.addEventListener('click', function () {
      setMenuState(toggle.getAttribute('aria-expanded') !== 'true');
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !nav.contains(event.target)) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        setMenuState(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        setMenuState(false);
      }
    });
  }

  document.querySelectorAll('[data-faq-toggle]').forEach(function (el, index) {
    const answer = el.nextElementSibling;
    const icon = el.querySelector('.faq-icon');

    if (!answer) {
      return;
    }

    const answerId = answer.id || 'faq-answer-' + index;
    answer.id = answerId;

    el.classList.add('faq-toggle');
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-controls', answerId);
    el.setAttribute('aria-expanded', String(!answer.classList.contains('hidden')));

    if (icon) {
      icon.setAttribute('aria-hidden', 'true');
    }

    const toggleAnswer = function () {
      const willExpand = answer.classList.contains('hidden');
      answer.classList.toggle('hidden', !willExpand);
      el.setAttribute('aria-expanded', String(willExpand));
      if (icon) {
        icon.textContent = willExpand ? 'expand_less' : 'expand_more';
      }
    };

    el.addEventListener('click', toggleAnswer);
    el.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleAnswer();
      }
    });
  });
});
