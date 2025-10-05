import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List
import cv2
from fastapi import UploadFile
import tensorflow as tf

class CropDiseaseService:
    def __init__(self):
        self.disease_model = self._load_disease_model()
        self.disease_database = self._initialize_disease_database()
    
    def _load_disease_model(self):
        """Load pre-trained crop disease detection model"""
        # In production, load actual trained model
        # For demo, return mock model
        return None
    
    def _initialize_disease_database(self) -> Dict:
        """Initialize crop disease database"""
        return {
            "wheat_rust": {
                "name": "Wheat Rust",
                "severity": "high",
                "symptoms": ["orange pustules", "leaf yellowing", "stunted growth"],
                "treatment": ["fungicide application", "resistant varieties", "crop rotation"]
            },
            "corn_blight": {
                "name": "Corn Blight",
                "severity": "medium",
                "symptoms": ["leaf spots", "wilting", "reduced yield"],
                "treatment": ["fungicide spray", "improved drainage", "resistant hybrids"]
            },
            "rice_blast": {
                "name": "Rice Blast",
                "severity": "high",
                "symptoms": ["diamond-shaped lesions", "neck rot", "panicle blast"],
                "treatment": ["fungicide treatment", "water management", "resistant varieties"]
            }
        }
    
    async def detect_disease_from_image(self, file: UploadFile) -> Dict:
        """Detect crop disease from uploaded image using AI"""
        # Read and process image
        contents = await file.read()
        
        # Simulate AI disease detection
        detected_diseases = []
        confidence_scores = np.random.uniform(0.6, 0.95, 3)
        disease_names = list(self.disease_database.keys())
        
        for i, disease in enumerate(disease_names):
            if confidence_scores[i] > 0.7:
                detected_diseases.append({
                    "disease_id": disease,
                    "disease_name": self.disease_database[disease]["name"],
                    "confidence": confidence_scores[i],
                    "severity": self.disease_database[disease]["severity"],
                    "affected_area_percent": np.random.uniform(10, 60)
                })
        
        return {
            "image_analysis": {
                "filename": file.filename,
                "detected_diseases": detected_diseases,
                "overall_health_score": max(0, 100 - len(detected_diseases) * 25),
                "analysis_timestamp": datetime.now().isoformat()
            },
            "recommendations": self._generate_treatment_plan(detected_diseases)
        }
    
    def _generate_treatment_plan(self, diseases: List[Dict]) -> List[str]:
        """Generate treatment plan for detected diseases"""
        treatments = []
        for disease in diseases:
            disease_id = disease["disease_id"]
            if disease_id in self.disease_database:
                treatments.extend(self.disease_database[disease_id]["treatment"])
        
        # Remove duplicates and add general recommendations
        treatments = list(set(treatments))
        treatments.extend(["Monitor crop regularly", "Maintain proper field hygiene"])
        return treatments
    
    async def monitor_regional_diseases(self, region: str) -> Dict:
        """Monitor crop diseases in region using satellite data"""
        # Simulate satellite-based disease monitoring
        affected_areas = []
        
        for i in range(np.random.randint(3, 8)):
            disease_type = np.random.choice(list(self.disease_database.keys()))
            severity = np.random.choice(["low", "medium", "high"])
            
            affected_areas.append({
                "area_id": f"area_{i+1}",
                "lat": 28.6 + np.random.uniform(-0.2, 0.2),
                "lon": 77.2 + np.random.uniform(-0.2, 0.2),
                "disease_type": disease_type,
                "severity": severity,
                "affected_hectares": np.random.uniform(10, 500),
                "detection_date": datetime.now().isoformat(),
                "spread_rate": np.random.uniform(0.1, 2.0)  # hectares/day
            })
        
        return {
            "region": region,
            "monitoring_date": datetime.now().isoformat(),
            "total_affected_areas": len(affected_areas),
            "affected_areas": affected_areas,
            "disease_hotspots": self._identify_disease_hotspots(affected_areas),
            "regional_risk_level": self._assess_regional_risk(affected_areas)
        }
    
    def _identify_disease_hotspots(self, areas: List[Dict]) -> List[Dict]:
        """Identify disease hotspots"""
        hotspots = []
        for area in areas:
            if area["severity"] == "high" and area["affected_hectares"] > 200:
                hotspots.append({
                    "location": {"lat": area["lat"], "lon": area["lon"]},
                    "disease": area["disease_type"],
                    "urgency": "immediate_action_required"
                })
        return hotspots
    
    def _assess_regional_risk(self, areas: List[Dict]) -> str:
        """Assess overall regional disease risk"""
        high_severity_count = sum(1 for area in areas if area["severity"] == "high")
        total_affected = sum(area["affected_hectares"] for area in areas)
        
        if high_severity_count > 2 or total_affected > 1000:
            return "high"
        elif high_severity_count > 0 or total_affected > 300:
            return "medium"
        else:
            return "low"
    
    async def generate_early_warnings(self, lat: float, lon: float, crop_type: str) -> Dict:
        """Generate early warning alerts for crop diseases"""
        # Simulate weather-based disease risk assessment
        weather_conditions = {
            "temperature": np.random.uniform(20, 35),
            "humidity": np.random.uniform(60, 90),
            "rainfall_mm": np.random.uniform(0, 50),
            "wind_speed": np.random.uniform(2, 15)
        }
        
        risk_factors = self._assess_disease_risk_factors(weather_conditions, crop_type)
        alerts = self._generate_alerts(risk_factors, crop_type)
        
        return {
            "location": {"lat": lat, "lon": lon},
            "crop_type": crop_type,
            "weather_conditions": weather_conditions,
            "risk_assessment": risk_factors,
            "alerts": alerts,
            "preventive_measures": self._suggest_preventive_measures(risk_factors)
        }
    
    def _assess_disease_risk_factors(self, weather: Dict, crop_type: str) -> Dict:
        """Assess disease risk based on weather conditions"""
        risks = {}
        
        # High humidity increases fungal disease risk
        if weather["humidity"] > 80:
            risks["fungal_diseases"] = "high"
        elif weather["humidity"] > 65:
            risks["fungal_diseases"] = "medium"
        else:
            risks["fungal_diseases"] = "low"
        
        # Temperature and rainfall affect bacterial diseases
        if weather["temperature"] > 25 and weather["rainfall_mm"] > 20:
            risks["bacterial_diseases"] = "high"
        else:
            risks["bacterial_diseases"] = "low"
        
        # Wind can spread diseases
        if weather["wind_speed"] > 10:
            risks["disease_spread"] = "high"
        else:
            risks["disease_spread"] = "low"
        
        return risks
    
    def _generate_alerts(self, risk_factors: Dict, crop_type: str) -> List[Dict]:
        """Generate disease alerts based on risk factors"""
        alerts = []
        
        for risk_type, level in risk_factors.items():
            if level == "high":
                alerts.append({
                    "alert_type": risk_type,
                    "severity": "high",
                    "message": f"High risk of {risk_type.replace('_', ' ')} in {crop_type}",
                    "action_required": "immediate",
                    "valid_until": (datetime.now() + timedelta(days=7)).isoformat()
                })
        
        return alerts
    
    def _suggest_preventive_measures(self, risk_factors: Dict) -> List[str]:
        """Suggest preventive measures based on risk factors"""
        measures = []
        
        if risk_factors.get("fungal_diseases") == "high":
            measures.extend([
                "Apply preventive fungicide spray",
                "Improve field drainage",
                "Reduce plant density for better air circulation"
            ])
        
        if risk_factors.get("bacterial_diseases") == "high":
            measures.extend([
                "Use copper-based bactericides",
                "Avoid overhead irrigation",
                "Remove infected plant debris"
            ])
        
        if risk_factors.get("disease_spread") == "high":
            measures.append("Limit field activities during windy conditions")
        
        return measures
    
    async def get_treatment_recommendations(self, disease_id: str) -> Dict:
        """Get detailed treatment recommendations for specific disease"""
        if disease_id not in self.disease_database:
            return {"error": "Disease not found in database"}
        
        disease_info = self.disease_database[disease_id]
        
        return {
            "disease_id": disease_id,
            "disease_name": disease_info["name"],
            "treatment_plan": {
                "immediate_actions": disease_info["treatment"][:2],
                "long_term_management": disease_info["treatment"][2:],
                "monitoring_schedule": "Weekly inspection for 4 weeks",
                "expected_recovery_time": "2-4 weeks with proper treatment"
            },
            "prevention_strategies": [
                "Use certified disease-free seeds",
                "Implement crop rotation",
                "Maintain field sanitation"
            ]
        }

class CropHealthService:
    def __init__(self):
        pass
    
    async def assess_crop_health(self, lat: float, lon: float, crop_type: str) -> Dict:
        """Assess overall crop health using satellite data"""
        # Simulate NDVI and other vegetation indices
        ndvi = np.random.uniform(0.3, 0.8)
        evi = np.random.uniform(0.2, 0.7)
        lai = np.random.uniform(1.0, 6.0)  # Leaf Area Index
        
        health_score = self._calculate_health_score(ndvi, evi, lai)
        stress_indicators = self._identify_stress_indicators(ndvi, evi)
        
        return {
            "location": {"lat": lat, "lon": lon},
            "crop_type": crop_type,
            "assessment_date": datetime.now().isoformat(),
            "vegetation_indices": {
                "ndvi": ndvi,
                "evi": evi,
                "lai": lai
            },
            "health_score": health_score,
            "health_status": self._categorize_health(health_score),
            "stress_indicators": stress_indicators,
            "growth_stage": self._estimate_growth_stage(ndvi, lai),
            "recommendations": self._generate_health_recommendations(health_score, stress_indicators)
        }
    
    def _calculate_health_score(self, ndvi: float, evi: float, lai: float) -> float:
        """Calculate overall crop health score"""
        # Weighted combination of vegetation indices
        score = (ndvi * 0.4 + evi * 0.3 + min(lai/6, 1) * 0.3) * 100
        return min(100, max(0, score))
    
    def _categorize_health(self, score: float) -> str:
        """Categorize health based on score"""
        if score > 80:
            return "excellent"
        elif score > 65:
            return "good"
        elif score > 50:
            return "fair"
        elif score > 35:
            return "poor"
        else:
            return "critical"
    
    def _identify_stress_indicators(self, ndvi: float, evi: float) -> List[str]:
        """Identify crop stress indicators"""
        indicators = []
        
        if ndvi < 0.4:
            indicators.append("low_vegetation_vigor")
        if evi < 0.3:
            indicators.append("chlorophyll_stress")
        if ndvi < 0.5 and evi < 0.4:
            indicators.append("water_stress")
        
        # Random additional stress factors
        if np.random.random() > 0.7:
            indicators.append("nutrient_deficiency")
        if np.random.random() > 0.8:
            indicators.append("pest_pressure")
        
        return indicators
    
    def _estimate_growth_stage(self, ndvi: float, lai: float) -> str:
        """Estimate crop growth stage"""
        if ndvi < 0.3 and lai < 1.5:
            return "early_vegetative"
        elif ndvi < 0.6 and lai < 3.0:
            return "vegetative"
        elif ndvi > 0.6 and lai > 3.0:
            return "reproductive"
        else:
            return "maturity"
    
    def _generate_health_recommendations(self, health_score: float, stress_indicators: List[str]) -> List[str]:
        """Generate recommendations based on health assessment"""
        recommendations = []
        
        if health_score < 50:
            recommendations.append("Immediate intervention required")
        
        if "water_stress" in stress_indicators:
            recommendations.extend(["Increase irrigation frequency", "Check soil moisture levels"])
        
        if "nutrient_deficiency" in stress_indicators:
            recommendations.extend(["Soil testing recommended", "Consider fertilizer application"])
        
        if "pest_pressure" in stress_indicators:
            recommendations.append("Implement integrated pest management")
        
        if not recommendations:
            recommendations.append("Continue current management practices")
        
        return recommendations
    
    async def predict_yield(self, lat: float, lon: float, crop_type: str) -> Dict:
        """Predict crop yield based on current health and conditions"""
        # Get current health assessment
        health_data = await self.assess_crop_health(lat, lon, crop_type)
        health_score = health_data["health_score"]
        
        # Simulate yield prediction based on health and historical data
        base_yield = self._get_base_yield(crop_type)  # tons/hectare
        health_factor = health_score / 100
        weather_factor = np.random.uniform(0.8, 1.2)
        
        predicted_yield = base_yield * health_factor * weather_factor
        
        return {
            "location": {"lat": lat, "lon": lon},
            "crop_type": crop_type,
            "prediction_date": datetime.now().isoformat(),
            "predicted_yield_tons_per_hectare": predicted_yield,
            "confidence_level": np.random.uniform(0.7, 0.95),
            "factors_affecting_yield": {
                "crop_health_score": health_score,
                "weather_conditions": "favorable" if weather_factor > 1 else "challenging",
                "disease_pressure": "low" if health_score > 70 else "moderate"
            },
            "yield_comparison": {
                "regional_average": base_yield,
                "predicted_vs_average": ((predicted_yield - base_yield) / base_yield) * 100
            }
        }
    
    def _get_base_yield(self, crop_type: str) -> float:
        """Get base yield for crop type"""
        base_yields = {
            "wheat": 3.5,
            "rice": 4.2,
            "corn": 6.8,
            "soybean": 2.8,
            "cotton": 1.2,
            "general": 4.0
        }
        return base_yields.get(crop_type.lower(), 4.0)