// Dynamic Interactive Attack Game System
let earthScene, earthCamera, earthRenderer, earthGlobe, earthControls;
let currentEarthView = 'surface';
let gameMode = false;
let lifeExpectancy = 75;
let attackEffects = [];
let particles = [];
let meteors = [];
let lasers = [];
let selectedAttack = null;
let earthHealth = 100;
let gameStats = { meteorsLaunched: 0, lasersShot: 0, nukesDetonated: 0 };

function generate3DEarthModule() {
    return `
        <div class="row mb-4">
            <div class="col-12">
                <h3 class="text-center" style="color: var(--nasa-blue); font-family: 'Orbitron', monospace;">
                    <i class="fas fa-globe me-2"></i>GOOGLE EARTH 3D VIEW
                </h3>
                <p class="text-center" style="opacity: 0.9;">Interactive Google Earth with real-time NASA satellite data visualization</p>
            </div>
        </div>
        
        <div class="row mb-3">
            <div class="col-12">
                <div class="d-flex justify-content-center gap-2 mb-2">
                    <button class="btn earth-view-btn active" onclick="switchEarthView('satellite')" style="background: var(--earth-green); color: white;">
                        <i class="fas fa-satellite me-1"></i>Satellite View
                    </button>
                    <button class="btn earth-view-btn" onclick="switchEarthView('terrain')" style="background: var(--nasa-red); color: white; opacity: 0.7;">
                        <i class="fas fa-mountain me-1"></i>Terrain View
                    </button>
                    <button class="btn earth-view-btn" onclick="switchEarthView('hybrid')" style="background: var(--cosmic-purple); color: white; opacity: 0.7;">
                        <i class="fas fa-layer-group me-1"></i>Hybrid View
                    </button>
                </div>
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn" onclick="toggleGameMode()" style="background: #FF6B35; color: white;">
                        <i class="fas fa-gamepad me-1"></i><span id="gameModeBtn">Battle Mode</span>
                    </button>
                    <button class="btn attack-btn" onclick="selectAttack('meteor')" style="background: #8B4513; color: white;" id="meteorBtn" disabled>
                        <i class="fas fa-meteor me-1"></i>Meteor Storm
                    </button>
                    <button class="btn attack-btn" onclick="selectAttack('laser')" style="background: #DC143C; color: white;" id="laserBtn" disabled>
                        <i class="fas fa-bolt me-1"></i>Death Ray
                    </button>
                    <button class="btn attack-btn" onclick="selectAttack('nuclear')" style="background: #FF4500; color: white;" id="nuclearBtn" disabled>
                        <i class="fas fa-radiation me-1"></i>Nuclear Strike
                    </button>
                    <button class="btn" onclick="randomChaos()" style="background: #8A2BE2; color: white;" id="chaosBtn" disabled>
                        <i class="fas fa-skull me-1"></i>Chaos Mode
                    </button>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-12">
                <div id="earth3d-container" style="height: 500px; border-radius: 15px; position: relative; overflow: hidden;">
                    <!-- 3D Earth will be rendered here -->
                </div>
                <div id="gameHUD" style="display: none; background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(139,0,0,0.8)); color: white; padding: 15px; border-radius: 15px; margin-top: 10px; font-family: 'Orbitron', monospace; border: 2px solid #FF0000;">
                    <div class="row text-center">
                        <div class="col-3">
                            <div style="color: #FF6B35; font-size: 0.9rem;">🌍 EARTH HEALTH</div>
                            <div id="earthHealthBar" style="background: #333; height: 20px; border-radius: 10px; overflow: hidden; margin: 5px 0;">
                                <div id="healthFill" style="background: linear-gradient(90deg, #00FF00, #FFFF00, #FF0000); height: 100%; width: 100%; transition: width 0.5s;"></div>
                            </div>
                            <div id="healthValue" style="color: #00FF00; font-weight: bold;">100%</div>
                        </div>
                        <div class="col-3">
                            <div style="color: #FFD700;">⚡ SELECTED</div>
                            <div id="selectedWeapon" style="color: #FFD700; font-weight: bold; font-size: 1.1rem;">None</div>
                            <div style="font-size: 0.8rem; opacity: 0.8;">Click to Attack</div>
                        </div>
                        <div class="col-3">
                            <div style="color: #FF4500;">💀 CASUALTIES</div>
                            <div id="casualtyCount" style="color: #FF4500; font-weight: bold; font-size: 1.1rem;">0</div>
                            <div style="font-size: 0.8rem; opacity: 0.8;">Million Lives</div>
                        </div>
                        <div class="col-3">
                            <div style="color: #8A2BE2;">🎯 SCORE</div>
                            <div id="gameScore" style="color: #8A2BE2; font-weight: bold; font-size: 1.1rem;">0</div>
                            <div style="font-size: 0.8rem; opacity: 0.8;">Destruction Points</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-3">
                <div class="text-center p-3" style="background: rgba(239, 68, 68, 0.2); border-radius: 10px;">
                    <h6 style="color: var(--nasa-red);">🔥 Active Fires</h6>
                    <div class="metric-value" style="color: var(--nasa-red);">${NASA_DATASET.fireData.length}</div>
                    <small>FIRMS Detection</small>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center p-3" style="background: rgba(16, 185, 129, 0.2); border-radius: 10px;">
                    <h6 style="color: var(--earth-green);">🌿 Vegetation</h6>
                    <div class="metric-value" style="color: var(--earth-green);">${NASA_DATASET.vegetationData.length}</div>
                    <small>MODIS NDVI</small>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center p-3" style="background: rgba(59, 130, 246, 0.2); border-radius: 10px;">
                    <h6 style="color: #3B82F6;">💧 Water Data</h6>
                    <div class="metric-value" style="color: #3B82F6;">${NASA_DATASET.waterData.length}</div>
                    <small>GRACE Monitoring</small>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center p-3" style="background: rgba(245, 158, 11, 0.2); border-radius: 10px;">
                    <h6 style="color: var(--solar-orange);">🌋 Seismic</h6>
                    <div class="metric-value" style="color: var(--solar-orange);">${NASA_DATASET.earthInterior.seismicData.length}</div>
                    <small>Active Events</small>
                </div>
            </div>
        </div>
        
        <div id="earth-interior-info" class="row mt-3" style="display: none;">
            <div class="col-12">
                <div style="background: rgba(11, 61, 145, 0.2); border: 2px solid var(--nasa-blue); border-radius: 15px; padding: 20px;">
                    <h5 style="color: var(--nasa-blue); margin-bottom: 15px;">
                        <i class="fas fa-info-circle me-2"></i>Earth Interior Layers
                    </h5>
                    <div class="row g-2">
                        ${NASA_DATASET.earthInterior.layers.map(layer => `
                            <div class="col-md-2">
                                <div class="text-center p-2" style="background: ${layer.color}20; border: 1px solid ${layer.color}; border-radius: 8px;">
                                    <div style="color: ${layer.color}; font-weight: bold; font-size: 0.9rem;">${layer.name}</div>
                                    <div style="font-size: 0.8rem; opacity: 0.8;">${layer.depth}km deep</div>
                                    <div style="font-size: 0.8rem; opacity: 0.8;">${layer.temperature}°C</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function init3DEarth() {
    const container = document.getElementById('earth3d-container');
    if (!container) return;
    
    // Initialize Three.js scene
    earthScene = new THREE.Scene();
    earthCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    earthRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    earthRenderer.setSize(container.offsetWidth, container.offsetHeight);
    earthRenderer.setClearColor(0x000011, 1);
    container.innerHTML = '';
    container.appendChild(earthRenderer.domElement);
    
    // Create Earth
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-day.jpg');
    const material = new THREE.MeshPhongMaterial({ map: earthTexture });
    earthGlobe = new THREE.Mesh(geometry, material);
    earthScene.add(earthGlobe);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    earthScene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 5, 5);
    earthScene.add(directionalLight);
    
    // Add controls
    earthCamera.position.z = 12;
    earthControls = new THREE.OrbitControls(earthCamera, earthRenderer.domElement);
    earthControls.enableDamping = true;
    earthControls.minDistance = 6;
    earthControls.maxDistance = 50;
    earthControls.autoRotate = true;
    earthControls.autoRotateSpeed = 0.5;
    
    // Add NASA data points
    addNASADataPoints();
    
    // Add compass
    addCompass(container);
    
    // Add click handler for attacks
    earthRenderer.domElement.addEventListener('click', onEarthClick);
    
    animate();
}

function addNASADataPoints() {
    // Add fire data points
    NASA_DATASET.fireData.forEach(fire => {
        const point = createDataPoint(fire.lat, fire.lon, 0xff4500, 0.1);
        earthScene.add(point);
    });
    
    // Add vegetation data points
    NASA_DATASET.vegetationData.forEach(veg => {
        const color = veg.ndvi > 0.6 ? 0x00ff00 : 0xffff00;
        const point = createDataPoint(veg.lat, veg.lon, color, 0.08);
        earthScene.add(point);
    });
}

function createDataPoint(lat, lon, color, size) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(5.1 * Math.sin(phi) * Math.cos(theta));
    const z = (5.1 * Math.sin(phi) * Math.sin(theta));
    const y = (5.1 * Math.cos(phi));
    
    const geometry = new THREE.SphereGeometry(size, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const point = new THREE.Mesh(geometry, material);
    point.position.set(x, y, z);
    
    return point;
}

function addCompass(container) {
    const compass = document.createElement('div');
    compass.id = 'earth-compass';
    compass.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, rgba(11, 61, 145, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%);
        border: 3px solid #FC3D21;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Orbitron', monospace;
        color: white;
        z-index: 1000;
        box-shadow: 0 0 20px rgba(252, 61, 33, 0.5);
    `;
    
    compass.innerHTML = `
        <div style="position: relative; width: 60px; height: 60px;">
            <div style="position: absolute; top: 2px; left: 50%; transform: translateX(-50%); font-size: 12px; font-weight: bold; color: #FC3D21;">N</div>
            <div style="position: absolute; right: 2px; top: 50%; transform: translateY(-50%); font-size: 10px;">E</div>
            <div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); font-size: 10px;">S</div>
            <div style="position: absolute; left: 2px; top: 50%; transform: translateY(-50%); font-size: 10px;">W</div>
            <div id="compass-needle" style="position: absolute; top: 50%; left: 50%; width: 2px; height: 25px; background: linear-gradient(to top, #FC3D21, #FFD700); transform-origin: bottom center; transform: translate(-50%, -100%) rotate(0deg); border-radius: 1px;"></div>
            <div style="position: absolute; top: 50%; left: 50%; width: 6px; height: 6px; background: #FC3D21; border-radius: 50%; transform: translate(-50%, -50%);"></div>
        </div>
    `;
    
    container.appendChild(compass);
}

function updateCompass() {
    const needle = document.getElementById('compass-needle');
    if (needle && earthControls) {
        const azimuth = Math.atan2(earthControls.object.position.x, earthControls.object.position.z);
        const degrees = (azimuth * 180 / Math.PI + 360) % 360;
        needle.style.transform = `translate(-50%, -100%) rotate(${degrees}deg)`;
    }
}

function onEarthClick(event) {
    if (!gameMode || !selectedAttack) return;
    
    const rect = earthRenderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, earthCamera);
    const intersects = raycaster.intersectObject(earthGlobe);
    
    if (intersects.length > 0) {
        const point = intersects[0].point;
        executeAttack(selectedAttack, point);
    }
}

function toggleGameMode() {
    gameMode = !gameMode;
    const btn = document.getElementById('gameModeBtn');
    const hud = document.getElementById('gameHUD');
    const attackBtns = ['meteorBtn', 'laserBtn', 'nuclearBtn', 'chaosBtn'];
    
    if (gameMode) {
        btn.textContent = 'Exit Battle';
        btn.parentElement.style.background = '#DC143C';
        hud.style.display = 'block';
        attackBtns.forEach(id => document.getElementById(id).disabled = false);
        earthRenderer.domElement.style.cursor = 'crosshair';
        startAmbientEffects();
    } else {
        btn.textContent = 'Battle Mode';
        btn.parentElement.style.background = '#FF6B35';
        hud.style.display = 'none';
        attackBtns.forEach(id => document.getElementById(id).disabled = true);
        earthRenderer.domElement.style.cursor = 'grab';
        selectedAttack = null;
        updateSelectedWeapon();
        stopAmbientEffects();
    }
}

function selectAttack(type) {
    selectedAttack = type;
    document.querySelectorAll('.attack-btn').forEach(btn => btn.style.boxShadow = 'none');
    document.getElementById(type + 'Btn').style.boxShadow = '0 0 20px #FFD700';
    updateSelectedWeapon();
}

function updateSelectedWeapon() {
    const weaponNames = { meteor: '🌠 METEOR STORM', laser: '⚡ DEATH RAY', nuclear: '☢️ NUCLEAR STRIKE' };
    document.getElementById('selectedWeapon').textContent = selectedAttack ? weaponNames[selectedAttack] : 'None';
}

function executeAttack(type, target) {
    const attacks = {
        meteor: { damage: 20, casualties: 5, score: 100 },
        laser: { damage: 35, casualties: 12, score: 250 },
        nuclear: { damage: 60, casualties: 25, score: 500 }
    };
    
    const attack = attacks[type];
    
    if (type === 'meteor') {
        launchMeteor(target, attack);
        gameStats.meteorsLaunched++;
    } else if (type === 'laser') {
        fireLaser(target, attack);
        gameStats.lasersShot++;
    } else if (type === 'nuclear') {
        detonateNuke(target, attack);
        gameStats.nukesDetonated++;
    }
    
    updateGameStats(attack);
}

function launchMeteor(target, attack) {
    const startPos = new THREE.Vector3(
        target.x + Math.random() * 20 - 10,
        target.y + 30,
        target.z + Math.random() * 20 - 10
    );
    
    const meteorGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const meteorMaterial = new THREE.MeshBasicMaterial({ color: 0xFF4500, emissive: 0xFF2200 });
    const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
    meteor.position.copy(startPos);
    
    // Add fire trail
    const trailGeometry = new THREE.ConeGeometry(0.1, 2, 8);
    const trailMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6600, transparent: true, opacity: 0.7 });
    const trail = new THREE.Mesh(trailGeometry, trailMaterial);
    meteor.add(trail);
    
    earthScene.add(meteor);
    meteors.push({ mesh: meteor, target: target, speed: 0.5, attack: attack });
}

function fireLaser(target, attack) {
    const laserGeometry = new THREE.CylinderGeometry(0.05, 0.05, 50, 8);
    const laserMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, emissive: 0xFF0000 });
    const laser = new THREE.Mesh(laserGeometry, laserMaterial);
    
    const direction = target.clone().normalize();
    laser.position.copy(direction.clone().multiplyScalar(30));
    laser.lookAt(target);
    
    earthScene.add(laser);
    lasers.push({ mesh: laser, target: target, life: 60, attack: attack });
    
    // Immediate impact
    setTimeout(() => createExplosion(target, attack, 0xFF0000), 100);
}

function detonateNuke(target, attack) {
    // Create mushroom cloud effect
    createNuclearExplosion(target, attack);
    
    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: white; z-index: 9999; pointer-events: none;
        opacity: 0.8; animation: flash 0.5s ease-out;
    `;
    document.body.appendChild(flash);
    setTimeout(() => document.body.removeChild(flash), 500);
    
    // Add CSS animation
    if (!document.getElementById('flashAnimation')) {
        const style = document.createElement('style');
        style.id = 'flashAnimation';
        style.textContent = '@keyframes flash { 0% { opacity: 0.8; } 100% { opacity: 0; } }';
        document.head.appendChild(style);
    }
}

function createExplosion(position, attack, color) {
    // Main explosion
    const explosionGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const explosionMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true });
    const explosion = new THREE.Mesh(explosionGeometry, explosionMaterial);
    explosion.position.copy(position);
    earthScene.add(explosion);
    
    // Particle explosion
    for (let i = 0; i < 50; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.02, 4, 4);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: color });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.copy(position);
        
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(Math.random() * 2 + 1);
        
        earthScene.add(particle);
        particles.push({ mesh: particle, velocity: velocity, life: 120 });
    }
    
    // Animate main explosion
    let scale = 0;
    const animateExplosion = () => {
        scale += 0.2;
        explosion.scale.setScalar(scale);
        explosion.material.opacity = Math.max(0, 1 - scale / 5);
        
        if (scale < 5) {
            requestAnimationFrame(animateExplosion);
        } else {
            earthScene.remove(explosion);
        }
    };
    animateExplosion();
    
    // Create crater
    const craterGeometry = new THREE.RingGeometry(0.2, 0.4, 16);
    const craterMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });
    const crater = new THREE.Mesh(craterGeometry, craterMaterial);
    crater.position.copy(position);
    crater.lookAt(new THREE.Vector3(0, 0, 0));
    earthScene.add(crater);
    attackEffects.push(crater);
}

function createNuclearExplosion(position, attack) {
    // Multiple explosion rings
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createExplosion(position, attack, i === 0 ? 0xFFFFFF : i === 1 ? 0xFFFF00 : 0xFF4500);
        }, i * 200);
    }
    
    // Mushroom cloud
    const cloudGeometry = new THREE.SphereGeometry(1, 16, 16);
    const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.6 });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.position.copy(position);
    cloud.position.add(new THREE.Vector3(0, 2, 0));
    earthScene.add(cloud);
    
    // Animate mushroom cloud
    let cloudScale = 0;
    const animateCloud = () => {
        cloudScale += 0.05;
        cloud.scale.setScalar(cloudScale);
        cloud.material.opacity = Math.max(0, 0.6 - cloudScale / 10);
        
        if (cloudScale < 8) {
            requestAnimationFrame(animateCloud);
        } else {
            earthScene.remove(cloud);
        }
    };
    setTimeout(animateCloud, 500);
}

function updateGameStats(attack) {
    earthHealth = Math.max(0, earthHealth - attack.damage);
    const casualties = parseInt(document.getElementById('casualtyCount').textContent) + attack.casualties;
    const score = parseInt(document.getElementById('gameScore').textContent) + attack.score;
    
    // Update health bar
    const healthFill = document.getElementById('healthFill');
    const healthValue = document.getElementById('healthValue');
    healthFill.style.width = earthHealth + '%';
    healthValue.textContent = earthHealth + '%';
    healthValue.style.color = earthHealth > 60 ? '#00FF00' : earthHealth > 30 ? '#FFFF00' : '#FF0000';
    
    // Update casualties and score
    document.getElementById('casualtyCount').textContent = casualties;
    document.getElementById('gameScore').textContent = score;
    
    // Check game over
    if (earthHealth <= 0) {
        setTimeout(() => {
            alert('🌍 EARTH DESTROYED! Final Score: ' + score + ' points');
            resetGame();
        }, 1000);
    }
}

function randomChaos() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const randomPos = new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ).normalize().multiplyScalar(5);
            
            const attacks = ['meteor', 'laser', 'nuclear'];
            const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
            executeAttack(randomAttack, randomPos);
        }, i * 500);
    }
}

function startAmbientEffects() {
    // Add floating particles around Earth
    for (let i = 0; i < 20; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.01, 4, 4);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        const radius = 8 + Math.random() * 5;
        particle.position.set(
            Math.cos(i * 0.3) * radius,
            Math.sin(i * 0.2) * radius,
            Math.sin(i * 0.3) * radius
        );
        
        earthScene.add(particle);
        particles.push({ mesh: particle, velocity: new THREE.Vector3(0, 0, 0), life: -1, ambient: true });
    }
}

function stopAmbientEffects() {
    particles = particles.filter(p => {
        if (p.ambient) {
            earthScene.remove(p.mesh);
            return false;
        }
        return true;
    });
}

function resetGame() {
    earthHealth = 100;
    gameStats = { meteorsLaunched: 0, lasersShot: 0, nukesDetonated: 0 };
    
    // Clear all effects
    attackEffects.forEach(effect => earthScene.remove(effect));
    particles.forEach(p => earthScene.remove(p.mesh));
    meteors.forEach(m => earthScene.remove(m.mesh));
    lasers.forEach(l => earthScene.remove(l.mesh));
    
    attackEffects = [];
    particles = [];
    meteors = [];
    lasers = [];
    
    // Reset UI
    document.getElementById('casualtyCount').textContent = '0';
    document.getElementById('gameScore').textContent = '0';
    updateGameStats({ damage: 0, casualties: 0, score: 0 });
}

function animate() {
    requestAnimationFrame(animate);
    if (earthGlobe) earthGlobe.rotation.y += 0.005;
    if (earthControls) earthControls.update();
    updateCompass();
    
    // Update meteors
    meteors = meteors.filter(meteor => {
        const direction = meteor.target.clone().sub(meteor.mesh.position).normalize();
        meteor.mesh.position.add(direction.multiplyScalar(meteor.speed));
        
        if (meteor.mesh.position.distanceTo(meteor.target) < 0.5) {
            earthScene.remove(meteor.mesh);
            createExplosion(meteor.target, meteor.attack, 0xFF4500);
            return false;
        }
        return true;
    });
    
    // Update lasers
    lasers = lasers.filter(laser => {
        laser.life--;
        laser.mesh.material.opacity = laser.life / 60;
        if (laser.life <= 0) {
            earthScene.remove(laser.mesh);
            return false;
        }
        return true;
    });
    
    // Update particles
    particles = particles.filter(particle => {
        if (particle.life === -1) {
            // Ambient particles
            particle.mesh.rotation.x += 0.01;
            particle.mesh.rotation.y += 0.01;
            return true;
        }
        
        particle.mesh.position.add(particle.velocity);
        particle.velocity.multiplyScalar(0.98);
        particle.life--;
        
        if (particle.life <= 0) {
            earthScene.remove(particle.mesh);
            return false;
        }
        return true;
    });
    
    if (earthRenderer) earthRenderer.render(earthScene, earthCamera);
}

function updateEarthTexture(viewType) {
    const textureLoader = new THREE.TextureLoader();
    let textureUrl;
    
    switch(viewType) {
        case 'satellite':
            textureUrl = 'https://unpkg.com/three-globe/example/img/earth-day.jpg';
            break;
        case 'terrain':
            textureUrl = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
            break;
        case 'hybrid':
            textureUrl = 'https://unpkg.com/three-globe/example/img/earth-night.jpg';
            break;
    }
    
    const texture = textureLoader.load(textureUrl);
    earthGlobe.material.map = texture;
    earthGlobe.material.needsUpdate = true;
}





















window.switchEarthView = function(viewType) {
    currentEarthView = viewType;
    
    document.querySelectorAll('.earth-view-btn').forEach(btn => {
        btn.style.opacity = '0.7';
        btn.classList.remove('active');
    });
    
    document.querySelector(`[onclick="switchEarthView('${viewType}')"]`).style.opacity = '1';
    document.querySelector(`[onclick="switchEarthView('${viewType}')"]`).classList.add('active');
    
    updateEarthTexture(viewType);
};

window.generate3DEarthModule = generate3DEarthModule;
window.init3DEarth = init3DEarth;