// Mock Prototype - No API calls needed

// Restaurant functionality
const restaurant = {
    // Mock data for restaurant
    donations: [
         // Removed extra opening bracket [
            {
                id: 1,
                name: 'Fresh Pasta',
                description: 'Leftover pasta from dinner service, includes vegetarian option.',
                quantity: '5 kg',
                category: 'Prepared Meals',
                prep_date: '2024-07-15',
                exp_date: '2024-07-16T14:00:00Z',
                pickup_window_start: '10:00',
                pickup_window_end: '14:00',
                photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtGxJQNLQ_tpfDqgGfFpEARarc7qNGTDVEYg&s', // linguine & cherry tomatoes
                status: 'Available',
                dietary_info: 'Vegetarian option available',
                charity: null,
                restaurant: { username: 'MockResto' }
            },
            {
                id: 2,
                name: 'Bread Loaves',
                description: 'Freshly baked sourdough and whole wheat bread from this morning.',
                quantity: '10 loaves',
                category: 'Bakery',
                prep_date: '2024-07-15',
                exp_date: '2024-07-17T18:00:00Z',
                pickup_window_start: '16:00',
                pickup_window_end: '18:00',
                photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIm7FWyiVyVnFxwEbAudo-GstNsbvahOT0MQ&s', // classic sourdough
                status: 'Available',
                dietary_info: 'Contains gluten',
                charity: { username: 'MockCharity' },
                restaurant: { username: 'MockResto' }
            },
            {
                id: 3,
                name: 'Apple Pies',
                description: 'Surplus apple pies from yesterday.',
                quantity: '3 pies',
                category: 'Bakery',
                prep_date: '2024-07-16',
                exp_date: '2024-07-18T12:00:00Z',
                pickup_window_start: '09:00',
                pickup_window_end: '11:00',
                photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShGvV_1zfnQCiMnjXk7by4zrlZKJQw1yvBIg&s', // lattice‑top apple pie
                status: 'Available',
                dietary_info: 'Contains gluten, dairy',
                charity: { username: 'MockCharity' },
                restaurant: { username: 'MockResto' }
            },
            {
                id: 4,
                name: 'Mixed Produce Box',
                description: 'Assortment of fresh vegetables (carrots, lettuce, tomatoes).',
                quantity: '2 boxes',
                category: 'Produce',
                prep_date: null,
                exp_date: '2024-07-19T23:59:59Z',
                pickup_window_start: '11:00',
                pickup_window_end: '15:00',
                photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgM8uOdjDlYWAewo6cchk0YRVb72F75TGrA&s', // assorted veg box
                status: 'Available',
                dietary_info: 'Vegan, Gluten-Free',
                charity: null,
                restaurant: { username: 'MockResto' }
            },

], // Add comma after closing bracket
    // Removed extra closing bracket ]
    nextDonationId: 6, // Update next ID based on added items

    // Render the main dashboard view
    renderDashboard() { // Removed async
        const appContainer = document.getElementById('app');
        if (!appContainer) return;
        // No token check needed

        // Basic structure with loading indicators
        // Add Navbar and Dashboard structure
        appContainer.innerHTML = this.getNavbarHTML('dashboard') + `
            <main class="container dashboard">
                <div class="dashboard-header">
                    <div> <!-- Wrapper for text content -->
                        <h2 class="page-title">Welcome, ${auth.currentUser?.username || 'Restaurant'}</h2> <!-- Use page-title -->
                        <p class="text-secondary">Manage your food donations and help reduce waste</p>
                    </div>
                    <!-- Button moved to recent donations header -->
                    <!-- <div class="dashboard-actions"> ... </div> -->
                </div>
                <div id="dashboard-error" class="auth-error" style="display: none;"></div>

                <div class="stats-container" id="stats-container">
                    <p>Loading stats...</p>
                </div>

                <div class="card recent-donations-card">
                    <div class="recent-donations-header">
                        <h2 class="card-title">Recent Donations</h2>
                        <div> <!-- Wrapper for right-aligned items -->
                            <a href="#" class="view-all-link" data-nav="inventory">
                                View All <i class="fas fa-chevron-right"></i>
                            </a>
                            <button class="btn btn-primary" id="add-donation-btn" style="margin-left: 1rem;"> <!-- Added button here -->
                                <i class="fas fa-plus-circle"></i> Add New Donation
                            </button>
                        </div>
                    </div>
                    <div class="recent-donations-content food-items-container" id="recent-donations-container">
                        <p>Loading donations...</p>
                    </div>
                </div>
            </div>
        `;
        this.addEventListeners(); // Add listeners

        // Calculate stats from local mock data (Only Active and Completed)
        const summary = {
             active_donations: this.donations.filter(d => d.status === 'Available').length,
             // pending_pickups: this.donations.filter(d => ['Requested', 'Approved'].includes(d.status)).length, // Removed Pending
             completed_donations: this.donations.filter(d => d.status === 'Completed').length
        };
        this.renderStats(summary);

        // Render recent donations from local mock data (newest first, only Available or Completed)
        const recentDonations = [...this.donations]
            .filter(d => d.status === 'Available' || d.status === 'Completed') // Filter statuses
            .sort((a, b) => b.id - a.id)
            .slice(0, 5);
        this.renderRecentDonations(recentDonations);
    },

    // Render the stats cards
    renderStats(summary) {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer || !summary) return;
        // Add static mock data for new stats
        const mockTotalFoodSaved = "18 kg"; // As per demo image
        const mockCharitiesHelped = 2;      // As per demo image

        statsContainer.innerHTML = `
            <div class="stat-card type-active">
                 <div class="stat-card-icon-bg"></div>
                 <p class="stat-card-description">Active Donations</p>
                 <h3 class="stat-card-title">
                    ${summary.active_donations ?? 0}
                    <!-- <span class="stat-card-subtitle positive">+1 this week</span> --> <!-- Subtitle logic not implemented -->
                 </h3>
                 <div class="stat-card-content">
                    <i class="fas fa-box-open"></i>
                    <span>Ready for pickup</span>
                 </div>
            </div>

            <div class="stat-card type-completed">
                 <div class="stat-card-icon-bg"></div>
                 <p class="stat-card-description">Completed Donations</p>
                 <h3 class="stat-card-title">${summary.completed_donations ?? 0}</h3>
                 <div class="stat-card-content">
                    <i class="fas fa-check-circle"></i>
                    <span>Successfully delivered</span>
                 </div>
            </div>

            <div class="stat-card type-saved">
                 <div class="stat-card-icon-bg"></div>
                 <p class="stat-card-description">Total Food Saved</p>
                 <h3 class="stat-card-title">${mockTotalFoodSaved}</h3>
                 <div class="stat-card-content">
                    <i class="fas fa-shopping-bag"></i>
                    <span>Prevented food waste</span>
                 </div>
            </div>

            <div class="stat-card type-helped">
                 <div class="stat-card-icon-bg"></div>
                 <p class="stat-card-description">Charities Helped</p>
                 <h3 class="stat-card-title">${mockCharitiesHelped}</h3>
                 <div class="stat-card-content">
                    <i class="fas fa-user"></i> <!-- Using user icon for charities -->
                    <span>Community impact</span>
                 </div>
            </div>
            </div> <!-- This closes the type-helped card -->
            <!-- Remove the extra incorrect card below -->
            <!--
            <div class="stat-card">
                <i class="fas fa-check-circle"></i>
                <h3>${summary.completed_donations ?? 0}</h3>
                <p>Completed Donations</p>
            </div>
            -->
        `;
    },

    // Render recent donations list
    renderRecentDonations(donations) {
        const container = document.getElementById('recent-donations-container');
        if (!container) return;
        if (!donations || donations.length === 0) {
            container.innerHTML = '<p>No recent donations found.</p>';
            return;
        }
        container.innerHTML = donations.map(donation => this.renderFoodItemCard(donation)).join('');
        // Re-attach listeners for edit/delete buttons within this container if not using delegation
    },

    // Render a single donation card (used in dashboard)
    renderFoodItemCard(donation) {
        // Format dates/times nicely (basic example)
        const expiryDate = donation.exp_date ? new Date(donation.exp_date).toLocaleDateString() : 'N/A'; // Use DateString for card
        // const defaultImage = 'https://via.placeholder.com/150?text=No+Image'; // No longer needed
        const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent pixel

        // Determine status badge class and text
        let statusBadgeClass = '';
        let statusText = donation.status; // Default to the status value

        if (donation.status === 'Available') {
            statusBadgeClass = 'status-available'; // Uses styles defined in CSS
            statusText = 'Available';
        } else if (donation.status === 'Completed') {
            // Add a class for completed if specific styling is needed, otherwise default
            // statusBadgeClass = 'status-completed';
            statusText = 'Completed';
        }
        // Add other conditions for 'Requested', 'Approved' if they were to be shown

        return `
            <div class="food-item-card" data-donation-id="${donation.id}">
                <div class="food-item-image-wrapper">
                    <img src="${donation.photo_url || transparentPixel}" alt="${donation.name}" class="food-item-image">
                </div>
                <div class="food-item-details">
                    <div class="food-item-header">
                        <div>
                            <h3 class="food-item-title">${donation.name}</h3>
                            <p class="food-item-description">${donation.description || 'No description.'}</p>
                        </div>
                        ${statusBadgeClass ? `<span class="status-badge ${statusBadgeClass}">${statusText}</span>` : ''}
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
                    </div>

                    <div class="food-item-actions">
                        <button class="btn btn-outline btn-outline-primary edit-donation">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-outline btn-outline-danger delete-donation">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                        <!-- Approve button removed as 'Requested'/'Approved' statuses are hidden -->
                    </div>
                </div>
            </div>
        `;
    },

    // Render the full inventory table view
    renderInventory() { // Removed async
        const appContainer = document.getElementById('app');
        if (!appContainer) return;
        // No token check

        appContainer.innerHTML = this.getNavbarHTML('inventory') + `
            <main class="container dashboard">
                <div class="dashboard-header">
                    <h1 class="page-title">Food Inventory</h1> <!-- Use page-title -->
                    <button class="btn btn-primary" id="add-donation-btn">
                        <i class="fas fa-plus-circle"></i> Add New Item
                    </button>
                </div>
                 <div id="inventory-error" class="auth-error" style="display: none;"></div>
                 <!-- Removed outer card and table structure -->
                 <div class="food-items-container" id="inventory-items-container">
                     <p>Loading inventory...</p>
                 </div>
            </main>
            </div>
        `;
        this.addEventListeners(); // Add listeners

        // Filter and render table from local mock data (Only Available and Completed)
        const filteredDonations = this.donations.filter(d => d.status === 'Available' || d.status === 'Completed');
        this.renderInventoryItems(filteredDonations); // Renamed function call
    },

    // Render inventory items using the card component
    renderInventoryItems(donations) { // Renamed function
        const container = document.getElementById('inventory-items-container'); // Changed target ID
        if (!container) return;

        if (!donations || donations.length === 0) {
            container.innerHTML = '<p>No donations found in inventory.</p>'; // Updated message
            return;
        }

        // Map donations to card HTML using the existing renderFoodItemCard function
        container.innerHTML = donations.map(item => this.renderFoodItemCard(item)).join('');

        // Event listeners are likely handled by delegation in addEventListeners,
        // so re-attaching might not be needed here.
    },

     // Render Profile View (Basic)
    renderProfile() { // Removed async
        const appContainer = document.getElementById('app');
        if (!appContainer) return;
        // No token check

        appContainer.innerHTML = this.getNavbarHTML('profile') + `
            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1 class="page-title">Your Profile</h1> <!-- Applied page-title -->
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

    // Render the profile form with data
    renderProfileForm(userData) {
        const profileContent = document.getElementById('profile-content');
        if (!profileContent || !userData) return;

        const profile = userData.profile || {}; // Handle case where profile might be null initially

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
                 <!-- Removed Lat/Lon fields -->
                 <!--
                 <div class="form-grid">
                     <div class="form-group">
                        <label for="profile-lat">Latitude</label>
                        <input type="number" step="any" id="profile-lat" class="form-control" value="${profile.latitude || ''}">
                    </div>
                     <div class="form-group">
                        <label for="profile-lon">Longitude</label>
                        <input type="number" step="any" id="profile-lon" class="form-control" value="${profile.longitude || ''}">
                    </div>
                 </div>
                 -->
                 <!-- Add other fields like operating hours if needed -->

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

    // Handle profile update submission
    handleProfileUpdate() { // Removed async
        // No token check

        this.displayError('', 'profile-error'); // Clear previous errors

        const updatedUserData = {
            email: document.getElementById('profile-email')?.value,
            // Cannot update username or role via this form
            profile: {
                organization_name: document.getElementById('profile-org-name')?.value,
                contact_phone: document.getElementById('profile-phone')?.value,
                address: document.getElementById('profile-address')?.value,
                // latitude: parseFloat(document.getElementById('profile-lat')?.value) || null, // Removed
                // longitude: parseFloat(document.getElementById('profile-lon')?.value) || null, // Removed
            }
        };

        // Basic validation
        if (!updatedUserData.email) {
             this.displayError('Email is required.', 'profile-error');
             return;
        }

        // Update the mock auth.currentUser object directly
        if (auth.currentUser) {
            auth.currentUser.email = updatedUserData.email;
            if (auth.currentUser.profile) { // Ensure profile object exists
                 auth.currentUser.profile.organization_name = updatedUserData.profile.organization_name;
                 auth.currentUser.profile.contact_phone = updatedUserData.profile.contact_phone;
                 auth.currentUser.profile.address = updatedUserData.profile.address;
            } else { // Create profile if it somehow doesn't exist
                 auth.currentUser.profile = updatedUserData.profile;
            }
            console.log("Mock profile updated:", auth.currentUser);
            alert("Profile updated successfully! (Mock)");
            this.renderProfile(); // Re-render to show changes
        } else {
             this.displayError('Cannot update profile: User not found.', 'profile-error');
        }
    },

    // Display error messages in specific containers (Re-added for mock)
    displayError(message, containerId = 'dashboard-error') {
        // Try finding the container within the modal first if relevant
        const modalErrorContainer = document.querySelector(`#${containerId}`);
        const targetContainer = modalErrorContainer || document.getElementById(containerId);

        if (targetContainer) {
            targetContainer.textContent = message;
            targetContainer.style.display = message ? 'block' : 'none';
        } else {
            console.warn(`Error container #${containerId} not found.`);
            // Fallback alert if container not found
            if(message) alert(`Error: ${message}`);
        }
    },


    // Show Add/Edit Donation Modal
    showAddDonationForm(existingDonation = null) {
        // --- FIX: Ensure only one modal exists ---
        this.closeModal(); // Close any existing modal first
        // --- End FIX ---

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        // Format dates for input fields (YYYY-MM-DD and HH:MM)
        const expValue = existingDonation?.exp_date ? existingDonation.exp_date.slice(0, 10) : ''; // Format as YYYY-MM-DD for date input
        const prepValue = existingDonation?.prep_date || ''; // YYYY-MM-DD
        const pickupStartValue = existingDonation?.pickup_window_start?.slice(0, 5) || ''; // HH:MM
        const pickupEndValue = existingDonation?.pickup_window_end?.slice(0, 5) || ''; // HH:MM

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${existingDonation ? 'Edit' : 'Add New'} Donation</h2>
                    <button class="modal-close">&times;</button>
                </div>
                 <div id="donation-form-error" class="auth-error" style="display: none;"></div>
                <form id="donation-form" class="styled-form">
                    <input type="hidden" id="donation-id" value="${existingDonation?.id || ''}">
                    <div class="form-group">
                        <label for="food-name">Food Name</label>
                        <input type="text" id="food-name" class="form-control" required value="${existingDonation?.name || ''}">
                    </div>
                    <div class="form-group">
                        <label for="food-description">Description</label>
                        <textarea id="food-description" class="form-control" rows="3">${existingDonation?.description || ''}</textarea>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="food-quantity">Quantity (e.g., 5 kg, 10 loaves)</label>
                            <input type="text" id="food-quantity" class="form-control" required value="${existingDonation?.quantity || ''}">
                        </div>
                        <div class="form-group">
                            <label for="food-category">Category</label>
                            <select id="food-category" class="form-control" required>
                                <option value="Prepared Meals" ${existingDonation?.category === 'Prepared Meals' ? 'selected' : ''}>Prepared Meals</option>
                                <option value="Bakery" ${existingDonation?.category === 'Bakery' ? 'selected' : ''}>Bakery</option>
                                <option value="Produce" ${existingDonation?.category === 'Produce' ? 'selected' : ''}>Produce</option>
                                <option value="Canned Goods" ${existingDonation?.category === 'Canned Goods' ? 'selected' : ''}>Canned Goods</option>
                                <option value="Dairy" ${existingDonation?.category === 'Dairy' ? 'selected' : ''}>Dairy</option>
                                <option value="Other" ${existingDonation?.category === 'Other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                    </div>
                     <div class="form-group">
                        <label for="dietary-info">Dietary Info (e.g., vegetarian, contains nuts)</label>
                        <input type="text" id="dietary-info" class="form-control" value="${existingDonation?.dietary_info || ''}">
                    </div>
                    <div class="form-grid">
                         <div class="form-group">
                            <label for="prep-date">Preparation Date (Optional)</label>
                            <input type="date" id="prep-date" class="form-control" value="${prepValue}">
                        </div>
                        <div class="form-group">
                            <label for="expiry-date">Expiry Date</label>
                            <input type="date" id="expiry-date" class="form-control" required value="${expValue}">
                        </div>
                    </div>
                     <div class="form-grid">
                         <div class="form-group">
                            <label for="pickup-start">Pickup Window Start Time</label>
                            <input type="time" id="pickup-start" class="form-control" required value="${pickupStartValue}">
                        </div>
                        <div class="form-group">
                            <label for="pickup-end">Pickup Window End Time</label>
                            <input type="time" id="pickup-end" class="form-control" required value="${pickupEndValue}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="food-image">Image URL (Optional)</label>
                        <input type="url" id="food-image" class="form-control" value="${existingDonation?.photo_url || ''}">
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-donation">Cancel</button>
                        <button type="submit" class="btn btn-primary">${existingDonation ? 'Save Changes' : 'Add Donation'}</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        // Add modal-specific event listeners
        modalOverlay.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        modalOverlay.querySelector('#cancel-donation').addEventListener('click', () => this.closeModal());
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) this.closeModal();
        });

        document.getElementById('donation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleDonationSubmit(existingDonation);
        });
    },

    // Handle Add/Edit Donation Form Submission
    handleDonationSubmit(existingDonation) { // Removed async
        console.log("--- handleDonationSubmit START ---", { existingDonation }); // Log start
        // No token check

        this.displayError('', 'donation-form-error'); // Clear previous errors

        const donationId = document.getElementById('donation-id')?.value;
        const isEditing = !!donationId;

        const expDateValue = document.getElementById('expiry-date')?.value; // This will be YYYY-MM-DD
        // Store it with a default time in mock data for consistency, e.g., end of day
        const expDateForMock = expDateValue ? `${expDateValue}T23:59:59Z` : null;

        const donationData = {
            name: document.getElementById('food-name')?.value,
            description: document.getElementById('food-description')?.value,
            quantity: document.getElementById('food-quantity')?.value,
            category: document.getElementById('food-category')?.value,
            dietary_info: document.getElementById('dietary-info')?.value,
            prep_date: document.getElementById('prep-date')?.value || null, // Send null if empty
            exp_date: expDateForMock, // Store with default time for mock data consistency
            pickup_window_start: document.getElementById('pickup-start')?.value,
            pickup_window_end: document.getElementById('pickup-end')?.value,
            photo_url: document.getElementById('food-image')?.value || null, // Send null if empty
        };
        console.log("Collected donationData:", donationData); // Log collected data
        // --- REMOVED INCORRECT PUSH/LOG ---
        // this.donations.push(newDonation); // This line adds to the array
        // console.log("Mock donation added:", newDonation); // Log addition
        // console.log("Donations array after push:", this.donations); // Log array state
        // --- END REMOVAL ---

        console.log("Before validation check"); // Log before validation
        // Basic validation
        if (!donationData.name || !donationData.quantity || !donationData.category || !donationData.exp_date || !donationData.pickup_window_start || !donationData.pickup_window_end) {
            console.error("Validation FAILED"); // Log validation failure
            this.displayError('Please fill in all required fields (Name, Quantity, Category, Expiry, Pickup Window).', 'donation-form-error'); // Ensure this is called
            return;
        }
        console.log("Validation PASSED"); // Log validation success

        // Simulate adding/editing in the local array
        if (isEditing) {
            console.log("Entering EDIT block"); // Log entering edit block
            // Find and update existing
            const index = this.donations.findIndex(d => d.id == donationId); // Use == for potential type difference
            if (index !== -1) {
                // Merge new data with existing, keeping ID and status (unless status needs update logic)
                this.donations[index] = { ...this.donations[index], ...donationData };
                console.log("Mock donation updated:", this.donations[index]);
            } else {
                 console.error("Mock edit failed: Donation not found with ID", donationId);
                 this.displayError('Error: Could not find donation to update.', 'donation-form-error'); // Ensure this is called
                 return; // Stop if not found
            }
        } else {
            console.log("Entering ADD block"); // Log entering add block
            // Add new donation
            const newDonation = {
                ...donationData,
                id: this.nextDonationId++, // Assign next ID
                status: 'Available', // Default status
                restaurant: { username: auth.currentUser?.username || 'MockResto' }, // Link to mock user
                charity: null,
                created_at: new Date().toISOString(), // Add timestamp
                updated_at: new Date().toISOString()
            };
            this.donations.push(newDonation);
            console.log("Mock donation added:", newDonation);
        }

        console.log("Before closeModal"); // Log before close
        this.closeModal();
        console.log("Before renderDashboard"); // Log before render
        // --- FIX: Re-render the dashboard to update stats and recent donations ---
        this.renderDashboard();
        console.log("--- handleDonationSubmit END ---"); // Log end
        // --- End FIX ---
    },

     // Handle Edit Donation Button Click
    editDonation(donationId) { // Removed async
        console.log(`Editing donation ID (mock): ${donationId}`);
        const donationData = this.donations.find(d => d.id == donationId);
        if (donationData) {
            this.showAddDonationForm(donationData);
        } else {
            console.error("Mock edit failed: Donation not found with ID", donationId);
            alert('Error: Could not find donation details.');
        }
    },

    // Handle Delete Donation Button Click
    deleteDonation(donationId) { // Removed async
        console.log(`Deleting donation ID (mock): ${donationId}`);
        if (confirm('Are you sure you want to delete this donation?')) {
            const index = this.donations.findIndex(d => d.id == donationId);
            if (index !== -1) {
                this.donations.splice(index, 1); // Remove item from array
                console.log("Mock donation deleted.");
                // Decide which view to refresh based on current context?
                // For simplicity, always refresh dashboard for now after delete
                this.renderDashboard();
                // this.renderInventory(); // Or maybe inventory if that's where delete happened?
            } else {
                 console.error("Mock delete failed: Donation not found with ID", donationId);
                 alert('Error: Could not find donation to delete.');
            }
        }
    },

     // Handle Approve Donation Button Click
    approveDonation(donationId) { // Removed async
        console.log(`Approving donation ID (mock): ${donationId}`);
        const donation = this.donations.find(d => d.id == donationId);
        if (donation) {
            if (donation.status === 'Requested') {
                donation.status = 'Approved';
                donation.updated_at = new Date().toISOString();
                console.log("Mock donation approved.");
                // Refresh the view where the button was clicked (assume inventory for now)
                // This might need adjustment if approve can happen elsewhere
                this.renderInventory(); // Refresh inventory list
            } else {
                 alert('Error: Donation is not in a "Requested" state.');
            }
        } else {
             console.error("Mock approve failed: Donation not found with ID", donationId);
             alert('Error: Could not find donation to approve.');
        }
    },


    // Close any open modal
    closeModal() {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    },

    // displayError function re-added above

    // Generate Navbar HTML
    getNavbarHTML(activeLink) {
        const userName = auth.currentUser?.username || 'User';
        // Generate initials for avatar placeholder
        const initials = userName?.substring(0, 2).toUpperCase() || '??';

        return `
            <header class="navbar">
                <div class="container navbar-container">
                    <div class="navbar-brand-group">
                        <div class="navbar-logo-placeholder">
                            <i class="fas fa-shopping-bag"></i> <!-- Placeholder Icon -->
                        </div>
                        <a href="#" class="navbar-brand" data-nav="dashboard">MealBridge</a>
                        <span class="role-badge">Restaurant</span>
                    </div>

                    <nav class="navbar-nav">
                        <a href="#" class="nav-link ${activeLink === 'dashboard' ? 'active' : ''}" data-nav="dashboard">Dashboard</a>
                        <a href="#" class="nav-link ${activeLink === 'inventory' ? 'active' : ''}" data-nav="inventory">Inventory</a>
                        <!-- Profile link removed from main nav -->
                    </nav>

                    <div class="navbar-actions">
                        <!-- Search input removed for simplicity in vanilla JS version -->
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

    // Centralized Event Listener Setup (using delegation) - Strictest Logic
    addEventListeners() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        // Listener for specific actions within the main app container
        appContainer.addEventListener('click', (e) => {
             // Check for specific action buttons first
            if (e.target.matches('#add-donation-btn') || e.target.closest('#add-donation-btn')) { // Keep closest for button icon clicks
                console.log("Add donation button clicked");
                this.showAddDonationForm();
                return; // Handled
            }
            if (e.target.matches('.edit-donation') || e.target.closest('.edit-donation')) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     console.log(`Edit donation button clicked: ${donationId}`);
                     this.editDonation(donationId);
                     return; // Handled
                 }
            }
            if (e.target.matches('.delete-donation') || e.target.closest('.delete-donation')) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     console.log(`Delete donation button clicked: ${donationId}`);
                     this.deleteDonation(donationId);
                     return; // Handled
                 }
            }
            if (e.target.matches('.approve-donation') || e.target.closest('.approve-donation')) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     console.log(`Approve donation button clicked: ${donationId}`);
                     this.approveDonation(donationId);
                     return; // Handled
                 }
            }

            // Then check specifically for clicks DIRECTLY on known interactive navigation elements or their direct children (icons)
            let navElement = null;
            const target = e.target;
            const parent = target.parentElement;

            // Check if target or parent matches specific interactive selectors
            if (target.matches('a.nav-link[data-nav], button[data-nav="logout"], a.user-display[data-nav="profile"], a.view-all-link[data-nav="inventory"], a.navbar-brand[data-nav="dashboard"]')) {
                navElement = target;
            } else if (parent?.matches('a.nav-link[data-nav], button[data-nav="logout"], a.user-display[data-nav="profile"], a.view-all-link[data-nav="inventory"], a.navbar-brand[data-nav="dashboard"]')) {
                // Handle clicks on icons inside these elements
                navElement = parent;
            }

            // Add logging BEFORE the check to see what's being evaluated
            console.log('[DEBUG] Click Target:', e.target);
            console.log('[DEBUG] Identified navElement:', navElement);

            if (navElement) { // Only proceed if the click was directly on or in a known interactive element
                e.preventDefault();
                const targetNav = navElement.dataset.nav;
                console.log(`Navigation Clicked: ${targetNav} on element`, navElement);

                if (targetNav === 'dashboard') this.renderDashboard();
                else if (targetNav === 'inventory') this.renderInventory();
                else if (targetNav === 'profile') this.renderProfile();
                else if (targetNav === 'logout') {
                    console.log("--- restaurant.js logout ACTION ---");
                    auth.logout();
                }
            }
            // Otherwise ignore the click completely
        });

        // Separate listener for profile form submission (if needed, or handle via delegation if form is always inside #app)
        // Example: If profile form is rendered outside #app or needs specific handling
        // const profileForm = document.getElementById('profile-form');
        // if (profileForm) {
        //     profileForm.addEventListener('submit', (e) => { /* ... */ });
        // }
    }
}; // ADDED MISSING CLOSING BRACE FOR restaurant OBJECT