@echo off
echo ========================================
echo NASA EARTH INTELLIGENCE PLATFORM
echo BACKEND SERVER STARTING
echo ========================================
echo.
echo Starting Mental Health API on http://localhost:5001
echo.
echo Available endpoints:
echo - /api/mental-health/analyze-symptoms
echo - /api/mental-health/analyze-mood
echo - /api/mental-health/complete-session
echo - /api/mental-health/get-stats
echo - /api/mental-health/breath-session/*
echo.
echo Press Ctrl+C to stop the server
echo.
cd backend
python mental_health_api.py
pause