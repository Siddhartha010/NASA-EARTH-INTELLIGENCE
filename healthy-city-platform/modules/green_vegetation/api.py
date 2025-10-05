from fastapi import APIRouter, HTTPException
from typing import Dict, List
from .services import VegetationService
from .models import NDVIData, UrbanCoverMap

router = APIRouter()
vegetation_service = VegetationService()

@router.get("/ndvi/{lat}/{lon}")
async def get_ndvi_data(lat: float, lon: float) -> Dict:
    """Get NDVI data for location"""
    try:
        data = await vegetation_service.get_ndvi_data(lat, lon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/urban-cover/{city}")
async def get_urban_cover_map(city: str) -> Dict:
    """Generate urban vegetation cover map"""
    try:
        map_data = await vegetation_service.generate_urban_cover_map(city)
        return map_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/vegetation-health/{lat}/{lon}")
async def get_vegetation_health(lat: float, lon: float, radius: float = 1.0) -> Dict:
    """Monitor vegetation health in area"""
    try:
        health_data = await vegetation_service.assess_vegetation_health(lat, lon, radius)
        return health_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/mental-health-impact/{lat}/{lon}")
async def get_mental_health_impact(lat: float, lon: float) -> Dict:
    """Analyze green space impact on mental health"""
    try:
        impact_data = await vegetation_service.analyze_mental_health_impact(lat, lon)
        return impact_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/green-corridors/{city}")
async def get_green_corridors(city: str) -> Dict:
    """Identify green corridors and connectivity"""
    try:
        corridors = await vegetation_service.identify_green_corridors(city)
        return corridors
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))