from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import Dict, List
from .services import CropDiseaseService, CropHealthService

router = APIRouter()
crop_disease_service = CropDiseaseService()
crop_health_service = CropHealthService()

@router.get("/health/{lat}/{lon}")
async def get_crop_health(lat: float, lon: float, crop_type: str = "general") -> Dict:
    """Get crop health data for location"""
    try:
        data = await crop_health_service.assess_crop_health(lat, lon, crop_type)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/disease-detection")
async def detect_crop_disease(file: UploadFile = File(...)) -> Dict:
    """Detect crop disease from uploaded image"""
    try:
        result = await crop_disease_service.detect_disease_from_image(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/disease-monitoring/{region}")
async def monitor_crop_diseases(region: str) -> Dict:
    """Monitor crop diseases in region using satellite data"""
    try:
        monitoring_data = await crop_disease_service.monitor_regional_diseases(region)
        return monitoring_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/early-warning/{lat}/{lon}")
async def get_early_warning(lat: float, lon: float, crop_type: str) -> Dict:
    """Get early warning alerts for crop diseases"""
    try:
        alerts = await crop_disease_service.generate_early_warnings(lat, lon, crop_type)
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/yield-prediction/{lat}/{lon}")
async def predict_crop_yield(lat: float, lon: float, crop_type: str) -> Dict:
    """Predict crop yield based on health and conditions"""
    try:
        prediction = await crop_health_service.predict_yield(lat, lon, crop_type)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/treatment-recommendations/{disease_id}")
async def get_treatment_recommendations(disease_id: str) -> Dict:
    """Get treatment recommendations for detected disease"""
    try:
        recommendations = await crop_disease_service.get_treatment_recommendations(disease_id)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))