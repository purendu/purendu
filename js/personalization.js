/**
 * Personalization JavaScript
 * Handles user preferences, recommendations, and reading history
 */

document.addEventListener('DOMContentLoaded', function() {
    initPreferencesPanel();
    initPriceRangeSlider();
    initRecommendations();
});

/**
 * Initialize Preferences Panel
 */
function initPreferencesPanel() {
    const preferencesToggle = document.getElementById('preferencesToggle');
    const preferencesPanel = document.getElementById('preferencesPanel');
    const preferencesOverlay = document.getElementById('preferencesOverlay');
    const closePreferences = document.getElementById('closePreferences');
    const savePreferences = document.querySelector('.preference-save');
    const resetPreferences = document.querySelector('.preference-reset');
    
    // Toggle preferences panel
    if (preferencesToggle) {
        preferencesToggle.addEventListener('click', function() {
            preferencesPanel.classList.add('active');
            preferencesOverlay.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    }
    
    // Close preferences panel
    if (closePreferences) {
        closePreferences.addEventListener('click', closePreferencesPanel);
    }
    
    // Close when overlay is clicked
    if (preferencesOverlay) {
        preferencesOverlay.addEventListener('click', closePreferencesPanel);
    }
    
    // Save preferences
    if (savePreferences) {
        savePreferences.addEventListener('click', function() {
            saveUserPreferences();
            closePreferencesPanel();
            showNotification('Preferences saved successfully!', 'success');
            // Refresh recommendations based on new preferences
            setTimeout(() => {
                refreshRecommendations();
            }, 500);
        });
    }
    
    // Reset preferences
    if (resetPreferences) {
        resetPreferences.addEventListener('click', function() {
            resetUserPreferences();
            showNotification('Preferences reset to default', 'info');
        });
    }
    
    // Load saved preferences
    loadUserPreferences();
    
    function closePreferencesPanel() {
        preferencesPanel.classList.remove('active');
        preferencesOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

/**
 * Initialize Price Range Slider
 */
function initPriceRangeSlider() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        // Update price value display
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
        });
        
        // Set initial value
        priceValue.textContent = priceRange.value;
    }
}

/**
 * Save User Preferences
 */
function saveUserPreferences() {
    const preferences = {
        categories: [],
        maxPrice: document.getElementById('priceRange').value,
        showRecommendations: document.querySelector('.preference-option:nth-child(1) input').checked,
        saveReadingProgress: document.querySelector('.preference-option:nth-child(2) input').checked
    };
    
    // Get selected categories
    document.querySelectorAll('.preference-section:first-child .preference-option input').forEach((checkbox, index) => {
        if (checkbox.checked) {
            const categoryName = checkbox.nextElementSibling.textContent;
            preferences.categories.push(categoryName);
        }
    });
    
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    return preferences;
}

/**
 * Load User Preferences
 */
function loadUserPreferences() {
    const savedPreferences = localStorage.getItem('userPreferences');
    
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        
        // Set price range
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        if (priceRange && priceValue) {
            priceRange.value = preferences.maxPrice;
            priceValue.textContent = preferences.maxPrice;
        }
        
        // Set categories
        document.querySelectorAll('.preference-section:first-child .preference-option input').forEach((checkbox) => {
            const categoryName = checkbox.nextElementSibling.textContent;
            checkbox.checked = preferences.categories.includes(categoryName);
        });
        
        // Set other preferences
        const showRecommendations = document.querySelector('.preference-section:nth-child(3) .preference-option:nth-child(1) input');
        const saveReadingProgress = document.querySelector('.preference-section:nth-child(3) .preference-option:nth-child(2) input');
        
        if (showRecommendations) {
            showRecommendations.checked = preferences.showRecommendations;
        }
        
        if (saveReadingProgress) {
            saveReadingProgress.checked = preferences.saveReadingProgress;
        }
    }
}

/**
 * Reset User Preferences
 */
function resetUserPreferences() {
    // Reset categories
    document.querySelectorAll('.preference-section:first-child .preference-option input').forEach((checkbox, index) => {
        // Default: first two categories checked
        checkbox.checked = index < 2;
    });
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.value = 1000;
        priceValue.textContent = 1000;
    }
    
    // Reset other preferences
    const showRecommendations = document.querySelector('.preference-section:nth-child(3) .preference-option:nth-child(1) input');
    const saveReadingProgress = document.querySelector('.preference-section:nth-child(3) .preference-option:nth-child(2) input');
    
    if (showRecommendations) {
        showRecommendations.checked = true;
    }
    
    if (saveReadingProgress) {
        saveReadingProgress.checked = true;
    }
    
    // Clear localStorage
    localStorage.removeItem('userPreferences');
}

/**
 * Initialize Recommendations
 */
function initRecommendations() {
    const refreshButton = document.getElementById('refreshRecommendations');
    
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            refreshRecommendations();
            
            // Add rotation animation to refresh icon
            const icon = this.querySelector('i');
            icon.classList.add('fa-spin');
            
            setTimeout(() => {
                icon.classList.remove('fa-spin');
            }, 1000);
        });
    }
    
    // Initial load of recommendations
    refreshRecommendations();
}

/**
 * Refresh Recommendations
 */
function refreshRecommendations() {
    // In a real application, this would make an API call to get personalized recommendations
    // For demo purposes, we'll simulate with sample data
    
    // Get user preferences
    const savedPreferences = localStorage.getItem('userPreferences');
    let preferences;
    
    if (savedPreferences) {
        preferences = JSON.parse(savedPreferences);
    } else {
        // Default preferences
        preferences = {
            categories: ['Technology', 'Business'],
            maxPrice: 1000
        };
    }
    
    // Sample books data (in a real app, this would come from an API)
    const books = [
        {
            id: 1,
            title: 'AI and the Future',
            author: 'Sarah Johnson',
            category: 'Technology',
            price: 599,
            rating: 4.5,
            image: 'images/book3.svg'
        },
        {
            id: 2,
            title: 'Business Strategy',
            author: 'Michael Porter',
            category: 'Business',
            price: 799,
            rating: 4.8,
            image: 'images/book2.svg'
        },
        {
            id: 3,
            title: 'UX Design Principles',
            author: 'Jessica Lee',
            category: 'Design',
            price: 499,
            rating: 4.2,
            image: 'images/book4.svg'
        },
        {
            id: 4,
            title: 'The Digital Revolution',
            author: 'John Smith',
            category: 'Technology',
            price: 499,
            rating: 4.5,
            image: 'images/book1.svg'
        },
        {
            id: 5,
            title: 'Mindfulness',
            author: 'David Wilson',
            category: 'Self Development',
            price: 399,
            rating: 4.3,
            image: 'images/book5.svg'
        },
        {
            id: 6,
            title: 'The Last Chapter',
            author: 'Emily Roberts',
            category: 'Fiction',
            price: 349,
            rating: 4.7,
            image: 'images/book6.svg'
        }
    ];
    
    // Filter books based on preferences
    const filteredBooks = books.filter(book => {
        return preferences.categories.includes(book.category) && book.price <= preferences.maxPrice;
    });
    
    // Shuffle array to simulate different recommendations each time
    const shuffledBooks = [...filteredBooks].sort(() => 0.5 - Math.random());
    
    // Get the first 4 books (or less if not enough)
    const recommendedBooks = shuffledBooks.slice(0, 4);
    
    // Update the DOM
    const recommendationsGrid = document.querySelector('.personalized-grid');
    
    if (recommendationsGrid) {
        // Clear existing content
        recommendationsGrid.innerHTML = '';
        
        // Add recommended books
        recommendedBooks.forEach(book => {
            const bookCard = createBookCard(book);
            recommendationsGrid.appendChild(bookCard);
        });
        
        // If no recommendations, show message
        if (recommendedBooks.length === 0) {
            recommendationsGrid.innerHTML = `
                <div class="no-recommendations">
                    <p>No recommendations found based on your preferences. Try adjusting your preferences.</p>
                </div>
            `;
        }
    }
}

/**
 * Create Book Card Element
 */
function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-category', book.category);
    
    // Generate stars based on rating
    let stars = '';
    const fullStars = Math.floor(book.rating);
    const hasHalfStar = book.rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    bookCard.innerHTML = `
        <div class="book-img-container">
            <img src="${book.image}" alt="${book.title}" class="book-img">
            <div class="book-overlay">
                <div class="book-overlay-btns">
                    <button class="btn btn-light book-preview-btn">Preview</button>
                    <button class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">By ${book.author}</p>
            <p class="book-category">${book.category}</p>
            <div class="book-rating">
                ${stars}
                <span>(${book.rating})</span>
            </div>
            <p class="book-price">₹${book.price}</p>
        </div>
    `;
    
    // Add event listeners
    const previewBtn = bookCard.querySelector('.book-preview-btn');
    const addToCartBtn = bookCard.querySelector('.add-to-cart');
    
    previewBtn.addEventListener('click', function() {
        openBookPreview(book);
    });
    
    addToCartBtn.addEventListener('click', function() {
        addToCart(book);
    });
    
    return bookCard;
}

/**
 * Open Book Preview
 */
function openBookPreview(book) {
    // In a real application, this would open the book preview modal with the book details
    console.log('Opening preview for:', book.title);
    
    // For demo purposes, we'll use the existing preview modal
    const previewModal = document.getElementById('previewModal');
    
    if (previewModal) {
        // Update modal content with book details
        const bookTitle = previewModal.querySelector('.preview-book-title');
        const bookAuthor = previewModal.querySelector('.preview-book-author');
        const bookCategory = previewModal.querySelector('.preview-book-category');
        const bookRating = previewModal.querySelector('.preview-book-rating span');
        const bookPrice = previewModal.querySelector('.preview-book-price');
        const bookCover = previewModal.querySelector('.preview-book-cover');
        
        if (bookTitle) bookTitle.textContent = book.title;
        if (bookAuthor) bookAuthor.textContent = `By ${book.author}`;
        if (bookCategory) bookCategory.textContent = book.category;
        if (bookRating) bookRating.textContent = `(${book.rating})`;
        if (bookPrice) bookPrice.textContent = `₹${book.price}`;
        if (bookCover) bookCover.src = book.image;
        
        // Show modal
        previewModal.style.display = 'block';
        
        // Close modal when close button is clicked
        const closeBtn = previewModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                previewModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the content
        window.addEventListener('click', function(event) {
            if (event.target === previewModal) {
                previewModal.style.display = 'none';
            }
        });
    }
}

/**
 * Add to Cart
 */
function addToCart(book) {
    // In a real application, this would add the book to the cart
    console.log('Adding to cart:', book.title);
    
    // For demo purposes, we'll show a notification
    if (window.showNotification) {
        window.showNotification(`${book.title} added to cart!`, 'success');
    }
    
    // Simulate cart item count update
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = count + 1;
    }
}