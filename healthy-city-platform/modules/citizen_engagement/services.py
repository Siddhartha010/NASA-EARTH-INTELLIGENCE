import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List
import uuid

class CitizenService:
    def __init__(self):
        pass
    
    async def get_citizen_dashboard(self, lat: float, lon: float) -> Dict:
        """Get comprehensive dashboard for citizen location"""
        # Simulate real-time environmental data around citizen location
        dashboard_data = {
            "location": {"lat": lat, "lon": lon},
            "last_updated": datetime.now().isoformat(),
            "air_quality": {
                "aqi": np.random.randint(30, 150),
                "category": np.random.choice(["Good", "Moderate", "Unhealthy for Sensitive Groups", "Unhealthy"]),
                "dominant_pollutant": np.random.choice(["PM2.5", "NO2", "O3"]),
                "health_recommendation": self._get_health_recommendation(np.random.randint(30, 150))
            },
            "green_cover": {
                "nearby_green_spaces": self._find_nearby_green_spaces(lat, lon),
                "vegetation_health_score": np.random.uniform(60, 95),
                "tree_cover_percent": np.random.uniform(15, 45),
                "mental_health_benefit_score": np.random.uniform(70, 90)
            },
            "water_quality": {
                "nearest_water_body": {
                    "name": "City Lake",
                    "distance_km": np.random.uniform(0.5, 3.0),
                    "quality_score": np.random.uniform(40, 85),
                    "safety_status": np.random.choice(["safe", "caution", "unsafe"])
                },
                "groundwater_status": np.random.choice(["adequate", "stressed", "critical"]),
                "water_shortage_risk": np.random.choice(["low", "medium", "high"])
            },
            "weather": {
                "temperature_celsius": np.random.uniform(20, 35),
                "humidity_percent": np.random.uniform(40, 80),
                "uv_index": np.random.uniform(3, 11),
                "weather_alerts": self._get_weather_alerts()
            },
            "disaster_alerts": self._get_active_disaster_alerts(lat, lon),
            "community_actions": self._get_community_actions(lat, lon)
        }
        
        return dashboard_data
    
    def _get_health_recommendation(self, aqi: int) -> str:
        """Get health recommendation based on AQI"""
        if aqi <= 50:
            return "Air quality is good. Enjoy outdoor activities!"
        elif aqi <= 100:
            return "Air quality is moderate. Sensitive individuals should limit prolonged outdoor exertion."
        elif aqi <= 150:
            return "Unhealthy for sensitive groups. Consider reducing outdoor activities."
        else:
            return "Air quality is unhealthy. Limit outdoor activities and wear masks."
    
    def _find_nearby_green_spaces(self, lat: float, lon: float) -> List[Dict]:
        """Find green spaces near citizen location"""
        green_spaces = []
        
        for i in range(np.random.randint(3, 8)):
            space = {
                "name": f"Green Space {i+1}",
                "type": np.random.choice(["park", "garden", "forest", "recreational_area"]),
                "lat": lat + np.random.uniform(-0.02, 0.02),
                "lon": lon + np.random.uniform(-0.02, 0.02),
                "distance_km": np.random.uniform(0.2, 2.0),
                "area_hectares": np.random.uniform(0.5, 10.0),
                "facilities": np.random.choice([
                    ["walking_trails", "benches"],
                    ["playground", "walking_trails", "benches"],
                    ["sports_facilities", "walking_trails", "benches", "restrooms"]
                ]),
                "air_quality_improvement": np.random.uniform(10, 30),  # percentage
                "mental_health_score": np.random.uniform(75, 95)
            }
            green_spaces.append(space)
        
        return green_spaces
    
    def _get_weather_alerts(self) -> List[Dict]:
        """Get current weather alerts"""
        alerts = []
        
        if np.random.random() > 0.7:  # 30% chance of weather alert
            alert_types = ["heat_wave", "heavy_rain", "strong_winds", "air_quality"]
            alert_type = np.random.choice(alert_types)
            
            alerts.append({
                "type": alert_type,
                "severity": np.random.choice(["advisory", "watch", "warning"]),
                "message": f"{alert_type.replace('_', ' ').title()} {np.random.choice(['advisory', 'watch', 'warning'])} in effect",
                "valid_until": (datetime.now() + timedelta(hours=np.random.randint(6, 24))).isoformat()
            })
        
        return alerts
    
    def _get_active_disaster_alerts(self, lat: float, lon: float) -> List[Dict]:
        """Get active disaster alerts for location"""
        alerts = []
        
        if np.random.random() > 0.8:  # 20% chance of disaster alert
            alert = {
                "alert_id": str(uuid.uuid4()),
                "type": np.random.choice(["flood", "drought", "fire", "earthquake"]),
                "severity": np.random.choice(["watch", "warning", "emergency"]),
                "distance_km": np.random.uniform(1, 20),
                "estimated_impact_time": (datetime.now() + timedelta(hours=np.random.randint(2, 48))).isoformat(),
                "recommended_actions": [
                    "Stay informed through official channels",
                    "Prepare emergency kit",
                    "Follow evacuation orders if issued"
                ]
            }
            alerts.append(alert)
        
        return alerts
    
    def _get_community_actions(self, lat: float, lon: float) -> List[Dict]:
        """Get community actions citizen can take"""
        actions = [
            {
                "action_id": "plant_trees",
                "title": "Community Tree Planting",
                "description": "Join local tree planting initiative",
                "impact": "Improve air quality and reduce urban heat",
                "participation_count": np.random.randint(50, 500),
                "next_event": (datetime.now() + timedelta(days=np.random.randint(1, 14))).isoformat()
            },
            {
                "action_id": "cleanup_drive",
                "title": "Neighborhood Cleanup",
                "description": "Participate in community cleanup drive",
                "impact": "Reduce waste and improve local environment",
                "participation_count": np.random.randint(20, 200),
                "next_event": (datetime.now() + timedelta(days=np.random.randint(1, 7))).isoformat()
            },
            {
                "action_id": "water_conservation",
                "title": "Water Conservation Challenge",
                "description": "Reduce household water consumption",
                "impact": "Conserve water resources for community",
                "participation_count": np.random.randint(100, 1000),
                "target_reduction_percent": 20
            }
        ]
        
        return actions
    
    async def get_community_engagement_stats(self, city: str) -> Dict:
        """Get community engagement statistics"""
        stats = {
            "city": city,
            "reporting_period": "last_30_days",
            "total_active_citizens": np.random.randint(5000, 50000),
            "environmental_reports": {
                "total_submitted": np.random.randint(200, 2000),
                "resolved": np.random.randint(150, 1500),
                "in_progress": np.random.randint(30, 300),
                "average_resolution_time_days": np.random.uniform(3, 15)
            },
            "community_initiatives": {
                "active_projects": np.random.randint(10, 50),
                "total_participants": np.random.randint(1000, 10000),
                "environmental_impact": {
                    "trees_planted": np.random.randint(500, 5000),
                    "waste_collected_kg": np.random.randint(1000, 10000),
                    "water_saved_liters": np.random.randint(50000, 500000),
                    "co2_offset_kg": np.random.randint(2000, 20000)
                }
            },
            "citizen_satisfaction": {
                "overall_score": np.random.uniform(3.5, 4.8),
                "air_quality_satisfaction": np.random.uniform(3.0, 4.5),
                "green_spaces_satisfaction": np.random.uniform(3.5, 4.7),
                "water_quality_satisfaction": np.random.uniform(3.2, 4.6),
                "disaster_preparedness_satisfaction": np.random.uniform(3.0, 4.3)
            },
            "top_concerns": [
                {"issue": "Air pollution", "reports": np.random.randint(100, 500)},
                {"issue": "Waste management", "reports": np.random.randint(80, 400)},
                {"issue": "Water quality", "reports": np.random.randint(60, 300)},
                {"issue": "Lack of green spaces", "reports": np.random.randint(40, 200)}
            ]
        }
        
        return stats
    
    async def submit_citizen_feedback(self, feedback_data: Dict) -> Dict:
        """Submit citizen feedback on city services"""
        feedback_id = str(uuid.uuid4())
        
        processed_feedback = {
            "feedback_id": feedback_id,
            "citizen_id": feedback_data.get("citizen_id", "anonymous"),
            "category": feedback_data.get("category", "general"),
            "rating": feedback_data.get("rating", 3),
            "comments": feedback_data.get("comments", ""),
            "location": feedback_data.get("location", {}),
            "timestamp": datetime.now().isoformat(),
            "status": "received",
            "department": self._route_feedback_to_department(feedback_data.get("category", "general"))
        }
        
        return {
            "message": "Feedback submitted successfully",
            "feedback": processed_feedback,
            "estimated_response_time": "3-5 business days",
            "tracking_number": feedback_id[:8].upper()
        }
    
    def _route_feedback_to_department(self, category: str) -> str:
        """Route feedback to appropriate department"""
        routing = {
            "air_quality": "Environmental Protection",
            "water_quality": "Water Management",
            "waste_management": "Sanitation Department",
            "green_spaces": "Parks and Recreation",
            "disaster_preparedness": "Emergency Management",
            "general": "City Administration"
        }
        return routing.get(category, "City Administration")
    
    async def get_green_initiatives(self, city: str) -> Dict:
        """Get ongoing green initiatives citizens can participate in"""
        initiatives = []
        
        initiative_types = [
            {
                "name": "Urban Forest Expansion",
                "description": "Plant native trees in urban areas to improve air quality and reduce heat islands",
                "participation_type": "volunteer",
                "impact_metrics": {
                    "trees_to_plant": np.random.randint(1000, 5000),
                    "co2_reduction_tons_year": np.random.randint(100, 500),
                    "air_quality_improvement_percent": np.random.uniform(5, 15)
                }
            },
            {
                "name": "Rooftop Garden Program",
                "description": "Convert rooftops into green spaces for food production and biodiversity",
                "participation_type": "property_owner",
                "impact_metrics": {
                    "rooftops_targeted": np.random.randint(100, 1000),
                    "food_production_kg_year": np.random.randint(5000, 50000),
                    "temperature_reduction_celsius": np.random.uniform(2, 5)
                }
            },
            {
                "name": "Community Solar Initiative",
                "description": "Install community solar panels to reduce carbon footprint",
                "participation_type": "investment",
                "impact_metrics": {
                    "solar_capacity_mw": np.random.uniform(5, 50),
                    "households_powered": np.random.randint(1000, 10000),
                    "co2_avoided_tons_year": np.random.randint(2000, 20000)
                }
            },
            {
                "name": "Waste Reduction Challenge",
                "description": "Community-wide initiative to reduce, reuse, and recycle waste",
                "participation_type": "household",
                "impact_metrics": {
                    "waste_reduction_target_percent": 30,
                    "participating_households": np.random.randint(5000, 50000),
                    "landfill_diversion_tons": np.random.randint(1000, 10000)
                }
            }
        ]
        
        for initiative_type in initiative_types:
            if np.random.random() > 0.3:  # 70% chance of each initiative being active
                initiative = {
                    "initiative_id": str(uuid.uuid4()),
                    "name": initiative_type["name"],
                    "description": initiative_type["description"],
                    "status": np.random.choice(["planning", "active", "recruiting"]),
                    "participation_type": initiative_type["participation_type"],
                    "start_date": (datetime.now() + timedelta(days=np.random.randint(-30, 30))).isoformat(),
                    "duration_months": np.random.randint(6, 24),
                    "current_participants": np.random.randint(50, 2000),
                    "target_participants": np.random.randint(100, 5000),
                    "impact_metrics": initiative_type["impact_metrics"],
                    "how_to_participate": [
                        "Register on city website",
                        "Attend orientation session",
                        "Complete required training",
                        "Begin participation"
                    ],
                    "contact_info": {
                        "coordinator": f"coordinator_{initiative_type['name'].lower().replace(' ', '_')}@city.gov",
                        "phone": f"+1-555-{np.random.randint(1000000, 9999999)}"
                    }
                }
                initiatives.append(initiative)
        
        return {
            "city": city,
            "active_initiatives": len(initiatives),
            "initiatives": initiatives,
            "total_environmental_impact": {
                "estimated_co2_reduction_tons_year": sum([
                    init["impact_metrics"].get("co2_reduction_tons_year", 0) + 
                    init["impact_metrics"].get("co2_avoided_tons_year", 0) 
                    for init in initiatives
                ]),
                "total_participants": sum([init["current_participants"] for init in initiatives]),
                "community_engagement_score": np.random.uniform(70, 95)
            }
        }

class ReportingService:
    def __init__(self):
        self.report_categories = [
            "illegal_dumping", "tree_cutting", "water_pollution", 
            "air_pollution", "noise_pollution", "waste_overflow",
            "damaged_green_space", "water_leak"
        ]
    
    async def submit_environmental_report(self, report_data: Dict) -> Dict:
        """Submit environmental issue report"""
        report_id = str(uuid.uuid4())

        # Persist to DB (SQLite) using SQLAlchemy models if available
        try:
            from db.db import SessionLocal, init_db
            from db.models import Report as DBReport
            init_db()
            session = SessionLocal()
            loc = report_data.get('location', {}) or {}
            lat = loc.get('lat') or report_data.get('lat')
            lon = loc.get('lon') or report_data.get('lon')
            db_report = DBReport(report_id=report_id, category=report_data.get('category', 'general'), description=report_data.get('description', ''), lat=lat, lon=lon, reporter_id=report_data.get('reporter_id', 'anonymous'))
            session.add(db_report)
            session.commit()
            session.refresh(db_report)
            session.close()
        except Exception:
            # DB not available -> fall back to in-memory behavior
            lat = report_data.get('location', {}).get('lat') if isinstance(report_data.get('location'), dict) else None
            lon = report_data.get('location', {}).get('lon') if isinstance(report_data.get('location'), dict) else None

        processed_report = {
            "report_id": report_id,
            "category": report_data.get("category", "general"),
            "description": report_data.get("description", ""),
            "location": report_data.get("location", {}),
            "reporter_id": report_data.get("reporter_id", "anonymous"),
            "timestamp": datetime.now().isoformat(),
            "status": "submitted",
            "priority": self._assess_report_priority(report_data),
            "assigned_department": self._assign_to_department(report_data.get("category", "general")),
            "estimated_resolution_time": self._estimate_resolution_time(report_data.get("category", "general")),
            "photos": report_data.get("photos", []),
            "verification_required": report_data.get("category") in ["illegal_dumping", "tree_cutting", "water_pollution"]
        }

        return {
            "message": "Report submitted successfully",
            "report": processed_report,
            "tracking_number": report_id[:8].upper(),
            "next_steps": self._get_next_steps(processed_report["category"]),
            "citizen_reward_points": self._calculate_reward_points(processed_report["category"]) 
        }
    
    def _assess_report_priority(self, report_data: Dict) -> str:
        """Assess priority of environmental report"""
        category = report_data.get("category", "general")
        description = report_data.get("description", "").lower()
        
        high_priority_keywords = ["toxic", "chemical", "large", "urgent", "health", "danger"]
        high_priority_categories = ["water_pollution", "air_pollution", "illegal_dumping"]
        
        if category in high_priority_categories or any(keyword in description for keyword in high_priority_keywords):
            return "high"
        elif category in ["tree_cutting", "waste_overflow"]:
            return "medium"
        else:
            return "low"
    
    def _assign_to_department(self, category: str) -> str:
        """Assign report to appropriate department"""
        assignments = {
            "illegal_dumping": "Waste Management",
            "tree_cutting": "Parks and Recreation",
            "water_pollution": "Water Quality Department",
            "air_pollution": "Environmental Protection",
            "noise_pollution": "Environmental Protection",
            "waste_overflow": "Sanitation Department",
            "damaged_green_space": "Parks and Recreation",
            "water_leak": "Water Utilities"
        }
        return assignments.get(category, "General Services")
    
    def _estimate_resolution_time(self, category: str) -> str:
        """Estimate resolution time based on category"""
        resolution_times = {
            "illegal_dumping": "3-7 days",
            "tree_cutting": "1-3 days (if unauthorized)",
            "water_pollution": "1-2 days",
            "air_pollution": "5-10 days",
            "noise_pollution": "2-5 days",
            "waste_overflow": "1-2 days",
            "damaged_green_space": "7-14 days",
            "water_leak": "24-48 hours"
        }
        return resolution_times.get(category, "5-10 days")
    
    def _get_next_steps(self, category: str) -> List[str]:
        """Get next steps for report category"""
        steps = {
            "illegal_dumping": [
                "Site verification by field team",
                "Cleanup scheduling",
                "Investigation of responsible parties",
                "Follow-up inspection"
            ],
            "tree_cutting": [
                "Permit verification",
                "Site inspection",
                "Legal action if unauthorized",
                "Replanting if required"
            ],
            "water_pollution": [
                "Water quality testing",
                "Source identification",
                "Immediate containment if needed",
                "Remediation planning"
            ]
        }
        return steps.get(category, ["Initial assessment", "Action planning", "Implementation", "Follow-up"])
    
    def _calculate_reward_points(self, category: str) -> int:
        """Calculate reward points for citizen reporting"""
        base_points = {
            "illegal_dumping": 50,
            "tree_cutting": 40,
            "water_pollution": 60,
            "air_pollution": 45,
            "noise_pollution": 30,
            "waste_overflow": 35,
            "damaged_green_space": 25,
            "water_leak": 40
        }
        return base_points.get(category, 20)
    
    async def get_nearby_issues(self, lat: float, lon: float, radius: float) -> Dict:
        """Get environmental issues near location"""
        # Simulate nearby issues
        issues = []
        
        for i in range(np.random.randint(5, 15)):
            issue = {
                "issue_id": str(uuid.uuid4()),
                "category": np.random.choice(self.report_categories),
                "description": f"Environmental issue reported by citizen",
                "location": {
                    "lat": lat + np.random.uniform(-radius/111, radius/111),  # Rough conversion to degrees
                    "lon": lon + np.random.uniform(-radius/111, radius/111)
                },
                "distance_km": np.random.uniform(0.1, radius),
                "status": np.random.choice(["submitted", "in_progress", "resolved", "verified"]),
                "priority": np.random.choice(["low", "medium", "high"]),
                "reported_date": (datetime.now() - timedelta(days=np.random.randint(1, 30))).isoformat(),
                "upvotes": np.random.randint(0, 50),
                "comments": np.random.randint(0, 20)
            }
            issues.append(issue)
        
        return {
            "search_location": {"lat": lat, "lon": lon},
            "search_radius_km": radius,
            "total_issues_found": len(issues),
            "issues": issues,
            "issue_summary": {
                "by_category": self._summarize_by_category(issues),
                "by_status": self._summarize_by_status(issues),
                "by_priority": self._summarize_by_priority(issues)
            }
        }
    
    def _summarize_by_category(self, issues: List[Dict]) -> Dict:
        """Summarize issues by category"""
        summary = {}
        for issue in issues:
            category = issue["category"]
            summary[category] = summary.get(category, 0) + 1
        return summary
    
    def _summarize_by_status(self, issues: List[Dict]) -> Dict:
        """Summarize issues by status"""
        summary = {}
        for issue in issues:
            status = issue["status"]
            summary[status] = summary.get(status, 0) + 1
        return summary
    
    def _summarize_by_priority(self, issues: List[Dict]) -> Dict:
        """Summarize issues by priority"""
        summary = {}
        for issue in issues:
            priority = issue["priority"]
            summary[priority] = summary.get(priority, 0) + 1
        return summary

class AlertService:
    def __init__(self):
        pass
    
    async def get_personalized_alerts(self, citizen_id: str) -> Dict:
        """Get personalized alerts for citizen"""
        # Simulate personalized alerts based on citizen preferences and location
        alerts = []
        
        alert_types = [
            {
                "type": "air_quality",
                "severity": np.random.choice(["info", "warning", "critical"]),
                "message": "Air quality has deteriorated in your area",
                "recommendation": "Limit outdoor activities and wear masks"
            },
            {
                "type": "water_shortage",
                "severity": np.random.choice(["info", "warning"]),
                "message": "Water shortage expected in your district",
                "recommendation": "Store water and reduce consumption"
            },
            {
                "type": "disaster_warning",
                "severity": np.random.choice(["warning", "critical"]),
                "message": "Flood warning issued for your area",
                "recommendation": "Prepare emergency kit and evacuation plan"
            },
            {
                "type": "green_initiative",
                "severity": "info",
                "message": "Tree planting event in your neighborhood",
                "recommendation": "Join community environmental action"
            }
        ]
        
        for alert_type in alert_types:
            if np.random.random() > 0.6:  # 40% chance of each alert type
                alert = {
                    "alert_id": str(uuid.uuid4()),
                    "type": alert_type["type"],
                    "severity": alert_type["severity"],
                    "title": alert_type["message"],
                    "message": alert_type["message"],
                    "recommendation": alert_type["recommendation"],
                    "timestamp": datetime.now().isoformat(),
                    "expires_at": (datetime.now() + timedelta(hours=np.random.randint(6, 72))).isoformat(),
                    "location_specific": True,
                    "action_required": alert_type["severity"] in ["warning", "critical"],
                    "read_status": False
                }
                alerts.append(alert)
        
        return {
            "citizen_id": citizen_id,
            "total_alerts": len(alerts),
            "unread_alerts": len([a for a in alerts if not a["read_status"]]),
            "critical_alerts": len([a for a in alerts if a["severity"] == "critical"]),
            "alerts": alerts,
            "alert_preferences": {
                "air_quality": True,
                "water_quality": True,
                "disaster_warnings": True,
                "green_initiatives": True,
                "waste_management": False
            }
        }
    
    async def subscribe_to_alerts(self, subscription_data: Dict) -> Dict:
        """Subscribe citizen to environmental alerts"""
        subscription_id = str(uuid.uuid4())
        
        subscription = {
            "subscription_id": subscription_id,
            "citizen_id": subscription_data.get("citizen_id"),
            "location": subscription_data.get("location", {}),
            "alert_types": subscription_data.get("alert_types", []),
            "notification_methods": subscription_data.get("notification_methods", ["app"]),
            "frequency": subscription_data.get("frequency", "immediate"),
            "created_at": datetime.now().isoformat(),
            "status": "active"
        }
        
        return {
            "message": "Successfully subscribed to alerts",
            "subscription": subscription,
            "estimated_alerts_per_week": self._estimate_alert_frequency(subscription["alert_types"]),
            "customization_options": [
                "Adjust notification frequency",
                "Set quiet hours",
                "Customize alert radius",
                "Filter by severity level"
            ]
        }
    
    def _estimate_alert_frequency(self, alert_types: List[str]) -> int:
        """Estimate number of alerts per week based on subscribed types"""
        frequency_map = {
            "air_quality": 3,
            "water_quality": 1,
            "disaster_warnings": 1,
            "green_initiatives": 2,
            "waste_management": 2
        }
        
        total_frequency = sum(frequency_map.get(alert_type, 1) for alert_type in alert_types)
        return total_frequency