/**
 * Theme Functionality
 * Handles toggling between light, dark, and purple themes and saves user preference
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create theme selector dropdown
    createThemeSelector();
    
    const themeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    const themeSelector = document.querySelector('.theme-selector');
    
    // Rename the toggle button class
    themeToggle.classList.remove('dark-mode-toggle');
    themeToggle.classList.add('theme-toggle');
    themeToggle.setAttribute('title', 'Change Theme');
    
    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    applyTheme(currentTheme);
    
    // Toggle theme selector on button click
    themeToggle.addEventListener('click', () => {
        themeSelector.classList.toggle('show');
        
        // Add animation effect
        themeToggle.classList.add('animate');
        setTimeout(() => {
            themeToggle.classList.remove('animate');
        }, 300);
    });
    
    // Close theme selector when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeToggle.contains(e.target) && !themeSelector.contains(e.target)) {
            themeSelector.classList.remove('show');
        }
    });
    
    // Handle theme option selection
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            applyTheme(theme);
            themeSelector.classList.remove('show');
        });
    });
});

// Function to create theme selector dropdown
function createThemeSelector() {
    const themeSelector = document.createElement('div');
    themeSelector.className = 'theme-selector';
    themeSelector.innerHTML = `
        <h4>Select Theme</h4>
        <div class="theme-options">
            <div class="theme-option" data-theme="light">
                <div class="theme-color light"></div>
                <span>Light</span>
            </div>
            <div class="theme-option" data-theme="dark">
                <div class="theme-color dark"></div>
                <span>Dark</span>
            </div>
            <div class="theme-option" data-theme="purple">
                <div class="theme-color purple"></div>
                <span>Purple</span>
            </div>
        </div>
    `;
    document.body.appendChild(themeSelector);
}

// Function to apply selected theme
function applyTheme(theme) {
    const body = document.body;
    const icon = document.querySelector('.theme-toggle i');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Remove all theme classes
    body.classList.remove('dark-mode', 'purple-theme');
    
    // Update active theme option
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Apply selected theme
    switch (theme) {
        case 'dark':
            body.classList.add('dark-mode');
            icon.className = 'fas fa-sun';
            break;
        case 'purple':
            body.classList.add('purple-theme');
            icon.className = 'fas fa-palette';
            break;
        default: // light theme
            icon.className = 'fas fa-moon';
            break;
    }
    
    // Save user preference to local storage
    localStorage.setItem('theme', theme);
    
    // Dispatch event for other scripts that might need to know about the theme change
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: theme } }));
}