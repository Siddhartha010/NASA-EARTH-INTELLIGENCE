from fastapi import APIRouter, HTTPException
from typing import Dict, List
from .services import DisasterPredictionService, EarlyWarningService

router = APIRouter()
disaster_prediction_service = DisasterPredictionService()
early_warning_service = EarlyWarningService()

@router.get("/drought-prediction/{region}")
async def predict_drought(region: str) -> Dict:
    """Predict drought conditions for region"""
    try:
        prediction = await disaster_prediction_service.predict_drought(region)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/flood-risk/{lat}/{lon}")
async def assess_flood_risk(lat: float, lon: float) -> Dict:
    """Assess flood risk for location"""
    try:
        risk_assessment = await disaster_prediction_service.assess_flood_risk(lat, lon)
        return risk_assessment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/fire-risk/{region}")
async def assess_fire_risk(region: str) -> Dict:
    """Assess wildfire risk using NASA FIRMS data"""
    try:
        fire_risk = await disaster_prediction_service.assess_fire_risk(region)
        return fire_risk
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/early-warnings/{city}")
async def get_early_warnings(city: str) -> Dict:
    """Get early warning alerts for city"""
    try:
        warnings = await early_warning_service.generate_early_warnings(city)
        return warnings
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/evacuation-routes/{lat}/{lon}")
async def get_evacuation_routes(lat: float, lon: float, disaster_type: str) -> Dict:
    """Get evacuation routes for disaster scenario"""
    try:
        routes = await early_warning_service.generate_evacuation_routes(lat, lon, disaster_type)
        return routes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/vulnerability-assessment/{city}")
async def assess_vulnerability(city: str) -> Dict:
    """Assess city's vulnerability to disasters"""
    try:
        assessment = await disaster_prediction_service.assess_city_vulnerability(city)
        return assessment
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/emergency-alert")
async def send_emergency_alert(alert_data: Dict) -> Dict:
    """Send emergency alert to citizens"""
    try:
        result = await early_warning_service.send_emergency_alert(alert_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/alerts")
async def list_alerts() -> List[Dict]:
    """Return all active user-submitted alerts (and optionally generated warnings)."""
    try:
        user_alerts = await early_warning_service.get_user_alerts()
        # Optionally combine with generated early warnings (kept separate here)
        return user_alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/alerts")
async def post_alert(alert_data: Dict) -> Dict:
    """Accept a user-submitted alert and persist it so other users can see it."""
    try:
        saved = await early_warning_service.add_user_alert(alert_data)
        return {"status": "ok", "alert": saved}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))