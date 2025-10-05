from fastapi import APIRouter, HTTPException
from typing import Dict, List
from .services import CitizenService, ReportingService, AlertService

router = APIRouter()
citizen_service = CitizenService()
reporting_service = ReportingService()
alert_service = AlertService()

@router.get("/dashboard/{lat}/{lon}")
async def get_citizen_dashboard(lat: float, lon: float) -> Dict:
    """Get citizen dashboard with local environmental data"""
    try:
        dashboard_data = await citizen_service.get_citizen_dashboard(lat, lon)
        return dashboard_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/report-issue")
async def report_environmental_issue(report_data: Dict) -> Dict:
    """Report environmental issues like illegal dumping or tree cutting"""
    try:
        result = await reporting_service.submit_environmental_report(report_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/alerts/{citizen_id}")
async def get_citizen_alerts(citizen_id: str) -> Dict:
    """Get personalized alerts for citizen"""
    try:
        alerts = await alert_service.get_personalized_alerts(citizen_id)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/nearby-issues/{lat}/{lon}")
async def get_nearby_issues(lat: float, lon: float, radius: float = 2.0) -> Dict:
    """Get environmental issues near location"""
    try:
        issues = await reporting_service.get_nearby_issues(lat, lon, radius)
        return issues
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/subscribe-alerts")
async def subscribe_to_alerts(subscription_data: Dict) -> Dict:
    """Subscribe to environmental alerts"""
    try:
        result = await alert_service.subscribe_to_alerts(subscription_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/community-stats/{city}")
async def get_community_stats(city: str) -> Dict:
    """Get community engagement statistics"""
    try:
        stats = await citizen_service.get_community_engagement_stats(city)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/feedback")
async def submit_feedback(feedback_data: Dict) -> Dict:
    """Submit feedback on city services"""
    try:
        result = await citizen_service.submit_citizen_feedback(feedback_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/green-initiatives/{city}")
async def get_green_initiatives(city: str) -> Dict:
    """Get ongoing green initiatives citizens can participate in"""
    try:
        initiatives = await citizen_service.get_green_initiatives(city)
        return initiatives
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))