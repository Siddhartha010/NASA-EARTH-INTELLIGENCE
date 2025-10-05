from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional

class Location(BaseModel):
    lat: float
    lon: float

class DroughtIndicators(BaseModel):
    precipitation_deficit_percent: float
    groundwater_depletion_mm: float
    soil_moisture_percentile: float
    temperature_anomaly_celsius: float
    vegetation_stress_index: float
    streamflow_percentile: float

class DroughtSeverity(BaseModel):
    severity_score: float
    category: str
    level: int
    confidence: float

class OnsetPrediction(BaseModel):
    estimated_onset_weeks: int
    probability: float
    peak_intensity_weeks: int
    estimated_duration_months: int

class AffectedArea(BaseModel):
    area_name: str
    lat: float
    lon: float
    population: int
    agricultural_area_hectares: int
    water_sources: int
    vulnerability_score: float

class AgriculturalImpact(BaseModel):
    crop_yield_reduction_percent: float
    livestock_stress_level: str
    irrigation_demand_increase_percent: float

class WaterSupplyImpact(BaseModel):
    reservoir_level_reduction_percent: float
    groundwater_stress: str
    water_rationing_probability: float

class EconomicImpact(BaseModel):
    estimated_losses_million_usd: float
    affected_businesses: int
    unemployment_increase_percent: float

class SocialImpact(BaseModel):
    population_at_risk: int
    health_risks: List[str]
    migration_risk: str

class DroughtImpact(BaseModel):
    agricultural_impact: AgriculturalImpact
    water_supply_impact: WaterSupplyImpact
    economic_impact: EconomicImpact
    social_impact: SocialImpact

class FloodRiskFactors(BaseModel):
    precipitation_intensity_mm_hr: float
    soil_saturation_percent: float
    elevation_meters: float
    slope_degrees: float
    drainage_capacity: float
    upstream_rainfall_mm: float

class FloodProbability(BaseModel):
    probability_score: float
    risk_level: str
    time_to_peak_hours: float
    duration_hours: float

class InundationModel(BaseModel):
    maximum_depth_meters: float
    affected_radius_km: float
    inundation_area_km2: float
    flow_velocity_ms: float
    water_quality_impact: str

class SafeZone(BaseModel):
    lat: float
    lon: float
    capacity: int

class EvacuationZone(BaseModel):
    zone_id: str
    center_lat: float
    center_lon: float
    radius_km: float
    population: int
    evacuation_priority: str
    safe_zones: List[SafeZone]

class InfrastructureRisk(BaseModel):
    roads: Dict
    power_infrastructure: Dict
    water_treatment: Dict
    hospitals: Dict

class FireIndicators(BaseModel):
    temperature_celsius: float
    humidity_percent: float
    wind_speed_kmh: float
    vegetation_moisture_percent: float
    fuel_load_tons_hectare: float
    active_fire_detections: int
    drought_index: float

class FireRisk(BaseModel):
    risk_score: float
    risk_level: str
    ignition_probability: float
    spread_potential: str

class FireBehavior(BaseModel):
    rate_of_spread_mh: float
    flame_length_meters: float
    fire_intensity_kw_m: float
    spotting_distance_km: float
    suppression_difficulty: str

class FireVulnerableArea(BaseModel):
    area_name: str
    lat: float
    lon: float
    vegetation_type: str
    structures_at_risk: int
    population_at_risk: int
    evacuation_time_minutes: int

class SuppressionResources(BaseModel):
    fire_stations: int
    fire_trucks: int
    water_tankers: int
    aircraft_available: int
    personnel: int
    response_time_minutes: int
    resource_adequacy: str

class VulnerabilityFactors(BaseModel):
    population_density: float
    infrastructure_age_years: float
    economic_resilience_index: float
    emergency_preparedness_score: float
    social_vulnerability_index: float
    environmental_degradation_score: float

class OverallVulnerability(BaseModel):
    vulnerability_score: float
    vulnerability_level: str
    most_vulnerable_sectors: List[str]

class DisasterScenario(BaseModel):
    disaster_type: str
    probability: float
    potential_impact: str
    estimated_losses_million_usd: float

class Warning(BaseModel):
    warning_id: str
    disaster_type: str
    severity: str
    probability: float
    issue_time: datetime
    valid_until: datetime
    affected_areas: List[AffectedArea]
    recommended_actions: List[str]
    contact_information: Dict

class EvacuationRoute(BaseModel):
    route_id: str
    start_point: Location
    end_point: Dict
    distance_km: float
    estimated_time_minutes: int
    route_status: str
    capacity: int
    waypoints: List[Location]

class EmergencyShelter(BaseModel):
    shelter_id: str
    name: str
    lat: float
    lon: float
    capacity: int
    current_occupancy: int
    facilities: List[str]
    contact: str

class TransportationAssistance(BaseModel):
    buses_available: int
    pickup_points: List[Dict]

class EmergencyAlert(BaseModel):
    alert_id: str
    disaster_type: str
    severity: str
    message: str
    affected_areas: List[str]
    issue_time: datetime
    expiry_time: datetime
    channels: List[str]
    languages: List[str]
    estimated_reach: int