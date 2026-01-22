// Project Data
const projects = {
    'working-1': {
        title: 'Церква в Карпатах',
        category: 'Робочий проект / Культова споруда',
        description: 'Проект церкви в Карпатському регіоні. Робота включала розробку архітектурної концепції, деталізацію фасадів та підготовку повного пакету креслень.',
        images: ['assets/images/Церква.png'],
        drawings: 'assets/documents/Церква.pdf'
    },
    'working-2': {
        title: 'ЖК Васильєва',
        category: 'Робочий проект / Житлова забудова',
        description: 'Розробка робочої документації для житлового комплексу. Фокус на функціональності планувань та відповідності будівельним нормам.',
        images: [],
        drawings: 'assets/documents/ЖК Васильева.pdf'
    },
    'working-3': {
        title: 'ЖК Лісові гринівці',
        category: 'Робочий проект / BIM моделювання',
        description: 'Комплексний проект житлового комплексу з використанням BIM технологій. Створення інформаційної моделі будівлі для оптимізації процесів будівництва.',
        images: [],
        drawings: 'assets/documents/ЖК Лісові гринівці.pdf',
        bimx: 'assets/bim/ЖК Лісові гринівці.bimx'
    },
    'conc-1': {
        title: 'Стадіон в м. Тернопіль',
        category: 'Концептуальний проект / Громадська споруда',
        description: 'Концепція сучасного стадіону з акцентом на ергономіку та інтеграцію в міське середовище.',
        images: [],
        drawings: 'assets/documents/Стадіон.pdf'
    },
    'conc-2': {
        title: 'Генеральний план ЖК в м. Вінниця',
        category: 'Концептуальний проект / Містобудування',
        description: 'Розробка генерального плану житлового комплексу з врахуванням ландшафту та створення комфортного пішохідного середовища.',
        images: [],
        drawings: 'assets/documents/ГП.pdf'
    },
    'conc-3': {
        title: 'Однородинний будинок',
        category: 'Концептуальний проект / Приватне житло',
        description: 'Сучасний однородинний будинок з панорамним склінням та відкритим плануванням.',
        images: ['assets/images/Однородинний.png'],
        drawings: 'assets/documents/Однородинний.pdf'
    },
    'conc-4': {
        title: 'Модульний будинок Maxi',
        category: 'Концептуальний проект / Модульне будівництво',
        description: 'Проект енергоефективного модульного будинку великої площі. Швидке зведення та висока якість матеріалів.',
        images: ['assets/images/Maxi.png'],
        drawings: 'assets/documents/Maxi.pdf'
    },
    'conc-5': {
        title: 'Модульний будинок Mini',
        category: 'Концептуальний проект / Модульне будівництво',
        description: 'Компактний модульний будинок для відпочинку або гостьового проживання.',
        images: ['assets/images/Mini.png'],
        drawings: 'assets/documents/Mini.pdf'
    },
    'conc-6': {
        title: 'Модульний офіс',
        category: 'Концептуальний проект / Комерційна архітектура',
        description: 'Сучасний простір для роботи, що може бути легко адаптований під різні потреби бізнесу.',
        images: ['assets/images/Офіс.png'],
        drawings: 'assets/documents/Офіс.pdf'
    },
    'conc-7': {
        title: 'Господарський будиночок',
        category: 'Концептуальний проект / Мала архітектурна форма',
        description: 'Естетична та функціональна господарська споруда, що доповнює основний ансамбль забудови.',
        images: ['assets/images/Госп.буд.png'],
        drawings: 'assets/documents/Госп.буд.pdf'
    },
    'conc-8': {
        title: 'Котедж',
        category: 'Концептуальний проект / Приватне житло',
        description: 'Детально опрацьований проект котеджу, що включає інтер\'єрні рішення та детальні конструктивні схеми.',
        images: [
            'assets/images/Котедж.png',
            'assets/images/Вид_1.png',
            'assets/images/Вид_2.png'
        ],
        drawings: 'assets/documents/Котедж.pdf',
        schemes: [
            'assets/images/3д.png',
            'assets/images/План.png'
        ]
    }
};

let currentGalleryImages = [];
let currentImageIndex = 0;

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'bg-white/95');
        navbar.classList.remove('bg-white/80');
    } else {
        navbar.classList.remove('shadow-lg', 'bg-white/95');
        navbar.classList.add('bg-white/80');
    }
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuButton.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Portfolio Switching
function switchPortfolio(category) {
    const workingGrid = document.getElementById('grid-working');
    const conceptualGrid = document.getElementById('grid-conceptual');
    const workingTab = document.getElementById('tab-working');
    const conceptualTab = document.getElementById('tab-conceptual');

    if (category === 'working') {
        workingGrid.classList.remove('hidden');
        conceptualGrid.classList.add('hidden');
        workingTab.classList.add('bg-white', 'shadow-sm', 'text-accent');
        workingTab.classList.remove('text-slate-500');
        conceptualTab.classList.remove('bg-white', 'shadow-sm', 'text-accent');
        conceptualTab.classList.add('text-slate-500');
    } else {
        workingGrid.classList.add('hidden');
        conceptualGrid.classList.remove('hidden');
        conceptualTab.classList.add('bg-white', 'shadow-sm', 'text-accent');
        conceptualTab.classList.remove('text-slate-500');
        workingTab.classList.remove('bg-white', 'shadow-sm', 'text-accent');
        workingTab.classList.add('text-slate-500');
    }
}

// Modal Logic
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalImg = document.getElementById('modal-img-main');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-description');
const modalFiles = document.getElementById('modal-files');
const galleryNav = document.getElementById('gallery-nav');

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    modalTitle.innerText = project.title;
    modalCategory.innerText = project.category;
    modalDesc.innerText = project.description;

    // Reset Gallery
    currentGalleryImages = project.images;
    currentImageIndex = 0;
    
    if (currentGalleryImages.length > 0) {
        modalImg.src = currentGalleryImages[0];
        modalImg.classList.remove('hidden');
        if (currentGalleryImages.length > 1) {
            galleryNav.classList.remove('hidden');
            galleryNav.classList.add('flex');
        } else {
            galleryNav.classList.add('hidden');
            galleryNav.classList.remove('flex');
        }
    } else {
        modalImg.classList.add('hidden');
        galleryNav.classList.add('hidden');
        galleryNav.classList.remove('flex');
    }

    // Populate Actions (View buttons instead of just downloads)
    modalFiles.innerHTML = '';
    
    // PDF Drawing View Button
    if (project.drawings) {
        const btn = document.createElement('button');
        btn.className = 'flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all group';
        btn.onclick = () => openPDFViewer(project.drawings, project.title);
        btn.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-drafting-compass text-accent text-xl"></i>
                <span class="font-medium text-slate-700">📐 Переглянути креслення</span>
            </div>
            <i class="fas fa-external-link-alt text-slate-300 group-hover:text-accent transition-colors"></i>
        `;
        modalFiles.appendChild(btn);
    }

    // Schemes View Button (Specific for Cottage)
    if (project.schemes) {
        const btn = document.createElement('button');
        btn.className = 'flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all group mt-2';
        btn.onclick = () => openSchemeViewer(project.schemes, project.title);
        btn.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-chart-area text-accent text-xl"></i>
                <span class="font-medium text-slate-700">📊 Переглянути схеми</span>
            </div>
            <i class="fas fa-layer-group text-slate-300 group-hover:text-accent transition-colors"></i>
        `;
        modalFiles.appendChild(btn);
    }

    // BIMX/3D View Button
    if (project.bimx) {
        const btn = document.createElement('button');
        btn.className = 'flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all group mt-2';
        btn.onclick = () => open3DViewer(project.bimx, project.title);
        btn.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-cube text-accent text-xl"></i>
                <span class="font-medium text-slate-700">🏗️ Переглянути 3D модель</span>
            </div>
            <i class="fas fa-vr-cardboard text-slate-300 group-hover:text-accent transition-colors"></i>
        `;
        modalFiles.appendChild(btn);
    }

    // Show Modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.add('show');
        modalContent.classList.remove('opacity-0', 'translate-y-4');
    }, 10);
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeModal() {
    modalContent.classList.remove('show');
    modalContent.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// PDF Viewer
function openPDFViewer(pdfPath, projectName) {
  const viewer = document.createElement('div');
  viewer.className = 'fixed inset-0 bg-slate-900/95 z-[200] flex items-center justify-center p-4 animate-fade-in';
  viewer.innerHTML = `
    <div class="bg-white rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden shadow-2xl transform transition-all">
      <div class="flex justify-between items-center p-6 border-b border-slate-100">
        <div>
            <h3 class="text-xl font-bold text-slate-900">${projectName}</h3>
            <p class="text-xs text-slate-500 uppercase tracking-widest font-bold">Архітектурні креслення</p>
        </div>
        <button onclick="this.closest('.fixed').remove()" 
                class="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
          <i class="fas fa-times text-slate-500"></i>
        </button>
      </div>
      <iframe src="${pdfPath}" 
              class="flex-1 w-full bg-slate-50" 
              frameborder="0">
      </iframe>
      <div class="p-6 border-t border-slate-100 flex justify-end gap-4 bg-slate-50/50">
        <a href="${pdfPath}" 
           download 
           class="px-6 py-3 bg-accent text-white rounded-full font-bold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-accent/20">
          <i class="fas fa-download text-sm"></i> Завантажити PDF
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(viewer);
}

// Scheme Viewer (Gallery for PNG schemes)
function openSchemeViewer(schemes, projectName) {
    let index = 0;
    const viewer = document.createElement('div');
    viewer.className = 'fixed inset-0 bg-slate-900/95 z-[200] flex items-center justify-center p-4 animate-fade-in';
    
    const updateImage = () => {
        viewer.querySelector('#scheme-img').src = schemes[index];
        viewer.querySelector('#scheme-counter').innerText = `${index + 1} / ${schemes.length}`;
    };

    viewer.innerHTML = `
      <div class="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div class="flex justify-between items-center p-6 border-b border-slate-100">
          <div>
              <h3 class="text-xl font-bold text-slate-900">${projectName}</h3>
              <p class="text-xs text-slate-500 uppercase tracking-widest font-bold">Схеми та плани</p>
          </div>
          <div class="flex items-center gap-6">
              <span id="scheme-counter" class="text-sm font-bold text-slate-400">1 / ${schemes.length}</span>
              <button onclick="this.closest('.fixed').remove()" 
                      class="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
                <i class="fas fa-times text-slate-500"></i>
              </button>
          </div>
        </div>
        <div class="flex-1 bg-slate-100 flex items-center justify-center relative overflow-hidden p-8">
            <button id="prev-scheme" class="absolute left-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all z-10">
                <i class="fas fa-chevron-left text-slate-800"></i>
            </button>
            <img id="scheme-img" src="${schemes[0]}" class="max-w-full max-h-full object-contain rounded-lg shadow-sm">
            <button id="next-scheme" class="absolute right-6 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all z-10">
                <i class="fas fa-chevron-right text-slate-800"></i>
            </button>
        </div>
      </div>
    `;

    viewer.querySelector('#next-scheme').onclick = () => {
        index = (index + 1) % schemes.length;
        updateImage();
    };
    viewer.querySelector('#prev-scheme').onclick = () => {
        index = (index - 1 + schemes.length) % schemes.length;
        updateImage();
    };

    document.body.appendChild(viewer);
}

// 3D Viewer Placeholder/Message
function open3DViewer(bimxPath, projectName) {
    const viewer = document.createElement('div');
    viewer.className = 'fixed inset-0 bg-slate-900/95 z-[200] flex items-center justify-center p-4 animate-fade-in';
    viewer.innerHTML = `
      <div class="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-12 text-center">
        <div class="w-24 h-24 bg-blue-100 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
            <i class="fas fa-cube text-5xl"></i>
        </div>
        <h3 class="text-3xl font-bold text-slate-900 mb-4">${projectName}</h3>
        <p class="text-slate-600 text-lg mb-8 leading-relaxed">
            3D модель доступна для перегляду. Для повного функціоналу та найкращого досвіду рекомендуємо використовувати <strong>BIMx Viewer</strong>.
        </p>
        <div class="flex flex-col gap-4">
            <a href="${bimxPath}" download class="w-full py-4 bg-accent text-white rounded-full font-bold hover:bg-blue-800 transition-all shadow-lg shadow-accent/20">
                📥 Завантажити BIMx модель
            </a>
            <button onclick="this.closest('.fixed').remove()" class="w-full py-4 border-2 border-slate-100 text-slate-500 rounded-full font-bold hover:bg-slate-50 transition-all">
                Закрити
            </button>
        </div>
        <p class="mt-6 text-xs text-slate-400">
            *Для перегляду .bimx файлів на мобільних пристроях або ПК встановіть безкоштовний додаток Graphisoft BIMx.
        </p>
      </div>
    `;
    document.body.appendChild(viewer);
}

// Copy to Clipboard with Tooltip
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const tooltip = document.createElement('div');
    tooltip.className = 'fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl z-[300] font-bold flex items-center gap-3 animate-fade-in-up';
    tooltip.innerHTML = `<i class="fas fa-check-circle"></i> Номер скопійовано!`;
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => tooltip.remove(), 500);
    }, 2000);
  }).catch(err => {
    console.error('Помилка копіювання:', err);
  });
}

// Gallery Navigation
document.getElementById('next-img').addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    modalImg.src = currentGalleryImages[currentImageIndex];
});

document.getElementById('prev-img').addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    modalImg.src = currentGalleryImages[currentImageIndex];
});

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    revealObserver.observe(el);
});

// Lazy Loading Enhancement
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img[loading='lazy']"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.classList.add("lazy-loaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
