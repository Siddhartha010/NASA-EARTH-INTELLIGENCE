@echo off
echo ========================================
echo NASA EARTH INTELLIGENCE PLATFORM
echo COMPLETE STARTUP
echo ========================================
echo.
echo Starting backend server...
start "NASA Backend Server" cmd /k "start-backend.bat"
echo.
echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak >nul
echo.
echo Opening frontend...
call start-frontend.bat
echo.
echo ========================================
echo PLATFORM STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend: http://localhost:5001
echo Frontend: Opened in browser
echo.
echo MENTAL WELLNESS CENTER FEATURES:
echo [✓] Symptom Checker - Select symptoms and get AI analysis
echo [✓] Exercises Tab - Breathing exercises, yoga, meditation
echo [✓] Breath Monitor - Real-time breath tracking
echo [✓] Guided Breathing - Visual breathing guides
echo [✓] Progress Tracking - Session statistics
echo [✓] Interactive UI - Smooth animations and transitions
echo.
echo To test all features:
echo 1. Navigate to Mental Wellness Center
echo 2. Try each tab (Symptom Checker, Exercises, Breath Monitor, Guided Breathing)
echo 3. Test symptom selection and analysis
echo 4. Try breathing exercises and yoga sessions
echo 5. Use breath monitoring with start/record/stop
echo 6. Experience guided breathing animations
echo.
pause