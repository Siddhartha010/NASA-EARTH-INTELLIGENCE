import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List
import requests

class WaterQualityService:
    def __init__(self):
        self.modis_url = "https://modis.gsfc.nasa.gov/data"
        self.landsat_url = "https://landsat.gsfc.nasa.gov/data"
    
    async def get_water_quality(self, lat: float, lon: float) -> Dict:
        """Get water quality data from satellite imagery"""
        # Simulate water quality parameters
        turbidity = np.random.uniform(1, 50)  # NTU
        chlorophyll_a = np.random.uniform(0.5, 25)  # mg/m³
        suspended_sediments = np.random.uniform(5, 100)  # mg/L
        
        quality_index = self._calculate_water_quality_index(turbidity, chlorophyll_a, suspended_sediments)
        
        return {
            "location": {"lat": lat, "lon": lon},
            "timestamp": datetime.now().isoformat(),
            "parameters": {
                "turbidity_ntu": turbidity,
                "chlorophyll_a_mg_m3": chlorophyll_a,
                "suspended_sediments_mg_l": suspended_sediments,
                "temperature_celsius": np.random.uniform(15, 30),
                "ph": np.random.uniform(6.5, 8.5),
                "dissolved_oxygen_mg_l": np.random.uniform(4, 12)
            },
            "quality_index": quality_index,
            "pollution_sources": self._identify_pollution_sources(lat, lon),
            "health_assessment": self._assess_water_health(quality_index)
        }
    
    def _calculate_water_quality_index(self, turbidity: float, chlorophyll: float, sediments: float) -> Dict:
        """Calculate water quality index"""
        # Simplified WQI calculation
        turbidity_score = max(0, 100 - turbidity * 2)
        chlorophyll_score = max(0, 100 - chlorophyll * 3)
        sediment_score = max(0, 100 - sediments)
        
        overall_score = (turbidity_score + chlorophyll_score + sediment_score) / 3
        
        if overall_score > 80:
            category = "Excellent"
        elif overall_score > 60:
            category = "Good"
        elif overall_score > 40:
            category = "Fair"
        else:
            category = "Poor"
        
        return {"score": overall_score, "category": category}
    
    def _identify_pollution_sources(self, lat: float, lon: float) -> List[Dict]:
        """Identify potential pollution sources"""
        sources = []
        if np.random.random() > 0.6:
            sources.append({
                "type": "industrial_discharge",
                "distance_km": np.random.uniform(0.5, 5.0),
                "severity": np.random.choice(["low", "medium", "high"])
            })
        if np.random.random() > 0.7:
            sources.append({
                "type": "agricultural_runoff",
                "distance_km": np.random.uniform(1.0, 10.0),
                "severity": np.random.choice(["low", "medium", "high"])
            })
        return sources
    
    def _assess_water_health(self, quality_index: Dict) -> Dict:
        """Assess water health impact"""
        score = quality_index["score"]
        
        if score > 80:
            risk_level = "low"
            recommendations = ["Safe for recreational activities", "Suitable for aquatic life"]
        elif score > 60:
            risk_level = "moderate"
            recommendations = ["Monitor for algal blooms", "Limit water contact activities"]
        else:
            risk_level = "high"
            recommendations = ["Avoid water contact", "Implement pollution control measures"]
        
        return {
            "risk_level": risk_level,
            "recommendations": recommendations,
            "aquatic_life_impact": "minimal" if score > 70 else "moderate" if score > 40 else "severe"
        }
    
    async def monitor_water_bodies(self, city: str) -> Dict:
        """Monitor water bodies in city"""
        water_bodies = []
        
        # Simulate different water bodies
        body_types = ["river", "lake", "reservoir", "pond"]
        for i in range(np.random.randint(3, 8)):
            body_type = np.random.choice(body_types)
            quality_score = np.random.uniform(30, 95)
            
            water_bodies.append({
                "name": f"{city} {body_type.title()} {i+1}",
                "type": body_type,
                "lat": 28.6 + np.random.uniform(-0.1, 0.1),
                "lon": 77.2 + np.random.uniform(-0.1, 0.1),
                "area_hectares": np.random.uniform(1, 100),
                "quality_score": quality_score,
                "pollution_level": "low" if quality_score > 70 else "moderate" if quality_score > 40 else "high",
                "last_monitored": datetime.now().isoformat()
            })
        
        return {
            "city": city,
            "water_bodies": water_bodies,
            "overall_water_health": np.mean([wb["quality_score"] for wb in water_bodies]),
            "critical_areas": [wb for wb in water_bodies if wb["quality_score"] < 50]
        }

class WaterAvailabilityService:
    def __init__(self):
        self.grace_url = "https://grace.jpl.nasa.gov/data"
        self.gpm_url = "https://gpm.nasa.gov/data"
    
    async def get_water_availability(self, lat: float, lon: float) -> Dict:
        """Get water availability using GRACE and other NASA data"""
        # Simulate GRACE groundwater data
        groundwater_anomaly = np.random.uniform(-50, 50)  # mm
        soil_moisture = np.random.uniform(0.1, 0.4)  # m³/m³
        precipitation = np.random.uniform(0, 150)  # mm/month
        
        availability_status = self._assess_availability_status(groundwater_anomaly, soil_moisture, precipitation)
        
        return {
            "location": {"lat": lat, "lon": lon},
            "timestamp": datetime.now().isoformat(),
            "groundwater_anomaly_mm": groundwater_anomaly,
            "soil_moisture_fraction": soil_moisture,
            "monthly_precipitation_mm": precipitation,
            "availability_status": availability_status,
            "water_stress_level": self._calculate_water_stress(groundwater_anomaly, precipitation),
            "seasonal_forecast": self._generate_seasonal_forecast(lat, lon)
        }
    
    def _assess_availability_status(self, groundwater: float, soil_moisture: float, precipitation: float) -> str:
        """Assess water availability status"""
        if groundwater > 20 and soil_moisture > 0.3 and precipitation > 100:
            return "abundant"
        elif groundwater > 0 and soil_moisture > 0.2 and precipitation > 50:
            return "adequate"
        elif groundwater > -20 and soil_moisture > 0.15:
            return "stressed"
        else:
            return "critical"
    
    def _calculate_water_stress(self, groundwater: float, precipitation: float) -> Dict:
        """Calculate water stress level"""
        stress_score = max(0, 50 - groundwater - precipitation/10)
        
        if stress_score < 20:
            level = "low"
        elif stress_score < 40:
            level = "moderate"
        else:
            level = "high"
        
        return {"score": stress_score, "level": level}
    
    def _generate_seasonal_forecast(self, lat: float, lon: float) -> Dict:
        """Generate seasonal water availability forecast"""
        months = []
        for i in range(6):
            date = datetime.now() + timedelta(days=30*i)
            availability = np.random.uniform(0.3, 1.0)
            months.append({
                "month": date.strftime("%Y-%m"),
                "availability_index": availability,
                "precipitation_forecast_mm": np.random.uniform(20, 200)
            })
        
        return {"forecast": months}
    
    async def assess_drought_risk(self, region: str) -> Dict:
        """Assess drought risk for region"""
        # Simulate drought risk assessment
        risk_factors = {
            "precipitation_deficit": np.random.uniform(0, 60),  # %
            "groundwater_depletion": np.random.uniform(0, 40),  # mm
            "soil_moisture_deficit": np.random.uniform(0, 50),  # %
            "temperature_anomaly": np.random.uniform(-2, 5)  # °C
        }
        
        overall_risk = self._calculate_drought_risk(risk_factors)
        
        return {
            "region": region,
            "risk_factors": risk_factors,
            "overall_risk": overall_risk,
            "affected_areas": self._identify_affected_areas(region),
            "mitigation_strategies": self._suggest_mitigation_strategies(overall_risk["level"])
        }
    
    def _calculate_drought_risk(self, factors: Dict) -> Dict:
        """Calculate overall drought risk"""
        risk_score = (
            factors["precipitation_deficit"] * 0.3 +
            factors["groundwater_depletion"] * 0.25 +
            factors["soil_moisture_deficit"] * 0.25 +
            max(0, factors["temperature_anomaly"]) * 5 * 0.2
        )
        
        if risk_score < 20:
            level = "low"
        elif risk_score < 40:
            level = "moderate"
        elif risk_score < 60:
            level = "high"
        else:
            level = "extreme"
        
        return {"score": risk_score, "level": level}
    
    def _identify_affected_areas(self, region: str) -> List[Dict]:
        """Identify drought-affected areas"""
        areas = []
        for i in range(np.random.randint(2, 6)):
            areas.append({
                "area_name": f"{region} District {i+1}",
                "lat": 28.6 + np.random.uniform(-0.2, 0.2),
                "lon": 77.2 + np.random.uniform(-0.2, 0.2),
                "severity": np.random.choice(["mild", "moderate", "severe"]),
                "population_affected": np.random.randint(10000, 500000)
            })
        return areas
    
    def _suggest_mitigation_strategies(self, risk_level: str) -> List[str]:
        """Suggest drought mitigation strategies"""
        strategies = {
            "low": ["Monitor water levels", "Promote water conservation"],
            "moderate": ["Implement water restrictions", "Increase groundwater monitoring", "Rainwater harvesting"],
            "high": ["Emergency water supply", "Crop diversification", "Drought-resistant agriculture"],
            "extreme": ["Water rationing", "Emergency relief measures", "Alternative water sources"]
        }
        return strategies.get(risk_level, [])
    
    async def get_groundwater_data(self, lat: float, lon: float) -> Dict:
        """Get detailed groundwater data from GRACE"""
        # Simulate GRACE groundwater storage data
        current_storage = np.random.uniform(50, 200)  # mm
        historical_average = np.random.uniform(80, 180)  # mm
        anomaly = current_storage - historical_average
        
        trend_data = []
        for i in range(24):  # 2 years of monthly data
            date = datetime.now() - timedelta(days=30*i)
            storage = historical_average + np.random.uniform(-30, 30)
            trend_data.append({
                "date": date.strftime("%Y-%m"),
                "storage_mm": storage
            })
        
        return {
            "location": {"lat": lat, "lon": lon},
            "current_storage_mm": current_storage,
            "historical_average_mm": historical_average,
            "anomaly_mm": anomaly,
            "trend": "declining" if anomaly < -10 else "stable" if abs(anomaly) < 10 else "increasing",
            "historical_data": trend_data[::-1],  # Reverse to chronological order
            "depletion_rate_mm_year": np.random.uniform(-20, 5)
        }