import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List
import requests

class VegetationService:
    def __init__(self):
        self.modis_url = "https://modis.gsfc.nasa.gov/data"
        self.landsat_url = "https://landsat.gsfc.nasa.gov/data"
    
    async def get_ndvi_data(self, lat: float, lon: float) -> Dict:
        """Get NDVI data from MODIS/Landsat"""
        # Simulate MODIS NDVI data
        ndvi_value = np.random.uniform(-0.1, 0.9)
        evi_value = np.random.uniform(-0.1, 0.8)
        
        vegetation_type = self._classify_vegetation(ndvi_value)
        health_status = self._assess_vegetation_health_status(ndvi_value, evi_value)
        
        return {
            "location": {"lat": lat, "lon": lon},
            "timestamp": datetime.now().isoformat(),
            "ndvi": ndvi_value,
            "evi": evi_value,
            "vegetation_type": vegetation_type,
            "health_status": health_status,
            "seasonal_trend": self._get_seasonal_trend(lat, lon),
            "carbon_sequestration": self._estimate_carbon_sequestration(ndvi_value)
        }
    
    def _classify_vegetation(self, ndvi: float) -> str:
        """Classify vegetation based on NDVI"""
        if ndvi < 0.1:
            return "bare_soil_water"
        elif ndvi < 0.3:
            return "sparse_vegetation"
        elif ndvi < 0.6:
            return "moderate_vegetation"
        else:
            return "dense_vegetation"
    
    def _assess_vegetation_health_status(self, ndvi: float, evi: float) -> Dict:
        """Assess vegetation health"""
        if ndvi > 0.6 and evi > 0.5:
            status = "healthy"
            score = 85 + np.random.randint(0, 15)
        elif ndvi > 0.3:
            status = "moderate"
            score = 50 + np.random.randint(0, 35)
        else:
            status = "stressed"
            score = np.random.randint(10, 50)
        
        return {
            "status": status,
            "health_score": score,
            "stress_factors": self._identify_stress_factors(ndvi, evi)
        }
    
    def _identify_stress_factors(self, ndvi: float, evi: float) -> List[str]:
        """Identify potential vegetation stress factors"""
        factors = []
        if ndvi < 0.3:
            factors.extend(["drought", "poor_soil_quality"])
        if evi < 0.2:
            factors.extend(["disease", "pest_infestation"])
        if np.random.random() > 0.7:
            factors.append("air_pollution")
        return factors
    
    def _get_seasonal_trend(self, lat: float, lon: float) -> Dict:
        """Get seasonal vegetation trend"""
        months = []
        for i in range(12):
            base_ndvi = 0.4 + 0.3 * np.sin(2 * np.pi * i / 12)
            months.append({
                "month": i + 1,
                "ndvi": base_ndvi + np.random.uniform(-0.1, 0.1)
            })
        
        return {"monthly_ndvi": months}
    
    def _estimate_carbon_sequestration(self, ndvi: float) -> Dict:
        """Estimate carbon sequestration potential"""
        # Simplified carbon sequestration estimation
        carbon_rate = max(0, ndvi * 2.5)  # tons CO2/hectare/year
        return {
            "annual_sequestration_rate": carbon_rate,
            "unit": "tons_co2_per_hectare_per_year"
        }
    
    async def generate_urban_cover_map(self, city: str) -> Dict:
        """Generate urban vegetation cover map"""
        # Simulate urban cover analysis
        grid_size = 25
        vegetation_cover = np.random.uniform(0, 0.8, (grid_size, grid_size))
        
        # Identify green spaces
        green_spaces = []
        for i in range(5):
            green_spaces.append({
                "name": f"Green Space {i+1}",
                "lat": 28.6 + np.random.uniform(-0.1, 0.1),
                "lon": 77.2 + np.random.uniform(-0.1, 0.1),
                "area_hectares": np.random.uniform(0.5, 10.0),
                "vegetation_density": np.random.uniform(0.6, 0.9)
            })
        
        return {
            "city": city,
            "total_green_cover_percent": np.mean(vegetation_cover) * 100,
            "vegetation_grid": vegetation_cover.tolist(),
            "green_spaces": green_spaces,
            "recommendations": self._generate_green_recommendations(np.mean(vegetation_cover))
        }
    
    def _generate_green_recommendations(self, cover_percent: float) -> List[str]:
        """Generate recommendations for increasing green cover"""
        recommendations = []
        if cover_percent < 0.3:
            recommendations.extend([
                "Increase tree plantation in residential areas",
                "Create more parks and green corridors",
                "Implement rooftop gardening programs"
            ])
        if cover_percent < 0.5:
            recommendations.extend([
                "Establish vertical gardens on buildings",
                "Convert vacant lots to community gardens"
            ])
        return recommendations
    
    async def assess_vegetation_health(self, lat: float, lon: float, radius: float) -> Dict:
        """Assess vegetation health in area"""
        # Simulate area assessment
        sample_points = 20
        health_scores = np.random.uniform(30, 95, sample_points)
        
        return {
            "area_center": {"lat": lat, "lon": lon},
            "radius_km": radius,
            "average_health_score": np.mean(health_scores),
            "health_distribution": {
                "healthy": np.sum(health_scores > 70) / sample_points * 100,
                "moderate": np.sum((health_scores > 40) & (health_scores <= 70)) / sample_points * 100,
                "stressed": np.sum(health_scores <= 40) / sample_points * 100
            },
            "priority_areas": [
                {"lat": lat + 0.01, "lon": lon + 0.01, "health_score": 25, "issue": "drought_stress"},
                {"lat": lat - 0.01, "lon": lon - 0.01, "health_score": 30, "issue": "disease_outbreak"}
            ]
        }
    
    async def analyze_mental_health_impact(self, lat: float, lon: float) -> Dict:
        """Analyze green space impact on mental health"""
        green_space_access = np.random.uniform(0.2, 0.9)
        
        # Calculate mental health benefits
        stress_reduction = green_space_access * 25  # percentage
        wellbeing_score = 60 + green_space_access * 30
        
        return {
            "location": {"lat": lat, "lon": lon},
            "green_space_accessibility": green_space_access,
            "mental_health_benefits": {
                "stress_reduction_percent": stress_reduction,
                "wellbeing_score": wellbeing_score,
                "air_quality_improvement": green_space_access * 15,
                "noise_reduction_db": green_space_access * 8
            },
            "recommendations": [
                "Increase walking paths in green areas",
                "Add meditation spaces in parks",
                "Create community gardens for social interaction"
            ]
        }
    
    async def identify_green_corridors(self, city: str) -> Dict:
        """Identify green corridors and connectivity"""
        corridors = []
        for i in range(3):
            corridors.append({
                "corridor_id": f"GC_{i+1}",
                "start_point": {"lat": 28.6 + i*0.02, "lon": 77.2 + i*0.02},
                "end_point": {"lat": 28.62 + i*0.02, "lon": 77.22 + i*0.02},
                "length_km": np.random.uniform(2, 8),
                "connectivity_score": np.random.uniform(0.4, 0.9),
                "species_diversity": np.random.randint(15, 45)
            })
        
        return {
            "city": city,
            "green_corridors": corridors,
            "overall_connectivity": np.random.uniform(0.5, 0.8),
            "biodiversity_hotspots": [
                {"lat": 28.615, "lon": 77.215, "species_count": 67},
                {"lat": 28.625, "lon": 77.225, "species_count": 52}
            ]
        }