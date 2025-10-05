// NASA Map Tiles Configuration
function initNASAMapTiles(map) {
    // Get current date for NASA imagery
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    
    // NASA GIBS (Global Imagery Browse Services) Tile Layers
    const nasaTileLayers = {
        // NASA Satellite Imagery
        nasaSatellite: L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${dateStr}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`, {
            attribution: '© NASA GIBS - MODIS Terra',
            maxZoom: 10
        }),
        
        // NASA Landsat
        nasaLandsat: L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/Landsat_WELD_CorrectedReflectance_TrueColor_Global_Annual/default/2021-01-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`, {
            attribution: '© NASA GIBS - Landsat',
            maxZoom: 12
        }),
        
        // NASA VIIRS Day/Night Band
        nasaVIIRS: L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_DayNightBand_ENCC/default/${dateStr}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png`, {
            attribution: '© NASA GIBS - VIIRS',
            maxZoom: 8
        }),
        
        // NASA Sea Surface Temperature
        nasaSST: L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_Sea_Surface_Temperature/default/${dateStr}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png`, {
            attribution: '© NASA GIBS - MODIS Aqua SST',
            maxZoom: 7
        }),
        
        // NASA Chlorophyll
        nasaChlorophyll: L.tileLayer(`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Aqua_Chlorophyll_A/default/${dateStr}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png`, {
            attribution: '© NASA GIBS - MODIS Aqua Chlorophyll',
            maxZoom: 7
        })
    };

    // Mapbox optional layers (require Mapbox access token). Provide token via window.MAPBOX_TOKEN or set in browser localStorage under 'MAPBOX_TOKEN'.
    const mapboxToken = (window.MAPBOX_TOKEN || (window.localStorage && window.localStorage.getItem && window.localStorage.getItem('MAPBOX_TOKEN')) || '').trim();
    let mapboxTileLayers = {};
    if (mapboxToken && mapboxToken !== 'YOUR_MAPBOX_TOKEN') {
        try {
            const mapboxStreets = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`, {
                attribution: '© Mapbox © OpenStreetMap',
                tileSize: 512,
                zoomOffset: -1,
                maxZoom: 18
            });

            const mapboxSatellite = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`, {
                attribution: '© Mapbox © NASA',
                tileSize: 512,
                zoomOffset: -1,
                maxZoom: 18
            });

            mapboxTileLayers = { mapboxStreets, mapboxSatellite };
        } catch (e) {
            console.warn('Mapbox layers could not be initialized', e);
        }
    }
    
    // Replace default base layers with NASA layers
    const baseLayers = {
        "🛰️ NASA MODIS Terra": nasaTileLayers.nasaSatellite,
        "🌍 NASA Landsat": nasaTileLayers.nasaLandsat,
        "🌙 NASA VIIRS Night": nasaTileLayers.nasaVIIRS,
        "🌊 NASA Sea Temperature": nasaTileLayers.nasaSST,
        "🌿 NASA Ocean Chlorophyll": nasaTileLayers.nasaChlorophyll
    };

    // If Mapbox layers are available, add them to baseLayers so user can switch
    if (mapboxTileLayers.mapboxStreets) baseLayers['🗺️ Mapbox Streets'] = mapboxTileLayers.mapboxStreets;
    if (mapboxTileLayers.mapboxSatellite) baseLayers['🛰️ Mapbox Satellite'] = mapboxTileLayers.mapboxSatellite;
    
    // Set NASA MODIS as default
    nasaTileLayers.nasaSatellite.addTo(map);
    
    console.debug('initNASAMapTiles: prepared base layers and overlay groups');

    // Create overlays: vegetation (NDVI), surface heat (heatmap), precipitation/water anomaly
    const overlays = {};

    // Vegetation overlay: circle markers colored by NDVI
    const vegGroup = L.layerGroup();
    function ndviColor(ndvi) {
        if (ndvi >= 0.75) return '#00441b';
        if (ndvi >= 0.6) return '#238b45';
        if (ndvi >= 0.45) return '#66c2a4';
        if (ndvi >= 0.3) return '#fee08b';
        return '#f46d43';
    }
    if (window.NASA_DATASET && Array.isArray(window.NASA_DATASET.vegetationData)) {
        window.NASA_DATASET.vegetationData.forEach(v => {
            try {
                const marker = L.circleMarker([v.lat, v.lon], {
                    radius: 8,
                    weight: 1,
                    color: '#00000022',
                    fillColor: ndviColor(v.ndvi),
                    fillOpacity: 0.85
                }).bindPopup(`<strong>${v.region}</strong><br>NDVI: ${v.ndvi}<br>Health: ${v.health}`);
                vegGroup.addLayer(marker);
            } catch (e) {
                console.warn('Veg marker error', e);
            }
        });
    }
    overlays['🌿 Vegetation (NDVI)'] = vegGroup;

    // Surface heat overlay: use fireData brightness as heatmap intensity
    let heatLayer = L.layerGroup();
    if (window.NASA_DATASET && Array.isArray(window.NASA_DATASET.fireData) && typeof L.heatLayer === 'function') {
        const heatPoints = window.NASA_DATASET.fireData.map(f => [f.lat, f.lon, (f.brightness || f.confidence || 1) / 400]);
        heatLayer = L.heatLayer(heatPoints, { radius: 25, blur: 18, maxZoom: 9 });
    } else {
        // Fallback: add small markers for fires if heat plugin missing
        const firesGroup = L.layerGroup();
        if (window.NASA_DATASET && Array.isArray(window.NASA_DATASET.fireData)) {
            window.NASA_DATASET.fireData.forEach(f => {
                L.circle([f.lat, f.lon], { radius: 5000, color: '#ff4500', fillOpacity: 0.3 }).bindPopup(`Fire confidence: ${f.confidence}<br>Brightness: ${f.brightness}`).addTo(firesGroup);
            });
        }
        heatLayer = firesGroup;
    }
    overlays['🔥 Surface Heat (Fires)'] = heatLayer;

    // Precipitation / Water anomaly overlay (simulated using GRACE waterData anomalies)
    const precipGroup = L.layerGroup();
    if (window.NASA_DATASET && Array.isArray(window.NASA_DATASET.waterData)) {
        window.NASA_DATASET.waterData.forEach(w => {
            const a = Number(w.anomaly || 0);
            // color: blue for positive (wet), brown for large negative (dry)
            const color = a >= 0 ? '#1E90FF' : (a < -25 ? '#8B4513' : '#F59E0B');
            const radius = Math.min(Math.max(Math.abs(a) * 300, 30000), 250000);
            L.circle([w.lat, w.lon], { radius, color, weight: 1, fillColor: color, fillOpacity: 0.25 })
                .bindPopup(`<strong>${w.region}</strong><br>Water anomaly: ${w.anomaly} mm<br>Trend: ${w.trend}`)
                .addTo(precipGroup);
        });
    }
    overlays['☔ Water Anomaly / Precipitation (sim)'] = precipGroup;

    // Add overlays to map by default so users see them immediately
    try {
        if (vegGroup && typeof vegGroup.addTo === 'function') { vegGroup.addTo(map); console.debug('Vegetation overlay added to map'); }
    } catch (e) { console.warn('Failed to add vegetation overlay by default', e); }
    try {
        if (heatLayer && typeof heatLayer.addTo === 'function') { heatLayer.addTo(map); console.debug('Heat overlay added to map'); }
    } catch (e) { console.warn('Failed to add heat overlay by default', e); }
    try {
        if (precipGroup && typeof precipGroup.addTo === 'function') { precipGroup.addTo(map); console.debug('Precipitation overlay added to map'); }
    } catch (e) { console.warn('Failed to add precipitation overlay by default', e); }

    // Update layer control (create after overlays are already added so control shows them checked)
    if (map.layerControl) {
        map.removeControl(map.layerControl);
    }
    map.layerControl = L.control.layers(baseLayers, overlays, {
        position: 'topright',
        collapsed: false
    }).addTo(map);

    // Add a simple legend control for overlays
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.background = 'rgba(0,0,0,0.5)';
        div.style.color = 'white';
        div.style.padding = '8px';
        div.style.borderRadius = '8px';
        div.innerHTML = `<strong>Overlays</strong><br>🌿 Vegetation (NDVI)<br>🔥 Surface Heat (Fires)<br>☔ Water Anomaly`;
        return div;
    };
    legend.addTo(map);
    
    return nasaTileLayers;
}

// Initialize NASA tiles when map is ready
document.addEventListener('DOMContentLoaded', function() {
    const checkMap = setInterval(() => {
        if (window.earthMap) {
            initNASAMapTiles(window.earthMap);
            clearInterval(checkMap);
        }
    }, 1000);
});

window.initNASAMapTiles = initNASAMapTiles;