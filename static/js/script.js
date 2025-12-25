/**
 * PORTFOLIO SCRIPTS
 * Organized by: Global Init, Navigation/Theme, UI Components, Sliders, and Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GLOBAL INITIALIZATION ---
    AOS.init({ duration: 1000, once: true });

    // --- 2. NAVIGATION & THEME ---
    const menu = document.querySelector('#mobile-menu');
    const navAside = document.querySelector('#nav-aside');
    const navbar = document.querySelector('#navbar');
    const checkbox = document.querySelector('#checkbox'); // Checkbox theme toggle
    const themeBtn = document.getElementById('themeBtn'); // Button theme toggle
    const body = document.body;

    // Mobile Menu Toggle
    if (menu) {
        menu.onclick = () => {
            menu.classList.toggle('active');
            navAside.classList.toggle('active');
        };
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Unified Theme Logic
    const toggleTheme = (isLight) => {
        if (isLight) {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    };

    if (checkbox) checkbox.onchange = (e) => toggleTheme(e.target.checked);

    if (themeBtn) {
        const btnIcon = themeBtn.querySelector('i');
        const btnText = document.getElementById('btnText');
        
        themeBtn.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-mode');
            btnIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
            if (btnText) btnText.innerText = isLight ? 'Dark' : 'Light';
        });
    }


    // --- 3. UI COMPONENTS (FAQ, Tabs, Typing) ---

    // Typing Effect
    const words = ["Web Developer", "Programmer", "Transcriber"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing");

    function typeEffect() {
        if (!typingElement) return;
        const currentWord = words[wordIndex];
        const speed = isDeleting ? 60 : 120;

        if (!isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 1500);
            }
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // FAQ Toggle
    window.toggleFAQ = (element) => {
        element.parentElement.classList.toggle('active');
    };

    // Tab Switching
    window.switchTab = (btn, tabId) => {
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    };


    // --- 4. SLIDERS & SWIPERS ---

    // Swiper.js Initialization
    const swiper = new Swiper('.mySwiper, .swiper', {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        centeredSlides: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
        },
    });

    // Custom Slide Logic
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide-item');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIdx = 0;

    if (track && dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => jumpToSlide(i);
            dotsContainer.appendChild(dot);
        });

        const updateSlider = () => {
            const slideWidth = slides[0].clientWidth + 30;
            track.style.transform = `translateX(-${currentIdx * slideWidth}px)`;
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIdx);
            });
        };

        window.moveSlider = (direction) => {
            const visibleCount = window.innerWidth > 992 ? 3 : (window.innerWidth > 600 ? 2 : 1);
            const maxIdx = slides.length - visibleCount;
            currentIdx = Math.min(Math.max(currentIdx + direction, 0), maxIdx);
            updateSlider();
        };

        const jumpToSlide = (index) => {
            currentIdx = index;
            updateSlider();
        };

        window.addEventListener('resize', updateSlider);
        updateSlider();

    }


    // --- 5. SCROLL & INTERSECTION ANIMATIONS ---

    // Skill Bar & Counter Observer
    const skillBars = document.querySelectorAll('.skill-bar span, .progress-bar');
    const counters = document.querySelectorAll('.counter');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate Skill Bars
                if (entry.target.classList.contains('progress-bar') || entry.target.tagName === 'SPAN') {
                    const style = entry.target.getAttribute('style');
                    if (style.includes('--width:')) {
                        entry.target.style.width = style.split('--width: ')[1].split(';')[0];
                    } else if (style.includes('width:')) {
                        entry.target.style.width = style.split('width: ')[1];
                    }
                }

                // Animate Counters
                if (entry.target.classList.contains('bento-section')) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const speed = 200;
                        const updateCount = () => {
                            const count = +counter.innerText.replace(/[^0-9]/g, '');
                            const inc = target / speed;
                            if (count < target) {
                                counter.innerText = Math.ceil(count + inc);
                                setTimeout(updateCount, 15);
                            } else {
                                counter.innerText = target + (counter.getAttribute('data-target') === "98" ? "%" : "+");
                            }
                        };
                        updateCount();
                    });
                }
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => scrollObserver.observe(bar));
    const bento = document.querySelector('.bento-section');
    if (bento) scrollObserver.observe(bento);

    // Timeline Scroll Logic
    const timeline = document.getElementById('timelineSec');
    const fill = document.getElementById('progressFill');
    const items = document.querySelectorAll('.item');

    if (timeline && fill) {
        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const winH = window.innerHeight;
            let progress = (winH / 2 - rect.top) / rect.height * 100;
            progress = Math.min(Math.max(progress, 0), 100);
            fill.style.height = progress + '%';

            items.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                if (itemRect.top < winH * 0.8) item.classList.add('reveal');
                if (itemRect.top < winH / 2) item.classList.add('active-node');
                else item.classList.remove('active-node');
            });
        });
    }
});
