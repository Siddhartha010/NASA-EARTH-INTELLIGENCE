# NASA Earth Intelligence Platform

## Setup Instructions

### Backend Setup
1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Start the mental health API server:
   ```
   python mental_health_api.py
   ```
   OR double-click `start_server.bat`

3. Server will run on: http://localhost:5001

### Frontend Setup
1. Open `frontend/index.html` in your web browser
2. Login with any credentials (they will be stored locally)
3. Access the Mental Wellness Center from the modules section

## Features

### Mental Health Module
- **Symptom Checker**: AI-powered symptom analysis with personalized treatment recommendations
- **Mood Analysis**: AI-powered mood detection with personalized recommendations
- **Breathing Exercises**: Interactive 4-7-8 breathing with visual guidance
- **Yoga Sessions**: Guided flows for stress relief, energy boost, and better sleep
- **Mindfulness Tools**: 5-4-3-2-1 grounding technique and progressive relaxation
- **Wellness Tracking**: Session counting, streak tracking, and mood improvement metrics

### Other Modules
- **NASA Satellite Data**: Real-time Earth monitoring
- **Vegetation Health**: AI plant disease detection using TensorFlow.js
- **Fire Detection**: NASA FIRMS active fire monitoring
- **Water Monitoring**: NASA GRACE groundwater data

## API Endpoints

### Mental Health API (Port 5001)
- `POST /api/mental-health/analyze-symptoms` - Analyze symptoms and get treatment recommendations
- `POST /api/mental-health/analyze-mood` - Analyze mood and get recommendations
- `POST /api/mental-health/complete-session` - Track completed wellness sessions
- `GET /api/mental-health/get-stats/<user_id>` - Get user wellness statistics
- `GET /api/mental-health/mood-history/<user_id>` - Get mood history and trends

## Dependencies
- Python 3.11+
- Flask 2.3.3
- Flask-CORS 4.0.0
- TensorFlow.js (frontend)
- Bootstrap 5.3.0 (frontend)