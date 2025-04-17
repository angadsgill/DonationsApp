// Mock Prototype - No API calls needed

// Charity functionality
const charity = {
    // --- REMOVED STATIC MOCK DATA ---
    // mockAvailableDonations: [ ... ],
    // mockPendingPickups: 1, // Removed pending stat
    mockTotalReceived: 8, // Keep mock total received for now

    // Render the main dashboard view
    renderDashboard() { // Removed async
        const appContainer = document.getElementById('app');
        if (!appContainer) return;
        // No token check

        appContainer.innerHTML = this.getNavbarHTML('dashboard') + `
            <div class="container dashboard">
                <div class="dashboard-header">
                     <h1 class="page-title">Welcome, ${auth.currentUser?.profile?.organization_name || auth.currentUser?.username || 'Charity'}</h1> <!-- Use page-title -->
                     <!-- Add buttons if needed -->
                </div>
                 <div id="dashboard-error" class="auth-error" style="display: none;"></div>

                <div class="stats-container" id="stats-container">
                    <p>Loading stats...</p>
                </div>

                <div class="card recent-donations-card">
                    <h2 class="page-title">Available Donations</h2> <!-- Use page-title -->
                    <div class="recent-donations-content food-items-container" id="available-donations-container">
                         <p>Loading donations...</p>
                    </div>
                </div>
            </div>
        `;
        this.addEventListeners(); // Add listeners

        // Get available donations dynamically from restaurant data
        const availableDonations = restaurant.donations.filter(d => d.status === 'Available');

        // Calculate summary stats
        const summary = {
            available_donations: availableDonations.length,
            // pending_pickups: ..., // Removed pending stat
            total_donations_received: this.mockTotalReceived // Keep mock total for now
        };
        this.renderStats(summary);

        // Render available donations (sorted by date)
        const sortedDonations = [...availableDonations].sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at) // Assuming created_at exists
        );
        this.renderAvailableDonations(sortedDonations, 'available-donations-container');
    },

    // Render the stats cards (Updated Structure)
    renderStats(summary) {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer || !summary) return;
        statsContainer.innerHTML = `
            <div class="stat-card type-active"> <!-- Assuming 'active' type for available -->
                 <div class="stat-card-icon-bg"></div>
                 <p class="stat-card-description">Available Donations</p>
                 <h3 class="stat-card-title">${summary.available_donations ?? 0}</h3>
                 <div class="stat-card-content">
                    <i class="fas fa-box-open"></i>
                    <span>Ready for pickup</span>
                 </div>
            </div>

            <!-- Removed Pending Pickups Stat Card -->

            <div class="stat-card type-completed"> <!-- Assuming 'completed' type for received -->
                 <div class="stat-card-icon-bg"></div>
                 <p class="stat-card-description">Total Received</p>
                 <h3 class="stat-card-title">${summary.total_donations_received ?? 0}</h3>
                 <div class="stat-card-content">
                    <i class="fas fa-history"></i>
                    <span>Donations received</span>
                 </div>
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

    // Render a single available donation card (Updated Structure)
    renderDonationCard(donation) {
        const expiryDate = donation.exp_date ? new Date(donation.exp_date).toLocaleDateString() : 'N/A'; // Use DateString
        const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

        // Only show 'Available' items, so badge is always Available
        const statusBadgeClass = 'status-available';
        const statusText = 'Available';

        return `
            <div class="food-item-card charity-view-card" data-donation-id="${donation.id}"> <!-- Added charity-view-card class -->
                <div class="food-item-image-wrapper">
                    <img src="${donation.photo_url || transparentPixel}" alt="${donation.name}" class="food-item-image">
                </div>
                <div class="food-item-details">
                    <div class="food-item-header">
                        <div>
                            <h3 class="food-item-title">${donation.name}</h3>
                            <p class="food-item-description">
                                From: <strong>${donation.restaurant?.username || donation.restaurant_username || 'Unknown Restaurant'}</strong>
                            </p>
                            <p class="food-item-description">${donation.description || 'No description.'}</p>
                        </div>
                        <span class="status-badge ${statusBadgeClass}">${statusText}</span>
                    </div>

                    <div class="details-grid">
                        <div class="detail-item">
                            <i class="fas fa-shopping-bag detail-item-icon"></i>
                            <div class="detail-item-content">
                                <span class="detail-item-label">Quantity</span>
                                <span class="detail-item-value">${donation.quantity}</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-tag detail-item-icon"></i>
                            <div class="detail-item-content">
                                <span class="detail-item-label">Category</span>
                                <span class="detail-item-value">${donation.category}</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt detail-item-icon"></i>
                            <div class="detail-item-content">
                                <span class="detail-item-label">Expires</span>
                                <span class="detail-item-value">${expiryDate}</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock detail-item-icon"></i>
                            <div class="detail-item-content">
                                <span class="detail-item-label">Pickup</span>
                                <span class="detail-item-value">${donation.pickup_window_start || '?'} - ${donation.pickup_window_end || '?'}</span>
                            </div>
                        </div>
                         ${donation.dietary_info ? `
                         <div class="detail-item">
                            <i class="fas fa-leaf detail-item-icon"></i> <!-- Example icon for dietary -->
                            <div class="detail-item-content">
                                <span class="detail-item-label">Dietary</span>
                                <span class="detail-item-value">${donation.dietary_info}</span>
                            </div>
                        </div>` : ''}
                    </div>

                    <div class="food-item-actions">
                        <button class="btn btn-primary request-donation">
                           <i class="fas fa-hand-holding-heart"></i> Request Pickup
                        </button>
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
                    <h1 class="page-title">Search Available Donations</h1> <!-- Use page-title -->
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

        // Filter available donations from the restaurant's list
        let baseAvailable = restaurant.donations.filter(d => d.status === 'Available');
        let filteredDonations = baseAvailable;
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

        // Find the donation in the *restaurant's* list
        const donation = restaurant.donations.find(d => d.id == donationId);

        if (donation) {
            // Check if it's actually available before requesting
            if (donation.status === 'Available') {
                 // Simulate success
                 alert(`Pickup request sent for "${donation.name}"! (Mock)`);

                 // Update the status in the central restaurant.donations array
                 donation.status = 'Requested';
                 donation.updated_at = new Date().toISOString(); // Add timestamp for update
                 console.log("Updated donation status in restaurant.donations:", donation);

                 // --- Visual Feedback ---
                 // 1. Visually disable the button
                 if(buttonElement) {
                     buttonElement.textContent = 'Requested';
                     buttonElement.disabled = true;
                 }
                 // 2. Remove the item from this charity's *current view* after a short delay
                 setTimeout(() => {
                     const cardElement = buttonElement?.closest('.food-item-card');
                     cardElement?.remove(); // Remove the card from the DOM
                     // Re-render dashboard stats to reflect one less available item
                     // Note: We removed pending count, so no need to increment that.
                     const availableCount = restaurant.donations.filter(d => d.status === 'Available').length;
                     const summary = {
                         available_donations: availableCount,
                         total_donations_received: this.mockTotalReceived // Keep mock total
                     };
                     this.renderStats(summary);
                 }, 500); // 0.5 second delay
            } else {
                // Donation found but not available
                alert(`"${donation.name}" is no longer available (Status: ${donation.status}).`);
                // Optionally refresh the view to remove it if it shouldn't be shown
                 setTimeout(() => {
                     const cardElement = buttonElement?.closest('.food-item-card');
                     cardElement?.remove();
                 }, 500);
            }

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
                    <h1 class="page-title">Your Charity Profile</h1> <!-- Use page-title -->
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
    displayError(message, containerId = 'dashboard-error') { // Added back for profile page
        const targetContainer = document.getElementById(containerId);
        if (targetContainer) {
            targetContainer.textContent = message;
            targetContainer.style.display = message ? 'block' : 'none';
        } else {
            console.warn(`Error container #${containerId} not found.`);
            if(message) alert(`Error: ${message}`);
        }
    },


    // Generate Navbar HTML (Updated Structure)
    getNavbarHTML(activeLink) {
        const userName = auth.currentUser?.username || 'User';
        const initials = userName?.substring(0, 2).toUpperCase() || '??';

        return `
            <header class="navbar">
                <div class="container navbar-container">
                    <div class="navbar-brand-group">
                        <div class="navbar-logo-placeholder">
                            <i class="fas fa-shopping-bag"></i> <!-- Placeholder Icon -->
                        </div>
                        <a href="#" class="navbar-brand" data-nav="dashboard">MealBridge</a>
                        <span class="role-badge">Charity</span>
                    </div>

                    <nav class="navbar-nav">
                        <a href="#" class="nav-link ${activeLink === 'dashboard' ? 'active' : ''}" data-nav="dashboard">Dashboard</a>
                        <a href="#" class="nav-link ${activeLink === 'search' ? 'active' : ''}" data-nav="search">Search Food</a>
                        <!-- Profile link removed, handled by user display click -->
                        <!-- Add History link if needed -->
                    </nav>

                    <div class="navbar-actions">
                         <!-- Make user display clickable for profile -->
                        <a href="#" class="user-display" data-nav="profile" title="View Profile">
                            <div class="avatar-placeholder">${initials}</div>
                            <span class="user-name">${userName}</span>
                        </a>
                        <button class="btn btn-ghost text-secondary icon-only" data-nav="logout" title="Logout">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            </header>
        `;
    },

    // Centralized Event Listener Setup - Strictest Logic
    addEventListeners() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        // Listener for specific actions within the main app container
        appContainer.addEventListener('click', (e) => {
            // Check for specific action buttons first
            const requestButton = e.target.closest('.request-donation');
            if (requestButton) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     console.log(`Request donation button clicked: ${donationId}`);
                     this.requestDonation(donationId, requestButton); // Pass the button itself
                     return; // Action handled, stop further checks
                 }
            }
            // Add other specific action checks here (e.g., edit/delete if added to charity view)

            // Then check specifically for clicks DIRECTLY on known interactive navigation elements or their direct children (icons)
            let navElement = null;
            const target = e.target;
            const parent = target.parentElement;

            // Check if target or parent matches specific interactive selectors
            if (target.matches('a.nav-link[data-nav], button[data-nav="logout"], a.user-display[data-nav="profile"], a.navbar-brand[data-nav="dashboard"]')) {
                navElement = target;
            } else if (parent?.matches('a.nav-link[data-nav], button[data-nav="logout"], a.user-display[data-nav="profile"], a.navbar-brand[data-nav="dashboard"]')) {
                // Handle clicks on icons inside these elements
                navElement = parent;
            }

            if (navElement) { // Only proceed if the click was directly on or in a known interactive element
                e.preventDefault();
                const targetNav = navElement.dataset.nav;
                console.log(`Navigation Clicked: ${targetNav} on element`, navElement);

                if (targetNav === 'dashboard') this.renderDashboard();
                else if (targetNav === 'search') this.renderSearch();
                else if (targetNav === 'profile') this.renderProfile();
                else if (targetNav === 'logout') {
                    console.log("--- charity.js logout ACTION ---");
                    auth.logout();
                }
            }
            // Otherwise ignore the click completely
        });

         // Listener for search form submission
         const searchForm = document.getElementById('search-filter-form');
         searchForm?.addEventListener('submit', (e) => {
             e.preventDefault();
             this.fetchAndRenderSearchResults();
         });
    }
};