/**
 * ════════════════════════════════════════════════════════════════
 * ГЛОБАЛЬНЫЕ НАСТРОЙКИ И ИНИЦИАЛИЗАЦИЯ
 * ════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация всех функций при загрузке страницы
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initScrollProgress();
    initScrollToTop();
    
    // По умолчанию показываем все проекты
    filterProjects('all');
});

/**
 * ════════════════════════════════════════════════════════════════
 * НАВИГАЦИЯ И МЕНЮ
 * ════════════════════════════════════════════════════════════════
 */

// Эффекты навигационной панели при прокрутке
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-white/95', 'py-1');
            navbar.classList.remove('bg-white/80', 'py-0');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white/95', 'py-1');
            navbar.classList.add('bg-white/80', 'py-0');
        }
    });
}

// Управление мобильным меню
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

/**
 * ════════════════════════════════════════════════════════════════
 * ФУНКЦИИ КОПИРОВАНИЯ И УВЕДОМЛЕНИЙ
 * ════════════════════════════════════════════════════════════════
 */

/**
 * Копирует текст в буфер обмена и показывает уведомление
 * @param {string} text - Текст для копирования
 * @param {string} message - Сообщение для показа пользователю
 */
function copyToClipboard(text, message = 'Скопійовано!') {
    // Используем современный Clipboard API
    navigator.clipboard.writeText(text).then(() => {
        showTooltip(message);
    }).catch(err => {
        console.error('Помилка копіювання:', err);
        showTooltip('Помилка копіювання', 'error');
    });
}

/**
 * Показывает всплывающее уведомление в углу экрана
 */
function showTooltip(message, type = 'success') {
    // Удаляем старые уведомления, если они есть
    const oldTooltips = document.querySelectorAll('.custom-tooltip');
    oldTooltips.forEach(t => t.remove());

    const tooltip = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    // Стилизуем уведомление
    tooltip.className = `fixed top-6 right-6 ${bgColor} text-white px-8 py-4 rounded-2xl shadow-2xl z-[200] font-bold flex items-center gap-3 animate-fade-in custom-tooltip`;
    tooltip.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    
    document.body.appendChild(tooltip);
    
    // Удаляем уведомление через 2.5 секунды
    setTimeout(() => {
        tooltip.classList.add('animate-fade-out');
        setTimeout(() => tooltip.remove(), 300);
    }, 2500);
}

/**
 * ════════════════════════════════════════════════════════════════
 * ПОРТФОЛИО И ФИЛЬТРАЦИЯ
 * ════════════════════════════════════════════════════════════════
 */

/**
 * Фильтрует карточки проектов по категориям
 * @param {string} category - 'all', 'conceptual', 'working'
 */
function filterProjects(category) {
    // Находим все кнопки фильтров
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Сбрасываем и обновляем активное состояние кнопок
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active', 'bg-accent', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-600');
        } else {
            btn.classList.remove('active', 'bg-accent', 'text-white');
            btn.classList.add('bg-white', 'text-slate-600');
        }
    });
    
    // Показываем или скрываем карточки проектов
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        
        if (category === 'all') {
            project.style.display = 'block';
            project.classList.add('animate-fade-in');
        } else {
            if (projectCategory === category) {
                project.style.display = 'block';
                project.classList.add('animate-fade-in');
            } else {
                project.style.display = 'none';
                project.classList.remove('animate-fade-in');
            }
        }
    });
}

/**
 * ════════════════════════════════════════════════════════════════
 * МОДАЛЬНЫЕ ОКНА И ПРОСМОТР PDF
 * ════════════════════════════════════════════════════════════════
 */

/**
 * Открывает просмотрщик изображений
 */
function openImageLightbox(imagePath, projectName) {
    const modal = document.getElementById('main-modal');
    const container = document.getElementById('modal-container');
    
    container.innerHTML = `
        <div class="bg-slate-900 rounded-[2rem] w-full h-[95vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up border border-white/10">
            <div class="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur">
                <div class="text-white">
                    <h3 class="text-xl font-bold">${projectName}</h3>
                    <p class="text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">Перегляд зображення</p>
                </div>
                <button onclick="closeMainModal()" class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all text-white">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="flex-1 relative flex items-center justify-center p-4 overflow-auto">
                <img src="${imagePath}" alt="${projectName}" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl">
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Открывает улучшенный просмотрщик PDF
 */
function openPDFViewer(pdfPath, projectName) {
    const modal = document.getElementById('main-modal');
    const container = document.getElementById('modal-container');
    
    // Очищаем и создаем структуру просмотрщика (БЕЗ КНОПОК ЗАГРУЗКИ)
    container.innerHTML = `
        <div class="bg-white rounded-[2rem] w-full h-[95vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up">
            <!-- Шапка окна -->
            <div class="flex justify-between items-center p-6 border-b bg-slate-50">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                        <i class="fas fa-file-pdf text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-900">${projectName}</h3>
                        <p class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Архітектурні креслення</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="closeMainModal()" class="w-12 h-12 bg-slate-200 hover:bg-slate-300 rounded-xl flex items-center justify-center transition-all text-slate-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <!-- Фрейм с PDF -->
            <div class="flex-1 bg-slate-200 relative">
                <iframe src="${pdfPath}#view=FitH&toolbar=0&navpanes=0" class="w-full h-full border-none" title="${projectName}"></iframe>
                <!-- Заглушка загрузки -->
                <div class="absolute inset-0 -z-10 flex items-center justify-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * ════════════════════════════════════════════════════════════════
 * ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ (КОТЕДЖ)
 * ════════════════════════════════════════════════════════════════
 */

function openCottageGallery() {
    const images = [
        { src: 'assets/images/Котедж.png', title: 'Екстер\'єр - Головний вид' },
        { src: 'assets/images/Вид_1.png', title: 'Вид з саду' },
        { src: 'assets/images/Вид_2.png', title: 'Нічна візуалізація' },
        { src: 'assets/images/3д.png', title: 'Конструктивна схема' },
        { src: 'assets/images/План.png', title: 'Планування поверху' }
    ];
    
    let currentIndex = 0;
    const modal = document.getElementById('main-modal');
    const container = document.getElementById('modal-container');
    
    const renderGallery = () => {
        container.innerHTML = `
            <div class="bg-slate-900 rounded-[2rem] w-full h-[95vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up border border-white/10">
                <!-- Шапка галереи -->
                <div class="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur">
                    <div class="text-white">
                        <h3 class="text-xl font-bold">${images[currentIndex].title}</h3>
                        <p class="text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">Проект: Котедж | Фото ${currentIndex + 1} з ${images.length}</p>
                    </div>
                    <button onclick="closeMainModal()" class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <!-- Основное изображение с навигацией -->
                <div class="flex-1 relative flex items-center justify-center p-4">
                    <button id="gallery-prev" class="absolute left-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all flex items-center justify-center z-10 backdrop-blur">
                        <i class="fas fa-chevron-left text-2xl"></i>
                    </button>
                    
                    <img src="${images[currentIndex].src}" alt="${images[currentIndex].title}" class="max-w-full max-h-full object-contain rounded-lg gallery-main-image">
                    
                    <button id="gallery-next" class="absolute right-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all flex items-center justify-center z-10 backdrop-blur">
                        <i class="fas fa-chevron-right text-2xl"></i>
                    </button>
                </div>
                
                <!-- Миниатюры -->
                <div class="p-6 bg-slate-950/50 flex justify-center gap-4 overflow-x-auto">
                    ${images.map((img, idx) => `
                        <div onclick="setGalleryIndex(${idx})" class="w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${idx === currentIndex ? 'border-blue-400 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}">
                            <img src="${img.src}" class="w-full h-full object-cover">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Переназначаем события для кнопок
        document.getElementById('gallery-prev').onclick = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            renderGallery();
        };
        document.getElementById('gallery-next').onclick = () => {
            currentIndex = (currentIndex + 1) % images.length;
            renderGallery();
        };
    };

    // Глобальная функция для смены индекса из миниатюр
    window.setGalleryIndex = (idx) => {
        currentIndex = idx;
        renderGallery();
    };

    renderGallery();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Навигация стрелками клавиатуры
    const handleKeyboard = (e) => {
        if (e.key === 'ArrowLeft') document.getElementById('gallery-prev').click();
        if (e.key === 'ArrowRight') document.getElementById('gallery-next').click();
        if (e.key === 'Escape') closeMainModal();
    };
    document.addEventListener('keydown', handleKeyboard);
    
    // Сохраняем обработчик для удаления
    window.currentGalleryHandler = handleKeyboard;
}

/**
 * ════════════════════════════════════════════════════════════════
 * ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
 * ════════════════════════════════════════════════════════════════
 */

function closeMainModal() {
    const modal = document.getElementById('main-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Очищаем события клавиатуры
    document.removeEventListener('keydown', handleEscapeKey);
    if (window.currentGalleryHandler) {
        document.removeEventListener('keydown', window.currentGalleryHandler);
        window.currentGalleryHandler = null;
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') closeMainModal();
}

// Анимации при прокрутке (Scroll Reveal)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = "0"; // Начальное состояние
        observer.observe(el);
    });
}

// Прогресс-бар прокрутки
function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        if (progress) progress.style.width = scrolled + "%";
    });
}

// Кнопка "Вверх"
function initScrollToTop() {
    const btn = document.getElementById('scroll-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            btn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
            btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            btn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
