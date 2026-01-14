// ========================================
// MAIN.JS
// ========================================

// Typewriter Effect for About Section
function typewriterEffect() {
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');

    if (!typedTextElement) return;

    // Get the full text from the data attribute
    const fullText = typedTextElement.getAttribute('data-text');

    if (!fullText) return;

    let charIndex = 0;
    const typingSpeed = 15; // milliseconds per character

    // Clear initial content
    typedTextElement.textContent = '';

    function typeCharacter() {
        if (charIndex < fullText.length) {
            typedTextElement.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // Typing complete, show cursor
            if (cursorElement) {
                cursorElement.classList.add('visible');
            }
        }
    }

    // Start typing after a brief delay
    setTimeout(() => {
        typeCharacter();
    }, 500);
}

// Initialize typewriter on page load
window.addEventListener('DOMContentLoaded', () => {
    typewriterEffect();
    initializeMenuToggle();
    initializeSidebarToggle();
    initializeSectionCollapse();
});

// Mobile Menu Toggle
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const sidebar = document.querySelector('.sidebar');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('mobile-active');
        sidebar.classList.toggle('menu-open');
    });

    // Close menu when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                navMenu.classList.remove('mobile-active');
                sidebar.classList.remove('menu-open');
            }
        });
    });
}

// Desktop Sidebar Toggle (Red Button)
function initializeSidebarToggle() {
    const toggleButton = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');

    if (!toggleButton || !sidebar) return;

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        container.classList.toggle('sidebar-collapsed');
        toggleButton.classList.toggle('sidebar-collapsed');
        
        // Update aria-label based on state
        const isCollapsed = sidebar.classList.contains('collapsed');
        toggleButton.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
        toggleButton.setAttribute('title', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
    });
}

// Section Collapse on Mobile
function initializeSectionCollapse() {
    const sectionHeaders = document.querySelectorAll('.section-header-mobile');

    sectionHeaders.forEach(header => {
        const toggleSection = () => {
            const section = header.closest('.section');
            const content = section.querySelector('.section-content');
            const indicator = header.querySelector('.collapse-indicator');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Toggle expanded state
            header.setAttribute('aria-expanded', !isExpanded);
            section.classList.toggle('collapsed');

            // Update indicator
            if (indicator) {
                indicator.textContent = isExpanded ? '+' : '−';
            }
        };

        // Click event
        header.addEventListener('click', toggleSection);

        // Keyboard support
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection();
            }
        });
    });
}

// Active Navigation on Scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');

            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to corresponding link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
