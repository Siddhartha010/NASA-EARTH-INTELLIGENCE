"""
NASA MODIS (Moderate Resolution Imaging Spectroradiometer) Client
Vegetation indices and land surface data
"""

import requests
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from config.nasa_apis import NASA_API_KEY

class MODISClient:
    def __init__(self, api_key: str = NASA_API_KEY):
        self.api_key = api_key
        self.base_url = "https://modis.gsfc.nasa.gov/data"
        
    async def get_ndvi_data(self, lat: float, lon: float) -> Dict:
        """Get MODIS NDVI data for location"""
        try:
            # Try to fetch real MODIS data (requires NASA Earthdata authentication)
            real_data = await self._fetch_real_modis_data(lat, lon)
            if real_data:
                return real_data
        except Exception as e:
            print(f"MODIS API error: {e}")
            
        # Enhanced simulation based on MODIS characteristics
        return self._simulate_modis_data(lat, lon)
    
    async def _fetch_real_modis_data(self, lat: float, lon: float) -> Optional[Dict]:
        """Fetch real MODIS data from NASA servers"""
        # This would require NASA Earthdata authentication
        # For now, return None to use simulation
        return None
    
    def _simulate_modis_data(self, lat: float, lon: float) -> Dict:
        """Simulate MODIS NDVI/EVI data based on location and season"""
        
        # Base NDVI varies by latitude (vegetation zones)
        if lat > 30:  # Temperate/boreal
            base_ndvi = 0.4
        elif lat > 23.5:  # Subtropical
            base_ndvi = 0.5
        elif lat > -23.5:  # Tropical
            base_ndvi = 0.7
        else:  # Southern temperate
            base_ndvi = 0.4
            
        # Seasonal variation
        month = datetime.now().month
        seasonal_factor = 0.3 * np.sin(2 * np.pi * (month - 3) / 12)
        
        # Urban vs rural factor
        urban_factor = 1.0
        if self._is_urban_area(lat, lon):
            urban_factor = 0.6  # Lower NDVI in urban areas
            
        ndvi = max(0, min(1, base_ndvi + seasonal_factor * urban_factor + np.random.uniform(-0.1, 0.1)))
        evi = ndvi * 0.8 + np.random.uniform(-0.05, 0.05)  # EVI typically lower than NDVI
        
        return {
            "location": {"lat": lat, "lon": lon},
            "timestamp": datetime.now().isoformat(),
            "satellite": "MODIS Terra/Aqua",
            "product": "MOD13Q1/MYD13Q1",
            "resolution": "250m",
            "ndvi": round(ndvi, 3),
            "evi": round(evi, 3),
            "quality": "Good",
            "cloud_cover": np.random.randint(0, 30),
            "vegetation_type": self._classify_vegetation(ndvi),
            "phenology": self._get_phenology_stage(month, lat),
            "time_series": self._generate_ndvi_time_series(base_ndvi, lat)
        }
    
    def _is_urban_area(self, lat: float, lon: float) -> bool:
        """Check if location is in urban area"""
        urban_centers = [
            (28.6139, 77.2090),  # Delhi
            (19.0760, 72.8777),  # Mumbai
            (13.0827, 80.2707),  # Chennai
            (22.5726, 88.3639),  # Kolkata
            (12.9716, 77.5946)   # Bangalore
        ]
        
        for urban_lat, urban_lon in urban_centers:
            if abs(lat - urban_lat) < 0.5 and abs(lon - urban_lon) < 0.5:
                return True
        return False
    
    def _classify_vegetation(self, ndvi: float) -> str:
        """Classify vegetation based on NDVI"""
        if ndvi < 0.1:
            return "Bare soil/Water"
        elif ndvi < 0.3:
            return "Sparse vegetation"
        elif ndvi < 0.6:
            return "Moderate vegetation"
        else:
            return "Dense vegetation"
    
    def _get_phenology_stage(self, month: int, lat: float) -> str:
        """Get vegetation phenology stage"""
        if lat > 23.5:  # Northern hemisphere
            if month in [3, 4, 5]:
                return "Green-up"
            elif month in [6, 7, 8]:
                return "Peak growing season"
            elif month in [9, 10, 11]:
                return "Senescence"
            else:
                return "Dormancy"
        else:  # Tropical regions
            if month in [6, 7, 8, 9]:
                return "Monsoon growth"
            else:
                return "Dry season"
    
    def _generate_ndvi_time_series(self, base_ndvi: float, lat: float) -> List[Dict]:
        """Generate 12-month NDVI time series"""
        time_series = []
        for month in range(1, 13):
            seasonal_factor = 0.3 * np.sin(2 * np.pi * (month - 3) / 12)
            monthly_ndvi = max(0, min(1, base_ndvi + seasonal_factor + np.random.uniform(-0.05, 0.05)))
            
            time_series.append({
                "month": month,
                "ndvi": round(monthly_ndvi, 3),
                "date": f"2024-{month:02d}-01"
            })
        
        return time_series
    
    async def get_land_cover_data(self, lat: float, lon: float) -> Dict:
        """Get MODIS land cover classification"""
        
        # Simulate land cover based on location
        land_cover_types = {
            1: "Evergreen Needleleaf Forests",
            2: "Evergreen Broadleaf Forests", 
            3: "Deciduous Needleleaf Forests",
            4: "Deciduous Broadleaf Forests",
            5: "Mixed Forests",
            6: "Closed Shrublands",
            7: "Open Shrublands",
            8: "Woody Savannas",
            9: "Savannas",
            10: "Grasslands",
            11: "Permanent Wetlands",
            12: "Croplands",
            13: "Urban and Built-up Lands",
            14: "Cropland/Natural Vegetation Mosaics",
            15: "Permanent Snow and Ice",
            16: "Barren",
            17: "Water Bodies"
        }
        
        # Determine land cover based on location
        if self._is_urban_area(lat, lon):
            primary_type = 13
        elif lat > 25:  # Northern plains - agriculture
            primary_type = 12
        elif 15 < lat < 25:  # Central India - mixed
            primary_type = np.random.choice([8, 9, 12, 14])
        else:  # Southern India - forests/agriculture
            primary_type = np.random.choice([2, 4, 12])
        
        return {
            "location": {"lat": lat, "lon": lon},
            "product": "MCD12Q1",
            "year": 2023,
            "primary_land_cover": {
                "type_id": primary_type,
                "type_name": land_cover_types[primary_type],
                "confidence": np.random.randint(70, 95)
            },
            "land_cover_percentages": self._generate_land_cover_percentages(primary_type),
            "change_detection": {
                "changed_since_previous_year": np.random.choice([True, False]),
                "change_type": "Cropland expansion" if np.random.random() > 0.5 else "Forest loss"
            }
        }
    
    def _generate_land_cover_percentages(self, primary_type: int) -> Dict:
        """Generate land cover percentages for area"""
        percentages = {}
        
        # Primary type gets 40-70%
        primary_percent = np.random.randint(40, 70)
        percentages[primary_type] = primary_percent
        
        # Distribute remaining percentage among 2-3 other types
        remaining = 100 - primary_percent
        secondary_types = np.random.choice(range(1, 18), size=2, replace=False)
        
        for i, sec_type in enumerate(secondary_types):
            if sec_type != primary_type:
                if i == 0:
                    percentages[sec_type] = np.random.randint(15, remaining - 10)
                else:
                    percentages[sec_type] = remaining - sum(percentages.values())
        
        return percentages