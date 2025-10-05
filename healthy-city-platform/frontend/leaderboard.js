// Leaderboard and Challenge Management System

// Global variables for challenges and leaderboard
let userChallenges = JSON.parse(localStorage.getItem('userChallenges') || '[]');
let leaderboardData = JSON.parse(localStorage.getItem('leaderboardData') || '[]');
let userPoints = parseInt(localStorage.getItem('userPoints') || '0');

// Initialize user in leaderboard if not exists
function initializeUserInLeaderboard() {
    const currentUser = window.nasaPlatform?.user?.name || 'Anonymous User';
    const existingUser = leaderboardData.find(user => user.name === currentUser);
    
    if (!existingUser) {
        leaderboardData.push({
            name: currentUser,
            points: userPoints,
            completedChallenges: userChallenges.filter(c => c.completed).length,
            rank: leaderboardData.length + 1,
            avatar: '🚀',
            joinDate: new Date().toISOString().split('T')[0]
        });
        updateLeaderboard();
    }
}

// Update leaderboard rankings
function updateLeaderboard() {
    leaderboardData.sort((a, b) => b.points - a.points);
    leaderboardData.forEach((user, index) => {
        user.rank = index + 1;
    });
    localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
    
    // Update display if leaderboard is visible
    const leaderboardList = document.getElementById('leaderboard-list');
    if (leaderboardList) {
        displayLeaderboard();
    }
}

// Add points to user
function addUserPoints(points, activity) {
    userPoints += points;
    localStorage.setItem('userPoints', userPoints.toString());
    
    // Update user in leaderboard
    const currentUser = window.nasaPlatform?.user?.name || 'Anonymous User';
    const userInLeaderboard = leaderboardData.find(user => user.name === currentUser);
    if (userInLeaderboard) {
        userInLeaderboard.points = userPoints;
        userInLeaderboard.completedChallenges = userChallenges.filter(c => c.completed).length;
    }
    
    updateLeaderboard();
    
    // Show points notification
    showPointsNotification(points, activity);
}

// Show points notification
function showPointsNotification(points, activity) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success';
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; background: rgba(16, 185, 129, 0.9); animation: slideIn 0.3s ease;';
    notification.innerHTML = `
        <i class="fas fa-trophy me-2"></i>
        <strong>+${points} points!</strong><br>
        <small>${activity}</small>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Complete challenge
function completeChallenge(challengeId) {
    const challenge = userChallenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
        challenge.completed = true;
        challenge.completedDate = new Date().toISOString();
        localStorage.setItem('userChallenges', JSON.stringify(userChallenges));
        
        // Award points
        addUserPoints(challenge.points, `Completed: ${challenge.title}`);
        
        // Force immediate refresh of all displays
        setTimeout(() => {
            loadChallenges();
            updateUserStats();
            displayLeaderboard();
            if (window.updateReportingStats) {
                updateReportingStats();
            }
        }, 100);
        
        // Show completion message
        showChallengeCompletionModal(challenge);
    }
}

// Show challenge completion modal
function showChallengeCompletionModal(challenge) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = 'display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999;';
    modal.innerHTML = `
        <div class="modal-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, var(--space-dark), var(--nasa-blue)); border: 2px solid var(--earth-green); border-radius: 20px; padding: 40px; text-align: center; min-width: 400px;">
            <h3 style="color: var(--earth-green); margin-bottom: 20px;">
                <i class="fas fa-trophy me-2"></i>Challenge Complete!
            </h3>
            <div style="font-size: 4rem; margin: 20px 0;">🎉</div>
            <h4 style="color: white; margin-bottom: 15px;">${challenge.title}</h4>
            <div class="alert alert-success" style="background: rgba(16, 185, 129, 0.2); border: 1px solid var(--earth-green); margin: 20px 0;">
                <strong>+${challenge.points} Points Earned!</strong><br>
                <small>Your total: ${userPoints} points</small>
            </div>
            <div style="margin: 20px 0;">
                <div class="badge" style="background: var(--earth-green); font-size: 1rem; padding: 8px 15px;">
                    Rank: #${leaderboardData.find(u => u.name === (window.nasaPlatform?.user?.name || 'Anonymous User'))?.rank || '--'}
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="btn" style="background: var(--earth-green); color: white; padding: 10px 30px;">
                <i class="fas fa-check me-1"></i>Continue
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Update challenge display
function updateChallengeDisplay() {
    const challengesList = document.getElementById('challenges-list');
    if (challengesList) {
        loadChallenges();
    }
    
    // Update user stats
    updateUserStats();
}

// Load challenges
function loadChallenges() {
    const challengesList = document.getElementById('challenges-list');
    if (!challengesList) return;
    
    // Initialize challenges if not exists
    if (userChallenges.length === 0) {
        userChallenges = [
            {
                id: 1,
                title: 'Plant a Tree',
                description: 'Plant a tree in your community and upload a photo',
                points: 50,
                difficulty: 'Easy',
                category: 'Environment',
                completed: false
            },
            {
                id: 2,
                title: 'Reduce Plastic Usage',
                description: 'Go plastic-free for a week and document your journey',
                points: 75,
                difficulty: 'Medium',
                category: 'Sustainability',
                completed: false
            },
            {
                id: 3,
                title: 'Community Cleanup',
                description: 'Organize or participate in a community cleanup event',
                points: 100,
                difficulty: 'Hard',
                category: 'Community',
                completed: false
            },
            {
                id: 4,
                title: 'Energy Conservation',
                description: 'Reduce your energy consumption by 20% this month',
                points: 80,
                difficulty: 'Medium',
                category: 'Energy',
                completed: false
            },
            {
                id: 5,
                title: 'Water Conservation',
                description: 'Install water-saving devices and track usage',
                points: 60,
                difficulty: 'Easy',
                category: 'Water',
                completed: false
            },
            {
                id: 6,
                title: 'Report Environmental Issue',
                description: 'Report an environmental issue in your area',
                points: 30,
                difficulty: 'Easy',
                category: 'Reporting',
                completed: false
            }
        ];
        localStorage.setItem('userChallenges', JSON.stringify(userChallenges));
    }
    
    challengesList.innerHTML = userChallenges.map(challenge => {
        const difficultyColor = challenge.difficulty === 'Easy' ? 'var(--earth-green)' : 
                               challenge.difficulty === 'Medium' ? 'var(--solar-orange)' : 'var(--nasa-red)';
        
        return `
            <div class="challenge-card mb-3 p-3" style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--earth-green); border-radius: 10px; ${challenge.completed ? 'opacity: 0.7;' : ''} transition: all 0.3s ease;">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 style="color: var(--earth-green); margin-bottom: 5px;">
                            ${challenge.completed ? '<i class="fas fa-check-circle me-1"></i>' : ''}
                            ${challenge.title}
                        </h6>
                        <p style="margin-bottom: 10px; font-size: 0.9rem;">${challenge.description}</p>
                        <div class="d-flex gap-2 align-items-center">
                            <span class="badge" style="background: ${difficultyColor};">${challenge.difficulty}</span>
                            <span class="badge" style="background: var(--cosmic-purple);">${challenge.category}</span>
                            <span class="badge" style="background: var(--solar-orange);">${challenge.points} pts</span>
                            ${challenge.completed ? `<small class="text-muted">Completed: ${new Date(challenge.completedDate).toLocaleDateString()}</small>` : ''}
                        </div>
                    </div>
                    <div class="text-end">
                        ${challenge.completed ? 
                            '<span class="badge bg-success"><i class="fas fa-trophy"></i> Completed</span>' :
                            `<button class="btn btn-sm" style="background: var(--earth-green); color: white;" onclick="completeChallenge(${challenge.id})">
                                <i class="fas fa-play me-1"></i>Complete
                            </button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update user stats
    updateUserStats();
}

// Display leaderboard
function displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;
    
    // Add some sample users if leaderboard is empty
    if (leaderboardData.length <= 1) {
        const sampleUsers = [
            { name: 'EcoWarrior2024', points: 850, completedChallenges: 12, rank: 1, avatar: '🌱', joinDate: '2024-01-15' },
            { name: 'GreenGuardian', points: 720, completedChallenges: 10, rank: 2, avatar: '🌍', joinDate: '2024-01-20' },
            { name: 'ClimateChampion', points: 680, completedChallenges: 9, rank: 3, avatar: '⚡', joinDate: '2024-02-01' },
            { name: 'NatureLover', points: 540, completedChallenges: 7, rank: 4, avatar: '🦋', joinDate: '2024-02-10' },
            { name: 'SustainabilityPro', points: 420, completedChallenges: 6, rank: 5, avatar: '♻️', joinDate: '2024-02-15' }
        ];
        
        // Only add sample users that don't conflict with current user
        const currentUser = window.nasaPlatform?.user?.name || 'Anonymous User';
        sampleUsers.forEach(user => {
            if (user.name !== currentUser && !leaderboardData.find(u => u.name === user.name)) {
                leaderboardData.push(user);
            }
        });
        
        updateLeaderboard();
    }
    
    const currentUser = window.nasaPlatform?.user?.name || 'Anonymous User';
    
    leaderboardList.innerHTML = leaderboardData.slice(0, 10).map((user, index) => {
        const isCurrentUser = user.name === currentUser;
        const rankColor = index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'var(--cosmic-purple)';
        const rankIcon = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
        
        return `
            <div class="leaderboard-item mb-2 p-3" style="background: ${isCurrentUser ? 'rgba(107, 70, 193, 0.3)' : 'rgba(255, 255, 255, 0.05)'}; border: ${isCurrentUser ? '2px solid var(--cosmic-purple)' : '1px solid rgba(255, 255, 255, 0.1)'}; border-radius: 10px; transition: all 0.3s ease;">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="rank-badge me-3" style="background: ${rankColor}; color: ${index < 3 ? 'black' : 'white'}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            ${rankIcon}
                        </div>
                        <div>
                            <h6 style="margin: 0; color: ${isCurrentUser ? 'var(--cosmic-purple)' : 'white'}; font-weight: bold;">
                                ${user.avatar} ${user.name} ${isCurrentUser ? '(You)' : ''}
                            </h6>
                            <small class="text-muted">
                                ${user.completedChallenges} challenges • Joined ${new Date(user.joinDate).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="points-display" style="font-size: 1.2rem; font-weight: bold; color: var(--solar-orange);">
                            ${user.points.toLocaleString()} pts
                        </div>
                        <small class="text-muted">Rank #${user.rank}</small>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update leaderboard stats
    updateLeaderboardStats();
}

// Update leaderboard stats
function updateLeaderboardStats() {
    const currentUser = window.nasaPlatform?.user?.name || 'Anonymous User';
    const userInLeaderboard = leaderboardData.find(u => u.name === currentUser);
    
    const totalPlayersEl = document.getElementById('total-players');
    const yourPositionEl = document.getElementById('your-position');
    const topPlayerPointsEl = document.getElementById('top-player-points');
    const pointsToNextEl = document.getElementById('points-to-next');
    
    if (totalPlayersEl) totalPlayersEl.textContent = leaderboardData.length;
    if (yourPositionEl) yourPositionEl.textContent = userInLeaderboard ? `#${userInLeaderboard.rank}` : '#--';
    if (topPlayerPointsEl) topPlayerPointsEl.textContent = leaderboardData[0]?.points.toLocaleString() || '0';
    
    // Calculate points to next rank
    if (pointsToNextEl) {
        if (userInLeaderboard && userInLeaderboard.rank > 1) {
            const nextRankUser = leaderboardData.find(u => u.rank === userInLeaderboard.rank - 1);
            const pointsToNext = nextRankUser ? nextRankUser.points - userInLeaderboard.points + 1 : 0;
            pointsToNextEl.textContent = pointsToNext > 0 ? pointsToNext.toLocaleString() : '0';
        } else {
            pointsToNextEl.textContent = userInLeaderboard?.rank === 1 ? 'Top Player!' : '--';
        }
    }
}

// Refresh leaderboard
function refreshLeaderboard() {
    updateLeaderboard();
    displayLeaderboard();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-info';
    alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; background: rgba(107, 70, 193, 0.9);';
    alert.innerHTML = '<i class="fas fa-sync me-2"></i>Leaderboard refreshed!';
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 2000);
}

// Update user stats
function updateUserStats() {
    const userPointsEl = document.getElementById('user-points');
    const completedChallengesEl = document.getElementById('completed-challenges');
    const userRankEl = document.getElementById('user-rank');
    const weeklyGoalEl = document.getElementById('weekly-goal');
    
    const completedCount = userChallenges.filter(c => c.completed).length;
    
    if (userPointsEl) userPointsEl.textContent = userPoints;
    if (completedChallengesEl) completedChallengesEl.textContent = completedCount;
    
    const currentUser = window.nasaPlatform?.user?.name || 'Anonymous User';
    const userInLeaderboard = leaderboardData.find(u => u.name === currentUser);
    if (userRankEl) userRankEl.textContent = userInLeaderboard ? `#${userInLeaderboard.rank}` : '#--';
    
    // Update weekly goal with visual progress
    if (weeklyGoalEl) {
        weeklyGoalEl.textContent = `${Math.min(completedCount, 5)}/5`;
        const progress = Math.min(completedCount / 5 * 100, 100);
        weeklyGoalEl.style.background = `linear-gradient(90deg, var(--earth-green) ${progress}%, rgba(255,255,255,0.1) ${progress}%)`;
        weeklyGoalEl.style.borderRadius = '4px';
        weeklyGoalEl.style.padding = '2px 8px';
    }
}

// Auto-complete challenge when reporting issues
function autoCompleteReportChallenge() {
    const reportChallenge = userChallenges.find(c => c.category === 'Reporting' && !c.completed);
    if (reportChallenge) {
        completeChallenge(reportChallenge.id);
    }
}

// Initialize leaderboard system
function initializeLeaderboardSystem() {
    initializeUserInLeaderboard();
    
    // Auto-complete reporting challenge when issues are reported
    const originalSubmitIssue = window.submitIssue;
    if (originalSubmitIssue) {
        window.submitIssue = function() {
            originalSubmitIssue();
            autoCompleteReportChallenge();
        };
    }
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .leaderboard-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(107, 70, 193, 0.3);
    }
    
    .challenge-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
    
    .rank-badge {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeLeaderboardSystem();
    }, 1000);
});

// Export functions for global access
window.completeChallenge = completeChallenge;
window.loadChallenges = loadChallenges;
window.displayLeaderboard = displayLeaderboard;
window.refreshLeaderboard = refreshLeaderboard;
window.updateUserStats = updateUserStats;
window.addUserPoints = addUserPoints;