from pydantic import BaseModel
from datetime import datetime
from typing import Dict, List, Optional

class Location(BaseModel):
    lat: float
    lon: float

class AirQualityInfo(BaseModel):
    aqi: int
    category: str
    dominant_pollutant: str
    health_recommendation: str

class GreenSpace(BaseModel):
    name: str
    type: str
    lat: float
    lon: float
    distance_km: float
    area_hectares: float
    facilities: List[str]
    air_quality_improvement: float
    mental_health_score: float

class GreenCoverInfo(BaseModel):
    nearby_green_spaces: List[GreenSpace]
    vegetation_health_score: float
    tree_cover_percent: float
    mental_health_benefit_score: float

class WaterBodyInfo(BaseModel):
    name: str
    distance_km: float
    quality_score: float
    safety_status: str

class WaterQualityInfo(BaseModel):
    nearest_water_body: WaterBodyInfo
    groundwater_status: str
    water_shortage_risk: str

class WeatherAlert(BaseModel):
    type: str
    severity: str
    message: str
    valid_until: datetime

class WeatherInfo(BaseModel):
    temperature_celsius: float
    humidity_percent: float
    uv_index: float
    weather_alerts: List[WeatherAlert]

class DisasterAlert(BaseModel):
    alert_id: str
    type: str
    severity: str
    distance_km: float
    estimated_impact_time: datetime
    recommended_actions: List[str]

class CommunityAction(BaseModel):
    action_id: str
    title: str
    description: str
    impact: str
    participation_count: int
    next_event: Optional[datetime] = None
    target_reduction_percent: Optional[int] = None

class CitizenDashboard(BaseModel):
    location: Location
    last_updated: datetime
    air_quality: AirQualityInfo
    green_cover: GreenCoverInfo
    water_quality: WaterQualityInfo
    weather: WeatherInfo
    disaster_alerts: List[DisasterAlert]
    community_actions: List[CommunityAction]

class EnvironmentalReports(BaseModel):
    total_submitted: int
    resolved: int
    in_progress: int
    average_resolution_time_days: float

class EnvironmentalImpact(BaseModel):
    trees_planted: int
    waste_collected_kg: int
    water_saved_liters: int
    co2_offset_kg: int

class CommunityInitiatives(BaseModel):
    active_projects: int
    total_participants: int
    environmental_impact: EnvironmentalImpact

class CitizenSatisfaction(BaseModel):
    overall_score: float
    air_quality_satisfaction: float
    green_spaces_satisfaction: float
    water_quality_satisfaction: float
    disaster_preparedness_satisfaction: float

class TopConcern(BaseModel):
    issue: str
    reports: int

class CommunityStats(BaseModel):
    city: str
    reporting_period: str
    total_active_citizens: int
    environmental_reports: EnvironmentalReports
    community_initiatives: CommunityInitiatives
    citizen_satisfaction: CitizenSatisfaction
    top_concerns: List[TopConcern]

class CitizenFeedback(BaseModel):
    feedback_id: str
    citizen_id: str
    category: str
    rating: int
    comments: str
    location: Location
    timestamp: datetime
    status: str
    department: str

class ImpactMetrics(BaseModel):
    trees_to_plant: Optional[int] = None
    co2_reduction_tons_year: Optional[int] = None
    air_quality_improvement_percent: Optional[float] = None
    rooftops_targeted: Optional[int] = None
    food_production_kg_year: Optional[int] = None
    temperature_reduction_celsius: Optional[float] = None
    solar_capacity_mw: Optional[float] = None
    households_powered: Optional[int] = None
    co2_avoided_tons_year: Optional[int] = None
    waste_reduction_target_percent: Optional[int] = None
    participating_households: Optional[int] = None
    landfill_diversion_tons: Optional[int] = None

class ContactInfo(BaseModel):
    coordinator: str
    phone: str

class GreenInitiative(BaseModel):
    initiative_id: str
    name: str
    description: str
    status: str
    participation_type: str
    start_date: datetime
    duration_months: int
    current_participants: int
    target_participants: int
    impact_metrics: ImpactMetrics
    how_to_participate: List[str]
    contact_info: ContactInfo

class TotalEnvironmentalImpact(BaseModel):
    estimated_co2_reduction_tons_year: int
    total_participants: int
    community_engagement_score: float

class EnvironmentalReport(BaseModel):
    report_id: str
    category: str
    description: str
    location: Location
    reporter_id: str
    timestamp: datetime
    status: str
    priority: str
    assigned_department: str
    estimated_resolution_time: str
    photos: List[str]
    verification_required: bool

class NearbyIssue(BaseModel):
    issue_id: str
    category: str
    description: str
    location: Location
    distance_km: float
    status: str
    priority: str
    reported_date: datetime
    upvotes: int
    comments: int

class IssueSummary(BaseModel):
    by_category: Dict[str, int]
    by_status: Dict[str, int]
    by_priority: Dict[str, int]

class PersonalizedAlert(BaseModel):
    alert_id: str
    type: str
    severity: str
    title: str
    message: str
    recommendation: str
    timestamp: datetime
    expires_at: datetime
    location_specific: bool
    action_required: bool
    read_status: bool

class AlertPreferences(BaseModel):
    air_quality: bool
    water_quality: bool
    disaster_warnings: bool
    green_initiatives: bool
    waste_management: bool

class AlertSubscription(BaseModel):
    subscription_id: str
    citizen_id: str
    location: Location
    alert_types: List[str]
    notification_methods: List[str]
    frequency: str
    created_at: datetime
    status: str