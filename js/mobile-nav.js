/**
 * Mobile Navigation JavaScript
 * Handles mobile menu toggle and responsive navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
});

/**
 * Initialize Mobile Navigation
 */
function initMobileNav() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when overlay is clicked
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset icon
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    }
    
    // Close menu when a nav link is clicked
    const links = navLinks ? navLinks.querySelectorAll('a') : [];
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Only trigger on mobile view
            if (window.innerWidth < 768) {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
                
                // Reset icon
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset icon
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}