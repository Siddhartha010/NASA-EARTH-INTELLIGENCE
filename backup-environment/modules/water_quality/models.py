from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional

class Location(BaseModel):
    lat: float
    lon: float

class WaterParameters(BaseModel):
    turbidity_ntu: float
    chlorophyll_a_mg_m3: float
    suspended_sediments_mg_l: float
    temperature_celsius: float
    ph: float
    dissolved_oxygen_mg_l: float

class QualityIndex(BaseModel):
    score: float
    category: str

class PollutionSource(BaseModel):
    type: str
    distance_km: float
    severity: str

class HealthAssessment(BaseModel):
    risk_level: str
    recommendations: List[str]
    aquatic_life_impact: str

class WaterQualityData(BaseModel):
    location: Location
    timestamp: datetime
    parameters: WaterParameters
    quality_index: QualityIndex
    pollution_sources: List[PollutionSource]
    health_assessment: HealthAssessment

class WaterBody(BaseModel):
    name: str
    type: str
    lat: float
    lon: float
    area_hectares: float
    quality_score: float
    pollution_level: str
    last_monitored: datetime

class WaterStress(BaseModel):
    score: float
    level: str

class SeasonalForecast(BaseModel):
    forecast: List[Dict]

class WaterAvailabilityData(BaseModel):
    location: Location
    timestamp: datetime
    groundwater_anomaly_mm: float
    soil_moisture_fraction: float
    monthly_precipitation_mm: float
    availability_status: str
    water_stress_level: WaterStress
    seasonal_forecast: SeasonalForecast

class DroughtRiskFactors(BaseModel):
    precipitation_deficit: float
    groundwater_depletion: float
    soil_moisture_deficit: float
    temperature_anomaly: float

class DroughtRisk(BaseModel):
    score: float
    level: str

class AffectedArea(BaseModel):
    area_name: str
    lat: float
    lon: float
    severity: str
    population_affected: int