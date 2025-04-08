// Mock Prototype - No API calls needed

// Charity functionality
const charity = {
    // Mock data for available donations (can be adapted from restaurant mock data)
    // Note: In a real mock, this might need to be populated based on restaurant.donations
    // For simplicity here, we'll use a static list.
    mockAvailableDonations: [
         // Corresponds to item 1 from restaurant.js
         {
            id: 1,
            restaurant_username: 'MockResto',
            name: 'Fresh Pasta',
            description: 'Leftover pasta from dinner service, includes vegetarian option.',
            quantity: '5 kg',
            category: 'Prepared Meals',
            exp_date: '2024-07-16T14:00:00Z',
            pickup_window_start: '10:00',
            pickup_window_end: '14:00',
            photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGxJQNLQ_tpfDqgGfFpEARarc7qNGTDVEYg&s',
            status: 'Available',
            dietary_info: 'Vegetarian option available',
            created_at: '2024-07-15T10:00:00Z'
        },
         // Corresponds to item 4 from restaurant.js
         {
            id: 4,
            restaurant_username: 'MockResto', // Assuming same restaurant for simplicity
            name: 'Bread Loaves',
            description: 'Freshly baked sourdough and whole wheat bread.',
            quantity: '10 Loaves',
            category: 'Bakery',
            exp_date: '2024-07-19T23:59:59Z',
            pickup_window_start: '11:00',
            pickup_window_end: '15:00',
            photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIm7FWyiVyVnFxwEbAudo-GstNsbvahOT0MQ&s',
            status: 'Available',
            dietary_info: 'Contains gluten',
            created_at: '2024-07-16T08:00:00Z'
        },
        {
            id: 5,
            restaurant_username: 'MockResto', // Assuming same restaurant for simplicity
            name: 'Mixed Produce Box',
            description: 'Assortment of fresh vegetables (carrots, lettuce, tomatoes).',
            quantity: '2 boxes',
            category: 'Produce',
            exp_date: '2024-07-19T23:59:59Z',
            pickup_window_start: '11:00',
            pickup_window_end: '15:00',
            photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgM8uOdjDlYWAewo6cchk0YRVb72F75TGrA&s',
            status: 'Available',
            dietary_info: 'Vegan, Gluten-Free',
            created_at: '2024-07-16T08:00:00Z'
        },
         // Corresponds to item 5 from restaurant.js - BUT it's 'Approved' there, so shouldn't be listed here.
         // Let's add another available one
         {
            id: 6, // New ID
            restaurant_username: 'MockRestaurant',
            name: 'Apple Pies',
            description: 'Surplus apple pies from yesterday.',
            quantity: '3 pies',
            category: 'Bakery',
            exp_date: '2024-07-17T10:00:00Z',
            pickup_window_start: '08:00',
            pickup_window_end: '09:30',
            photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGvV_1zfnQCiMnjXk7by4zrlZKJQw1yvBIg&s',
            status: 'Available',
            dietary_info: 'Contains dairy, gluten',
            created_at: '2024-07-16T20:00:00Z'
        }

    ],
    // Mock data for charity's history/pending (can be static for demo)
    mockPendingPickups: 1,
    mockTotalReceived: 8,

    // Render the main dashboard view
    renderDashboard() { // Removed async
        const appContainer = document.getElementById('app');
        if (!appContainer) return;
        // No token check

        appContainer.innerHTML = this.getNavbarHTML('dashboard') + `
            <div class="container dashboard">
                <div class="dashboard-header">
                     <h1>Welcome, ${auth.currentUser?.profile?.organization_name || auth.currentUser?.username || 'Charity'}</h1>
                     <!-- Add buttons if needed -->
                </div>
                 <div id="dashboard-error" class="auth-error" style="display: none;"></div>

                <div class="stats-container" id="stats-container">
                    <p>Loading stats...</p>
                </div>

                <div class="card">
                    <h2>Available Donations</h2>
                    <div class="food-items-container" id="available-donations-container">
                         <p>Loading donations...</p>
                    </div>
                </div>
            </div>
        `;
        this.addEventListeners(); // Add listeners

        // Use mock summary data
        const summary = {
            available_donations: this.mockAvailableDonations.length, // Count from mock data
            pending_pickups: this.mockPendingPickups,
            total_donations_received: this.mockTotalReceived
        };
        this.renderStats(summary);

        // Render available donations from mock data (sorted by date)
        const sortedDonations = [...this.mockAvailableDonations].sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        );
        this.renderAvailableDonations(sortedDonations, 'available-donations-container');
    },

    // Render the stats cards
    renderStats(summary) {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer || !summary) return;
        statsContainer.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-box-open"></i> <!-- Reverted icon -->
                <h3>${summary.available_donations ?? 0}</h3>
                <p>Available Donations</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-clock"></i>
                <h3>${summary.pending_pickups ?? 0}</h3>
                <p>Pending Pickups</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-history"></i> <!-- Changed icon -->
                <h3>${summary.total_donations_received ?? 0}</h3>
                <p>Total Received</p> <!-- Updated text -->
            </div>
        `;
    },

    // Render available donations list (used in dashboard and search)
    renderAvailableDonations(donations, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!donations || donations.length === 0) {
            container.innerHTML = '<p>No available donations found matching your criteria.</p>';
            return;
        }
        container.innerHTML = donations.map(donation => this.renderDonationCard(donation)).join('');
        // Re-attach listeners if needed and not using delegation
    },

    // Render a single available donation card
    renderDonationCard(donation) {
        const expiryDate = donation.exp_date ? new Date(donation.exp_date).toLocaleString() : 'N/A';
        // No distance calculation needed
        const defaultImage = 'https://via.placeholder.com/150?text=No+Image';

        return `
            <div class="food-item-card" data-donation-id="${donation.id}">
                 <img src="${donation.photo_url || defaultImage}" alt="${donation.name}" class="food-item-image">
                <div class="food-item-details">
                    <h3>${donation.name}</h3>
                     <p><strong>${donation.restaurant_username || 'Unknown Restaurant'}</strong></p>
                    <p>${donation.description || 'No description.'}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 10px;">
                        <div><strong>Quantity:</strong> ${donation.quantity}</div>
                        <div><strong>Category:</strong> ${donation.category}</div>
                        <div><strong>Expires:</strong> ${expiryDate}</div>
                        <div><strong>Pickup:</strong> ${donation.pickup_window_start || ''} - ${donation.pickup_window_end || ''}</div>
                         ${donation.dietary_info ? `<div><strong>Dietary:</strong> ${donation.dietary_info}</div>` : ''}
                    </div>
                    <div class="food-item-actions">
                        <button class="btn btn-primary request-donation">Request Pickup</button>
                    </div>
                </div>
            </div>
        `;
    },

     // Render the search/filter view
    renderSearch() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        // Define categories matching backend model choices
        const categories = ['Prepared Meals', 'Produce', 'Bakery', 'Dairy', 'Canned Goods', 'Other'];

        appContainer.innerHTML = this.getNavbarHTML('search') + `
            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Search Available Donations</h1>
                </div>
                 <div id="search-error" class="auth-error" style="display: none;"></div>

                <div class="card" style="margin-bottom: 20px;">
                     <form id="search-filter-form">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                            <div class="form-group">
                                <label for="category-filter">Category</label>
                                <select id="category-filter" name="category" class="form-control">
                                    <option value="">All Categories</option>
                                     ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="sort-filter">Sort By</label>
                                <select id="sort-filter" name="sort" class="form-control">
                                    <option value="-created_at">Date Added (Newest First)</option>
                                    <option value="exp_date">Expiry Date (Soonest First)</option>
                                </select>
                            </div>
                             <!-- Distance filter input (requires backend support) -->
                             <!--
                             <div class="form-group">
                                 <label for="distance-filter">Max Distance (km)</label>
                                 <input type="number" id="distance-filter" name="max_distance" class="form-control" placeholder="e.g., 10">
                             </div>
                             -->
                             <div class="form-group" style="align-self: end;">
                                 <button type="submit" class="btn btn-primary">Search</button>
                             </div>
                        </div>
                     </form>
                </div>

                <div class="food-items-container" id="search-results-container">
                    <p>Loading donations...</p>
                </div>
            </div>
        `;
        this.addEventListeners(); // Add nav listeners and form listener

        // Initial load sorted by distance
        this.fetchAndRenderSearchResults(); // Initial load sorted by date
    },

    // Fetch and render search results based on filters
    fetchAndRenderSearchResults() { // Removed async
        // No token check
        const form = document.getElementById('search-filter-form');
        const categoryFilter = form?.elements['category']?.value || '';
        const sortFilter = form?.elements['sort']?.value || '-created_at';

        const resultsContainer = document.getElementById('search-results-container');
        if(resultsContainer) resultsContainer.innerHTML = '<p>Filtering...</p>';

        // Filter mock data
        let filteredDonations = this.mockAvailableDonations;
        if (categoryFilter) {
            filteredDonations = filteredDonations.filter(d => d.category === categoryFilter);
        }

        // Sort mock data
        filteredDonations.sort((a, b) => {
            if (sortFilter === '-created_at') {
                return new Date(b.created_at) - new Date(a.created_at);
            } else if (sortFilter === 'exp_date') {
                return new Date(a.exp_date) - new Date(b.exp_date);
            }
            return 0; // Default no sort if unexpected value
        });

        this.renderAvailableDonations(filteredDonations, 'search-results-container');
    },

    // Handle Request Donation Button Click
    requestDonation(donationId, buttonElement) { // Removed async
        // No token check
        console.log(`Requesting donation ID (mock): ${donationId}`);

        // Find the donation in the mock list
        const donation = this.mockAvailableDonations.find(d => d.id == donationId);

        if (donation) {
             // Simulate success
             alert(`Pickup request sent for "${donation.name}"! (Mock)`);

             // --- Improved Simulation ---
             // 1. Visually disable the button
             if(buttonElement) {
                 buttonElement.textContent = 'Requested';
                 buttonElement.disabled = true;
             }
             // 2. (Optional) Remove the item from this charity's available list after a short delay
             //    to simulate it being claimed.
             setTimeout(() => {
                 const cardElement = buttonElement?.closest('.food-item-card');
                 cardElement?.remove(); // Remove the card from the DOM
                 // Also remove from the mock array to prevent reappearing on filter/sort
                 this.mockAvailableDonations = this.mockAvailableDonations.filter(d => d.id != donationId);
                 // Update dashboard count if needed
                 const summary = {
                     available_donations: this.mockAvailableDonations.length,
                     pending_pickups: this.mockPendingPickups + 1, // Increment pending
                     total_donations_received: this.mockTotalReceived
                 };
                 this.renderStats(summary);
                 this.mockPendingPickups++; // Update the stored count
             }, 500); // 0.5 second delay

        } else {
             console.error("Mock request failed: Donation not found with ID", donationId);
             alert('Error: Could not find donation to request.');
             if(buttonElement) { // Re-enable button on error
                buttonElement.disabled = false;
                buttonElement.textContent = 'Request Pickup';
            }
        }
    },

     // Render Profile View (Similar to Restaurant)
    renderProfile() { // Removed async
        const appContainer = document.getElementById('app');
        if (!appContainer) return;
        // No token check

        appContainer.innerHTML = this.getNavbarHTML('profile') + `
            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Your Charity Profile</h1>
                </div>
                 <div id="profile-error" class="auth-error" style="display: none;"></div>
                 <div class="card" id="profile-content">
                    <p>Loading profile...</p>
                 </div>
            </div>
        `;
         this.addEventListeners(); // Add listeners

         // Render form using current mock user data
         if (auth.currentUser) {
            this.renderProfileForm(auth.currentUser);
         } else {
             this.displayError('User data not found.', 'profile-error');
         }
    },

    // Render the profile form with data (Charity specific fields added)
    renderProfileForm(userData) {
        const profileContent = document.getElementById('profile-content');
        if (!profileContent || !userData) return;

        const profile = userData.profile || {};

        profileContent.innerHTML = `
            <form id="profile-form" class="styled-form">
                 <div class="form-group">
                    <label for="profile-username">Username</label>
                    <input type="text" id="profile-username" class="form-control" value="${userData.username || ''}" readonly disabled>
                    <small>Username cannot be changed.</small>
                </div>
                 <div class="form-group">
                    <label for="profile-email">Email</label>
                    <input type="email" id="profile-email" class="form-control" value="${userData.email || ''}" required>
                </div>
                 <div class="form-group">
                    <label for="profile-org-name">Organization Name</label>
                    <input type="text" id="profile-org-name" class="form-control" value="${profile.organization_name || ''}">
                </div>
                 <div class="form-group">
                    <label for="profile-phone">Contact Phone</label>
                    <input type="tel" id="profile-phone" class="form-control" value="${profile.contact_phone || ''}">
                </div>
                 <div class="form-group">
                    <label for="profile-address">Address</label>
                    <textarea id="profile-address" class="form-control" rows="3">${profile.address || ''}</textarea>
                </div>
                 <!-- Lat/Lon fields were removed -->
                 <div class="form-group">
                    <label for="profile-service-area">Service Area Description</label>
                    <textarea id="profile-service-area" class="form-control" rows="2">${profile.service_area || ''}</textarea>
                </div>
                 <div class="form-group">
                    <label for="profile-needs">Specific Needs</label>
                    <textarea id="profile-needs" class="form-control" rows="2">${profile.needs || ''}</textarea>
                </div>

                 <div class="modal-actions">
                     <button type="submit" class="btn btn-primary">Save Changes</button>
                 </div>
            </form>
        `;
        // Add listener for the profile form submission
        const profileForm = document.getElementById('profile-form');
        profileForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileUpdate();
        });
    },

    // Handle profile update submission (Similar to Restaurant)
    handleProfileUpdate() { // Removed async
        // No token check

        this.displayError('', 'profile-error');

        const updatedUserData = {
            email: document.getElementById('profile-email')?.value,
            profile: {
                organization_name: document.getElementById('profile-org-name')?.value,
                contact_phone: document.getElementById('profile-phone')?.value,
                address: document.getElementById('profile-address')?.value,
                // latitude: parseFloat(document.getElementById('profile-lat')?.value) || null, // Removed
                // longitude: parseFloat(document.getElementById('profile-lon')?.value) || null, // Removed
                service_area: document.getElementById('profile-service-area')?.value, // Charity field
                needs: document.getElementById('profile-needs')?.value,             // Charity field
            }
        };

        if (!updatedUserData.email) {
             this.displayError('Email is required.', 'profile-error');
             return;
        }

        // Update the mock auth.currentUser object directly
        if (auth.currentUser) {
            auth.currentUser.email = updatedUserData.email;
            if (auth.currentUser.profile) {
                 auth.currentUser.profile.organization_name = updatedUserData.profile.organization_name;
                 auth.currentUser.profile.contact_phone = updatedUserData.profile.contact_phone;
                 auth.currentUser.profile.address = updatedUserData.profile.address;
                 auth.currentUser.profile.service_area = updatedUserData.profile.service_area;
                 auth.currentUser.profile.needs = updatedUserData.profile.needs;
            } else {
                 auth.currentUser.profile = updatedUserData.profile; // Create if missing
            }
            console.log("Mock profile updated:", auth.currentUser);
            alert("Profile updated successfully! (Mock)");
            this.renderProfile(); // Re-render
        } else {
             const errorDiv = document.getElementById('profile-error');
             if(errorDiv) {
                 errorDiv.textContent = 'Cannot update profile: User not found.';
                 errorDiv.style.display = 'block';
             }
        }
    },

    // Display error messages
    // Removed displayError function

    // Generate Navbar HTML
    getNavbarHTML(activeLink) {
        const userName = auth.currentUser?.profile?.organization_name || auth.currentUser?.username || 'User';
        return `
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="#" class="navbar-brand">Food Donation App (Charity)</a>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a href="#" class="nav-link ${activeLink === 'dashboard' ? 'active' : ''}" data-nav="dashboard">Dashboard</a></li>
                        <li class="nav-item"><a href="#" class="nav-link ${activeLink === 'search' ? 'active' : ''}" data-nav="search">Search Food</a></li>
                        <li class="nav-item"><a href="#" class="nav-link ${activeLink === 'profile' ? 'active' : ''}" data-nav="profile">Profile</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" data-nav="logout">Logout (${userName})</a></li>
                    </ul>
                </div>
            </nav>
        `;
    },

    // Centralized Event Listener Setup
    addEventListeners() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        // Use event delegation
        appContainer.replaceWith(appContainer.cloneNode(true)); // Simple way to remove old listeners
        document.getElementById('app').addEventListener('click', async (e) => {
            // Navigation Links
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                const targetNav = e.target.dataset.nav;
                if (targetNav === 'dashboard') this.renderDashboard();
                else if (targetNav === 'search') this.renderSearch();
                else if (targetNav === 'profile') this.renderProfile();
                else if (targetNav === 'logout') auth.logout();
            }
            // Request Donation Button
            else if (e.target.matches('.request-donation')) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     this.requestDonation(donationId, e.target); // Pass button for disabling
                 }
            }
        });

         // Listener for search form submission
         const searchForm = document.getElementById('search-filter-form');
         searchForm?.addEventListener('submit', (e) => {
             e.preventDefault();
             this.fetchAndRenderSearchResults();
         });
    }
};