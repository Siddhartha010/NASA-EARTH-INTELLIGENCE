@echo off
echo ========================================
echo MENTAL HEALTH CENTER FEATURE TEST
echo ========================================
echo.

echo This script will guide you through testing all mental health features:
echo.
echo 1. SYMPTOM CHECKER TAB:
echo    - Click on symptom buttons (anxiety, depression, insomnia, etc.)
echo    - Selected symptoms should highlight and appear in "Selected" field
echo    - Click "Get Personalized Recommendations" button
echo    - Should show analysis with condition, treatment, and prevention
echo.
echo 2. EXERCISES TAB:
echo    - Click "Exercises" tab to switch
echo    - Try breathing exercises (4-7-8, Box, Deep breathing)
echo    - Try yoga sessions (Stress Relief, Energy Boost)
echo    - Try body scan meditation
echo    - Each should open detailed instructions
echo.
echo 3. BREATH MONITOR TAB:
echo    - Click "Breath Monitor" tab
echo    - Click "Start Session" button
echo    - Click "Record Breath" multiple times
echo    - Watch breath counter and session timer update
echo    - Click "End Session" to see results
echo.
echo 4. GUIDED BREATHING TAB:
echo    - Click "Guided Breathing" tab
echo    - Try each breathing technique (4-7-8, Box, Deep)
echo    - Watch animated circle guide your breathing
echo    - Follow the visual and text prompts
echo    - Close modal when complete
echo.
echo 5. NAVIGATION:
echo    - All tabs should switch properly
echo    - Active tab should be highlighted
echo    - Content should change for each tab
echo    - Hover effects should work on buttons and cards
echo.
echo 6. VISUAL FEEDBACK:
echo    - Buttons should have hover effects
echo    - Loading spinners should appear during analysis
echo    - Color-coded results based on severity
echo    - Smooth animations and transitions
echo.
echo 7. PROGRESS TRACKING:
echo    - Wellness tracker should update after activities
echo    - Session counts should increment
echo    - Statistics should be maintained
echo.
echo ========================================
echo TESTING CHECKLIST:
echo ========================================
echo.
echo [ ] Symptom selection works
echo [ ] Symptom analysis displays results
echo [ ] Exercise tab shows all options
echo [ ] Breathing exercises open properly
echo [ ] Yoga sessions display instructions
echo [ ] Breath monitor starts/stops correctly
echo [ ] Breath recording increments counter
echo [ ] Guided breathing animations work
echo [ ] All tabs switch properly
echo [ ] Hover effects are visible
echo [ ] Progress tracking updates
echo [ ] Visual feedback is smooth
echo.
echo If any feature doesn't work, check:
echo 1. Backend server is running (start-backend.bat)
echo 2. Frontend is loaded properly
echo 3. Browser console for JavaScript errors
echo 4. Network tab for API call failures
echo.
echo Press any key to open the platform for testing...
pause >nul

:: Start the platform for testing
start "NASA Backend" cmd /k "backup-environment\start-backend.bat"
timeout /t 3 /nobreak >nul
start "" "backup-environment\frontend\index.html"

echo.
echo Platform opened for testing!
echo Navigate to Mental Wellness Center to test all features.
echo.
pause