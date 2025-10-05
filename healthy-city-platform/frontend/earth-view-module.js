// Earth View Module Integration
async function generateEarthViewModule() {
    return generate3DEarthModule();
}

// Initialize Earth View when modal opens
function initializeEarthViewModule() {
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            init3DEarth();
        } else {
            console.error('Three.js not loaded');
        }
    }, 500);
}

// Add Earth View to module configs
document.addEventListener('DOMContentLoaded', function() {
    // Override loadNASAModule to handle earth-view
    const originalLoadNASAModule = window.loadNASAModule;
    window.loadNASAModule = async function(moduleType) {
        if (moduleType === 'earth-view') {
            const modal = new bootstrap.Modal(document.getElementById('nasaModal'));
            const modalTitle = document.getElementById('nasaModalTitle');
            const modalBody = document.getElementById('nasaModalBody');
            
            modalTitle.textContent = '3D Earth View';
            modalBody.innerHTML = await generateEarthViewModule();
            modal.show();
            
            initializeEarthViewModule();
        } else if (originalLoadNASAModule) {
            originalLoadNASAModule(moduleType);
        }
    };
});