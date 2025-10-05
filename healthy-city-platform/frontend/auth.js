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
                    window.location.href = 'index.html';
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
                window.location.href = 'index.html';
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
                    window.location.href = 'index.html';
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
                window.location.href = 'index.html';
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
        // Default sender info (team)
        const defaultFromName = (window.TEAM_EMAIL_FROM && window.TEAM_EMAIL_FROM.name) || 'CodeXploration';
        const defaultFromEmail = (window.TEAM_EMAIL_FROM && window.TEAM_EMAIL_FROM.email) || 'CodeXploration6@gmail.com';

        try {
            // Initialize EmailJS
            if (window.EMAIL_CONFIG && window.EMAIL_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
                emailjs.init(window.EMAIL_CONFIG.publicKey);
            } else {
                throw new Error('EmailJS not configured');
            }
            
            const emailParams = {
                from_name: defaultFromName,
                from_email: defaultFromEmail,
                to_name: user.name,
                to_email: user.email,
                mission_id: user.id || 'ASTRO-' + Date.now(),
                launch_url: window.location.origin + '/index.html',
                message: `Dear ${user.name},

🌍 Welcome to the NASA Earth Intelligence Platform!

Your mission has officially begun. You now have access to:

🛰️ Real-time satellite data from MODIS, VIIRS, and Landsat
🔥 Active fire monitoring with FIRMS detection
🌿 Global vegetation health via NDVI readings
💧 Water storage anomalies from GRACE satellites
🌡️ Climate data from NASA GISS
⚡ Interactive 3D Earth visualization with attack simulation
🧭 Advanced navigation tools and compass

Your astronaut credentials:
📧 Email: ${user.email}
🆔 Mission ID: ${user.id || 'DEMO-' + Date.now()}
👨‍🚀 Role: Earth Intelligence Specialist

Mission Objectives:
• Monitor global environmental changes
• Analyze satellite imagery and data
• Track natural disasters and climate patterns
• Explore interactive Earth simulations

Ready to explore our planet from space? Launch your mission at:
🌐 ${window.location.origin}/index.html

For technical support, contact Mission Control.

Fly safe, astronaut!

🚀 NASA Earth Intelligence Team
🌌 "Exploring Earth from the cosmos"`
            };
            
            // Send email using EmailJS
            console.log('Sending email with params:', emailParams);
            const result = await emailjs.send(
                window.EMAIL_CONFIG.serviceId,
                window.EMAIL_CONFIG.templateId,
                emailParams
            );
            console.log('EmailJS Success:', result);
            
            this.showEmailSuccess(user);
            return true;
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            console.log('📧 EmailJS Error, showing email preview:');
            
            // Show email preview in console and alert
            const emailPreview = `
🚀 NASA EARTH INTELLIGENCE PLATFORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TO: ${user.email}
SUBJECT: Welcome to NASA Earth Intelligence Platform

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dear ${user.name},

🌍 Welcome to the NASA Earth Intelligence Platform!

Your mission has officially begun. You now have access to:

🛰️ Real-time satellite data
🔥 Active fire monitoring  
🌿 Global vegetation health
💧 Water storage tracking
🌡️ Climate data analysis
⚡ Interactive 3D Earth

Mission ID: ${user.id || 'DEMO-' + Date.now()}
Role: Earth Intelligence Specialist

Ready to explore? Launch at:
${window.location.origin}/index.html

Fly safe, astronaut!

🚀 NASA Earth Intelligence Team
            `;
            
            console.log(emailPreview);
            
            this.showEmailPreview(user);
            
            // Debug info
            console.log('EmailJS Config:', window.EMAIL_CONFIG);
            console.log('Email Params:', {
                from_name: defaultFromName,
                from_email: defaultFromEmail,
                to_name: user.name,
                to_email: user.email,
                mission_id: user.id || 'ASTRO-' + Date.now(),
                launch_url: window.location.origin + '/index.html'
            });
            
            return false;
        }
    }

    showEmailSuccess(user) {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);z-index:10000;display:flex;align-items:center;justify-content:center';
        modal.innerHTML = `<div style="background:linear-gradient(135deg,#0B3D91,#6B46C1);color:white;padding:30px;border-radius:15px;text-align:center;max-width:400px;border:2px solid #FC3D21"><h3 style="color:#FC3D21;margin-bottom:20px">📧 Email Sent!</h3><p>Welcome email sent to:</p><p style="color:#FFD700;font-weight:bold">${user.email}</p><button onclick="this.parentElement.parentElement.remove()" style="background:#FC3D21;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;margin-top:15px">✅ Got it!</button></div>`;
        document.body.appendChild(modal);
        setTimeout(() => modal.remove(), 5000);
    }
    
    showEmailPreview(user) {
        const preview = `🚀 NASA EARTH INTELLIGENCE\n\nTO: ${user.email}\nSUBJECT: Welcome to NASA Platform\n\nDear ${user.name},\n\n🌍 Welcome! Mission ID: ${user.id || 'ASTRO-' + Date.now()}\nRole: Earth Intelligence Specialist\n\nAccess: Satellite data, fire monitoring, vegetation health, water tracking, climate analysis, 3D Earth\n\nLaunch: ${window.location.origin}/index.html\n\n🚀 NASA Team`;
        console.log(preview);
        setTimeout(() => {
            const modal = document.createElement('div');
            modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px';
            modal.innerHTML = `<div style="background:linear-gradient(135deg,#0B3D91,#6B46C1);color:white;padding:30px;border-radius:15px;max-width:500px;border:2px solid #FC3D21"><h3 style="color:#FC3D21;text-align:center">📧 Email Preview</h3><p style="text-align:center">Email would be sent to: <strong>${user.email}</strong></p><pre style="background:rgba(0,0,0,0.3);padding:15px;border-radius:8px;font-size:0.8rem;white-space:pre-wrap">${preview}</pre><div style="text-align:center;margin-top:20px"><button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:#FC3D21;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer">✅ Close</button></div></div>`;
            document.body.appendChild(modal);
        }, 1000);
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