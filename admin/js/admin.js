// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const toggleSidebarBtn = document.createElement('button');
    toggleSidebarBtn.classList.add('toggle-sidebar-btn');
    toggleSidebarBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').prepend(toggleSidebarBtn);

    toggleSidebarBtn.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Notifications dropdown
    const notificationsBtn = document.querySelector('.notifications');
    if (notificationsBtn) {
        // Create notifications dropdown
        const notificationsDropdown = document.createElement('div');
        notificationsDropdown.classList.add('notifications-dropdown');
        notificationsDropdown.innerHTML = `
            <div class="dropdown-header">
                <h3>Notifications</h3>
                <a href="#" class="mark-all-read">Mark all as read</a>
            </div>
            <div class="dropdown-body">
                <div class="notification-item unread">
                    <div class="notification-icon order">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="notification-content">
                        <p>New order received from John Doe</p>
                        <span class="notification-time">2 hours ago</span>
                    </div>
                </div>
                <div class="notification-item unread">
                    <div class="notification-icon review">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="notification-content">
                        <p>New 5-star review on "Business Strategy"</p>
                        <span class="notification-time">5 hours ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon user">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="notification-content">
                        <p>New user registration: Michael Brown</p>
                        <span class="notification-time">1 day ago</span>
                    </div>
                </div>
            </div>
            <div class="dropdown-footer">
                <a href="#">View all notifications</a>
            </div>
        `;
        document.body.appendChild(notificationsDropdown);

        // Toggle notifications dropdown
        notificationsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            notificationsDropdown.classList.toggle('active');
            
            // Position the dropdown
            const rect = notificationsBtn.getBoundingClientRect();
            notificationsDropdown.style.top = (rect.bottom + window.scrollY) + 'px';
            notificationsDropdown.style.right = (window.innerWidth - rect.right) + 'px';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationsBtn.contains(e.target) && !notificationsDropdown.contains(e.target)) {
                notificationsDropdown.classList.remove('active');
            }
        });

        // Mark all as read
        const markAllReadBtn = notificationsDropdown.querySelector('.mark-all-read');
        markAllReadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const unreadItems = notificationsDropdown.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => item.classList.remove('unread'));
            document.querySelector('.notification-count').style.display = 'none';
        });
    }

    // Admin profile dropdown
    const profileBtn = document.querySelector('.admin-profile');
    if (profileBtn) {
        // Create profile dropdown
        const profileDropdown = document.createElement('div');
        profileDropdown.classList.add('profile-dropdown');
        profileDropdown.innerHTML = `
            <div class="dropdown-header">
                <div class="profile-info">
                    <div class="profile-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="profile-details">
                        <h3>Admin User</h3>
                        <p>admin@example.com</p>
                    </div>
                </div>
            </div>
            <div class="dropdown-body">
                <ul>
                    <li><a href="#"><i class="fas fa-user"></i> My Profile</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Account Settings</a></li>
                    <li><a href="#"><i class="fas fa-lock"></i> Change Password</a></li>
                </ul>
            </div>
            <div class="dropdown-footer">
                <a href="#" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        `;
        document.body.appendChild(profileDropdown);

        // Toggle profile dropdown
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileDropdown.classList.toggle('active');
            
            // Position the dropdown
            const rect = profileBtn.getBoundingClientRect();
            profileDropdown.style.top = (rect.bottom + window.scrollY) + 'px';
            profileDropdown.style.right = (window.innerWidth - rect.right) + 'px';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                // Redirect to login page or perform logout action
                window.location.href = '../index.html';
            }
        });
    }

    // Add CSS for dropdowns
    const style = document.createElement('style');
    style.textContent = `
        .toggle-sidebar-btn {
            display: none;
            background: none;
            border: none;
            color: var(--admin-text);
            font-size: 1.2rem;
            cursor: pointer;
            margin-right: 15px;
        }

        .notifications-dropdown,
        .profile-dropdown {
            position: absolute;
            top: 70px;
            right: 20px;
            width: 300px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
            overflow: hidden;
        }

        .notifications-dropdown.active,
        .profile-dropdown.active {
            display: block;
        }

        .dropdown-header {
            padding: 15px;
            border-bottom: 1px solid var(--admin-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .dropdown-header h3 {
            margin: 0;
            font-size: 1rem;
        }

        .mark-all-read {
            color: var(--admin-primary);
            font-size: 0.8rem;
            text-decoration: none;
        }

        .dropdown-body {
            max-height: 300px;
            overflow-y: auto;
        }

        .notification-item {
            padding: 15px;
            border-bottom: 1px solid var(--admin-border);
            display: flex;
            align-items: flex-start;
            transition: background-color 0.3s ease;
        }

        .notification-item:hover {
            background-color: var(--admin-light);
        }

        .notification-item.unread {
            background-color: rgba(74, 108, 247, 0.05);
        }

        .notification-item.unread::before {
            content: '';
            display: block;
            width: 8px;
            height: 8px;
            background-color: var(--admin-primary);
            border-radius: 50%;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
        }

        .notification-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
        }

        .notification-icon.order {
            background-color: var(--admin-primary);
        }

        .notification-icon.review {
            background-color: var(--admin-warning);
        }

        .notification-icon.user {
            background-color: var(--admin-info);
        }

        .notification-content p {
            margin: 0 0 5px 0;
            font-size: 0.9rem;
        }

        .notification-time {
            font-size: 0.8rem;
            color: var(--admin-text-muted);
        }

        .dropdown-footer {
            padding: 15px;
            text-align: center;
            border-top: 1px solid var(--admin-border);
        }

        .dropdown-footer a {
            color: var(--admin-primary);
            text-decoration: none;
            font-size: 0.9rem;
        }

        /* Profile Dropdown Specific Styles */
        .profile-info {
            display: flex;
            align-items: center;
            width: 100%;
        }

        .profile-avatar {
            font-size: 2rem;
            color: var(--admin-primary);
            margin-right: 15px;
        }

        .profile-details h3 {
            margin: 0 0 5px 0;
            font-size: 1rem;
        }

        .profile-details p {
            margin: 0;
            font-size: 0.8rem;
            color: var(--admin-text-muted);
        }

        .dropdown-body ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .dropdown-body ul li {
            padding: 0;
        }

        .dropdown-body ul li a {
            padding: 12px 15px;
            display: flex;
            align-items: center;
            color: var(--admin-text);
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .dropdown-body ul li a:hover {
            background-color: var(--admin-light);
        }

        .dropdown-body ul li a i {
            margin-right: 10px;
            width: 20px;
            text-align: center;
            color: var(--admin-primary);
        }

        .logout-link {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logout-link i {
            margin-right: 5px;
        }

        @media (max-width: 576px) {
            .toggle-sidebar-btn {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);

    // Add animation to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Add animation to chart bars
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.height = height;
        }, 100 * index);
    });

    // Add book search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search books...';
    searchInput.classList.add('book-search');
    
    // Add search input to top selling books section if it exists
    const topSellingBooksHeader = document.querySelector('.top-selling-books .section-header');
    if (topSellingBooksHeader) {
        topSellingBooksHeader.insertBefore(searchInput, topSellingBooksHeader.querySelector('.view-all'));

        // Add search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const bookRows = document.querySelectorAll('.books-table tbody tr');
            
            bookRows.forEach(row => {
                const bookTitle = row.querySelector('.book-info h4').textContent.toLowerCase();
                const authorName = row.querySelector('.book-info p').textContent.toLowerCase();
                const category = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                
                if (bookTitle.includes(searchTerm) || authorName.includes(searchTerm) || category.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });

        // Add search input styles
        const searchStyle = document.createElement('style');
        searchStyle.textContent = `
            .book-search {
                padding: 8px 12px;
                border: 1px solid var(--admin-border);
                border-radius: 5px;
                font-size: 0.9rem;
                margin-right: 10px;
                width: 200px;
            }

            @media (max-width: 768px) {
                .book-search {
                    width: 100%;
                    margin-bottom: 10px;
                    order: -1;
                }

                .top-selling-books .section-header {
                    flex-wrap: wrap;
                }
            }
        `;
        document.head.appendChild(searchStyle);
    }
});