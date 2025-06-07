// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Login/Register Modal
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const authModal = document.querySelector('.auth-modal');
    const closeModal = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    // Open modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            authModal.style.display = 'block';
            document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');
            document.querySelector('.auth-form[data-form="login"]').classList.add('active');
            document.querySelector('.auth-tab[data-tab="register"]').classList.remove('active');
            document.querySelector('.auth-form[data-form="register"]').classList.remove('active');
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            authModal.style.display = 'block';
            document.querySelector('.auth-tab[data-tab="register"]').classList.add('active');
            document.querySelector('.auth-form[data-form="register"]').classList.add('active');
            document.querySelector('.auth-tab[data-tab="login"]').classList.remove('active');
            document.querySelector('.auth-form[data-form="login"]').classList.remove('active');
        });
    }

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            authModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // Tab switching
    if (authTabs) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and forms
                authTabs.forEach(tab => tab.classList.remove('active'));
                authForms.forEach(form => form.classList.remove('active'));
                
                // Add active class to current tab and form
                this.classList.add('active');
                document.querySelector(`.auth-form[data-form="${tabId}"]`).classList.add('active');
            });
        });
    }

    // Chat Widget
    const chatButton = document.querySelector('.chat-button');
    const chatBox = document.querySelector('.chat-box');
    const closeChat = document.querySelector('.close-chat');
    const chatForm = document.querySelector('.chat-form');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');

    if (chatButton) {
        chatButton.addEventListener('click', function() {
            chatBox.style.display = chatBox.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatBox.style.display = 'none';
        });
    }

    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (chatInput.value.trim() === '') return;
            
            // Add user message
            addMessage('user', chatInput.value);
            
            // Simulate response after 1 second
            setTimeout(function() {
                addMessage('support', 'Thank you for your message. Our team will get back to you shortly.');
            }, 1000);
            
            chatInput.value = '';
        });
    }

    function addMessage(type, text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageHTML = `
            <div class="message ${type}">
                <div class="message-content">
                    ${text}
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Book Preview Modal
    const previewBtns = document.querySelectorAll('.preview-btn');
    const previewModal = document.querySelector('.preview-modal');
    const closePreview = document.querySelector('.close-preview');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    const previewPages = document.querySelectorAll('.preview-page');
    let currentPage = 0;

    if (previewBtns) {
        previewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                previewModal.style.display = 'block';
                showPreviewPage(0);
            });
        });
    }

    if (closePreview) {
        closePreview.addEventListener('click', function() {
            previewModal.style.display = 'none';
        });
    }

    // Close preview modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 0) {
                showPreviewPage(currentPage - 1);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPage < previewPages.length - 1) {
                showPreviewPage(currentPage + 1);
            }
        });
    }

    function showPreviewPage(pageIndex) {
        previewPages.forEach((page, index) => {
            page.style.display = index === pageIndex ? 'block' : 'none';
        });
        currentPage = pageIndex;
        
        // Update pagination buttons
        if (prevPageBtn) prevPageBtn.disabled = currentPage === 0;
        if (nextPageBtn) nextPageBtn.disabled = currentPage === previewPages.length - 1;
        
        // Update page counter
        const pageCounter = document.querySelector('.page-counter');
        if (pageCounter) {
            pageCounter.textContent = `Page ${currentPage + 1} of ${previewPages.length}`;
        }
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        });
    }

    // Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const bookCards = document.querySelectorAll('.book-card');

    if (categoryTabs) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all tabs
                categoryTabs.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to current tab
                this.classList.add('active');
                
                // Show/hide books based on category
                bookCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    const removeItemBtns = document.querySelectorAll('.remove-item');
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartSection = document.querySelector('.cart-section');
    const checkoutSection = document.querySelector('.checkout-section');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const orderConfirmation = document.querySelector('.order-confirmation');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartCount();

    if (addToCartBtns) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const bookCard = this.closest('.book-card');
                const bookId = bookCard.getAttribute('data-id');
                const bookTitle = bookCard.querySelector('.book-info h3').textContent;
                const bookPrice = parseFloat(bookCard.querySelector('.book-price').textContent.replace('₹', ''));
                const bookCover = bookCard.querySelector('.book-cover img').getAttribute('src');
                
                // Check if item already in cart
                const existingItem = cartItems.find(item => item.id === bookId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cartItems.push({
                        id: bookId,
                        title: bookTitle,
                        price: bookPrice,
                        cover: bookCover,
                        quantity: 1
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Update cart count
                updateCartCount();
                
                // Show notification
                showNotification('Book added to cart!');
            });
        });
    }

    // Remove item from cart
    if (removeItemBtns) {
        removeItemBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const bookId = cartItem.getAttribute('data-id');
                
                // Remove item from array
                cartItems = cartItems.filter(item => item.id !== bookId);
                
                // Save to localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Remove item from DOM
                cartItem.remove();
                
                // Update cart count
                updateCartCount();
                
                // Update cart summary
                updateCartSummary();
            });
        });
    }

    // Quantity buttons
    if (quantityBtns) {
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const bookId = cartItem.getAttribute('data-id');
                const input = cartItem.querySelector('.quantity-selector input');
                const action = this.getAttribute('data-action');
                let quantity = parseInt(input.value);
                
                if (action === 'decrease' && quantity > 1) {
                    quantity -= 1;
                } else if (action === 'increase') {
                    quantity += 1;
                }
                
                input.value = quantity;
                
                // Update quantity in array
                const item = cartItems.find(item => item.id === bookId);
                if (item) {
                    item.quantity = quantity;
                    
                    // Update subtotal
                    const subtotal = cartItem.querySelector('.cart-subtotal');
                    subtotal.textContent = `₹${(item.price * quantity).toFixed(2)}`;
                    
                    // Save to localStorage
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    
                    // Update cart summary
                    updateCartSummary();
                }
            });
        });
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            
            if (cartSection) cartSection.style.display = 'none';
            if (checkoutSection) checkoutSection.style.display = 'block';
        });
    }

    // Place order button
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            const form = this.closest('form');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            if (checkoutSection) checkoutSection.style.display = 'none';
            if (orderConfirmation) orderConfirmation.style.display = 'block';
            
            // Clear cart
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
        });
    }

    function updateCartCount() {
        if (cartCount) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            if (totalItems === 0) {
                cartCount.style.display = 'none';
            } else {
                cartCount.style.display = 'flex';
            }
        }
    }

    function updateCartSummary() {
        const subtotalElement = document.querySelector('.summary-subtotal');
        const discountElement = document.querySelector('.summary-discount');
        const taxElement = document.querySelector('.summary-tax');
        const totalElement = document.querySelector('.summary-total-amount');
        
        if (subtotalElement && totalElement) {
            const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const discount = 0; // Calculate discount if applicable
            const tax = subtotal * 0.18; // Assuming 18% tax
            const total = subtotal - discount + tax;
            
            subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
            if (discountElement) discountElement.textContent = `₹${discount.toFixed(2)}`;
            if (taxElement) taxElement.textContent = `₹${tax.toFixed(2)}`;
            totalElement.textContent = `₹${total.toFixed(2)}`;
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize cart summary if on cart page
    if (document.querySelector('.cart-summary')) {
        updateCartSummary();
    }

    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option input');
    const paymentDetails = document.querySelectorAll('.payment-details');

    if (paymentOptions) {
        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                const method = this.value;
                
                // Hide all payment details
                paymentDetails.forEach(detail => {
                    detail.style.display = 'none';
                });
                
                // Show selected payment details
                document.querySelector(`.${method}-details`).style.display = 'block';
            });
        });
    }

    // Mobile Order Summary Toggle
    const mobileSummaryToggle = document.querySelector('.mobile-summary-toggle');
    const mobileSummaryContent = document.querySelector('.mobile-summary-content');

    if (mobileSummaryToggle && mobileSummaryContent) {
        mobileSummaryToggle.addEventListener('click', function() {
            mobileSummaryContent.style.display = 
                mobileSummaryContent.style.display === 'block' ? 'none' : 'block';
            
            const icon = this.querySelector('i');
            icon.className = 
                mobileSummaryContent.style.display === 'block' ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });
    }

    // Coupon form
    const couponForm = document.querySelector('.coupon-form');

    if (couponForm) {
        couponForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const couponInput = this.querySelector('input');
            const couponCode = couponInput.value.trim();
            
            if (couponCode === '') {
                showNotification('Please enter a coupon code');
                return;
            }
            
            // Simulate coupon validation
            if (couponCode === 'DISCOUNT20') {
                showNotification('Coupon applied successfully!');
                // Apply discount logic here
                updateCartSummary();
            } else {
                showNotification('Invalid coupon code');
            }
        });
    }
});