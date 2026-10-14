/**
 * PORTFÓLIO RODRIGO WILLEN - JAVASCRIPT PRINCIPAL
 * Interatividades: Dark/Light Mode, Typewriter, Filtro de Projetos, Menu Mobile, Form
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initNavbarScroll();
    initTypewriter();
    initProjectsFilter();
    initContactForm();
    initCurrentYear();
    initScrollSpy();
});

/* ==========================================================================
   TEMA CLARO / ESCURO (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
    const themeToggles = [
        document.getElementById('theme-toggle'),
        document.getElementById('theme-toggle-mobile')
    ];

    // Checar preferência salva ou do sistema operacional
    const savedTheme = localStorage.getItem('rw-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('rw-theme', newTheme);
    }

    themeToggles.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    });
}

/* ==========================================================================
   MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Fechar ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

/* ==========================================================================
   HEADER SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   EFEITO DE DIGITAÇÃO (TYPEWRITER)
   ========================================================================== */
function initTypewriter() {
    const textElement = document.getElementById('hero-typing');
    if (!textElement) return;

    const phrases = [
        'Desenvolvedor de Software',
        'Front-end & Web Moderno',
        'Criador de Chatbots & IA',
        'JavaScript & Soluções Web'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 2000;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            currentSpeed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            currentSpeed = 400;
        }

        setTimeout(type, currentSpeed);
    }

    type();
}

/* ==========================================================================
   FILTRO DE PROJETOS
   ========================================================================== */
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe ativa dos outros botões
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   FORMULÁRIO DE CONTATO
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;

        const btn = document.getElementById('form-submit-btn');
        const originalBtnHtml = btn ? btn.innerHTML : '';

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Enviando...</span>`;
        }

        // Simulação de envio com feedback instantâneo e seguro
        setTimeout(() => {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = originalBtnHtml;
            }

            if (feedback) {
                feedback.className = 'form-feedback success';
                feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Mensagem enviada com sucesso, <strong>${name}</strong>! Entrarei em contato em breve.`;
            }

            form.reset();

            // Ocultar mensagem de sucesso após alguns segundos
            setTimeout(() => {
                if (feedback) {
                    feedback.style.display = 'none';
                    feedback.className = 'form-feedback';
                }
            }, 6000);
        }, 800);
    });
}

/* ==========================================================================
   SCROLL SPY (INDICADOR DE NAVEGAÇÃO ATIVA)
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   ANO ATUAL NO RODAPÉ
   ========================================================================== */
function initCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
