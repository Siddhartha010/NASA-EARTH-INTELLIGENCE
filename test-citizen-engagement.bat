@echo off
echo ========================================
echo CITIZEN ENGAGEMENT HUB FEATURE TEST
echo ========================================
echo.

echo This script will guide you through testing all Citizen Engagement features:
echo.
echo 1. REPORT ISSUES TAB:
echo    - Select issue type (illegal dumping, tree cutting, pothole, etc.)
echo    - Upload photo and see preview
echo    - Fill description and location
echo    - Use GPS location button
echo    - Submit report and see confirmation with report ID
echo    - Check impact statistics update
echo.
echo 2. ALERTS & WARNINGS TAB:
echo    - View active alerts (wildfire, water shortage, air quality)
echo    - Dismiss alerts using X button
echo    - Configure alert preferences with checkboxes
echo    - Save preferences and see confirmation
echo.
echo 3. COMMUNITY CHALLENGES TAB:
echo    - View weekly challenges with progress bars
echo    - See point rewards for each challenge
echo    - Participate in challenges
echo    - Check leaderboard rankings
echo    - View personal achievements
echo.
echo 4. AI TRASH IDENTIFIER TAB:
echo    - Upload waste image for AI classification
echo    - See AI analysis with waste type detection
echo    - Get disposal instructions and tips
echo    - View environmental impact information
echo    - Check classification statistics
echo.
echo ========================================
echo TESTING CHECKLIST:
echo ========================================
echo.
echo [ ] Tab navigation works between all 4 sections
echo [ ] Issue reporting form accepts all inputs
echo [ ] Photo upload shows preview
echo [ ] GPS location button works
echo [ ] Report submission shows success message
echo [ ] Alert dismissal removes alerts
echo [ ] Alert preferences save properly
echo [ ] Challenge participation works
echo [ ] Progress bars display correctly
echo [ ] AI trash classification analyzes images
echo [ ] Disposal instructions are comprehensive
echo [ ] Statistics update after actions
echo [ ] Hover effects work on all interactive elements
echo [ ] Visual feedback is smooth and responsive
echo.
echo FEATURES TO TEST:
echo.
echo REPORT ISSUES:
echo - Try different issue types
echo - Upload various image formats
echo - Test GPS location functionality
echo - Submit multiple reports
echo.
echo ALERTS:
echo - Dismiss different alert types
echo - Toggle alert preferences
echo - Save and reload preferences
echo.
echo CHALLENGES:
echo - View challenge progress
echo - Participate in different challenges
echo - Check point accumulation
echo.
echo AI TRASH IDENTIFIER:
echo - Upload different waste images
echo - Test biodegradable items (food, leaves)
echo - Test recyclable items (bottles, cans)
echo - Test hazardous items (batteries, chemicals)
echo - Verify disposal instructions accuracy
echo.
echo Press any key to open the platform for testing...
pause >nul

:: Start the platform for testing
start "NASA Backend" cmd /k "backup-environment\start-backend.bat"
timeout /t 3 /nobreak >nul
start "" "backup-environment\frontend\index.html"

echo.
echo Platform opened for testing!
echo Navigate to Citizen Engagement Hub to test all features.
echo.
echo TESTING TIPS:
echo - Test each tab thoroughly
echo - Try uploading different image types
echo - Check that all buttons respond
echo - Verify statistics update correctly
echo - Test GPS location if available
echo - Try dismissing and saving preferences
echo.
pause