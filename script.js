// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');
const colorBox = document.getElementById('colorBox');
const counterElement = document.getElementById('counter');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');

// Color buttons
const redBtn = document.getElementById('redBtn');
const greenBtn = document.getElementById('greenBtn');
const blueBtn = document.getElementById('blueBtn');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');

// Counter buttons
const decrementBtn = document.getElementById('decrementBtn');
const incrementBtn = document.getElementById('incrementBtn');
const clearBtn = document.getElementById('clearBtn');

// CTA button
const ctaButton = document.getElementById('ctaButton');

// Counter state
let counter = 0;

// Initialize the website
function init() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', highlightNavLink);
    
    // Highlight first nav link by default
    highlightNavLink();
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile navigation toggle
    mobileToggle.addEventListener('click', toggleMobileNav);
    
    // Close mobile nav when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // Color changer buttons
    redBtn.addEventListener('click', () => changeColor('#e74c3c'));
    greenBtn.addEventListener('click', () => changeColor('#2ecc71'));
    blueBtn.addEventListener('click', () => changeColor('#3498db'));
    randomBtn.addEventListener('click', changeRandomColor);
    resetBtn.addEventListener('click', resetColor);
    
    // Counter buttons
    decrementBtn.addEventListener('click', decrementCounter);
    incrementBtn.addEventListener('click', incrementCounter);
    clearBtn.addEventListener('click', clearCounter);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // CTA button
    ctaButton.addEventListener('click', scrollToDemo);
}

// Mobile navigation functions
function toggleMobileNav() {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

function closeMobileNav() {
    navLinks.classList.remove('active');
    const icon = mobileToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Color changer functions
function changeColor(color) {
    colorBox.style.backgroundColor = color;
    colorBox.style.boxShadow = `0 10px 20px ${color}40`;
}

function changeRandomColor() {
    const colors = [
        '#e74c3c', '#2ecc71', '#3498db', 
        '#9b59b6', '#f1c40f', '#1abc9c',
        '#d35400', '#c0392b', '#16a085'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    changeColor(randomColor);
}

function resetColor() {
    colorBox.style.backgroundColor = '#2575fc';
    colorBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
}

// Counter functions
function incrementCounter() {
    counter++;
    updateCounterDisplay();
}

function decrementCounter() {
    counter--;
    updateCounterDisplay();
}

function clearCounter() {
    counter = 0;
    updateCounterDisplay();
}

function updateCounterDisplay() {
    counterElement.textContent = counter;
    
    // Add visual feedback
    counterElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        counterElement.style.transform = 'scale(1)';
    }, 200);
    
    // Change color based on value
    if (counter > 0) {
        counterElement.style.color = '#2ecc71';
    } else if (counter < 0) {
        counterElement.style.color = '#e74c3c';
    } else {
        counterElement.style.color = '#2575fc';
    }
}

// Theme toggle function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Toggle Dark Mode';
    }
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    if (!name) {
        showError('nameError', 'Name is required');
        isValid = false;
    }
    
    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    }
    
    if (!message) {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    // If valid, show success message
    if (isValid) {
        showFormMessage('Message sent successfully!', 'success');
        contactForm.reset();
        
        // Reset message after 3 seconds
        setTimeout(() => {
            document.getElementById('formMessage').textContent = '';
        }, 3000);
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    document.getElementById('formMessage').textContent = '';
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
    formMessage.style.color = type === 'success' ? '#155724' : '#721c24';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Navigation highlighting based on scroll position
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to demo section
function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    demoSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
