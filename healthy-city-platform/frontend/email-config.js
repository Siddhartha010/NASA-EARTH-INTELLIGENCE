// Email Configuration for NASA Earth Intelligence Platform
// To enable real email sending, follow these steps:

/*
SETUP INSTRUCTIONS:

1. Go to https://www.emailjs.com/
2. Create a free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create an email template with these variables:
   - {{to_name}}
   - {{to_email}} 
   - {{from_name}}
   - {{subject}}
   - {{message}}

5. Replace the values below with your EmailJS credentials:
*/

const EMAIL_CONFIG = {
    // Replace with your EmailJS public key
    publicKey: '8jtxHblCqXuUvqlfr',
    
    // Replace with your EmailJS service ID
    serviceId: 'service_65b7hcc',
    
    // Replace with your EmailJS template ID
    templateId: 'template_welcome',
    
    // Email template for welcome message
    welcomeTemplate: {
        subject: '🚀 Welcome to NASA Earth Intelligence Platform',
        htmlTemplate: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Arial', sans-serif; background: #0B3D91; color: white; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0B3D91, #6B46C1); border-radius: 15px; padding: 30px; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 2rem; font-weight: bold; color: #FC3D21; margin-bottom: 10px; }
                .title { font-size: 1.5rem; margin-bottom: 20px; }
                .content { line-height: 1.6; }
                .feature { margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px; }
                .footer { margin-top: 30px; text-align: center; font-size: 0.9rem; opacity: 0.8; }
                .button { display: inline-block; background: #FC3D21; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">🚀 NASA</div>
                    <div class="title">EARTH INTELLIGENCE PLATFORM</div>
                </div>
                
                <div class="content">
                    <h2>Welcome, {{to_name}}! 🌍</h2>
                    
                    <p>Your mission has officially begun. You now have access to cutting-edge NASA satellite data and Earth monitoring tools.</p>
                    
                    <h3>🛰️ Your Mission Capabilities:</h3>
                    <div class="feature">🔥 Real-time fire detection with FIRMS</div>
                    <div class="feature">🌿 Global vegetation monitoring via NDVI</div>
                    <div class="feature">💧 Water storage tracking with GRACE</div>
                    <div class="feature">🌡️ Climate data from NASA GISS</div>
                    <div class="feature">⚡ Interactive 3D Earth simulation</div>
                    <div class="feature">🧭 Advanced navigation tools</div>
                    
                    <h3>👨‍🚀 Astronaut Credentials:</h3>
                    <p><strong>Email:</strong> {{to_email}}<br>
                    <strong>Role:</strong> Earth Intelligence Specialist<br>
                    <strong>Clearance Level:</strong> Mission Control Access</p>
                    
                    <div style="text-align: center;">
                        <a href="${window.location.origin}/index.html" class="button">🚀 Launch Mission</a>
                    </div>
                    
                    <p>Ready to explore our planet from space? Your Earth Intelligence dashboard awaits!</p>
                </div>
                
                <div class="footer">
                    <p>🌌 NASA Earth Intelligence Team<br>
                    "Exploring Earth from the cosmos"</p>
                </div>
            </div>
        </body>
        </html>
        `
    }
};

// Export configuration
window.EMAIL_CONFIG = EMAIL_CONFIG;