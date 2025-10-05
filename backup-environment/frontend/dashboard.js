// NASA Earth Intelligence Platform - Interactive Dashboard

class MissionControlDashboard {
    constructor() {
        this.apiBaseUrl = window.location.origin + '/api';
        this.map = null;
        this.currentView = 'satellite';
        this.user = null;
        this.missionStartTime = Date.now();
        this.dataStreamInterval = null;
        this.metricsInterval = null;
        this.init();
    }

    init() {
        this.checkAuth();
        this.createStarField();
        this.updateMetrics(); // Load data immediately
        this.initDataStream(); // Load stream immediately
        this.initEarthMap();
        this.startMissionTimer();
        this.startMetricsUpdate();
        this.initInteractiveElements();
    }
    
    initDataStream() {
        const dataStream = document.getElementById('dataStream');
        if (!dataStream) return;
        
        const messages = [
            'MODIS Terra: Vegetation data acquired',
            'FIRMS: Fire detection scan complete', 
            'OMI: NO2 levels updated',
            'GRACE-FO: Groundwater anomaly detected',
            'AIRS: Temperature profile received'
        ];
        
        // Clear loading message and add real data immediately
        dataStream.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            const timestamp = new Date().toLocaleTimeString();
            const streamItem = document.createElement('div');
            streamItem.className = 'data-stream';
            streamItem.innerHTML = `[${timestamp}] ${message}`;
            dataStream.appendChild(streamItem);
        }
    }

    checkAuth() {
        const token = localStorage.getItem('nasa_token');
        const userData = localStorage.getItem('nasa_user');
        
        if (!token || !userData) {
            window.location.href = 'auth.html';
            return;
        }
        
        this.user = JSON.parse(userData);
        document.getElementById('userName').textContent = this.user.name;
    }

    createStarField() {
        const starsContainer = document.getElementById('stars');
        for (let i = 0; i < 300; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    initEarthMap() {
        // Initialize map centered near current default
        this.map = L.map('earthMap').setView([28.6139, 77.2090], 4);

        // Define base layers (keep dimensions/use same element id 'earthMap')
        const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        });

        const satelliteMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        });

        const terrainMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenTopoMap contributors',
            maxZoom: 17
        });

        // Add default base layer
        streetMap.addTo(this.map);

        // Create layer control
        const baseLayers = {
            '🗺️ Street Map': streetMap,
            '🛰️ Satellite': satelliteMap,
            '🏔️ Terrain': terrainMap
        };

        this.overlays = {};

        this.layerControl = L.control.layers(baseLayers, {}, {position: 'topright', collapsed: false}).addTo(this.map);

        // Initialize overlay groups and data loaders (keeps look/behavior of home page)
        this.initDataOverlays();
        this.loadNASAPollutionData();

        // When user pans/zooms, reload pollution data
        this.map.on('moveend zoomend', () => {
            this.loadNASAPollutionData();
        });

        // Keep existing interactive markers and mission-specific visuals
        this.addInteractiveMarkers();
    }

    addInteractiveMarkers() {
        const cities = [
            {lat: 28.6139, lon: 77.2090, name: 'Delhi', aqi: 168, temp: 32},
            {lat: 19.0760, lon: 72.8777, name: 'Mumbai', aqi: 89, temp: 29},
            {lat: 40.7128, lon: -74.0060, name: 'New York', aqi: 85, temp: 22},
            {lat: 51.5074, lon: -0.1278, name: 'London', aqi: 67, temp: 18},
            {lat: 35.6762, lon: 139.6503, name: 'Tokyo', aqi: 92, temp: 25}
        ];

        cities.forEach(city => {
            const color = city.aqi > 150 ? '#FF0000' : city.aqi > 100 ? '#FFA500' : city.aqi > 50 ? '#FFFF00' : '#00FF00';
            
            const marker = L.circleMarker([city.lat, city.lon], {
                radius: 8,
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(this.map);

            marker.bindPopup(`
                <div style="color: black; min-width: 200px;">
                    <h6><strong>${city.name}</strong></h6>
                    <div>AQI: <span style="color: ${color}; font-weight: bold;">${city.aqi}</span></div>
                    <div>Temperature: ${city.temp}°C</div>
                    <div>Status: ${city.aqi > 150 ? 'Unhealthy' : city.aqi > 100 ? 'Moderate' : 'Good'}</div>
                    <button onclick="focusCity('${city.name}')" class="btn btn-sm btn-primary mt-2">Focus</button>
                </div>
            `);

            // Add pulsing animation for high pollution
            if (city.aqi > 150) {
                marker.setStyle({className: 'pulsing-marker'});
            }
        });
    }

    addPollutionHeatmap() {
        const heatmapData = [];
        for (let i = 0; i < 100; i++) {
            heatmapData.push([
                Math.random() * 180 - 90,
                Math.random() * 360 - 180,
                Math.random()
            ]);
        }

        L.heatLayer(heatmapData, {
            radius: 20,
            blur: 15,
            maxZoom: 10,
            opacity: 0.6
        }).addTo(this.map);
    }

    initDataOverlays() {
        // Initialize basic overlay groups so layer control can show them
        this.overlays.airQuality = L.layerGroup();
        this.overlays.vegetation = L.layerGroup();
        this.overlays.fires = L.layerGroup();
        this.overlays.disasters = L.layerGroup();

        // Add overlays to layer control
        if (this.layerControl) {
            this.layerControl.addOverlay(this.overlays.airQuality, '💨 Air Quality');
            this.layerControl.addOverlay(this.overlays.vegetation, '🌿 Vegetation Index');
            this.layerControl.addOverlay(this.overlays.fires, '🔥 Fire Alerts');
            this.layerControl.addOverlay(this.overlays.disasters, '⚠️ Disaster Alerts');
        }
    }

    async loadNASAPollutionData() {
        try {
            // Clear existing overlay
            if (this.overlays && this.overlays.airQuality) this.overlays.airQuality.clearLayers();

            // Generate sample pollution points across current map bounds
            const bounds = this.map.getBounds();
            const heatData = [];
            const stations = [];

            for (let i = 0; i < 80; i++) {
                const lat = Math.random() * (bounds.getNorth() - bounds.getSouth()) + bounds.getSouth();
                const lon = Math.random() * (bounds.getEast() - bounds.getWest()) + bounds.getWest();
                const intensity = Math.random();
                heatData.push([lat, lon, intensity]);
                stations.push({lat, lon, aqi: Math.floor(30 + Math.random() * 170)});
            }

            // Create heat layer
            const heatLayer = L.heatLayer(heatData, {radius: 25, blur: 15, maxZoom: 15});
            this.overlays.airQuality.addLayer(heatLayer);

            // Create station markers
            stations.forEach(st => {
                const color = st.aqi > 150 ? '#800080' : st.aqi > 100 ? '#ff0000' : st.aqi > 50 ? '#ffff00' : '#00ff00';
                const icon = L.divIcon({html: `<div style="background:${color}; width:20px; height:20px; border-radius:50%; border:2px solid white;
                    display:flex; align-items:center; justify-content:center; font-size:10px; color:white">${st.aqi}</div>`, className: 'station-icon'});
                const marker = L.marker([st.lat, st.lon], {icon}).bindPopup(`<div style="color:black;"><strong>Station</strong><br>AQI: ${st.aqi}</div>`);
                this.overlays.airQuality.addLayer(marker);
            });

            // Add overlay to map
            this.overlays.airQuality.addTo(this.map);
        } catch (err) {
            console.error('Failed to load pollution data', err);
        }
    }

    startMissionTimer() {
        setInterval(() => {
            const elapsed = Date.now() - this.missionStartTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            document.getElementById('missionTime').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    startDataStream() {
        const dataStream = document.getElementById('dataStream');
        if (!dataStream) {
            console.log('Data stream element not found');
            return;
        }
        
        const messages = [
            'MODIS Terra: Vegetation data acquired',
            'FIRMS: Fire detection scan complete',
            'OMI: NO2 levels updated',
            'GRACE-FO: Groundwater anomaly detected',
            'AIRS: Temperature profile received',
            'Landsat 8: High-res imagery processed',
            'VIIRS: Night lights data synchronized'
        ];

        // Add initial messages
        for (let i = 0; i < 3; i++) {
            const message = messages[Math.floor(Math.random() * messages.length)];
            const timestamp = new Date().toLocaleTimeString();
            
            const streamItem = document.createElement('div');
            streamItem.className = 'data-stream';
            streamItem.innerHTML = `[${timestamp}] ${message}`;
            dataStream.appendChild(streamItem);
        }

        this.dataStreamInterval = setInterval(() => {
            const message = messages[Math.floor(Math.random() * messages.length)];
            const timestamp = new Date().toLocaleTimeString();
            
            const streamItem = document.createElement('div');
            streamItem.className = 'data-stream';
            streamItem.innerHTML = `[${timestamp}] ${message}`;
            
            dataStream.insertBefore(streamItem, dataStream.firstChild);
            
            // Keep only last 10 messages
            while (dataStream.children.length > 10) {
                dataStream.removeChild(dataStream.lastChild);
            }
        }, 3000);
    }

    startMetricsUpdate() {
        // Initialize metrics immediately
        this.updateMetrics();
        
        this.metricsInterval = setInterval(() => {
            this.updateMetrics();
            
            // Add new alerts occasionally
            if (Math.random() < 0.1) {
                this.addRandomAlert();
            }
        }, 5000);
    }
    
    updateMetrics() {
        // Update satellite count
        const satellites = 12 + Math.floor(Math.random() * 3) - 1;
        const satelliteEl = document.getElementById('satelliteCount');
        if (satelliteEl) satelliteEl.textContent = satellites;
        
        // Update data points
        const dataPoints = 1200 + Math.floor(Math.random() * 100);
        const dataPointsEl = document.getElementById('dataPoints');
        if (dataPointsEl) dataPointsEl.textContent = dataPoints.toLocaleString();
        
        // Update coverage
        const coverage = (98 + Math.random() * 2).toFixed(1);
        const coverageEl = document.getElementById('coverage');
        if (coverageEl) coverageEl.textContent = coverage + '%';
        
        // Update alert count
        const alertCount = Math.floor(Math.random() * 5) + 1;
        const alertCountEl = document.getElementById('alertCount');
        if (alertCountEl) alertCountEl.textContent = alertCount;
    }

    addRandomAlert() {
        const alerts = [
            {priority: 'HIGH', message: 'Unusual CO2 spike detected', location: 'Industrial Zone'},
            {priority: 'MEDIUM', message: 'Vegetation stress observed', location: 'Amazon Basin'},
            {priority: 'LOW', message: 'Satellite maintenance scheduled', location: 'MODIS Terra'},
            {priority: 'HIGH', message: 'Air quality threshold exceeded', location: 'Beijing'}
        ];

        const alert = alerts[Math.floor(Math.random() * alerts.length)];
        const alertsPanel = document.getElementById('alertsPanel');
        
        const alertItem = document.createElement('div');
        alertItem.className = 'alert-item';
        alertItem.innerHTML = `
            <div><strong>${alert.priority} PRIORITY</strong></div>
            <div>${alert.message}</div>
            <div class="text-muted">Just now</div>
        `;
        
        alertsPanel.insertBefore(alertItem, alertsPanel.firstChild);
        
        // Keep only last 5 alerts
        while (alertsPanel.children.length > 5) {
            alertsPanel.removeChild(alertsPanel.lastChild);
        }
    }

    initInteractiveElements() {
        // Add click animations to metric cards
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px)';
                }, 150);
            });
        });

        // Add floating widget interactions
        const floatingWidget = document.querySelector('.floating-widget');
        floatingWidget.addEventListener('click', () => {
            floatingWidget.style.transform = 'scale(1.1)';
            setTimeout(() => {
                floatingWidget.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// Global functions for UI interactions
function switchView(viewType) {
    console.log(`Switching to ${viewType} view`);
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.style.background = 'linear-gradient(45deg, var(--nasa-blue), var(--cosmic-purple))';
    });
    event.target.style.background = 'linear-gradient(45deg, var(--nasa-red), var(--solar-orange))';
    
    if (viewType === 'weather') {
        loadWeatherData();
    }
}

function toggleMetric(metricType) {
    console.log(`Toggling ${metricType} metric`);
}

function focusCity(cityName) {
    console.log(`Focusing on ${cityName}`);
}

function switchMapView(viewType) {
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'rgba(11, 61, 145, 0.8)';
    });
    event.target.classList.add('active');
    event.target.style.background = '#FC3D21';
    
    if (viewType === 'weather') {
        loadWeatherLayer();
    }
    console.log(`Switched to ${viewType} view`);
}

function generateReport() {
    const reportData = {
        timestamp: new Date().toISOString(),
        satellites: document.getElementById('satelliteCount').textContent,
        dataPoints: document.getElementById('dataPoints').textContent,
        coverage: document.getElementById('coverage').textContent,
        alerts: document.getElementById('alertCount').textContent
    };
    
    console.log('Generating mission report:', reportData);
    
    // Create and download report
    const reportContent = `NASA EARTH INTELLIGENCE MISSION REPORT\n\nGenerated: ${new Date().toLocaleString()}\nSatellites Active: ${reportData.satellites}\nData Points/Hour: ${reportData.dataPoints}\nGlobal Coverage: ${reportData.coverage}\nActive Alerts: ${reportData.alerts}\n\nMission Status: OPERATIONAL`;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NASA_Mission_Report_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function showProfile() {
    alert('Profile functionality - to be implemented');
}

function loadWeatherData() {
    const dataStream = document.getElementById('dataStream');
    const weatherMessages = [
        'NOAA: Temperature anomaly detected +2.3°C',
        'ECMWF: Precipitation forecast updated',
        'GFS: Wind pattern analysis complete',
        'MODIS: Cloud cover data synchronized',
        'AIRS: Humidity levels processed'
    ];
    
    dataStream.innerHTML = '';
    weatherMessages.forEach((message, index) => {
        setTimeout(() => {
            const timestamp = new Date().toLocaleTimeString();
            const streamItem = document.createElement('div');
            streamItem.className = 'data-stream';
            streamItem.innerHTML = `[${timestamp}] ${message}`;
            dataStream.appendChild(streamItem);
        }, index * 500);
    });
}

function loadWeatherLayer() {
    if (!window.missionControl || !window.missionControl.map) return;
    
    const map = window.missionControl.map;
    
    // Clear existing layers
    map.eachLayer(layer => {
        if (layer.options && layer.options.attribution && layer.options.attribution.includes('OpenWeatherMap')) {
            map.removeLayer(layer);
        }
    });
    
    // Add weather overlay
    const weatherLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY', {
        attribution: '© OpenWeatherMap',
        opacity: 0.6,
        maxZoom: 10
    });
    
    weatherLayer.addTo(map);
    
    // Add weather markers
    const weatherData = [
        {lat: 28.6139, lon: 77.2090, temp: 32, humidity: 65, condition: 'Hazy'},
        {lat: 19.0760, lon: 72.8777, temp: 29, humidity: 78, condition: 'Cloudy'},
        {lat: 40.7128, lon: -74.0060, temp: 22, humidity: 55, condition: 'Clear'},
        {lat: 51.5074, lon: -0.1278, temp: 18, humidity: 72, condition: 'Rainy'},
        {lat: 35.6762, lon: 139.6503, temp: 25, humidity: 68, condition: 'Partly Cloudy'}
    ];
    
    weatherData.forEach(weather => {
        const icon = weather.condition === 'Clear' ? '☀️' : 
                    weather.condition === 'Cloudy' ? '☁️' : 
                    weather.condition === 'Rainy' ? '🌧️' : 
                    weather.condition === 'Hazy' ? '🌫️' : '⛅';
        
        const marker = L.marker([weather.lat, weather.lon]).addTo(map);
        marker.bindPopup(`
            <div style="color: black; min-width: 180px;">
                <h6><strong>Weather Data</strong></h6>
                <div>${icon} ${weather.condition}</div>
                <div>Temperature: ${weather.temp}°C</div>
                <div>Humidity: ${weather.humidity}%</div>
            </div>
        `);
    });
}

function logout() {
    localStorage.removeItem('nasa_token');
    localStorage.removeItem('nasa_user');
    window.location.href = 'auth.html';
}

// Initialize dashboard on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    window.missionControl = new MissionControlDashboard();
});