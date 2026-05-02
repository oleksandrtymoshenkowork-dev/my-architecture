/**
 * ════════════════════════════════════════════
 * ДАНІ ПРОЄКТІВ
 * ════════════════════════════════════════════
 */
const projectsData = [
  { title: "Стадіон (Тернопіль)", type: "Концептуальний проект", images: ["assets/images/Стадіон.png"], pdf: "assets/documents/Стадіон.pdf", category: "conceptual" },
  { title: "Генплан ЖК (Вінниця)", type: "Концептуальний проект", images: ["assets/images/ГП.png"], pdf: "assets/documents/ГП.pdf", category: "conceptual" },
  { title: "Однородинний будинок", type: "Концептуальний проект", images: ["assets/images/Однородинний.png"], pdf: "assets/documents/Однородинний.pdf", category: "conceptual" },
  { title: "Модульний будинок Maxi", type: "Концептуальний проект", images: ["assets/images/Maxi.png"], pdf: "assets/documents/Maxi.pdf", category: "conceptual" },
  { title: "Модульний будинок Mini", type: "Концептуальний проект", images: ["assets/images/Mini.png"], pdf: "assets/documents/Mini.pdf", category: "conceptual" },
  { title: "Модульний офіс", type: "Концептуальний проект", images: ["assets/images/Офіс.png"], pdf: "assets/documents/Офіс.pdf", category: "conceptual" },
  { title: "Господарський будиночок", type: "Концептуальний проект", images: ["assets/images/Госп.буд.png"], pdf: "assets/documents/Госп.буд.pdf", category: "conceptual" },
  { title: "Котедж", type: "Концептуальний проект • Розширена візуалізація", images: ["assets/images/Котедж.png","assets/images/Вид_1.png","assets/images/Вид_2.png","assets/images/3д.png","assets/images/План.png"], pdf: "assets/documents/Котедж.pdf", category: "conceptual" },
  { title: "Церква в Карпатах", type: "Робочий проект", images: ["assets/images/Церква.png"], pdf: "assets/documents/Церква.pdf", category: "working" },
  { title: "ЖК Васильєва", type: "Робочий проект", images: ["assets/images/ЖК Васильева.png"], pdf: "assets/documents/ЖК Васильєва.pdf", category: "working" },
  { title: "ЖК Лісові гринівці", type: "Робочий проект", images: ["assets/images/ЖК Лісові гринівці.png"], pdf: "assets/documents/ЖК Лісові гринівці.pdf", category: "working" }
];

let currentProjectIndex = 0;
let currentImageIndex = 0;

/**
 * ════════════════════════════════════════════
 * ІНІЦІАЛІЗАЦІЯ
 * ════════════════════════════════════════════
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initFilterButtons();
  initProjectCards();
  initScrollAnimations();
  initScrollProgress();
  initScrollToTop();
});

/**
 * ════════════════════════════════════════════
 * ТЕМА (СВІТЛА / ТЕМНА)
 * ════════════════════════════════════════════
 */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark'); // fallback to root
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    // Default is dark (no attribute needed, or 'dark' works too since root handles it)
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  updateThemeIcon();
  
  toggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon();
  });
  
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
      updateThemeIcon();
    }
  });
}

function updateThemeIcon() {
  const icon = document.querySelector('#theme-toggle i');
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  // If light mode, show moon to switch to dark. If dark mode, show sun to switch to light.
  icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
}

/**
 * ════════════════════════════════════════════
 * НАВІГАЦІЯ
 * ════════════════════════════════════════════
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', !isOpen);
    btn.querySelector('i').className = isOpen ? 'fas fa-bars' : 'fas fa-times';
  });

  document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('i').className = 'fas fa-bars';
    });
  });
}

/**
 * ════════════════════════════════════════════
 * ФІЛЬТРАЦІЯ ПОРТФОЛІО
 * ════════════════════════════════════════════
 */
function initFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterProjects(btn.getAttribute('data-filter'));
    });
  });
}

function filterProjects(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
  });

  document.querySelectorAll('.project-card').forEach(card => {
    const cat = card.getAttribute('data-category');
    const show = category === 'all' || cat === category;
    card.style.display = show ? '' : 'none';
    if (show) {
      card.classList.remove('fade-in');
      void card.offsetWidth; // force reflow
      card.classList.add('fade-in');
    }
  });
}

/**
 * ════════════════════════════════════════════
 * КАРТКИ ПРОЄКТІВ — КЛІК
 * ════════════════════════════════════════════
 */
function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      openProject(idx);
    });
  });
}

/**
 * ════════════════════════════════════════════
 * ПОВНОЕКРАННИЙ ПЕРЕГЛЯД ПРОЄКТУ
 * ════════════════════════════════════════════
 */
let projectViewEl = null;
let photoObserver = null;

function openProject(index) {
  currentProjectIndex = index;

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      renderProjectView();
      document.body.appendChild(projectViewEl);
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleProjectKeys);
    });
  } else {
    renderProjectView();
    document.body.appendChild(projectViewEl);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleProjectKeys);
  }
}

function renderProjectView() {
  const project = projectsData[currentProjectIndex];
  const hasImages = project.images && project.images.length > 0;
  const prevIdx = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
  const nextIdx = (currentProjectIndex + 1) % projectsData.length;

  if (!projectViewEl) {
    projectViewEl = document.createElement('div');
    projectViewEl.className = 'project-view entering';
    projectViewEl.id = 'project-view';
  } else {
    projectViewEl.classList.remove('entering');
  }

  projectViewEl.innerHTML = `
    <!-- Шапка -->
    <div class="project-view__header">
      <button class="project-view__back" id="pv-back">
        <i class="fas fa-arrow-left"></i> Назад
      </button>
      ${project.pdf ? `
        <button class="project-view__pdf-btn" id="pv-pdf">
          <i class="fas fa-file-pdf"></i> Креслення
        </button>
      ` : ''}
    </div>

    <!-- Інформація -->
    <div class="project-view__info">
      <h1 class="project-view__title">${project.title}</h1>
      <p class="project-view__type">${project.type}</p>
    </div>

    <!-- Галерея фото (вертикальна стрічка) -->
    ${hasImages ? `
      <div class="project-view__gallery">
        ${project.images.map((img, idx) => `
          <img src="${encodeURI(img)}"
               alt="${project.title} — фото ${idx + 1}"
               class="project-view__photo ${(img.includes('План') || img.includes('3д')) ? 'blueprint-filter' : ''}"
               data-photo-idx="${idx}"
               style="animation-delay: ${idx * 0.15}s"
               loading="lazy">
        `).join('')}
      </div>
    ` : `
      <div class="project-view__no-images">
        <i class="fas fa-camera-retro"></i>
        <p>Візуалізація в процесі</p>
        ${project.pdf ? '<p style="margin-top:0.5rem;font-size:0.8rem">Переглянути креслення можна кнопкою вгорі</p>' : ''}
      </div>
    `}

    <!-- Навігація між проєктами -->
    <div class="project-view__nav">
      <button class="project-nav-btn project-nav-btn--prev" id="pv-prev">
        <i class="fas fa-chevron-left"></i>
        <div>
          <div class="project-nav-btn__label">Попередній</div>
          <div class="project-nav-btn__title">${projectsData[prevIdx].title}</div>
        </div>
      </button>
      <button class="project-nav-btn project-nav-btn--next" id="pv-next">
        <div>
          <div class="project-nav-btn__label">Наступний</div>
          <div class="project-nav-btn__title">${projectsData[nextIdx].title}</div>
        </div>
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;

  // Скрол нагору
  projectViewEl.scrollTop = 0;

  // Обробники
  const pvBack = projectViewEl.querySelector('#pv-back');
  if (pvBack) pvBack.addEventListener('click', closeProjectView);

  const pvPrev = projectViewEl.querySelector('#pv-prev');
  if (pvPrev) pvPrev.addEventListener('click', () => navigateProject(prevIdx));

  const pvNext = projectViewEl.querySelector('#pv-next');
  if (pvNext) pvNext.addEventListener('click', () => navigateProject(nextIdx));

  const pdfBtn = projectViewEl.querySelector('#pv-pdf');
  if (pdfBtn) pdfBtn.addEventListener('click', () => openPDFView(project));

  // Lightbox на клік по фото
  projectViewEl.querySelectorAll('.project-view__photo').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
}

function navigateProject(index) {
  currentProjectIndex = index;
  
  if (document.startViewTransition) {
    document.startViewTransition(() => renderProjectView());
  } else {
    renderProjectView();
  }
}

function closeProjectView() {
  if (!projectViewEl) return;

  projectViewEl.style.animation = 'projectViewOut 0.3s ease forwards';
  document.removeEventListener('keydown', handleProjectKeys);
  if (photoObserver) photoObserver.disconnect();

  setTimeout(() => {
    if (projectViewEl) projectViewEl.remove();
    projectViewEl = null;
    document.body.style.overflow = '';
  }, 300);
}

function handleProjectKeys(e) {
  if (e.key === 'Escape') closeProjectView();
  if (e.key === 'ArrowLeft') {
    const prev = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    navigateProject(prev);
  }
  if (e.key === 'ArrowRight') {
    const next = (currentProjectIndex + 1) % projectsData.length;
    navigateProject(next);
  }
}

/**
 * LIGHTBOX — повноекранний перегляд фото
 */
function openLightbox(src, alt) {
  const existing = document.querySelector('.photo-lightbox');
  if (existing) existing.remove();

  const lightbox = document.createElement('div');
  lightbox.className = 'photo-lightbox';
  lightbox.innerHTML = `
    <button class="photo-lightbox__close"><i class="fas fa-times"></i></button>
    <img src="${src}" alt="${alt}">
  `;

  const close = () => lightbox.remove();
  lightbox.addEventListener('click', close);
  lightbox.querySelector('.photo-lightbox__close').addEventListener('click', (e) => {
    e.stopPropagation();
    close();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
  });

  document.body.appendChild(lightbox);
}

/**
 * ════════════════════════════════════════════
 * PDF ПЕРЕГЛЯДАЧ (PDF.js)
 * ════════════════════════════════════════════
 */
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    pdfScale = 1.0,
    pdfCanvas = null,
    pdfCtx = null;

function openPDFView(project) {
  const pdfPath = encodeURI(project.pdf);

  // Видаляємо старий якщо є
  const existing = document.getElementById('pdf-view');
  if (existing) existing.remove();

  // Створюємо базовий UI
  const pdfView = document.createElement('div');
  pdfView.className = 'pdf-view';
  pdfView.id = 'pdf-view';
  pdfView.innerHTML = `
    <div class="pdf-view__header">
      <div class="pdf-view__header-left">
        <div class="pdf-view__icon"><i class="fas fa-file-pdf"></i></div>
        <div>
          <h3>${project.title}</h3>
          <p>Архітектурні креслення</p>
        </div>
      </div>
      
      <!-- Toolbar: Навігація та Зум -->
      <div class="pdf-toolbar">
        <div class="pdf-toolbar__group">
          <button class="pdf-btn" id="pdf-prev" disabled title="Попередня сторінка"><i class="fas fa-chevron-up"></i></button>
          <span class="pdf-page-info"><span id="pdf-page-num">1</span> / <span id="pdf-page-count">-</span></span>
          <button class="pdf-btn" id="pdf-next" disabled title="Наступна сторінка"><i class="fas fa-chevron-down"></i></button>
        </div>
        <div class="pdf-toolbar__group divider">
          <button class="pdf-btn" id="pdf-zoom-out" title="Зменшити"><i class="fas fa-search-minus"></i></button>
          <button class="pdf-btn" id="pdf-zoom-in" title="Збільшити"><i class="fas fa-search-plus"></i></button>
        </div>
      </div>

      <div class="pdf-view__actions">
        <a href="${pdfPath}" download class="pdf-download-btn" id="pdf-download" title="Завантажити PDF">
          <i class="fas fa-download"></i> Завантажити
        </a>
        <button class="pdf-view__back" id="pdf-back"><i class="fas fa-arrow-left"></i> Назад до фото</button>
      </div>
    </div>
    
    <div class="pdf-view__body" id="pdf-body">
      <!-- Лоадер -->
      <div class="pdf-loader" id="pdf-loader">
        <div class="spinner"></div>
        <p>Завантаження документа...</p>
      </div>
      <!-- Контейнер для канвасу -->
      <div class="pdf-canvas-wrapper">
        <canvas id="pdf-canvas"></canvas>
      </div>
    </div>
  `;

  document.body.appendChild(pdfView);

  pdfCanvas = document.getElementById('pdf-canvas');
  pdfCtx = pdfCanvas.getContext('2d');

  // Закриття PDF
  const pdfBackBtn = document.getElementById('pdf-back');
  if (pdfBackBtn) pdfBackBtn.addEventListener('click', closePDFView);
  
  // Ініціалізація PDF.js
  initPDF(pdfPath);
}

function initPDF(url) {
  // Налаштування worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  pdfDoc = null;
  pageNum = 1;
  pdfScale = 1.5; // Базовий масштаб (для якості на retina)

  const loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    document.getElementById('pdf-page-count').textContent = pdfDoc.numPages;
    
    // Прибираємо лоадер
    document.getElementById('pdf-loader').style.display = 'none';
    
    // Включаємо кнопки
    updatePDFButtons();

    // Обробники кнопок
    document.getElementById('pdf-prev').addEventListener('click', onPrevPage);
    document.getElementById('pdf-next').addEventListener('click', onNextPage);
    document.getElementById('pdf-zoom-in').addEventListener('click', () => onZoom(0.25));
    document.getElementById('pdf-zoom-out').addEventListener('click', () => onZoom(-0.25));

    // Клавіатурна навігація для PDF
    document.addEventListener('keydown', handlePDFKeys);

    // Рендеримо першу сторінку
    renderPage(pageNum);
  }).catch(function(error) {
    console.error('Помилка завантаження PDF: ', error);
    const loader = document.getElementById('pdf-loader');
    if (loader) {
      loader.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--color-accent); margin-bottom: 1rem;"></i>
        <p>Не вдалося завантажити креслення.</p>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.7;">${error.message}</p>
      `;
    }
  });
}

function renderPage(num) {
  pageRendering = true;
  
  pdfDoc.getPage(num).then(function(page) {
    const viewport = page.getViewport({scale: pdfScale});
    pdfCanvas.height = viewport.height;
    pdfCanvas.width = viewport.width;

    // CSS стилізація для коректного відображення масштабу
    pdfCanvas.style.width = `${viewport.width}px`;
    pdfCanvas.style.height = `${viewport.height}px`;

    const renderContext = {
      canvasContext: pdfCtx,
      viewport: viewport
    };
    
    const renderTask = page.render(renderContext);

    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  document.getElementById('pdf-page-num').textContent = num;
  updatePDFButtons();
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

function onPrevPage() {
  if (pageNum <= 1) return;
  pageNum--;
  queueRenderPage(pageNum);
}

function onNextPage() {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  queueRenderPage(pageNum);
}

function onZoom(delta) {
  let newScale = pdfScale + delta;
  if (newScale < 0.5) newScale = 0.5;
  if (newScale > 3.0) newScale = 3.0;
  
  if (newScale !== pdfScale) {
    pdfScale = newScale;
    queueRenderPage(pageNum);
  }
}

function updatePDFButtons() {
  if (!pdfDoc) return;
  document.getElementById('pdf-prev').disabled = pageNum <= 1;
  document.getElementById('pdf-next').disabled = pageNum >= pdfDoc.numPages;
}

function closePDFView() {
  const pdfView = document.getElementById('pdf-view');
  if (pdfView) pdfView.remove();
  document.removeEventListener('keydown', handlePDFKeys);
  pdfDoc = null; // Очищення пам'яті
}

function handlePDFKeys(e) {
  if (e.key === 'Escape') closePDFView();
  if (e.key === 'ArrowUp') onPrevPage();
  if (e.key === 'ArrowDown') onNextPage();
  if (e.key === '=' || e.key === '+') onZoom(0.25);
  if (e.key === '-') onZoom(-0.25);
}

/**
 * ════════════════════════════════════════════
 * ДОПОМІЖНІ ФУНКЦІЇ
 * ════════════════════════════════════════════
 */
function copyToClipboard(text, message = 'Скопійовано!') {
  navigator.clipboard.writeText(text).then(() => showTooltip(message));
}

function showTooltip(message, type = 'success') {
  document.querySelectorAll('.custom-tooltip').forEach(t => t.remove());
  const tooltip = document.createElement('div');
  tooltip.className = `custom-tooltip custom-tooltip--${type} animate-slide-in`;
  tooltip.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  document.body.appendChild(tooltip);
  setTimeout(() => {
    tooltip.classList.add('animate-fade-out');
    setTimeout(() => tooltip.remove(), 300);
  }, 2500);
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (progress) progress.style.width = scrolled + '%';
  });
}

function initScrollToTop() {
  const btn = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
