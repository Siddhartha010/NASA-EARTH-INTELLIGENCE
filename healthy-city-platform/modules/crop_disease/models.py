from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional

class Location(BaseModel):
    lat: float
    lon: float

class DetectedDisease(BaseModel):
    disease_id: str
    disease_name: str
    confidence: float
    severity: str
    affected_area_percent: float

class ImageAnalysis(BaseModel):
    filename: str
    detected_diseases: List[DetectedDisease]
    overall_health_score: float
    analysis_timestamp: datetime

class AffectedArea(BaseModel):
    area_id: str
    lat: float
    lon: float
    disease_type: str
    severity: str
    affected_hectares: float
    detection_date: datetime
    spread_rate: float

class DiseaseHotspot(BaseModel):
    location: Location
    disease: str
    urgency: str

class WeatherConditions(BaseModel):
    temperature: float
    humidity: float
    rainfall_mm: float
    wind_speed: float

class Alert(BaseModel):
    alert_type: str
    severity: str
    message: str
    action_required: str
    valid_until: datetime

class TreatmentPlan(BaseModel):
    immediate_actions: List[str]
    long_term_management: List[str]
    monitoring_schedule: str
    expected_recovery_time: str

class VegetationIndices(BaseModel):
    ndvi: float
    evi: float
    lai: float

class YieldFactors(BaseModel):
    crop_health_score: float
    weather_conditions: str
    disease_pressure: str

class YieldComparison(BaseModel):
    regional_average: float
    predicted_vs_average: float

class CropHealthData(BaseModel):
    location: Location
    crop_type: str
    assessment_date: datetime
    vegetation_indices: VegetationIndices
    health_score: float
    health_status: str
    stress_indicators: List[str]
    growth_stage: str
    recommendations: List[str]

class YieldPrediction(BaseModel):
    location: Location
    crop_type: str
    prediction_date: datetime
    predicted_yield_tons_per_hectare: float
    confidence_level: float
    factors_affecting_yield: YieldFactors
    yield_comparison: YieldComparison