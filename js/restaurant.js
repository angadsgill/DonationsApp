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
                status: 'Requested',
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
                status: 'Completed',
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
        appContainer.innerHTML = this.getNavbarHTML('dashboard') + `
            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Welcome, ${auth.currentUser?.profile?.organization_name || auth.currentUser?.username || 'Restaurant'}</h1>
                    <button class="btn btn-primary" id="add-donation-btn">Add New Donation</button>
                </div>
                <div id="dashboard-error" class="auth-error" style="display: none;"></div>

                <div class="stats-container" id="stats-container">
                    <p>Loading stats...</p>
                </div>

                <div class="card">
                    <h2>Recent Donations</h2>
                    <div class="food-items-container" id="recent-donations-container">
                        <p>Loading donations...</p>
                    </div>
                </div>
            </div>
        `;
        this.addEventListeners(); // Add listeners

        // Calculate stats from local mock data
        const summary = {
             active_donations: this.donations.filter(d => d.status === 'Available').length,
             pending_pickups: this.donations.filter(d => ['Requested', 'Approved'].includes(d.status)).length,
             completed_donations: this.donations.filter(d => d.status === 'Completed').length
        };
        this.renderStats(summary);

        // Render recent donations from local mock data (newest first)
        const recentDonations = [...this.donations].sort((a, b) => b.id - a.id).slice(0, 5);
        this.renderRecentDonations(recentDonations);
    },

    // Render the stats cards
    renderStats(summary) {
        const statsContainer = document.getElementById('stats-container');
        if (!statsContainer || !summary) return;
        statsContainer.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-box-open"></i>
                <h3>${summary.active_donations ?? 0}</h3>
                <p>Active Donations</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-clock"></i>
                <h3>${summary.pending_pickups ?? 0}</h3>
                <p>Pending Pickups</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-check-circle"></i>
                <h3>${summary.completed_donations ?? 0}</h3>
                <p>Completed Donations</p>
            </div>
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
        const defaultImage = 'https://via.placeholder.com/150?text=No+Image';

        return `
            <div class="food-item-card" data-donation-id="${donation.id}">
                <img src="${donation.photo_url || defaultImage}" alt="${donation.name}" class="food-item-image">
                <div class="food-item-details">
                    <h3>${donation.name}</h3>
                    <p>${donation.description || 'No description.'}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 10px;">
                        <div><strong>Quantity:</strong> ${donation.quantity}</div>
                        <div><strong>Category:</strong> ${donation.category}</div>
                        <div><strong>Expires:</strong> ${expiryDate}</div>
                        <div><strong>Status:</strong> ${donation.status}</div>
                        <div><strong>Pickup:</strong> ${donation.pickup_window_start || ''} - ${donation.pickup_window_end || ''}</div>
                    </div>
                    <div class="food-item-actions">
                        <button class="btn btn-secondary edit-donation">Edit</button>
                        <button class="btn btn-danger delete-donation" style="margin-left: 10px;">Delete</button>
                         ${donation.status === 'Requested' ? `<button class="btn btn-success approve-donation" style="margin-left: 10px;">Approve</button>` : ''}
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
            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Food Inventory</h1>
                    <button class="btn btn-primary" id="add-donation-btn">Add New Item</button>
                </div>
                 <div id="inventory-error" class="auth-error" style="display: none;"></div>
                <div class="card">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="inventory-table-body">
                                <tr><td colspan="6">Loading inventory...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        this.addEventListeners(); // Add listeners

        // Render table from local mock data
        this.renderInventoryTable(this.donations);
    },

    // Populate the inventory table body
    renderInventoryTable(donations) {
        const tableBody = document.getElementById('inventory-table-body');
        if (!tableBody) return;

        if (!donations || donations.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6">No donations found in inventory.</td></tr>';
            return;
        }

        tableBody.innerHTML = donations.map(item => {
            const expiryDate = item.exp_date ? new Date(item.exp_date).toLocaleDateString() : 'N/A';
            // const prepDate = item.prep_date ? new Date(item.prep_date).toLocaleDateString() : 'N/A'; // If needed
            return `
                <tr data-donation-id="${item.id}">
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td>${expiryDate}</td>
                    <td>${item.status}</td>
                    <td>
                        <button class="btn btn-secondary btn-sm edit-donation">Edit</button>
                        <button class="btn btn-danger btn-sm delete-donation">Delete</button>
                         ${item.status === 'Requested' ? `<button class="btn btn-success btn-sm approve-donation">Approve</button>` : ''}
                    </td>
                </tr>
            `;
        }).join('');
        // Re-attach listeners if not using delegation
    },

     // Render Profile View (Basic)
    renderProfile() { // Removed async
        const appContainer = document.getElementById('app');
        if (!appContainer) return;
        // No token check

        appContainer.innerHTML = this.getNavbarHTML('profile') + `
            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Your Profile</h1>
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
        this.donations.push(newDonation); // This line adds to the array
        console.log("Mock donation added:", newDonation); // Log addition
        console.log("Donations array after push:", this.donations); // Log array state

        // Basic validation
        if (!donationData.name || !donationData.quantity || !donationData.category || !donationData.exp_date || !donationData.pickup_window_start || !donationData.pickup_window_end) {
            this.displayError('Please fill in all required fields (Name, Quantity, Category, Expiry, Pickup Window).', 'donation-form-error'); // Ensure this is called
            return;
        }

        // Simulate adding/editing in the local array
        if (isEditing) {
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

        this.closeModal();
        this.renderInventory(); // Refresh inventory list
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
                this.renderInventory(); // Refresh inventory list
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
         // Use mock user data
        const userName = auth.currentUser?.username || 'User';
        return `
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="#" class="navbar-brand">Food Donation App (Restaurant)</a>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a href="#" class="nav-link ${activeLink === 'dashboard' ? 'active' : ''}" data-nav="dashboard">Dashboard</a></li>
                        <li class="nav-item"><a href="#" class="nav-link ${activeLink === 'inventory' ? 'active' : ''}" data-nav="inventory">Inventory</a></li>
                        <li class="nav-item"><a href="#" class="nav-link ${activeLink === 'profile' ? 'active' : ''}" data-nav="profile">Profile</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" data-nav="logout">Logout (${userName})</a></li>
                    </ul>
                </div>
            </nav>
        `;
    },

    // Centralized Event Listener Setup (using delegation)
    addEventListeners() {
        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        // Remove previous listeners if any to prevent duplicates (simple approach)
        // A more robust solution might involve specific listener management
        appContainer.replaceWith(appContainer.cloneNode(true));
        document.getElementById('app').addEventListener('click', async (e) => {
            // Navigation Links
            if (e.target.matches('.nav-link')) {
                e.preventDefault();
                const targetNav = e.target.dataset.nav;
                if (targetNav === 'dashboard') this.renderDashboard();
                else if (targetNav === 'inventory') this.renderInventory();
                else if (targetNav === 'profile') this.renderProfile();
                else if (targetNav === 'logout') auth.logout();
            }
            // Add New Donation Button
            else if (e.target.matches('#add-donation-btn')) {
                this.showAddDonationForm();
            }
            // Edit Donation Button (delegated)
            else if (e.target.matches('.edit-donation')) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     this.editDonation(donationId);
                 }
            }
            // Delete Donation Button (delegated)
            else if (e.target.matches('.delete-donation')) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     this.deleteDonation(donationId);
                 }
            }
             // Approve Donation Button (delegated)
            else if (e.target.matches('.approve-donation')) {
                 const card = e.target.closest('[data-donation-id]');
                 if (card) {
                     const donationId = card.dataset.donationId;
                     this.approveDonation(donationId);
                 }
            }
        });
    }
};