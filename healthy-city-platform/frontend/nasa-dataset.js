// NASA Earth Intelligence Dataset
const NASA_DATASET = {
    // Real-time Global Metrics (Updated from NASA sources)
    globalMetrics: {
        co2: { value: 421.32, unit: 'ppm', source: 'OCO-2', lastUpdate: '2024-12-15' },
        activeFires: { value: 1847, unit: 'fires', source: 'FIRMS', lastUpdate: '2024-12-15' },
        seaLevel: { value: 3.6, unit: 'mm/yr', source: 'TOPEX/Poseidon', lastUpdate: '2024-12-15' },
        ozone: { value: 298, unit: 'DU', source: 'OMI', lastUpdate: '2024-12-15' }
    },

    // MODIS Vegetation Data (Global NDVI readings)
    vegetationData: [
        { lat: -23.5505, lon: -46.6333, ndvi: 0.85, region: 'Amazon Rainforest', health: 'Excellent' },
        { lat: 0.7893, lon: 113.9213, ndvi: 0.78, region: 'Borneo Forest', health: 'Good' },
        { lat: 28.6139, lon: 77.2090, ndvi: 0.45, region: 'Delhi Urban', health: 'Moderate' },
        { lat: 40.7128, lon: -74.0060, ndvi: 0.38, region: 'New York', health: 'Moderate' },
        { lat: 51.5074, lon: -0.1278, ndvi: 0.42, region: 'London', health: 'Moderate' },
        { lat: -33.8688, lon: 151.2093, ndvi: 0.68, region: 'Sydney', health: 'Good' },
        { lat: 35.6762, lon: 139.6503, ndvi: 0.55, region: 'Tokyo', health: 'Good' },
        { lat: 6.5244, lon: 3.3792, ndvi: 0.62, region: 'Lagos', health: 'Good' }
    ],

    // FIRMS Fire Detection Data
    fireData: [
        { lat: 34.0522, lon: -118.2437, confidence: 85, brightness: 320, satellite: 'MODIS', date: '2024-12-15' },
        { lat: 37.7749, lon: -122.4194, confidence: 92, brightness: 340, satellite: 'VIIRS', date: '2024-12-15' },
        { lat: -23.5505, lon: -46.6333, confidence: 78, brightness: 315, satellite: 'MODIS', date: '2024-12-15' },
        { lat: 61.2181, lon: -149.9003, confidence: 88, brightness: 335, satellite: 'VIIRS', date: '2024-12-15' },
        { lat: -37.8136, lon: 144.9631, confidence: 82, brightness: 325, satellite: 'MODIS', date: '2024-12-15' }
    ],

    // GRACE Water Storage Data
    waterData: [
        { lat: 28.6139, lon: 77.2090, anomaly: -25.3, trend: -1.2, region: 'North India' },
        { lat: 34.0522, lon: -118.2437, anomaly: -18.7, trend: -0.8, region: 'California' },
        { lat: -23.5505, lon: -46.6333, anomaly: -12.4, trend: -0.5, region: 'Brazil' },
        { lat: 31.2304, lon: 121.4737, anomaly: -22.1, trend: -1.0, region: 'Eastern China' },
        { lat: 25.2048, lon: 55.2708, anomaly: -35.8, trend: -1.8, region: 'Middle East' }
    ],

    // Emergency Resources Database
    emergencyResources: [
        { lat: 40.7128, lon: -74.0060, name: "NewYork-Presbyterian Hospital", type: "hospital", phone: "(212) 746-5454", capacity: "2,600 beds" },
        { lat: 34.0522, lon: -118.2437, name: "LAFD Station 27", type: "fire", phone: "(213) 485-6185", capacity: "24/7 Response" },
        { lat: 41.8781, lon: -87.6298, name: "Chicago Police District 1", type: "police", phone: "(312) 745-4290", capacity: "24/7 Patrol" },
        { lat: 29.7604, lon: -95.3698, name: "Houston Methodist Hospital", type: "hospital", phone: "(713) 790-3311", capacity: "907 beds" },
        { lat: 33.4484, lon: -112.0740, name: "Phoenix Fire Station 1", type: "fire", phone: "(602) 262-6011", capacity: "24/7 Response" },
        { lat: 39.9526, lon: -75.1652, name: "Philadelphia Fire Engine 11", type: "fire", phone: "(215) 686-1360", capacity: "24/7 Response" },
        { lat: 32.7767, lon: -96.7970, name: "Parkland Memorial Hospital", type: "hospital", phone: "(214) 590-8000", capacity: "862 beds" },
        { lat: 37.7749, lon: -122.4194, name: "UCSF Medical Center", type: "hospital", phone: "(415) 476-1000", capacity: "878 beds" },
        { lat: 25.7617, lon: -80.1918, name: "Miami-Dade Fire Station 2", type: "fire", phone: "(305) 468-5900", capacity: "24/7 Response" },
        { lat: 47.6062, lon: -122.3321, name: "Harborview Medical Center", type: "hospital", phone: "(206) 744-3000", capacity: "413 beds" }
    ],

    // Demo Food Points of Interest (grocery/stores)
    foodPOIs: [
        { name: 'Central Market', lat: 28.6139, lon: 77.2090, type: 'grocery' },
        { name: 'FreshFarm Grocers', lat: 28.6200, lon: 77.2100, type: 'grocery' },
        { name: 'Neighborhood Pantry', lat: 40.7128, lon: -74.0060, type: 'grocery' },
        { name: 'Riverside Organic', lat: 34.0522, lon: -118.2437, type: 'grocery' }
    ],

    // Demo population centers (for housing/transportation analyses)
    populationCenters: [
        { name: 'Downtown', lat: 28.6139, lon: 77.2090, population: 120000, households: 50000, growthRate: 0.03 },
        { name: 'Northside', lat: 28.6500, lon: 77.2000, population: 80000, households: 30000, growthRate: 0.02 },
        { name: 'Riverside', lat: 40.7128, lon: -74.0060, population: 150000, households: 70000, growthRate: 0.025 }
    ],

    // Demo transit stops
    transitStops: [
        { id: 'T1', lat: 28.6145, lon: 77.2080, name: 'Central Station' },
        { id: 'T2', lat: 28.6205, lon: 77.2120, name: 'East Terminal' },
        { id: 'T3', lat: 40.7135, lon: -74.0050, name: 'Riverside Hub' }
    ],

    // Demo housing listings (for affordable housing locator)
    housingListings: [
        { id: 'H1', lat: 28.6125, lon: 77.2085, rent: 500, beds: 1, address: '101 Market St' },
        { id: 'H2', lat: 28.6170, lon: 77.2150, rent: 900, beds: 2, address: '22 Garden Ave' },
        { id: 'H3', lat: 40.7130, lon: -74.0070, rent: 700, beds: 1, address: '9 River Rd' }
    ],

    // Demo vacant parcels (GeoJSON-like simplified)
    vacantParcels: [
        { id: 'V1', name: 'Parcel A', polygon: [[28.605,77.20],[28.607,77.205],[28.603,77.207]] },
    ],

    // Demo traffic pollution/traffic points
    trafficPoints: [
        { lat: 28.615, lon: 77.210, congestion: 0.7, pm25: 55 },
        { lat: 40.712, lon: -74.006, congestion: 0.4, pm25: 30 }
    ],

    // Air Quality Data (NASA OMI)
    airQualityData: [
        { lat: 28.6139, lon: 77.2090, aqi: 168, no2: 45.2, pm25: 89.3, status: 'Unhealthy' },
        { lat: 39.9042, lon: 116.4074, aqi: 178, no2: 52.1, pm25: 95.7, status: 'Unhealthy' },
        { lat: 19.0760, lon: 72.8777, aqi: 134, no2: 38.9, pm25: 67.2, status: 'Unhealthy for Sensitive' },
        { lat: 40.7128, lon: -74.0060, aqi: 78, no2: 28.4, pm25: 35.1, status: 'Moderate' },
        { lat: 51.5074, lon: -0.1278, aqi: 67, no2: 24.7, pm25: 28.9, status: 'Moderate' },
        { lat: 35.6762, lon: 139.6503, aqi: 92, no2: 31.2, pm25: 42.8, status: 'Moderate' },
        { lat: 34.0522, lon: -118.2437, aqi: 85, no2: 29.8, pm25: 38.4, status: 'Moderate' },
        { lat: 37.7749, lon: -122.4194, aqi: 72, no2: 26.1, pm25: 31.7, status: 'Moderate' }
    ],

    // Disaster Events (NASA GDACS)
    disasterEvents: [
        { lat: 35.6762, lon: 139.6503, type: 'Earthquake', magnitude: 6.2, alert: 'High', date: '2024-12-14' },
        { lat: 25.7617, lon: -80.1918, type: 'Hurricane', category: 3, alert: 'Extreme', date: '2024-12-13' },
        { lat: 39.9042, lon: 116.4074, type: 'Flood', level: 'Severe', alert: 'High', date: '2024-12-12' },
        { lat: -6.2088, lon: 106.8456, type: 'Volcanic Activity', vei: 3, alert: 'Medium', date: '2024-12-11' },
        { lat: 37.0902, lon: -95.7129, type: 'Tornado', ef: 3, alert: 'High', date: '2024-12-10' }
    ],

    // Climate Data (NASA GISS)
    climateData: {
        globalTemp: { value: 1.18, unit: '°C above 1951-1980 avg', trend: '+0.18°C/decade' },
        arcticIce: { value: 4.72, unit: 'million km²', trend: '-13.1%/decade' },
        precipitation: { value: 2.74, unit: 'mm/day global avg', trend: '+1.5%/decade' },
        humidity: { value: 62.8, unit: '% global avg', trend: '+0.4%/decade' }
    },

    // Satellite Imagery URLs (NASA GIBS)
    imageryUrls: {
        modis: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/{date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg',
        viirs: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_DayNightBand_ENCC/default/{date}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
        landsat: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/Landsat_WELD_CorrectedReflectance_TrueColor_Global_Annual/default/2021-01-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg'
    },

    // Earth Interior Data
    earthInterior: {
        layers: [
            { name: 'Crust', depth: 0, thickness: 35, color: '#8B4513', temperature: 15 },
            { name: 'Upper Mantle', depth: 35, thickness: 635, color: '#FF4500', temperature: 1300 },
            { name: 'Lower Mantle', depth: 670, thickness: 2220, color: '#DC143C', temperature: 2500 },
            { name: 'Outer Core', depth: 2890, thickness: 2270, color: '#FFD700', temperature: 4500 },
            { name: 'Inner Core', depth: 5160, thickness: 1220, color: '#FFA500', temperature: 6000 }
        ],
        seismicData: [
            { lat: 35.6762, lon: 139.6503, magnitude: 6.2, depth: 10, location: 'Japan' },
            { lat: -33.8688, lon: 151.2093, magnitude: 5.8, depth: 25, location: 'Australia' },
            { lat: 37.7749, lon: -122.4194, magnitude: 4.5, depth: 8, location: 'California' }
        ],
        magneticField: {
            strength: 25000,
            inclination: 65,
            declination: 12
        }
    }
};

// Export dataset for global access
window.NASA_DATASET = NASA_DATASET;

// Earth Interior Visualization Functions
window.getEarthInteriorData = function() {
    return NASA_DATASET.earthInterior;
};

window.calculateLayerRadius = function(layer) {
    const earthRadius = 6371;
    return (earthRadius - layer.depth) / earthRadius;
};