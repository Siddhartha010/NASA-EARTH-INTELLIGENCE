// NASA Earth Intelligence Platform - Dynamic Frontend

class NASAEarthPlatform {
    constructor() {
        this.apiBaseUrl = window.location.origin + '/api';
        this.nasaApiKey = 'DEMO_KEY';
        this.map = null;
        this.currentLocation = { lat: 28.6139, lon: 77.2090 };
        this.user = null;
        this.checkAuth();
        this.init();
    }
    
    checkAuth() {
        const token = localStorage.getItem('nasa_token');
        const userData = localStorage.getItem('nasa_user');
        
        if (!token || !userData) {
            window.location.href = 'auth.html';
            return;
        }
        
        this.user = JSON.parse(userData);
        this.updateUserInterface();
    }
    
    updateUserInterface() {
        // Update navbar with user info
        const navbarNav = document.querySelector('.navbar-nav');
        if (navbarNav && this.user) {
            navbarNav.innerHTML += `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user-astronaut me-1"></i>${this.user.name}
                    </a>
                    <ul class="dropdown-menu" style="background: rgba(11, 61, 145, 0.95); border: 1px solid var(--nasa-red);">
                        <li><a class="dropdown-item text-white" href="#" onclick="window.nasaPlatform.showProfile()"><i class="fas fa-user me-2"></i>Profile</a></li>
                        <li><a class="dropdown-item text-white" href="#" onclick="window.nasaPlatform.logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                    </ul>
                </li>
            `;
        }
    }
    
    logout() {
        localStorage.removeItem('nasa_token');
        localStorage.removeItem('nasa_user');
        window.location.href = 'auth.html';
    }
    
    showProfile() {
        const modal = new bootstrap.Modal(document.getElementById('nasaModal'));
        const modalTitle = document.getElementById('nasaModalTitle');
        const modalBody = document.getElementById('nasaModalBody');
        
        modalTitle.textContent = 'Astronaut Profile';
        modalBody.innerHTML = `
            <div class="text-center mb-4">
                <i class="fas fa-user-astronaut" style="font-size: 4rem; color: var(--nasa-red);"></i>
                <h3 class="mt-3">${this.user.name}</h3>
                <p class="text-muted">${this.user.email}</p>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="real-time-data">
                        <h5><i class="fas fa-chart-line"></i> Mission Stats</h5>
                        <div class="data-metric">
                            <span>Role</span>
                            <span class="metric-value">${this.user.role || 'Astronaut'}</span>
                        </div>
                        <div class="data-metric">
                            <span>Missions Completed</span>
                            <span class="metric-value">12</span>
                        </div>
                        <div class="data-metric">
                            <span>Data Points Analyzed</span>
                            <span class="metric-value">1,247</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="real-time-data">
                        <h5><i class="fas fa-trophy"></i> Achievements</h5>
                        <div class="mb-2">
                            <i class="fas fa-medal text-warning me-2"></i>Earth Observer
                        </div>
                        <div class="mb-2">
                            <i class="fas fa-satellite text-info me-2"></i>Data Analyst
                        </div>
                        <div class="mb-2">
                            <i class="fas fa-leaf text-success me-2"></i>Environmental Guardian
                        </div>
                    </div>
                </div>
            </div>
        `;
        modal.show();
    }

    async init() {
        this.createStarField();
        this.initEarthMap();
        await this.getUserLocation();
        await this.loadRealTimeNASAData();
        this.startDataRefresh();
        this.showWelcomeMessage();
    }
    
    showWelcomeMessage() {
        if (this.user) {
            const welcomeAlert = document.createElement('div');
            welcomeAlert.className = 'alert alert-success alert-dismissible fade show';
            welcomeAlert.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 1050; background: rgba(16, 185, 129, 0.9); border: 1px solid var(--earth-green);';
            welcomeAlert.innerHTML = `
                <i class="fas fa-rocket me-2"></i>
                Welcome back, ${this.user.name}! Mission control is online.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            document.body.appendChild(welcomeAlert);
            
            setTimeout(() => {
                if (welcomeAlert.parentNode) {
                    welcomeAlert.remove();
                }
            }, 5000);
        }
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

    initEarthMap() {
        this.map = L.map('earthMap').setView([this.currentLocation.lat, this.currentLocation.lon], 10);
        
        // Date for NASA imagery
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const dateStr = yesterday.toISOString().split('T')[0];
        
        // Base Maps
        const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        });
        
        const satelliteMap = L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${dateStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`, {
            attribution: '© NASA GIBS - MODIS Terra',
            maxZoom: 10
        });
        
        const terrainMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenTopoMap contributors',
            maxZoom: 17
        });
        
        const landsatMap = L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/Landsat_WELD_CorrectedReflectance_TrueColor_Global_Annual/default/2021-01-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`, {
            attribution: '© NASA GIBS - Landsat',
            maxZoom: 12
        });
        
        // Initialize overlays object
        this.overlays = {};
        
        // Add default base layer
        streetMap.addTo(this.map);
        
        // Base layer groups
        const baseLayers = {
            "🗺️ Street Map": streetMap,
            "🛰️ NASA Satellite": satelliteMap,
            "🏔️ Terrain Map": terrainMap,
            "🌍 NASA Landsat": landsatMap
        };
        
        // Data overlay groups
        const overlayLayers = {
            "💨 Air Quality": null,
            "🌿 Vegetation Index": null,
            "💧 Water Bodies": null,
            "🔥 Fire Alerts": null,
            "⚠️ Disaster Alerts": null,
            "🌡️ Temperature": null,
            "🌱 Green Vegetation": null
        };
        
        // Create layer control with proper initialization
        this.layerControl = L.control.layers(baseLayers, {}, {
            position: 'topright',
            collapsed: false
        }).addTo(this.map);
        
        // Initialize data overlays
        this.initDataOverlays();
        
        // Load initial pollution data
        this.loadNASAPollutionData();
        
        // Reload pollution data when map is moved or zoomed
        this.map.on('moveend zoomend', () => {
            this.loadNASAPollutionData();
        });
    }
    
    initDataOverlays() {
        // Air Quality overlay (pollution heatmap)
        this.overlays.airQuality = L.layerGroup();
        
        // Vegetation Index overlay
        this.overlays.vegetation = L.layerGroup();
        
        // Water Bodies overlay
        this.overlays.water = L.layerGroup();
        
        // Fire Alerts overlay
        this.overlays.fires = L.layerGroup();
        
        // Disaster Alerts overlay
        this.overlays.disasters = L.layerGroup();
        
        // Temperature overlay
        this.overlays.temperature = L.layerGroup();
        
        // Green vegetation overlay
        this.overlays.greenVegetation = L.layerGroup();
        
        // Update layer control with actual overlay objects
        this.layerControl.removeLayer(null);
        this.layerControl.addOverlay(this.overlays.airQuality, "💨 Air Quality");
        this.layerControl.addOverlay(this.overlays.vegetation, "🌿 Vegetation Index");
        this.layerControl.addOverlay(this.overlays.water, "💧 Water Bodies");
        this.layerControl.addOverlay(this.overlays.fires, "🔥 Fire Alerts");
        this.layerControl.addOverlay(this.overlays.disasters, "⚠️ Disaster Alerts");
        this.layerControl.addOverlay(this.overlays.temperature, "🌡️ Temperature");
        this.layerControl.addOverlay(this.overlays.greenVegetation, "🌱 Green Vegetation");
        
        // Load overlay data
        this.loadVegetationOverlay();
        this.loadWaterOverlay();
        this.loadFireOverlay();
        this.loadDisasterOverlay();
        this.loadTemperatureOverlay();
        this.loadGreenVegetationOverlay();
    }

    getYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }

    async loadNASAPollutionData() {
        try {
            // Clear existing air quality overlay
            this.overlays.airQuality.clearLayers();
            
            // Get map bounds to load pollution data for entire visible area
            const bounds = this.map.getBounds();
            const centerLat = bounds.getCenter().lat;
            const centerLon = bounds.getCenter().lng;
            
            const response = await fetch(`/api/nasa/pollution/${centerLat}/${centerLon}`);
            const data = await response.json();
            
            // Generate global pollution grid covering the entire map view
            const globalPollutionData = this.generateGlobalPollutionGrid(bounds);
            
            // Combine API data with global grid
            const combinedData = [...data.pollution_grid, ...globalPollutionData];
            
            // Create heatmap from NASA pollution data
            const heatmapData = combinedData.map(point => [
                point.lat, point.lon, point.intensity
            ]);
            
            const heatLayer = L.heatLayer(heatmapData, {
                radius: 25,
                blur: 15,
                maxZoom: 15,
                gradient: {
                    0.0: '#00ff00',  // Green (low pollution)
                    0.3: '#ffff00',  // Yellow
                    0.6: '#ff8000',  // Orange
                    0.8: '#ff0000',  // Red
                    1.0: '#800080'   // Purple (high pollution)
                }
            });
            
            // Add heatmap to air quality overlay
            this.overlays.airQuality.addLayer(heatLayer);
            
            // Add global monitoring stations
            const globalStations = this.generateGlobalStations(bounds);
            [...data.monitoring_stations, ...globalStations].forEach(station => {
                const color = station.aqi > 150 ? '#800080' : station.aqi > 100 ? '#ff0000' : station.aqi > 50 ? '#ffff00' : '#00ff00';
                
                const stationIcon = L.divIcon({
                    html: `<div style="background: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: white;">${station.aqi}</div>`,
                    iconSize: [28, 28],
                    className: 'nasa-pollution-station'
                });
                
                const marker = L.marker([station.lat, station.lon], {icon: stationIcon})
                    .bindPopup(`
                        <div style="color: black;">
                            <strong>NASA OMI Station</strong><br>
                            Type: ${station.type}<br>
                            AQI: <span style="color: ${color}; font-weight: bold;">${station.aqi}</span><br>
                            NO2: ${(station.aqi / 2.5).toFixed(1)} ppb<br>
                            Status: ${station.aqi > 150 ? 'Unhealthy' : station.aqi > 100 ? 'Moderate' : 'Good'}<br>
                            Source: NASA OMI Satellite
                        </div>
                    `);
                
                this.overlays.airQuality.addLayer(marker);
            });
            
            // Add air quality overlay to map by default
            this.overlays.airQuality.addTo(this.map);
            
        } catch (error) {
            console.log('Error loading NASA pollution data:', error);
        }
    }
    
    generateGlobalPollutionGrid(bounds) {
        const pollutionData = [];
        const latStep = (bounds.getNorth() - bounds.getSouth()) / 20;
        const lonStep = (bounds.getEast() - bounds.getWest()) / 20;
        
        for (let lat = bounds.getSouth(); lat <= bounds.getNorth(); lat += latStep) {
            for (let lon = bounds.getWest(); lon <= bounds.getEast(); lon += lonStep) {
                // Simulate pollution based on location patterns
                let intensity = 0.2; // Base pollution
                
                // Higher pollution near major cities
                const cities = [
                    {lat: 28.6139, lon: 77.2090, factor: 0.9}, // Delhi
                    {lat: 19.0760, lon: 72.8777, factor: 0.7}, // Mumbai
                    {lat: 40.7128, lon: -74.0060, factor: 0.8}, // NYC
                    {lat: 51.5074, lon: -0.1278, factor: 0.6}, // London
                    {lat: 35.6762, lon: 139.6503, factor: 0.7}, // Tokyo
                    {lat: 39.9042, lon: 116.4074, factor: 0.9}, // Beijing
                    {lat: 31.2304, lon: 121.4737, factor: 0.8}, // Shanghai
                    {lat: 34.0522, lon: -118.2437, factor: 0.7} // LA
                ];
                
                cities.forEach(city => {
                    const distance = Math.sqrt(Math.pow(lat - city.lat, 2) + Math.pow(lon - city.lon, 2));
                    if (distance < 5) {
                        intensity += city.factor * (1 - distance / 5);
                    }
                });
                
                // Add some randomness
                intensity += Math.random() * 0.3;
                intensity = Math.min(intensity, 1.0);
                
                pollutionData.push({
                    lat: lat,
                    lon: lon,
                    intensity: intensity
                });
            }
        }
        
        return pollutionData;
    }
    
    loadVegetationOverlay() {
        const vegetationData = [
            {lat: 28.6139, lon: 77.2090, ndvi: 0.3, type: 'Urban'},
            {lat: 19.0760, lon: 72.8777, ndvi: 0.4, type: 'Coastal'},
            {lat: 13.0827,