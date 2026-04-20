// ===== Performance Helpers =====
const isMobile = () => window.innerWidth <= 768;

// Throttle utility — limits how often a fn runs
function throttle(fn, wait) {
    let last = 0;
    return function (...args) {
        const now = Date.now();
        if (now - last >= wait) {
            last = now;
            fn.apply(this, args);
        }
    };
}

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScrollY = 0;

const onScroll = throttle(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up (only if scrolled past 300)
    if (currentScrollY > 300) {
        header.style.transform = currentScrollY > lastScrollY
            ? 'translateY(-100%)'
            : 'translateY(0)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
}, 100);

window.addEventListener('scroll', onScroll, { passive: true });

// ===== Slider Logic for Grades Section =====
const panels = document.querySelectorAll('.grade-panel');
const prevBtn = document.getElementById('gradePrev');
const nextBtn = document.getElementById('gradeNext');
const dots = document.querySelectorAll('.dot');
let currentIdx = 0;

function updateSlider() {
    panels.forEach((panel, i) => {
        panel.classList.toggle('active', i === currentIdx);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
    });
}

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % panels.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + panels.length) % panels.length;
        updateSlider();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIdx = i;
            updateSlider();
        });
    });
}

// ===== Scroll Animation (Intersection Observer) =====
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Stagger children
            const children = entry.target.querySelectorAll(
                '.feature-card, .gallery-item, .testimonial-card, .faq-item, .about-highlight, .stat-item'
            );
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 80}ms`;
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== Stats Observer =====
const statsStrip = document.querySelector('.stats-strip');
let statsAnimated = false;

if (statsStrip) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statsStrip.querySelectorAll('.stat-item').forEach((item, index) => {
                    item.style.transitionDelay = `${index * 100}ms`;
                    item.style.animation = `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms forwards`;
                });
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsStrip);
}

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
            const ans = faq.querySelector('.faq-answer');
            if (ans) ans.style.maxHeight = null;
        });
        if (!isActive) {
            item.classList.add('active');
            const answer = item.querySelector('.faq-answer');
            if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// ===== Smooth Scrolling for Anchors =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});

// ===== Popup Form Logic =====
const popupOverlay = document.getElementById('enquiryPopup');
const openPopupBtns = document.querySelectorAll('.open-popup');
const closePopupBtn = document.getElementById('closePopup');

function openPopup() {
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (popupOverlay && closePopupBtn) {
    openPopupBtns.forEach(btn => btn.addEventListener('click', e => {
        e.preventDefault();
        openPopup();
    }));

    closePopupBtn.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', e => {
        if (e.target === popupOverlay) closePopup();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) closePopup();
    });

    // Auto popup after 6s — deferred via requestIdleCallback to not block LCP
    const schedulePopup = () => {
        setTimeout(() => {
            if (!popupOverlay.classList.contains('active')) openPopup();
        }, 6000);
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(schedulePopup, { timeout: 3000 });
    } else {
        schedulePopup();
    }
}

// ===== Parallax — DESKTOP ONLY (skip on mobile to avoid LCP penalty) =====
if (!isMobile()) {
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.scrollY;
            const heroEl = document.querySelector('.hero');
            if (heroEl && scrolled < heroEl.offsetHeight) {
                heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.25}px)`;
            }
        }, 32), { passive: true });
    }
}

// ===== Gallery Tilt (desktop only) =====
if (!isMobile()) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const rotX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -3;
            const rotY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 3;
            item.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            item.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'transform 0.1s ease';
        });
    });
}

// ===== Feature Card Mouse Glow (desktop only) =====
if (!isMobile()) {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(7,81,148,0.04), transparent 50%), var(--white)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = 'var(--white)';
        });
    });
}

// ===== Scroll Progress Indicator =====
const scrollProgress = document.createElement('div');
Object.assign(scrollProgress.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '3px',
    background: 'linear-gradient(90deg, #075194, #2CB5E0, #FED00D)',
    zIndex: '1001',
    width: '0%',
    pointerEvents: 'none'
});
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', throttle(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = `${(scrollTop / docHeight) * 100}%`;
}, 32), { passive: true });

// ===== Section Title Reveal =====
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    titleObserver.observe(title);
});

// ===== Gallery Reveal =====
const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.gallery-item').forEach((item, i) => {
                    item.style.transitionDelay = `${i * 100}ms`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.15 }).observe(galleryGrid);
}

// ===== Hero Badge Animation =====
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
    heroBadge.style.opacity = '0';
    heroBadge.style.transform = 'translateY(10px)';
    // Use rAF to not block initial paint
    requestAnimationFrame(() => {
        setTimeout(() => {
            heroBadge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 300);
    });
}
