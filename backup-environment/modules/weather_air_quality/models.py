from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional

class Location(BaseModel):
    lat: float
    lon: float

class Pollutants(BaseModel):
    no2: float  # ppb
    so2: float  # ppb
    co: float   # ppm
    pm25: float # μg/m³
    pm10: float # μg/m³
    o3: float   # ppb
    aerosol_optical_depth: float

class AQI(BaseModel):
    value: int
    category: str

class HealthImpact(BaseModel):
    risk_level: str
    recommendations: List[str]

class AirQualityData(BaseModel):
    location: Location
    timestamp: datetime
    pollutants: Pollutants
    aqi: AQI
    health_impact: HealthImpact

class WeatherData(BaseModel):
    location: Location
    timestamp: datetime
    temperature: float  # Celsius
    humidity: float     # %
    pressure: float     # hPa
    wind_speed: float   # m/s
    wind_direction: float # degrees
    precipitation: float  # mm
    uv_index: float