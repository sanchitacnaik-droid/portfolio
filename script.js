/**
 * =========================================================
 * SANCHITA PORTFOLIO - JAVASCRIPT LOGIC (script.js)
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. MOBILE NAVIGATION TOGGLE
       ===================================================== */
    const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navbar.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile drawer when clicking any link
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
                navbar.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    /* =====================================================
       2. EDUCATION & JOURNEY TABS
       ===================================================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content');

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => b.classList.remove('active'));
            tabPanels.forEach((p) => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    /* =====================================================
       3. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
       ===================================================== */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 140;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    /* =====================================================
       4. BACK TO TOP BUTTON
       ===================================================== */
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 450) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =====================================================
       5. CONTACT FORM SUBMISSION
       ===================================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please complete all form fields before submitting.');
                return;
            }

            const receiver = 'sanchita.c.naik@gmail.com';
            const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
            const mailtoBody = encodeURIComponent(
                `Hello Sanchita,\n\nYou have received a new message from your portfolio:\n\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Subject: ${subject}\n\n` +
                `Message:\n${message}\n\n` +
                `---\nSent from Sanchita Portfolio Website`
            );

            // Trigger mail client
            window.location.href = `mailto:${receiver}?subject=${mailtoSubject}&body=${mailtoBody}`;
        });
    }

});
