from fastapi import APIRouter, HTTPException
from typing import Dict, List
from .services import WaterQualityService, WaterAvailabilityService

router = APIRouter()
water_quality_service = WaterQualityService()
water_availability_service = WaterAvailabilityService()

@router.get("/quality/{lat}/{lon}")
async def get_water_quality(lat: float, lon: float) -> Dict:
    """Get water quality data for location"""
    try:
        data = await water_quality_service.get_water_quality(lat, lon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/availability/{lat}/{lon}")
async def get_water_availability(lat: float, lon: float) -> Dict:
    """Get water availability using GRACE data"""
    try:
        data = await water_availability_service.get_water_availability(lat, lon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/drought-risk/{region}")
async def get_drought_risk(region: str) -> Dict:
    """Assess drought risk for region"""
    try:
        risk_data = await water_availability_service.assess_drought_risk(region)
        return risk_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/water-bodies/{city}")
async def monitor_water_bodies(city: str) -> Dict:
    """Monitor water bodies in city"""
    try:
        monitoring_data = await water_quality_service.monitor_water_bodies(city)
        return monitoring_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/groundwater/{lat}/{lon}")
async def get_groundwater_data(lat: float, lon: float) -> Dict:
    """Get groundwater data from GRACE"""
    try:
        data = await water_availability_service.get_groundwater_data(lat, lon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))