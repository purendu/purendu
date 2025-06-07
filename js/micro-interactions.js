/**
 * Micro-interactions JavaScript
 * Handles animations, transitions, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all micro-interactions
    initScrollToTop();
    initPageTransition();
    initNotifications();
    initRippleEffect();
    initAddToCartAnimation();
});

/**
 * Scroll to Top Button Functionality
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Page Transition Effect
 */
function initPageTransition() {
    // Add page transition class to main content
    const mainContent = document.querySelector('main') || document.body;
    mainContent.classList.add('page-transition');
    
    // Add transition effect to internal links
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links
        if (link.href.includes(window.location.origin) && !link.getAttribute('target')) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip for hash links (same page)
                if (href.startsWith('#')) return;
                
                e.preventDefault();
                
                // Fade out
                document.body.style.opacity = '0';
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        }
    });
}

/**
 * Notification System
 */
function initNotifications() {
    const notification = document.getElementById('notification');
    
    // Create global notification function
    window.showNotification = function(message, type = 'success', duration = 3000) {
        // Set notification content
        notification.textContent = message;
        
        // Set notification type
        notification.className = 'notification';
        notification.classList.add(type);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide notification after duration
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            
            // Reset after animation
            setTimeout(() => {
                notification.classList.remove('hide');
                notification.textContent = '';
            }, 300);
        }, duration);
    };
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart, .add-to-cart-preview').forEach(button => {
        button.addEventListener('click', function() {
            const bookTitle = this.closest('.book-card')?.querySelector('.book-title')?.textContent || 
                             this.closest('.preview-book-info')?.querySelector('.preview-book-title')?.textContent || 
                             'Book';
            
            showNotification(`${bookTitle} added to cart!`, 'success');
        });
    });
}

/**
 * Ripple Effect for Buttons
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Add to Cart Animation
 */
function initAddToCartAnimation() {
    document.querySelectorAll('.add-to-cart, .add-to-cart-preview').forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest book card or preview
            const bookElement = this.closest('.book-card') || this.closest('.preview-modal-content');
            
            if (bookElement) {
                // Add animation class
                bookElement.classList.add('cart-item-added');
                
                // Remove class after animation completes
                setTimeout(() => {
                    bookElement.classList.remove('cart-item-added');
                }, 500);
                
                // Optional: Animate to cart
                const cart = document.querySelector('.cart-icon');
                if (cart && bookElement.querySelector('img')) {
                    const imgClone = bookElement.querySelector('img').cloneNode();
                    const imgRect = bookElement.querySelector('img').getBoundingClientRect();
                    const cartRect = cart.getBoundingClientRect();
                    
                    imgClone.style.position = 'fixed';
                    imgClone.style.top = `${imgRect.top}px`;
                    imgClone.style.left = `${imgRect.left}px`;
                    imgClone.style.width = `${imgRect.width}px`;
                    imgClone.style.height = `${imgRect.height}px`;
                    imgClone.style.opacity = '0.8';
                    imgClone.style.zIndex = '1000';
                    imgClone.style.transition = 'all 0.8s ease';
                    
                    document.body.appendChild(imgClone);
                    
                    setTimeout(() => {
                        imgClone.style.top = `${cartRect.top}px`;
                        imgClone.style.left = `${cartRect.left}px`;
                        imgClone.style.width = '30px';
                        imgClone.style.height = '30px';
                        imgClone.style.opacity = '0';
                    }, 10);
                    
                    setTimeout(() => {
                        imgClone.remove();
                    }, 800);
                }
            }
        });
    });
}