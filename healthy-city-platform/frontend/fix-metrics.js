// Load NASA Dataset Metrics
function loadRealTimeMetrics() {
    const data = window.NASA_DATASET.globalMetrics;
    
    // Load from dedicated NASA dataset
    document.getElementById('co2Level').textContent = data.co2.value + ' ' + data.co2.unit;
    document.getElementById('activeFires').textContent = data.activeFires.value.toLocaleString();
    document.getElementById('seaLevel').textContent = '+' + data.seaLevel.value + ' ' + data.seaLevel.unit;
    document.getElementById('ozoneLevel').textContent = data.ozone.value + ' ' + data.ozone.unit;
    
    // Add small variations every 30 seconds
    setInterval(() => {
        document.getElementById('co2Level').textContent = (data.co2.value + Math.random() * 0.5 - 0.25).toFixed(2) + ' ' + data.co2.unit;
        document.getElementById('activeFires').textContent = (data.activeFires.value + Math.floor(Math.random() * 20 - 10)).toLocaleString();
        document.getElementById('ozoneLevel').textContent = (data.ozone.value + Math.floor(Math.random() * 6 - 3)) + ' ' + data.ozone.unit;
    }, 30000);
}

// Load metrics when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadRealTimeMetrics, 1000);
});