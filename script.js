// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initSmoothScroll();
  initScrollAnimations();
  initScrollToTop();
  initStatsCounter();
  initWhatsAppFAB();
  initServiceCards();
  initExitPopup();
});

// ========================================
// ПЛАВНАЯ ПРОКРУТКА
// ========================================

/**
 * Инициализирует плавную прокрутку для якорных ссылок
 * При клике на ссылку с href начинающимся с "#", страница плавно прокручивается к целевому элементу
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  });
}

// ========================================
// АНИМАЦИИ ПРИ СКРОЛЛЕ
// ========================================

/**
 * Инициализирует анимации появления элементов при скролле
 * Использует Intersection Observer API для отслеживания видимости элементов
 */
function initScrollAnimations() {
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
  document.querySelectorAll('.card, .service, section').forEach(function(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// ========================================
// КНОПКА "НАВЕРХ"
// ========================================

/**
 * Инициализирует кнопку "Наверх"
 * Кнопка появляется после прокрутки страницы на 300px
 */
function initScrollToTop() {
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Прокрутить наверх');
  document.body.appendChild(scrollToTopBtn);

  // Показываем/скрываем кнопку при скролле
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  // Прокрутка наверх при клике
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// АНИМИРОВАННЫЙ СЧЕТЧИК СТАТИСТИКИ
// ========================================

/**
 * Анимирует числа в секции статистики
 * @param {HTMLElement} element - Элемент для анимации
 * @param {number} target - Целевое значение
 * @param {number} duration - Длительность анимации в миллисекундах
 */
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

/**
 * Инициализирует счетчики статистики
 * Запускает анимацию когда секция становится видимой
 */
function initStatsCounter() {
  const statsSection = document.getElementById('stats');
  
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
}

// ========================================
// ПЛАВАЮЩАЯ КНОПКА WHATSAPP
// ========================================

/**
 * Создает плавающую кнопку WhatsApp (FAB)
 */
function initWhatsAppFAB() {
  const fab = document.createElement('a');
  fab.href = 'https://wa.me/79289335932?text=Здравствуйте!%20Интересует%20гипнотерапия%20и%20энергетические%20практики';
  fab.target = '_blank';
  fab.rel = 'noopener';
  fab.className = 'fab-whatsapp';
  fab.setAttribute('aria-label', 'Написать в WhatsApp');
  fab.innerHTML = `<svg width="26" height="26" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path fill="white" d="M19.11 17.41c-.29-.14-1.72-.85-1.98-.95-.27-.1-.46-.14-.66.14-.2.29-.76.95-.93 1.14-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.14-.14.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51l-.56-.01c-.19 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.21 3.05.15.19 2.08 3.18 5.03 4.46.7.3 1.25.48 1.67.62.7.22 1.34.19 1.85.11.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z"/>
    <path fill="white" d="M26.01 5.99C23.19 3.18 19.7 1.65 16 1.65 8.64 1.65 2.69 7.6 2.69 14.96c0 2.34.61 4.61 1.76 6.62L2 30l8.6-2.25c1.95 1.06 4.16 1.62 6.41 1.62 7.36 0 13.31-5.95 13.31-13.31 0-3.7-1.53-7.19-4.31-10.07zM16.99 27.5c-2.04 0-4.04-.55-5.78-1.59l-.41-.24-5.09 1.33 1.36-4.96-.26-.42c-1.09-1.77-1.67-3.81-1.67-5.9C5.16 8.44 10.05 3.55 16 3.55c3.56 0 6.9 1.38 9.41 3.89 2.51 2.51 3.89 5.85 3.89 9.41 0 7.74-6.27 10.65-12.31 10.65z"/>
  </svg>`;
  
  document.body.appendChild(fab);
}

// ========================================
// ИНТЕРАКТИВНОСТЬ КАРТОЧЕК УСЛУГ
// ========================================

/**
 * Добавляет hover эффекты для карточек услуг
 */
function initServiceCards() {
  document.querySelectorAll('.service').forEach(function(service) {
    service.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.2)';
    });
    
    service.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.4)';
    });
  });

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
}

// ========================================
// POPUP С ПРЕДЛОЖЕНИЕМ
// ========================================

/**
 * Создает модальное окно popup
 * @param {string} title - Заголовок popup
 * @param {string} description - Описание
 * @param {string} buttonText - Текст кнопки
 * @param {string} buttonLink - Ссылка кнопки
 * @returns {HTMLElement} - Элемент popup
 */
function createPopup(title, description, buttonText, buttonLink) {
  const popup = document.createElement('div');
  popup.className = 'exit-popup';
  
  popup.innerHTML = `
    <button class="popup-close" aria-label="Закрыть">×</button>
    <div style="text-align: center;">
      <h4 style="margin-top: 0; color: var(--text-primary);">${title}</h4>
      <p style="color: var(--text-secondary); margin: 15px 0;">${description}</p>
      <a href="${buttonLink}" target="_blank" class="btn popup-btn">${buttonText}</a>
    </div>
  `;
  
  return popup;
}

/**
 * Показывает popup
 * @param {HTMLElement} popup - Элемент popup
 */
function showPopup(popup) {
  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
}

/**
 * Закрывает popup
 * @param {HTMLElement} popup - Элемент popup
 */
function closePopup(popup) {
  popup.classList.remove('show');
  setTimeout(() => {
    if (popup.parentNode) {
      document.body.removeChild(popup);
    }
  }, 300);
}

/**
 * Инициализирует popup с предложением консультации
 * Popup появляется через 30 секунд, если не был показан ранее
 */
function initExitPopup() {
  setTimeout(function() {
    if (!localStorage.getItem('popupShown')) {
      const popup = createPopup(
        'Хотите получить консультацию?',
        'Бесплатная 15-минутная онлайн-консультация',
        'Написать в WhatsApp',
        'https://wa.me/79289335932?text=Здравствуйте!%20Хочу%20получить%20бесплатную%2015-минутную%20консультацию'
      );
      
      showPopup(popup);
      
      // Закрытие popup по кнопке
      popup.querySelector('.popup-close').addEventListener('click', function() {
        closePopup(popup);
        localStorage.setItem('popupShown', 'true');
      });
      
      // Закрытие при клике на кнопку WhatsApp
      popup.querySelector('.popup-btn').addEventListener('click', function() {
        localStorage.setItem('popupShown', 'true');
      });
    }
  }, 30000);
}

// ========================================
// ПАРАЛЛАКС ЭФФЕКТ
// ========================================

/**
 * Добавляет параллакс эффект для hero изображения
 */
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-img');
  
  if (parallax) {
    const speed = scrolled * 0.1;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});
