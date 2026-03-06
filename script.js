// --- 1. LOGIKA KURSOR SMOOTH ---
const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");
let mouseX = 0, mouseY = 0, outX = 0, outY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
});

function animateCursor() {
    outX += (mouseX - outX) * 0.15;
    outY += (mouseY - outY) * 0.15;
    const limit = 15;
    let dx = mouseX - outX, dy = mouseY - outY;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > limit) {
        const angle = Math.atan2(dy, dx);
        outX = mouseX - Math.cos(angle) * limit;
        outY = mouseY - Math.sin(angle) * limit;
    }
    outline.style.left = `${outX}px`;
    outline.style.top = `${outY}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// --- 2. LOGIKA DARK/LIGHT MODE ---
// HANYA ADA SATU DECLARATION DI SINI
const toggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            html.setAttribute('data-theme', 'light');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            html.setAttribute('data-theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });
}

// Pilih semua elemen yang ingin memicu efek pembesaran
const hoverItems = document.querySelectorAll('a, button, img, .project-card, .social-icon');

hoverItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        outline.classList.add('cursor-hover');
    });
    item.addEventListener('mouseleave', () => {
        outline.classList.remove('cursor-hover');
    });
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 1000); // Angka 1000 = loading muncul selama 1 detik
});

/*my education */
window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline');
    const dot = document.querySelector('.timeline-dot-progress');
    if (!timeline || !dot) return;

    const rect = timeline.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    // Hitung posisi titik putih di dalam jalur
    let progress = (viewHeight / 2 - rect.top) / rect.height;
    
    // Kunci progress antara 0% (awal) dan 100% (akhir timeline)
    progress = Math.max(0, Math.min(1, progress));

    dot.style.top = `${progress * 100}%`;
});