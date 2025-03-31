// Charity functionality
const charity = {
    // Mock data for available donations
    availableDonations: [
        {
            id: 1,
            restaurantName: "Joe's Pizza",
            name: 'Fresh Pizza',
            description: 'Leftover pizza from lunch service',
            quantity: '10 pizzas',
            category: 'Prepared Food',
            distance: '0.5 miles',
            expDate: '2023-07-16',
            pickupWindow: '9:00 PM - 10:00 PM',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591'
        },
        {
            id: 2,
            restaurantName: "Fresh Bakery",
            name: 'Assorted Pastries',
            description: 'Various pastries and bread',
            quantity: '20 pieces',
            category: 'Bakery',
            distance: '1.2 miles',
            expDate: '2023-07-17',
            pickupWindow: '8:00 PM - 9:00 PM',
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff'
        }
    ],

    renderDashboard() {
        const appContainer = document.getElementById('app');
        
        appContainer.innerHTML = `
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="#" class="navbar-brand">Food Donation App</a>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a href="#" class="nav-link active" id="nav-dashboard">Dashboard</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-search">Search Food</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-profile">Profile</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-logout">Logout</a></li>
                    </ul>
                </div>
            </nav>

            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Welcome, ${auth.currentUser.name}</h1>
                </div>

                <div class="stats-container">
                    <div class="stat-card">
                        <i class="fas fa-box-open"></i>
                        <h3>${this.availableDonations.length}</h3>
                        <p>Available Donations</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-clock"></i>
                        <h3>2</h3>
                        <p>Pending Pickups</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-history"></i>
                        <h3>15</h3>
                        <p>Total Donations Received</p>
                    </div>
                </div>

                <div class="card">
                    <h2>Available Donations Nearby</h2>
                    <div class="food-items-container">
                        ${this.availableDonations.map(donation => this.renderDonationCard(donation)).join('')}
                    </div>
                </div>
            </div>
        `;

        this.addEventListeners();
    },

    renderDonationCard(donation) {
        return `
            <div class="food-item-card">
                <img src="${donation.image}" alt="${donation.name}" class="food-item-image">
                <div class="food-item-details">
                    <h3>${donation.name}</h3>
                    <p><strong>${donation.restaurantName}</strong> (${donation.distance})</p>
                    <p>${donation.description}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                        <div><strong>Quantity:</strong> ${donation.quantity}</div>
                        <div><strong>Category:</strong> ${donation.category}</div>
                        <div><strong>Expires:</strong> ${donation.expDate}</div>
                        <div><strong>Pickup:</strong> ${donation.pickupWindow}</div>
                    </div>
                    <div class="food-item-actions">
                        <button class="btn btn-primary request-donation" data-id="${donation.id}">Request Pickup</button>
                    </div>
                </div>
            </div>
        `;
    },

    addEventListeners() {
        // Navigation
        document.getElementById('nav-logout').addEventListener('click', () => auth.logout());
        document.getElementById('nav-search').addEventListener('click', () => this.renderSearch());
        document.getElementById('nav-profile').addEventListener('click', () => this.renderProfile());

        // Request buttons
        document.querySelectorAll('.request-donation').forEach(button => {
            button.addEventListener('click', (e) => {
                const donationId = e.target.dataset.id;
                this.requestDonation(donationId);
            });
        });
    },

    requestDonation(donationId) {
        alert('Pickup request sent! (Demo functionality)');
        // In a real app, this would send the request to the backend
    },

    renderSearch() {
        const appContainer = document.getElementById('app');
        
        appContainer.innerHTML = `
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="#" class="navbar-brand">Food Donation App</a>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-dashboard">Dashboard</a></li>
                        <li class="nav-item"><a href="#" class="nav-link active" id="nav-search">Search Food</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-profile">Profile</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-logout">Logout</a></li>
                    </ul>
                </div>
            </nav>

            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Search Available Donations</h1>
                </div>

                <div class="card" style="margin-bottom: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <div class="form-group">
                            <label for="category-filter">Category</label>
                            <select id="category-filter" class="form-control">
                                <option value="">All Categories</option>
                                <option value="Prepared Food">Prepared Food</option>
                                <option value="Bakery">Bakery</option>
                                <option value="Produce">Produce</option>
                                <option value="Canned Goods">Canned Goods</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="distance-filter">Maximum Distance</label>
                            <select id="distance-filter" class="form-control">
                                <option value="">Any Distance</option>
                                <option value="1">Within 1 mile</option>
                                <option value="5">Within 5 miles</option>
                                <option value="10">Within 10 miles</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="time-filter">Pickup Time</label>
                            <select id="time-filter" class="form-control">
                                <option value="">Any Time</option>
                                <option value="morning">Morning (6AM-12PM)</option>
                                <option value="afternoon">Afternoon (12PM-6PM)</option>
                                <option value="evening">Evening (6PM-12AM)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="food-items-container">
                    ${this.availableDonations.map(donation => this.renderDonationCard(donation)).join('')}
                </div>
            </div>
        `;

        this.addEventListeners();
    }
}; 