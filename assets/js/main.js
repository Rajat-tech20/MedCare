console.log("Pharmacy Management System Loaded");

document.addEventListener("DOMContentLoaded", () => {
    /* Mobile Menu Toggle */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if(navToggle){
        navToggle.addEventListener('click', () =>{
            navMenu.classList.add('show');
        });
    }

    if(navClose){
        navClose.addEventListener('click', () =>{
            navMenu.classList.remove('show');
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('show');
    }));

    /* Cart Logic */
    const cartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBadge = document.querySelector('.cart-badge');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    // State
    let cart = JSON.parse(localStorage.getItem('medcare_cart')) || [];

    // Save Cart
    function saveCart() {
        localStorage.setItem('medcare_cart', JSON.stringify(cart));
        updateCartUI();
    }

    // Toggle Cart
    function openCart() {
        cartDrawer.classList.add('show');
        cartOverlay.classList.add('show');
    }

    function closeCart() {
        cartDrawer.classList.remove('show');
        cartOverlay.classList.remove('show');
    }

    if(cartBtn) cartBtn.addEventListener('click', openCart);
    if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Add to Cart
    document.addEventListener('click', (e) => {
        // Handle Add to Cart Click
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            const card = btn.closest('.product-card');
            const product = {
                id: card.querySelector('.product-title').textContent, // Using title as ID for simplicity
                title: card.querySelector('.product-title').textContent,
                price: parseFloat(card.querySelector('.product-price').textContent.replace('$', '')),
                image: card.querySelector('.product-image img').src,
                category: card.querySelector('.product-category').textContent,
                qty: 1
            };
            
            addToCart(product, btn);
        }

        // Handle Remove Item
        const removeBtn = e.target.closest('.remove-item-btn');
        if (removeBtn) {
            const title = removeBtn.dataset.id;
            removeFromCart(title);
        }

        // Handle Quantity Increase
        const incBtn = e.target.closest('.qty-inc');
        if (incBtn) {
            const title = incBtn.dataset.id;
            updateQuantity(title, 1);
        }

        // Handle Quantity Decrease
        const decBtn = e.target.closest('.qty-dec');
        if (decBtn) {
            const title = decBtn.dataset.id;
            updateQuantity(title, -1);
        }
    });

    function addToCart(product, btn) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push(product);
        }

        // Visual Feedback on Button
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="ph-bold ph-check"></i>';
        btn.style.backgroundColor = 'var(--primary-color)';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 1500);

        saveCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
    }

    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.qty += change;
            if (item.qty <= 0) {
                removeFromCart(id);
            } else {
                saveCart();
            }
        }
    }

    function updateCartUI() {
        // Update Badge
        const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
        if(cartBadge) cartBadge.textContent = totalItems;

        // Update Total Price
        const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        if(cartTotalPrice) cartTotalPrice.textContent = '$' + total.toFixed(2);

        // Render Items
        if(cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <i class="ph ph-shopping-cart"></i>
                        <p>Your cart is empty.</p>
                        <button class="btn btn-primary btn-sm" onclick="document.querySelector('.cart-overlay').click()">Start Shopping</button>
                    </div>
                `;
            } else {
                cart.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'cart-item';
                    el.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${item.title}</h4>
                            <div class="cart-item-meta">
                                <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
                                <div class="cart-qty-controls">
                                    <button class="qty-btn qty-dec" data-id="${item.id}" aria-label="Decrease quantity"><i class="ph-bold ph-minus"></i></button>
                                    <span class="qty-display">${item.qty}</span>
                                    <button class="qty-btn qty-inc" data-id="${item.id}" aria-label="Increase quantity"><i class="ph-bold ph-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove item">
                            <i class="ph-fill ph-trash"></i>
                        </button>
                    `;
                    cartItemsContainer.appendChild(el);
                });
            }
        }
    }

    // Initial Load
    updateCartUI();

    // Checkout Logic
    const checkoutBtn = document.getElementById('checkout-btn');
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if(cart.length > 0) {
                 window.location.href = 'payment.html';
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    // Category Filtering
    const categoryLinks = document.querySelectorAll('.category-link');
    const productCards = document.querySelectorAll('.product-card');
    const sectionTitle = document.querySelector('.shop-header .section-title');

    if (categoryLinks.length > 0 && productCards.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all
                categoryLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked
                link.classList.add('active');

                const selectedCategory = link.textContent.trim();

                // Update Title
                if (sectionTitle) {
                    sectionTitle.textContent = selectedCategory;
                }

                // Filter Products
                productCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    
                    if (selectedCategory === 'All Products' || cardCategory === selectedCategory) {
                        card.style.display = 'block';
                        // Add animation for appearance
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Sorting Logic with Custom Dropdown
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const customDropdown = document.querySelector('.custom-dropdown');
    const productsGrid = document.querySelector('.product-grid');
    
    if(customDropdown && productsGrid) {
        // Toggle Dropdown
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            customDropdown.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!customDropdown.contains(e.target)) {
                customDropdown.classList.remove('active');
            }
        });

        // Store original order
        const originalOrder = Array.from(productCards);

        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update UI
                dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                dropdownBtn.querySelector('span').textContent = item.textContent;
                customDropdown.classList.remove('active');

                // Sort Logic
                const sortValue = item.dataset.value;
                const currentCards = Array.from(productsGrid.querySelectorAll('.product-card'));
                
                let sortedCards;

                if (sortValue === 'price-low') {
                    sortedCards = currentCards.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                        return priceA - priceB;
                    });
                } else if (sortValue === 'price-high') {
                    sortedCards = currentCards.sort((a, b) => {
                        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
                        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
                        return priceB - priceA;
                    });
                } else {
                    // Default / Featured
                    // Re-sort based on original index to restore order
                    sortedCards = currentCards.sort((a, b) => {
                        return originalOrder.indexOf(a) - originalOrder.indexOf(b);
                    });
                }

                // Re-append to grid with animation
                productsGrid.innerHTML = '';
                sortedCards.forEach((card, index) => {
                    card.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s forwards`;
                    productsGrid.appendChild(card);
                });
            });
        });
    }

    // Check for Toast styles and append if missing (or assume style.css handles it)
    
    // Global Toast Notification
    window.showToast = function(title, message) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="ph-fill ph-check-circle"></i>
            <div class="toast-content">
                <span class="toast-title">${title}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;

        container.appendChild(toast);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'toastExit 0.4s forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
                if (container.children.length === 0) {
                    container.remove();
                }
            });
        }, 4000);
    };

    /* Auth State Management Rule */
    function updateHeaderState() {
        const userStr = localStorage.getItem('medcare_user');
        const headerActions = document.querySelector('.header-actions');
        
        // Remove existing auth buttons to prevent duplicates
        const existingAuth = headerActions.querySelector('.auth-btn-dynamic');
        if(existingAuth) existingAuth.remove();
        
        // Remove admin button if present (we will re-add if admin)
        const adminBtn = headerActions.querySelector('a[href="dashboard.html"]');
        if(adminBtn) adminBtn.remove();
        
        if (userStr) {
            const user = JSON.parse(userStr);
            
            // If Admin, show Admin button
            if(user.role === 'admin') {
                const adminLink = document.createElement('a');
                adminLink.href = 'dashboard.html';
                adminLink.className = 'btn btn-sm btn-primary';
                adminLink.innerText = 'Admin';
                // Insert before toggle
                const toggle = document.querySelector('.mobile-toggle');
                headerActions.insertBefore(adminLink, toggle);
            }

            // Show "Account" or "Logout"
            const accountBtn = document.createElement('a');
            accountBtn.href = user.role === 'customer' ? 'customer-dashboard.html' : 'dashboard.html';
            accountBtn.className = 'icon-btn auth-btn-dynamic';
            accountBtn.innerHTML = '<i class="ph ph-user"></i>';
            accountBtn.title = `Logged in as ${user.name}`;
            
            // Insert before cart? or at the end
             const toggle = document.querySelector('.mobile-toggle');
             headerActions.insertBefore(accountBtn, toggle);

        } else {
            // Not Logged In - Show Login Button
            const loginBtn = document.createElement('a');
            loginBtn.href = 'login.html';
            loginBtn.className = 'btn btn-sm btn-outline auth-btn-dynamic';
            loginBtn.innerText = 'Sign In';
            
            const toggle = document.querySelector('.mobile-toggle');
            headerActions.insertBefore(loginBtn, toggle);
        }
    }

    updateHeaderState();
});
