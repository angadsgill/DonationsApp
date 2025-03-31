// Restaurant functionality
const restaurant = {
    // Mock data for restaurant
    donations: [
        {
            id: 1,
            name: 'Fresh Pasta',
            description: 'Leftover pasta from dinner service',
            quantity: '5 kg',
            category: 'Prepared Food',
            prepDate: '2023-07-15',
            expDate: '2023-07-16',
            pickupWindow: '10:00 AM - 2:00 PM',
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9'
        },
        {
            id: 2,
            name: 'Bread Loaves',
            description: 'Freshly baked bread from this morning',
            quantity: '10 loaves',
            category: 'Bakery',
            prepDate: '2023-07-15',
            expDate: '2023-07-17',
            pickupWindow: '4:00 PM - 6:00 PM',
            status: 'Pending Pickup',
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
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-inventory">Inventory</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-profile">Profile</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-logout">Logout</a></li>
                    </ul>
                </div>
            </nav>

            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Welcome, ${auth.currentUser.name}</h1>
                    <button class="btn btn-primary" id="add-donation-btn">Add New Donation</button>
                </div>

                <div class="stats-container">
                    <div class="stat-card">
                        <i class="fas fa-box-open"></i>
                        <h3>${this.donations.filter(d => d.status === 'Available').length}</h3>
                        <p>Active Donations</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-clock"></i>
                        <h3>${this.donations.filter(d => d.status === 'Pending Pickup').length}</h3>
                        <p>Pending Pickups</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-check-circle"></i>
                        <h3>${this.donations.filter(d => d.status === 'Completed').length}</h3>
                        <p>Completed Donations</p>
                    </div>
                </div>

                <div class="card">
                    <h2>Recent Donations</h2>
                    <div class="food-items-container">
                        ${this.donations.map(donation => this.renderFoodItem(donation)).join('')}
                    </div>
                </div>
            </div>
        `;

        this.addEventListeners();
    },

    renderFoodItem(donation) {
        return `
            <div class="food-item-card">
                <img src="${donation.image}" alt="${donation.name}" class="food-item-image">
                <div class="food-item-details">
                    <h3>${donation.name}</h3>
                    <p>${donation.description}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 10px;">
                        <div><strong>Quantity:</strong> ${donation.quantity}</div>
                        <div><strong>Category:</strong> ${donation.category}</div>
                        <div><strong>Expires:</strong> ${donation.expDate}</div>
                        <div><strong>Status:</strong> ${donation.status}</div>
                    </div>
                    <div class="food-item-actions">
                        <button class="btn btn-secondary edit-donation" data-id="${donation.id}">Edit</button>
                        <button class="btn btn-danger delete-donation" data-id="${donation.id}" style="margin-left: 10px;">Delete</button>
                    </div>
                </div>
            </div>
        `;
    },

    addEventListeners() {
        // Navigation
        document.getElementById('nav-logout').addEventListener('click', () => auth.logout());
        document.getElementById('nav-inventory').addEventListener('click', () => this.renderInventory());
        document.getElementById('nav-profile').addEventListener('click', () => this.renderProfile());
        
        // Add donation button
        document.getElementById('add-donation-btn').addEventListener('click', () => this.showAddDonationForm());
    },

    renderInventory() {
        const appContainer = document.getElementById('app');
        
        appContainer.innerHTML = `
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="#" class="navbar-brand">Food Donation App</a>
                    <ul class="navbar-nav">
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-dashboard">Dashboard</a></li>
                        <li class="nav-item"><a href="#" class="nav-link active" id="nav-inventory">Inventory</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-profile">Profile</a></li>
                        <li class="nav-item"><a href="#" class="nav-link" id="nav-logout">Logout</a></li>
                    </ul>
                </div>
            </nav>

            <div class="container dashboard">
                <div class="dashboard-header">
                    <h1>Food Inventory</h1>
                    <button class="btn btn-primary" id="add-donation-btn">Add New Item</button>
                </div>

                <div class="card">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Prep Date</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.donations.map(item => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>${item.category}</td>
                                        <td>${item.quantity}</td>
                                        <td>${item.prepDate}</td>
                                        <td>${item.expDate}</td>
                                        <td>${item.status}</td>
                                        <td>
                                            <button class="btn btn-secondary btn-sm edit-donation" data-id="${item.id}">Edit</button>
                                            <button class="btn btn-danger btn-sm delete-donation" data-id="${item.id}">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.addEventListeners();
    },

    showAddDonationForm() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        modal.innerHTML = `
            <div class="card" style="width: 500px; max-width: 90%;">
                <h2>Add New Donation</h2>
                <form id="donation-form">
                    <div class="form-group">
                        <label for="food-name">Food Name</label>
                        <input type="text" id="food-name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="food-description">Description</label>
                        <textarea id="food-description" class="form-control" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="food-quantity">Quantity</label>
                        <input type="text" id="food-quantity" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="food-category">Category</label>
                        <select id="food-category" class="form-control" required>
                            <option value="Prepared Food">Prepared Food</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Produce">Produce</option>
                            <option value="Canned Goods">Canned Goods</option>
                            <option value="Dairy">Dairy</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pickup-window">Pickup Window</label>
                        <input type="text" id="pickup-window" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="expiry-date">Expiry Date</label>
                        <input type="date" id="expiry-date" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="food-image">Image URL</label>
                        <input type="url" id="food-image" class="form-control">
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 10px;">
                        <button type="button" class="btn btn-secondary" id="cancel-donation">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Donation</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Add event listeners
        document.getElementById('cancel-donation').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        document.getElementById('donation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add new donation to the list
            this.donations.push({
                id: this.donations.length + 1,
                name: document.getElementById('food-name').value,
                description: document.getElementById('food-description').value,
                quantity: document.getElementById('food-quantity').value,
                category: document.getElementById('food-category').value,
                pickupWindow: document.getElementById('pickup-window').value,
                expDate: document.getElementById('expiry-date').value,
                prepDate: new Date().toISOString().split('T')[0],
                status: 'Available',
                image: document.getElementById('food-image').value || 'https://via.placeholder.com/150'
            });

            // Remove modal and refresh the view
            document.body.removeChild(modal);
            this.renderDashboard();
        });
    }
}; 