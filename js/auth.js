// Mock Prototype - No API calls needed
// const API_BASE_URL = 'http://127.0.0.1:8000/api';
// async function apiRequest(...) { ... } // Removed


// Authentication related functionality
const auth = {
    // Current user data and token
    currentUser: null,
    userRole: null,
    // authToken: null, // Removed - no token needed for mock

    // Initialize auth functionality
    init() {
        // For mock prototype, always start at login page
        this.currentUser = null;
        this.userRole = null;
        this.renderLoginPage();
    },

    // Removed checkAuthStatus, saveAuthData, clearAuthData - not needed for mock

    // Navigate to the correct dashboard based on role
    navigateToDashboard() {
        if (!this.currentUser || !this.userRole) {
            console.error("Cannot navigate to dashboard without user/role info.");
            this.renderLoginPage(); // Fallback to login
            return;
        }
        // Ensure restaurant/charity objects are available (might need better dependency handling)
        if (this.userRole === 'restaurant' && typeof restaurant !== 'undefined') {
            restaurant.renderDashboard();
        } else if (this.userRole === 'charity' && typeof charity !== 'undefined') {
            charity.renderDashboard();
        } else {
            console.error(`Dashboard rendering object not found for role: ${this.userRole}`);
            this.renderLoginPage(); // Fallback
        }
    },

    // Render login page
    renderLoginPage() {
        // Reset state for mock login page
        this.currentUser = null;
        this.userRole = null;
        const appContainer = document.getElementById('app');
        if (!appContainer) return; // Guard against missing element

        // New structure based on login.tsx and new CSS
        appContainer.innerHTML = `
            <div class="auth-container">
                <div class="card">
                    <div class="auth-header">
                        <div class="logo-placeholder">
                            <i class="fas fa-utensils"></i> <!-- Placeholder Icon -->
                        </div>
                        <h1 class="auth-title">MealBridge</h1>
                        <p class="auth-description">
                            Connect restaurants with excess food to charities in need
                        </p>
                    </div>

                    <div class="auth-card-content">
                        <div class="auth-tabs">
                            <div class="auth-tab active" id="login-tab" data-target="login-form">Login</div>
                            <div class="auth-tab" id="register-tab" data-target="register-form">Register</div>
                        </div>

                        <div id="auth-error-message" class="auth-error" style="display: none;"></div>

                        <!-- Login Form Content -->
                        <div id="login-form" class="auth-tab-content active">
                            <div class="role-selector login-role-selector">
                                <button class="role-option selected" data-role="restaurant">
                                    <i class="fas fa-utensils"></i>
                                    <span>Restaurant</span>
                                </button>
                                <button class="role-option" data-role="charity">
                                    <i class="fas fa-hand-holding-heart"></i>
                                    <span>Charity</span>
                                </button>
                            </div>

                            <div class="form-group">
                                <label for="login-username" class="input-label">
                                    <i class="fas fa-user"></i> Username
                                </label>
                                <div class="input-wrapper">
                                    <!-- <i class="fas fa-user input-icon"></i> --> <!-- Icon in label now -->
                                    <input type="text" id="login-username" class="form-control" placeholder="Enter your username">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="login-password" class="input-label">
                                    <i class="fas fa-lock"></i> Password
                                </label>
                                <div class="input-wrapper">
                                     <!-- <i class="fas fa-lock input-icon"></i> --> <!-- Icon in label now -->
                                    <input type="password" id="login-password" class="form-control" placeholder="Enter your password">
                                </div>
                            </div>

                            <div> <!-- Wrapper for right alignment -->
                                <a href="#" id="forgot-password" class="forgot-password-link">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <!-- Register Form Content -->
                        <div id="register-form" class="auth-tab-content" style="display: none;">
                             <p class="text-center text-secondary mb-4">Create a new account to start donating or receiving food.</p>
                             <div class="role-selector register-role-selector">
                                 <button class="role-option selected" data-role="restaurant">
                                     <i class="fas fa-utensils"></i>
                                     <span>Restaurant</span>
                                 </button>
                                 <button class="role-option" data-role="charity">
                                     <i class="fas fa-hand-holding-heart"></i>
                                     <span>Charity</span>
                                 </button>
                             </div>
                             <!-- Keep existing registration fields for now, style them later if needed -->
                             <div class="form-group">
                                <label for="reg-username" class="input-label">Username</label>
                                <input type="text" id="reg-username" class="form-control" placeholder="Choose a username">
                             </div>
                             <div class="form-group">
                                <label for="reg-org-name" class="input-label">Organization Name</label>
                                <input type="text" id="reg-org-name" class="form-control" placeholder="Enter your organization name">
                             </div>
                             <div class="form-group">
                                <label for="reg-email" class="input-label">Email</label>
                                <input type="email" id="reg-email" class="form-control" placeholder="Enter your email">
                             </div>
                             <div class="form-group">
                                <label for="reg-password" class="input-label">Password</label>
                                <input type="password" id="reg-password" class="form-control" placeholder="Create a password">
                             </div>
                             <div class="form-group">
                                <label for="reg-confirm-password" class="input-label">Confirm Password</label>
                                <input type="password" id="reg-confirm-password" class="form-control" placeholder="Confirm your password">
                             </div>
                             <button class="btn btn-primary auth-login-button" id="register-btn">Register</button>
                        </div>

                         <!-- Reset Password Form (Keep hidden structure for now) -->
                         <div id="reset-password-form" style="display: none;">
                            <h2 class="auth-title" style="font-size: 1.5rem; margin-bottom: 1rem;">Reset Password</h2>
                            <p class="auth-description mb-4">Enter your email to receive a password reset link:</p>
                            <div class="form-group">
                                <label for="reset-email" class="input-label">Email</label>
                                <input type="email" id="reset-email" class="form-control" placeholder="Enter your email">
                            </div>
                            <button class="btn btn-primary auth-login-button" style="margin-bottom: 0.5rem;" id="reset-btn">Send Reset Link</button>
                            <button class="btn btn-outline btn-outline-primary" style="width: 100%;" id="back-to-login">Back to Login</button>
                        </div>

                    </div> <!-- End auth-card-content -->

                    <div class="auth-card-footer">
                         <button class="btn btn-primary auth-login-button" id="login-btn">
                             <span class="mr-2">Login</span>
                             <i class="fas fa-arrow-right"></i>
                         </button>
                    </div>

                    <div class="terms-link">
                        <p>
                        </p>
                    </div>
                </div> <!-- End card -->
            </div> <!-- End auth-container -->
        `;

        // Add event listeners
        this.addAuthEventListeners();
    },

    // Display error messages
    displayAuthError(message) {
        const errorDiv = document.getElementById('auth-error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    },

    // Hide error messages
    hideAuthError() {
         const errorDiv = document.getElementById('auth-error-message');
         if (errorDiv) {
             errorDiv.style.display = 'none';
         }
    },

    // Add event listeners for auth forms
    addAuthEventListeners() {
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const resetPasswordForm = document.getElementById('reset-password-form');
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const forgotPasswordLink = document.getElementById('forgot-password');
        const backToLoginBtn = document.getElementById('back-to-login');
        const resetBtn = document.getElementById('reset-btn');

        // Tab switching
        loginTab?.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab?.classList.remove('active');
            if(loginForm) loginForm.style.display = 'block';
            if(registerForm) registerForm.style.display = 'none';
            if(resetPasswordForm) resetPasswordForm.style.display = 'none';
            this.hideAuthError();
            // Reset login form role selection to default (Restaurant)
            loginForm?.querySelectorAll('.login-role-selector .role-option').forEach((opt, index) => {
                if (index === 0) opt.classList.add('selected');
                else opt.classList.remove('selected');
            });
        });

        registerTab?.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab?.classList.remove('active');
            if(registerForm) registerForm.style.display = 'block';
            if(loginForm) loginForm.style.display = 'none';
            if(resetPasswordForm) resetPasswordForm.style.display = 'none';
            this.hideAuthError();
             // Reset register form role selection to default (Restaurant)
            registerForm?.querySelectorAll('.role-selector .role-option').forEach((opt, index) => {
                if (index === 0) opt.classList.add('selected');
                else opt.classList.remove('selected');
            });
        });

        // Role selection (Login Form)
        const loginRoleOptions = loginForm?.querySelectorAll('.login-role-selector .role-option');
        loginRoleOptions?.forEach(option => {
            option.addEventListener('click', (e) => {
                loginRoleOptions.forEach(opt => opt.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
            });
        });

        // Role selection (Register Form)
        const registerRoleOptions = registerForm?.querySelectorAll('#register-form .role-selector .role-option'); // Make selector more specific
        registerRoleOptions?.forEach(option => {
            option.addEventListener('click', (e) => {
                registerRoleOptions.forEach(opt => opt.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
            });
        });

        // Forgot password
        forgotPasswordLink?.addEventListener('click', (e) => {
            e.preventDefault();
            if(loginForm) loginForm.style.display = 'none';
            if(registerForm) registerForm.style.display = 'none';
            if(resetPasswordForm) resetPasswordForm.style.display = 'block';
            this.hideAuthError();
        });

        // Back to login
        backToLoginBtn?.addEventListener('click', () => {
            if(resetPasswordForm) resetPasswordForm.style.display = 'none';
            if(loginForm) loginForm.style.display = 'block'; // Show login form
            loginTab?.click(); // Activate login tab
            this.hideAuthError();
        });

        // Login button
        loginBtn?.addEventListener('click', () => { // Removed async
            this.hideAuthError();
            const usernameInput = document.getElementById('login-username');
            const username = usernameInput?.value || 'MockUser'; // Use input or default
            const selectedRoleOption = loginForm?.querySelector('.login-role-selector .role-option.selected');
            const selectedRole = selectedRoleOption?.dataset.role || 'restaurant'; // Default to restaurant if somehow not selected

            console.log(`Simulating login as ${selectedRole}: ${username}`);

            // Set mock user data based on selected role
            this.userRole = selectedRole;
            this.currentUser = {
                id: 99,
                username: username,
                email: `${username}@example.com`,
                first_name: "Mock",
                last_name: selectedRole === 'restaurant' ? "Restaurant" : "Charity",
                role: selectedRole,
                profile: {
                    organization_name: username, // Use the entered username directly as org name for mock login
                    contact_phone: selectedRole === 'restaurant' ? "555-REST" : "555-CHAR",
                    address: selectedRole === 'restaurant' ? "1 Main St, Foodville" : "10 Helping Hand Ave, Kindtown",
                    service_area: selectedRole === 'charity' ? "Kindtown and surrounding areas" : "",
                    needs: selectedRole === 'charity' ? "Non-perishables, fresh produce" : ""
                }
            };
            // this.authToken = "mock-token-" + Date.now(); // No token needed for mock

            this.navigateToDashboard();
        });

        // Register button
        registerBtn?.addEventListener('click', () => { // Removed async
            this.hideAuthError();
            const usernameInput = document.getElementById('reg-username');
            const orgNameInput = document.getElementById('reg-org-name');
            // const emailInput = document.getElementById('reg-email'); // Not used in mock
            // const passwordInput = document.getElementById('reg-password'); // Not used in mock
            // const confirmPasswordInput = document.getElementById('reg-confirm-password'); // Not used in mock
            const selectedRoleOption = registerForm?.querySelector('.role-selector .role-option.selected');

            const username = usernameInput?.value;
            const orgName = orgNameInput?.value;
            const role = selectedRoleOption?.dataset.role;

             if (!username || !role || !orgName) {
                this.displayAuthError("Please enter Username, Organization Name, and select a Role.");
                return;
            }

            console.log(`Simulating registration and login as ${role}: ${username}`);

            // Set mock user data based on selected role
            this.userRole = role;
            this.currentUser = {
                id: 100 + Math.floor(Math.random() * 900), // Randomish ID
                username: username,
                email: `${username}@example-reg.com`,
                first_name: "New",
                last_name: role === 'restaurant' ? "Restaurant" : "Charity",
                role: role,
                profile: {
                    organization_name: orgName, // Use the entered org name directly
                    contact_phone: "555-REGI",
                    address: "456 New Ave, Register City",
                    service_area: role === 'charity' ? "Register City" : "",
                    needs: role === 'charity' ? "Anything helps!" : ""
                }
            };
            // this.authToken = "mock-token-" + Date.now(); // No token needed

            this.navigateToDashboard();
        });

        // Reset password button (Frontend only for now)
        resetBtn?.addEventListener('click', () => {
            alert('Password reset functionality not implemented in backend yet.');
            // In a real app, would call a backend endpoint
            // For now, just go back to login visually
            backToLoginBtn?.click();
        });
    },

    // Logout function
    logout() { // Removed async
        console.log("--- auth.logout() CALLED ---"); // Add log here
        console.log("Logging out (mock)...");
        // Clear mock data and render login page
        this.currentUser = null;
        this.userRole = null;
        // this.authToken = null; // No token
        this.renderLoginPage();
    }
};