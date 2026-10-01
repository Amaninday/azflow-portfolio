(() => {
  'use strict';

  // Mobile navigation
  const burger = document.getElementById('burgerBtn');
  const panel = document.getElementById('mobilePanel');

  if (burger && panel) {
    const closeMenu = () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
    };

    burger.addEventListener('click', () => {
      const open = !panel.classList.contains('open');
      panel.classList.toggle('open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!button || !answer) return;

    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        const openButton = openItem.querySelector('.faq-q');
        const openAnswer = openItem.querySelector('.faq-a');
        if (openButton) openButton.setAttribute('aria-expanded', 'false');
        if (openAnswer) openAnswer.style.maxHeight = null;
      });

      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Portfolio media galleries
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slides = [...gallery.querySelectorAll('.gallery-slide')];
    const previousButton = gallery.querySelector('.gallery-arrow.prev');
    const nextButton = gallery.querySelector('.gallery-arrow.next');
    const counter = gallery.querySelector('.gallery-count');

    if (!slides.length) return;

    let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));

    const showSlide = (index) => {
      const currentVideo = slides[currentIndex]?.querySelector('video');
      if (currentVideo) currentVideo.pause();

      slides[currentIndex]?.classList.remove('active');
      currentIndex = (index + slides.length) % slides.length;
      slides[currentIndex].classList.add('active');

      if (counter) counter.textContent = `${currentIndex + 1} / ${slides.length}`;
    };

    if (counter) counter.textContent = `${currentIndex + 1} / ${slides.length}`;

    if (slides.length === 1) {
      if (previousButton) previousButton.hidden = true;
      if (nextButton) nextButton.hidden = true;
      if (counter) counter.hidden = true;
    } else {
      previousButton?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        showSlide(currentIndex - 1);
      });

      nextButton?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        showSlide(currentIndex + 1);
      });

      gallery.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showSlide(currentIndex - 1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          showSlide(currentIndex + 1);
        }
      });
    }
  });

  // Subtle 3D card tilt on pointer devices only.
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.tilt').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
})();