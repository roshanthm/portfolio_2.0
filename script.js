// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized...');
    
    // Initialize all components
    initTheme();
    initMagneticLetters();
    initSkillBars();
    initMobileMenu();
    initContactForm();
    
    // Start animations
    startCursorAnimation();
    startScrollProgress();
    
    console.log('🎉 Portfolio fully loaded!');
});

// ============================================
// THEME TOGGLE - SIMPLE WORKING VERSION
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    console.log("Initializing theme...");
    
    // Check saved theme or default to light
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        console.log("Loading dark theme from localStorage");
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        console.log("Loading light theme");
        themeIcon.textContent = '🌙';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        console.log("Theme button clicked!");
        
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            console.log("Switching to dark mode");
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            console.log("Switching to light mode");
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ============================================
// MAGNETIC LETTERS - SIMPLE WORKING VERSION
// ============================================
function initMagneticLetters() {
    console.log("Initializing magnetic letters...");
    
    const firstName = 'ROSHAN';
    const lastName = 'THOMAS';
    
    // Create first name
    createMagneticLetters(firstName, 'firstName', 0.5, 'first-name');
    
    // Create last name
    createMagneticLetters(lastName, 'lastName', 1.0, 'last-name');
    
    console.log("Magnetic letters created!");
}

function createMagneticLetters(text, containerId, startDelay, className) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container ${containerId} not found!`);
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    const letters = text.split('');
    
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = `magnetic-letter ${className}`;
        span.textContent = letter;
        span.style.animationDelay = `${startDelay + (index * 0.08)}s`;
        
        // Add simple hover effect
        span.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        span.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        container.appendChild(span);
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================
function startCursorAnimation() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    if (!cursorDot || !cursorRing) {
        console.log("Cursor elements not found, skipping cursor animation");
        return;
    }
    
    console.log("Starting cursor animation...");
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if hovering over interactive element
        const target = e.target;
        const isHovering = target.closest('a, button, .magnetic-letter, .stat-card, .skill-card, .project-card, .contact-card, input, textarea, .theme-toggle');
        
        if (isHovering) {
            cursorRing.classList.add('hovering');
            cursorDot.classList.add('hovering');
        } else {
            cursorRing.classList.remove('hovering');
            cursorDot.classList.remove('hovering');
        }
    });
    
    function animateCursor() {
        // Update dot position
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        
        // Smooth ring movement
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    console.log("Cursor animation started");
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function startScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    if (!scrollProgress) {
        console.log("Scroll progress element not found");
        return;
    }
    
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress(); // Initial update
    
    console.log("Scroll progress initialized");
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    if (skillBars.length === 0) {
        console.log("No skill bars found");
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width') || '0';
                console.log(`Animating skill bar to ${width}%`);
                entry.target.style.width = `${width}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
    console.log("Skill bars observer initialized");
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) {
        console.log("Mobile menu elements not found");
        return;
    }
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
    
    console.log("Mobile menu initialized");
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log("Contact form not found");
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }
        
        // Here you would normally send the form data to a server
        // For demo purposes, just show a success message
        alert(`✨ Thank you for your message, ${name}! I will get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
    
    console.log("Contact form initialized");
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', function() {
    // Reset mobile menu on large screens
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (navLinks) navLinks.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
    }
});

// ============================================
// DEBUG HELPER
// ============================================
// Add this to check if elements are being created
setTimeout(() => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    
    console.log("Debug check:");
    console.log("First name element:", firstName);
    console.log("First name innerHTML:", firstName ? firstName.innerHTML : "Not found");
    console.log("Last name element:", lastName);
    console.log("Last name innerHTML:", lastName ? lastName.innerHTML : "Not found");
    
    // If names are still empty, create them directly
    if (firstName && firstName.innerHTML === '') {
        console.log("Creating first name as fallback...");
        createMagneticLetters('ROSHAN', 'firstName', 0.5, 'first-name');
    }
    if (lastName && lastName.innerHTML === '') {
        console.log("Creating last name as fallback...");
        createMagneticLetters('THOMAS', 'lastName', 1.0, 'last-name');
    }
}, 1000);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🚀 Portfolio by Roshan Thomas', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c✨ Designed & Developed with passion', 'font-size: 14px; color: #f093fb;');
console.log('%c📧 Contact: hello@roshanthomas.com', 'font-size: 14px; color: #43e97b;');
