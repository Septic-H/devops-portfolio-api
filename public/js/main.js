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
                cursorElement.style.display = 'inline-block';
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
});

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

console.log('%c[SYSTEM] Portfolio initialized successfully!', 'color: #00ff41; font-weight: bold;');
console.log('%c[STATUS] All modules loaded', 'color: #00ffff;');
