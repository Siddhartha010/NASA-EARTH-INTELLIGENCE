from fastapi import APIRouter, HTTPException
from typing import Dict, List
from .services import WasteDetectionService, RouteOptimizationService

router = APIRouter()
waste_detection_service = WasteDetectionService()
route_optimization_service = RouteOptimizationService()

@router.get("/illegal-dumping/{city}")
async def detect_illegal_dumping(city: str) -> Dict:
    """Detect illegal dumping sites using satellite/drone imagery"""
    try:
        detection_data = await waste_detection_service.detect_illegal_dumping(city)
        return detection_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/optimize-routes/{city}")
async def optimize_collection_routes(city: str) -> Dict:
    """Generate optimized garbage collection routes"""
    try:
        routes = await route_optimization_service.optimize_collection_routes(city)
        return routes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/report-dumping")
async def report_illegal_dumping(report_data: Dict) -> Dict:
    """Report illegal dumping site"""
    try:
        result = await waste_detection_service.process_dumping_report(report_data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/waste-hotspots/{city}")
async def identify_waste_hotspots(city: str) -> Dict:
    """Identify waste accumulation hotspots"""
    try:
        hotspots = await waste_detection_service.identify_waste_hotspots(city)
        return hotspots
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/collection-efficiency/{city}")
async def analyze_collection_efficiency(city: str) -> Dict:
    """Analyze waste collection efficiency"""
    try:
        efficiency_data = await route_optimization_service.analyze_collection_efficiency(city)
        return efficiency_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/alerts/{city}")
async def get_waste_alerts(city: str) -> Dict:
    """Get waste management alerts for authorities"""
    try:
        alerts = await waste_detection_service.generate_alerts(city)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))