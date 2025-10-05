// Enhanced Engagement Module with Leaderboard

async function generateEngagementModule() {
    return `
        <!-- Enhanced Citizen Engagement Hub -->\n        <div class=\"row mb-4\">\n            <div class=\"col-12\">\n                <div class=\"text-center mb-4\">\n                    <h3 style=\"color: var(--solar-orange); font-family: 'Orbitron', monospace;\">\n                        <i class=\"fas fa-users me-2\"></i>CITIZEN ENGAGEMENT HUB\n                    </h3>\n                    <p style=\"opacity: 0.9;\">Report issues, complete challenges, climb the leaderboard, and use AI tools</p>\n                </div>\n            </div>\n        </div>\n        \n        <!-- Navigation Tabs -->\n        <div class=\"row mb-4\">\n            <div class=\"col-12\">\n                <div class=\"nav nav-pills justify-content-center\" style=\"background: rgba(11, 61, 145, 0.2); border-radius: 15px; padding: 10px;\">\n                    <button class=\"nav-btn btn me-2 active\" data-section=\"report-issues\" style=\"background: var(--nasa-red); color: white;\">\n                        <i class=\"fas fa-exclamation-triangle me-1\"></i>Report Issues\n                    </button>\n                    <button class=\"nav-btn btn me-2\" data-section=\"challenges\" style=\"background: var(--earth-green); color: white; opacity: 0.7;\">\n                        <i class=\"fas fa-trophy me-1\"></i>Challenges\n                    </button>\n                    <button class=\"nav-btn btn me-2\" data-section=\"leaderboard\" style=\"background: var(--cosmic-purple); color: white; opacity: 0.7;\">\n                        <i class=\"fas fa-medal me-1\"></i>Leaderboard\n                    </button>\n                    <button class=\"nav-btn btn me-2\" data-section=\"ai-identifier\" style=\"background: var(--solar-orange); color: white; opacity: 0.7;\">\n                        <i class=\"fas fa-camera me-1\"></i>AI Identifier\n                    </button>\n                    <button class=\"nav-btn btn\" data-section=\"community\" style=\"background: var(--nasa-blue); color: white; opacity: 0.7;\">\n                        <i class=\"fas fa-users me-1\"></i>Community\n                    </button>\n                </div>\n            </div>\n        </div>\n        \n        <!-- Report Issues Section -->\n        <div id=\"report-issues\" class=\"engagement-section active\">\n            <div class=\"row\">\n                <div class=\"col-md-8\">\n                    <div style=\"background: rgba(239, 68, 68, 0.2); border: 2px solid var(--nasa-red); border-radius: 20px; padding: 25px;\">\n                        <h5 style=\"color: var(--nasa-red); margin-bottom: 20px;\">\n                            <i class=\"fas fa-exclamation-triangle me-2\"></i>Report Environmental Issues\n                        </h5>\n                        <form id=\"issue-form\">\n                            <div class=\"mb-3\">\n                                <select class=\"form-select\" id=\"issue-type\" style=\"background: rgba(255,255,255,0.1); border: 1px solid var(--nasa-red); color: white;\" required>\n                                    <option value=\"\" style=\"background: #333; color: white;\">Select Issue Type</option>\n                                    <option value=\"Air Pollution\" style=\"background: #333; color: white;\">💨 Air Pollution</option>\n                                    <option value=\"Water Contamination\" style=\"background: #333; color: white;\">💧 Water Contamination</option>\n                                    <option value=\"Illegal Dumping\" style=\"background: #333; color: white;\">🗑️ Illegal Dumping</option>\n                                    <option value=\"Deforestation\" style=\"background: #333; color: white;\">🌳 Deforestation</option>\n                                    <option value=\"Noise Pollution\" style=\"background: #333; color: white;\">🔊 Noise Pollution</option>\n                                    <option value=\"Other\" style=\"background: #333; color: white;\">⚠️ Other</option>\n                                </select>\n                            </div>\n                            <div class=\"mb-3\">\n                                <input type=\"text\" class=\"form-control\" id=\"issue-location\" placeholder=\"Location\" style=\"background: rgba(255,255,255,0.1); border: 1px solid var(--nasa-red); color: white;\" required>\n                            </div>\n                            <div class=\"mb-3\">\n                                <textarea class=\"form-control\" id=\"issue-description\" rows=\"3\" placeholder=\"Describe the issue...\" style=\"background: rgba(255,255,255,0.1); border: 1px solid var(--nasa-red); color: white;\" required></textarea>\n                            </div>\n                            <div class=\"mb-3\">\n                                <select class=\"form-select\" id=\"issue-severity\" style=\"background: rgba(255,255,255,0.1); border: 1px solid var(--nasa-red); color: white;\">\n                                    <option value=\"Low\" style=\"background: #333; color: white;\">Low Priority</option>\n                                    <option value=\"Medium\" selected style=\"background: #333; color: white;\">Medium Priority</option>\n                                    <option value=\"High\" style=\"background: #333; color: white;\">High Priority</option>\n                                    <option value=\"Critical\" style=\"background: #333; color: white;\">Critical</option>\n                                </select>\n                            </div>\n                            <button type=\"submit\" class=\"btn\" style=\"background: var(--nasa-red); color: white; width: 100%;\">\n                                <i class=\"fas fa-paper-plane me-2\"></i>Submit Report (+30 points)\n                            </button>\n                        </form>\n                    </div>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"real-time-data\" style=\"height: 100%;\">\n                        <h5><i class=\"fas fa-chart-bar\"></i> Reporting Stats</h5>\n                        <div class=\"data-metric\">\n                            <span>Issues Reported</span>\n                            <span class=\"metric-value text-warning\" id=\"issues-reported\">0</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Issues Resolved</span>\n                            <span class=\"metric-value text-success\" id=\"issues-resolved\">0</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Community Impact</span>\n                            <span class=\"metric-value text-info\" id=\"community-impact\">Low</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Points Earned</span>\n                            <span class=\"metric-value text-warning\" id=\"reporting-points\">0</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <!-- Recent Reports -->\n            <div class=\"row mt-4\">\n                <div class=\"col-12\">\n                    <h5><i class=\"fas fa-list\"></i> Recent Reports</h5>\n                    <div id=\"recent-reports\" class=\"mt-3\">\n                        <div class=\"text-center p-4\">\n                            <i class=\"fas fa-info-circle\" style=\"font-size: 2rem; color: var(--nasa-blue); margin-bottom: 10px;\"></i>\n                            <p>No reports submitted yet. Be the first to report an environmental issue!</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <!-- Challenges Section -->\n        <div id=\"challenges\" class=\"engagement-section\" style=\"display: none;\">\n            <div class=\"row\">\n                <div class=\"col-md-8\">\n                    <div style=\"background: rgba(16, 185, 129, 0.2); border: 2px solid var(--earth-green); border-radius: 20px; padding: 25px;\">\n                        <h5 style=\"color: var(--earth-green); margin-bottom: 20px;\">\n                            <i class=\"fas fa-trophy me-2\"></i>Environmental Challenges\n                        </h5>\n                        <div id=\"challenges-list\">\n                            <!-- Challenges will be loaded here -->\n                        </div>\n                        <button class=\"btn mt-3\" onclick=\"loadChallenges()\" style=\"background: var(--earth-green); color: white;\">\n                            <i class=\"fas fa-sync me-1\"></i>Refresh Challenges\n                        </button>\n                    </div>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"real-time-data\" style=\"height: 100%;\">\n                        <h5><i class=\"fas fa-chart-line\"></i> Your Progress</h5>\n                        <div class=\"data-metric\">\n                            <span>Points Earned</span>\n                            <span class=\"metric-value text-warning\" id=\"user-points\">0</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Challenges Completed</span>\n                            <span class=\"metric-value\" id=\"completed-challenges\">0</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Current Rank</span>\n                            <span class=\"metric-value text-info\" id=\"user-rank\">#--</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Weekly Goal</span>\n                            <span class=\"metric-value text-success\" id=\"weekly-goal\">0/5</span>\n                        </div>\n                        <div class=\"mt-3\">\n                            <button class=\"btn\" onclick=\"switchEngagementTab('leaderboard')\" style=\"background: var(--cosmic-purple); color: white; width: 100%;\">\n                                <i class=\"fas fa-medal me-1\"></i>View Leaderboard\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <!-- Leaderboard Section -->\n        <div id=\"leaderboard\" class=\"engagement-section\" style=\"display: none;\">\n            <div class=\"row\">\n                <div class=\"col-md-8\">\n                    <div style=\"background: rgba(107, 70, 193, 0.2); border: 2px solid var(--cosmic-purple); border-radius: 20px; padding: 25px;\">\n                        <h5 style=\"color: var(--cosmic-purple); margin-bottom: 20px;\">\n                            <i class=\"fas fa-medal me-2\"></i>Global Leaderboard\n                        </h5>\n                        <div id=\"leaderboard-list\">\n                            <!-- Leaderboard will be loaded here -->\n                        </div>\n                        <button class=\"btn mt-3\" onclick=\"refreshLeaderboard()\" style=\"background: var(--cosmic-purple); color: white;\">\n                            <i class=\"fas fa-sync me-1\"></i>Refresh Rankings\n                        </button>\n                    </div>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"real-time-data\" style=\"height: 100%;\">\n                        <h5><i class=\"fas fa-trophy\"></i> Leaderboard Stats</h5>\n                        <div class=\"data-metric\">\n                            <span>Total Players</span>\n                            <span class=\"metric-value text-info\" id=\"total-players\">0</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Your Position</span>\n                            <span class=\"metric-value text-warning\" id=\"your-position\">#--</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Points to Next Rank</span>\n                            <span class=\"metric-value text-success\" id=\"points-to-next\">--</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Top Player Points</span>\n                            <span class=\"metric-value text-danger\" id=\"top-player-points\">0</span>\n                        </div>\n                        <div class=\"mt-3\">\n                            <div class=\"alert alert-info\" style=\"background: rgba(107, 70, 193, 0.2); border: 1px solid var(--cosmic-purple);\">\n                                <small><strong>Tip:</strong> Complete challenges and report issues to earn points and climb the leaderboard!</small>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <!-- AI Identifier Section -->\n        <div id=\"ai-identifier\" class=\"engagement-section\" style=\"display: none;\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <div style=\"background: rgba(245, 158, 11, 0.2); border: 2px solid var(--solar-orange); border-radius: 20px; padding: 25px;\">\n                        <h5 style=\"color: var(--solar-orange); margin-bottom: 20px;\">\n                            <i class=\"fas fa-camera me-2\"></i>AI Trash Identifier\n                        </h5>\n                        <div class=\"text-center\">\n                            <div style=\"background: rgba(245, 158, 11, 0.3); border: 2px dashed var(--solar-orange); border-radius: 15px; padding: 30px; margin-bottom: 15px;\">\n                                <i class=\"fas fa-camera\" style=\"font-size: 3rem; color: var(--solar-orange); margin-bottom: 15px;\"></i>\n                                <div>\n                                    <input type=\"file\" class=\"form-control\" id=\"trashImage\" accept=\"image/*\" onchange=\"identifyTrash(this)\" style=\"background: rgba(255,255,255,0.1); border: 1px solid var(--solar-orange); color: white;\">\n                                    <small class=\"text-muted mt-2 d-block\">Upload image to identify trash type and get disposal instructions</small>\n                                </div>\n                            </div>\n                        </div>\n                        <div id=\"trash-result\" style=\"display: none;\"></div>\n                    </div>\n                </div>\n                <div class=\"col-md-6\">\n                    <div class=\"real-time-data\" style=\"height: 100%;\">\n                        <h5><i class=\"fas fa-recycle\"></i> Recycling Guide</h5>\n                        <div class=\"mb-3\">\n                            <div class=\"p-2\" style=\"background: rgba(16, 185, 129, 0.1); border-radius: 8px; margin-bottom: 10px;\">\n                                <strong>♻️ Recyclable</strong><br>\n                                <small>Plastic bottles, paper, cardboard, glass</small>\n                            </div>\n                            <div class=\"p-2\" style=\"background: rgba(245, 158, 11, 0.1); border-radius: 8px; margin-bottom: 10px;\">\n                                <strong>🗑️ General Waste</strong><br>\n                                <small>Food waste, tissues, broken ceramics</small>\n                            </div>\n                            <div class=\"p-2\" style=\"background: rgba(239, 68, 68, 0.1); border-radius: 8px;\">\n                                <strong>⚠️ Hazardous</strong><br>\n                                <small>Batteries, electronics, chemicals</small>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <!-- Community Section -->\n        <div id=\"community\" class=\"engagement-section\" style=\"display: none;\">\n            <div class=\"row\">\n                <div class=\"col-md-6\">\n                    <h5><i class=\"fas fa-users\"></i> Community Stats</h5>\n                    <div class=\"real-time-data\">\n                        <div class=\"data-metric\">\n                            <span>Active Members</span>\n                            <span class=\"metric-value text-success\">1,247</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Issues Reported Today</span>\n                            <span class=\"metric-value text-warning\">23</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Challenges Completed</span>\n                            <span class=\"metric-value text-info\">156</span>\n                        </div>\n                        <div class=\"data-metric\">\n                            <span>Environmental Impact</span>\n                            <span class=\"metric-value text-success\">High</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-6\">\n                    <h5><i class=\"fas fa-bullhorn\"></i> Community Announcements</h5>\n                    <div class=\"list-group\">\n                        <div class=\"list-group-item bg-transparent text-white border-success\">\n                            <strong>🌱 Earth Day Challenge</strong><br>\n                            <small>Join our special Earth Day challenge starting next week!</small>\n                        </div>\n                        <div class=\"list-group-item bg-transparent text-white border-info\">\n                            <strong>📊 Monthly Report</strong><br>\n                            <small>Community prevented 2.3 tons of CO2 emissions this month</small>\n                        </div>\n                        <div class=\"list-group-item bg-transparent text-white border-warning\">\n                            <strong>🏆 New Leaderboard</strong><br>\n                            <small>Updated ranking system with more rewards</small>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <style>\n        .engagement-section {\n            animation: fadeIn 0.5s ease-in-out;\n        }\n        \n        @keyframes fadeIn {\n            from { opacity: 0; transform: translateY(20px); }\n            to { opacity: 1; transform: translateY(0); }\n        }\n        \n        .leaderboard-item:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 4px 15px rgba(107, 70, 193, 0.3);\n        }\n        \n        .challenge-card:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);\n        }\n        \n        .nav-btn {\n            transition: all 0.3s ease;\n        }\n        \n        .nav-btn:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);\n        }\n        \n        .nav-btn.active {\n            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);\n        }\n        \n        .data-metric {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 8px 0;\n            border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n        }\n        \n        .metric-value {\n            font-weight: bold;\n            color: var(--earth-green);\n        }\n        </style>\n    `;
}

// Initialize engagement module
function initializeEngagementModule() {
    setTimeout(() => {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('data-section');
                switchEngagementTab(targetSection);
            });
        });
        
        // Initialize form submission
        const issueForm = document.getElementById('issue-form');
        if (issueForm) {
            issueForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitIssue();
            });
        }
        
        // Load initial data
        loadChallenges();
        loadReportedIssues();
        displayLeaderboard();
        updateUserStats();
    }, 500);
}

// Switch engagement tabs
function switchEngagementTab(targetSection) {
    const sections = document.querySelectorAll('.engagement-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const targetElement = document.getElementById(targetSection);
    if (targetElement) {
        targetElement.style.display = 'block';
    }
    
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.style.opacity = '0.7';
        btn.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[data-section="${targetSection}"]`);
    if (activeButton) {
        activeButton.style.opacity = '1';
        activeButton.classList.add('active');
    }
    
    // Load section-specific data
    if (targetSection === 'leaderboard') {
        displayLeaderboard();
    } else if (targetSection === 'challenges') {
        loadChallenges();
    }
}

// Submit issue function
function submitIssue() {
    const type = document.getElementById('issue-type').value;
    const location = document.getElementById('issue-location').value;
    const description = document.getElementById('issue-description').value;
    const severity = document.getElementById('issue-severity').value;
    
    const issue = {
        id: Date.now(),
        type,
        location,
        description,
        severity,
        timestamp: new Date().toISOString(),
        status: 'Reported'
    };
    
    let issues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    issues.unshift(issue);
    localStorage.setItem('reportedIssues', JSON.stringify(issues));
    
    // Award points for reporting
    if (window.addUserPoints) {
        window.addUserPoints(30, 'Reported Environmental Issue');
    }
    
    // Clear form
    document.getElementById('issue-form').reset();
    
    // Show success message
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; background: rgba(16, 185, 129, 0.9);';
    alert.innerHTML = '<i class="fas fa-check-circle me-2"></i>Issue reported successfully! +30 points earned.';
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
    
    // Reload issues
    loadReportedIssues();
    updateReportingStats();
}

// Load reported issues
function loadReportedIssues() {
    const recentReports = document.getElementById('recent-reports');
    if (!recentReports) return;
    
    const issues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    
    if (issues.length === 0) {
        recentReports.innerHTML = '<div class="text-center p-4"><i class="fas fa-info-circle" style="font-size: 2rem; color: var(--nasa-blue); margin-bottom: 10px;"></i><p>No reports submitted yet. Be the first to report an environmental issue!</p></div>';
        return;
    }
    
    recentReports.innerHTML = issues.slice(0, 5).map(issue => {
        const severityColor = issue.severity === 'Critical' ? 'var(--nasa-red)' : issue.severity === 'High' ? 'var(--solar-orange)' : issue.severity === 'Medium' ? '#F59E0B' : 'var(--earth-green)';
        return `
            <div class="issue-card mb-3 p-3" style="background: rgba(${severityColor === 'var(--nasa-red)' ? '239, 68, 68' : severityColor === 'var(--solar-orange)' ? '245, 158, 11' : severityColor === '#F59E0B' ? '245, 158, 11' : '16, 185, 129'}, 0.2); border: 1px solid ${severityColor}; border-radius: 10px;">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 style="color: ${severityColor}; margin-bottom: 5px;">${issue.type}</h6>
                        <div style="font-size: 0.9rem; margin-bottom: 5px;"><i class="fas fa-map-marker-alt me-1"></i>${issue.location}</div>
                        <div style="font-size: 0.85rem; opacity: 0.8;">${issue.description}</div>
                    </div>
                    <div class="text-end">
                        <span class="badge" style="background: ${severityColor};">${issue.severity}</span>
                        <div style="font-size: 0.75rem; margin-top: 5px;">${new Date(issue.timestamp).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update reporting stats
function updateReportingStats() {
    const issues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    const issuesReportedEl = document.getElementById('issues-reported');
    const reportingPointsEl = document.getElementById('reporting-points');
    
    if (issuesReportedEl) issuesReportedEl.textContent = issues.length;
    if (reportingPointsEl) reportingPointsEl.textContent = issues.length * 30;
    
    // Force update user stats to sync everything
    if (window.updateUserStats) {
        window.updateUserStats();
    }
}

// AI Trash Identifier
function identifyTrash(input) {
    const file = input.files[0];
    if (!file) return;
    
    const resultDiv = document.getElementById('trash-result');
    resultDiv.style.display = 'block';
    
    // Show loading
    resultDiv.innerHTML = `
        <div class="text-center">
            <div class="loading-spinner" style="width: 30px; height: 30px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid var(--solar-orange); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <h6 class="mt-2" style="color: var(--solar-orange);">Analyzing image...</h6>
        </div>
    `;
    
    // Simulate AI analysis
    setTimeout(() => {
        const trashTypes = [
            { type: 'Plastic Bottle', category: 'Recyclable', color: 'var(--earth-green)', icon: '♻️', instructions: 'Remove cap and label, rinse clean, place in recycling bin' },
            { type: 'Food Waste', category: 'Compostable', color: 'var(--solar-orange)', icon: '🍃', instructions: 'Place in compost bin or organic waste collection' },
            { type: 'Battery', category: 'Hazardous', color: 'var(--nasa-red)', icon: '⚠️', instructions: 'Take to special collection point or electronics store' },
            { type: 'Paper', category: 'Recyclable', color: 'var(--earth-green)', icon: '📄', instructions: 'Remove any plastic coating, place in paper recycling' },
            { type: 'Glass Bottle', category: 'Recyclable', color: 'var(--earth-green)', icon: '🍾', instructions: 'Remove cap, rinse clean, place in glass recycling bin' }
        ];
        
        const randomTrash = trashTypes[Math.floor(Math.random() * trashTypes.length)];
        
        resultDiv.innerHTML = `
            <div style="border: 2px solid ${randomTrash.color}; border-radius: 15px; padding: 20px; background: rgba(${randomTrash.color === 'var(--earth-green)' ? '16, 185, 129' : randomTrash.color === 'var(--solar-orange)' ? '245, 158, 11' : '239, 68, 68'}, 0.1);">
                <h6 style="color: ${randomTrash.color}; margin-bottom: 15px;">
                    <i class="fas fa-check-circle me-2"></i>Identification Complete
                </h6>
                <div class="text-center mb-3">
                    <div style="font-size: 3rem; margin-bottom: 10px;">${randomTrash.icon}</div>
                    <h5 style="color: ${randomTrash.color};">${randomTrash.type}</h5>
                    <span class="badge" style="background: ${randomTrash.color};">${randomTrash.category}</span>
                </div>
                <div class="alert" style="background: rgba(${randomTrash.color === 'var(--earth-green)' ? '16, 185, 129' : randomTrash.color === 'var(--solar-orange)' ? '245, 158, 11' : '239, 68, 68'}, 0.2); border: 1px solid ${randomTrash.color};">
                    <strong>Disposal Instructions:</strong><br>
                    ${randomTrash.instructions}
                </div>
            </div>
        `;
    }, 2000);
}

// Export functions
window.generateEngagementModule = generateEngagementModule;
window.initializeEngagementModule = initializeEngagementModule;
window.switchEngagementTab = switchEngagementTab;
window.submitIssue = submitIssue;
window.identifyTrash = identifyTrash;