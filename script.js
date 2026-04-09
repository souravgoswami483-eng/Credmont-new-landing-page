// ===== Header Scroll Effect with Smart Detection =====
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
});

// ===== Slider Logic for Grades Section with Dot Navigation =====
const panels = document.querySelectorAll('.grade-panel');
const prevBtn = document.getElementById('gradePrev');
const nextBtn = document.getElementById('gradeNext');
const dots = document.querySelectorAll('.dot');
let currentIdx = 0;
let autoSlideInterval;

function updateSlider() {
    panels.forEach((panel, i) => {
        panel.classList.toggle('active', i === currentIdx);
    });
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIdx);
    });
}

// Auto-slide every 6 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIdx = (currentIdx + 1) % panels.length;
        updateSlider();
    }, 6000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIdx = (currentIdx + 1) % panels.length;
        updateSlider();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        currentIdx = (currentIdx - 1 + panels.length) % panels.length;
        updateSlider();
        resetAutoSlide();
    });

    // Dot click navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIdx = i;
            updateSlider();
            resetAutoSlide();
        });
    });

    startAutoSlide();
}

// ===== Enhanced Scroll Animation (Intersection Observer) =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger children animations for feature cards and gallery items
            const children = entry.target.querySelectorAll('.feature-card, .gallery-item, .testimonial-card, .faq-item, .about-highlight, .stat-item');
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
                child.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, 50);
            });

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// ===== Animated Counter for Stats =====
function animateCounter(element, target, suffix, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;
    
    function update() {
        start += increment;
        if (start >= target) {
            start = target;
            element.textContent = isDecimal ? start.toFixed(1) + suffix : Math.round(start) + suffix;
            return;
        }
        element.textContent = isDecimal ? start.toFixed(1) + suffix : Math.round(start) + suffix;
        requestAnimationFrame(update);
    }
    
    update();
}

// Observe stats strip
const statsStrip = document.querySelector('.stats-strip');
let statsAnimated = false;

if (statsStrip) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                
                const statItems = statsStrip.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    const numberEl = item.querySelector('.stat-number');
                    const text = numberEl.textContent.trim();
                    
                    // Stagger the counter animations
                    setTimeout(() => {
                        item.style.animation = `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsStrip);
}

// ===== FAQ Accordion Logic =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        faqItems.forEach(faq => {
            faq.classList.remove('active');
            faq.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// ===== Smooth Scrolling for Anchors =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ===== Popup Form Logic =====
const popupOverlay = document.getElementById('enquiryPopup');
const openPopupBtns = document.querySelectorAll('.open-popup');
const closePopupBtn = document.getElementById('closePopup');

if (popupOverlay && openPopupBtns && closePopupBtn) {
    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closePopupBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== Parallax Effect on Hero =====
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg img');

if (hero && heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxValue = scrolled * 0.3;
            heroBg.style.transform = `scale(1.1) translateY(${parallaxValue}px)`;
        }
    }, { passive: true });
}

// ===== Gallery Image Tilt Effect =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        item.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    item.addEventListener('mouseenter', () => {
        item.style.transition = 'transform 0.1s ease';
    });
});

// ===== Feature Card Mouse Follow Glow =====
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(7, 81, 148, 0.04), transparent 50%), var(--white)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--white)';
    });
});

// ===== Magnetic Button Effect =====
const magneticBtns = document.querySelectorAll('.btn-primary, .btn-navy');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Scroll Progress Indicator =====
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--navy), var(--cyan), var(--yellow));
    z-index: 1001;
    transition: width 0.1s linear;
    width: 0%;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
}, { passive: true });

// ===== Text Reveal Animation for Section Titles =====
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    titleObserver.observe(title);
});

// ===== Smooth Reveal for Gallery on Scroll =====
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 120);
            });
            galleryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    galleryObserver.observe(galleryGrid);
}

// ===== Typewriter effect for hero badge =====
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
    heroBadge.style.opacity = '0';
    heroBadge.style.transform = 'translateY(10px)';
    setTimeout(() => {
        heroBadge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroBadge.style.opacity = '1';
        heroBadge.style.transform = 'translateY(0)';
    }, 300);
}

// ===== Smooth number counting for stat items on hover =====
document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.stat-icon');
        if (icon) {
            icon.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease';
        }
    });
});
