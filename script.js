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

  // FAQ интерактивность
  document.querySelectorAll('#faq .card').forEach(function(card) {
    const title = card.querySelector('h3');
    const content = card.querySelector('p');
    
    // Скрываем содержимое по умолчанию
    content.style.display = 'none';
    content.style.marginTop = '10px';
    content.style.color = 'var(--muted)';
    content.style.fontSize = '14px';
    
    // Добавляем кликабельность
    title.style.cursor = 'pointer';
    title.style.position = 'relative';
    
    // Добавляем стрелку
    title.innerHTML += ' <span style="float:right;transition:transform 0.3s">▼</span>';
    
    title.addEventListener('click', function() {
      if (content.style.display === 'none') {
        content.style.display = 'block';
        title.querySelector('span').style.transform = 'rotate(180deg)';
      } else {
        content.style.display = 'none';
        title.querySelector('span').style.transform = 'rotate(0deg)';
      }
    });
  });

  // Кнопка "Наверх"
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    border: 1px solid var(--glass-border);
    color: white;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 8px 30px rgba(123,63,238,0.18);
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
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

  // Добавляем секцию статистики
  const statsSection = document.createElement('section');
  statsSection.style.cssText = `
    margin-top: 40px;
    text-align: center;
  `;
  
  statsSection.innerHTML = `
    <h2>Мои достижения</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 26px;">
      <div class="card" style="text-align: center;">
        <h3 style="font-size: 36px; margin: 0; color: var(--accent);" data-count="500">0</h3>
        <p style="margin: 8px 0 0 0; color: var(--muted);">Проведённых сессий</p>
      </div>
      <div class="card" style="text-align: center;">
        <h3 style="font-size: 36px; margin: 0; color: var(--accent-2);" data-count="8">0</h3>
        <p style="margin: 8px 0 0 0; color: var(--muted);">Лет опыта</p>
      </div>
      <div class="card" style="text-align: center;">
        <h3 style="font-size: 36px; margin: 0; color: var(--accent);" data-count="95">0</h3>
        <p style="margin: 8px 0 0 0; color: var(--muted);">% Успешных результатов</p>
      </div>
      <div class="card" style="text-align: center;">
        <h3 style="font-size: 36px; margin: 0; color: var(--accent-2);" data-count="200">0</h3>
        <p style="margin: 8px 0 0 0; color: var(--muted);">Довольных клиентов</p>
      </div>
    </div>
  `;
  
  // Вставляем секцию статистики после FAQ
  const faqSection = document.getElementById('faq');
  faqSection.parentNode.insertBefore(statsSection, faqSection.nextSibling);

  // Анимируем счетчики при видимости
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

  // Анимация loading для кнопок WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(btn) {
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

  // Интерактивная форма обратной связи
  function createContactForm() {
    const formModal = document.createElement('div');
    formModal.className = 'form-modal';
    formModal.style.cssText = `
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

    const formContent = document.createElement('div');
    formContent.className = 'form-content';
    formContent.style.cssText = `
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

    formContent.innerHTML = `
      <button class="form-close" style="
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
      <h3 style="margin-top: 0; color: var(--text);">Записаться на консультацию</h3>
      
      <form id="contactForm" style="margin-top: 20px;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: var(--muted);">Имя *</label>
          <input type="text" name="name" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            background: rgba(255,255,255,0.02);
            color: var(--text);
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s ease;
          ">
        </div>
        
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: var(--muted);">Телефон *</label>
          <input type="tel" name="phone" required style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            background: rgba(255,255,255,0.02);
            color: var(--text);
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s ease;
          " placeholder="+7 (999) 123-45-67">
        </div>
        
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: var(--muted);">Email</label>
          <input type="email" name="email" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            background: rgba(255,255,255,0.02);
            color: var(--text);
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s ease;
          " placeholder="example@email.com">
        </div>
        
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; color: var(--muted);">Услуга</label>
          <select name="service" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            background: rgba(255,255,255,0.02);
            color: var(--text);
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s ease;
          ">
            <option value="">Выберите услугу</option>
            <option value="hypnosis">Гипнокоучинг</option>
            <option value="energy">Энергетическая чистка</option>
            <option value="shaman">Шаманские практики</option>
          </select>
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 5px; color: var(--muted);">Сообщение</label>
          <textarea name="message" rows="4" style="
            width: 100%;
            padding: 12px;
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            background: rgba(255,255,255,0.02);
            color: var(--text);
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s ease;
            resize: vertical;
          " placeholder="Расскажите о своих целях и ожиданиях..."></textarea>
        </div>
        
        <button type="submit" class="btn" style="
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          color: white;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        ">Отправить заявку</button>
      </form>
    `;

    formModal.appendChild(formContent);
    document.body.appendChild(formModal);

    // Открытие формы
    setTimeout(() => {
      formModal.style.opacity = '1';
      formModal.style.visibility = 'visible';
      formContent.style.transform = 'scale(1)';
    }, 10);

    // Закрытие формы
    const closeForm = () => {
      formModal.style.opacity = '0';
      formModal.style.visibility = 'hidden';
      formContent.style.transform = 'scale(0.8)';
      setTimeout(() => {
        document.body.removeChild(formModal);
      }, 300);
    };

    formContent.querySelector('.form-close').addEventListener('click', closeForm);
    formModal.addEventListener('click', function(e) {
      if (e.target === formModal) {
        closeForm();
      }
    });

    // Обработка формы
    const form = formContent.querySelector('#contactForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Показываем индикатор загрузки
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Отправляем...';
      submitBtn.disabled = true;
      
      // Симуляция отправки
      setTimeout(() => {
        submitBtn.textContent = '✅ Отправлено!';
        submitBtn.style.background = 'linear-gradient(90deg, #10b981, #059669)';
        
        // Создаем сообщение для WhatsApp
        const whatsappMessage = `Заявка на консультацию:
Имя: ${data.name}
Телефон: ${data.phone}
${data.email ? `Email: ${data.email}` : ''}
${data.service ? `Услуга: ${data.service}` : ''}
${data.message ? `Сообщение: ${data.message}` : ''}`;
        
        const whatsappUrl = `https://wa.me/79289335932?text=${encodeURIComponent(whatsappMessage)}`;
        
        setTimeout(() => {
          closeForm();
          window.open(whatsappUrl, '_blank');
        }, 1500);
      }, 2000);
    });

    // Стили для фокуса на полях
    formContent.querySelectorAll('input, textarea, select').forEach(function(field) {
      field.addEventListener('focus', function() {
        this.style.borderColor = 'var(--accent)';
        this.style.boxShadow = '0 0 0 3px rgba(155,107,255,0.1)';
      });
      
      field.addEventListener('blur', function() {
        this.style.borderColor = 'var(--glass-border)';
        this.style.boxShadow = 'none';
      });
    });
  }

  // Добавляем кнопку "Записаться" в контактную секцию
  const contactSection = document.getElementById('contact');
  const contactCard = contactSection.querySelector('.card');
  
  const recordBtn = document.createElement('button');
  recordBtn.textContent = 'Заполнить форму записи';
  recordBtn.className = 'btn';
  recordBtn.style.cssText = `
    margin-top: 15px;
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    color: white;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  `;
  
  contactCard.appendChild(recordBtn);
  
  recordBtn.addEventListener('click', createContactForm);

  // Popup с предложением записи (появляется через 30 секунд)
  setTimeout(function() {
    if (!localStorage.getItem('popupShown')) {
      const popup = document.createElement('div');
      popup.className = 'exit-popup';
      popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, var(--card), rgba(255,255,255,0.02));
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 30px;
        max-width: 400px;
        width: 90%;
        z-index: 10000;
        backdrop-filter: blur(8px);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      `;
      
      popup.innerHTML = `
        <button class="popup-close" style="
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: var(--muted);
          font-size: 18px;
          cursor: pointer;
        ">×</button>
        <div style="text-align: center;">
          <h4 style="margin-top: 0; color: var(--text);">Хотите получить консультацию?</h4>
          <p style="color: var(--muted); margin: 15px 0;">Запишитесь на первую сессию со скидкой 20%</p>
          <button class="btn popup-btn">Записаться со скидкой</button>
        </div>
      `;
      
      document.body.appendChild(popup);
      
      setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 10);
      
      // Закрытие popup
      popup.querySelector('.popup-close').addEventListener('click', function() {
        popup.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => document.body.removeChild(popup), 300);
      });
      
      // Кнопка записи
      popup.querySelector('.popup-btn').addEventListener('click', function() {
        popup.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => {
          document.body.removeChild(popup);
          createContactForm();
        }, 300);
      });
      
      // Отмечаем, что popup показан
      localStorage.setItem('popupShown', 'true');
    }
  }, 30000);
});
