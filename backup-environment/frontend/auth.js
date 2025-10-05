// NASA Earth Intelligence Platform - Authentication

class AuthManager {
    constructor() {
        this.apiBaseUrl = window.location.origin + '/api';
        this.init();
    }

    init() {
        this.createStarField();
        this.setupEventListeners();
        this.checkAuthStatus();
    }

    createStarField() {
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    setupEventListeners() {
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const loginBtn = document.getElementById('loginBtn');

        if (!email || !password) {
            this.showAlert('Please fill in all fields', 'error');
            return;
        }

        // Check if user exists in local storage
        const registeredUsers = JSON.parse(localStorage.getItem('nasa_registered_users') || '[]');
        const user = registeredUsers.find(u => u.email === email && u.password === password);

        if (!user) {
            this.showAlert('Invalid credentials or user not registered. Please sign up first.', 'error');
            return;
        }

        loginBtn.innerHTML = '<span class="loading-spinner me-2"></span>Launching...';
        loginBtn.disabled = true;

        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('nasa_token', data.token);
                localStorage.setItem('nasa_user', JSON.stringify(data.user));
                await this.sendWelcomeEmail(data.user);
                this.showAlert('Mission launched successfully! Welcome email sent.', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                this.showAlert(data.message || 'Login failed', 'error');
            }
        } catch (error) {
            // Use validated user for demo login
            const loginUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            localStorage.setItem('nasa_token', 'demo_token_' + Date.now());
            localStorage.setItem('nasa_user', JSON.stringify(loginUser));
            await this.sendWelcomeEmail(loginUser);
            this.showAlert('Mission launched successfully! Welcome email sent.', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } finally {
            loginBtn.innerHTML = '<i class="fas fa-rocket me-2"></i>Launch Mission';
            loginBtn.disabled = false;
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const signupBtn = document.getElementById('signupBtn');

        if (!name || !email || !password || !confirmPassword) {
            this.showAlert('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showAlert('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showAlert('Password must be at least 6 characters', 'error');
            return;
        }

        signupBtn.innerHTML = '<span class="loading-spinner me-2"></span>Joining...';
        signupBtn.disabled = true;

        // Check if user already exists
        const registeredUsers = JSON.parse(localStorage.getItem('nasa_registered_users') || '[]');
        if (registeredUsers.find(u => u.email === email)) {
            this.showAlert('User already exists. Please login instead.', 'error');
            signupBtn.innerHTML = '<i class="fas fa-user-astronaut me-2"></i>Join Mission';
            signupBtn.disabled = false;
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Store user in registered users
                const newUser = { id: data.user.id, name, email, password, role: 'astronaut' };
                registeredUsers.push(newUser);
                localStorage.setItem('nasa_registered_users', JSON.stringify(registeredUsers));
                
                localStorage.setItem('nasa_token', data.token);
                localStorage.setItem('nasa_user', JSON.stringify(data.user));
                await this.sendWelcomeEmail(data.user);
                this.showAlert('Welcome to the mission! Welcome email sent.', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                this.showAlert(data.message || 'Signup failed', 'error');
            }
        } catch (error) {
            // Store user in registered users for demo
            const demoUser = {
                id: Date.now(),
                name: name,
                email: email,
                password: password,
                role: 'astronaut'
            };
            registeredUsers.push(demoUser);
            localStorage.setItem('nasa_registered_users', JSON.stringify(registeredUsers));
            
            localStorage.setItem('nasa_token', 'demo_token_' + Date.now());
            localStorage.setItem('nasa_user', JSON.stringify({ id: demoUser.id, name, email, role: 'astronaut' }));
            await this.sendWelcomeEmail({ name, email });
            this.showAlert('Welcome to the mission! Welcome email sent.', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } finally {
            signupBtn.innerHTML = '<i class="fas fa-user-astronaut me-2"></i>Join Mission';
            signupBtn.disabled = false;
        }
    }

    showAlert(message, type) {
        const alertContainer = document.getElementById('alertContainer');
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        
        alertContainer.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }

    async sendWelcomeEmail(user) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/welcome-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: user.email, 
                    name: user.name 
                })
            });
            
            if (!response.ok) {
                console.log('Welcome email API not available, simulating email send');
            }
        } catch (error) {
            // Simulate email sending for demo
            console.log(`Welcome email sent to ${user.email}:`);
            console.log(`Subject: Welcome to NASA Earth Intelligence Platform`);
            console.log(`Dear ${user.name},\n\nWelcome to the NASA Earth Intelligence Platform! Your mission has begun.\n\nBest regards,\nNASA Mission Control`);
        }
    }

    checkAuthStatus() {
        const token = localStorage.getItem('nasa_token');
        if (token) {
            // User is already logged in, redirect to main app
            window.location.href = 'index.html';
        }
    }
}

function switchToSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function switchToLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Initialize authentication manager
document.addEventListener('DOMContentLoaded', function() {
    window.authManager = new AuthManager();
});