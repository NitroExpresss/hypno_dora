// Плавная прокрутка для якорных ссылок
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var href = a.getAttribute('href');
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Переключатель темы
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌓';
  document.body.appendChild(themeToggle);

  // Сохранение предпочтений темы
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', function() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Анимация переключения
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });

  // Анимация появления элементов при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Наблюдаем за элементами
  document.querySelectorAll('.card, .service, section').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });



  // Кнопка "Наверх"
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  document.body.appendChild(scrollToTopBtn);

  // Плавающая кнопка WhatsApp (FAB)
  const fab = document.createElement('a');
  fab.href = 'https://wa.me/79289335932?text=привет,%20хочу%20поговорить';
  fab.target = '_blank';
  fab.rel = 'noopener';
  fab.className = 'fab-whatsapp';
  fab.setAttribute('aria-label', 'Написать в WhatsApp');
  fab.innerHTML = `<svg width="26" height="26" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M19.11 17.41c-.29-.14-1.72-.85-1.98-.95-.27-.1-.46-.14-.66.14-.2.29-.76.95-.93 1.14-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.14-.14.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51l-.56-.01c-.19 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.21 3.05.15.19 2.08 3.18 5.03 4.46.7.3 1.25.48 1.67.62.7.22 1.34.19 1.85.11.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z"/><path fill="white" d="M26.01 5.99C23.19 3.18 19.7 1.65 16 1.65 8.64 1.65 2.69 7.6 2.69 14.96c0 2.34.61 4.61 1.76 6.62L2 30l8.6-2.25c1.95 1.06 4.16 1.62 6.41 1.62 7.36 0 13.31-5.95 13.31-13.31 0-3.7-1.53-7.19-4.31-10.07zM16.99 27.5c-2.04 0-4.04-.55-5.78-1.59l-.41-.24-5.09 1.33 1.36-4.96-.26-.42c-1.09-1.77-1.67-3.81-1.67-5.9C5.16 8.44 10.05 3.55 16 3.55c3.56 0 6.9 1.38 9.41 3.89 2.51 2.51 3.89 5.85 3.89 9.41 0 7.74-6.27 10.65-12.31 10.65z"/></svg>`;
  document.body.appendChild(fab);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Анимированный счетчик статистики
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    updateCounter();
  }

  // Находим секцию статистики
  const statsSection = document.getElementById('stats');

  // Анимируем счетчики при видимости
  if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            animateCounter(counter, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // Анимация loading для кнопок WhatsApp (кроме плавающей FAB)
  document.querySelectorAll('a[href*="wa.me"]:not(.fab-whatsapp)').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const originalText = this.textContent;
      this.textContent = 'Открываю WhatsApp...';
      this.style.pointerEvents = 'none';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.pointerEvents = 'auto';
      }, 1500);
    });
  });

  // Hover эффекты для карточек услуг
  document.querySelectorAll('.service').forEach(function(service) {
    service.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 20px 40px rgba(123,63,238,0.2)';
    });
    
    service.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 6px 30px rgba(3,6,12,0.6)';
    });
  });

  // Создание модального окна для услуг
  function createModal(serviceTitle, serviceDescription) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
      background: linear-gradient(135deg, var(--card), rgba(255,255,255,0.02));
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      backdrop-filter: blur(8px);
      transform: scale(0.8);
      transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
      <button class="modal-close" style="
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        color: var(--muted);
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
      ">×</button>
      <h3 style="margin-top: 0; color: var(--text);">${serviceTitle}</h3>
      <div style="color: var(--muted); line-height: 1.6;">
        ${serviceDescription}
      </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Анимация открытия
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
      modalContent.style.transform = 'scale(1)';
    }, 10);

    // Закрытие модального окна
    const closeModal = () => {
      modal.style.opacity = '0';
      modal.style.visibility = 'hidden';
      modalContent.style.transform = 'scale(0.8)';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.querySelector('.modal-overlay')) {
        closeModal();
      }
    });
  }

  // Добавляем кликабельность к описаниям услуг
  document.querySelectorAll('.service').forEach(function(service) {
    const description = service.querySelector('p');
    if (description) {
      description.style.cursor = 'pointer';
      description.style.color = 'var(--accent)';
      description.style.textDecoration = 'underline';
      description.style.transition = 'all 0.3s ease';
      
      description.addEventListener('mouseenter', function() {
        this.style.color = 'var(--accent-2)';
      });
      
      description.addEventListener('mouseleave', function() {
        this.style.color = 'var(--accent)';
      });
      
      description.addEventListener('click', function() {
        const title = service.querySelector('h3').textContent;
        createModal(title, description.textContent);
      });
    }
  });

  // Параллакс эффект для hero секции
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-img');
    if (parallax) {
      const speed = scrolled * 0.1;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });



  // Popup с предложением записи (появляется через 30 секунд)
  setTimeout(function() {
    if (!localStorage.getItem('popupShown')) {
      const popup = document.createElement('div');
      popup.className = 'exit-popup';
      
      popup.innerHTML = `
        <button class="popup-close">×</button>
        <div style="text-align: center;">
          <h4 style="margin-top: 0; color: var(--text);">Хотите получить консультацию?</h4>
          <p style="color: var(--muted); margin: 15px 0;">Бесплатная 15-минутная онлайн-консультация</p>
          <a href="https://wa.me/79289335932?text=Хочу%20записаться%20на%20консультацию" target="_blank" class="btn popup-btn">Написать в WhatsApp</a>
        </div>
      `;
      
      document.body.appendChild(popup);
      
      setTimeout(() => {
        popup.classList.add('show');
      }, 10);
      
      // Закрытие popup
      popup.querySelector('.popup-close').addEventListener('click', function() {
        popup.classList.remove('show');
        setTimeout(() => document.body.removeChild(popup), 300);
        localStorage.setItem('popupShown', 'true');
      });
      
      // При клике на кнопку WhatsApp тоже закрываем
      popup.querySelector('.popup-btn').addEventListener('click', function() {
        localStorage.setItem('popupShown', 'true');
      });
    }
  }, 30000);
});
