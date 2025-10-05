from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional

class Location(BaseModel):
    lat: float
    lon: float

class VegetationHealth(BaseModel):
    status: str
    health_score: int
    stress_factors: List[str]

class SeasonalTrend(BaseModel):
    monthly_ndvi: List[Dict]

class CarbonSequestration(BaseModel):
    annual_sequestration_rate: float
    unit: str

class NDVIData(BaseModel):
    location: Location
    timestamp: datetime
    ndvi: float
    evi: float
    vegetation_type: str
    health_status: VegetationHealth
    seasonal_trend: SeasonalTrend
    carbon_sequestration: CarbonSequestration

class GreenSpace(BaseModel):
    name: str
    lat: float
    lon: float
    area_hectares: float
    vegetation_density: float

class UrbanCoverMap(BaseModel):
    city: str
    total_green_cover_percent: float
    vegetation_grid: List[List[float]]
    green_spaces: List[GreenSpace]
    recommendations: List[str]

class MentalHealthBenefits(BaseModel):
    stress_reduction_percent: float
    wellbeing_score: float
    air_quality_improvement: float
    noise_reduction_db: float

class GreenCorridor(BaseModel):
    corridor_id: str
    start_point: Location
    end_point: Location
    length_km: float
    connectivity_score: float
    species_diversity: int