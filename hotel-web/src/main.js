const categoryDescs = {
    'first-hotel': 'Disfruta del máximo nivel de lujo con espacios amplios, vistas panorámicas inigualables y servicios exclusivos. Esta luminosa suite ha sido diseñada pensando en el confort absoluto y cuenta con mobiliario de alta gama y atención al detalle para aquellos que buscan una estancia perfecta.',
    'second-hotel': 'Un entorno espacioso, cómodo y refinado, perfecto para el descanso en compañía. Cuenta con iluminación natural optimizada, cama extra grande ergonómica, comodidades modernas y acabados de primera calidad en todo el recinto.',
    'third-hotel': 'Espacio optimizado y elegantemente estructurado, ideal para viajes de negocios o descansos individuales. Mantén la concentración con su zona de trabajo incorporada o relájate viendo la ciudad. Todo en un paquete eficiente y confortable.'
};

const galleryData = [
    { id: 'fh0', cat: 'first-hotel', title: 'Suite Premium 1', desc: categoryDescs['first-hotel'], src: '/img/first-hotel.webp' },
    { id: 'sh0', cat: 'second-hotel', title: 'Habitación Doble 1', desc: categoryDescs['second-hotel'], src: '/img/second-hotel.webp' },
    { id: 'th0', cat: 'third-hotel', title: 'Sencilla Business 1', desc: categoryDescs['third-hotel'], src: '/img/thrid-hotel.webp' },
    { id: 'fh1', cat: 'first-hotel', title: 'Suite Premium 2', desc: categoryDescs['first-hotel'], src: '/img/first-hotel-room.webp' },
    { id: 'sh1', cat: 'second-hotel', title: 'Habitación Doble 2', desc: categoryDescs['second-hotel'], src: '/img/second-hotel-pool.webp' },
    { id: 'th1', cat: 'third-hotel', title: 'Sencilla Business 2', desc: categoryDescs['third-hotel'], src: '/img/third-hotel-room.webp' },
    { id: 'fh2', cat: 'first-hotel', title: 'Suite Premium 3', desc: categoryDescs['first-hotel'], src: '/img/first-hotel-inside.webp' },
    { id: 'sh2', cat: 'second-hotel', title: 'Habitación Doble 3', desc: categoryDescs['second-hotel'], src: '/img/second-hotel-private-pool.webp' },
    { id: 'th2', cat: 'third-hotel', title: 'Sencilla Business 3', desc: categoryDescs['third-hotel'], src: '/img/third-hotel-room-big.webp' },
    { id: 'fh3', cat: 'first-hotel', title: 'Suite Premium 4', desc: categoryDescs['first-hotel'], src: '/img/first-hotel-checkin.webp' },
    { id: 'sh3', cat: 'second-hotel', title: 'Habitación Doble 4', desc: categoryDescs['second-hotel'], src: '/img/second-hotel-library.webp' },
    { id: 'th3', cat: 'third-hotel', title: 'Sencilla Business 4', desc: categoryDescs['third-hotel'], src: '/img/thrid-hotel.webp' }
];

document.addEventListener('DOMContentLoaded', () => {
    const $ = id => document.getElementById(id);
    $('current-year').textContent = new Date().getFullYear();

    const uiEls = [$('header-img'), $('header-overlay'), $('header-content'), $('play-btn')];
    const video = $('header-video');

    const toggleUI = (show) => {
        uiEls.forEach(el => {
            el.style.display = show ? '' : 'none';
            if (show) setTimeout(() => el.style.opacity = '1', 50);
        });
    };

    $('play-btn').addEventListener('click', () => {
        uiEls.forEach(el => el.style.opacity = '0');
        video.classList.remove('hidden');
        video.play().catch(() => {
            video.classList.add('hidden');
            toggleUI(true); // Fallback amigable si falla Auto-Play
        });
        setTimeout(() => { if (!video.paused) toggleUI(false); }, 500);
    });

    video.addEventListener('ended', () => {
        video.classList.add('hidden');
        toggleUI(true);
    });

    const modal = $('image-modal'), modalContent = $('modal-content'), carousel = $('modal-carousel');
    const mImg = $('modal-main-img'), mTitle = $('modal-title'), mDesc = $('modal-desc'), mBadge = $('modal-category-badge');
    let lastFocus;

    const updateModalInfo = (item) => {
        mBadge.textContent = item.cat.replace('-', ' ');
        mTitle.textContent = item.title;
        mDesc.textContent = item.desc;
        mImg.src = item.src;
        mImg.alt = `Vista de ${item.title}`;
    };

    const openModal = (item) => {
        lastFocus = document.activeElement;
        updateModalInfo(item);

        const catItems = galleryData.filter(i => i.cat === item.cat);
        carousel.innerHTML = catItems.map(i => `
            <button class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer snap-start focus:ring-2 ${i.id === item.id ? 'border-brand-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}">
                <img src="${i.src}" alt="${i.title}" class="w-full h-full object-cover">
            </button>
        `).join('');

        carousel.querySelectorAll('button').forEach((btn, idx) => {
            btn.onclick = () => {
                updateModalInfo(catItems[idx]);
                carousel.querySelectorAll('button').forEach(b => b.className = b.className.replace('border-brand-primary opacity-100', 'border-transparent opacity-60'));
                btn.className = btn.className.replace('border-transparent opacity-60 hover:opacity-100', 'border-brand-primary opacity-100');
            };
        });

        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        modalContent.classList.replace('scale-95', 'scale-100');
        $('close-modal').focus();
    };

    const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContent.classList.replace('scale-100', 'scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            if (lastFocus) lastFocus.focus();
        }, 300);
    };

    galleryData.forEach(item => {
        const article = document.createElement('article');
        article.className = 'group cursor-pointer rounded-xl bg-brand-surface border border-brand-muted/20 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl focus-within:ring-4 focus-within:ring-brand-primary h-full overflow-hidden relative';
        article.tabIndex = 0;
        article.ariaLabel = item.title;
        article.innerHTML = `
            <div class="h-64 sm:h-56 md:h-64 w-full">
                <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" decoding="async">
                <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-bg to-transparent p-4 flex flex-col justify-end pt-12">
                    <span class="text-xs font-bold uppercase text-brand-primary mb-1">${item.cat.replace('-', ' ')}</span>
                    <h3 class="text-lg md:text-xl font-bold text-brand-text leading-tight">${item.title}</h3>
                </div>
            </div>`;
        article.onclick = () => openModal(item);
        article.onkeydown = e => ['Enter', ' '].includes(e.key) && (e.preventDefault(), openModal(item));
        $('gallery-grid').appendChild(article);
    });

    $('close-modal').onclick = closeModal;
    modal.onclick = e => e.target === modal && closeModal();
    document.addEventListener('keydown', e => e.key === 'Escape' && !modal.classList.contains('hidden') && closeModal());

    // Focus trap: Lógica estricta de accesibilidad WCAG para encerrar navegación por teclado dentro de modales abiertos
    modal.onkeydown = e => {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (e.key === 'Tab' && focusable.length) {
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
            else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
        }
    };
});
