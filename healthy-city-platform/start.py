#!/usr/bin/env python3
"""
Healthy City Intelligence Platform Startup Script
"""

import subprocess
import sys
import os
import time
import webbrowser
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import uvicorn
        import fastapi
        import requests
        print("Backend dependencies found")
        return True
    except ImportError as e:
        print(f"Missing dependencies: {e}")
        print("Please run: pip install -r requirements.txt")
        return False

def start_backend():
    """Start the FastAPI backend server"""
    print("Starting Healthy City Intelligence Platform...")
    print("Starting backend API server...")
    
    backend_path = Path(__file__).parent / "backend"
    os.chdir(backend_path)
    
    # Start the backend server
    process = subprocess.Popen([
        sys.executable, "main.py"
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    return process

def open_frontend():
    """Open the frontend in the default web browser"""
    time.sleep(3)  # Wait for backend to start
    print("Opening web dashboard...")
    
    frontend_url = "http://localhost:8000"
    try:
        webbrowser.open(frontend_url)
        print(f"Web dashboard opened at {frontend_url}")
    except Exception as e:
        print(f"Could not open browser automatically: {e}")
        print(f"Please open {frontend_url} in your browser")

def print_welcome():
    """Print welcome message and instructions"""
    print("\n" + "="*60)
    print("HEALTHY CITY INTELLIGENCE PLATFORM")
    print("="*60)
    print("NASA Earth Observation Data + AI for Urban Sustainability")
    print("\nAvailable Modules:")
    print("   * Weather & Air Quality Monitoring")
    print("   * Green Vegetation Health Analysis") 
    print("   * Water Quality & Availability Tracking")
    print("   * Crop Disease Detection")
    print("   * Waste Management Optimization")
    print("   * Disaster Management & Early Warning")
    print("   * Citizen Engagement Platform")
    print("\nAccess Points:")
    print("   * Web Dashboard: http://localhost:8000")
    print("   * API Documentation: http://localhost:8000/docs")
    print("   * Mobile App: Run 'npm start' in mobile/ directory")
    print("\nImpact Areas:")
    print("   + Healthier air quality monitoring")
    print("   + Safe water access assurance") 
    print("   + Mental wellbeing through green spaces")
    print("   + Disaster preparedness & safety")
    print("   + Community participation in sustainability")
    print("   + Transparent environmental data access")
    print("\n" + "="*60)

def main():
    """Main startup function"""
    print_welcome()
    
    if not check_dependencies():
        sys.exit(1)
    
    try:
        # Start backend
        backend_process = start_backend()
        
        # Open frontend
        open_frontend()
        
        print("\nPlatform Status:")
        print("   + Backend API: Running on http://localhost:8000")
        print("   + Web Dashboard: Available in browser")
        print("   + Real-time Environmental Data: Active")
        print("   + Citizen Reporting: Enabled")
        print("   + AI Disease Detection: Ready")
        print("   + Disaster Alerts: Monitoring")
        
        print("\nMobile App Setup:")
        print("   1. cd mobile/")
        print("   2. npm install")
        print("   3. npm start")
        
        print("\nAPI Testing:")
        print("   * Air Quality: GET /api/weather/air-quality/28.6139/77.2090")
        print("   * Green Spaces: GET /api/vegetation/ndvi/28.6139/77.2090")
        print("   * Water Quality: GET /api/water/quality/28.6139/77.2090")
        
        print("\nPress Ctrl+C to stop the platform")
        
        # Keep the script running
        try:
            backend_process.wait()
        except KeyboardInterrupt:
            print("\nShutting down Healthy City Platform...")
            backend_process.terminate()
            print("Platform stopped successfully")
            
    except Exception as e:
        print(f"Error starting platform: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()