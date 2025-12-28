/**
 * ATELIER BY SARAH - JavaScript Principal
 * ========================================
 */

// ========================================
// MENU MOBILE
// ========================================
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animation des barres du menu burger
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');

            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ========================================
// POPUP CONTACT
// ========================================
function openPopup() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fermer le popup au clic en dehors
document.addEventListener('click', (e) => {
    const popup = document.getElementById('popupOverlay');
    if (e.target === popup) {
        closePopup();
    }
});

// Fermer le popup avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// ========================================
// HEADER SCROLL
// ========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Ajouter une ombre au scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========================================
// ANIMATION AU SCROLL
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.method-card, .why-card, .service-card, .testimonial-card, .proposition-card, .service-item, .stat-item').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ========================================
// COMPTEUR ANIMÉ
// ========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// Observer pour déclencher l'animation des compteurs
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ========================================
// FORMULAIRE DE CONTACT
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulation d'envoi (à remplacer par un vrai backend)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Afficher le message de succès
            alert('Merci pour votre message ! Je vous recontacterai dans les plus brefs délais.');

            // Reset du formulaire
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Formulaire popup
const popupForm = document.getElementById('popupForm');
if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = popupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Merci ! Je vous rappelle très rapidement.');
            popupForm.reset();
            closePopup();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// LAZY LOADING IMAGES
// ========================================
document.querySelectorAll('img[data-src]').forEach(img => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                image.removeAttribute('data-src');
                observer.unobserve(image);
            }
        });
    });

    imageObserver.observe(img);
});

// ========================================
// ANNÉE DYNAMIQUE FOOTER
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', new Date().getFullYear());
        }
    });
});

// ========================================
// VALIDATION FORMULAIRE
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(phone);
}

// Ajouter la validation en temps réel
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function () {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function () {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ========================================
// FAQ ACCORDION
// ========================================
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Fermer tous les autres FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = null;
        }
    });

    // Ouvrir celui cliqué (si pas déjà ouvert)
    if (!isActive) {
        faqItem.classList.add('active');
        const answer = faqItem.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    }
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c Atelier by Sarah ', 'background: #7C2A37; color: #fff; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Site créé avec ❤️ ', 'color: #666; font-size: 12px;');
