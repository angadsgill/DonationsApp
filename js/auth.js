// Authentication related functionality
const auth = {
    // Current user data
    currentUser: null,
    userRole: null,
    
    // Initialize auth functionality
    init() {
        // Check if user is logged in (would use localStorage in a real app)
        this.checkAuthStatus();
        
        // Render the login page if not logged in
        if (!this.currentUser) {
            this.renderLoginPage();
        }
    },
    
    // Check if user is logged in
    checkAuthStatus() {
        // In a real app, this would check localStorage or cookies
        // For demo purposes, we'll just set to null initially
        this.currentUser = null;
        this.userRole = null;
    },
    
    // Render login page
    renderLoginPage() {
        const appContainer = document.getElementById('app');
        
        appContainer.innerHTML = `
            <div class="auth-container">
                <div class="auth-header">
                    <h1>Food Donation App</h1>
                    <p>Connect restaurants with excess food to charities in need</p>
                </div>
                
                <div class="auth-tabs">
                    <div class="auth-tab active" id="login-tab">Login</div>
                    <div class="auth-tab" id="register-tab">Register</div>
                </div>
                
                <div id="login-form">
                    <div class="role-selector">
                        <div class="role-option selected" data-role="restaurant">
                            <i class="fas fa-utensils"></i>
                            <div>Restaurant</div>
                        </div>
                        <div class="role-option" data-role="charity">
                            <i class="fas fa-hand-holding-heart"></i>
                            <div>Charity</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="Enter your email">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Enter your password">
                    </div>
                    
                    <div class="form-group">
                        <a href="#" id="forgot-password">Forgot password?</a>
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" id="login-btn">Login</button>
                </div>
                
                <div id="register-form" style="display: none;">
                    <div class="role-selector">
                        <div class="role-option selected" data-role="restaurant">
                            <i class="fas fa-utensils"></i>
                            <div>Restaurant</div>
                        </div>
                        <div class="role-option" data-role="charity">
                            <i class="fas fa-hand-holding-heart"></i>
                            <div>Charity</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="reg-name">Name</label>
                        <input type="text" id="reg-name" class="form-control" placeholder="Enter your name/organization name">
                    </div>
                    
                    <div class="form-group">
                        <label for="reg-email">Email</label>
                        <input type="email" id="reg-email" class="form-control" placeholder="Enter your email">
                    </div>
                    
                    <div class="form-group">
                        <label for="reg-password">Password</label>
                        <input type="password" id="reg-password" class="form-control" placeholder="Create a password">
                    </div>
                    
                    <div class="form-group">
                        <label for="reg-confirm-password">Confirm Password</label>
                        <input type="password" id="reg-confirm-password" class="form-control" placeholder="Confirm your password">
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" id="register-btn">Register</button>
                </div>
                
                <div id="verification-form" style="display: none;">
                    <h2>Email Verification</h2>
                    <p>We've sent a verification code to your email. Please enter it below:</p>
                    
                    <div class="form-group">
                        <input type="text" id="verification-code" class="form-control" placeholder="Enter verification code">
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" id="verify-btn">Verify</button>
                </div>
                
                <div id="reset-password-form" style="display: none;">
                    <h2>Reset Password</h2>
                    <p>Enter your email to receive a password reset link:</p>
                    
                    <div class="form-group">
                        <input type="email" id="reset-email" class="form-control" placeholder="Enter your email">
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" id="reset-btn">Send Reset Link</button>
                    <button class="btn btn-secondary" style="width: 100%; margin-top: 10px;" id="back-to-login">Back to Login</button>
                </div>
            </div>
        `;
        
        // Add event listeners
        this.addAuthEventListeners();
    },
    
    // Add event listeners for auth forms
    addAuthEventListeners() {
        // Tab switching
        document.getElementById('login-tab').addEventListener('click', () => {
            document.getElementById('login-tab').classList.add('active');
            document.getElementById('register-tab').classList.remove('active');
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('verification-form').style.display = 'none';
            document.getElementById('reset-password-form').style.display = 'none';
        });
        
        document.getElementById('register-tab').addEventListener('click', () => {
            document.getElementById('register-tab').classList.add('active');
            document.getElementById('login-tab').classList.remove('active');
            document.getElementById('register-form').style.display = 'block';
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('verification-form').style.display = 'none';
            document.getElementById('reset-password-form').style.display = 'none';
        });
        
        // Role selection
        const roleOptions = document.querySelectorAll('.role-option');
        roleOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                // Remove selected class from all options
                roleOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                e.currentTarget.classList.add('selected');
                // Set user role
                this.userRole = e.currentTarget.dataset.role;
            });
        });
        
        // Forgot password
        document.getElementById('forgot-password').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('reset-password-form').style.display = 'block';
        });
        
        // Back to login
        if (document.getElementById('back-to-login')) {
            document.getElementById('back-to-login').addEventListener('click', () => {
                document.getElementById('reset-password-form').style.display = 'none';
                document.getElementById('login-form').style.display = 'block';
            });
        }
        
        // Login button
        document.getElementById('login-btn').addEventListener('click', () => {
            // Get selected role
            const selectedRole = document.querySelector('.role-option.selected').dataset.role;
            
            // Set user data (in a real app, this would verify credentials)
            this.currentUser = {
                email: document.getElementById('email').value,
                name: selectedRole === 'restaurant' ? 'Demo Restaurant' : 'Demo Charity'
            };
            this.userRole = selectedRole;
            
            // Redirect to appropriate dashboard
            if (selectedRole === 'restaurant') {
                restaurant.renderDashboard();
            } else {
                charity.renderDashboard();
            }
        });
        
        // Register button
        document.getElementById('register-btn').addEventListener('click', () => {
            // Show verification form
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('verification-form').style.display = 'block';
        });
        
        // Verify button
        document.getElementById('verify-btn').addEventListener('click', () => {
            // Get selected role
            const selectedRole = document.querySelector('.role-option.selected').dataset.role;
            
            // Set user data
            this.currentUser = {
                email: document.getElementById('reg-email').value || 'demo@example.com',
                name: document.getElementById('reg-name').value || (selectedRole === 'restaurant' ? 'Demo Restaurant' : 'Demo Charity')
            };
            this.userRole = selectedRole;
            
            // Redirect to appropriate dashboard
            if (selectedRole === 'restaurant') {
                restaurant.renderDashboard();
            } else {
                charity.renderDashboard();
            }
        });
        
        // Reset password button
        document.getElementById('reset-btn').addEventListener('click', () => {
            alert('Password reset link sent! (Demo functionality)');
            document.getElementById('reset-password-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
        });
    },
    
    // Logout function
    logout() {
        this.currentUser = null;
        this.userRole = null;
        this.renderLoginPage();
    }
}; 