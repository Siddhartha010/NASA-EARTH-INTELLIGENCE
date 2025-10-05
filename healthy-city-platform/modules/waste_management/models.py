from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional

class Location(BaseModel):
    lat: float
    lon: float

class EnvironmentalImpact(BaseModel):
    soil_contamination_risk: str
    water_contamination_risk: str
    air_quality_impact: str
    wildlife_impact: str

class CostBreakdown(BaseModel):
    labor: float
    equipment: float
    disposal: float
    restoration: float

class CleanupCostEstimate(BaseModel):
    total_cost_usd: float
    cost_breakdown: CostBreakdown

class DumpingSite(BaseModel):
    site_id: str
    lat: float
    lon: float
    detection_date: datetime
    confidence_score: float
    estimated_area_m2: float
    waste_type: str
    severity: str
    environmental_impact: EnvironmentalImpact
    accessibility: str

class DumpingReport(BaseModel):
    report_id: str
    status: str
    location: Location
    description: str
    reporter_id: str
    timestamp: datetime
    priority: str
    estimated_response_time: str
    assigned_team: str

class WasteHotspot(BaseModel):
    hotspot_id: str
    lat: float
    lon: float
    waste_density: float
    primary_waste_type: str
    accumulation_rate: float
    last_collection: datetime
    collection_frequency: str
    overflow_risk: str

class CollectionPoint(BaseModel):
    point_id: str
    lat: float
    lon: float
    bin_capacity: int
    current_fill_level: float
    waste_type: str
    collection_frequency: str
    accessibility: str

class OptimizedRoute(BaseModel):
    route_id: str
    vehicle_type: str
    collection_points: List[CollectionPoint]
    estimated_duration_hours: float
    estimated_distance_km: float
    fuel_consumption_liters: float
    crew_size: int
    start_time: str
    priority_level: str

class EfficiencyMetrics(BaseModel):
    total_distance_km: float
    total_duration_hours: float
    total_fuel_consumption_liters: float
    average_points_per_route: float
    fuel_efficiency_km_per_liter: float
    collection_rate_points_per_hour: float

class CostSavings(BaseModel):
    fuel_savings: float
    vehicle_operation_savings: float
    total_daily_savings: float

class EnvironmentalBenefits(BaseModel):
    co2_reduction_kg: float
    emission_reduction_percent: float

class Alert(BaseModel):
    alert_id: str
    type: str
    message: str
    severity: str
    timestamp: datetime
    locations_affected: int
    status: str
    estimated_resolution_time: str

class AlertSummary(BaseModel):
    high_priority: int
    medium_priority: int
    low_priority: int