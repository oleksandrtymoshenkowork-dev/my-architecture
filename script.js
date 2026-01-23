/**
 * ════════════════════════════════════════════════════════════════
 * ГЛОБАЛЬНЫЕ НАСТРОЙКИ И ИНИЦИАЛИЗАЦИЯ
 * ════════════════════════════════════════════════════════════════
 */

const projectsData = [
    {
        title: "Стадіон (Тернопіль)",
        type: "Концептуальний проект",
        images: ["assets/images/Стадіон.png"],
        pdf: "assets/documents/Стадіон.pdf",
        category: "conceptual"
    },
    {
        title: "Генплан ЖК (Вінниця)",
        type: "Концептуальний проект",
        images: ["assets/images/ГП.png"],
        pdf: "assets/documents/ГП.pdf",
        category: "conceptual"
    },
    {
        title: "Однородинний будинок",
        type: "Концептуальний проект",
        images: ["assets/images/Однородинний.png"],
        pdf: "assets/documents/Однородинний.pdf",
        category: "conceptual"
    },
    {
        title: "Модульний будинок Maxi",
        type: "Концептуальний проект",
        images: ["assets/images/Maxi.png"],
        pdf: "assets/documents/Maxi.pdf",
        category: "conceptual"
    },
    {
        title: "Модульний будинок Mini",
        type: "Концептуальний проект",
        images: ["assets/images/Mini.png"],
        pdf: "assets/documents/Mini.pdf",
        category: "conceptual"
    },
    {
        title: "Модульний офіс",
        type: "Концептуальний проект",
        images: ["assets/images/Офіс.png"],
        pdf: "assets/documents/Офіс.pdf",
        category: "conceptual"
    },
    {
        title: "Господарський будиночок",
        type: "Концептуальний проект",
        images: ["assets/images/Госп.буд.png"],
        pdf: "assets/documents/Госп.буд.pdf",
        category: "conceptual"
    },
    {
        title: "Котедж",
        type: "Концептуальний проект • Розширена візуалізація",
        images: [
            "assets/images/Котедж.png",
            "assets/images/Вид_1.png",
            "assets/images/Вид_2.png",
            "assets/images/3д.png",
            "assets/images/План.png"
        ],
        pdf: "assets/documents/Котедж.pdf",
        category: "conceptual"
    },
    {
        title: "Церква в Карпатах",
        type: "Робочий проект",
        images: ["assets/images/Церква.png"],
        pdf: "assets/documents/Церква.pdf",
        category: "working"
    },
    {
        title: "ЖК Васильєва",
        type: "Робочий проект",
        images: ["assets/images/ЖК Васильева.png"],
        pdf: "assets/documents/ЖК Васильєва.pdf",
        category: "working"
    },
    {
        title: "ЖК Лісові гринівці",
        type: "Робочий проект",
        images: ["assets/images/ЖК Лісові гринівці.png"],
        pdf: "assets/documents/ЖК Лісові гринівці.pdf",
        category: "working"
    }
];

let currentProjectIndex = 0;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initScrollProgress();
    initScrollToTop();
    filterProjects('all');
});

/**
 * ════════════════════════════════════════════════════════════════
 * НАВИГАЦИЯ И МЕНЮ
 * ════════════════════════════════════════════════════════════════
 */

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

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

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
 * ПОРТФОЛИО И ФИЛЬТРАЦИЯ
 * ════════════════════════════════════════════════════════════════
 */

function filterProjects(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active', 'bg-accent', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-600');
        } else {
            btn.classList.remove('active', 'bg-accent', 'text-white');
            btn.classList.add('bg-white', 'text-slate-600');
        }
    });
    
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            project.classList.add('animate-fade-in');
        } else {
            project.style.display = 'none';
        }
    });
}

/**
 * ════════════════════════════════════════════════════════════════
 * ОБЪЕДИНЕННЫЙ ПРОСМОТРЩИК ПРОЕКТОВ (MODAL)
 * ════════════════════════════════════════════════════════════════
 */

function openProject(index) {
    currentProjectIndex = index;
    currentImageIndex = 0;
    renderProjectModal();
}

function renderProjectModal() {
    const project = projectsData[currentProjectIndex];
    const modal = document.getElementById('main-modal');
    const container = document.getElementById('modal-container');
    
    const hasImages = project.images && project.images.length > 0;
    const isGallery = project.images && project.images.length > 1;

    // Путь к текущему изображению (энкодим для корректной работы с кириллицей)
    const rawImgPath = hasImages ? project.images[currentImageIndex] : '';
    const currentImgPath = encodeURI(rawImgPath);
    
    // Специальная обработка для План.png - заставляем его вписываться полностью
    const isPlan = rawImgPath.includes('План.png');

    container.innerHTML = `
        <div class="bg-slate-900 rounded-[2rem] w-full h-[95vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up border border-white/10 relative">
            
            <!-- Шапка -->
            <div class="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900/80 backdrop-blur z-20">
                <div class="text-white">
                    <h3 class="text-xl font-bold">${project.title}</h3>
                    <p class="text-xs text-blue-400 font-bold uppercase tracking-widest mt-1">${project.type}</p>
                </div>
                <div class="flex items-center gap-4">
                    ${project.pdf ? `
                        <button onclick="openPDFInsideModal('${encodeURI(project.pdf)}')" class="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 border border-blue-400 shadow-lg shadow-blue-900/40">
                            <i class="fas fa-file-pdf text-lg"></i> Креслення
                        </button>
                    ` : ''}
                    <button onclick="closeMainModal()" class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <!-- Контент (Изображение или Заглушка) -->
            <div class="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
                <!-- Кнопки Навигации по Проектам -->
                <button onclick="prevProject(event)" class="absolute left-4 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all flex items-center justify-center z-30 backdrop-blur border border-white/10">
                    <i class="fas fa-chevron-left text-xl"></i>
                </button>
                
                <div id="project-media-container" class="w-full h-full flex items-center justify-center animate-fade-in">
                    ${hasImages ? `
                        <img src="${currentImgPath}" 
                             class="${isPlan ? 'max-w-full max-h-full object-contain' : 'max-w-full max-h-full object-contain'} rounded-lg shadow-2xl transition-all duration-500" 
                             style="${isPlan ? 'transform: scale(0.9);' : ''}"
                             id="main-project-image">
                    ` : `
                        <div class="text-center text-slate-500">
                            <i class="fas fa-camera-retro text-6xl mb-4 opacity-20"></i>
                            <p class="font-bold uppercase tracking-widest">Візуалізація в процесі</p>
                            ${project.pdf ? `<p class="text-xs mt-2">Ви можете переглянути креслення проекту</p>` : ''}
                        </div>
                    `}
                </div>

                <button onclick="nextProject(event)" class="absolute right-4 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full text-white transition-all flex items-center justify-center z-30 backdrop-blur border border-white/10">
                    <i class="fas fa-chevron-right text-xl"></i>
                </button>
                
                <!-- Навигация внутри галереи (если много фото) -->
                ${isGallery ? `
                    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30 bg-black/40 px-6 py-3 rounded-full backdrop-blur border border-white/10">
                        <button onclick="prevImage(event)" class="text-white hover:text-blue-400 transition-colors"><i class="fas fa-arrow-left"></i></button>
                        <span class="text-white text-xs font-bold min-w-[60px] text-center">${currentImageIndex + 1} / ${project.images.length}</span>
                        <button onclick="nextImage(event)" class="text-white hover:text-blue-400 transition-colors"><i class="fas fa-arrow-right"></i></button>
                    </div>
                ` : ''}
            </div>

            <!-- Миниатюры для галереи -->
            ${isGallery ? `
                <div class="p-6 bg-slate-950/50 flex justify-center gap-3 overflow-x-auto border-t border-white/5">
                    ${project.images.map((img, idx) => `
                        <div onclick="setProjectImage(${idx})" class="w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${idx === currentImageIndex ? 'border-blue-400 scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}">
                            <img src="${encodeURI(img)}" class="w-full h-full object-cover">
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleGlobalKeys);
}

/**
 * Функции управления модальным окном
 */

function prevProject(e) {
    if (e) e.stopPropagation();
    currentProjectIndex = (currentProjectIndex - 1 + projectsData.length) % projectsData.length;
    currentImageIndex = 0;
    renderProjectModal();
}

function nextProject(e) {
    if (e) e.stopPropagation();
    currentProjectIndex = (currentProjectIndex + 1) % projectsData.length;
    currentImageIndex = 0;
    renderProjectModal();
}

function prevImage(e) {
    if (e) e.stopPropagation();
    const project = projectsData[currentProjectIndex];
    currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    renderProjectModal();
}

function nextImage(e) {
    if (e) e.stopPropagation();
    const project = projectsData[currentProjectIndex];
    currentImageIndex = (currentImageIndex + 1) % project.images.length;
    renderProjectModal();
}

function setProjectImage(idx) {
    currentImageIndex = idx;
    renderProjectModal();
}

function openPDFInsideModal(path) {
    const project = projectsData[currentProjectIndex];
    const container = document.getElementById('modal-container');
    
    // Временная замена контента на PDF фрейм
    container.innerHTML = `
        <div class="bg-white rounded-[2rem] w-full h-[95vh] flex flex-col overflow-hidden shadow-2xl">
            <div class="flex justify-between items-center p-6 border-b bg-slate-50">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                        <i class="fas fa-file-pdf text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-900">${project.title}</h3>
                        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">Архітектурні креслення</p>
                    </div>
                </div>
                <button onclick="renderProjectModal()" class="w-12 h-12 bg-slate-200 hover:bg-slate-300 rounded-xl flex items-center justify-center transition-all text-slate-600">
                    <i class="fas fa-arrow-left mr-2"></i> Назад
                </button>
            </div>
            <div class="flex-1">
                <iframe src="${path}#view=FitH&toolbar=0&navpanes=0" class="w-full h-full border-none"></iframe>
            </div>
        </div>
    `;
}

function closeMainModal() {
    const modal = document.getElementById('main-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleGlobalKeys);
}

function handleGlobalKeys(e) {
    if (e.key === 'Escape') closeMainModal();
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft') prevProject();
}

/**
 * ════════════════════════════════════════════════════════════════
 * ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (SCROLL & COPY)
 * ════════════════════════════════════════════════════════════════
 */

function copyToClipboard(text, message = 'Скопійовано!') {
    navigator.clipboard.writeText(text).then(() => showTooltip(message));
}

function showTooltip(message, type = 'success') {
    const old = document.querySelectorAll('.custom-tooltip');
    old.forEach(t => t.remove());

    const tooltip = document.createElement('div');
    tooltip.className = `fixed top-6 right-6 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-8 py-4 rounded-2xl shadow-2xl z-[200] font-bold flex items-center gap-3 animate-fade-in custom-tooltip`;
    tooltip.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(tooltip);
    setTimeout(() => { tooltip.classList.add('animate-fade-out'); setTimeout(() => tooltip.remove(), 300); }, 2500);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = "1";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = "0";
        observer.observe(el);
    });
}

function initScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (progress) progress.style.width = scrolled + "%";
    });
}

function initScrollToTop() {
    const btn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        else btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    });
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}
