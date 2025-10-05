@echo off
echo ========================================
echo NASA EARTH INTELLIGENCE PLATFORM
echo BACKUP ENVIRONMENT SETUP
echo ========================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo [1/8] Python detected successfully
echo.

:: Create backup directory
echo [2/8] Creating backup environment...
if not exist "backup-environment" mkdir "backup-environment"
xcopy "healthy-city-platform" "backup-environment" /E /I /H /Y >nul 2>&1
echo Backup environment created successfully
echo.

:: Navigate to backup directory
cd backup-environment

:: Create virtual environment
echo [3/8] Creating Python virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)
echo Virtual environment created successfully
echo.

:: Activate virtual environment
echo [4/8] Activating virtual environment...
call venv\Scripts\activate.bat
echo Virtual environment activated
echo.

:: Upgrade pip
echo [5/8] Upgrading pip...
python -m pip install --upgrade pip
echo.

:: Install backend dependencies
echo [6/8] Installing backend dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo Backend dependencies installed successfully
echo.

:: Install additional mental health dependencies
echo [7/8] Installing additional dependencies for mental health features...
pip install numpy pandas scikit-learn
echo Additional dependencies installed
echo.

:: Create startup scripts
echo [8/8] Creating startup scripts...
cd ..

:: Create enhanced backend startup script
echo @echo off > start-backend.bat
echo echo Starting NASA Earth Intelligence Platform Backend... >> start-backend.bat
echo echo. >> start-backend.bat
echo call venv\Scripts\activate.bat >> start-backend.bat
echo cd backend >> start-backend.bat
echo echo Backend server starting on http://localhost:5001 >> start-backend.bat
echo echo Mental Health API endpoints available >> start-backend.bat
echo echo Press Ctrl+C to stop the server >> start-backend.bat
echo echo. >> start-backend.bat
echo python mental_health_api.py >> start-backend.bat
echo pause >> start-backend.bat

:: Create frontend startup script
echo @echo off > start-frontend.bat
echo echo Starting NASA Earth Intelligence Platform Frontend... >> start-frontend.bat
echo echo. >> start-frontend.bat
echo echo Opening frontend in default browser... >> start-frontend.bat
echo echo Frontend URL: file:///%cd%\frontend\index.html >> start-frontend.bat
echo echo. >> start-frontend.bat
echo start "" "frontend\index.html" >> start-frontend.bat
echo echo Frontend opened in browser >> start-frontend.bat
echo pause >> start-frontend.bat

:: Create complete startup script
echo @echo off > start-platform.bat
echo echo ======================================== >> start-platform.bat
echo echo NASA EARTH INTELLIGENCE PLATFORM >> start-platform.bat
echo echo COMPLETE STARTUP >> start-platform.bat
echo echo ======================================== >> start-platform.bat
echo echo. >> start-platform.bat
echo echo Starting backend server... >> start-platform.bat
echo start "NASA Backend" cmd /k "start-backend.bat" >> start-platform.bat
echo echo. >> start-platform.bat
echo echo Waiting 3 seconds for backend to initialize... >> start-platform.bat
echo timeout /t 3 /nobreak ^>nul >> start-platform.bat
echo echo. >> start-platform.bat
echo echo Opening frontend... >> start-platform.bat
echo call start-frontend.bat >> start-platform.bat

:: Create requirements check script
echo @echo off > check-requirements.bat
echo echo Checking system requirements... >> check-requirements.bat
echo echo. >> check-requirements.bat
echo python --version >> check-requirements.bat
echo echo. >> check-requirements.bat
echo call venv\Scripts\activate.bat >> check-requirements.bat
echo pip list >> check-requirements.bat
echo echo. >> check-requirements.bat
echo echo All requirements checked >> check-requirements.bat
echo pause >> check-requirements.bat

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Backup environment created successfully at:
echo %cd%
echo.
echo Available startup options:
echo 1. start-platform.bat    - Start complete platform (backend + frontend)
echo 2. start-backend.bat     - Start backend server only
echo 3. start-frontend.bat    - Open frontend only
echo 4. check-requirements.bat - Check installed dependencies
echo.
echo MENTAL HEALTH CENTER FEATURES:
echo - Symptom Checker with AI analysis
echo - Breathing exercises (4-7-8, Box, Deep breathing)
echo - Yoga and meditation sessions
echo - Real-time breath monitoring
echo - Guided breathing with visual feedback
echo - Progress tracking and wellness statistics
echo.
echo To start the platform now, run: start-platform.bat
echo.
pause