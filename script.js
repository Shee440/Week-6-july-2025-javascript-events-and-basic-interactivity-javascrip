// Part 1: Event Handling

// Click event example
document.getElementById('click-box').addEventListener('click', function() {
    this.classList.toggle('active');
    this.querySelector('p').textContent = this.classList.contains('active') 
        ? 'Clicked! Box is now active.' 
        : 'Click this box to change its color';
});

// Mouseover event example
document.getElementById('mouseover-box').addEventListener('mouseover', function() {
    this.classList.add('hover');
});

document.getElementById('mouseover-box').addEventListener('mouseout', function() {
    this.classList.remove('hover');
});

// Keyboard event example
document.getElementById('key-input').addEventListener('keydown', function() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607', '#8338EC'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
    
    // Reset after 1 second
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, 1000);
});

// Double-click event example
document.getElementById('doubleclick-box').addEventListener('dblclick', function() {
    this.classList.toggle('enlarged');
    this.querySelector('p').textContent = this.classList.contains('enlarged') 
        ? 'Double-clicked! Box is now enlarged.' 
        : 'Double-click this box to toggle its size';
});

// Part 2: Interactive Elements

// Dark/Light Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const modeIndicator = document.getElementById('mode-indicator');
    modeIndicator.textContent = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
});

// Counter Game
let count = 0;
const counterDisplay = document.getElementById('counter-value');

function updateCounter() {
    counterDisplay.textContent = count;
    
    // Change color based on value
    if (count > 0) {
        counterDisplay.style.color = '#06d6a0';
    } else if (count < 0) {
        counterDisplay.style.color = '#ff6b6b';
    } else {
        counterDisplay.style.color = '#6e8efb';
    }
}

document.getElementById('increment-btn').addEventListener('click', function() {
    count++;
    updateCounter();
});

document.getElementById('decrement-btn').addEventListener('click', function() {
    count--;
    updateCounter();
});

document.getElementById('reset-btn').addEventListener('click', function() {
    count = 0;
    updateCounter();
});

// Collapsible FAQ Section
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.toggle-icon');
        
        // Toggle active class on answer
        answer.classList.toggle('active');
        
        // Change icon
        icon.textContent = answer.classList.contains('active') ? '−' : '+';
    });
});

// Tabbed Interface
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding pane
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Part 3: Form Validation
document.getElementById('validation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input').forEach(input => input.classList.remove('error'));
    
    // Name validation
    const nameInput = document.getElementById('name');
    if (!nameInput.value.trim()) {
        document.getElementById('name-error').textContent = 'Name is required';
        nameInput.classList.add('error');
        isValid = false;
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value) {
        document.getElementById('email-error').textContent = 'Email is required';
        emailInput.classList.add('error');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        isValid = false;
    }
    
    // Password validation
    const passwordInput = document.getElementById('password');
    if (!passwordInput.value) {
        document.getElementById('password-error').textContent = 'Password is required';
        passwordInput.classList.add('error');
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
        passwordInput.classList.add('error');
        isValid = false;
    }
    
    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirm-password');
    if (passwordInput.value !== confirmPasswordInput.value) {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match';
        confirmPasswordInput.classList.add('error');
        isValid = false;
    }
    
    // Age validation
    const ageInput = document.getElementById('age');
    if (!ageInput.value) {
        document.getElementById('age-error').textContent = 'Age is required';
        ageInput.classList.add('error');
        isValid = false;
    } else if (ageInput.value < 13 || ageInput.value > 120) {
        document.getElementById('age-error').textContent = 'Age must be between 13 and 120';
        ageInput.classList.add('error');
        isValid = false;
    }
    
    // If form is valid, show success message
    if (isValid) {
        document.getElementById('form-message').classList.remove('hidden');
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            document.getElementById('form-message').classList.add('hidden');
        }, 5000);
    }
});

// Real-time validation for better UX
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim()) {
        this.classList.remove('error');
        document.getElementById('name-error').textContent = '';
    }
});

document.getElementById('email').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && emailRegex.test(this.value)) {
        this.classList.remove('error');
        document.getElementById('email-error').textContent = '';
    }
});

document.getElementById('password').addEventListener('input', function() {
    if (this.value && this.value.length >= 8) {
        this.classList.remove('error');
        document.getElementById('password-error').textContent = '';
    }
});

document.getElementById('confirm-password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    if (this.value === password) {
        this.classList.remove('error');
        document.getElementById('confirm-password-error').textContent = '';
    }
});

document.getElementById('age').addEventListener('input', function() {
    if (this.value && this.value >= 13 && this.value <= 120) {
        this.classList.remove('error');
        document.getElementById('age-error').textContent = '';
    }
});