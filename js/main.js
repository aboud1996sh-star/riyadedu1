document.addEventListener('DOMContentLoaded', () => {
    initSiteContent();
    initMobileMenu();
    initSlider();
    initScrollAnimation();
});

function initSiteContent() {
    // تعبئة الاسم والشعار
    document.querySelectorAll('#nav-app-name, #footer-app-name, #copyright-name').forEach(el => {
        if (el) el.textContent = siteData.general.appName;
    });

    // تعبئة فيديو التطبيق
    const videoFrame = document.getElementById('app-video');
    if (videoFrame) {
        videoFrame.src = siteData.general.appVideoUrl;
    }

    // تعبئة وصف التطبيق
    const appDesc = document.getElementById('app-desc-text');
    if (appDesc) {
        appDesc.textContent = siteData.general.appDescription;
    }

    // زر التحميل
    const downloadContainer = document.getElementById('app-download-container');
    if (downloadContainer) {
        downloadContainer.innerHTML = `
            <a href="${siteData.general.appDownloadLink}" class="btn-apk-large" download>
                <i class="fa-brands fa-android" style="font-size: 2.5rem; color: #3DDC84;"></i>
                <div>
                    <span style="font-size: 0.8rem; display:block; opacity:0.8;">حمل الآن</span>
                    <strong style="font-size: 1.2rem;">تطبيق الأندرويد</strong>
                </div>
            </a>
        `;
    }

    // تعبئة معلومات الاتصال
    const contactContainer = document.getElementById('contact-info');
    if (contactContainer) {
        contactContainer.innerHTML = `
            <div class="info-item">
                <i class="fab fa-whatsapp"></i>
                <h3>واتساب</h3>
                <p><a href="https://wa.me/${siteData.general.contact.whatsapp.replace(/\+/g, '').replace(/ /g, '')}" target="_blank" dir="ltr" style="display:inline-block;">${siteData.general.contact.whatsapp}</a></p>
            </div>
            <div class="info-item">
                <i class="far fa-envelope"></i>
                <h3>البريد الإلكتروني</h3>
                <p><a href="mailto:${siteData.general.contact.email}">${siteData.general.contact.email}</a></p>
            </div>
            <div class="info-item">
                <i class="fab fa-telegram-plane"></i>
                <h3>تيليجرام</h3>
                <p><a href="${siteData.general.contact.telegramLink || '#'}" target="_blank">${siteData.general.contact.telegram}</a></p>
            </div>
        `;
    }
}

// --- Slider Logic ---
let currentSlide = 0;
let slideInterval;

function initSlider() {
    const sliderContainer = document.getElementById('hero-slider-container');
    const dotsContainer = document.getElementById('slider-dots');

    if (!sliderContainer) return;

    sliderContainer.innerHTML = siteData.heroSlides.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image}');">
            <div class="slide-content">
                <h1>${slide.title}</h1>
                <p>${slide.description}</p>
                <!-- Removed 'Browse Courses' button as per simplifiction -->
            </div>
        </div>
    `).join('');

    dotsContainer.innerHTML = siteData.heroSlides.map((_, index) => `
        <div class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>
    `).join('');

    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    startSlideTimer();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;

    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    resetSlideTimer();
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    resetSlideTimer();
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetSlideTimer();
}

function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
}

// --- Mobile Menu & Animations ---
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animateElements = document.querySelectorAll('.info-item, .section-title, .app-video-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}
