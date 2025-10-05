// Emergency Resources Map Integration
function addEmergencyResources(map) {
    const emergencyResources = [
        { lat: 40.7128, lng: -74.0060, name: "NewYork-Presbyterian Hospital", type: "hospital", phone: "(212) 746-5454", address: "525 E 68th St, New York, NY", description: "Level 1 Trauma Center with 24/7 emergency services", capacity: "2,600 beds", services: ["Emergency Care", "Trauma Surgery", "ICU", "Cardiology"] },
        { lat: 34.0522, lng: -118.2437, name: "LAFD Station 27", type: "fire", phone: "(213) 485-6185", address: "1327 N Cole Ave, Los Angeles, CA", description: "Fire suppression, rescue operations, and emergency medical services", capacity: "24/7 Response", services: ["Fire Suppression", "Rescue Operations", "Hazmat Response", "EMS"] },
        { lat: 41.8781, lng: -87.6298, name: "Chicago Police District 1", type: "police", phone: "(312) 745-4290", address: "1718 S State St, Chicago, IL", description: "Central police district covering downtown Chicago area", capacity: "24/7 Patrol", services: ["Emergency Response", "Crime Prevention", "Traffic Control", "Investigation"] },
        { lat: 29.7604, lng: -95.3698, name: "Houston Methodist Hospital", type: "hospital", phone: "(713) 790-3311", address: "6565 Fannin St, Houston, TX", description: "Leading academic medical center with comprehensive emergency care", capacity: "907 beds", services: ["Emergency Medicine", "Trauma Care", "Heart Center", "Cancer Center"] },
        { lat: 33.4484, lng: -112.0740, name: "Phoenix Fire Station 1", type: "fire", phone: "(602) 262-6011", address: "150 S 12th St, Phoenix, AZ", description: "Downtown fire station with advanced life support capabilities", capacity: "24/7 Response", services: ["Fire Suppression", "Emergency Medical", "Technical Rescue", "Wildfire Response"] },
        { lat: 39.9526, lng: -75.1652, name: "Philadelphia Fire Dept Engine 11", type: "fire", phone: "(215) 686-1360", address: "1150 Spring Garden St, Philadelphia, PA", description: "Historic fire station serving Center City Philadelphia", capacity: "24/7 Response", services: ["Fire Suppression", "EMS", "Rescue Operations", "Hazmat"] },
        { lat: 32.7767, lng: -96.7970, name: "Parkland Memorial Hospital", type: "hospital", phone: "(214) 590-8000", address: "5200 Harry Hines Blvd, Dallas, TX", description: "Level 1 Trauma Center and safety net hospital", capacity: "862 beds", services: ["Trauma Center", "Emergency Care", "Burn Center", "Psychiatric Emergency"] },
        { lat: 37.7749, lng: -122.4194, name: "UCSF Medical Center", type: "hospital", phone: "(415) 476-1000", address: "505 Parnassus Ave, San Francisco, CA", description: "Academic medical center with specialized emergency services", capacity: "878 beds", services: ["Emergency Medicine", "Trauma Care", "Pediatric Emergency", "Poison Control"] },
        { lat: 25.7617, lng: -80.1918, name: "Miami-Dade Fire Station 2", type: "fire", phone: "(305) 468-5900", address: "1103 NW 11th St, Miami, FL", description: "Urban fire station with marine rescue capabilities", capacity: "24/7 Response", services: ["Fire Suppression", "Water Rescue", "EMS", "Hurricane Response"] },
        { lat: 47.6062, lng: -122.3321, name: "Harborview Medical Center", type: "hospital", phone: "(206) 744-3000", address: "325 9th Ave, Seattle, WA", description: "Level 1 Trauma Center serving the Pacific Northwest", capacity: "413 beds", services: ["Trauma Surgery", "Emergency Medicine", "Burn Center", "Psychiatric Emergency"] }
    ];

    const icons = {
        hospital: '🏥',
        fire: '🚒',
        police: '👮',
        emergency: '🚨'
    };

    const colors = {
        hospital: '#dc3545',
        fire: '#fd7e14',
        police: '#0d6efd',
        emergency: '#6f42c1'
    };

    emergencyResources.forEach(resource => {
        const marker = L.marker([resource.lat, resource.lng], {
            icon: L.divIcon({
                html: `<div style="background: ${colors[resource.type]}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">${icons[resource.type]}</div>`,
                className: 'emergency-marker',
                iconSize: [30, 30]
            })
        }).addTo(map);

        marker.on('click', function() {
            const popup = L.popup({ maxWidth: 350 })
                .setLatLng([resource.lat, resource.lng])
                .setContent(`
                    <div style="min-width: 320px; font-family: Arial, sans-serif;">
                        <div style="text-align: center; background: ${colors[resource.type]}; color: white; padding: 10px; margin: -10px -10px 15px -10px; border-radius: 5px 5px 0 0;">
                            <h5 style="margin: 0; font-size: 16px;">${icons[resource.type]} ${resource.name}</h5>
                            <small>${resource.type.toUpperCase()} FACILITY</small>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <strong>📍 Address:</strong><br>
                            <span style="color: #666;">${resource.address}</span>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <strong>📞 Phone:</strong> <a href="tel:${resource.phone}" style="color: ${colors[resource.type]};">${resource.phone}</a>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <strong>ℹ️ Description:</strong><br>
                            <span style="color: #666; font-size: 13px;">${resource.description}</span>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <strong>🏥 Capacity:</strong> <span style="color: ${colors[resource.type]};">${resource.capacity}</span>
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <strong>🔧 Services:</strong><br>
                            <div style="margin-top: 5px;">
                                ${resource.services.map(service => `<span style="background: ${colors[resource.type]}20; color: ${colors[resource.type]}; padding: 2px 6px; border-radius: 3px; font-size: 11px; margin: 2px; display: inline-block;">${service}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div style="text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
                            <button onclick="pinLocation(${resource.lat}, ${resource.lng}, '${resource.name}')" 
                                    style="background: ${colors[resource.type]}; color: white; border: none; padding: 8px 15px; border-radius: 5px; margin-right: 5px; cursor: pointer;">
                                📍 Pin Location
                            </button>
                            <button onclick="getDirections(${resource.lat}, ${resource.lng})" 
                                    style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                                🗺️ Directions
                            </button>
                        </div>
                    </div>
                `)
                .openOn(map);
        });
    });
}

function pinLocation(lat, lng, name) {
    const pinnedMarker = L.marker([lat, lng], {
        icon: L.divIcon({
            html: '<div style="background: #ff0000; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">📍</div>',
            className: 'pinned-marker',
            iconSize: [20, 20]
        })
    });
    
    if (window.earthMap) {
        pinnedMarker.addTo(window.earthMap);
        
        const alert = document.createElement('div');
        alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; background: #dc3545; color: white; padding: 10px 15px; border-radius: 5px;';
        alert.innerHTML = `📍 Pinned: ${name}`;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
}

function getDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
    
    const alert = document.createElement('div');
    alert.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; background: #28a745; color: white; padding: 10px 15px; border-radius: 5px;';
    alert.innerHTML = '🗺️ Opening directions...';
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 2000);
}

// Auto-add emergency resources when map loads
document.addEventListener('DOMContentLoaded', function() {
    const checkMap = setInterval(() => {
        if (window.earthMap) {
            addEmergencyResources(window.earthMap);
            clearInterval(checkMap);
        }
    }, 1000);
});

window.pinLocation = pinLocation;
window.getDirections = getDirections;