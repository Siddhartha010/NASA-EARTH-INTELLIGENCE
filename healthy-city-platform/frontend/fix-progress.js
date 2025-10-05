// Fix challenge progress updates
function fixChallengeProgress() {
    // Override completeChallenge to force immediate updates
    window.completeChallenge = function(challengeId) {
        let userChallenges = JSON.parse(localStorage.getItem('userChallenges') || '[]');
        let userPoints = parseInt(localStorage.getItem('userPoints') || '0');
        
        const challenge = userChallenges.find(c => c.id === challengeId);
        if (challenge && !challenge.completed) {
            challenge.completed = true;
            challenge.completedDate = new Date().toISOString();
            
            // Update storage
            localStorage.setItem('userChallenges', JSON.stringify(userChallenges));
            userPoints += challenge.points;
            localStorage.setItem('userPoints', userPoints.toString());
            
            // Force update all displays immediately
            updateAllDisplays();
            
            // Show success message
            showSuccess(challenge.points, challenge.title);
        }
    };
    
    function updateAllDisplays() {
        const userChallenges = JSON.parse(localStorage.getItem('userChallenges') || '[]');
        const userPoints = parseInt(localStorage.getItem('userPoints') || '0');
        const completedCount = userChallenges.filter(c => c.completed).length;
        
        // Update challenge list
        const challengesList = document.getElementById('challenges-list');
        if (challengesList) {
            challengesList.innerHTML = userChallenges.map(challenge => `
                <div class="challenge-card mb-3 p-3" style="background: ${challenge.completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.1)'}; border: 1px solid var(--earth-green); border-radius: 10px;">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h6 style="color: var(--earth-green);">
                                ${challenge.completed ? '✅' : '🎯'} ${challenge.title}
                            </h6>
                            <p style="font-size: 0.9rem;">${challenge.description}</p>
                            <div class="d-flex gap-2">
                                <span class="badge" style="background: var(--solar-orange);">${challenge.points} pts</span>
                                ${challenge.completed ? '<span class="badge bg-success">COMPLETED</span>' : ''}
                            </div>
                        </div>
                        <div>
                            ${challenge.completed ? 
                                '<span class="text-success">✅</span>' :
                                `<button class="btn btn-sm" style="background: var(--earth-green); color: white;" onclick="completeChallenge(${challenge.id})">Complete</button>`
                            }
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Update stats
        const elements = {
            'user-points': userPoints,
            'completed-challenges': completedCount,
            'weekly-goal': `${Math.min(completedCount, 5)}/5`
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
    }
    
    function showSuccess(points, title) {
        const alert = document.createElement('div');
        alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; background: var(--earth-green); color: white; padding: 15px; border-radius: 10px;';
        alert.innerHTML = `✅ +${points} points! Completed: ${title}`;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
    
    // Auto-load challenges when engagement module opens
    const observer = new MutationObserver(() => {
        const challengesList = document.getElementById('challenges-list');
        if (challengesList && !challengesList.hasChildNodes()) {
            updateAllDisplays();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize fix
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(fixChallengeProgress, 1000);
});