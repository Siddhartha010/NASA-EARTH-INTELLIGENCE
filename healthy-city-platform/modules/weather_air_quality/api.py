from fastapi import APIRouter, HTTPException
from typing import Dict, List
import requests
import numpy as np
from datetime import datetime, timedelta
from .models import AirQualityData, WeatherData
from .services import WeatherService, AirQualityService

router = APIRouter()
weather_service = WeatherService()
air_quality_service = AirQualityService()

@router.get("/air-quality/{lat}/{lon}")
async def get_air_quality(lat: float, lon: float) -> Dict:
    """Get current air quality data for location"""
    try:
        data = await air_quality_service.get_air_quality(lat, lon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/weather/{lat}/{lon}")
async def get_weather(lat: float, lon: float) -> Dict:
    """Get current weather data for location"""
    try:
        data = await weather_service.get_weather_data(lat, lon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/pollution-map/{city}")
async def get_pollution_map(city: str) -> Dict:
    """Generate real-time pollution map for city"""
    try:
        map_data = await air_quality_service.generate_pollution_map(city)
        return map_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/air-quality-forecast/{lat}/{lon}")
async def get_air_quality_forecast(lat: float, lon: float, days: int = 7) -> Dict:
    """Get air quality forecast"""
    try:
        forecast = await air_quality_service.get_forecast(lat, lon, days)
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))